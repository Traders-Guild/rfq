//! Request for quote (RFQ) protocol.
//!
//! Provides an abstraction and implements the RFQ mechanism.

use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};
use solana_program::sysvar::clock::Clock;
use psy_american::cpi::accounts::{ExerciseOption, MintOptionV2};
use psy_american::OptionMarket;

declare_id!("669TjP6JkroCT5czWue2TGEPfcuFN8cz99Z1QMcNCWv7");

/// Asset escrow PDA seed
pub const ASSET_ESCROW_SEED: &str = "asset_escrow";
/// Order PDA seed
pub const ORDER_SEED: &str = "order";
/// Protocol PDA seed
pub const PROTOCOL_SEED: &str = "protocol";
/// Quote PDA seed
pub const QUOTE_ESCROW_SEED: &str = "quote_escrow";
/// RFQ PDA seed
pub const RFQ_SEED: &str = "rfq";

/// Request for quote module.
#[program]
pub mod rfq {
    use super::*;

    /// Initializes protocol.
    ///
    /// ctx
    /// fee_denominator Fee denominator
    /// fee_numerator Fee numerator
    pub fn initialize(
        ctx: Context<Initialize>,
        fee_denominator: u64,
        fee_numerator: u64,
    ) -> Result<()> {
        instructions::initialize(ctx, fee_denominator, fee_numerator)
    }

    /// Taker requests quote (RFQ).
    ///
    /// expiry
    /// last_look
    /// legs
    /// expiry
    /// order_amount
    /// order_side
    pub fn request(
        ctx: Context<Request>,
        expiry: i64,
        last_look: bool,
        legs: Vec<Leg>,
        order_amount: u64,
        order_side: Order,
    ) -> Result<()> {
        instructions::request(ctx, expiry, last_look, legs, order_amount, order_side)
    }

    /// Maker responds with one-way or two-way quotes.
    ///
    /// ctx
    /// bid
    /// ask
    #[access_control(respond_access_control(&ctx, bid, ask))]
    pub fn respond(ctx: Context<Respond>, bid: Option<u64>, ask: Option<u64>) -> Result<()> {
        instructions::respond(ctx, bid, ask)
    }

    /// Taker confirms order.
    ///
    /// ctx
    /// order_side
    #[access_control(confirm_access_control(&ctx, order_side))]
    pub fn confirm(ctx: Context<Confirm>, order_side: Side) -> Result<()> {
        instructions::confirm(ctx, order_side)
    }

    /// Last look.
    ///
    /// ctx
    #[access_control(last_look_access_control(&ctx))]
    pub fn last_look(ctx: Context<LastLook>) -> Result<()> {
        instructions::last_look(ctx)
    }

    /// Return collateral of losting makers.
    ///
    /// ctx
    #[access_control(return_collateral_access_control(&ctx))]
    pub fn return_collateral(ctx: Context<ReturnCollateral>) -> Result<()> {
        instructions::return_collateral(ctx)
    }

    /// Settles winning maker and taker fund transfers.
    ///
    /// ctx
    #[access_control(settle_access_control(&ctx))]
    pub fn settle(ctx: Context<Settle>) -> Result<()> {
        instructions::settle(ctx)
    }
}

// State

/// Holds state of a single RFQ.
#[account]
pub struct RfqState {
    /// If approved by authority
    pub approved: bool,  // uwe: are we setting this flag to false during cancellatins?
    /// Asset escrow bump
    pub asset_escrow_bump: u8,
    /// Asset mint
    pub asset_mint: Pubkey,
    /// Authority
    pub authority: Pubkey,
    /// Best ask amount
    pub best_ask_amount: Option<u64>,
    /// Best bid amount
    pub best_bid_amount: Option<u64>,
    /// Best ask amount
    pub best_ask_address: Option<Pubkey>,
    /// Best bid amount
    pub best_bid_address: Option<Pubkey>,
    /// PDA bump
    pub bump: u8,
    /// Order side
    pub order_side: Order,
    /// Confirmed
    pub confirmed: bool,
    /// Expiry time
    pub expiry: i64,
    /// Incremental integer id
    pub id: u64,
    /// Legs
    pub legs: Vec<Leg>,
    /// Last look required to approve trade
    pub last_look: bool,
    /// Order amount
    pub order_amount: u64,
    /// Quote escrow bump
    pub quote_escrow_bump: u8,
    /// Quote mint
    pub quote_mint: Pubkey,
    /// Response count
    pub response_count: u64,
    /// Settled
    pub settled: bool,
    /// Creation time
    pub unix_timestamp: i64,
}

