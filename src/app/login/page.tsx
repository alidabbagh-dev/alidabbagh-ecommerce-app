"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, isAuthenticated } = useAppSelector((s) => s.auth);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  if (isAuthenticated) router.push("/");

  return (
    <div className="p-10 flex flex-col gap-4">
      <input
        className="input input-bordered border p-2"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        
        
      />

      <input
        className="input input-bordered border p-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleLogin}
        className="bg-green-500 text-white p-2 rounded"
      >
      Login
      </button>
    </div>
  );
}
