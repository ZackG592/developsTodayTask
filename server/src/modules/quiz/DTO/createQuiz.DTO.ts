import { IsString } from 'class-validator';

export class CreateQuizDTO {
  @IsString()
  title: string;
}

export interface ICreateQuizDTO {
  title: string;
  ownerName: string;
}
