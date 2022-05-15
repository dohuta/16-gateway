/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

/* extra packages/libs */
import { json } from 'body-parser';
import { rateLimit } from 'express-rate-limit';
import * as requestIp from 'request-ip';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* config our app */
  app.use(json({ limit: '5mb' })); // maxLenght of json body
  app.use(requestIp.mw());
  app.enableCors();
  // app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 1000, // 1s
      max: 5, // limit each IP to 5 requests per 1s
      message: 'Too many requests, please try again later.',
    })
  );

  const globalPrefix = 'api';

  /* create api document */
  const options = new DocumentBuilder()
    .setTitle('API Documents')
    .setDescription('The API Document')
    .setVersion('1.0')
    .addServer(`${process.env.BASE_URI}/${globalPrefix}`)
    .build();
  const doc = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${globalPrefix}/document`, app, doc);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);

  /* start application */
  const port = process.env.API_GATEWAY_PORT || 3333;
  await app.listen(port);
  Logger.log(`🚀 GATEWAY is running on ${port}/${globalPrefix}`);
}

bootstrap();
