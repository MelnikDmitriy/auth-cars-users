import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCarDto {
  @IsOptional()
  @IsUUID()
  carId?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  bodyType?: string;

  @IsOptional()
  @IsUUID()
  @IsString()
  brandId?: string;
}
