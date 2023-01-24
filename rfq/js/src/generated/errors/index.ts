/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

type ErrorWithCode = Error & { code: number };
type MaybeErrorWithCode = ErrorWithCode | null | undefined;

const createErrorFromCodeLookup: Map<number, () => ErrorWithCode> = new Map();
const createErrorFromNameLookup: Map<string, () => ErrorWithCode> = new Map();

/**
 * NotAProtocolAuthority: 'Require protocol authority'
 *
 * @category Errors
 * @category generated
 */
export class NotAProtocolAuthorityError extends Error {
  readonly code: number = 0x1770;
  readonly name: string = "NotAProtocolAuthority";
  constructor() {
    super("Require protocol authority");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NotAProtocolAuthorityError);
    }
  }
}

createErrorFromCodeLookup.set(0x1770, () => new NotAProtocolAuthorityError());
createErrorFromNameLookup.set("NotAProtocolAuthority", () => new NotAProtocolAuthorityError());

/**
 * InstrumentAlreadyAdded: 'Instrument already added'
 *
 * @category Errors
 * @category generated
 */
export class InstrumentAlreadyAddedError extends Error {
  readonly code: number = 0x1771;
  readonly name: string = "InstrumentAlreadyAdded";
  constructor() {
    super("Instrument already added");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, InstrumentAlreadyAddedError);
    }
  }
}

createErrorFromCodeLookup.set(0x1771, () => new InstrumentAlreadyAddedError());
createErrorFromNameLookup.set("InstrumentAlreadyAdded", () => new InstrumentAlreadyAddedError());

/**
 * InvalidRiskEngineRegister: 'Invalid risk engine register'
 *
 * @category Errors
 * @category generated
 */
export class InvalidRiskEngineRegisterError extends Error {
  readonly code: number = 0x1772;
  readonly name: string = "InvalidRiskEngineRegister";
  constructor() {
    super("Invalid risk engine register");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, InvalidRiskEngineRegisterError);
    }
  }
}

createErrorFromCodeLookup.set(0x1772, () => new InvalidRiskEngineRegisterError());
createErrorFromNameLookup.set("InvalidRiskEngineRegister", () => new InvalidRiskEngineRegisterError());

/**
 * NotACollateralMint: 'Passed mint is not a collateral mint'
 *
 * @category Errors
 * @category generated
 */
export class NotACollateralMintError extends Error {
  readonly code: number = 0x1773;
  readonly name: string = "NotACollateralMint";
  constructor() {
    super("Passed mint is not a collateral mint");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NotACollateralMintError);
    }
  }
}

createErrorFromCodeLookup.set(0x1773, () => new NotACollateralMintError());
createErrorFromNameLookup.set("NotACollateralMint", () => new NotACollateralMintError());

/**
 * NotACollateralTokenAccount: 'Passed token account does not belong to collateral mint'
 *
 * @category Errors
 * @category generated
 */
export class NotACollateralTokenAccountError extends Error {
  readonly code: number = 0x1774;
  readonly name: string = "NotACollateralTokenAccount";
  constructor() {
    super("Passed token account does not belong to collateral mint");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NotACollateralTokenAccountError);
    }
  }
}

createErrorFromCodeLookup.set(0x1774, () => new NotACollateralTokenAccountError());
createErrorFromNameLookup.set("NotACollateralTokenAccount", () => new NotACollateralTokenAccountError());

/**
 * NotARiskEngine: 'Passed account is not a risk engine in the protocol'
 *
 * @category Errors
 * @category generated
 */
export class NotARiskEngineError extends Error {
  readonly code: number = 0x1775;
  readonly name: string = "NotARiskEngine";
  constructor() {
    super("Passed account is not a risk engine in the protocol");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NotARiskEngineError);
    }
  }
}

createErrorFromCodeLookup.set(0x1775, () => new NotARiskEngineError());
createErrorFromNameLookup.set("NotARiskEngine", () => new NotARiskEngineError());

/**
 * EmptyLegsNotSupported: 'An Rfq without legs is not supported'
 *
 * @category Errors
 * @category generated
 */
