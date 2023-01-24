/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from "@metaplex-foundation/beet";
import { Side, sideBeet } from "./Side";
export type Confirmation = {
  side: Side;
  overrideLegMultiplierBps: beet.COption<beet.bignum>;
};

/**
 * @category userTypes
 * @category generated
 */
export const confirmationBeet = new beet.FixableBeetArgsStruct<Confirmation>(
  [
    ["side", sideBeet],
    ["overrideLegMultiplierBps", beet.coption(beet.u64)],
  ],
  "Confirmation"
);
