import { Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { Rfq as RfqIdl } from "../../target/types/rfq";
import {
  BASE_ASSET_INFO_SEED,
  COLLATERAL_SEED,
  COLLATERAL_TOKEN_SEED,
  INSTRUMENT_ESCROW_SEED,
  MINT_INFO_SEED,
  PROTOCOL_SEED,
  QUOTE_ESCROW_SEED,
  RESPONSE_SEED,
  RFQ_SEED,
  RISK_ENGINE_CONFIG_SEED,
} from "./constants";
import { toLittleEndian } from "./helpers";
import { AssetIdentifier, assetIdentifierToSeedBytes } from "./types";
import { sha256 } from "@noble/hashes/sha256";

export async function getProtocolPda(programId: PublicKey) {
  const [pda] = await PublicKey.findProgramAddress([Buffer.from(PROTOCOL_SEED)], programId);
  return pda;
}

export async function getRfqPda(
  taker: PublicKey,
  legsHash: Buffer,
  orderType,
  quoteAssetData,
  fixedSize,
  activeWindow: number,
  settlingWindow: number,
  pdaDistinguisher: number,
  program: Program<RfqIdl>
) {
  const orderTypeBuffer = program.coder.types.encode("OrderType", orderType);
  const quoteAssetDataSerialized = program.coder.types.encode("QuoteAsset", quoteAssetData);
  const hashedQuoteAsset = sha256(quoteAssetDataSerialized);
  const fixedSizeSerialized = program.coder.types.encode("FixedSize", fixedSize);
  const [pda] = await PublicKey.findProgramAddress(
    [
      Buffer.from(RFQ_SEED),
      taker.toBuffer(),
      legsHash,
      orderTypeBuffer,
      hashedQuoteAsset,
      fixedSizeSerialized,
      toLittleEndian(activeWindow, 4),
      toLittleEndian(settlingWindow, 4),
      toLittleEndian(pdaDistinguisher, 2),
    ],
    program.programId
  );
  return pda;
}

export async function getResponsePda(
  rfq: PublicKey,
  maker: PublicKey,
  programId: PublicKey,
  bidBuffer: Buffer,
  askBuffer: Buffer,
  pdaDistinguisher: number
) {
  const [pda] = await PublicKey.findProgramAddress(
    [
      Buffer.from(RESPONSE_SEED),
      rfq.toBuffer(),
      maker.toBuffer(),
      bidBuffer,
      askBuffer,
      toLittleEndian(pdaDistinguisher, 2),
    ],
    programId
  );
  return pda;
}

export async function getBaseAssetPda(index: number, programId: PublicKey) {
  const [pda] = await PublicKey.findProgramAddress(
    [Buffer.from(BASE_ASSET_INFO_SEED), toLittleEndian(index, 2)],
    programId
  );
  return pda;
}

export async function getMintInfoPda(mintAddress: PublicKey, programId: PublicKey) {
  const [pda] = await PublicKey.findProgramAddress([Buffer.from(MINT_INFO_SEED), mintAddress.toBuffer()], programId);
  return pda;
}

export async function getCollateralTokenPda(user: PublicKey, programId: PublicKey) {
  const [pda] = await PublicKey.findProgramAddress([Buffer.from(COLLATERAL_TOKEN_SEED), user.toBuffer()], programId);
  return pda;
}

export async function getCollateralInfoPda(user: PublicKey, programId: PublicKey) {
  const [pda] = await PublicKey.findProgramAddress([Buffer.from(COLLATERAL_SEED), user.toBuffer()], programId);
  return pda;
}

export async function getQuoteEscrowPda(response: PublicKey, programId: PublicKey) {
  const [pda] = await PublicKey.findProgramAddress([Buffer.from(QUOTE_ESCROW_SEED), response.toBuffer()], programId);
  return pda;
}

export async function getInstrumentEscrowPda(
  response: PublicKey,
  assetIdentifier: AssetIdentifier,
  programId: PublicKey
) {
  const [pda] = await PublicKey.findProgramAddress(
    [Buffer.from(INSTRUMENT_ESCROW_SEED), response.toBuffer(), assetIdentifierToSeedBytes(assetIdentifier)],
    programId
  );
  return pda;
}

export async function getPsyoptionsAmericanEscrowPda(response: PublicKey, legIndex: number, programId: PublicKey) {
  const [pda] = await PublicKey.findProgramAddress(
    [Buffer.from(INSTRUMENT_ESCROW_SEED), response.toBuffer(), Buffer.from([legIndex])],
    programId
  );
  return pda;
}

export async function getRiskEngineConfig(programId: PublicKey) {
  const [pda] = await PublicKey.findProgramAddress([Buffer.from(RISK_ENGINE_CONFIG_SEED)], programId);
  return pda;
}
