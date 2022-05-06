//! Private module for program instructions.
use anchor_lang::prelude::*;
use solana_program::sysvar::clock::Clock;

use crate::constants::*;
use crate::contexts::*;
use crate::states::*;
use crate::utils::*;

pub fn initialize(
    ctx: Context<Initialize>,
    fee_denominator: u64,
    fee_numerator: u64,
) -> Result<()> {
    let protocol = &mut ctx.accounts.protocol;
    protocol.access_manager_count = 0;
    protocol.authority = ctx.accounts.signer.key();
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
    order_type: Order,
) -> Result<()> {
    let protocol = &mut ctx.accounts.protocol;
    protocol.rfq_count += 1;

    let rfq = &mut ctx.accounts.rfq;
    rfq.asset_escrow_bump = *ctx.bumps.get(ASSET_ESCROW_SEED).unwrap();
    rfq.asset_mint = ctx.accounts.asset_mint.key();
    rfq.authority = ctx.accounts.signer.key();
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
    rfq.order_type = order_type;
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
    order.authority = ctx.accounts.signer.key();
    order.bump = *ctx.bumps.get(ORDER_SEED).unwrap();
    order.id = rfq.response_count;
    order.unix_timestamp = Clock::get().unwrap().unix_timestamp;
    order.rfq = rfq.key();

    if ask.is_some() {
        anchor_spl::token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                anchor_spl::token::Transfer {
                    from: ctx.accounts.asset_wallet.to_account_info(),
                    to: ctx.accounts.asset_escrow.to_account_info(),
                    authority: ctx.accounts.signer.to_account_info(),
                },
            ),
            // Asset
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
                    authority: ctx.accounts.signer.to_account_info(),
                },
            ),
            // Quote
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
                authority: ctx.accounts.signer.to_account_info(),
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
    let protocol = &mut ctx.accounts.protocol;
    let order = &mut ctx.accounts.order;
    let rfq = &mut ctx.accounts.rfq;

    let authority = ctx.accounts.signer.key();
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
    let mut fee_amount = 0;

    match order.confirmed_side.unwrap() {
        Side::Buy => {
            if authority == taker {
                fee_amount = calc_fee(
                    rfq.order_amount,
                    ctx.accounts.asset_mint.decimals,
                    protocol.fee_numerator,
                    protocol.fee_denominator,
                );
                asset_amount = rfq.order_amount - fee_amount;
            } else {
                quote_amount = rfq.best_ask_amount.unwrap();
            }
        }
        Side::Sell => {
            if authority == taker {
                fee_amount = calc_fee(
                    rfq.best_bid_amount.unwrap(),
                    ctx.accounts.quote_mint.decimals,
                    protocol.fee_numerator,
                    protocol.fee_denominator,
                );
                quote_amount = rfq.best_bid_amount.unwrap() - fee_amount;
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

        if fee_amount > 0 {
            anchor_spl::token::transfer(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(),
                    anchor_spl::token::Transfer {
                        from: ctx.accounts.asset_escrow.to_account_info(),
                        to: ctx.accounts.treasury_wallet.to_account_info(),
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
                fee_amount,
            )?;
        }
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

        if fee_amount > 0 {
            anchor_spl::token::transfer(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(),
                    anchor_spl::token::Transfer {
                        from: ctx.accounts.quote_escrow.to_account_info(),
                        to: ctx.accounts.treasury_wallet.to_account_info(),
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
                fee_amount,
            )?;
        }
    }

    // TODO: PsyOptions CPI integration if venue if multi-leg

    Ok(())
}
