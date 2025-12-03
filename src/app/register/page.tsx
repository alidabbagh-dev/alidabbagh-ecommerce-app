"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);

    const user = { email, password };
    localStorage.setItem("fakeUser", JSON.stringify(user));
    document.cookie = "auth=true; path=/";

    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 700); // فقط برای دیدن اسپینر
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="p-10 flex flex-col gap-4 max-w-[800px] mx-auto">
        <input
          className="input input-bordered bg-white text-black border p-2"
          type="email"
          value={email}
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
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Loading..." : "Register"}
        </button>
      </div>
    </form>
  );
}
