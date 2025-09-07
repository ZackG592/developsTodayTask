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
import { IsOwnerGuard } from 'src/common/guards/IsOwner.guard';
import { CreateFullQuizDTO } from './DTO/createFullQuiz.DTO';

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
  @UseGuards(IsOwnerGuard)
  async deleteQuiz(@Param('id') id: string) {
    return await this.quizService.deleteQuiz(id);
  }

  @Post('/')
  async createQuiz(@Body() data: CreateFullQuizDTO) {
    return await this.quizService.createFullQuiz({
      ...data,
    });
  }
}
