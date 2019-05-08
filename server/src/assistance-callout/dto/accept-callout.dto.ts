import { IsString, IsNumber } from 'class-validator';

export class DtoAcceptCallout {
  @IsString()
  id: string;

  @IsNumber()
  price: number;
}
