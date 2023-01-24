/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from "@solana/web3.js";
import * as beet from "@metaplex-foundation/beet";
import * as beetSolana from "@metaplex-foundation/beet-solana";
import { StoredResponseState, storedResponseStateBeet } from "../types/StoredResponseState";
import { Confirmation, confirmationBeet } from "../types/Confirmation";
import { DefaultingParty, defaultingPartyBeet } from "../types/DefaultingParty";
import { AuthoritySide, authoritySideBeet } from "../types/AuthoritySide";
import { Quote, quoteBeet } from "../types/Quote";

/**
 * Arguments used to create {@link Response}
 * @category Accounts
 * @category generated
 */
export type ResponseArgs = {
  maker: web3.PublicKey;
  rfq: web3.PublicKey;
  creationTimestamp: beet.bignum;
  makerCollateralLocked: beet.bignum;
  takerCollateralLocked: beet.bignum;
  state: StoredResponseState;
  takerPreparedLegs: number;
  makerPreparedLegs: number;
  settledLegs: number;
  confirmed: beet.COption<Confirmation>;
  defaultingParty: beet.COption<DefaultingParty>;
  legPreparationsInitializedBy: AuthoritySide[];
  bid: beet.COption<Quote>;
  ask: beet.COption<Quote>;
};

export const responseDiscriminator = [198, 155, 246, 149, 75, 240, 81, 122];
/**
 * Holds the data for the {@link Response} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class Response implements ResponseArgs {
  private constructor(
    readonly maker: web3.PublicKey,
    readonly rfq: web3.PublicKey,
    readonly creationTimestamp: beet.bignum,
    readonly makerCollateralLocked: beet.bignum,
    readonly takerCollateralLocked: beet.bignum,
    readonly state: StoredResponseState,
    readonly takerPreparedLegs: number,
    readonly makerPreparedLegs: number,
    readonly settledLegs: number,
    readonly confirmed: beet.COption<Confirmation>,
    readonly defaultingParty: beet.COption<DefaultingParty>,
    readonly legPreparationsInitializedBy: AuthoritySide[],
    readonly bid: beet.COption<Quote>,
    readonly ask: beet.COption<Quote>
  ) {}

  /**
   * Creates a {@link Response} instance from the provided args.
   */
  static fromArgs(args: ResponseArgs) {
    return new Response(
      args.maker,
      args.rfq,
      args.creationTimestamp,
      args.makerCollateralLocked,
      args.takerCollateralLocked,
      args.state,
      args.takerPreparedLegs,
      args.makerPreparedLegs,
      args.settledLegs,
      args.confirmed,
      args.defaultingParty,
      args.legPreparationsInitializedBy,
      args.bid,
      args.ask
    );
  }

  /**
   * Deserializes the {@link Response} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset = 0): [Response, number] {
    return Response.deserialize(accountInfo.data, offset);
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Response} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<Response> {
    const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
    if (accountInfo == null) {
      throw new Error(`Unable to find Response account at ${address}`);
    }
    return Response.fromAccountInfo(accountInfo, 0)[0];
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(programId: web3.PublicKey = new web3.PublicKey("EYZVRgDAWHahx3bJXFms7CoPA6ncwJFkGFPiTa15X8Fk")) {
    return beetSolana.GpaBuilder.fromStruct(programId, responseBeet);
  }

  /**
   * Deserializes the {@link Response} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [Response, number] {
    return responseBeet.deserialize(buf, offset);
  }

  /**
   * Serializes the {@link Response} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return responseBeet.serialize({
      accountDiscriminator: responseDiscriminator,
      ...this,
    });
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Response} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */
  static byteSize(args: ResponseArgs) {
    const instance = Response.fromArgs(args);
    return responseBeet.toFixedFromValue({
      accountDiscriminator: responseDiscriminator,
      ...instance,
    }).byteSize;
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Response} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    args: ResponseArgs,
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(Response.byteSize(args), commitment);
  }

  /**
   * Returns a readable version of {@link Response} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      maker: this.maker.toBase58(),
      rfq: this.rfq.toBase58(),
      creationTimestamp: (() => {
        const x = <{ toNumber: () => number }>this.creationTimestamp;
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      makerCollateralLocked: (() => {
        const x = <{ toNumber: () => number }>this.makerCollateralLocked;
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      takerCollateralLocked: (() => {
        const x = <{ toNumber: () => number }>this.takerCollateralLocked;
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      state: "StoredResponseState." + StoredResponseState[this.state],
      takerPreparedLegs: this.takerPreparedLegs,
      makerPreparedLegs: this.makerPreparedLegs,
      settledLegs: this.settledLegs,
      confirmed: this.confirmed,
      defaultingParty: this.defaultingParty,
      legPreparationsInitializedBy: this.legPreparationsInitializedBy,
      bid: this.bid,
      ask: this.ask,
    };
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const responseBeet = new beet.FixableBeetStruct<
  Response,
  ResponseArgs & {
    accountDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ["accountDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)],
    ["maker", beetSolana.publicKey],
    ["rfq", beetSolana.publicKey],
    ["creationTimestamp", beet.i64],
    ["makerCollateralLocked", beet.u64],
    ["takerCollateralLocked", beet.u64],
    ["state", storedResponseStateBeet],
    ["takerPreparedLegs", beet.u8],
    ["makerPreparedLegs", beet.u8],
    ["settledLegs", beet.u8],
    ["confirmed", beet.coption(confirmationBeet)],
    ["defaultingParty", beet.coption(defaultingPartyBeet)],
    ["legPreparationsInitializedBy", beet.array(authoritySideBeet)],
    ["bid", beet.coption(quoteBeet)],
    ["ask", beet.coption(quoteBeet)],
  ],
  Response.fromArgs,
  "Response"
);
