import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiCalls } from "./Api/apiSlice.js";
import genSlice from "./Api/genSlice";
export const store = configureStore({
  reducer: {
    [apiCalls.reducerPath]: apiCalls.reducer,
    general: genSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiCalls.middleware),
});
setupListeners(store.dispatch);
