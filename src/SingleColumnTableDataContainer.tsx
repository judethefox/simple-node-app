import React from "react";
import { NumericTableData } from "./types";

const SingleColumnTableDataContainer: React.VFC<{ data: NumericTableData[] }> =
  ({ data }) => (
    <div className="w-25 m-auto">
      <p>
        Showing one-dimensional data in a list. To view a bar chart, please find
        a page containing a table with at least 2 numeric columns
      </p>
      {data.map((row) => {
        const key = parseInt(Object.keys(row)[0]);
        return <div>{row[key]}</div>;
      })}
    </div>
  );

export default SingleColumnTableDataContainer;
