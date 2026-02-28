

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS – Angular 4200-ku allow
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // ✅ Global API prefix
  app.setGlobalPrefix('api/v1');

  // ✅ Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
    }),
  );

  // ✅ Body size
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // ✅ IMPORTANT: HARD-CODE PORT (DEBUG MODE)
  const port = 3000;
  await app.listen(port);
}
bootstrap();





