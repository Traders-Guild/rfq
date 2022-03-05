export type Rfq = {
  "version": "0.0.0",
  "name": "rfq",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
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
      "name": "initializeRfq",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "token",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rfqState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "globalState",
          "isMut": false,
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
          "name": "associatedTokenProgram",
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
          "name": "action",
          "type": "bool"
        },
        {
          "name": "instrument",
          "type": "u8"
        },
        {
          "name": "rfqExpiry",
          "type": "i64"
        },
        {
          "name": "strike",
          "type": "u64"
        },
        {
          "name": "ratio",
          "type": "u8"
        },
        {
          "name": "nOfLegs",
          "type": "u8"
        }
      ]
    },
    {
      "name": "placeLimitOrder",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderBook",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "action",
          "type": "bool"
        },
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "placeMarketOrder",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderBook",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "cancelLimitOrder",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderBook",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "cancelMarketOrder",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderBook",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "cancelAllOrders",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderBook",
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
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderBook",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "rfqState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "action",
            "type": "bool"
          },
          {
            "name": "instrument",
            "type": "u8"
          },
          {
            "name": "rfqExpiry",
            "type": "i64"
          },
          {
            "name": "strike",
            "type": "u64"
          },
          {
            "name": "ratio",
            "type": "u8"
          },
          {
            "name": "nOfLegs",
            "type": "u8"
          },
          {
            "name": "bestOffer",
            "type": "u64"
          },
          {
            "name": "bestBid",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "orderBook",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "state",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rfqCount",
            "type": "u64"
          },
          {
            "name": "accessManagerCount",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "feeDenominator",
            "type": "u64"
          },
          {
            "name": "feeNumerator",
            "type": "u64"
          }
        ]
      }
    }
  ]
};

export const IDL: Rfq = {
  "version": "0.0.0",
  "name": "rfq",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
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
      "name": "initializeRfq",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "token",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rfqState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "globalState",
          "isMut": false,
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
          "name": "associatedTokenProgram",
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
          "name": "action",
          "type": "bool"
        },
        {
          "name": "instrument",
          "type": "u8"
        },
        {
          "name": "rfqExpiry",
          "type": "i64"
        },
        {
          "name": "strike",
          "type": "u64"
        },
        {
          "name": "ratio",
          "type": "u8"
        },
        {
          "name": "nOfLegs",
          "type": "u8"
        }
      ]
    },
    {
      "name": "placeLimitOrder",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderBook",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "action",
          "type": "bool"
        },
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "placeMarketOrder",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderBook",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "cancelLimitOrder",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderBook",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "cancelMarketOrder",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderBook",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "cancelAllOrders",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderBook",
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
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orderBook",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "rfqState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "action",
            "type": "bool"
          },
          {
            "name": "instrument",
            "type": "u8"
          },
          {
            "name": "rfqExpiry",
            "type": "i64"
          },
          {
            "name": "strike",
            "type": "u64"
          },
          {
            "name": "ratio",
            "type": "u8"
          },
          {
            "name": "nOfLegs",
            "type": "u8"
          },
          {
            "name": "bestOffer",
            "type": "u64"
          },
          {
            "name": "bestBid",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "orderBook",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "state",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rfqCount",
            "type": "u64"
          },
          {
            "name": "accessManagerCount",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "feeDenominator",
            "type": "u64"
          },
          {
            "name": "feeNumerator",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
