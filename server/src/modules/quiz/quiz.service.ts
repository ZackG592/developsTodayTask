import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateQuizDTO } from './DTO/createQuiz.DTO';
import { CreateQuestionsDTO, QuestionItemDTO } from './DTO/createQuestion.DTO';

@Injectable()
export class QuizService {
  constructor(private prismaService: PrismaService) {}

  async createFullQuiz(data: {
    quiz: CreateQuizDTO;
    questions: QuestionItemDTO[];
  }) {
    return this.prismaService.quiz.create({
      data: {
        ...data.quiz,
        questions: {
          create: data.questions.map((q) => ({
            question: q.question,
            type: q.type,
            answers: {
              create: q.answers.map((a) => ({
                text: a.text,
                isCorrect: a.isCorrect,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: { answers: true },
        },
      },
    });
  }

  async getQuiz(id: string) {
    const quiz = await this.prismaService.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      return new NotFoundException('No quiz with such ID');
    }

    const questions = await this.prismaService.question.findMany({
      where: { quizID: quiz.id },
      select: { answers: true, question: true, type: true },
    });

    return { quizData: quiz, questionsData: questions };
  }

  async getQuizzes() {
    const quizes = await this.prismaService.quiz.findMany({
      select: {
        _count: {
          select: { questions: true },
        },
        id: true,
        title: true,
        ownerName: true,
      },
    });
    return quizes;
  }

  deleteQuiz(id: string) {
    return this.prismaService.quiz.delete({ where: { id } });
  }
}
