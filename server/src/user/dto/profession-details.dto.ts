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
  @IsPhoneNumber('AU')
  phone: string;

  @IsOptional()
  @IsNumber()
  workingRange: number;

  @IsOptional()
  @IsJSON()
  location: Point;

  @IsOptional()
  @Length(11, 11)
  @IsNumberString()
  abn: string;

  @IsString()
  address: string;
}
