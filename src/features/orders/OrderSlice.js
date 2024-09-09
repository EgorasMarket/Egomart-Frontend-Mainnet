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
    updateArr: (state, action) => {
      // const newArr = [...action?.payload];
      // newArr.sort((a, b) => {
      //   return new Date(b?.createdAt) - new Date(a?.createdAt);
      // });
      // state.orders = newArr;
    },
    updateOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },

    updateOne: (state, action) => {
      const { id, newData } = action.payload;

      const orderIndex = state.orders.findIndex((order) => order.id === id);

      if (orderIndex !== -1) {
        // Update the specific order
        state.orders[orderIndex] = {
          ...newData,
        };
      }
    },
    cancelOne: (state, action) => {
      const { id, newData } = action.payload;

      const orderIndex = state.orders.findIndex((order) => order.id === id);

      if (orderIndex !== -1) {
        // Update the specific order
        state.orders[orderIndex] = {
          ...state.orders[orderIndex],
          status: "CANCELLED",
        };
      }
    },
  },
});

export const { addOrders, updateOrder, updateArr, updateOne, cancelOne } =
  OrderSlice.actions;
export default OrderSlice.reducer;
