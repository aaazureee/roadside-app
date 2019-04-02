import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../user/interfaces';

export class LoginInfoDto {
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;
}

export class RegisterInfoDto extends LoginInfoDto {
  @IsEnum(UserRole)
  readonly userType: UserRole;
}

export class RegisterResponeDto {
  constructor(
    public success: boolean,
    public userType?: UserRole,
    public email?: string,
    public error?: string,
  ) {}
}

export class LoginResponseDto extends RegisterResponeDto {}
