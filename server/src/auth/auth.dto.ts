import { IsString, IsEmail, IsEnum } from 'class-validator';
import { UserRole } from '../user/interfaces';

export class LoginInfoDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
}

export class RegisterInfoDto extends LoginInfoDto {
  @IsEnum(UserRole)
  readonly userType: UserRole;
}

export class RegisterResponeDto {
  constructor(
    public success: boolean,
    public userId?: string,
    public error?: string,
  ) {}
}

export class LoginResponseDto extends RegisterResponeDto {}
