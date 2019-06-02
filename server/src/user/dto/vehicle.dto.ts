import { IsString } from 'class-validator';

export class DtoVehicle {
  @IsString()
  model: string;

  @IsString()
  make: string;

  @IsString()
  plateNumber: string;
}
