import { Question } from "@/types/question";
import BooleanQuestion from "./booleanQuestion";
import CheckboxQuestion from "./checkboxQuestion";
import InputQuestion from "./inputQuestion";
import { Answer } from "@/types/answer";
import { Dispatch, SetStateAction } from "react";
import { QuestionTypes } from "@/constants/QuestionTypes";

interface QuestionBlockProps {
  changeCorrectCounter: Dispatch<SetStateAction<number>>;
  question: string;
  questionType: QuestionTypes;
  answers: Answer[];
}

export default function QuestionBlock({
  question,
  changeCorrectCounter,
  answers,
  questionType,
}: QuestionBlockProps) {
  if (questionType === "BOOLEAN") {
    return (
      <BooleanQuestion
        changeCorrectCounter={changeCorrectCounter}
        correctAnswer={answers[0].isCorrect}
        question={question}
      />
    );
  } else if (questionType === "INPUT") {
    return (
      <InputQuestion
        question={question}
        correctAnswer={answers[0] as Answer}
        changeCorrectCounter={changeCorrectCounter}
      />
    );
  } else if (questionType === "CHECKBOX") {
    return (
      <CheckboxQuestion
        changeCorrectCounter={changeCorrectCounter}
        question={question}
        answers={answers}
      />
    );
  }
}
