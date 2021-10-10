export enum State {
  ACT = "ACT",
  NSW = "NSW",
  NT = "NT",
  VIC = "VIC",
  WA = "WA",
}

export const apiUrl = "http://localhost:3001";

export type AddError = string;

export enum PricePoint {
  AboveAverage = "AboveAverage",
  EqualAverage = "Average",
  BelowAverage = "BelowAverage",
}

export type PropertyResult = {
  address: string;
  suburb: string;
  state: string;
  price: string;
  description: string;
  pricePoint: PricePoint;
};
