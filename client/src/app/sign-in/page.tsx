"use client";

import { useState } from "react";
import PUBLIC_PATHS from "@/constants/public_paths";
import PROTECTED_PATHS from "@/constants/protected_paths";
import Link from "next/link";
import api from "@/api/axios";
import Cookies from "js-cookie";

export default function SignIn() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!name.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await api.post(`/auth/sign-in/${encodeURIComponent(name)}`);

      if (res.status) {
        Cookies.set("name", name, { expires: 7, path: "/" });

        window.location.href = PROTECTED_PATHS.quizzes.base;
      } else {
        setError("Failed to sign in");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[80%] mx-auto">
      <div className="mt-20 text-center">
        <h1 className="text-2xl">Enter now</h1>

        <div className="mt-20 flex justify-center items-center gap-2">
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? "Entering..." : "Enter"}
          </button>
        </div>

        {error && <p className="mt-2 text-red-500">{error}</p>}

        <p className="underline mt-10 text-xs cursor-pointer">
          <Link href={PUBLIC_PATHS.signUp}>
            Don't have an account yet? Create!
          </Link>
        </p>
      </div>
    </div>
  );
}
