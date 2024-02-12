#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;
use rfq::state::{
    AuthoritySide, FixedSize, Leg, OrderType, ProtocolState, Quote, QuoteSide, Response, Rfq,
    SettlementTypeMetadata,
};

use base_asset_extractor::extract_base_assets;
use errors::Error;
use price_extractor::extract_prices;
use risk_calculator::{CalculationCase, RiskCalculator};
use scenarios::ScenarioSelector;
use state::{Config, InstrumentType, RiskCategoryInfo};
use utils::{convert_fixed_point_to_f64, get_leg_amount_f64};

pub mod base_asset_extractor;
pub mod black_scholes;
pub mod errors;
pub mod price_extractor;
pub mod risk_calculator;
pub mod scenarios;
pub mod state;
pub mod utils;

declare_id!("F3o2hWqv61TavHuZYuStvW2Zd3M1JnoqBmmgGU77LRTr");

pub const CONFIG_SEED: &str = "config";

#[program]
pub mod risk_engine {
    use super::*;

    #[allow(clippy::too_many_arguments)]
    pub fn initialize_config(
        ctx: Context<InitializeConfigAccounts>,
        min_collateral_requirement: u64,
        collateral_for_fixed_quote_amount_rfq_creation: u64,
        collateral_mint_decimals: u8,
        safety_price_shift_factor: f64,
        overall_safety_factor: f64,
        accepted_oracle_staleness: u64,
        accepted_oracle_confidence_interval_portion: f64,
    ) -> Result<()> {
        let mut config = ctx.accounts.config.load_init()?;

        config.min_collateral_requirement = min_collateral_requirement;
        config.collateral_for_fixed_quote_amount_rfq_creation =
            collateral_for_fixed_quote_amount_rfq_creation;
        config.collateral_mint_decimals = collateral_mint_decimals as u64;
        config.safety_price_shift_factor = safety_price_shift_factor;
        config.overall_safety_factor = overall_safety_factor;
        config.accepted_oracle_staleness = accepted_oracle_staleness;
        config.accepted_oracle_confidence_interval_portion =
            accepted_oracle_confidence_interval_portion;

        Ok(())
    }

    pub fn close_config(_ctx: Context<CloseConfigAccounts>) -> Result<()> {
        Ok(())
    }

    // used only for passing data in the set_risk_category_info instruction
    #[derive(AnchorSerialize, AnchorDeserialize)]
    pub struct RiskCategoryChange {
        risk_category_index: u8,
        new_value: RiskCategoryInfo,
    }

    // risk categories size is too large to fully fit in one transaction, so this instruction is used to set them partially
    pub fn set_risk_categories_info(
        ctx: Context<SetRiskCategoryInfo>,
        changes: Vec<RiskCategoryChange>,
    ) -> Result<()> {
        let mut config = ctx.accounts.config.load_mut()?;

        for change in changes.into_iter() {
            config.risk_categories_info[change.risk_category_index as usize] = change.new_value;
        }

        Ok(())
    }

    #[allow(clippy::too_many_arguments)]
    pub fn update_config(
        ctx: Context<UpdateConfigAccounts>,
        min_collateral_requirement: Option<u64>,
        collateral_for_fixed_quote_amount_rfq_creation: Option<u64>,
        collateral_mint_decimals: Option<u8>,
        safety_price_shift_factor: Option<f64>,
        overall_safety_factor: Option<f64>,
        accepted_oracle_staleness: Option<u64>,
        accepted_oracle_confidence_interval_portion: Option<f64>,
    ) -> Result<()> {
        let mut config = ctx.accounts.config.load_mut()?;

        if let Some(value) = min_collateral_requirement {
            config.min_collateral_requirement = value;
        }

        if let Some(value) = collateral_for_fixed_quote_amount_rfq_creation {
            config.collateral_for_fixed_quote_amount_rfq_creation = value;
        }

        if let Some(value) = collateral_mint_decimals {
            config.collateral_mint_decimals = value as u64;
        }

        if let Some(value) = safety_price_shift_factor {
            config.safety_price_shift_factor = value;
        }

        if let Some(value) = overall_safety_factor {
            config.overall_safety_factor = value;
        }

        if let Some(value) = accepted_oracle_staleness {
            config.accepted_oracle_staleness = value;
        }

        if let Some(value) = accepted_oracle_confidence_interval_portion {
            config.accepted_oracle_confidence_interval_portion = value;
        }

        Ok(())
    }

    pub fn set_instrument_type(
        ctx: Context<SetInstrumentTypeAccounts>,
        instrument_index: u8,
        instrument_type: InstrumentType,
    ) -> Result<()> {
        let SetInstrumentTypeAccounts {
            protocol, config, ..
        } = ctx.accounts;
        let mut config = config.load_mut()?;

        require!(
            (instrument_index as usize) < protocol.instruments.len(),
            Error::MissingInstrumentIndex
        );

        config.instrument_types[instrument_index as usize] = instrument_type.into();

        Ok(())
    }

