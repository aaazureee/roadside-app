import { IsDefined, IsString, IsOptional, IsInt } from 'class-validator';
import { Point } from 'geojson';

export class DtoCalloutCreate {
  @IsDefined()
  location: Point;

  @IsDefined()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsInt()
  vehicleId: number;
}
