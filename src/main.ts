import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Set global prefix
  const apiVersion = configService.get('API_VERSION') || 1;
  const apiPrefix = `api/v${apiVersion}`;
  app.setGlobalPrefix(apiPrefix);

  // Configure CORS
  app.enableCors({
    origin: configService.get('ALLOWED_ORIGINS')?.split(',') || [
      'http://localhost:3001',
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('E-Commerce Bot API')
    .setDescription('API for Telegram E-Commerce Bot')
    .setVersion('1.0')
    .addTag('bot', 'Telegram bot interactions')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}/${apiPrefix}`);
  logger.log(`Swagger docs available at: ${await app.getUrl()}/${apiPrefix}/docs`);
}

bootstrap();