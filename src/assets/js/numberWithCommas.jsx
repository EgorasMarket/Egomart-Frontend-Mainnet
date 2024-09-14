import React from "react";
import { NumericFormat } from "react-number-format";
// import

export const numberWithCommas = (x) => {
  return (
    <NumericFormat value={x} displayType="text" thousandSeparator={true} />
  );
};

export const colors = {
  light: {
    primary: "#000",
  },
  dark: {
    primary: "#eee",
  },
};
