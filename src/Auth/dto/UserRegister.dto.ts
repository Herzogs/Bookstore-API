import { IsEmail, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserRegisterDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(3, 15)
  name: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(3, 15)
  lastname: string;

  @IsString()
  @IsEmail()
  @Length(3, 15)
  email: string;

  @IsString()
  @Length(3, 8)
  @Transform(({ value }) => value.trim())
  password: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(3, 15)
  username: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(3, 15)
  address: string;
}
