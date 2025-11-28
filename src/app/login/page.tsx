
"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginUser, clearError } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, isAuthenticated, loading } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      if (document.cookie.includes("auth=true")) {
        router.push("/")
        
    }
    } catch (err) {
     
    }
  };

  return (
    <form onSubmit={e => e.preventDefault()}>
    <div className="p-10 flex flex-col gap-4 max-w-[800px] mx-auto">
      <input
        className="bg-white input input-bordered text-black border p-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="bg-white input input-bordered text-black border p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-green-500 text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? "Loading..." : "Login"}
      </button>
      </div>
      </form>
  );
}