impl RfqState {
    pub const LEN: usize = 8 + (32 * 5) + (Leg::LEN * 10 + 1) + (8 * 7) + (1 * 14);
}

/// Global state for the entire RFQ system
#[account]
pub struct ProtocolState {
    pub access_manager_count: u64,
    pub authority: Pubkey,
    pub bump: u8,
    pub fee_denominator: u64,
    pub fee_numerator: u64,
    pub rfq_count: u64,
    pub treasury_wallet: Pubkey,
}

impl ProtocolState {
    pub const LEN: usize = 8 + (32 * 2) + (8 * 4) + (1 * 1);
}

/// Market maker order state
#[account]
pub struct OrderState {
    // Optional ask
    pub ask: Option<u64>,
    // Authority
    pub authority: Pubkey,
    // Optional bid
    pub bid: Option<u64>,
    // PDA bump
    pub bump: u8,
    /// Collateral returned
    pub collateral_returned: bool,
    // Order has been confirmed
    pub confirmed: bool,
    // Confirmed side
    pub confirmed_side: Option<Side>,
    // Order id
    pub id: u64,
    /// Settled
    pub settled: bool,
    /// Creation time
    pub unix_timestamp: i64,
}

impl OrderState {
    pub const LEN: usize = 8 + (32 * 1) + (8 * 4) + (1 * 2) + (1 * 3) + (1 + 4) + (1 * 1);
}


// Contexts

/// Intializes protocol.
#[derive(Accounts)]
pub struct Initialize<'info> {
    /// Protocol authority
    #[account(mut)]
    pub authority: Signer<'info>,
    /// Protocol state
    #[account(
        init,
        payer = authority,
        seeds = [PROTOCOL_SEED.as_bytes()],
        space = ProtocolState::LEN,
        bump
    )]
    pub protocol: Account<'info, ProtocolState>,
    /// Solana system program
    pub system_program: Program<'info, System>,
}

/// Requests quote (RFQ).
#[derive(Accounts)]
pub struct Request<'info> {
    /// Asset escrow account
    #[account(
        init,
        payer = authority,
        token::mint = asset_mint,
        token::authority = rfq,
        seeds = [
            ASSET_ESCROW_SEED.as_bytes(),
            (protocol.rfq_count + 1).to_string().as_bytes()
        ],
        bump
    )]
    pub asset_escrow: Account<'info, TokenAccount>,
    /// Asset mint
    pub asset_mint: Box<Account<'info, Mint>>,
    /// Request authority
    #[account(mut)]
    pub authority: Signer<'info>,
    /// Protocol state
    #[account(
        mut,
        seeds = [PROTOCOL_SEED.as_bytes()],
        bump = protocol.bump
    )]
    pub protocol: Account<'info, ProtocolState>,
    /// Quote escrow account
    #[account(
        init,
        payer = authority,
        token::mint = quote_mint,
        token::authority = rfq,
        seeds = [
            QUOTE_ESCROW_SEED.as_bytes(),
            (protocol.rfq_count + 1).to_string().as_bytes()
        ],
        bump
    )]
    pub quote_escrow: Account<'info, TokenAccount>,
    /// Quote mint
    pub quote_mint: Box<Account<'info, Mint>>,
    /// TODO: Decide what to do about this
    pub rent: Sysvar<'info, Rent>,
    /// RFQ state
    #[account(
        init,
        payer = authority,
        seeds = [
            RFQ_SEED.as_bytes(),
            (protocol.rfq_count + 1).to_string().as_bytes()
        ],
        space = RfqState::LEN,
        bump
    )]
    pub rfq: Box<Account<'info, RfqState>>,
    /// System program used for initializing accounts
    pub system_program: Program<'info, System>,
    /// Token program used for initializing token accounts
    pub token_program: Program<'info, Token>,
}

