export const _priceChangeStyling = ({ pair }) => {
  //destructure thr pair
  console.log(pair?.open24h, pair?.close24h, pair, "loko");

  if (parseFloat(pair?.open24h) > parseFloat(pair?.close24h)) {
    return "#ff445d";
  }

  if (parseFloat(pair?.open24h) < parseFloat(pair?.close24h)) {
    return " #12b66f";
  }
  return "#fff";
};

export const _symbolChecker = ({ pair }) => {
  if (parseFloat(pair?.open24h) > parseFloat(pair?.close24h)) {
    return "";
  }

  if (parseFloat(pair?.open24h) < parseFloat(pair?.close24h)) {
    return "+";
  }
  return "";
};
