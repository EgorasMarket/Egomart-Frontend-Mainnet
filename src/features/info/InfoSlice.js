import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: undefined,
  curr_order_id: undefined,
};

const InfoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },

    setOrderId: (state, action) => {
      state.curr_order_id = action.payload;
    },
  },
});

export const { setAddress, setOrderId } = InfoSlice.actions;
export default InfoSlice.reducer;
