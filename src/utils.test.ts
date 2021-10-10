import { validateAddForm } from "./utils";

describe("test validateAddForm", () => {
  it("should return an array of field names if fields are empty", () => {
    const address = "";
    const suburb = "";
    const state = "";
    const price = "";
    const description = "";

    const expectedErrors = [
      "address",
      "suburb",
      "state",
      "price",
      "description",
    ];

    expect(validateAddForm(address, suburb, state, price, description)).toEqual(
      expectedErrors
    );
  });

  it("price must be a number", () => {
    const priceDataProvider = ["", "sup", "123 whaaaat"];

    const address = "1 cool st";
    const suburb = "richmond";
    const state = "vic";
    const description = "test desc";

    const expectedErrors = ["price"];

    priceDataProvider.forEach((invalidPrice) => {
      expect(
        validateAddForm(address, suburb, state, invalidPrice, description)
      ).toEqual(expectedErrors);
    });
  });

  it("if all field data are valid, return an empty array", () => {
    const address = "1 cool st";
    const suburb = "richmond";
    const price = "123456";
    const state = "vic";
    const description = "test desc";

    expect(validateAddForm(address, suburb, state, price, description)).toEqual(
      []
    );
  });
});
