import {
  IsDateString,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  surname: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+\d{1,}$/)
  phone: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth: string;

  @IsOptional()
  // @IsUrl()
  avatar: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  login: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password: string;
}
