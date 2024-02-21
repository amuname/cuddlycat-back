import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const allowOrigin =
  process.env.NODE_ENV === 'production'
    ? ['https://cuddlycat.ru', 'https://app.cuddlycat.ru']
    : ['http://localhost:3000', 'http://app.localhost:3000'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: allowOrigin,
    },
  });
  await app.listen(3000);
}
bootstrap();