export class EmptyLegsNotSupportedError extends Error {
  readonly code: number = 0x1776;
  readonly name: string = "EmptyLegsNotSupported";
  constructor() {
    super("An Rfq without legs is not supported");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, EmptyLegsNotSupportedError);
    }
  }
}

createErrorFromCodeLookup.set(0x1776, () => new EmptyLegsNotSupportedError());
createErrorFromNameLookup.set("EmptyLegsNotSupported", () => new EmptyLegsNotSupportedError());

/**
 * LegSizeDoesNotMatchExpectedSize: 'Leg size does not match specified expected leg size'
 *
 * @category Errors
 * @category generated
 */
export class LegSizeDoesNotMatchExpectedSizeError extends Error {
  readonly code: number = 0x1777;
  readonly name: string = "LegSizeDoesNotMatchExpectedSize";
  constructor() {
    super("Leg size does not match specified expected leg size");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, LegSizeDoesNotMatchExpectedSizeError);
    }
  }
}

createErrorFromCodeLookup.set(0x1777, () => new LegSizeDoesNotMatchExpectedSizeError());
createErrorFromNameLookup.set("LegSizeDoesNotMatchExpectedSize", () => new LegSizeDoesNotMatchExpectedSizeError());

/**
 * NotEnoughTokens: 'Not enough tokens'
 *
 * @category Errors
 * @category generated
 */
export class NotEnoughTokensError extends Error {
  readonly code: number = 0x1778;
  readonly name: string = "NotEnoughTokens";
  constructor() {
    super("Not enough tokens");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NotEnoughTokensError);
    }
  }
}

createErrorFromCodeLookup.set(0x1778, () => new NotEnoughTokensError());
createErrorFromNameLookup.set("NotEnoughTokens", () => new NotEnoughTokensError());

/**
 * NotEnoughCollateral: 'Not enough collateral'
 *
 * @category Errors
 * @category generated
 */
export class NotEnoughCollateralError extends Error {
  readonly code: number = 0x1779;
  readonly name: string = "NotEnoughCollateral";
  constructor() {
    super("Not enough collateral");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NotEnoughCollateralError);
    }
  }
}

createErrorFromCodeLookup.set(0x1779, () => new NotEnoughCollateralError());
createErrorFromNameLookup.set("NotEnoughCollateral", () => new NotEnoughCollateralError());

/**
 * NotAWhitelistedInstrument: 'Not a whitelisted instrument'
 *
 * @category Errors
 * @category generated
 */
export class NotAWhitelistedInstrumentError extends Error {
  readonly code: number = 0x177a;
  readonly name: string = "NotAWhitelistedInstrument";
  constructor() {
    super("Not a whitelisted instrument");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NotAWhitelistedInstrumentError);
    }
  }
}

createErrorFromCodeLookup.set(0x177a, () => new NotAWhitelistedInstrumentError());
createErrorFromNameLookup.set("NotAWhitelistedInstrument", () => new NotAWhitelistedInstrumentError());

/**
 * NotEnoughAccounts: 'Not enough accounts'
 *
 * @category Errors
 * @category generated
 */
export class NotEnoughAccountsError extends Error {
  readonly code: number = 0x177b;
  readonly name: string = "NotEnoughAccounts";
  constructor() {
    super("Not enough accounts");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NotEnoughAccountsError);
    }
  }
}

createErrorFromCodeLookup.set(0x177b, () => new NotEnoughAccountsError());
createErrorFromNameLookup.set("NotEnoughAccounts", () => new NotEnoughAccountsError());

/**
 * PassedProgramIdDiffersFromAnInstrument: 'Passed program id differs from an instrument'
 *
 * @category Errors
 * @category generated
 */
export class PassedProgramIdDiffersFromAnInstrumentError extends Error {
  readonly code: number = 0x177c;
  readonly name: string = "PassedProgramIdDiffersFromAnInstrument";
  constructor() {
    super("Passed program id differs from an instrument");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, PassedProgramIdDiffersFromAnInstrumentError);
    }
  }
}

createErrorFromCodeLookup.set(0x177c, () => new PassedProgramIdDiffersFromAnInstrumentError());
createErrorFromNameLookup.set(
  "PassedProgramIdDiffersFromAnInstrument",
  () => new PassedProgramIdDiffersFromAnInstrumentError()
);

