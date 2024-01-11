import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { Database } from '@/providers/database/postgres/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('NODE_PORT') || 3000;
  const database = app.get<Database>(Database);
  await database.createConnection();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const swaggerConfig = createSwaggerConfig();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`App running on port ${port}`);
}

const createSwaggerConfig = () => {
  return new DocumentBuilder()
    .setTitle('PARKING MANAGEMENT')
    .setDescription('API que reliza o controle de vagas dos estabelecimentos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
};
bootstrap();
