import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 5858, '0.0.0.0');
}

bootstrap().catch((err) => {
  console.error('Failed to start the application', err);
});