    pub fn calculate_collateral_for_rfq(
        mut ctx: Context<CalculateRequiredCollateralForRfq>,
    ) -> Result<u64> {
        let CalculateRequiredCollateralForRfq { rfq, config } = &ctx.accounts;
        let config = config.load()?;

        let required_collateral = match rfq.fixed_size {
            FixedSize::None { padding: _ } => config.min_collateral_requirement,
            FixedSize::BaseAsset {
                legs_multiplier_bps,
            } => {
                let risk_calculator = construct_risk_calculator(
                    &ctx.accounts.rfq,
                    &config,
                    &mut ctx.remaining_accounts,
                )?;
                let leg_multiplier = convert_fixed_point_to_f64(
                    legs_multiplier_bps,
                    Quote::LEG_MULTIPLIER_DECIMALS as u8,
                );

                let side_to_case = |side| CalculationCase {
                    leg_multiplier,
                    authority_side: AuthoritySide::Taker,
                    quote_side: side,
                };

                match rfq.order_type {
                    OrderType::Buy => {
                        risk_calculator.calculate_risk(side_to_case(QuoteSide::Ask))?
                    }
                    OrderType::Sell => {
                        risk_calculator.calculate_risk(side_to_case(QuoteSide::Bid))?
                    }
                    OrderType::TwoWay => risk_calculator
                        .calculate_risk_for_several_cases([
                            side_to_case(QuoteSide::Bid),
                            side_to_case(QuoteSide::Ask),
                        ])?
                        .into_iter()
                        .max()
                        .unwrap(),
                }
            }
            FixedSize::QuoteAsset { quote_amount: _ } => {
                config.collateral_for_fixed_quote_amount_rfq_creation
            }
        };

        msg!(
            "Required collateral: {} with {} decimals",
            required_collateral,
            config.collateral_mint_decimals
        );

        Ok(required_collateral)
    }

    pub fn calculate_collateral_for_response(
        mut ctx: Context<CalculateRequiredCollateralForResponse>,
    ) -> Result<u64> {
        let CalculateRequiredCollateralForResponse {
            rfq,
            response,
            config,
        } = ctx.accounts;
        let config = config.load()?;

        let risk_calculator = construct_risk_calculator(rfq, &config, &mut ctx.remaining_accounts)?;

        let get_case = |quote, side| {
            let legs_multiplier_bps = response.calculate_legs_multiplier_bps_for_quote(rfq, quote);
            let leg_multiplier = convert_fixed_point_to_f64(
                legs_multiplier_bps,
                Quote::LEG_MULTIPLIER_DECIMALS as u8,
            );
            CalculationCase {
                leg_multiplier,
                authority_side: AuthoritySide::Maker,
                quote_side: side,
            }
        };

        let collateral = match (response.bid, response.ask) {
            (Some(bid_quote), Some(ask_quote)) => risk_calculator
                .calculate_risk_for_several_cases([
                    get_case(bid_quote, QuoteSide::Bid),
                    get_case(ask_quote, QuoteSide::Ask),
                ])?
                .into_iter()
                .max()
                .unwrap(),
            (Some(quote), None) => {
                risk_calculator.calculate_risk(get_case(quote, QuoteSide::Bid))?
            }
            (None, Some(quote)) => {
                risk_calculator.calculate_risk(get_case(quote, QuoteSide::Ask))?
            }
            _ => unreachable!(),
        };

        msg!(
            "Required collateral: {} with {} decimals",
            collateral,
            config.collateral_mint_decimals
        );

        Ok(collateral)
    }

    pub fn calculate_collateral_for_confirmation(
        mut ctx: Context<CalculateRequiredCollateralForConfirmation>,
    ) -> Result<(u64, u64)> {
        let CalculateRequiredCollateralForConfirmation {
            rfq,
            response,
            config,
        } = ctx.accounts;
        let config = config.load()?;

        let risk_calculator = construct_risk_calculator(rfq, &config, &mut ctx.remaining_accounts)?;

        let legs_multiplier_bps = response.calculate_confirmed_legs_multiplier_bps(rfq);
        let leg_multiplier =
            convert_fixed_point_to_f64(legs_multiplier_bps, Quote::LEG_MULTIPLIER_DECIMALS as u8);
        let confirmed_side = response.confirmed.unwrap().side;

        let side_to_case = |side| CalculationCase {
            leg_multiplier,
            authority_side: side,
            quote_side: confirmed_side,
        };

        let [taker_collateral, maker_collateral] = risk_calculator
            .calculate_risk_for_several_cases([
                side_to_case(AuthoritySide::Taker),
                side_to_case(AuthoritySide::Maker),
            ])?;
        msg!(
            "Required collateral, taker: {}, maker: {}. With {} decimals",
            taker_collateral,
            maker_collateral,
            config.collateral_mint_decimals
        );

        Ok((taker_collateral, maker_collateral))
    }
}

