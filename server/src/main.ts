import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as path from 'path';
import { NotFoundExceptionFilter } from './filters/not-found-exception.filter';
import { Logger } from '@nestjs/common';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'a secret',
      saveUninitialized: false,
      resave: false, //@TODO: depends on session store
    }),
  );

  //serve react frontend
  app.use(express.static(path.resolve(__dirname, '../../client/build')));

  Logger.log(
    'Serving static assets from ' +
      path.resolve(__dirname, '../../client/build'),
    'Bootstrap',
  );
  app.useGlobalFilters(new NotFoundExceptionFilter());

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
