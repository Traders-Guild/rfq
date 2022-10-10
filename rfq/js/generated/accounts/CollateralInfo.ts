/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from '@solana/web3.js'
import * as beet from '@metaplex-foundation/beet'
import * as beetSolana from '@metaplex-foundation/beet-solana'

/**
 * Arguments used to create {@link CollateralInfo}
 * @category Accounts
 * @category generated
 */
export type CollateralInfoArgs = {
  bump: number
  user: web3.PublicKey
  tokenAccountBump: number
  lockedTokensAmount: beet.bignum
}

export const collateralInfoDiscriminator = [163, 68, 82, 37, 220, 178, 18, 153]
/**
 * Holds the data for the {@link CollateralInfo} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class CollateralInfo implements CollateralInfoArgs {
  private constructor(
    readonly bump: number,
    readonly user: web3.PublicKey,
    readonly tokenAccountBump: number,
    readonly lockedTokensAmount: beet.bignum
  ) {}

  /**
   * Creates a {@link CollateralInfo} instance from the provided args.
   */
  static fromArgs(args: CollateralInfoArgs) {
    return new CollateralInfo(
      args.bump,
      args.user,
      args.tokenAccountBump,
      args.lockedTokensAmount
    )
  }

  /**
   * Deserializes the {@link CollateralInfo} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [CollateralInfo, number] {
    return CollateralInfo.deserialize(accountInfo.data, offset)
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link CollateralInfo} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<CollateralInfo> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig
    )
    if (accountInfo == null) {
      throw new Error(`Unable to find CollateralInfo account at ${address}`)
    }
    return CollateralInfo.fromAccountInfo(accountInfo, 0)[0]
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey(
      '3t9BM7DwaibpjNVWAWYauZyhjteoTjuJqGEqxCv7x9MA'
    )
  ) {
    return beetSolana.GpaBuilder.fromStruct(programId, collateralInfoBeet)
  }

  /**
   * Deserializes the {@link CollateralInfo} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [CollateralInfo, number] {
    return collateralInfoBeet.deserialize(buf, offset)
  }

  /**
   * Serializes the {@link CollateralInfo} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return collateralInfoBeet.serialize({
      accountDiscriminator: collateralInfoDiscriminator,
      ...this,
    })
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link CollateralInfo}
   */
  static get byteSize() {
    return collateralInfoBeet.byteSize
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link CollateralInfo} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      CollateralInfo.byteSize,
      commitment
    )
  }

  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link CollateralInfo} data.
   */
  static hasCorrectByteSize(buf: Buffer, offset = 0) {
    return buf.byteLength - offset === CollateralInfo.byteSize
  }

  /**
   * Returns a readable version of {@link CollateralInfo} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      bump: this.bump,
      user: this.user.toBase58(),
      tokenAccountBump: this.tokenAccountBump,
      lockedTokensAmount: (() => {
        const x = <{ toNumber: () => number }>this.lockedTokensAmount
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber()
          } catch (_) {
            return x
          }
        }
        return x
      })(),
    }
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const collateralInfoBeet = new beet.BeetStruct<
  CollateralInfo,
  CollateralInfoArgs & {
    accountDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['bump', beet.u8],
    ['user', beetSolana.publicKey],
    ['tokenAccountBump', beet.u8],
    ['lockedTokensAmount', beet.u64],
  ],
  CollateralInfo.fromArgs,
  'CollateralInfo'
)
