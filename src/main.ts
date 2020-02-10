import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as expressRateLimit from 'express-rate-limit';
import * as helmet from 'helmet';

import { AppModule } from '~app/app.module';
import { ConfigModule } from '~core/config/config.module';
import { swaggerConfig } from '~helpers/swagger-config';

// eslint-disable-next-line max-statements
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app
    .select(ConfigModule)
    .get(ConfigService);

  // Enable CORS
  app.enableCors({
    origin: configService.get<string>('APP_CORS_ORIGIN')
  });

  // Enable security (via helm package)
  app.use(helmet());

  // Enable rate limiting (via express-rate-limit package)
  app.use(
    expressRateLimit({
      windowMs: Number(configService.get<string>('RATE_LIMIT_MS')),
      max: Number(configService.get<string>('RATE_LIMIT_MS'))
    })
  );

  // Enable response compression (via compression package)
  app.use(compression());

  // Enable entity validation (via class-validator package)
  app.useGlobalPipes(new ValidationPipe());

  // Set API prefix
  app.setGlobalPrefix(configService.get<string>('APP_PREFIX'));

  // Configure Swagger
  if (configService.get<string>('SWAGGER_ENABLE').toLowerCase() === 'true') {
    swaggerConfig(
      app,
      configService.get<string>('SWAGGER_PATH'),
      configService.get<string>('SWAGGER_TITLE'),
      configService.get<string>('SWAGGER_DESCRIPTION'),
      configService.get<string>('SWAGGER_VERSION')
    );
  }

  // Start application
  await app.listen(Number(configService.get<string>('APP_PORT')));
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
