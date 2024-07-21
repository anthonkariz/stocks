"use client";
import { Provider } from "react-redux";
import { store } from "../app/Features/store.js";

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
