"use client";
import React, { use, useEffect, useState } from "react";
import Ribon from "@/app/Components/Ribon";
import PasswordReset from "@/app/Components/user/PasswordReset";
import SiderBar from "@/app/Components/SiderBar";
import {
  useGetAllEmployeeQuery,
  useUpdateEmployeeMutation,
} from "@/app/Features/Api/apiSlice";
import { set } from "react-hook-form";

export default function addUser({ params }) {
  const theid = parseInt(params.id);

  const { isLoading, data, isSuccess, isError } = useGetAllEmployeeQuery();
  const [
    updateEmployee,
    { data: adata, isSuccess: aisSuccess, isError: aisError },
  ] = useUpdateEmployeeMutation();
  const [name, setName] = useState("");
  const [error, setErros] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (isSuccess) {
      const sortedData = data.find((item) => item.id === theid);

      setName(sortedData.name);
      setRole(sortedData.role);
    }
  }, [data, isSuccess, isError]);

  useEffect(() => {
    if (aisError) {
      setErros("An error occured check username is not taken");
    }
  }, [aisSuccess, adata, aisError]);

  const handleSubmit = () => {
    if (name === "") {
      setErros("Name is required");
      return;
    }

    setErros(null);
    const user = { name, role, id: theid, email: name + "@thatched.com" };
    updateEmployee(user);
  };
  return (
    <React.Fragment>
      <SiderBar />
      <main className="py-10 lg:pl-72 flex items-stretch bg-grey-lighter min-h-screen">
        <div className="px-4 sm:px-6  lg:px-8 flex w-full">
          <div className="flex w-full  items-center justify-center ">
            <div className="flex flex-col w-1/2 gap-6">
              {error && <div className="text-red-500">{error}</div>}
              <div className="w-1/2">
                <h1 className="my-4">Update User Details</h1>

                {aisSuccess && (
                  <div className="text-green-300">
                    User Created successfully{" "}
                  </div>
                )}
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <label className="">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-200 py-2 px-2 rounded-lg border-3 border-gray-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-slate-800 font-bold mt-2">
                      Role
                    </label>
                    <select
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="bg-gray-200 py-2 px-2 rounded-lg border-3 border-gray-500"
                    >
                      <option defaultValue={role}>{role}</option>
                      <option value="Staff">staff</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex flex-col mt-3">
                    <button
                      className="bg-blue-500 text-white py-3 px-3"
                      onClick={handleSubmit}
                    >
                      Add User
                    </button>
                  </div>
                </div>
              </div>
              <PasswordReset theid={theid} />
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
