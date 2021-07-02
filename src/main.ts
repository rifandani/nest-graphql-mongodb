import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// files
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(bootstrap.name, true);
  const PORT = process.env.PORT || 8000;

  // global config
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  // run server
  await app.listen(PORT);
  logger.debug(`⚡ App is running on: ${await app.getUrl()}`);
}
bootstrap();
