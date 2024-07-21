"use client";
import React from "react";
import {
  useGetItemsQuery,
  useItemDeleteMutation,
} from "../Features/Api/apiSlice";
import Spinner from "@/app/Components/common/Spinner";

import Link from "next/link";
import SiderBar from "../Components/SiderBar";

export default function add() {
  const { isLoading, data, isSuccess, isError } = useGetItemsQuery();
  const [deleteItem] = useItemDeleteMutation();

  return (
    <React.Fragment>
      <SiderBar />
      <main className="py-10 lg:pl-72 flex items-stretch bg-grey-lighter min-h-screen">
        <div className="px-4 sm:px-6  lg:px-8 flex w-full">
          <div className="flex flex-col w-full">
            <h1>Add Items</h1>
            <div className="flex w-full items-center justify-center flex-col">
              <div className="flex mb-5">
                <Link
                  href={`/items/add`}
                  className="bg-white hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                >
                  Add New
                </Link>
              </div>
              <table className="w-1/2 table-fixed">
                <thead>
                  <tr>
                    <th className="border-separate border-spacing-2 border border-slate-400">
                      Item Name
                    </th>
                    <th className="border-separate border-spacing-2 border border-slate-400">
                      price
                    </th>
                    <th className="border-separate border-spacing-2 border border-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isSuccess &&
                    data.map((item) => {
                      return (
                        <tr key={item.id} className="even:bg-gray-100">
                          <td className="border-separate pl-2 border-spacing-2 py-2 border border-slate-400">
                            {item.itemName}
                          </td>
                          <td className="border-separate pl-2 border-spacing-2 py-2 border border-slate-400">
                            £{item.price}
                          </td>
                          <td className="border-separate pl-2 border-spacing-2 py-2 px-2 border border-slate-400 flex justify-between">
                            <Link
                              href={`items/edit/${item.items_id}`}
                              className="border-b-2 border-dashed border-gray-600 text-blue-700 hover:font-bold"
                            >
                              Edit
                            </Link>
                            <span
                              className="border-b-2 border-dashed border-red-500 hover:font-bold hover:text-red-500 cursor-pointer"
                              onClick={() => deleteItem({ id: item.items_id })}
                            >
                              Delete
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {isLoading && (
                <div className="w-full h-full flex items-center justify-center">
                  <Spinner />
                </div>
              )}
              {isSuccess && data.length < 1 && (
                <div className="w-full h-full flex items-center justify-center">
                  No items found Please add some
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
