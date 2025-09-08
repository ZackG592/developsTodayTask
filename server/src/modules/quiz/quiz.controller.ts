import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateFullQuizDTO } from './DTO/createFullQuiz.DTO';
import { IsAuthenticated } from 'src/common/guards/isAuthneticated.guard';
import { RequestWithUser } from 'src/common/types/requestWithUser';

@Controller('/quizzes')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get('/:id')
  async getQuiz(@Param('id') id: string) {
    return await this.quizService.getQuiz(id);
  }

  @Get('/')
  async getQuizzes() {
    return await this.quizService.getQuizzes();
  }

  @Delete('/:id')
  @UseGuards(IsAuthenticated)
  async deleteQuiz(@Param('id') id: string, @Req() request: RequestWithUser) {
    return await this.quizService.deleteQuiz(id, request.user.name);
  }

  @Post('/')
  @UseGuards(IsAuthenticated)
  async createQuiz(
    @Body() data: CreateFullQuizDTO,
    @Req() request: RequestWithUser,
  ) {
    const userName = request.user.name;
    return await this.quizService.createFullQuiz({
      quiz: { ...data.quiz, ownerName: userName },
      questions: data.questions,
    });
  }
}
