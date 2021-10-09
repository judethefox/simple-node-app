const { getTableNumericData } = require("./utils");

describe("test getTableNumericData", () => {
  it("should convert table node list into data correctly", () => {
    const html =
      "<table class='wikitable'>" +
      "<tbody>" +
      "<tr>" +
      "<td>1</td><td>2</td>" +
      "</tr>" +
      "</tbody>" +
      "</table>";

    // cannot user jsdom here due to a text encoder error in jest
    const table = document.createElement("table");
    table.innerHTML =
      "<tbody>" +
      "<tr>" +
      "<td>heading 1</td><td>heading 2</td>" +
      "</tr>" +
      "<tr>" +
      "<td>1</td><td>2</td>" +
      "</tr>" +
      "</tbody>";

    const tableNodeList = table.childNodes;
    const expectedData = [{ 0: "1", 1: "2" }];

    expect(getTableNumericData(tableNodeList)).toStrictEqual(expectedData);
  });
});
