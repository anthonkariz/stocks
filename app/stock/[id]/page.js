"use client";
import React, { useState, useEffect } from "react";
import { useInventoryByIDQuery } from "../../Features/Api/apiSlice";
import Spinner from "@/app/Components/common/Spinner";
import SiderBar from "@/app/Components/SiderBar";

export default function Edit({ params }) {
  const id = parseInt(params.id);
  const [counts, setCounts] = useState({
    qtyIn: 0,
    qtyOut: 0,
    instock: 0,
  });

  const { data, error, isLoading, isSuccess } = useInventoryByIDQuery(id);

  useEffect(() => {
    if (isSuccess) {
      const key = "stockId";
      const unique = [
        ...new Map(data.map((item) => [item[key], item])).values(),
      ];
      setCounts({
        ...counts,
        qtyOut: parseInt(data?.reduce((acc, curr) => acc + curr.qtyMoved, 0)),
        qtyIn: parseInt(unique?.reduce((acc, curr) => acc + curr.qtyIn, 0)),
        instock:
          parseInt(unique?.reduce((acc, curr) => acc + curr.qtyIn, 0)) -
          parseInt(data?.reduce((acc, curr) => acc + curr.qtyMoved, 0)),
      });
    }

    //
  }, [data, isSuccess]);

  return (
    <React.Fragment>
      <SiderBar />
      <main className="py-10 lg:pl-72 flex items-stretch bg-grey-lighter min-h-screen">
        <div className="px-4 sm:px-6  lg:px-8 flex w-full">
          <div className="w-full">
            <h1>Edit Stock</h1>

            {isLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <Spinner />
              </div>
            )}
            {error && <div>Failed to load stock</div>}
            <div className="flex items-center justify-center">
              <table class="table-fixed">
                <thead>
                  <tr>
                    <th className="py-3 px-4 border-2 border-indigo-200">
                      Moved By
                    </th>
                    <th className="py-3 px-4 border-2 border-indigo-200">
                      Moved ON
                    </th>
                    <th className="py-3 px-4 border-2 border-indigo-200">
                      Stock Date
                    </th>
                    <th className="py-3 px-4 border-2 border-indigo-200">
                      Item
                    </th>
                    <th className="py-3 px-4  border-2 border-indigo-200">
                      Qty Moved
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((stock) => (
                    <tr className="boder boder-b-indigo-300">
                      <td className="py-3 px-4 ">{stock.name}</td>
                      <td className="py-3 px-4">{stock.moved}</td>
                      <td className="py-3 px-4"> {stock.stokeDate}</td>
                      <td className="py-3 px-4">{stock.itemName}</td>
                      <td className="py-3 px-4">{stock.qtyMoved}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="font-bold tracking-wide" colSpan="4">
                      QNTY IN
                    </td>
                    <td className="font-bold tracking-wide">{counts.qtyIn}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-lg" colSpan="4">
                      QTY OUT
                    </td>
                    <td className="font-bold tracking-wide">{counts.qtyOut}</td>
                  </tr>

                  <tr>
                    <td className="font-bold tracking-wide" colSpan="4">
                      IN STOCK
                    </td>
                    <td className="font-bold tracking-wide">
                      {counts.instock}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
