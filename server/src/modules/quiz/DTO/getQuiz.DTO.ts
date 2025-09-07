import { IsString } from 'class-validator';

export class GetQuizDTO {
  @IsString()
  id: string;
}
