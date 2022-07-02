export type Rfq = {
  "version": "0.1.0",
  "name": "rfq",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeDenominator",
          "type": "u64"
        },
        {
          "name": "feeNumerator",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setFee",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeDenominator",
          "type": "u64"
        },
        {
          "name": "feeNumerator",
          "type": "u64"
        }
      ]
    },
    {
      "name": "request",
      "accounts": [
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "accessManager",
          "type": {
            "option": "publicKey"
          }
        },
        {
          "name": "expiry",
          "type": "i64"
        },
        {
          "name": "lastLook",
          "type": "bool"
        },
        {
          "name": "legs",
          "type": {
            "option": "publicKey"
          }
        },
        {
          "name": "orderAmount",
          "type": "u64"
        },
        {
          "name": "orderType",
          "type": {
            "defined": "Order"
          }
        }
      ]
    },
    {
      "name": "respond",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bid",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "ask",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "cancel",
      "accounts": [
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "lastLook",
      "accounts": [
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "confirm",
      "accounts": [
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quote",
          "type": {
            "defined": "Quote"
          }
        }
      ]
    },
    {
      "name": "returnCollateral",
      "accounts": [
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "settle",
      "accounts": [
        {
          "name": "assetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasuryWallet",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializePsyOptionsAmericanOptionMarket",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "psyAmericanProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "underlyingAssetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteAssetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "writerTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteAssetPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingAssetPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "optionMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "underlyingAmountPerContract",
          "type": "u64"
        },
        {
          "name": "quoteAmountPerContract",
          "type": "u64"
        },
        {
          "name": "expirationUnixTimestamp",
          "type": "i64"
        },
        {
          "name": "bumpSeed",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initializePsyOptionsAmericanMintVault",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "underlyingAsset",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "mintPsyOptionsAmericanOption",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "psyAmericanProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingAssetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "underlyingAssetPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintedOptionDest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "writerTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legs",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintedWriterTokenDest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "optionMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeOwner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "leg",
          "type": "u64"
        },
        {
          "name": "size",
          "type": "u64"
        },
        {
          "name": "vaultAuthorityBump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "accessManagerState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "wallets",
            "type": {
              "array": [
                "publicKey",
                25
              ]
            }
          }
        ]
      }
    },
    {
      "name": "rfqState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accessManager",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "approved",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "assetEscrowBump",
            "type": "u8"
          },
          {
            "name": "assetMint",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bestAskAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bestBidAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bestAskAddress",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "bestBidAddress",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "canceled",
            "type": "bool"
          },
          {
            "name": "confirmed",
            "type": "bool"
          },
          {
            "name": "expiry",
            "type": "i64"
          },
          {
            "name": "legs",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "lastLook",
            "type": "bool"
          },
          {
            "name": "orderAmount",
            "type": "u64"
          },
          {
            "name": "orderType",
            "type": {
              "defined": "Order"
            }
          },
          {
            "name": "quoteEscrowBump",
            "type": "u8"
          },
          {
            "name": "quoteMint",
            "type": "publicKey"
          },
          {
            "name": "settled",
            "type": "bool"
          },
          {
            "name": "unixTimestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "protocolState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "feeDenominator",
            "type": "u64"
          },
          {
            "name": "feeNumerator",
            "type": "u64"
          },
          {
            "name": "treasuryWallet",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "orderState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ask",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "askConfirmed",
            "type": "bool"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bid",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bidConfirmed",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "collateralReturned",
            "type": "bool"
          },
          {
            "name": "confirmedQuote",
            "type": {
              "option": {
                "defined": "Quote"
              }
            }
          },
          {
            "name": "rfq",
            "type": "publicKey"
          },
          {
            "name": "settled",
            "type": "bool"
          },
          {
            "name": "unixTimestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "legsState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "legs",
            "type": {
              "vec": {
                "defined": "Leg"
              }
            }
          },
          {
            "name": "rfq",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Leg",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "contract",
            "type": {
              "option": {
                "defined": "Contract"
              }
            }
          },
          {
            "name": "contractAssetAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "contractQuoteAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "processed",
            "type": "bool"
          },
          {
            "name": "expiry",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "instrument",
            "type": {
              "defined": "Instrument"
            }
          },
          {
            "name": "venue",
            "type": {
              "defined": "Venue"
            }
          }
        ]
      }
    },
    {
      "name": "Instrument",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Option"
          },
          {
            "name": "Future"
          },
          {
            "name": "Spot"
          }
        ]
      }
    },
    {
      "name": "Contract",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Call"
          },
          {
            "name": "Put"
          },
          {
            "name": "Long"
          },
          {
            "name": "Short"
          }
        ]
      }
    },
    {
      "name": "Venue",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Convergence"
          },
          {
            "name": "PsyOptions"
          },
          {
            "name": "Sollar"
          }
        ]
      }
    },
    {
      "name": "Quote",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Bid"
          },
          {
            "name": "Ask"
          }
        ]
      }
    },
    {
      "name": "Order",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Buy"
          },
          {
            "name": "Sell"
          },
          {
            "name": "TwoWay"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "CollateralReturned",
      "msg": "Collateral returned"
    },
    {
      "code": 6001,
      "name": "CpiError",
      "msg": "CPI error"
    },
    {
      "code": 6002,
      "name": "InvalidCancel",
      "msg": "Invalid cancel"
    },
    {
      "code": 6003,
      "name": "InvalidConfirm",
      "msg": "Invalid confirm"
    },
    {
      "code": 6004,
      "name": "InvalidFee",
      "msg": "Invalid fee"
    },
    {
      "code": 6005,
      "name": "InvalidQuote",
      "msg": "Invalid quote"
    },
    {
      "code": 6006,
      "name": "InvalidRfq",
      "msg": "Invalid RFQ"
    },
    {
      "code": 6007,
      "name": "InvalidTaker",
      "msg": "Invalid taker"
    },
    {
      "code": 6008,
      "name": "InvalidAuthority",
      "msg": "Invalid authority"
    },
    {
      "code": 6009,
      "name": "InvalidRequest",
      "msg": "Invalid request"
    },
    {
      "code": 6010,
      "name": "LastLookNotSet",
      "msg": "Last look not set"
    },
    {
      "code": 6011,
      "name": "Math",
      "msg": "Math"
    },
    {
      "code": 6012,
      "name": "NotImplemented",
      "msg": "Not implemented"
    },
    {
      "code": 6013,
      "name": "OrderConfirmed",
      "msg": "Order confirmed"
    },
    {
      "code": 6014,
      "name": "OrderNotApproved",
      "msg": "Order not approved via last look"
    },
    {
      "code": 6015,
      "name": "OrderSettled",
      "msg": "Order settled"
    },
    {
      "code": 6016,
      "name": "RfqActive",
      "msg": "RFQ active"
    },
    {
      "code": 6017,
      "name": "RfqInactive",
      "msg": "RFQ inactive"
    },
    {
      "code": 6018,
      "name": "RfqConfirmed",
      "msg": "RFQ confirmed"
    },
    {
      "code": 6019,
      "name": "RfqUnconfirmed",
      "msg": "RFQ unconfirmed"
    },
    {
      "code": 6020,
      "name": "RfqCanceled",
      "msg": "RFQ canceled"
    },
    {
      "code": 6021,
      "name": "RfqSettled",
      "msg": "RFQ settled"
    },
    {
      "code": 6022,
      "name": "DexIxError",
      "msg": "Error creating a dex instruction"
    }
  ]
};

