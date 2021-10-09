import { ChartData, NumericTableData } from "./types";

const validateUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    // check if the url is Wikipedia
    return urlObj.hostname.includes("wikipedia.org");
  } catch (error) {
    return false;
  }
};

const getChartData = (data: NumericTableData[]): ChartData[] =>
  data
    .map((bar) => {
      // the raw data might have nonconsecutive keys therefore need to get the real keys
      const firstKey = parseInt(Object.keys(bar)[0]);
      const secondKey = parseInt(Object.keys(bar)[1]);

      return {
        x: bar[secondKey],
        y: parseFloat(bar[firstKey]),
      };
    })
    .filter(
      (bar) =>
        bar.x !== undefined &&
        bar.x !== null &&
        bar.y !== undefined &&
        bar.y !== null
    );

export { validateUrl, getChartData };
