import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
