import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPlayground: true,
  showBitcoin: true,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setShowPlayground: (state, action) => {
      state.showPlayground = action.payload;
    },
    setShowBitcoin: (state, action) => {
      state.showBitcoin = action.payload;
    },
  },
});

export const { setShowPlayground, setShowBitcoin } = navSlice.actions;
export default navSlice.reducer;
