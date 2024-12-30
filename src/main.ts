import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { SwaggerInitializer } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);

  const Swagger = new SwaggerInitializer({
    version: '1',
    title: 'Task Manager',
    servers: [
      {
        url: `http://localhost:8000/${globalPrefix}`,
        name: 'Local Server',
      },
    ],
    description: '',
  });
  Swagger.setup(app);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();