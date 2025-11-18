"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { registerUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    dispatch(registerUser({ email, password }));
    router.push("/login");
  };

  return (
    <div className="p-10 flex flex-col gap-4 max-w-[800px] mx-auto">
     

      <input
        className="input input-bordered bg-white text-black border p-2"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input input-bordered bg-white text-black border p-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white p-2 rounded"
      >
       Register
      </button>
    </div>
  );
}
