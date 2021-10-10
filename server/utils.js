const fs = require("fs");

exports.addNewProperty = (
  properties,
  newAddress,
  newSuburb,
  newState,
  newPrice,
  newDescription
) => {
  properties.push({
    address: newAddress,
    suburb: newSuburb,
    state: newState,
    price: newPrice,
    description: newDescription,
  });
  fs.writeFileSync(
    "./server/properties.json",
    JSON.stringify(properties, null, 2)
  );
};

exports.checkIfPropertyExists = (
  existingProperties,
  newAddress,
  newSuburb,
  newState
) =>
  !!existingProperties.find(
    ({ address, suburb, state }) =>
      address.toLowerCase() === newAddress.toLowerCase() &&
      suburb.toLowerCase() === newSuburb.toLowerCase() &&
      state.toLowerCase() === newState.toLowerCase()
  );

exports.getSuburbAverage = (properties) => {
  const suburbData = properties.reduce((result, { suburb, price }) => {
    if (!result.hasOwnProperty(suburb)) {
      result[suburb] = {
        totalPrice: parseFloat(price),
        totalNumber: 1,
      };
    } else {
      result[suburb].totalPrice += parseFloat(price);
      result[suburb].totalNumber += 1;
    }

    return result;
  }, {});

  const suburbAverage = {};
  for (const [suburb, { totalPrice, totalNumber }] of Object.entries(
    suburbData
  )) {
    suburbAverage[suburb] = totalPrice / totalNumber;
  }

  return suburbAverage;
};

exports.getExistingProperties = () => {
  const propertyJson = fs.readFileSync("./server/properties.json");
  return JSON.parse(propertyJson);
};

exports.addPricePointToProperties = (properties, suburbAverage) =>
  properties.map((property) => {
    const { suburb, price } = property;
    const averagePrice = suburbAverage[suburb];

    const pricePoint =
      parseFloat(price) > averagePrice
        ? "AboveAverage"
        : parseFloat(price) === averagePrice
        ? "Average"
        : "BelowAverage";

    return { ...property, ...{ pricePoint } };
  });
