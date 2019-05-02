import { IsString } from 'class-validator';

export class DtoVehicle {
  @IsString()
  model: string;

  @IsString()
  plateNumber: string;
}
