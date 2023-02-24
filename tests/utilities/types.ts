import { BN } from "@project-serum/anchor";

export const OrderType = {
  Buy: { buy: {} },
  Sell: { sell: {} },
  TwoWay: { twoWay: {} },
};

export const Side = {
  Bid: { bid: {} },
  Ask: { ask: {} },
};

export const AuthoritySide = {
  Taker: { taker: {} },
  Maker: { maker: {} },
};

export enum RiskCategory {
  VeryLow,
  Low,
  Medium,
  High,
  VeryHigh,
}

export function riskCategoryToObject(value: RiskCategory) {
  const stringValue = RiskCategory[value];
  const uncapitalizedValue = stringValue.charAt(0).toLowerCase() + stringValue.slice(1);
  return {
    [uncapitalizedValue]: {},
  };
}

export type Scenario = {
  baseAssetPriceChange: number;
  volatilityChange: number;
};

export type RiskCategoryInfo = {
  interestRate: number;
  annualized30DayVolatility: number;
  scenarioPerSettlementPeriod: [Scenario, Scenario, Scenario, Scenario, Scenario, Scenario];
};

export enum InstrumentType {
  Spot,
  Option,
  TermFuture,
  PerpFuture,
}

export function instrumentTypeToObject(value: InstrumentType) {
  const stringValue = InstrumentType[value];
  const uncapitalizedValue = stringValue.charAt(0).toLowerCase() + stringValue.slice(1);
  return {
    [uncapitalizedValue]: {},
  };
}

export const Quote = {
  getStandard: (priceBps: BN, legsMultiplierBps: BN) => {
    return {
      standard: {
        priceQuote: {
          absolutePrice: {
            amountBps: priceBps,
          },
        },
        legsMultiplierBps,
      },
    };
  },
  getFixedSize: (priceBps: BN) => {
    return {
      fixedSize: {
        priceQuote: {
          absolutePrice: {
            amountBps: priceBps,
          },
        },
      },
    };
  },
};

export const FixedSize = {
  None: {
    none: {
      padding: new BN(0),
    },
  },
  getBaseAsset: (legsMultiplierBps: BN) => {
    return {
      baseAsset: {
        legsMultiplierBps,
      },
    };
  },
  getQuoteAsset: (quoteAmount: BN) => {
    return {
      quoteAsset: {
        quoteAmount,
      },
    };
  },
};

export function toScenario(baseAssetPriceChange: number, volatilityChange: number): Scenario {
  return { baseAssetPriceChange, volatilityChange };
}

export function toRiskCategoryInfo(
  interestRate: number,
  annualized30DayVolatility: number,
  scenarioPerSettlementPeriod: [Scenario, Scenario, Scenario, Scenario, Scenario, Scenario]
): RiskCategoryInfo {
  return {
    interestRate,
    annualized30DayVolatility,
    scenarioPerSettlementPeriod: scenarioPerSettlementPeriod,
  };
}

export type AssetIdentifier = "quote" | { legIndex: number };

export function assetIdentifierToSeedBytes(assetIdentifier: AssetIdentifier) {
  if (assetIdentifier == "quote") {
    return Buffer.from([1, 0]);
  } else {
    return Buffer.from([0, assetIdentifier.legIndex]);
  }
}