/// Responds to quote.
#[derive(Accounts)]
pub struct Respond<'info> {
    /// Authority
    #[account(mut)]
    pub authority: Signer<'info>,
    /// Order
    #[account(
        init,
        payer = authority,
        seeds = [
            ORDER_SEED.as_bytes(),
            rfq.id.to_string().as_bytes(),
            (rfq.response_count + 1).to_string().as_bytes()
        ],
        space = OrderState::LEN,
        bump
    )]
    pub order: Box<Account<'info, OrderState>>,
    /// RFQ
    #[account(
        mut,
        seeds = [RFQ_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.bump
    )]
    pub rfq: Box<Account<'info, RfqState>>,
    /// Asset wallet
    #[account(mut)]
    pub asset_wallet: Box<Account<'info, TokenAccount>>,
    /// Quote wallet
    #[account(mut)]
    pub quote_wallet: Box<Account<'info, TokenAccount>>,
    /// Asset escrow
    #[account(
        mut,
        seeds = [ASSET_ESCROW_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.asset_escrow_bump
    )]
    pub asset_escrow: Box<Account<'info, TokenAccount>>,
    /// Quote escrow
    #[account(
        mut,
        seeds = [QUOTE_ESCROW_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.quote_escrow_bump
    )]
    pub quote_escrow: Box<Account<'info, TokenAccount>>,
    /// Asset mint
    pub asset_mint: Box<Account<'info, Mint>>,
    /// Quote mint
    pub quote_mint: Box<Account<'info, Mint>>,
    /// System program
    pub system_program: Program<'info, System>,
    /// Token program
    pub token_program: Program<'info, Token>,
    /// Rent
    pub rent: Sysvar<'info, Rent>,
}

/// Confirms RFQ response.
#[derive(Accounts)]
pub struct Confirm<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [RFQ_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.bump
    )]
    pub rfq: Box<Account<'info, RfqState>>,
    #[account(mut)]
    pub asset_wallet: Box<Account<'info, TokenAccount>>,
    pub asset_mint: Box<Account<'info, Mint>>,
    #[account(
        mut,
        seeds = [ASSET_ESCROW_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.asset_escrow_bump,
    )]
    pub asset_escrow: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        seeds = [
            ORDER_SEED.as_bytes(),
            rfq.id.to_string().as_bytes(),
            order.id.to_string().as_bytes(),
        ],
        bump = order.bump
    )]
    pub order: Box<Account<'info, OrderState>>,
    #[account(
        mut,
        seeds = [QUOTE_ESCROW_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.quote_escrow_bump
    )]
    pub quote_escrow: Box<Account<'info, TokenAccount>>,
    pub quote_mint: Box<Account<'info, Mint>>,
    #[account(mut)]
    pub quote_wallet: Box<Account<'info, TokenAccount>>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

/// Last look for RFQ.
#[derive(Accounts)]
pub struct LastLook<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [
            ORDER_SEED.as_bytes(),
            rfq.id.to_string().as_bytes(),
            order.id.to_string().as_bytes()
        ],
        bump = order.bump
    )]
    pub order: Box<Account<'info, OrderState>>,
    #[account(
        mut,
        seeds = [RFQ_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.bump
    )]
    pub rfq: Box<Account<'info, RfqState>>,
}

/// Returns collateral.
#[derive(Accounts)]
pub struct ReturnCollateral<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    pub asset_mint: Box<Account<'info, Mint>>,
    #[account(mut)]
    pub asset_wallet: Box<Account<'info, TokenAccount>>,
    #[account(mut)]
    pub quote_wallet: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        seeds = [ASSET_ESCROW_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.asset_escrow_bump
    )]
    pub asset_escrow: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        seeds = [
            ORDER_SEED.as_bytes(),
            rfq.id.to_string().as_bytes(),
            order.id.to_string().as_bytes()
        ],
        bump = order.bump
    )]
    pub order: Box<Account<'info, OrderState>>,
    pub quote_mint: Box<Account<'info, Mint>>,
    #[account(
        mut,
        seeds = [QUOTE_ESCROW_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.quote_escrow_bump
    )]
    pub quote_escrow: Box<Account<'info, TokenAccount>>,
    pub rfq: Box<Account<'info, RfqState>>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

