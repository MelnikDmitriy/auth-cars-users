import { IsString, IsUUID } from 'class-validator';

export class CarDto {
  @IsString()
  color: string;

  @IsString()
  number: string;

  @IsString()
  bodyType: string;

  @IsString()
  @IsUUID()
  brandId?: string;
}
