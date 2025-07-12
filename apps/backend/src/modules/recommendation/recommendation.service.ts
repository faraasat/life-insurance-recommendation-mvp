import { Injectable } from '@nestjs/common';
import {
  CreateRecommendationDto,
  RiskTolerance,
} from './dto/create-recommendation.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class RecommendationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRecommendationDto) {
    const recommendation = this.getRecommendation(dto);

    await this.prisma.recommendation.create({
      data: {
        ...dto,
        recommendation: recommendation,
      },
    });

    return {
      recommendation,
      explanation: this.getExplanation(recommendation),
    };
  }

  private getRecommendation(dto: CreateRecommendationDto): string {
    const { age, riskTolerance } = dto;

    if (age < 40 && riskTolerance === RiskTolerance.HIGH) {
      return 'Term Life – $500,000 for 20 years';
    }

    if (age >= 40 && riskTolerance === RiskTolerance.LOW) {
      return 'Whole Life – $250,000';
    }

    return 'Term Life – $250,000 for 10 years';
  }

  private getExplanation(recommendation: string): string {
    switch (recommendation) {
      case 'Term Life – $500,000 for 20 years':
        return 'Provides high coverage for younger, higher-risk individuals.';
      case 'Whole Life – $250,000':
        return 'Suitable for older individuals seeking long-term security.';
      default:
        return 'Balanced choice for general needs.';
    }
  }
}