/// Settles RFQ.
#[derive(Accounts)]
pub struct Settle<'info> {
    pub asset_mint: Box<Account<'info, Mint>>,
    #[account(mut)]
    pub asset_wallet: Box<Account<'info, TokenAccount>>,
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [ASSET_ESCROW_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.asset_escrow_bump
    )]
    pub asset_escrow: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        seeds = [QUOTE_ESCROW_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.quote_escrow_bump
    )]
    pub quote_escrow: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        seeds = [
            ORDER_SEED.as_bytes(),
            rfq.id.to_string().as_bytes(),
            order.id.to_string().as_bytes()
        ],
        bump = order.bump
    )]
    pub order: Box<Account<'info, OrderState>>,
    #[account(
        mut,
        seeds = [RFQ_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.bump
    )]
    pub rfq: Box<Account<'info, RfqState>>,
    #[account(mut)]
    pub quote_wallet: Box<Account<'info, TokenAccount>>,
    pub quote_mint: Box<Account<'info, Mint>>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}


#[derive(Accounts)]
pub struct AmericanOptionCtx<'info> {
    #[account(mut, signer)]
    pub authority: AccountInfo<'info>,
    pub psy_american_program: AccountInfo<'info>,
    /// The vault where the underlying assets are held. This is the PsyAmerican 
    /// `underlying_asset_src`
    #[account(mut)]
    pub pool: Box<Account<'info, TokenAccount>>,
    #[account(mut)]
    pub pool_authority: AccountInfo<'info>,

    /// Mint CPI acounts
    pub underlying_asset_mint: AccountInfo<'info>,
    #[account(mut)]
    pub underlying_asset_pool: Box<Account<'info, TokenAccount>>,
    #[account(mut)]
    pub option_mint: Box<Account<'info, Mint>>,
    #[account(mut)]
    pub minted_option_dest: Box<Account<'info, TokenAccount>>,
    #[account(mut)]
    pub writer_token_mint: Box<Account<'info, Mint>>,
    #[account(mut)]
    pub minted_writer_token_dest: Box<Account<'info, TokenAccount>>,
    pub option_market: Box<Account<'info, OptionMarket>>,
    #[account(mut)]
    pub fee_owner: AccountInfo<'info>,

    /// RFQ
    #[account(
        mut,
        seeds = [RFQ_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.bump
    )]
    pub rfq: Box<Account<'info, RfqState>>,


    pub token_program: AccountInfo<'info>,
    pub associated_token_program: AccountInfo<'info>,
    pub clock: Sysvar<'info, Clock>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: AccountInfo<'info>,
}

// Types

/// RFQ instrument type.
#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone, Debug, PartialEq, Eq)]
pub enum Instrument {
    Call,
    Future,
    Put,
    Spot,
}

/// Venue for RFQ leg.
#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone, Debug, PartialEq, Eq)]
pub enum Venue {
    Convergence,
    PsyOptions,
}

/// RFQ implementation.
#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone, Debug, PartialEq, Eq)]
pub struct Leg {
    instrument: Instrument,
    venue: Venue,
}

impl Leg {
    pub const LEN: usize = (1 + (1 * 4)) + (1 + (1 * 2)) + (1 + (1 * 2)) + (8 * 1);
}

/// Order side for RFQ.
#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone, Debug, PartialEq, Eq)]
pub enum Side {
    Buy,
    Sell,
}

// uwe: what's the difference between order and side?

/// Order.
#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone, Debug, PartialEq, Eq)]
pub enum Order {
    Buy,
    Sell,
    TwoWay,
}

// Access controls

/// Settlement access control. Ensures RFQ is:
///
/// 1. RFQ has not yet been settled if taker
/// 2. Order has not yet been settled if maker
/// 3. If last look is required then RFQ is approved
pub fn settle_access_control<'info>(ctx: &Context<Settle<'info>>) -> Result<()> {
    let rfq = &ctx.accounts.rfq;
    let order = &ctx.accounts.order;

    let authority = ctx.accounts.authority.key();
    let taker = rfq.authority.key();
    let maker = order.authority.key();

    if authority == taker {
        require!(!rfq.settled, ProtocolError::RfqSettled);
    }
    if authority == maker {
        require!(!order.settled, ProtocolError::OrderSettled);
    }

    if rfq.last_look {
        require!(rfq.approved, ProtocolError::OrderNotApproved);
    }

    require!(rfq.confirmed, ProtocolError::InvalidConfirm);

    Ok(())
}

