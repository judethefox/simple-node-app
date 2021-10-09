const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const request = require("request");
const { getTableNumericData } = require("./utils");
const { JSDOM } = require("jsdom");

const app = express();

app.use(cors());

const jsonParser = bodyParser.json();

app.post("/", jsonParser, (req, res) => {
  const { wikiUrl } = req.body;

  request.get(wikiUrl, function (error, response, body) {
    const dom = new JSDOM(body);
    const wikiTables = dom.window.document.body.querySelectorAll(".wikitable");

    if (!wikiTables) {
      res.json({ error: "Page must contain 'wikitable' class" });
    }

    try {
      const data = getTableNumericData(wikiTables);

      if (!data.length) {
        res.json({
          error:
            "No suitable tables found. Table must contain some numeric columns.",
        });
      } else {
        res.json({ data });
      }
    } catch (error) {
      res.json({ error: "Server error. Please contact admin." });
    }
  });
});

app.listen(3001);
