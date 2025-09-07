"use client";

import { useState } from "react";
import PUBLIC_PATHS from "@/constants/public_paths";
import Link from "next/link";
import api from "@/api/axios";
import PROTECTED_PATHS from "@/constants/protected_paths";

export default function SignUp() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (!name.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await api.post(`/auth/sign-up/${encodeURIComponent(name)}`);
      if (res.status === 201 || res.status === 200) {
        window.location.href = PROTECTED_PATHS.quizzes.base;
      } else {
        setError("Failed to create account");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[80%] mt-20 mx-auto">
      <div className="mt-20 text-center">
        <h1 className="text-2xl">Sign up!</h1>

        <div className="mt-20 flex justify-center gap-2">
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </div>

        {error && <p className="mt-2 text-red-500">{error}</p>}

        <p className="mt-20 underline text-xs">
          <Link href={PUBLIC_PATHS.signIn}>
            Already have an account? Sign in!
          </Link>
        </p>
      </div>
    </div>
  );
}
