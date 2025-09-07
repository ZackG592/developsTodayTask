import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { QuizModule } from './modules/quiz/quiz.module';

@Module({
  imports: [PrismaModule, AuthModule, QuizModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
