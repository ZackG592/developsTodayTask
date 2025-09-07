"use client";

import { useState } from "react";
import { QuestionTypes } from "@/constants/QuestionTypes";
import { Question } from "@/types/question";
import QuestionForm from "./forms/QuestionForm";
import COOKIE_NAMES from "@/constants/cookie_names";
import api from "@/api/axios";

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [validities, setValidities] = useState<boolean[]>([]);

  const getCookie = (name: string) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    if (match) return decodeURIComponent(match[2]);
    return "";
  };

  const addQuestion = () => {
    if (validities.some((v) => !v)) return;

    setQuestions([
      ...questions,
      {
        question: "",
        type: QuestionTypes.BOOLEAN,
        answers: [{ text: "", isCorrect: false }],
      },
    ]);
    setValidities([...validities, false]);
  };

  const updateQuestion = (index: number, question: Question) => {
    const newQuestions = [...questions];
    newQuestions[index] = question;
    setQuestions(newQuestions);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
    setValidities(validities.filter((_, i) => i !== index));
  };

  const updateValidity = (index: number, valid: boolean) => {
    const newValidities = [...validities];
    newValidities[index] = valid;
    setValidities(newValidities);
  };

  const saveQuiz = () => {
    const allValid = validities.every((v) => v);
    if (!allValid) {
      alert("Please fix invalid questions before saving!");
      return;
    }

    if (title.length === 0) {
      alert("TItle cant be nullable");
    }

    if (questions.length === 0) {
      alert("Quiz cant exists without questions");
    }

    const ownerName = getCookie(COOKIE_NAMES.USER_NAME);

    api.post("/quizzes", {
      quiz: {
        title: title,
        ownerName: ownerName || "Anonymous",
      },
      questions: {
        questions: questions,
      },
    });

    setQuestions([]);
    setValidities([]);
    setTitle("");
  };

  return (
    <div className="w-[80%] mx-auto mt-20">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Create Your Quiz</h1>
      </div>

      <div className="flex justify-center mb-5">
        <input
          type="text"
          placeholder="Title of quiz"
          className="w-full max-w-md border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-center">
        {questions.map((q, idx) => (
          <QuestionForm
            key={idx}
            question={q}
            onChange={(updated) => updateQuestion(idx, updated)}
            onRemove={() => removeQuestion(idx)}
            onValidChange={(valid) => updateValidity(idx, valid)}
          />
        ))}

        <button
          onClick={addQuestion}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
          disabled={validities.some((v) => !v)}
        >
          Add Question
        </button>

        <button
          className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={saveQuiz}
        >
          Save Quiz
        </button>
      </div>
    </div>
  );
}