/**
 * RfqIsNotInRequiredState: 'Rfq is not in required state'
 *
 * @category Errors
 * @category generated
 */
export class RfqIsNotInRequiredStateError extends Error {
  readonly code: number = 0x177d;
  readonly name: string = "RfqIsNotInRequiredState";
  constructor() {
    super("Rfq is not in required state");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, RfqIsNotInRequiredStateError);
    }
  }
}

createErrorFromCodeLookup.set(0x177d, () => new RfqIsNotInRequiredStateError());
createErrorFromNameLookup.set("RfqIsNotInRequiredState", () => new RfqIsNotInRequiredStateError());

/**
 * ResponseDoesNotMatchOrderType: 'Response does not match order type'
 *
 * @category Errors
 * @category generated
 */
export class ResponseDoesNotMatchOrderTypeError extends Error {
  readonly code: number = 0x177e;
  readonly name: string = "ResponseDoesNotMatchOrderType";
  constructor() {
    super("Response does not match order type");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, ResponseDoesNotMatchOrderTypeError);
    }
  }
}

createErrorFromCodeLookup.set(0x177e, () => new ResponseDoesNotMatchOrderTypeError());
createErrorFromNameLookup.set("ResponseDoesNotMatchOrderType", () => new ResponseDoesNotMatchOrderTypeError());

/**
 * InvalidQuoteType: 'Invalid quote type'
 *
 * @category Errors
 * @category generated
 */
export class InvalidQuoteTypeError extends Error {
  readonly code: number = 0x177f;
  readonly name: string = "InvalidQuoteType";
  constructor() {
    super("Invalid quote type");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, InvalidQuoteTypeError);
    }
  }
}

createErrorFromCodeLookup.set(0x177f, () => new InvalidQuoteTypeError());
createErrorFromNameLookup.set("InvalidQuoteType", () => new InvalidQuoteTypeError());

/**
 * ResponseForAnotherRfq: 'Response is for another Rfq'
 *
 * @category Errors
 * @category generated
 */
export class ResponseForAnotherRfqError extends Error {
  readonly code: number = 0x1780;
  readonly name: string = "ResponseForAnotherRfq";
  constructor() {
    super("Response is for another Rfq");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, ResponseForAnotherRfqError);
    }
  }
}

createErrorFromCodeLookup.set(0x1780, () => new ResponseForAnotherRfqError());
createErrorFromNameLookup.set("ResponseForAnotherRfq", () => new ResponseForAnotherRfqError());

/**
 * NotATaker: 'Passed address is not a rfq taker'
 *
 * @category Errors
 * @category generated
 */
export class NotATakerError extends Error {
  readonly code: number = 0x1781;
  readonly name: string = "NotATaker";
  constructor() {
    super("Passed address is not a rfq taker");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NotATakerError);
    }
  }
}

createErrorFromCodeLookup.set(0x1781, () => new NotATakerError());
createErrorFromNameLookup.set("NotATaker", () => new NotATakerError());

/**
 * ResponseIsNotInRequiredState: 'Response is not required state'
 *
 * @category Errors
 * @category generated
 */
export class ResponseIsNotInRequiredStateError extends Error {
  readonly code: number = 0x1782;
  readonly name: string = "ResponseIsNotInRequiredState";
  constructor() {
    super("Response is not required state");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, ResponseIsNotInRequiredStateError);
    }
  }
}

createErrorFromCodeLookup.set(0x1782, () => new ResponseIsNotInRequiredStateError());
createErrorFromNameLookup.set("ResponseIsNotInRequiredState", () => new ResponseIsNotInRequiredStateError());

/**
 * ConfirmedSideMissing: 'Confirmed side is missing in a response'
 *
 * @category Errors
 * @category generated
 */
export class ConfirmedSideMissingError extends Error {
  readonly code: number = 0x1783;
  readonly name: string = "ConfirmedSideMissing";
  constructor() {
    super("Confirmed side is missing in a response");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, ConfirmedSideMissingError);
    }
  }
}

