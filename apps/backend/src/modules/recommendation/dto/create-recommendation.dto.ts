import { IsInt, IsEnum, Min } from '@nestjs/class-validator';

export enum RiskTolerance {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class CreateRecommendationDto {
  @IsInt()
  @Min(0)
  age: number;

  @IsInt()
  @Min(0)
  income: number;

  @IsInt()
  @Min(0)
  dependents: number;

  @IsEnum(RiskTolerance)
  riskTolerance: RiskTolerance;
}
