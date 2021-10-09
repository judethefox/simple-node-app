import React from "react";
import { XYPlot, XAxis, YAxis, VerticalBarSeriesCanvas } from "react-vis";
import { getChartData } from "./utils";
import { NumericTableData } from "./types";

const ChartContainer: React.VFC<{ data: NumericTableData[] }> = ({ data }) => {
  const chartData = getChartData(data);

  const yDomain = chartData.reduce(
    (res, row) => {
      return {
        max: Math.max(res.max, row.y),
        min: Math.min(res.min, row.y),
      };
    },
    { max: -Infinity, min: Infinity }
  );

  return (
    <div>
      <XYPlot
        margin={{ left: 50 }}
        xType="ordinal"
        width={4500}
        height={500}
        yDomain={[yDomain.min, yDomain.max]}
      >
        <VerticalBarSeriesCanvas data={chartData} barWidth={5} />
        <XAxis />
        <YAxis />
      </XYPlot>
    </div>
  );
};

export default ChartContainer;
