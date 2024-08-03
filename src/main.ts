import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filter/exception.filter';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const port = 9000;

  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  setupSwagger(app);

  await app.listen(port);

  Logger.log(`Nest running on port ${port}`, NestApplication.name);
  Logger.log(`Swagger available at http://localhost:${port}/order-api`, "Swagger server");

}
bootstrap();