createErrorFromCodeLookup.set(0x1783, () => new ConfirmedSideMissingError());
createErrorFromNameLookup.set("ConfirmedSideMissing", () => new ConfirmedSideMissingError());

/**
 * NotAPassedAuthority: 'Caller is not a authority passed in parameters'
 *
 * @category Errors
 * @category generated
 */
export class NotAPassedAuthorityError extends Error {
  readonly code: number = 0x1784;
  readonly name: string = "NotAPassedAuthority";
  constructor() {
    super("Caller is not a authority passed in parameters");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NotAPassedAuthorityError);
    }
  }
}

createErrorFromCodeLookup.set(0x1784, () => new NotAPassedAuthorityError());
createErrorFromNameLookup.set("NotAPassedAuthority", () => new NotAPassedAuthorityError());

/**
 * TakerCanNotRespond: 'Taker can not respond to rfq he had created'
 *
 * @category Errors
 * @category generated
 */
export class TakerCanNotRespondError extends Error {
  readonly code: number = 0x1785;
  readonly name: string = "TakerCanNotRespond";
  constructor() {
    super("Taker can not respond to rfq he had created");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, TakerCanNotRespondError);
    }
  }
}

createErrorFromCodeLookup.set(0x1785, () => new TakerCanNotRespondError());
createErrorFromNameLookup.set("TakerCanNotRespond", () => new TakerCanNotRespondError());

/**
 * NotAQuoteMint: 'Not a quote mint'
 *
 * @category Errors
 * @category generated
 */
export class NotAQuoteMintError extends Error {
  readonly code: number = 0x1786;
  readonly name: string = "NotAQuoteMint";
  constructor() {
    super("Not a quote mint");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NotAQuoteMintError);
    }
  }
}

createErrorFromCodeLookup.set(0x1786, () => new NotAQuoteMintError());
createErrorFromNameLookup.set("NotAQuoteMint", () => new NotAQuoteMintError());

/**
 * WrongQuoteReceiver: 'Quote receiver account is not a receiver associated token account'
 *
 * @category Errors
 * @category generated
 */
export class WrongQuoteReceiverError extends Error {
  readonly code: number = 0x1787;
  readonly name: string = "WrongQuoteReceiver";
  constructor() {
    super("Quote receiver account is not a receiver associated token account");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, WrongQuoteReceiverError);
    }
  }
}

createErrorFromCodeLookup.set(0x1787, () => new WrongQuoteReceiverError());
createErrorFromNameLookup.set("WrongQuoteReceiver", () => new WrongQuoteReceiverError());

/**
 * NoLegMultiplierForFixedSize: 'Fixed size rfq doesn't support specifying legs multiplier'
 *
 * @category Errors
 * @category generated
 */
export class NoLegMultiplierForFixedSizeError extends Error {
  readonly code: number = 0x1788;
  readonly name: string = "NoLegMultiplierForFixedSize";
  constructor() {
    super("Fixed size rfq doesn't support specifying legs multiplier");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NoLegMultiplierForFixedSizeError);
    }
  }
}

createErrorFromCodeLookup.set(0x1788, () => new NoLegMultiplierForFixedSizeError());
createErrorFromNameLookup.set("NoLegMultiplierForFixedSize", () => new NoLegMultiplierForFixedSizeError());

/**
 * LegMultiplierHigherThanInQuote: 'Leg multiplier can't be higher than which is specified in the quote'
 *
 * @category Errors
 * @category generated
 */
export class LegMultiplierHigherThanInQuoteError extends Error {
  readonly code: number = 0x1789;
  readonly name: string = "LegMultiplierHigherThanInQuote";
  constructor() {
    super("Leg multiplier can't be higher than which is specified in the quote");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, LegMultiplierHigherThanInQuoteError);
    }
  }
}

createErrorFromCodeLookup.set(0x1789, () => new LegMultiplierHigherThanInQuoteError());
createErrorFromNameLookup.set("LegMultiplierHigherThanInQuote", () => new LegMultiplierHigherThanInQuoteError());

/**
 * CanNotLockAdditionalMakerCollateral: 'Confirmation can't lock additional maker collateral'
 *
 * @category Errors
 * @category generated
 */
