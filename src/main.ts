import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Request Api')
    .setDescription(
      'this is a api document that covers all apis of `Request` project',
    )
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, swaggerDocument);

  
  await app.listen(5000);
}
bootstrap();
