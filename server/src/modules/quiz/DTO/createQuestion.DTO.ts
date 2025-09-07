import { IsString, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AnswerItemDTO } from './createAnswer.DTO';

export enum QuestionTypes {
  BOOLEAN = 'BOOLEAN',
  INPUT = 'INPUT',
  CHECKBOX = 'CHECKBOX',
}
export class QuestionItemDTO {
  @IsString()
  question: string;

  @IsEnum(QuestionTypes)
  type: QuestionTypes;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerItemDTO)
  answers: AnswerItemDTO[];
}

export class CreateQuestionsDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionItemDTO)
  questions: QuestionItemDTO[];
}
