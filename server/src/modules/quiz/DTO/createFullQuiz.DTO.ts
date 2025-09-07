import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuizDTO } from './createQuiz.DTO';
import { CreateQuestionsDTO } from './createQuestion.DTO';

export class CreateFullQuizDTO {
  quiz: CreateQuizDTO;

  @ValidateNested()
  @Type(() => CreateQuestionsDTO)
  questions: CreateQuestionsDTO;
}
