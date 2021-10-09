import { getChartData, validateUrl } from "./utils";

describe("test validateUrl", () => {
  it("should returns false for non url strings", () => {
    expect(validateUrl("sup")).toBe(false);
  });

  it("should returns false for non-wikipedia urls", () => {
    expect(validateUrl("https://www.google.com")).toBe(false);
  });

  it("should returns true for wikipedia urls", () => {
    expect(
      validateUrl(
        "https://en.wikipedia.org/wiki/2020%E2%80%9321_Sevilla_FC_season"
      )
    ).toBe(true);
  });
});

describe("test getChartData", () => {
  const dataProvider = [
    {
      data: [
        { 0: "2021", 2: "8 medals" },
        { 0: "2022", 2: "5 medals" },
      ],
      chartData: [
        { x: "8 medals", y: 2021 },
        { x: "5 medals", y: 2022 },
      ],
    },
    {
      data: [
        { 3: "2021 game", 2: "8 medals" },
        { 3: "2022 game", 2: "5 medals" },
      ],
      chartData: [
        { x: "2021 game", y: 8 },
        { x: "2022 game", y: 5 },
      ],
    },
  ];

  dataProvider.forEach(({ data, chartData }) => {
    expect(getChartData(data)).toMatchObject(chartData);
  });
});
