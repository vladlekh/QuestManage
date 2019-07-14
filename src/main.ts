import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Quest manage')
    .setDescription('The quest manage API description')
    .setVersion('1.0')
    .setBasePath('api/v1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors();
  app.setGlobalPrefix('api/v1');
  await app.listen(8080);
}

bootstrap();
