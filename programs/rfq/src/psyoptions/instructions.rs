///! Instructions
use anchor_lang::prelude::*;
use anchor_lang::InstructionData;
use psy_american::cpi::accounts::*;

use crate::errors::*;
use crate::psyoptions::contexts::*;

// Initializes American option market.
pub fn initialize_american_option_market<'a, 'b, 'c, 'info>(
    ctx: Context<'a, 'b, 'c, 'info, InitializeAmericanOptionMarket<'info>>,
    underlying_amount_per_contract: u64,
    quote_amount_per_contract: u64,
    expiration_unix_timestamp: i64,
    bump_seed: u8,
) -> Result<()> {
    let cpi_program = ctx.accounts.psy_american_program.clone();
    let init_market_args = psy_american::instruction::InitializeMarket {
        underlying_amount_per_contract,
        quote_amount_per_contract,
        expiration_unix_timestamp,
        bump_seed,
    };
    let mut cpi_accounts = vec![
        ctx.accounts.user.to_account_metas(Some(true))[0].clone(),
        ctx.accounts
            .underlying_asset_mint
            .to_account_metas(Some(false))[0]
            .clone(),
        ctx.accounts.quote_asset_mint.to_account_metas(Some(false))[0].clone(),
        ctx.accounts.option_mint.to_account_metas(Some(false))[0].clone(),
        ctx.accounts.writer_token_mint.to_account_metas(Some(false))[0].clone(),
        ctx.accounts.quote_asset_pool.to_account_metas(Some(false))[0].clone(),
        ctx.accounts
            .underlying_asset_pool
            .to_account_metas(Some(false))[0]
            .clone(),
        ctx.accounts.option_market.to_account_metas(Some(false))[0].clone(),
        ctx.accounts.fee_owner.to_account_metas(Some(false))[0].clone(),
        ctx.accounts.token_program.to_account_metas(Some(false))[0].clone(),
        ctx.accounts
            .associated_token_program
            .to_account_metas(Some(false))[0]
            .clone(),
        ctx.accounts.rent.to_account_metas(Some(false))[0].clone(),
        ctx.accounts.system_program.to_account_metas(Some(false))[0].clone(),
        ctx.accounts.clock.to_account_metas(Some(false))[0].clone(),
    ];
    // TODO: Use Anchor CPI context instead
    let mut account_infos = vec![
        ctx.accounts.user.to_account_info().clone(),
        ctx.accounts.underlying_asset_mint.to_account_info().clone(),
        ctx.accounts.quote_asset_mint.to_account_info().clone(),
        ctx.accounts.option_mint.to_account_info().clone(),
        ctx.accounts.writer_token_mint.to_account_info().clone(),
        ctx.accounts.quote_asset_pool.to_account_info().clone(),
        ctx.accounts.underlying_asset_pool.to_account_info().clone(),
        ctx.accounts.option_market.to_account_info().clone(),
        ctx.accounts.fee_owner.to_account_info().clone(),
        ctx.accounts.token_program.to_account_info().clone(),
        ctx.accounts
            .associated_token_program
            .to_account_info()
            .clone(),
        ctx.accounts.rent.to_account_info().clone(),
        ctx.accounts.system_program.to_account_info().clone(),
        ctx.accounts.clock.to_account_info().clone(),
    ];

    for remaining_account in ctx.remaining_accounts {
        cpi_accounts.push(remaining_account.to_account_metas(Some(false))[0].clone());
        account_infos.push(remaining_account.clone());
    }

    let ix = solana_program::instruction::Instruction {
        program_id: *cpi_program.key,
        accounts: cpi_accounts,
        data: init_market_args.data(),
    };

    anchor_lang::solana_program::program::invoke(&ix, &account_infos)
        .map_err(|_x| ProtocolError::CpiError.into())
}

pub fn initialize_american_mint_vault(_ctx: Context<InitializeAmericanMintVault>) -> Result<()> {
    Ok(())
}

// Mints American option.
pub fn mint_american_option<'a, 'b, 'c, 'info>(
    ctx: Context<'a, 'b, 'c, 'info, MintAmericanOption<'info>>,
    leg: u64,
    size: u64,
    vault_authority_bump: u8,
) -> Result<()> {
    let cpi_program = ctx.accounts.psy_american_program.clone();
    let cpi_accounts = MintOptionV2 {
        user_authority: ctx.accounts.vault_authority.to_account_info(),
        underlying_asset_mint: ctx.accounts.underlying_asset_mint.to_account_info(),
        underlying_asset_pool: ctx.accounts.underlying_asset_pool.to_account_info(),
        underlying_asset_src: ctx.accounts.vault.to_account_info(),
        option_mint: ctx.accounts.option_mint.to_account_info(),
        minted_option_dest: ctx.accounts.minted_option_dest.to_account_info(),
        writer_token_mint: ctx.accounts.writer_token_mint.to_account_info(),
        minted_writer_token_dest: ctx.accounts.minted_writer_token_dest.to_account_info(),
        option_market: ctx.accounts.option_market.to_account_info(),
        token_program: ctx.accounts.token_program.to_account_info(),
    };
    let key = ctx.accounts.underlying_asset_mint.key();
    let seeds = &[key.as_ref(), b"vaultAuthority", &[vault_authority_bump]];
    let signer = &[&seeds[..]];
    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
    psy_american::cpi::mint_option_v2(cpi_ctx, size)?;

    let legs = &mut ctx.accounts.legs;
    for l in legs.legs.iter_mut() {
        if l.id == leg {
            l.processed = true;
        }
    }

    Ok(())
}
