/**
 * <-----------------------------Author:Rahul Kumar---------------1/05/2024------------------------->
 */
const mongoose = require("mongoose");

const clientForm = new mongoose.Schema({
  membership: {
    type: String,
    enum: ["warrenty", "gold", "silver", "platinum"],
  },
  profilePic: {
    type: String,
  },
  clientFormDetails: {
    //First part of the form
    jon: {
      type: String,
    },
    userName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    alternativeNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    dateOfHandover: {
      type: String,
    },
    address: {
      type: String,
    },
    pincode: {
      type: String,
    },
    state: {
      type: String,
    },
    district: {
      type: String,
    },
    city: {
      type: String,
    },
    sourceOfLead: {
      type: String,
    },
    referenceName: {
      type: String,
    },
  },
  clientSalesManDetails: {
    salesmanId: {
      type: String,
    },
    salesmanName: {
      type: String,
    },

    discountAmount: {
      type: String,
    },
    discountInPercentage: {
      type: String,
    },
    discountInRupees: {
      type: String,
    },
    mdDiscountInPercentage: {
      type: String,
    },
    finalAmount: {
      type: String,
    },
    finalPrice: {
      type: String,
    },
    quotatedPrice: {
      type: String,
    },
  },
  clientMembershipDocument: {
    selectedMembership: {
      type: String,
      enum: ["Warranty", "Silver", "Gold", "Platnium"],
    },
    paymentForm: {
      type: String,
    },
    chequeForm: {
      type: String,
    },
    salesOrder: {
      type: String,
    },
    signedQuotation: {
      type: String,
    },
  },

  clientArchitect: {
    architectName: {
      type: String,
    },
    architectNumber: {
      type: String,
    },
    contractorName: {
      type: String,
    },
    contractorNumber: {
      type: String,
    },
  },

  //Second part of the form start

  elevatorDetails: {
    pitDepth: {
      type: String,
    },
    type: {
      type: String,
    },
    purpose: {
      type: String,
    },
    capacity: {
      type: String,
    },
    capacityUnit: {
      type: String,
    },
    stops: {
      numberOfStops: {
        type: Number,
      },
      Basement: [
        {
          type: String,
          enum: ["B1", "B2"],
        },
      ],
      FloorType: {
        type: String,
        enum: ["G", "S"],
      },
    },
    doorType: {
      type: String,
    },
    constructionMaterial: {
      type: String,
    },
    numberOfOpenings: {
      type: Number,
    },
    sideOpening: [
      {
        type: String,
        enum: ["180d", "90dL", "90dR"],
      },
    ],
    levelOpening: [
      {
        level: {
          type: String,
        },
        openings: [
          {
            type: String,
            enum: ["original", "180d", "90dL", "90dR"],
          },
        ],
      },
    ],
    remarks: {
      type: String,
    },
  },
  //third part of the form
  dimensions: {
    pitPoint: {
      levelName: {
        type: String,
      },
      shaftWidth: {
        type: String,
      },
      shaftDepth: {
        type: String,
      },
      doorWidth: {
        type: String,
      },
      doorHeight: {
        type: String,
      },
      floorToFloorHeight: {
        type: String,
      },
      pitDepth: {
        type: String,
      },
      fl: {
        type: String,
      },
      fr: {
        type: String,
      },
      sitePhotos: {
        pit: {
          type: String,
        },
        bottomToTop: {
          type: String,
        },
        basementFront: {
          type: String,
        },
      },
    },
    floors: [
      {
        levelName: {
          type: String,
        },
        shaftWidth: {
          type: String,
        },
        shaftDepth: {
          type: String,
        },
        doorWidth: {
          type: String,
        },
        doorHeight: {
          type: String,
        },
        floorToFloorHeight: {
          type: String,
        },
        fl: {
          type: String,
        },
        fr: {
          type: String,
        },
        sitePhotos: {
          type: String,
        },
      },
    ],
    topPoint: {
      levelName: {
        type: String,
      },
      shaftWidth: {
        type: String,
      },
      shaftDepth: {
        type: String,
      },
      doorHeight: {
        type: String,
      },
      doorWidth: {
        type: String,
      },
      overhead: {
        type: String,
      },
      sitePhotos: {
        topFloorFront: {
          type: String,
        },
        bottomToTopImages: {
          type: String,
        },
        Overhead: {
          type: String,
        },
      },
    },
  },
});

module.exports = mongoose.model("RegisteredElevatorForm", clientForm);
