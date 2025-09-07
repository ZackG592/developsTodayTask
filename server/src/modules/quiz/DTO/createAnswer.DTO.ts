import { IsBoolean, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerItemDTO {
  @IsString()
  questionID: string;

  @IsString()
  text: string | null;

  @IsBoolean()
  isCorrect: boolean;
}

export class CreateAnswersDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerItemDTO)
  answers: AnswerItemDTO[];
}
