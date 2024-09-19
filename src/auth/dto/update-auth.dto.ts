// src/auth/dto/update-user.dto.ts
import { IsEmail, IsOptional, IsString, MinLength, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must be 10 digits' })
  phone?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @MinLength(6)
  confirmPassword?: string;
}
