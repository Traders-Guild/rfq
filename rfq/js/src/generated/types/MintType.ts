/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from "@metaplex-foundation/beet";
import { BaseAssetIndex, baseAssetIndexBeet } from "./BaseAssetIndex";
/**
 * This type is used to derive the {@link MintType} type as well as the de/serializer.
 * However don't refer to it in your code but use the {@link MintType} type instead.
 *
 * @category userTypes
 * @category enums
 * @category generated
 * @private
 */
export type MintTypeRecord = {
  Stablecoin: void /* scalar variant */;
  AssetWithRisk: { baseAssetIndex: BaseAssetIndex };
};

/**
 * Union type respresenting the MintType data enum defined in Rust.
 *
 * NOTE: that it includes a `__kind` property which allows to narrow types in
 * switch/if statements.
 * Additionally `isMintType*` type guards are exposed below to narrow to a specific variant.
 *
 * @category userTypes
 * @category enums
 * @category generated
 */
export type MintType = beet.DataEnumKeyAsKind<MintTypeRecord>;

export const isMintTypeStablecoin = (x: MintType): x is MintType & { __kind: "Stablecoin" } =>
  x.__kind === "Stablecoin";
export const isMintTypeAssetWithRisk = (x: MintType): x is MintType & { __kind: "AssetWithRisk" } =>
  x.__kind === "AssetWithRisk";

/**
 * @category userTypes
 * @category generated
 */
export const mintTypeBeet = beet.dataEnum<MintTypeRecord>([
  ["Stablecoin", beet.unit],

  [
    "AssetWithRisk",
    new beet.BeetArgsStruct<MintTypeRecord["AssetWithRisk"]>(
      [["baseAssetIndex", baseAssetIndexBeet]],
      'MintTypeRecord["AssetWithRisk"]'
    ),
  ],
]) as beet.FixableBeet<MintType>;
