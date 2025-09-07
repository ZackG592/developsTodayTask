import { Dispatch, SetStateAction, useState } from "react";
import { Answer } from "@/types/answer";

interface CheckboxQuestionProps {
  question: string;
  answers: Answer[];
  changeCorrectCounter: Dispatch<SetStateAction<number>>;
}

export default function CheckboxQuestion({
  question,
  answers,
  changeCorrectCounter,
}: CheckboxQuestionProps) {
  const [selected, setSelected] = useState<boolean[]>(answers.map(() => false));
  const [accepted, setAccepted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const toggle = (index: number) => {
    const newSelected = [...selected];
    newSelected[index] = !newSelected[index];
    setSelected(newSelected);
  };

  const acceptAnswer = () => {
    const correctAnswers = answers.map((a) => a.isCorrect);
    const allCorrect = selected.every(
      (val, idx) => val === correctAnswers[idx]
    );
    if (allCorrect && !isCorrect) {
      setIsCorrect(true);
      changeCorrectCounter(1);
    } else if (!allCorrect && isCorrect) {
      setIsCorrect(false);
      changeCorrectCounter(-1);
    }
    setAccepted(true);
  };

  return (
    <div className="flex flex-col gap-2 mb-4 p-2 border rounded-md">
      <h3 className="font-semibold">{question}</h3>
      {answers.map((answer, idx) => (
        <label key={idx} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selected[idx]}
            onChange={() => toggle(idx)}
          />
          <span>{answer.text}</span>
        </label>
      ))}
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
