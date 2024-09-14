import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assets: [],
};

const AssetSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    addAssets: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { addAssets } = AssetSlice.actions;
export default AssetSlice.reducer;
