"use client";
import React, { useState, useEffect, use } from "react";
import { useLoginMutation } from "../Features/Api/apiSlice";
import Spinner from "../Components/common/Spinner";
import { redirect } from "next/navigation";
export default function Auth() {
  const [error, setError] = useState("");
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [login, { data, error: loginError, isLoading, isSuccess }] =
    useLoginMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginForm.username === "" || loginForm.password.length < 4) {
      setError(
        "All fields are required and password must be atleast 4 characters"
      );
      return;
    }
    setError("");
    login({
      email: loginForm.username.trim() + "@thatched.com",
      password: loginForm.password,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      redirect("/");
    }
  }, []);

  useEffect(() => {
    if (loginError) {
      setError("Invalid login credentials");
      return;
    }
    if (isSuccess) {
      localStorage.setItem("token", JSON.stringify(data.data));
      let userInfo = JSON.parse(localStorage.getItem("token"));
      console.log(JSON.parse(localStorage.getItem("token")).token);
      redirect("/");
    }
  }, [data, loginError, isSuccess]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {error && (
          <div className="mt-10 text-center text-sm leading-5 text-red-400 font-semibold">
            {error}
          </div>
        )}

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                UserName
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="username"
                  type="text"
                  required
                  autoComplete="off"
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, username: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="off"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  className="block  w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
