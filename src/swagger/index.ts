import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

type ServerUrl = {
  url: string;
  name: string;
};

export type SwaggerOptions = {
  title: string;
  version: string;
  servers: Array<ServerUrl>;
  description: string;
  apiRootPath?: string;
};

export const swaggerConfig = (options: SwaggerOptions) => {
  const swagger = new DocumentBuilder()
    .setTitle(options.title)
    .setDescription(options.description)
    .setVersion(options.version)
    .addBearerAuth();

  options.servers.forEach((server) =>
    swagger.addServer(server.url, server.name),
  );

  return swagger.build();
};

export class SwaggerInitializer {
  private options: SwaggerOptions;

  constructor(options: SwaggerOptions) {
    this.options = options;
  }

  setup(app: INestApplication) {
    const docPath = this.options.apiRootPath
      ? `${this.options.apiRootPath}/swagger`
      : '/swagger';
    const document = SwaggerModule.createDocument(
      app,
      swaggerConfig(this.options),
      {
        ignoreGlobalPrefix: true,
      },
    );
    return SwaggerModule.setup(docPath, app, document);
  }
}
