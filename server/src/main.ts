import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config();
const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (!process.env.PORT) {
    logger.error('.env file could not load');
  }
  await app.listen(process.env.PORT);

  logger.log(`Application is Running on PORT => ${process.env.PORT}`);
}
bootstrap();
