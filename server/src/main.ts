import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { DefaultExceptionFilter } from './common/exceptionFIlters/DefaultExceptionFilter';
import { ExceptionPrismaFilter } from './common/exceptionFIlters/PrismaExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const corsOrigin = process.env.CORS_ORIGIN || '*';
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  app.useGlobalFilters(new DefaultExceptionFilter());
  app.useGlobalFilters(new ExceptionPrismaFilter());
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
