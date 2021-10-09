const getNumericColIndexes = (tds) =>
  tds.reduce((res, td, colIndex) => {
    // Only support max 2 columns of data
    if (res.length === 2) return res;

    if (!parseFloat(td.textContent)) {
      return res;
    }
    return [...res, colIndex];
  }, []);

// Get an array of data for each table row provided
const getTableNumericColumnData = (trs, numericColIndexes) =>
  trs.map((tr) => {
    const tds = tr.querySelectorAll("td");

    return Array.from(tds).reduce((tableNumericData, td, columnIndex) => {
      if (numericColIndexes.includes(columnIndex)) {
        const textNodeValue = td.textContent;

        // remove line breaks
        const trimmedText = textNodeValue.replace(/(\r\n|\n|\r)/gm, "");

        return { ...tableNumericData, [columnIndex]: trimmedText };
      }

      // skip non-numeric columns
      return tableNumericData;
    }, {});
  });

exports.getTableNumericData = (wikiTables) => {
  return Array.from(wikiTables).reduce((result, wikiTable) => {
    // stop executing the reducer if we have valid data from one of the tables. I understand it's not ideal to loop through the rest of the data but if we use forEach we'll face some other issues
    if (result.length) {
      return result;
    }

    const trs = Array.from(wikiTable.querySelectorAll("tbody tr"));
    // do not continue if the table is empty
    if (trs.length <= 1) return [];

    // for some reason the first row is always empty
    trs.shift();

    const firstRowTds = Array.from(trs[0].querySelectorAll("td"));

    // determine which column contains numeric values. It's only examining the first row so obviously there's a limitation to it.
    const numericColIndexes = getNumericColIndexes(firstRowTds);

    // do not continue if no numeric column is found
    if (!numericColIndexes.length) return [];

    // iterate through each table row, and select data from the numeric column cells
    return getTableNumericColumnData(trs, numericColIndexes);
  }, []);
};
