import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';

import * as dotenv from 'dotenv';

dotenv.config();

mongoose.set('debug', true);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('todo-api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: { target: false, value: false },
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
