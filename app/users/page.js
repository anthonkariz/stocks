"use client";

import Spinner from "../Components/common/Spinner";
import SiderBar from "../Components/SiderBar";
import React from "react";
import {
  useGetAllEmployeeQuery,
  useUserDeleteMutation,
} from "../Features/Api/apiSlice";
import Link from "next/link";
export default function employee() {
  const { isLoading, data, isSuccess, isError } = useGetAllEmployeeQuery();
  const [deleteUser, { isSuccess: deleteSuccess, isLoading: deleteIsloading }] =
    useUserDeleteMutation();
  const handleDelete = (id) => {
    deleteUser({ id: id });
  };
  return (
    <React.Fragment>
      <SiderBar />
      <main className="py-10 lg:pl-72 flex items-stretch bg-grey-lighter min-h-screen">
        <div className="px-4 sm:px-6  lg:px-8 flex w-full">
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
              <div className="bg-slate-300 py-2 px-2">
                <h1>Employee</h1>
              </div>
              <div className="flex justify-end mt-5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <Link href="users/add">Add New</Link>
                </button>
              </div>
              <div className="mt-5  items-center justify-center flex">
                <table className="table-auto w-1/2">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">name</th>
                      <th className="border px-4 py-2">Role</th>
                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && (
                      <tr>
                        <td colSpan={5} className="text-center py-4 text-lg">
                          Loading...
                        </td>
                      </tr>
                    )}
                    {isError && (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-4 text-lg font-bold text-red-600"
                        >
                          Error
                        </td>
                      </tr>
                    )}
                    {isSuccess &&
                      data.map((employee) => {
                        return (
                          <tr key={employee.id}>
                            <td className="border px-4 py-2">
                              {employee.name}
                            </td>
                            <td className="border px-4 py-2">
                              {employee.role}
                            </td>
                            <td className="border px-4 py-2 gap-2 flex">
                              <Link
                                href={`/users/edit/${employee.id}`}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              >
                                Edit
                              </Link>
                              <Link
                                href={`/users/edit/${employee.id}`}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                              >
                                View
                              </Link>
                              <span
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                                onClick={() => handleDelete(employee.id)}
                              >
                                Delete
                                {deleteIsloading && <Spinner />}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
