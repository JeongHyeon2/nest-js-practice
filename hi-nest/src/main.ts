import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe(
      {
        whitelist: true, // 유효하지 않으면 requst자체를 막음
        forbidNonWhitelisted: true, // 유효하지 않는 데이터를 출력
        
      }
    )
  );
  await app.listen(3000);
}
bootstrap();
