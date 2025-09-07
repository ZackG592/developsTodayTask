import { Answer } from "@/types/answer";
import { Dispatch, SetStateAction, useRef, useState } from "react";

interface InputQuestionProps {
  question: string;
  correctAnswer: Answer;
  changeCorrectCounter: Dispatch<SetStateAction<number>>;
}

export default function InputQuestion({
  question,
  correctAnswer,
  changeCorrectCounter,
}: InputQuestionProps) {
  const [inputValue, setInputValue] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const acceptAnswer = () => {
    const correct = inputValue.trim() === correctAnswer.text.trim();

    if (correct && !isCorrect) {
      setIsCorrect(true);
      changeCorrectCounter(1);
    } else if (!correct && isCorrect) {
      setIsCorrect(false);
      changeCorrectCounter(-1);
    }

    setIsCorrect(correct);
    setAccepted(true);
  };

  return (
    <div className="flex flex-col gap-2 mb-4 p-2 border rounded-md">
      <h3 className="font-semibold">{question}</h3>

      <input
        type="text"
        placeholder="Your answer"
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button
        onClick={acceptAnswer}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition mt-2"
      >
        Accept
      </button>

      {accepted && (
        <span
          className={`mt-1 font-semibold ${
            isCorrect ? "text-green-600" : "text-red-600"
          }`}
        >
          {isCorrect ? "Correct!" : "Incorrect!"}
        </span>
      )}
    </div>
  );
}
