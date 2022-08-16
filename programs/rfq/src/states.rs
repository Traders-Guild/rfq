use std::{collections::HashMap, mem};

use anchor_lang::prelude::*;
use anchor_spl::token::TokenAccount;

use crate::errors::ProtocolError;

#[account]
pub struct ProtocolState {
    // Protocol initiator
    pub authority: Pubkey,
    pub bump: u8,

    // Active protocol means all instructions are executable
    pub active: bool,

    pub settle_fees: FeeParameters,
    pub default_fees: FeeParameters,

    pub risk_engine: Pubkey,
    pub risk_engine_register: Pubkey,
    pub collateral_mint: Pubkey,
    pub instruments: HashMap<Pubkey, InstrumentParameters>,
}

impl ProtocolState {
    pub const INSTRUMENT_SIZE: usize =
        mem::size_of::<Pubkey>() + mem::size_of::<InstrumentParameters>();
    pub const MAX_INSTRUMENTS: usize = 50;
}

#[account]
pub struct Rfq {
    pub taker: Pubkey,

    pub order_type: OrderType,
    pub last_look_enabled: bool,
    pub fixed_size: FixedSize,
    pub quote_mint: Pubkey,
    pub access_manager: Option<Pubkey>, // replase with nullable wrapper

    pub creation_timestamp: i64,
    pub active_window: u32,
    pub settling_window: u32,

    pub state: StoredRfqState,
    pub non_response_taker_collateral_locked: u64,
    pub total_taker_collateral_locked: u64,
    pub total_responses: u32,
    pub cleared_responses: u32,
    pub confirmed_responses: u32,

    pub legs: Vec<Leg>,
}

impl Rfq {
    pub fn get_state(&self) -> Result<RfqState> {
        let state = match self.state {
            StoredRfqState::Constructed => RfqState::Constructed,
            StoredRfqState::Active => {
                let current_time = Clock::get()?.unix_timestamp;
                if self.active_window_ended(current_time) {
                    RfqState::Active
                } else if self.confirmed_responses == 0 {
                    RfqState::Expired
                } else if self.settle_window_ended(current_time) {
                    RfqState::Settling
                } else {
                    RfqState::SettlingEnded
                }
            }
            StoredRfqState::Canceled => RfqState::Canceled,
        };
        Ok(state)
    }

    pub fn active_window_ended(&self, current_time: i64) -> bool {
        current_time >= self.creation_timestamp + self.active_window as i64
    }

    pub fn settle_window_ended(&self, current_time: i64) -> bool {
        current_time
            >= self.creation_timestamp + self.active_window as i64 + self.settling_window as i64
    }
}

#[account]
pub struct Response {
    pub maker: Pubkey,
    pub rfq: Pubkey,

    pub creation_timestamp: i64,
    pub maker_collateral_locked: u64,
    pub taker_collateral_locked: u64,
    pub state: StoredResponseState,

    pub confirmed: Option<Side>,
    pub bid: Option<Quote>,
    pub ask: Option<Quote>,
}

impl Response {
    pub fn get_state(&self, rfq: &Rfq) -> Result<ResponseState> {
        let current_time = Clock::get()?.unix_timestamp;
        let active_window_ended = rfq.active_window_ended(current_time);
        let settle_window_ended = rfq.settle_window_ended(current_time);
        let state = match self.state {
            StoredResponseState::Active => {
                if !active_window_ended {
                    ResponseState::Active
                } else {
                    ResponseState::Expired
                }
            }
            StoredResponseState::Canceled => ResponseState::Canceled,
            StoredResponseState::WaitingForLastLook => {
                if !active_window_ended {
                    ResponseState::WaitingForLastLook
                } else {
                    ResponseState::Expired
                }
            }
            StoredResponseState::SettlingPreparations => {
                if !settle_window_ended {
                    ResponseState::SettlingPreparations
                } else {
                    ResponseState::Defaulted
                }
            }
            StoredResponseState::OnlyMakerPrepared => {
                if !settle_window_ended {
                    ResponseState::OnlyMakerPrepared
                } else {
                    ResponseState::Defaulted
                }
            }
            StoredResponseState::OnlyTakerPrepared => {
                if !settle_window_ended {
                    ResponseState::OnlyTakerPrepared
                } else {
                    ResponseState::Defaulted
                }
            }
            StoredResponseState::ReadyForSettling => ResponseState::ReadyForSettling,
            StoredResponseState::Settled => ResponseState::Settled,
            StoredResponseState::Defaulted => ResponseState::Defaulted,
        };
        Ok(state)
    }
}

#[account]
pub struct CollateralInfo {
    pub bump: u8,
    pub token_account_bump: u8,
    pub locked_tokens_amount: u64,
}

impl CollateralInfo {
    pub fn lock_collateral(&mut self, token_account: &TokenAccount, amount: u64) -> Result<()> {
        require!(
            amount <= token_account.amount - self.locked_tokens_amount,
            ProtocolError::NotEnoughCollateral
        );
        self.locked_tokens_amount += amount;
        Ok(())
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone)]
pub struct InstrumentParameters {
    pub validate_data_accounts: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone)]
pub struct FeeParameters {
    taker_bps: u64,
    maker_bps: u64,
}

impl FeeParameters {
    pub const BPS_DECIMALS: usize = 9;
}

#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone)]
pub enum FixedSize {
    None { padding: u64 }, // for consistent serialization purposes
    BaseAsset { legs_multiplier_bps: u64 },
    QuoteAsset { quote_amount: u64 },
}

#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone)]
pub enum OrderType {
    Buy,
    Sell,
    TwoWay,
}

#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone)]
pub enum Quote {
    Standart {
        price_quote: PriceQuote,
        legs_multiplier_bps: u64,
    },
    FixedSize {
        price_quote: PriceQuote,
    },
}

#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone)]
pub enum PriceQuote {
    AbsolutePrice { amount_bps: u128 },
}

#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone)]
pub enum StoredRfqState {
    Constructed,
    Active,
    Canceled,
}

#[derive(Clone, Copy, PartialEq, Eq)]
pub enum RfqState {
    Constructed,
    Active,
    Canceled,
    Expired,
    Settling,
    SettlingEnded,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Leg {
    pub instrument: Pubkey,
    pub instrument_data: Vec<u8>,
    pub instrument_amount: u64,
    pub side: Side,
}

#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone)]
pub enum Side {
    Bid,
    Ask,
}

#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone)]
pub enum StoredResponseState {
    Active,
    Canceled,
    WaitingForLastLook,
    SettlingPreparations,
    OnlyMakerPrepared,
    OnlyTakerPrepared,
    ReadyForSettling,
    Settled,
    Defaulted,
}

#[derive(Clone, Copy, PartialEq, Eq)]
pub enum ResponseState {
    Active,
    Canceled,
    WaitingForLastLook,
    SettlingPreparations,
    OnlyMakerPrepared,
    OnlyTakerPrepared,
    ReadyForSettling,
    Settled,
    Defaulted,
    Expired,
}