export class CanNotLockAdditionalMakerCollateralError extends Error {
  readonly code: number = 0x178a;
  readonly name: string = "CanNotLockAdditionalMakerCollateral";
  constructor() {
    super("Confirmation can't lock additional maker collateral");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, CanNotLockAdditionalMakerCollateralError);
    }
  }
}

createErrorFromCodeLookup.set(0x178a, () => new CanNotLockAdditionalMakerCollateralError());
createErrorFromNameLookup.set(
  "CanNotLockAdditionalMakerCollateral",
  () => new CanNotLockAdditionalMakerCollateralError()
);

/**
 * NoPreparationToRevert: 'This side of rfq either had not prepared or had already reverted'
 *
 * @category Errors
 * @category generated
 */
export class NoPreparationToRevertError extends Error {
  readonly code: number = 0x178b;
  readonly name: string = "NoPreparationToRevert";
  constructor() {
    super("This side of rfq either had not prepared or had already reverted");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NoPreparationToRevertError);
    }
  }
}

createErrorFromCodeLookup.set(0x178b, () => new NoPreparationToRevertError());
createErrorFromNameLookup.set("NoPreparationToRevert", () => new NoPreparationToRevertError());

/**
 * NoCollateralLocked: 'No collateral locked'
 *
 * @category Errors
 * @category generated
 */
export class NoCollateralLockedError extends Error {
  readonly code: number = 0x178c;
  readonly name: string = "NoCollateralLocked";
  constructor() {
    super("No collateral locked");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NoCollateralLockedError);
    }
  }
}

createErrorFromCodeLookup.set(0x178c, () => new NoCollateralLockedError());
createErrorFromNameLookup.set("NoCollateralLocked", () => new NoCollateralLockedError());

/**
 * InvalidDefaultingParty: 'Invalid defaulting party'
 *
 * @category Errors
 * @category generated
 */
export class InvalidDefaultingPartyError extends Error {
  readonly code: number = 0x178d;
  readonly name: string = "InvalidDefaultingParty";
  constructor() {
    super("Invalid defaulting party");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, InvalidDefaultingPartyError);
    }
  }
}

createErrorFromCodeLookup.set(0x178d, () => new InvalidDefaultingPartyError());
createErrorFromNameLookup.set("InvalidDefaultingParty", () => new InvalidDefaultingPartyError());

/**
 * HaveCollateralLocked: 'Can't clean up with collateral locked'
 *
 * @category Errors
 * @category generated
 */
export class HaveCollateralLockedError extends Error {
  readonly code: number = 0x178e;
  readonly name: string = "HaveCollateralLocked";
  constructor() {
    super("Can't clean up with collateral locked");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, HaveCollateralLockedError);
    }
  }
}

createErrorFromCodeLookup.set(0x178e, () => new HaveCollateralLockedError());
createErrorFromNameLookup.set("HaveCollateralLocked", () => new HaveCollateralLockedError());

/**
 * PendingPreparations: 'Can't clean up with pending settle preparations'
 *
 * @category Errors
 * @category generated
 */
export class PendingPreparationsError extends Error {
  readonly code: number = 0x178f;
  readonly name: string = "PendingPreparations";
  constructor() {
    super("Can't clean up with pending settle preparations");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, PendingPreparationsError);
    }
  }
}

createErrorFromCodeLookup.set(0x178f, () => new PendingPreparationsError());
createErrorFromNameLookup.set("PendingPreparations", () => new PendingPreparationsError());

/**
 * InvalidBackupAddress: 'Passed backup address should be an associated account of protocol owner'
 *
 * @category Errors
 * @category generated
 */
export class InvalidBackupAddressError extends Error {
  readonly code: number = 0x1790;
  readonly name: string = "InvalidBackupAddress";
  constructor() {
    super("Passed backup address should be an associated account of protocol owner");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, InvalidBackupAddressError);
    }
  }
}

createErrorFromCodeLookup.set(0x1790, () => new InvalidBackupAddressError());
createErrorFromNameLookup.set("InvalidBackupAddress", () => new InvalidBackupAddressError());

/**
 * NotAMaker: 'Passed address is not a response maker'
 *
 * @category Errors
 * @category generated
 */
