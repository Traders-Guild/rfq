/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from "@metaplex-foundation/beet";
/**
 * This type is used to derive the {@link FixedSize} type as well as the de/serializer.
 * However don't refer to it in your code but use the {@link FixedSize} type instead.
 *
 * @category userTypes
 * @category enums
 * @category generated
 * @private
 */
export type FixedSizeRecord = {
  None: { padding: beet.bignum };
  BaseAsset: { legsMultiplierBps: beet.bignum };
  QuoteAsset: { quoteAmount: beet.bignum };
};

/**
 * Union type respresenting the FixedSize data enum defined in Rust.
 *
 * NOTE: that it includes a `__kind` property which allows to narrow types in
 * switch/if statements.
 * Additionally `isFixedSize*` type guards are exposed below to narrow to a specific variant.
 *
 * @category userTypes
 * @category enums
 * @category generated
 */
export type FixedSize = beet.DataEnumKeyAsKind<FixedSizeRecord>;

export const isFixedSizeNone = (x: FixedSize): x is FixedSize & { __kind: "None" } => x.__kind === "None";
export const isFixedSizeBaseAsset = (x: FixedSize): x is FixedSize & { __kind: "BaseAsset" } =>
  x.__kind === "BaseAsset";
export const isFixedSizeQuoteAsset = (x: FixedSize): x is FixedSize & { __kind: "QuoteAsset" } =>
  x.__kind === "QuoteAsset";

/**
 * @category userTypes
 * @category generated
 */
export const fixedSizeBeet = beet.dataEnum<FixedSizeRecord>([
  ["None", new beet.BeetArgsStruct<FixedSizeRecord["None"]>([["padding", beet.u64]], 'FixedSizeRecord["None"]')],

  [
    "BaseAsset",
    new beet.BeetArgsStruct<FixedSizeRecord["BaseAsset"]>(
      [["legsMultiplierBps", beet.u64]],
      'FixedSizeRecord["BaseAsset"]'
    ),
  ],

  [
    "QuoteAsset",
    new beet.BeetArgsStruct<FixedSizeRecord["QuoteAsset"]>(
      [["quoteAmount", beet.u64]],
      'FixedSizeRecord["QuoteAsset"]'
    ),
  ],
]) as beet.FixableBeet<FixedSize>;
