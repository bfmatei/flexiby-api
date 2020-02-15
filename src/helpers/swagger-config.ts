import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerConfig(app: INestApplication, configService: ConfigService) {
  const documentOptions = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(configService.get<string>('SWAGGER_TITLE'))
    .setDescription(configService.get<string>('SWAGGER_DESCRIPTION'))
    .setVersion(configService.get<string>('SWAGGER_VERSION'))
    .build();

  const document = SwaggerModule.createDocument(app, documentOptions);

  SwaggerModule.setup(configService.get<string>('SWAGGER_PATH'), app, document);
}
