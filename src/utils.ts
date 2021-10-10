import { AddError } from "./types";

const validateAddForm = (
  address: string,
  suburb: string,
  state: string,
  price: string,
  description: string
): AddError[] => {
  const errors = [];

  if (!address) errors.push("address");
  if (!suburb) errors.push("suburb");
  if (!state) errors.push("state");
  if (!price || isNaN(+price)) errors.push("price");
  if (!description) errors.push("description");

  return errors;
};

export { validateAddForm };
