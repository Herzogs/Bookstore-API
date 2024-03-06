import { IsEmail, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserLoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  password: string;
}
