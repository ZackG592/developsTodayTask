import { Dispatch, SetStateAction, useState } from "react";

interface BooleanQuestionProps {
  question: string;
  correctAnswer: boolean;
  changeCorrectCounter: Dispatch<SetStateAction<number>>;
}

export default function BooleanQuestion({
  question,
  correctAnswer,
  changeCorrectCounter,
}: BooleanQuestionProps) {
  const [checked, setChecked] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const acceptAnswer = () => {
    if (checked === correctAnswer && !isCorrect) {
      setIsCorrect(true);
      changeCorrectCounter(1);
    } else if (checked !== correctAnswer && isCorrect) {
      setIsCorrect(false);
      changeCorrectCounter(-1);
    }
    setAccepted(true);
  };

  return (
    <div className="flex flex-col gap-2 mb-4 p-2 border rounded-md">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold ">{question}</h3>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
        />
      </div>
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
