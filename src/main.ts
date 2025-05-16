import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiBearerAuth, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api")

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  app.useGlobalFilters(new HttpExceptionFilter)
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  const PORT = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 4000
  await app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
    console.log(`Swagger http://localhost:${PORT}/doc`)
  });
}
bootstrap();
