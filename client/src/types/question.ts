import { QuestionTypes } from "@/constants/QuestionTypes";
import { Answer } from "./answer";

interface Question {
  question: string;
  type: QuestionTypes;
  answers: Answer[];
}

export type { Question };
