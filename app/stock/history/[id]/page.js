"use client";
import React, { useState, useEffect } from "react";
import {
  useStockHistoryQuery,
  useDeleteStockMutation,
} from "../../../Features/Api/apiSlice";
import Spinner from "@/app/Components/common/Spinner";
import SiderBar from "@/app/Components/SiderBar";

export default function history({ params }) {
  const id = parseInt(params.id);
  const [ideDeleted, setIdeDeleted] = useState("");
  const [deleteStock, { data: deleteData, isSuccess: deletedIssuccess }] =
    useDeleteStockMutation();
  const { data, error, isLoading, isSuccess } = useStockHistoryQuery(id);
  const handleDelete = (stockID) => {
    setIdeDeleted(stockID);
    deleteStock({ id: stockID });
  };

  return (
    <React.Fragment>
      <SiderBar />
      <main className="py-10 lg:pl-72 flex items-stretch bg-grey-lighter min-h-screen">
        <div className="px-4 sm:px-6  lg:px-8 flex w-full">
          <div className="w-full flex flex-col">
            <h1 className="bg-indigo-500 text-white px-3 py-3 mb-5">History</h1>

            {isLoading && (
              <div className="w-full h-full flex items-center justify-center ">
                <Spinner />
              </div>
            )}
            {error && <div>Failed to load stock</div>}

            {deletedIssuccess && (
              <div className="flex w-full">Stock Deleted</div>
            )}
            <div className="flex items-center justify-center">
              <table class="table-fixed">
                <thead>
                  <tr>
                    <th className="py-3 px-4 border-2 border-indigo-200">
                      Item Name
                    </th>
                    <th className="py-3 px-4 border-2 border-indigo-200">
                      Stock Date
                    </th>
                    <th className="py-3 px-4 border-2 border-indigo-200">
                      Qnty IN
                    </th>
                    <th className="py-3 px-4  border-2 border-indigo-200">
                      {" "}
                      Qty Out
                    </th>
                    <th className="py-3 px-4  border-2 border-indigo-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map(
                    (stock) =>
                      stock.stockId != ideDeleted && (
                        <tr
                          className="boder boder-b-indigo-300"
                          key={stock.stockId}
                        >
                          <td className="py-3 px-4 ">{stock.itemName}</td>
                          <td className="py-3 px-4">{stock.stokeDate}</td>
                          <td className="py-3 px-4"> {stock.qtyIn}</td>
                          <td className="py-3 px-4">{stock.qtyMoved}</td>
                          <td className="py-3 px-4">
                            <span
                              className="bg-amber-700 py-2 px-4 border-2 rounded-md text-gray-300 hover:bg-red-700 cursor-pointer"
                              onClick={() => handleDelete(stock.stockId)}
                            >
                              delete
                            </span>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
            {isSuccess && data.length === 0 && (
              <div className="w-full h-full flex items-center justify-center">
                No stock found
              </div>
            )}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
