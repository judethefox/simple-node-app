const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  checkIfPropertyExists,
  addNewProperty,
  getExistingProperties,
  getSuburbAverage,
  addPricePointToProperties,
} = require("./utils");

const app = express();

app.use(cors());

const jsonParser = bodyParser.json();

app.post("/property", jsonParser, (req, res) => {
  try {
    const { address, suburb, state, price, description } = req.body;

    const existingProperties = getExistingProperties();

    if (checkIfPropertyExists(existingProperties, address, suburb, state)) {
      res.status(400);
      res.send("Property already exists");
    } else {
      addNewProperty(
        existingProperties,
        address,
        suburb,
        state,
        price,
        description
      );
      res.json({ success: true });
    }
  } catch (error) {
    res.status(500);
    res.send("Failed to add new property");
  }
});

app.get("/properties", (req, res) => {
  try {
    const { suburb } = req.query;
    const existingProperties = getExistingProperties();

    const filteredProperties = suburb
      ? existingProperties.filter(
          ({ suburb: currentSuburb }) =>
            suburb.toLowerCase() === currentSuburb.toLowerCase()
        )
      : existingProperties;

    const suburbAverage = getSuburbAverage(filteredProperties);

    const decoratedProperties = addPricePointToProperties(
      filteredProperties,
      suburbAverage
    );

    if (decoratedProperties.length) {
      res.json({ data: decoratedProperties });
    } else {
      res.status(400);
      res.send("No property found");
    }
  } catch (error) {
    res.status(500);
    res.send("Failed to retrieve properties");
  }
});

app.listen(3001);
