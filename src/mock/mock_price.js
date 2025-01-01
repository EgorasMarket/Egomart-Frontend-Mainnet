import { parseEther } from "ethers";

const orders = [
  {
    id: 337,
    index_id: 0,
    uniqueOrderID: 39,
    state: "OPEN",
    userAddress: "0x8284A8F3A7cAF4718F0Ce9B072a8876E5083D9fb",
    ticker: "EPR-EGOD",
    orderType: "SELL",
    amount: "22000.000000000000000000000000000000",
    numberOfShares: "0.200000000000000000000000000000",
    filled: "0.000360000000000000022672835831",
    transHash:
      "0x88bdaa06549199937651e93933698e9c92a08c7c763eba38235ce236f960eea9",
    timePlaced: "2024-10-10T05:08:04.000Z",
    createdAt: "2024-10-10T05:08:11.000Z",
    updatedAt: "2024-10-10T05:08:11.000Z",
  },

  {
    id: 339,
    index_id: 0,
    uniqueOrderID: 41,
    state: "COMPLETED",
    userAddress: "0x8284A8F3A7cAF4718F0Ce9B072a8876E5083D9fb",
    ticker: "EPR-EGOD",
    orderType: "SELL",
    amount: "2300.000000000000000000000000000000",
    numberOfShares: "0.197803278688524590000000000000",
    filled: "0.176663977191731946000000000000",
    transHash:
      "0x872d578bc6b57b817146840e8d3d67049f4f3f63e06b5a725bd42771e8844a13",
    timePlaced: "2024-10-10T05:09:21.000Z",
    createdAt: "2024-10-10T05:09:27.000Z",
    updatedAt: "2024-10-19T14:57:11.000Z",
  },
];

const ticker = "EPR-EGOD";
function test() {
  let newOrder = orders
    .filter(
      (data) =>
        data.ticker === ticker &&
        data.state === "OPEN" &&
        data.orderType === "SELL"
    )
    .sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
  //   console.log(newOrder);

  let budget = 1000; // EGOD
  let totalShares = 0; // To track how many shares you can afford

  //   console.log(newOrder);

  //   newOrder.forEach((order) => {
  for (const order of newOrder) {
    // const pricePerShare =
    //   parseFloat(order.amount) / parseFloat(order.numberOfShares);

    const pricePerShare =
      parseFloat(order.amount) *
      (parseFloat(order.numberOfShares) - parseFloat(order?.filled));

    const remainingShares =
      parseFloat(order.numberOfShares) - parseFloat(order.filled);
    const costForRemainingShares = remainingShares * pricePerShare;
    console.log(
      "pps",
      pricePerShare,
      "rs",
      remainingShares,
      "cfrs",
      costForRemainingShares,
      "budget",
      budget
    );

    if (budget === 0) {
      break;
      console.log("hh");
    }
    if (budget >= pricePerShare) {
      // Buy all remaining shares in this order
      totalShares += remainingShares;

      budget -= pricePerShare;
    } else {
      // Buy as many shares as budget allows
      const affordableShares = budget / pricePerShare;
      //   totalShares += affordableShares;
      totalShares += affordableShares;
      budget = 0; // Budget is exhausted
    }

    console.log(`Total shares you can buy: ${totalShares}`);
  }
}
test();
