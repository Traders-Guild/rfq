/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'

/**
 * @category Instructions
 * @category PartiallySettleLegs
 * @category generated
 */
export type PartiallySettleLegsInstructionArgs = {
  legAmountToSettle: number
}
/**
 * @category Instructions
 * @category PartiallySettleLegs
 * @category generated
 */
export const partiallySettleLegsStruct = new beet.BeetArgsStruct<
  PartiallySettleLegsInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['legAmountToSettle', beet.u8],
  ],
  'PartiallySettleLegsInstructionArgs'
)
/**
 * Accounts required by the _partiallySettleLegs_ instruction
 *
 * @property [] protocol
 * @property [] rfq
 * @property [_writable_] response
 * @category Instructions
 * @category PartiallySettleLegs
 * @category generated
 */
export type PartiallySettleLegsInstructionAccounts = {
  protocol: web3.PublicKey
  rfq: web3.PublicKey
  response: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const partiallySettleLegsInstructionDiscriminator = [
  6, 137, 52, 133, 242, 249, 56, 108,
]

/**
 * Creates a _PartiallySettleLegs_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category PartiallySettleLegs
 * @category generated
 */
export function createPartiallySettleLegsInstruction(
  accounts: PartiallySettleLegsInstructionAccounts,
  args: PartiallySettleLegsInstructionArgs,
  programId = new web3.PublicKey('3t9BM7DwaibpjNVWAWYauZyhjteoTjuJqGEqxCv7x9MA')
) {
  const [data] = partiallySettleLegsStruct.serialize({
    instructionDiscriminator: partiallySettleLegsInstructionDiscriminator,
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