export class NotAMakerError extends Error {
  readonly code: number = 0x1791;
  readonly name: string = "NotAMaker";
  constructor() {
    super("Passed address is not a response maker");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NotAMakerError);
    }
  }
}

createErrorFromCodeLookup.set(0x1791, () => new NotAMakerError());
createErrorFromNameLookup.set("NotAMaker", () => new NotAMakerError());

/**
 * NotFirstToPrepare: 'Passed address is not of a party first to prepare for settlement'
 *
 * @category Errors
 * @category generated
 */
export class NotFirstToPrepareError extends Error {
  readonly code: number = 0x1792;
  readonly name: string = "NotFirstToPrepare";
  constructor() {
    super("Passed address is not of a party first to prepare for settlement");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NotFirstToPrepareError);
    }
  }
}

createErrorFromCodeLookup.set(0x1792, () => new NotFirstToPrepareError());
createErrorFromNameLookup.set("NotFirstToPrepare", () => new NotFirstToPrepareError());

/**
 * HaveExistingResponses: 'Rfq have not cleared responses and can't be cleaned up'
 *
 * @category Errors
 * @category generated
 */
export class HaveExistingResponsesError extends Error {
  readonly code: number = 0x1793;
  readonly name: string = "HaveExistingResponses";
  constructor() {
    super("Rfq have not cleared responses and can't be cleaned up");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, HaveExistingResponsesError);
    }
  }
}

createErrorFromCodeLookup.set(0x1793, () => new HaveExistingResponsesError());
createErrorFromNameLookup.set("HaveExistingResponses", () => new HaveExistingResponsesError());

/**
 * HaveResponses: 'Can't cancel an rfq with existing responses'
 *
 * @category Errors
 * @category generated
 */
export class HaveResponsesError extends Error {
  readonly code: number = 0x1794;
  readonly name: string = "HaveResponses";
  constructor() {
    super("Can't cancel an rfq with existing responses");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, HaveResponsesError);
    }
  }
}

createErrorFromCodeLookup.set(0x1794, () => new HaveResponsesError());
createErrorFromNameLookup.set("HaveResponses", () => new HaveResponsesError());

/**
 * InvalidSpecifiedLegAmount: 'Invalid specified leg amount'
 *
 * @category Errors
 * @category generated
 */
export class InvalidSpecifiedLegAmountError extends Error {
  readonly code: number = 0x1795;
  readonly name: string = "InvalidSpecifiedLegAmount";
  constructor() {
    super("Invalid specified leg amount");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, InvalidSpecifiedLegAmountError);
    }
  }
}

createErrorFromCodeLookup.set(0x1795, () => new InvalidSpecifiedLegAmountError());
createErrorFromNameLookup.set("InvalidSpecifiedLegAmount", () => new InvalidSpecifiedLegAmountError());

/**
 * AlreadyStartedToPrepare: 'Already started to prepare to settle'
 *
 * @category Errors
 * @category generated
 */
export class AlreadyStartedToPrepareError extends Error {
  readonly code: number = 0x1796;
  readonly name: string = "AlreadyStartedToPrepare";
  constructor() {
    super("Already started to prepare to settle");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, AlreadyStartedToPrepareError);
    }
  }
}

createErrorFromCodeLookup.set(0x1796, () => new AlreadyStartedToPrepareError());
createErrorFromNameLookup.set("AlreadyStartedToPrepare", () => new AlreadyStartedToPrepareError());

/**
 * HaveNotStartedToPrepare: 'Have not started to prepare to settle'
 *
 * @category Errors
 * @category generated
 */
export class HaveNotStartedToPrepareError extends Error {
  readonly code: number = 0x1797;
  readonly name: string = "HaveNotStartedToPrepare";
  constructor() {
    super("Have not started to prepare to settle");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, HaveNotStartedToPrepareError);
    }
  }
}

createErrorFromCodeLookup.set(0x1797, () => new HaveNotStartedToPrepareError());
createErrorFromNameLookup.set("HaveNotStartedToPrepare", () => new HaveNotStartedToPrepareError());

/**
 * TooManyLegs: 'LegAmountExceedsMaximumLimit'
 *
 * @category Errors
 * @category generated
 */
