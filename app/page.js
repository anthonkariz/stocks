"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import Items from "./Components/Home/Items";
import Spinner from "./Components/common/Spinner";
import { useMoveinventoryMutation } from "./Features/Api/apiSlice";
import SiderBar from "./Components/SiderBar";
import { useRouter } from "next/navigation";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function Home() {
  const [selectItems, setSelectedItems] = useState({});
  const [quantity, setQuantity] = useState("");
  const [moveinventory, { isSuccess, isError, isLoading }] =
    useMoveinventoryMutation();
  const [userIfo, setUserIfo] = useState({
    role: "",
    name: "",
  });

  const router = useRouter();
  const clearAll = () => {
    setSelectedItems({});
    setQuantity("");
  };
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/Auth");
  };
  const send = () => {
    let payload = {
      user_id: 1,
      quantity: quantity,
      stockid: selectItems.stockID,
      items_id: selectItems.items_id,
    };
    moveinventory(payload);
    isSuccess && clearAll();
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/Auth");
      return;
    }
    let userType = JSON.parse(localStorage.getItem("token")).user;
    setUserIfo({
      role: userType.role,
      name: userType.name,
    });
  }, []);
  return (
    <React.Fragment>
      <SiderBar />
      <main className="py-10 lg:pl-72 flex items-stretch bg-grey-lighter min-h-screen">
        <div className="px-4 sm:px-6  lg:px-8 flex w-full">
          <div className="flex flex-col w-full">
            <h1 className="text-2xl font-bold mb-6 uppercase">
              {userIfo.name}
            </h1>
            <div className="flex  justify-start space-x-9 mb-6">
              <button
                className="border px-8 py-3 bg-red-400 text-white "
                onClick={() => logout()}
              >
                Logout
              </button>
              <button
                className="border px-8 py-3 bg-blue-400 text-white "
                onClick={() => clearAll()}
              >
                Clear All
              </button>
            </div>

            {Object.keys(selectItems).length !== 0 && (
              <div className="flex flex-col w-full items-center justify-center flex-wrap rounded-sm ">
                {selectItems.stockID && (
                  <div className="flex flex-col border border-indigo-700 rounded-sm p-6 mb-5 ">
                    <div className="">
                      <span className="text-lg  font-thin">ITEM: </span>
                      <span className="text-lg  font-bold uppercase">
                        {selectItems.itemName}
                      </span>
                    </div>
                    <div className="">
                      <span className="text-lg font-thin uppercase">
                        Quantity
                      </span>
                      <span className="text-lg font-bold uppercase">
                        {quantity}
                      </span>
                    </div>
                  </div>
                )}

                {selectItems.stockID && (
                  <div className="grid grid-cols-4 gap-2 ">
                    {numbers.map((num) => (
                      <div
                        key={num}
                        className={`border border-gray-300 p-3 w-28 font-bold cursor-pointer
              text-lg text-center hover:bg-indigo-600 hover:text-white ${
                num == quantity ? "bg-indigo-600 text-white" : ""
              }`}
                        onClick={() => setQuantity(num)}
                      >
                        {num}
                      </div>
                    ))}
                    <div
                      className="border border-gray-300 p-3 w-28 font-bold cursor-pointer
              text-lg text-center hover:bg-gray-500 hover:text-white"
                      onClick={() => setQuantity("")}
                    >
                      Clear
                    </div>
                    {quantity && (
                      <div
                        className="border border-gray-300 p-3 w-28 font-bold cursor-pointer
              text-lg text-center hover:bg-gray-500 hover:text-white"
                        onClick={() => send()}
                      >
                        Enter {isLoading && <Spinner />}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            <Items setSelectedItems={setSelectedItems} selected={selectItems} />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
