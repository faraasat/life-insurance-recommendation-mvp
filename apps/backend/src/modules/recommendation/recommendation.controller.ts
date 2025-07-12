import { Body, Controller, Post } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly service: RecommendationService) {}

  @Post()
  async create(@Body() dto: CreateRecommendationDto) {
    return this.service.create(dto);
  }
}
