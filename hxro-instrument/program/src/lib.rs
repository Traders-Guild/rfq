use anchor_lang::prelude::*;
use anchor_lang::solana_program;
use anchor_lang::solana_program::instruction::Instruction;
use anchor_lang::Id;
use anchor_lang::InstructionData;
use anchor_spl::associated_token::get_associated_token_address;
use anchor_spl::token::{
    close_account, transfer, CloseAccount, Mint, Token, TokenAccount, Transfer,
};
use std::str::FromStr;

use dex_cpi as dex;
use errors::HxroError;
use rfq::state::{AuthoritySide, ProtocolState, Response, Rfq};
use risk_cpi as risk;
use state::{AuthoritySideDuplicate, ParsedLegData};

mod errors;
mod state;
mod helpers;

declare_id!("5Vhsk4PT6MDMrGSsQoQGEHfakkntEYydRYTs14T1PooL");

#[derive(Debug, Clone)]
pub struct Dex;

impl Id for Dex {
    fn id() -> Pubkey {
        Pubkey::from_str("FUfpR31LmcP1VSbz5zDaM7nxnH55iBHkpwusgrnhaFjL").unwrap()
    }
}

#[program]
pub mod hxro_instrument {
    use super::*;

    pub fn validate_data(ctx: Context<ValidateData>) -> Result<()> {
        for leg in ctx.accounts.rfq.legs.clone() {
            helpers::validate_instrument_data(&ctx, &leg.instrument_data)?;
        }

        helpers::validate_instrument_data(&ctx, &ctx.accounts.rfq.quote_asset.instrument_data)?;

        Ok(())
    }

    pub fn create_print_trade(ctx: Context<CreatePrintTrade>) -> Result<()> {
        Ok(())
    }

    pub fn settle_print_trade(ctx: Context<SettlePrintTrade>) -> Result<()> {
        Ok(())
    }

    pub fn clean_up(ctx: Context<CleanUp>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct ValidateData<'info> {
    /// protocol provided
    #[account(signer)]
    pub protocol: Account<'info, ProtocolState>,

    pub rfq: Account<'info, Rfq>,

    /// CHECK:
    pub dex: AccountInfo<'info>,
    /// CHECK:
    pub fee_model_program: AccountInfo<'info>,
    /// CHECK:
    pub risk_engine_program: AccountInfo<'info>,
    /// CHECK:
    pub fee_model_configuration_acct: AccountInfo<'info>,
    /// CHECK:
    pub risk_model_configuration_acct: AccountInfo<'info>,
    /// CHECK:
    pub fee_output_register: AccountInfo<'info>,
    /// CHECK:
    pub risk_output_register: AccountInfo<'info>,
    /// CHECK:
    pub risk_and_fee_signer: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CreatePrintTrade {}

#[derive(Accounts)]
pub struct SettlePrintTrade {}

#[derive(Accounts)]
#[instruction(leg_index: u8)]
pub struct CleanUp {}
