"use client";

import api from "@/api/axios";
import API_PATHS from "@/constants/api_paths";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Quizzes {
  _count: {
    questions: number;
  };
  id: string;
  title: string;
}

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState<Quizzes[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await api.get(API_PATHS.quizzes.base);
        setQuizzes(response.data);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;

    try {
      await api.delete(`${API_PATHS.quizzes.base}/${id}`);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    } catch (error) {
      console.error("Failed to delete quiz:", error);
      alert("Failed to delete quiz.");
    }
  };

  return (
    <div className="pt-20">
      <h1 className="text-center text-2xl font-bold mb-4">All Quizzes</h1>
      {quizzes.length > 0 ? (
        <ul className="space-y-4">
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <div className="flex justify-between items-center border p-4 rounded max-w-[560px] mx-auto hover:bg-gray-50 transition">
                <Link href={`/quizzes/${quiz.id}`}>
                  <span className="cursor-pointer">
                    {quiz.title} | Questions: {quiz._count.questions}
                  </span>
                </Link>
                <button
                  onClick={() => handleDelete(quiz.id)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No quizzes found.</p>
      )}
    </div>
  );
}
