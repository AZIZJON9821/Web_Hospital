import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const api = 'api/v1';
  app.setGlobalPrefix(api);
  const config_swagger = new DocumentBuilder()
    .setTitle('Base app')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      in: 'Header',
    })
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config_swagger);
  SwaggerModule.setup(api, app, documentFactory);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