#[derive(Clone)]
pub struct LegWithMetadata<'a> {
    leg: &'a Leg,
    leg_amount_fraction: f64,
    instrument_type: InstrumentType,
}

fn construct_risk_calculator<'a>(
    rfq: &'a Rfq,
    config: &'a Config,
    remaining_accounts: &mut &[AccountInfo],
) -> Result<RiskCalculator<'a>> {
    let base_assets = extract_base_assets(&rfq.legs, remaining_accounts)?;
    let prices = extract_prices(&base_assets, remaining_accounts, config)?;

    let current_timestamp = Clock::get()?.unix_timestamp;
    let scenarios_selector = ScenarioSelector {
        config,
        settlement_period: rfq.settling_window,
    };
    let legs_with_meta = rfq
        .legs
        .iter()
        .map(|leg| -> Result<LegWithMetadata> {
            let instrument_type = match leg.settlement_type_metadata {
                SettlementTypeMetadata::Instrument { instrument_index } => {
                    config.instrument_types[instrument_index as usize].try_into()?
                }
                SettlementTypeMetadata::PrintTrade { instrument_type } => {
                    instrument_type.try_into()?
                }
            };

            Ok(LegWithMetadata {
                leg,
                leg_amount_fraction: get_leg_amount_f64(leg),
                instrument_type,
            })
        })
        .collect::<Result<Vec<_>>>()?;

    Ok(RiskCalculator {
        legs_with_meta,
        config,
        base_assets,
        prices,
        scenarios_selector: Box::new(move |legs, risk_category| {
            scenarios_selector.select_scenarious(legs, risk_category)
        }),
        current_timestamp,
    })
}

#[derive(Accounts)]
pub struct InitializeConfigAccounts<'info> {
    #[account(mut, constraint = protocol.authority == authority.key() @ Error::NotAProtocolAuthority)]
    pub authority: Signer<'info>,
    pub protocol: Box<Account<'info, ProtocolState>>,
    #[account(
        init,
        payer = authority,
        seeds = [CONFIG_SEED.as_bytes()],
        space = Config::get_allocated_size(),
        bump
    )]
    pub config: AccountLoader<'info, Config>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CloseConfigAccounts<'info> {
    #[account(mut, constraint = protocol.authority == authority.key() @ Error::NotAProtocolAuthority)]
    pub authority: Signer<'info>,
    pub protocol: Box<Account<'info, ProtocolState>>,
    #[account(
        mut,
        close = authority,
        seeds = [CONFIG_SEED.as_bytes()],
        bump
    )]
    pub config: AccountLoader<'info, Config>,
}

#[derive(Accounts)]
pub struct SetRiskCategoryInfo<'info> {
    #[account(constraint = protocol.authority == authority.key() @ Error::NotAProtocolAuthority)]
    pub authority: Signer<'info>,
    pub protocol: Box<Account<'info, ProtocolState>>,
    #[account(mut, seeds = [CONFIG_SEED.as_bytes()], bump)]
    pub config: AccountLoader<'info, Config>,
}

#[derive(Accounts)]
pub struct UpdateConfigAccounts<'info> {
    #[account(constraint = protocol.authority == authority.key() @ Error::NotAProtocolAuthority)]
    pub authority: Signer<'info>,
    pub protocol: Box<Account<'info, ProtocolState>>,
    #[account(mut, seeds = [CONFIG_SEED.as_bytes()], bump)]
    pub config: AccountLoader<'info, Config>,
}

#[derive(Accounts)]
pub struct SetInstrumentTypeAccounts<'info> {
    #[account(constraint = protocol.authority == authority.key() @ Error::NotAProtocolAuthority)]
    pub authority: Signer<'info>,
    pub protocol: Box<Account<'info, ProtocolState>>,
    #[account(mut, seeds = [CONFIG_SEED.as_bytes()], bump)]
    pub config: AccountLoader<'info, Config>,
}

#[derive(Accounts)]
pub struct CalculateRequiredCollateralForRfq<'info> {
    pub rfq: Box<Account<'info, Rfq>>,
    #[account(seeds = [CONFIG_SEED.as_bytes()], bump)]
    pub config: AccountLoader<'info, Config>,
}

#[derive(Accounts)]
pub struct CalculateRequiredCollateralForResponse<'info> {
    pub rfq: Box<Account<'info, Rfq>>,
    pub response: Account<'info, Response>,
    #[account(seeds = [CONFIG_SEED.as_bytes()], bump)]
    pub config: AccountLoader<'info, Config>,
}

#[derive(Accounts)]
pub struct CalculateRequiredCollateralForConfirmation<'info> {
    pub rfq: Box<Account<'info, Rfq>>,
    pub response: Account<'info, Response>,
    #[account(seeds = [CONFIG_SEED.as_bytes()], bump)]
    pub config: AccountLoader<'info, Config>,
}
