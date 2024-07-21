"use client";
import React from "react";
import { useGetItemsQuery } from "@/app/Features/Api/apiSlice";

import Link from "next/link";

export default function Items({ setSelectedItems, selected }) {
  const { isLoading, data, isSuccess, isError } = useGetItemsQuery();
  const selectedID = selected.items_id;

  return (
    <div className="w-full">
      <div className="grid grid-cols-6 ">
        {isSuccess &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                className={`p-2 flex border my-3 mx-2  border-slate-400  rounded-md cursor-pointer
                    ${
                      selectedID == item.items_id && item.stockID != null
                        ? "bg-indigo-700 text-white cursor-pointer"
                        : "cursor-pointer"
                    }${
                  item.stockID == null
                    ? "bg-slate-300 text-gray-300 cursor-not-allowed"
                    : "cursor-pointer"
                } `}
                onClick={() => setSelectedItems(item)}
              >
                {item.itemName} {item.items_id} - {item.stockID}
              </div>
            );
          })}
      </div>
    </div>
  );
}
