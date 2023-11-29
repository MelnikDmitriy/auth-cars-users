import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCarWithoutBrandDto {
  @IsUUID()
  carId: string;

  @IsString()
  color?: string;

  @IsString()
  number?: string;

  @IsString()
  bodyType?: string;
}
