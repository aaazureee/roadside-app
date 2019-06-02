import { IsInt, Min, Max, IsOptional, IsString } from 'class-validator';

export class DtoReview {
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
