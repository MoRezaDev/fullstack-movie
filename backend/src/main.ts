import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { CatchEverythingFilter } from './common/filters/new-all-exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  });

  // app.useGlobalFilters(new AllExceptionFilter());
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter));
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
