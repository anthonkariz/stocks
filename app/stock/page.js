"use client";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Spinner from "@/app/Components/common/Spinner";
import { useGetstocksQuery } from "../Features/Api/apiSlice";
import SiderBar from "@/app/Components/SiderBar";

export default function stock() {
  const [theFinal, setTheFinal] = useState([]);
  const { data, error, isLoading, isSuccess } = useGetstocksQuery();
  useEffect(() => {
    if (isSuccess) {
      console.log("inventory", data.inventory);
      console.log("stocks", data.stocks);
      let adds = [];
      data.stocks.map((item) => {
        let env = data.inventory.find((event) => event.ItemID == item.ItemID);
        if (typeof env != "undefined") {
          console.log("env", env.ItemID, "item", item.ItemID);
          adds.push({ ...item, qtyMoved: env.qtyMoved });
        } else {
          adds.push({ ...item, qtyMoved: 0 });
        }
      });

      console.log("adds", adds);
      setTheFinal(adds);
    }
  }, [data, isSuccess]);

  return (
    <React.Fragment>
      <SiderBar />
      <main className="py-10 lg:pl-72 flex items-stretch bg-grey-lighter min-h-screen">
        <div className="px-4 sm:px-6  lg:px-8 flex w-full">
          <div className="flex flex-col w-full">
            <div className="flex justify-end">
              <Link
                className="bg-blue-400 text-white px-2 py-1"
                href={`/stock/add`}
              >
                Add Stock
              </Link>
            </div>
            {isLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <Spinner />
              </div>
            )}
            <div className="justify-center items-center flex">
              <table className="w-1/2 table">
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>In Qnty</th>
                    <th>OUt QNTY</th>
                    <th>In Stock</th>
                    <th>Last Update</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isSuccess &&
                    theFinal?.map((stock) => (
                      <tr key={stock.ItemId}>
                        <td className="border border-spacing-1 py-2 px-2">
                          {stock.itemName}
                        </td>
                        <td className="border border-spacing-1 py-2 px-2">
                          {stock.qtyBal}
                        </td>
                        <td className="border border-spacing-1 py-2 px-2">
                          {stock.qtyMoved}
                        </td>
                        <td
                          className={`border border-spacing-1 py-2 px-2 ${
                            parseInt(stock.qtyBal) - parseInt(stock.qtyMoved) <
                            0
                              ? "bg-red-300 text-white"
                              : ""
                          } `}
                        >
                          {parseInt(stock.qtyBal) - parseInt(stock.qtyMoved)}
                        </td>
                        <td className="border border-spacing-1 py-2 px-2">
                          {stock.updated}
                        </td>
                        <td className="border border-spacing-1 py-2 px-2 flex justify-between">
                          <Link
                            className="bg-blue-400 text-white px-2 py-1"
                            href={`/items/edit/${stock.ItemID}`}
                          >
                            Edit
                          </Link>
                          <Link
                            className="bg-red-400 text-white px-2 py-1"
                            href={`/stock/history/${stock.ItemID}`}
                          >
                            Delete
                          </Link>
                          <Link
                            className="bg-green-500 text-white px-2 py-1"
                            href={`/stock/${stock.ItemID}`}
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
