import {
  IsOptional,
  IsPhoneNumber,
  IsNumber,
  IsJSON,
  IsString,
  IsNumberString,
  Length,
} from 'class-validator';
import { Point } from 'geojson';

export class DtoProfessionalDetails {
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsNumber()
  workingRange: number;

  @IsOptional()
  location: Point;

  @IsOptional()
  @Length(11, 11)
  @IsNumberString()
  abn: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  bsb: string;

  @IsOptional()
  @IsString()
  accountNumber: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;
}
