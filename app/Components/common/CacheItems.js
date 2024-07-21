"use client";
import React from "react";

import { useGetstocksQuery } from "../../Features/Api/apiSlice";
const getItems = () => {
  let stocks = [];
  stocks = JSON.parse(localStorage.getItem("stocks"));
  if (!stocks) {
    JSON.parse(stocks);
    const { data, error, isLoading, isSuccess } = useGetstocksQuery();
    if (isSuccess) {
      localStorage.setItem("stocks", JSON.stringify(data));
      stocks = JSON.parse(localStorage.getItem("stocks"));
    }
  }

  return JSON.parse(localStorage.getItem("stocks"));
};

const items = getItems();

export { items };