/// Last look access control. Ensures last look:
///
/// 1. Last looks is configured for RFQ
/// 2. Order belongs to authority approving via last look
pub fn last_look_access_control<'info>(ctx: &Context<LastLook<'info>>) -> Result<()> {
    let rfq = &ctx.accounts.rfq;
    let authority = ctx.accounts.authority.key();
    let order_authority = ctx.accounts.order.authority.key();

    require!(rfq.last_look, ProtocolError::LastLookNotSet);
    require!(
        order_authority == authority,
        ProtocolError::OrderNotApproved
    );

    Ok(())
}

/// Confirmation access control. Ensures confirmation is:
///
/// 1. RFQ is unconfirmed
/// 2. Confirmed by taker
/// 3. Is not already confirmed
/// 4. RFQ best bid/ask is same as order bid/ask
pub fn confirm_access_control<'info>(
    ctx: &Context<Confirm<'info>>,
    order_side: Side,
) -> Result<()> {
    let order = &ctx.accounts.order;
    let rfq = &ctx.accounts.rfq;
    let taker = rfq.authority.key();
    let authority = ctx.accounts.authority.key();

    require!(taker == authority, ProtocolError::InvalidTaker);
    require!(!order.confirmed, ProtocolError::OrderConfirmed);
    require!(!rfq.confirmed, ProtocolError::RfqConfirmed);

    match rfq.order_side {
        Order::Buy => {
            require!(order_side == Side::Buy, ProtocolError::InvalidConfirm);
            require!(
                rfq.best_ask_amount.unwrap() == order.ask.unwrap(),
                ProtocolError::InvalidConfirm
            );
        }
        Order::Sell => {
            require!(order_side == Side::Sell, ProtocolError::InvalidConfirm);
            require!(
                rfq.best_bid_amount.unwrap() == order.bid.unwrap(),
                ProtocolError::InvalidConfirm
            )
        }
        Order::TwoWay => {
            require!(
                rfq.best_ask_amount.unwrap() == order.ask.unwrap()
                    || rfq.best_bid_amount.unwrap() == order.bid.unwrap(),
                ProtocolError::InvalidConfirm
            )
        }
    }

    Ok(())
}

/// Response access control. Ensures response satisfies the following conditions:
///
/// 1. RFQ authority is not the same as maker authority
/// 2. RFQ is not expired
/// 3. Response bid/ask match request order side
/// 4. Response bid/ask amount is greater than 0
pub fn respond_access_control<'info>(
    ctx: &Context<Respond<'info>>,
    bid: Option<u64>,
    ask: Option<u64>,
) -> Result<()> {
    let rfq = &ctx.accounts.rfq;

    let maker_authority = &ctx.accounts.authority.key();
    let taker_authority = &rfq.authority.key();

    require!(
        taker_authority != maker_authority,
        ProtocolError::InvalidAuthority
    );
    require!(
        rfq.expiry > Clock::get().unwrap().unix_timestamp,
        ProtocolError::Expired
    );

    match rfq.order_side {
        Order::Buy => {
            require!(ask.is_some() && bid.is_none(), ProtocolError::InvalidQuote);
            require!(ask.unwrap() > 0, ProtocolError::InvalidQuote);
        }
        Order::Sell => {
            require!(bid.is_some() && ask.is_none(), ProtocolError::InvalidQuote);
            require!(bid.unwrap() > 0, ProtocolError::InvalidQuote);
        }
        Order::TwoWay => {
            require!(bid.is_some() && ask.is_some(), ProtocolError::InvalidQuote);
            require!(
                ask.unwrap() > 0 && bid.unwrap() > 0,
                ProtocolError::InvalidQuote
            );
        }
    }

    Ok(())
}

/// Return collateral access control. Ensures returning collateral for RFQ that is:
///
/// 1. Collateral has not already by returned
/// 2. Order is not confirmed
/// 3. If RFQ is not confirmed either expired or order has been confirmed
pub fn return_collateral_access_control<'info>(ctx: &Context<ReturnCollateral>) -> Result<()> {
    let rfq = &ctx.accounts.rfq;
    let order = &ctx.accounts.order;

    require!(
        !order.collateral_returned,
        ProtocolError::CollateralReturned
    );

    require!(!order.confirmed, ProtocolError::OrderConfirmed);

    if !rfq.confirmed {
        require!(
            Clock::get().unwrap().unix_timestamp > rfq.expiry,
            ProtocolError::ActiveOrUnconfirmed
        );
    }

    Ok(())
}

