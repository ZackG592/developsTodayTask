"use client";

import { useState, useEffect } from "react";
import { Question } from "@/types/question";
import { QuestionTypes } from "@/constants/QuestionTypes";
import { Answer } from "@/types/answer";

interface Props {
  question: Question;
  onChange: (q: Question) => void;
  onRemove: () => void;
  onValidChange: (valid: boolean) => void;
}

export default function QuestionForm({
  question,
  onChange,
  onRemove,
  onValidChange,
}: Props) {
  const [localQuestion, setLocalQuestion] = useState<Question>(question);

  const isValid = () => {
    if (!localQuestion.question.trim()) return false;

    if (localQuestion.type === QuestionTypes.BOOLEAN) {
      return localQuestion.answers.length > 0;
    }

    if (localQuestion.type === QuestionTypes.INPUT) {
      if (!localQuestion.answers[0]?.text.trim()) return false;
    }

    if (localQuestion.type === QuestionTypes.CHECKBOX) {
      if (!localQuestion.answers.some((a) => a.isCorrect)) return false;
      if (localQuestion.answers.some((a) => !a.text.trim())) return false;
    }

    return true;
  };

  useEffect(() => {
    onValidChange(isValid());
    onChange(localQuestion);
  }, [localQuestion]);

  const updateAnswer = (index: number, answer: Answer) => {
    const updated = [...localQuestion.answers];
    updated[index] = answer;
    setLocalQuestion({ ...localQuestion, answers: updated });
  };

  const addAnswer = () => {
    setLocalQuestion({
      ...localQuestion,
      answers: [...localQuestion.answers, { text: "", isCorrect: false }],
    });
  };

  const removeAnswer = (index: number) => {
    setLocalQuestion({
      ...localQuestion,
      answers: localQuestion.answers.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="border p-4 mb-4 w-full max-w-md rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Question ({localQuestion.type})</h3>
        <button className="text-red-500 hover:text-red-700" onClick={onRemove}>
          Remove
        </button>
      </div>

      <input
        type="text"
        placeholder="Question text"
        className="w-full border p-2 rounded mb-2"
        value={localQuestion.question}
        onChange={(e) =>
          setLocalQuestion({ ...localQuestion, question: e.target.value })
        }
      />

      <select
        value={localQuestion.type}
        onChange={(e) => {
          const type = e.target.value as typeof localQuestion.type;
          setLocalQuestion({
            ...localQuestion,
            type,
            answers:
              type === QuestionTypes.CHECKBOX
                ? localQuestion.answers.length
                  ? localQuestion.answers
                  : [{ text: "", isCorrect: false }]
                : type === QuestionTypes.BOOLEAN
                ? [{ text: "", isCorrect: false }]
                : [{ text: "", isCorrect: false }],
          });
        }}
        className="border p-2 rounded mb-2"
      >
        {Object.values(QuestionTypes).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {localQuestion.answers.map((answer, idx) => (
        <div key={idx} className="flex items-center mb-2 gap-2">
          {localQuestion.type === QuestionTypes.BOOLEAN && (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={answer.isCorrect}
                onChange={(e) =>
                  updateAnswer(idx, { ...answer, isCorrect: e.target.checked })
                }
              />
              Is True?
            </label>
          )}

          {localQuestion.type === QuestionTypes.CHECKBOX && (
            <>
              <input
                type="checkbox"
                checked={answer.isCorrect}
                onChange={(e) =>
                  updateAnswer(idx, { ...answer, isCorrect: e.target.checked })
                }
              />
              <input
                type="text"
                placeholder="Answer text"
                className="border p-1 rounded flex-1"
                value={answer.text}
                onChange={(e) =>
                  updateAnswer(idx, { ...answer, text: e.target.value })
                }
              />
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeAnswer(idx)}
              >
                X
              </button>
            </>
          )}

          {localQuestion.type === QuestionTypes.INPUT && (
            <input
              type="text"
              placeholder="Answer text"
              className="border p-1 rounded flex-1"
              value={answer.text}
              onChange={(e) =>
                updateAnswer(idx, { ...answer, text: e.target.value })
              }
            />
          )}
        </div>
      ))}

      {localQuestion.type === QuestionTypes.CHECKBOX && (
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={addAnswer}
        >
          Add Answer
        </button>
      )}

      {!isValid() && (
        <p className="text-red-500 text-sm mt-1">This question is invalid</p>
      )}
    </div>
  );
}
