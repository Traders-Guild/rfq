/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from "@metaplex-foundation/beet";
/**
 * This type is used to derive the {@link AssetIdentifier} type as well as the de/serializer.
 * However don't refer to it in your code but use the {@link AssetIdentifier} type instead.
 *
 * @category userTypes
 * @category enums
 * @category generated
 * @private
 */
export type AssetIdentifierRecord = {
  Leg: { legIndex: number };
  Quote: void /* scalar variant */;
};

/**
 * Union type respresenting the AssetIdentifier data enum defined in Rust.
 *
 * NOTE: that it includes a `__kind` property which allows to narrow types in
 * switch/if statements.
 * Additionally `isAssetIdentifier*` type guards are exposed below to narrow to a specific variant.
 *
 * @category userTypes
 * @category enums
 * @category generated
 */
export type AssetIdentifier = beet.DataEnumKeyAsKind<AssetIdentifierRecord>;

export const isAssetIdentifierLeg = (x: AssetIdentifier): x is AssetIdentifier & { __kind: "Leg" } =>
  x.__kind === "Leg";
export const isAssetIdentifierQuote = (x: AssetIdentifier): x is AssetIdentifier & { __kind: "Quote" } =>
  x.__kind === "Quote";

/**
 * @category userTypes
 * @category generated
 */
export const assetIdentifierBeet = beet.dataEnum<AssetIdentifierRecord>([
  [
    "Leg",
    new beet.BeetArgsStruct<AssetIdentifierRecord["Leg"]>([["legIndex", beet.u8]], 'AssetIdentifierRecord["Leg"]'),
  ],
  ["Quote", beet.unit],
]) as beet.FixableBeet<AssetIdentifier>;
