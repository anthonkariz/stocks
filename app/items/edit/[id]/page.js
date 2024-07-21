"use client";
import React, { useEffect, useState } from "react";
import Spinner from "@/app/Components/common/Spinner";
import {
  useEditItemMutation,
  useGetItemsQuery,
} from "@/app/Features/Api/apiSlice";
import SiderBar from "@/app/Components/SiderBar";

export default function add({ params }) {
  const theid = parseInt(params.id);
  const [item, setItem] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [error, setError] = useState(null);

  const [editItem, { isSuccess, isError, isLoading }] = useEditItemMutation();
  const {
    data: ddata,
    isSuccess: disSuccess,
    isError: disError,
    isLoading: disLoading,
  } = useGetItemsQuery();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.itemName === "" || item.price === "" || item.quantity === "") {
      setError("Please fill all fields");
      return;
    }
    setError(null);
    editItem({
      name: item.itemName,
      id: theid,
      price: item.price,
      quantity: item.quantity,
    });
  };

  useEffect(() => {
    if (disSuccess) {
      const sortedData = ddata.find((item) => item.items_id === theid);
      console.log(sortedData);
      setItem({
        name: sortedData.itemName,
        price: sortedData.price,
        quantity: sortedData.quantity,
      });
    }
  }, [ddata, disSuccess, disError]);

  return (
    <React.Fragment>
      <SiderBar />
      <main className="py-10 lg:pl-72 flex items-stretch bg-grey-lighter min-h-screen">
        <div className="px-4 sm:px-6  lg:px-8 flex w-full">
          <div className="w-full h-full ">
            <h1>Add Items</h1>
            <div className="flex w-full items-center justify-center h-full">
              <form
                className="flex flex-col gap-2 w-1/2"
                onSubmit={handleSubmit}
              >
                {isError && (
                  <div className="text-red-500">
                    Failed to add item check if it exist
                  </div>
                )}
                {error && <div className="text-red-500">{error}</div>}
                <div className="flex flex-col">
                  <label className="">Name</label>
                  <input
                    value={item.name}
                    type="text"
                    name="name"
                    onChange={(e) => setItem({ ...item, name: e.target.value })}
                    className="bg-gray-200 py-2 px-2 rounded-lg border-3 border-gray-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="">Price</label>
                  <input
                    value={item.price}
                    type="number"
                    name="price"
                    onChange={(e) =>
                      setItem({ ...item, price: e.target.value })
                    }
                    className="bg-gray-200 py-2 px-2 rounded-lg border-3 border-gray-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="">Quantity</label>
                  <input
                    value={item.quantity}
                    type="number"
                    name="quantity"
                    onChange={(e) =>
                      setItem({ ...item, quantity: e.target.value })
                    }
                    className="bg-gray-200 py-2 px-2 rounded-lg border-3 border-gray-500"
                  />
                </div>

                <button
                  type="submit"
                  className=" inline-block rounded bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white
               shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 
               focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 disabled:opacity-70
                dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong cursor-pointer"
                >
                  {isLoading && (
                    <>
                      <Spinner /> <span>Updating Please Wait..</span>{" "}
                    </>
                  )}
                  {disLoading && (
                    <>
                      <Spinner /> <span>Loading Please Wait..</span>{" "}
                    </>
                  )}
                  {disSuccess && "Update"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
