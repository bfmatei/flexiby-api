import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerConfig(
  app: INestApplication,
  path = '',
  title = '',
  description = '',
  version = ''
) {
  const documentOptions = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, documentOptions);

  SwaggerModule.setup(path, app, document);
}
