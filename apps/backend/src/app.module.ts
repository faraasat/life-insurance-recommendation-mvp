import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RecommendationModule } from './modules/recommendation/recommendation.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    RecommendationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./../../.env', '.env'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
