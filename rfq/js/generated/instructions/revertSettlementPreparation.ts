/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as splToken from '@solana/spl-token'
import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import { AuthoritySide, authoritySideBeet } from '../types/AuthoritySide'

/**
 * @category Instructions
 * @category RevertSettlementPreparation
 * @category generated
 */
export type RevertSettlementPreparationInstructionArgs = {
  side: AuthoritySide
}
/**
 * @category Instructions
 * @category RevertSettlementPreparation
 * @category generated
 */
export const revertSettlementPreparationStruct = new beet.BeetArgsStruct<
  RevertSettlementPreparationInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['side', authoritySideBeet],
  ],
  'RevertSettlementPreparationInstructionArgs'
)
/**
 * Accounts required by the _revertSettlementPreparation_ instruction
 *
 * @property [] protocol
 * @property [] rfq
 * @property [_writable_] response
 * @property [_writable_] quoteTokens
 * @property [_writable_] quoteEscrow
 * @category Instructions
 * @category RevertSettlementPreparation
 * @category generated
 */
export type RevertSettlementPreparationInstructionAccounts = {
  protocol: web3.PublicKey
  rfq: web3.PublicKey
  response: web3.PublicKey
  quoteTokens: web3.PublicKey
  quoteEscrow: web3.PublicKey
  tokenProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const revertSettlementPreparationInstructionDiscriminator = [
  67, 59, 235, 93, 219, 91, 81, 109,
]

/**
 * Creates a _RevertSettlementPreparation_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category RevertSettlementPreparation
 * @category generated
 */
export function createRevertSettlementPreparationInstruction(
  accounts: RevertSettlementPreparationInstructionAccounts,
  args: RevertSettlementPreparationInstructionArgs,
  programId = new web3.PublicKey('3t9BM7DwaibpjNVWAWYauZyhjteoTjuJqGEqxCv7x9MA')
) {
  const [data] = revertSettlementPreparationStruct.serialize({
    instructionDiscriminator:
      revertSettlementPreparationInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.protocol,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.rfq,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.response,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.quoteTokens,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.quoteEscrow,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenProgram ?? splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
  ]

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc)
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  })
  return ix
}
