"use client";
import React, { useEffect, useState } from "react";
import { useAddItemMutation } from "@/app/Features/Api/apiSlice";
import SiderBar from "@/app/Components/SiderBar";

export default function add() {
  const [item, setItem] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [error, setError] = useState(null);

  const [addItem, { isSuccess, isError, data }] = useAddItemMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.name === "" || item.price === "" || item.quantity === "") {
      setError("Please fill all fields");
      return;
    }
    setError(null);
    addItem(item);
    setItem({
      name: "",
      price: "",
      quantity: "",
    });
  };

  return (
    <React.Fragment>
      <SiderBar />
      <main className="py-10 lg:pl-72 flex items-stretch bg-grey-lighter min-h-screen">
        <div className="px-4 sm:px-6  lg:px-8 flex w-full">
          <div className="flex flex-col w-full">
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

                <div className="flex flex-col mt-3">
                  <button className="bg-blue-500 text-white py-3 px-3">
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
