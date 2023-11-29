import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = 'UTC';
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000'], // с каких сайтов мы можем делать запросы
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // мы даём разрешение фронту трогать куку
  };

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
