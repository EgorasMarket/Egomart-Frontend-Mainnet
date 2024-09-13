import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deposit: [],
  withdrawal: [],
};

const PortfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},
});

export const {} = PortfolioSlice.actions;

export default PortfolioSlice.reducer;
