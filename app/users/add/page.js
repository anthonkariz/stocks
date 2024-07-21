"use client";
import React, { useEffect, useState } from "react";
import Ribon from "../../Components/Ribon";
import { useAddEmployeeMutation } from "../../Features/Api/apiSlice";
import SiderBar from "../../Components/SiderBar";

export default function addUser() {
  const [error, setErros] = useState(null);
  const [formData, setForm] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    role: "staff",
  });

  const handleChange = (e) => {
    setForm({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [addEmployee, { data, isSuccess, isError }] = useAddEmployeeMutation();
  const handleSubmit = () => {
    if (formData.name === "") {
      setErros("Name is required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErros("Password do not match");
      return;
    }
    if (formData.password.length < 6) {
      setErros("Password must be at least 6 characters");
      return;
    }

    if (formData.name.trim().split(" ").length > 1) {
      setErros("Name must be a single word");
      return;
    }

    setErros(null);
    formData.email = formData.name.trim() + "@thatched.com";

    addEmployee(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      setErros("An error occured check username is not taken");
    }
  }, [isSuccess, data, isError]);
  return (
    <React.Fragment>
      <SiderBar />
      <main className="py-10 lg:pl-72 flex items-stretch bg-grey-lighter min-h-screen">
        <div className="px-4 sm:px-6  lg:px-8 flex w-full">
          <div className="flex w-full ">
            <div className="flex w-full items-center justify-center">
              <div className=" w-1/2 ">
                {error && <div className="text-red-500">{error}</div>}
                {isSuccess && (
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
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-200 py-2 px-2 rounded-lg border-3 border-gray-500"
                    />
                  </div>
                  <div className="flex flex-col mt-3">
                    <label className="text-slate-800 font-bold">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-gray-200 py-2 px-2 rounded-lg border-3 border-gray-500"
                    />
                  </div>
                  <div className="flex flex-col mt-2">
                    <label className="text-slate-800 font-bold">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="bg-gray-200 py-2 px-2 rounded-lg border-3 border-gray-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-slate-800 font-bold mt-2">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="bg-gray-200 py-2 px-2 rounded-lg border-3 border-gray-500"
                    >
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
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
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
