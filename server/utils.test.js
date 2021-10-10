const {
  checkIfPropertyExists,
  getSuburbAverage,
  addPricePointToProperties,
} = require("./utils");

describe("test checkIfPropertyExists", () => {
  it("if address, suburb and state are identical, return true. The comparison should be case insensitive", () => {
    const existingProperties = [
      {
        address: "1 cool st",
        suburb: "richmond",
        state: "vic",
      },
    ];
    const newAddress = "1 COOL ST";
    const newSuburb = "RICHMOND";
    const newState = "VIC";

    expect(
      checkIfPropertyExists(existingProperties, newAddress, newSuburb, newState)
    ).toStrictEqual(true);
  });

  it("if address, suburb or state are different, return false", () => {
    const existingPropertiesDataProvider = [
      [
        {
          address: "2 cool st",
          suburb: "richmond",
          state: "vic",
        },
      ],
      [
        {
          address: "1 cool st",
          suburb: "melbourne",
          state: "vic",
        },
      ],
      [
        {
          address: "1 cool st",
          suburb: "richmond",
          state: "nsw",
        },
      ],
    ];

    const newAddress = "1 COOL ST";
    const newSuburb = "RICHMOND";
    const newState = "VIC";

    existingPropertiesDataProvider.forEach((existingProperties) => {
      expect(
        checkIfPropertyExists(
          existingProperties,
          newAddress,
          newSuburb,
          newState
        )
      ).toStrictEqual(false);
    });
  });
});

describe("test getSuburbAverage", () => {
  it("should calculate correctly", () => {
    const properties = [
      {
        suburb: "richmond",
        price: 10,
      },
      {
        suburb: "richmond",
        price: 20,
      },
      {
        suburb: "melbourne",
        price: 30,
      },
    ];

    const expectedSuburbAverage = {
      richmond: 15,
      melbourne: 30,
    };

    expect(getSuburbAverage(properties)).toMatchObject(expectedSuburbAverage);
  });
});

describe("test addPricePointToProperties", () => {
  it("should add price point correctly", () => {
    const properties = [
      {
        suburb: "richmond",
        price: 10,
      },
      {
        suburb: "richmond",
        price: 20,
      },
      {
        suburb: "melbourne",
        price: 30,
      },
    ];

    const suburbAverage = {
      richmond: 15,
      melbourne: 30,
    };

    const expectedDecoratedProperties = [
      {
        suburb: "richmond",
        price: 10,
        pricePoint: "BelowAverage",
      },
      {
        suburb: "richmond",
        price: 20,
        pricePoint: "AboveAverage",
      },
      {
        suburb: "melbourne",
        price: 30,
        pricePoint: "Average",
      },
    ];

    expect(addPricePointToProperties(properties, suburbAverage)).toMatchObject(
      expectedDecoratedProperties
    );
  });
});