export const IDL: Rfq = {
  "version": "0.1.0",
  "name": "rfq",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeDenominator",
          "type": "u64"
        },
        {
          "name": "feeNumerator",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setFee",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeDenominator",
          "type": "u64"
        },
        {
          "name": "feeNumerator",
          "type": "u64"
        }
      ]
    },
    {
      "name": "request",
      "accounts": [
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "accessManager",
          "type": {
            "option": "publicKey"
          }
        },
        {
          "name": "expiry",
          "type": "i64"
        },
        {
          "name": "lastLook",
          "type": "bool"
        },
        {
          "name": "legs",
          "type": {
            "option": "publicKey"
          }
        },
        {
          "name": "orderAmount",
          "type": "u64"
        },
        {
          "name": "orderType",
          "type": {
            "defined": "Order"
          }
        }
      ]
    },
    {
      "name": "respond",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bid",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "ask",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "cancel",
      "accounts": [
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "lastLook",
      "accounts": [
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "confirm",
      "accounts": [
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quote",
          "type": {
            "defined": "Quote"
          }
        }
      ]
    },
    {
      "name": "returnCollateral",
      "accounts": [
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "settle",
      "accounts": [
        {
          "name": "assetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasuryWallet",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializePsyOptionsAmericanOptionMarket",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "psyAmericanProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "underlyingAssetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteAssetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "writerTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteAssetPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingAssetPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "optionMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "underlyingAmountPerContract",
          "type": "u64"
        },
        {
          "name": "quoteAmountPerContract",
          "type": "u64"
        },
        {
          "name": "expirationUnixTimestamp",
          "type": "i64"
        },
        {
          "name": "bumpSeed",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initializePsyOptionsAmericanMintVault",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "underlyingAsset",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "mintPsyOptionsAmericanOption",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "psyAmericanProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingAssetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "underlyingAssetPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintedOptionDest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "writerTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legs",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintedWriterTokenDest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "optionMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeOwner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "leg",
          "type": "u64"
        },
        {
          "name": "size",
          "type": "u64"
        },
        {
          "name": "vaultAuthorityBump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "accessManagerState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "wallets",
            "type": {
              "array": [
                "publicKey",
                25
              ]
            }
          }
        ]
      }
    },
    {
      "name": "rfqState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accessManager",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "approved",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "assetEscrowBump",
            "type": "u8"
          },
          {
            "name": "assetMint",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bestAskAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bestBidAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bestAskAddress",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "bestBidAddress",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "canceled",
            "type": "bool"
          },
          {
            "name": "confirmed",
            "type": "bool"
          },
          {
            "name": "expiry",
            "type": "i64"
          },
          {
            "name": "legs",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "lastLook",
            "type": "bool"
          },
          {
            "name": "orderAmount",
            "type": "u64"
          },
          {
            "name": "orderType",
            "type": {
              "defined": "Order"
            }
          },
          {
            "name": "quoteEscrowBump",
            "type": "u8"
          },
          {
            "name": "quoteMint",
            "type": "publicKey"
          },
          {
            "name": "settled",
            "type": "bool"
          },
          {
            "name": "unixTimestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "protocolState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "feeDenominator",
            "type": "u64"
          },
          {
            "name": "feeNumerator",
            "type": "u64"
          },
          {
            "name": "treasuryWallet",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "orderState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ask",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "askConfirmed",
            "type": "bool"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bid",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bidConfirmed",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "collateralReturned",
            "type": "bool"
          },
          {
            "name": "confirmedQuote",
            "type": {
              "option": {
                "defined": "Quote"
              }
            }
          },
          {
            "name": "rfq",
            "type": "publicKey"
          },
          {
            "name": "settled",
            "type": "bool"
          },
          {
            "name": "unixTimestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "legsState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "legs",
            "type": {
              "vec": {
                "defined": "Leg"
              }
            }
          },
          {
            "name": "rfq",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Leg",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "contract",
            "type": {
              "option": {
                "defined": "Contract"
              }
            }
          },
          {
            "name": "contractAssetAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "contractQuoteAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "processed",
            "type": "bool"
          },
          {
            "name": "expiry",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "instrument",
            "type": {
              "defined": "Instrument"
            }
          },
          {
            "name": "venue",
            "type": {
              "defined": "Venue"
            }
          }
        ]
      }
    },
    {
      "name": "Instrument",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Option"
          },
          {
            "name": "Future"
          },
          {
            "name": "Spot"
          }
        ]
      }
    },
    {
      "name": "Contract",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Call"
          },
          {
            "name": "Put"
          },
          {
            "name": "Long"
          },
          {
            "name": "Short"
          }
        ]
      }
    },
    {
      "name": "Venue",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Convergence"
          },
          {
            "name": "PsyOptions"
          },
          {
            "name": "Sollar"
          }
        ]
      }
    },
    {
      "name": "Quote",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Bid"
          },
          {
            "name": "Ask"
          }
        ]
      }
    },
    {
      "name": "Order",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Buy"
          },
          {
            "name": "Sell"
          },
          {
            "name": "TwoWay"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "CollateralReturned",
      "msg": "Collateral returned"
    },
    {
      "code": 6001,
      "name": "CpiError",
      "msg": "CPI error"
    },
    {
      "code": 6002,
      "name": "InvalidCancel",
      "msg": "Invalid cancel"
    },
    {
      "code": 6003,
      "name": "InvalidConfirm",
      "msg": "Invalid confirm"
    },
    {
      "code": 6004,
      "name": "InvalidFee",
      "msg": "Invalid fee"
    },
    {
      "code": 6005,
      "name": "InvalidQuote",
      "msg": "Invalid quote"
    },
    {
      "code": 6006,
      "name": "InvalidRfq",
      "msg": "Invalid RFQ"
    },
    {
      "code": 6007,
      "name": "InvalidTaker",
      "msg": "Invalid taker"
    },
    {
      "code": 6008,
      "name": "InvalidAuthority",
      "msg": "Invalid authority"
    },
    {
      "code": 6009,
      "name": "InvalidRequest",
      "msg": "Invalid request"
    },
    {
      "code": 6010,
      "name": "LastLookNotSet",
      "msg": "Last look not set"
    },
    {
      "code": 6011,
      "name": "Math",
      "msg": "Math"
    },
    {
      "code": 6012,
      "name": "NotImplemented",
      "msg": "Not implemented"
    },
    {
      "code": 6013,
      "name": "OrderConfirmed",
      "msg": "Order confirmed"
    },
    {
      "code": 6014,
      "name": "OrderNotApproved",
      "msg": "Order not approved via last look"
    },
    {
      "code": 6015,
      "name": "OrderSettled",
      "msg": "Order settled"
    },
    {
      "code": 6016,
      "name": "RfqActive",
      "msg": "RFQ active"
    },
    {
      "code": 6017,
      "name": "RfqInactive",
      "msg": "RFQ inactive"
    },
    {
      "code": 6018,
      "name": "RfqConfirmed",
      "msg": "RFQ confirmed"
    },
    {
      "code": 6019,
      "name": "RfqUnconfirmed",
      "msg": "RFQ unconfirmed"
    },
    {
      "code": 6020,
      "name": "RfqCanceled",
      "msg": "RFQ canceled"
    },
    {
      "code": 6021,
      "name": "RfqSettled",
      "msg": "RFQ settled"
    },
    {
      "code": 6022,
      "name": "DexIxError",
      "msg": "Error creating a dex instruction"
    }
  ]
};
