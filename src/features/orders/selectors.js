import { createSelector } from "@reduxjs/toolkit";

const selectOrders = (state) => state.orders.orders;

export const selectMatchingOrder = createSelector(
  [selectOrders, (state, searchData) => searchData],
  (orders, searchData) =>
    orders.find(
      (order) =>
        order.indexId === searchData.orderId && order.price === searchData.price
    )
);

//   order.ticker === searchData.ticker &&

//   order.type === searchData.type &&

//    (order.address === searchData.type) === "BUY"
// ? searchData.buyer
// : searchData.seller
