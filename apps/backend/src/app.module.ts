import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RecommendationModule } from './modules/recommendation/recommendation.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [RecommendationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
