import { createSlice } from "@reduxjs/toolkit";

const genSlice = createSlice({
  name: "general",
  initialState: {
    items: [],
    moved: {},
  },

  reducers: {
    addItems: (state, action) => {
      state.items = action.payload;
    },
    moved: (state, action) => {
      state.moved = action.payload;
    },
  },
});

export const { addItems, clearCats } = genSlice.actions;
export default genSlice.reducer;