// Error handling

/// Error handling codes.
#[error_code]
pub enum ProtocolError {
    #[msg("Active or unconfirmed")]
    ActiveOrUnconfirmed,
    #[msg("Collateral returned")]
    CollateralReturned,
    #[msg("Expired")]
    Expired,
    #[msg("Invalid confirm")]
    InvalidConfirm,
    #[msg("Invalid order")]
    InvalidOrder,
    #[msg("Invalid quote")]
    InvalidQuote,
    #[msg("Invalid taker")]
    InvalidTaker,
    #[msg("Invalid authority")]
    InvalidAuthority,
    #[msg("Invalid order amount")]
    InvalidOrderAmount,
    #[msg("Invalid settle")]
    InvalidSettle,
    #[msg("Last look has not been set")]
    LastLookNotSet,
    #[msg("RFQ confirmed")]
    RfqConfirmed,
    #[msg("Order confirmed")]
    OrderConfirmed,
    #[msg("Order settled")]
    OrderSettled,
    #[msg("Order not approved via last look")]
    OrderNotApproved,
    #[msg("RFQ settled")]
    RfqSettled,
}

/// Private module for program instructions.
mod instructions {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        fee_denominator: u64,
        fee_numerator: u64,
    ) -> Result<()> {
        let protocol = &mut ctx.accounts.protocol;
        protocol.access_manager_count = 0;
        protocol.authority = ctx.accounts.authority.key();
        protocol.bump = *ctx.bumps.get(PROTOCOL_SEED).unwrap();
        protocol.fee_denominator = fee_denominator;
        protocol.fee_numerator = fee_numerator;
        protocol.rfq_count = 0;

        Ok(())
    }

    pub fn request(
        ctx: Context<Request>,
        expiry: i64,
        last_look: bool,
        legs: Vec<Leg>,
        order_amount: u64,
        order_side: Order,
    ) -> Result<()> {
        let protocol = &mut ctx.accounts.protocol;
        protocol.rfq_count += 1;

        let rfq = &mut ctx.accounts.rfq;
        rfq.asset_escrow_bump = *ctx.bumps.get(ASSET_ESCROW_SEED).unwrap();
        rfq.asset_mint = ctx.accounts.asset_mint.key();
        rfq.authority = ctx.accounts.authority.key();
        rfq.approved = false;
        rfq.best_ask_address = None;
        rfq.best_ask_amount = None;
        rfq.best_bid_address = None;
        rfq.best_bid_amount = None;
        rfq.bump = *ctx.bumps.get(RFQ_SEED).unwrap();
        rfq.expiry = expiry;
        rfq.id = ctx.accounts.protocol.rfq_count;
        rfq.last_look = last_look;
        rfq.legs = vec![];
        rfq.order_amount = order_amount;
        rfq.quote_escrow_bump = *ctx.bumps.get(QUOTE_ESCROW_SEED).unwrap();
        rfq.quote_mint = ctx.accounts.quote_mint.key();
        rfq.order_side = order_side;
        rfq.response_count = 0;
        rfq.settled = false;
        rfq.unix_timestamp = Clock::get().unwrap().unix_timestamp;
        rfq.legs = legs;

        Ok(())
    }

    pub fn respond(ctx: Context<Respond>, bid: Option<u64>, ask: Option<u64>) -> Result<()> {
        let rfq = &mut ctx.accounts.rfq;
        rfq.response_count += 1;

        let order = &mut ctx.accounts.order;
        order.authority = ctx.accounts.authority.key();
        order.bump = *ctx.bumps.get(ORDER_SEED).unwrap();
        order.id = rfq.response_count;
        order.unix_timestamp = Clock::get().unwrap().unix_timestamp;

        if ask.is_some() {
            anchor_spl::token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    anchor_spl::token::Transfer {
                        from: ctx.accounts.asset_wallet.to_account_info(),
                        to: ctx.accounts.asset_escrow.to_account_info(),
                        authority: ctx.accounts.authority.to_account_info(),
                    },
                ),
                // Collateral is an asset token amount
                rfq.order_amount,
            )?;

            order.ask = ask;

            if rfq.best_ask_amount.is_none() || ask.unwrap() < rfq.best_ask_amount.unwrap() {
                rfq.best_ask_amount = ask;
                rfq.best_ask_address = Some(order.authority);
            }
        }

        if bid.is_some() {
            anchor_spl::token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    anchor_spl::token::Transfer {
                        from: ctx.accounts.quote_wallet.to_account_info(),
                        to: ctx.accounts.quote_escrow.to_account_info(),
                        authority: ctx.accounts.authority.to_account_info(),
                    },
                ),
                // Collateral is a quote token amount
                bid.unwrap(),
            )?;

            order.bid = bid;

            if rfq.best_bid_amount.is_none() || bid.unwrap() > rfq.best_bid_amount.unwrap() {
                rfq.best_bid_amount = bid;
                rfq.best_bid_address = Some(order.authority);
            }
        }

        Ok(())
    }

    pub fn confirm(ctx: Context<Confirm>, side: Side) -> Result<()> {
        let order = &mut ctx.accounts.order;
        order.confirmed = true;
        order.confirmed_side = Some(side);

        let rfq = &mut ctx.accounts.rfq;
        rfq.confirmed = true;

        let order_amount;
        let from;
        let to;

        match side {
            Side::Buy => {
                from = ctx.accounts.quote_wallet.to_account_info();
                to = ctx.accounts.quote_escrow.to_account_info();
                order_amount = rfq.best_ask_amount.unwrap();
            }
            Side::Sell => {
                from = ctx.accounts.asset_wallet.to_account_info();
                to = ctx.accounts.asset_escrow.to_account_info();
                order_amount = rfq.order_amount;
            }
        };

        anchor_spl::token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                anchor_spl::token::Transfer {
                    from,
                    to,
                    authority: ctx.accounts.authority.to_account_info(),
                },
            ),
            order_amount,
        )?;

        Ok(())
    }

    pub fn last_look(ctx: Context<LastLook>) -> Result<()> {
        let rfq = &mut ctx.accounts.rfq;
        rfq.approved = true;

        Ok(())
    }

    pub fn return_collateral(ctx: Context<ReturnCollateral>) -> Result<()> {
        let rfq = &ctx.accounts.rfq;

        let order = &mut ctx.accounts.order;
        order.collateral_returned = true;
        order.settled = true;

        if order.ask.is_some() {
            anchor_spl::token::transfer(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(),
                    anchor_spl::token::Transfer {
                        from: ctx.accounts.asset_escrow.to_account_info(),
                        to: ctx.accounts.asset_wallet.to_account_info(),
                        authority: rfq.to_account_info(),
                    },
                    &[
                        &[
                            ASSET_ESCROW_SEED.as_bytes(),
                            rfq.id.to_string().as_bytes(),
                            &[rfq.asset_escrow_bump],
                        ][..],
                        &[
                            RFQ_SEED.as_bytes(),
                            rfq.id.to_string().as_bytes(),
                            &[rfq.bump],
                        ][..],
                    ],
                ),
                rfq.order_amount,
            )?;
        }

        if order.bid.is_some() {
            anchor_spl::token::transfer(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(),
                    anchor_spl::token::Transfer {
                        from: ctx.accounts.quote_escrow.to_account_info(),
                        to: ctx.accounts.quote_wallet.to_account_info(),
                        authority: rfq.to_account_info(),
                    },
                    &[
                        &[
                            QUOTE_ESCROW_SEED.as_bytes(),
                            rfq.id.to_string().as_bytes(),
                            &[rfq.quote_escrow_bump],
                        ][..],
                        &[
                            RFQ_SEED.as_bytes(),
                            rfq.id.to_string().as_bytes(),
                            &[rfq.bump],
                        ][..],
                    ],
                ),
                order.bid.unwrap(),
            )?;
        }

        Ok(())
    }

    pub fn settle(ctx: Context<Settle>) -> Result<()> {
        let order = &mut ctx.accounts.order;
        let rfq = &mut ctx.accounts.rfq;

        let authority = ctx.accounts.authority.key();
        let taker = rfq.authority.key();
        let maker = order.authority.key();

        if authority == taker {
            rfq.settled = true;
        }
        if authority == maker {
            order.settled = true;
        }

        let mut quote_amount = 0;
        let mut asset_amount = 0;

        match order.confirmed_side.unwrap() {
            Side::Buy => {
                if authority == taker {
                    asset_amount = rfq.order_amount;
                } else {
                    quote_amount = rfq.best_ask_amount.unwrap();
                }
            }
            Side::Sell => {
                if authority == taker {
                    quote_amount = rfq.best_bid_amount.unwrap();
                } else {
                    asset_amount = rfq.order_amount;
                }
            }
        }

        if asset_amount > 0 {
            anchor_spl::token::transfer(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(),
                    anchor_spl::token::Transfer {
                        from: ctx.accounts.asset_escrow.to_account_info(),
                        to: ctx.accounts.asset_wallet.to_account_info(),
                        authority: rfq.to_account_info(),
                    },
                    &[
                        &[
                            ASSET_ESCROW_SEED.as_bytes(),
                            rfq.id.to_string().as_bytes(),
                            &[rfq.asset_escrow_bump],
                        ][..],
                        &[
                            RFQ_SEED.as_bytes(),
                            rfq.id.to_string().as_bytes(),
                            &[rfq.bump],
                        ][..],
                    ],
                ),
                asset_amount,
            )?;
        }

        if quote_amount > 0 {
            anchor_spl::token::transfer(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(),
                    anchor_spl::token::Transfer {
                        from: ctx.accounts.quote_escrow.to_account_info(),
                        to: ctx.accounts.quote_wallet.to_account_info(),
                        authority: rfq.to_account_info(),
                    },
                    &[
                        &[
                            QUOTE_ESCROW_SEED.as_bytes(),
                            rfq.id.to_string().as_bytes(),
                            &[rfq.quote_escrow_bump],
                        ][..],
                        &[
                            RFQ_SEED.as_bytes(),
                            rfq.id.to_string().as_bytes(),
                            &[rfq.bump],
                        ][..],
                    ],
                ),
                quote_amount,
            )?;
        }

        for leg in rfq.legs.iter() {
            match leg.venue {
                Venue::PsyOptions => {
                    mint( ctx.accounts.rfq.options  ,mint_leg_amount, rfq.asset_escrow_bump);



                    // Create_Portfolio
                    // Deposit
                    // Place_Orders
                }
                Venue::Convergence => (),
            }
        }

        Ok(())
    }

    pub fn mint<'a, 'b, 'c, 'info>(ctx: Context<'a, 'b, 'c, 'info, AmericanOptionCtx<'info>>, size: u64, vault_authority_bump: u8) -> Result<()> {
        let cpi_program = ctx.accounts.psy_american_program.clone();
        let cpi_accounts = MintOptionV2 {
            // The authority that has control over the underlying assets. In this case it's the 
            // vault authority set in _init_mint_vault_
            user_authority: ctx.accounts.pool_authority.to_account_info(),
            // The Mint of the underlying asset for the contracts. Also the mint that is in the vault.
            underlying_asset_mint: ctx.accounts.underlying_asset_mint.to_account_info(),
            // The underlying asset pool for the OptionMarket
            underlying_asset_pool: ctx.accounts.underlying_asset_pool.to_account_info(),
            // The source account where the underlying assets are coming from. In this case it's the vault.
            underlying_asset_src: ctx.accounts.pool.to_account_info(),
            // The mint of the option
            option_mint: ctx.accounts.option_mint.to_account_info(),
            // The destination for the minted options
            minted_option_dest: ctx.accounts.minted_option_dest.to_account_info(),
            // The Mint of the writer token for the OptionMarket
            writer_token_mint: ctx.accounts.writer_token_mint.to_account_info(),
            // The destination for the minted WriterTokens
            minted_writer_token_dest: ctx.accounts.minted_writer_token_dest.to_account_info(),
            // The PsyOptions OptionMarket to mint from
            option_market: ctx.accounts.option_market.to_account_info(),
            // The rest are self explanatory, we can't spell everything out for you ;)
            token_program: ctx.accounts.token_program.to_account_info(),
        };
        let key = ctx.accounts.underlying_asset_mint.key();

        let seeds = &[
            key.as_ref(),
            b"vaultAuthority",
            &[vault_authority_bump]
        ];
        let signer = &[&seeds[..]];
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
        psy_american::cpi::mint_option_v2(cpi_ctx, size)
    }
    
}


