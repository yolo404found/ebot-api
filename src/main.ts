import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.get(ConfigService);
  app.setGlobalPrefix(`api/v${process.env.PORT || 1}`);
   const config = new DocumentBuilder()
    .setTitle('E-Commerce Bot API')
    .setDescription('API for Telegram E-Commerce Bot')
    .setVersion('1.0')
    .addTag('categories', 'Product categories operations')
    .addTag('bot', 'Telegram bot interactions')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`api/v${process.env.PORT || 1}`, app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
