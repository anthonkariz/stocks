"use client";
import { useGetAllEmployeeQuery } from "../Features/Api/apiSlice";
import Link from "next/link";
export default function employee() {
  const { isLoading, data, isSuccess, isError } = useGetAllEmployeeQuery();
  return (
    <div className="flex flex-col w-full">
      <div className="bg-slate-300 py-2 px-2">
        <h1>Employee</h1>
      </div>
      <div className="flex justify-end mt-5">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link href="employee/addnew">Add New</Link>
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
                    <td className="border px-4 py-2">{employee.name}</td>
                    <td className="border px-4 py-2">{employee.role}</td>
                    <td className="border px-4 py-2 gap-2 flex">
                      <Link
                        href={`/users/edit/${employee.id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </Link>
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        View
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