export class TooManyLegsError extends Error {
  readonly code: number = 0x1798;
  readonly name: string = "TooManyLegs";
  constructor() {
    super("LegAmountExceedsMaximumLimit");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, TooManyLegsError);
    }
  }
}

createErrorFromCodeLookup.set(0x1798, () => new TooManyLegsError());
createErrorFromNameLookup.set("TooManyLegs", () => new TooManyLegsError());

/**
 * LegsDataTooBig: 'LegsDataSizeExceedsMaximumLimit'
 *
 * @category Errors
 * @category generated
 */
export class LegsDataTooBigError extends Error {
  readonly code: number = 0x1799;
  readonly name: string = "LegsDataTooBig";
  constructor() {
    super("LegsDataSizeExceedsMaximumLimit");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, LegsDataTooBigError);
    }
  }
}

createErrorFromCodeLookup.set(0x1799, () => new LegsDataTooBigError());
createErrorFromNameLookup.set("LegsDataTooBig", () => new LegsDataTooBigError());

/**
 * MaxInstruments: 'Can't add new instrument because maximum amout of instruments already added'
 *
 * @category Errors
 * @category generated
 */
export class MaxInstrumentsError extends Error {
  readonly code: number = 0x179a;
  readonly name: string = "MaxInstruments";
  constructor() {
    super("Can't add new instrument because maximum amout of instruments already added");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, MaxInstrumentsError);
    }
  }
}

createErrorFromCodeLookup.set(0x179a, () => new MaxInstrumentsError());
createErrorFromNameLookup.set("MaxInstruments", () => new MaxInstrumentsError());

/**
 * InvalidQuoteInstrument: 'Current instrument cannot be used as a quote asset'
 *
 * @category Errors
 * @category generated
 */
export class InvalidQuoteInstrumentError extends Error {
  readonly code: number = 0x179b;
  readonly name: string = "InvalidQuoteInstrument";
  constructor() {
    super("Current instrument cannot be used as a quote asset");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, InvalidQuoteInstrumentError);
    }
  }
}

createErrorFromCodeLookup.set(0x179b, () => new InvalidQuoteInstrumentError());
createErrorFromNameLookup.set("InvalidQuoteInstrument", () => new InvalidQuoteInstrumentError());

/**
 * AssetAmountOverflow: 'Amount of asset to transfer overflows'
 *
 * @category Errors
 * @category generated
 */
export class AssetAmountOverflowError extends Error {
  readonly code: number = 0x179c;
  readonly name: string = "AssetAmountOverflow";
  constructor() {
    super("Amount of asset to transfer overflows");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, AssetAmountOverflowError);
    }
  }
}

createErrorFromCodeLookup.set(0x179c, () => new AssetAmountOverflowError());
createErrorFromNameLookup.set("AssetAmountOverflow", () => new AssetAmountOverflowError());

/**
 * PriceCannotBeNegative: 'Price cannot be negative for fixed quote asset amount RFQ'
 *
 * @category Errors
 * @category generated
 */
export class PriceCannotBeNegativeError extends Error {
  readonly code: number = 0x179d;
  readonly name: string = "PriceCannotBeNegative";
  constructor() {
    super("Price cannot be negative for fixed quote asset amount RFQ");
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, PriceCannotBeNegativeError);
    }
  }
}

createErrorFromCodeLookup.set(0x179d, () => new PriceCannotBeNegativeError());
createErrorFromNameLookup.set("PriceCannotBeNegative", () => new PriceCannotBeNegativeError());

/**
 * Attempts to resolve a custom program error from the provided error code.
 * @category Errors
 * @category generated
 */
export function errorFromCode(code: number): MaybeErrorWithCode {
  const createError = createErrorFromCodeLookup.get(code);
  return createError != null ? createError() : null;
}

/**
 * Attempts to resolve a custom program error from the provided error name, i.e. 'Unauthorized'.
 * @category Errors
 * @category generated
 */
export function errorFromName(name: string): MaybeErrorWithCode {
  const createError = createErrorFromNameLookup.get(name);
  return createError != null ? createError() : null;
}
