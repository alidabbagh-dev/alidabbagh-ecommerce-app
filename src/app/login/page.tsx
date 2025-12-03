"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (document.cookie.includes("auth=true")) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const saved = localStorage.getItem("fakeUser");

      if (!saved) {
        setError("No User Has Been Registered");
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(saved);

      if (parsed.email === email && parsed.password === password) {
        document.cookie = "auth=true; path=/";
        router.push("/");
      } else {
        setError("Email Or Password Is Wrong");
      }
    } catch {
      setError("Something Went Wrong");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
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
          className="bg-green-500 text-white p-2 rounded disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </form>
  );
}
