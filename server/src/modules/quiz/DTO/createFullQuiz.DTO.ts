import { CreateQuizDTO } from './createQuiz.DTO';
import { CreateQuestionsDTO } from './createQuestion.DTO';

export class CreateFullQuizDTO extends CreateQuestionsDTO {
  quiz: CreateQuizDTO;
}
