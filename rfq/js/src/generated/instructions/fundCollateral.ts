/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as splToken from "@solana/spl-token";
import * as beet from "@metaplex-foundation/beet";
import * as web3 from "@solana/web3.js";

/**
 * @category Instructions
 * @category FundCollateral
 * @category generated
 */
export type FundCollateralInstructionArgs = {
  amount: beet.bignum;
};
/**
 * @category Instructions
 * @category FundCollateral
 * @category generated
 */
export const fundCollateralStruct = new beet.BeetArgsStruct<
  FundCollateralInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ["instructionDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)],
    ["amount", beet.u64],
  ],
  "FundCollateralInstructionArgs"
);
/**
 * Accounts required by the _fundCollateral_ instruction
 *
 * @property [**signer**] user
 * @property [_writable_] userTokens
 * @property [] protocol
 * @property [] collateralInfo
 * @property [_writable_] collateralToken
 * @category Instructions
 * @category FundCollateral
 * @category generated
 */
export type FundCollateralInstructionAccounts = {
  user: web3.PublicKey;
  userTokens: web3.PublicKey;
  protocol: web3.PublicKey;
  collateralInfo: web3.PublicKey;
  collateralToken: web3.PublicKey;
  tokenProgram?: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const fundCollateralInstructionDiscriminator = [55, 123, 168, 146, 36, 55, 209, 213];

/**
 * Creates a _FundCollateral_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category FundCollateral
 * @category generated
 */
export function createFundCollateralInstruction(
  accounts: FundCollateralInstructionAccounts,
  args: FundCollateralInstructionArgs,
  programId = new web3.PublicKey("EYZVRgDAWHahx3bJXFms7CoPA6ncwJFkGFPiTa15X8Fk")
) {
  const [data] = fundCollateralStruct.serialize({
    instructionDiscriminator: fundCollateralInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.user,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.userTokens,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.protocol,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.collateralInfo,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.collateralToken,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenProgram ?? splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
  ];

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc);
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  });
  return ix;
}
