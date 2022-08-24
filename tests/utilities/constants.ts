import { BN } from "@project-serum/anchor";
import { OrderType, Side } from "./types";

export const PROTOCOL_SEED = "protocol";
export const COLLATERAL_SEED = "collateral_info";
export const COLLATERAL_TOKEN_SEED = "collateral_token";
export const QUOTE_ESCROW_SEED = "quote_escrow";

export const DEFAULT_SOL_FOR_SIGNERS = 100_000_000_000;
export const DEFAULT_TOKEN_AMOUNT = 200_000_000_000;
export const DEFAULT_COLLATERAL_FUNDED = 10_000_000_000;

export const DEFAULT_FEES = { takerBps: new BN(0), makerBps: new BN(0) };
export const DEFAULT_ORDER_TYPE = OrderType.TwoWay;
export const DEFAULT_INSTRUMENT_AMOUNT = 1_000_000_000;
export const DEFAULT_INSTRUMENT_SIDE = Side.Bid;
export const DEFAULT_ACTIVE_WINDOW = 10;
export const DEFAULT_SETTLING_WINDOW = 60;

/// Spot
export const SPOT_ESCROW_SEED = "escrow";
