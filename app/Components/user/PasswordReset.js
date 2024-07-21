import React, { useEffect, useState } from "react";
import { useUpdatePasswordMutation } from "@/app/Features/Api/apiSlice";

export default function PasswordReset({ theid }) {
  const [password, setPasword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setErros] = useState(null);

  const [
    updatePassword,
    { data: pdata, isSuccess: pisSuccess, isError: pisError },
  ] = useUpdatePasswordMutation();
  const passwordChange = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErros("Password do not match ee");
      return;
    }
    if (password.length < 6) {
      setErros("Password must be at least 6 characters");
      return;
    }
    setErros(null);
    console.log(password, theid);
    updatePassword({ password: password, id: theid });
  };
  return (
    <div className="">
      <h1 className="my-4">Change Password</h1>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={passwordChange}>
        <div className="flex flex-col">
          <label className="">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPasword(() => e.target.value)}
            className="bg-gray-200 py-2 px-2 rounded-lg border-3 border-gray-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Password Confirm</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(() => e.target.value)}
            className="bg-gray-200 py-2 px-2 rounded-lg border-3 border-gray-500"
          />
        </div>
        <div className="flex flex-col mt-3">
          <button className="bg-blue-500 text-white py-3 px-3">
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
