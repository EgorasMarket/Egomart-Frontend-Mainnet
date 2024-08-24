import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrders: (state, action) => {
      const newArr = [...action?.payload];
      newArr.sort((a, b) => {
        return new Date(b?.createdAt) - new Date(a?.createdAt);
      });
      state.orders = newArr;
    },
    updateOrder: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { addOrders, updateOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
