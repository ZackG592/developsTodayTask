"use client";

import api from "@/api/axios";
import QuestionBlock from "@/components/Question";
import { QuestionTypes } from "@/constants/QuestionTypes";
import { Answer } from "@/types/answer";
import { useEffect, useState } from "react";

interface QuizDetailsProps {
  params: { id: string };
}

interface QuestionData {
  answers: Answer[];
  question: string;
  type: QuestionTypes;
}

interface QuizData {
  id: string;
  title: string;
  ownerName: string;
}

export default function QuizDetails({ params }: QuizDetailsProps) {
  const [quizInfo, setQuizInfo] = useState<QuizData | null>(null);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`quizzes/${params.id}`);
        setQuizInfo(res.data.quizData);
        setQuestions(res.data.questionsData);
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [params.id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!quizInfo || !quizInfo.title)
    return <p className="text-center mt-20">Quiz not found</p>;

  return (
    <div className="w-[80%] mx-auto mt-20">
      <h1 className="text-2xl font-bold">{quizInfo.title}</h1>

      <div className="mt-5 pointer-events-none">
        {questions.map((question, index) => (
          <div className="mt-5" key={index}>
            <QuestionBlock
              question={question.question}
              answers={question.answers}
              questionType={question.type}
              changeCorrectCounter={setCorrectAnswers}
            />
          </div>
        ))}
      </div>

      <p className="mt-5 text-lg">
        Correct Answers: {correctAnswers} / {questions.length}
      </p>
    </div>
  );
}
