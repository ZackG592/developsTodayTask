import { IsString } from 'class-validator';

export class CreateQuizDTO {
  @IsString()
  title: string;

  @IsString()
  ownerName: string;
}
