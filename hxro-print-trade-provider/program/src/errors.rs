//! Error handling
use anchor_lang::prelude::*;

/// Error codes.
#[error_code]
pub enum HxroPrintTradeProviderError {
    #[msg("Require protocol authority")]
    NotAProtocolAuthority,
    #[msg("Invalid data size")]
    InvalidDataSize,
    #[msg("There are too many legs on the RFQ")]
    TooManyLegs,
    #[msg("Not a validated Market Product Group")]
    NotAValidatedMpg,
    #[msg("Combos are not supported")]
    CombosAreNotSupported,
    #[msg("Not enough accounts")]
    NotEnoughAccounts,
    #[msg("Passed product account does not match the one in leg")]
    ProductAccountDoesNotMatch,
    #[msg("Invalid Hxro oracle type")]
    InvalidHxroOracleType,
    #[msg("The base asset doesn't have pyth oracle stored")]
    NoPythOracleForBaseAsset,
    #[msg("Oracle does not match with stored in the base asset")]
    OracleDoesNotMatchWithBaseAsset,
    #[msg("Base asset account index doesn't match with leg info")]
    InvalidBaseAssetAccountIndex,
    #[msg("Invalid leg instrument type")]
    InvalidLegInstrumentType,
    #[msg("Hxro product can expire earlier that settment would end")]
    ProductExpiresToEarly,
    #[msg("Instrument type does not match")]
    InstrumentTypeDoesNotMatch,
    #[msg("Leg data for risk engine does not match with hxro product")]
    RiskEngineDataMismatch,
}
