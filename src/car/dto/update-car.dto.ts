import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateCarDto {

    
    @IsUUID()
    carId: string;

    @IsString()
    color?: string;

    @IsString()
    number?: string;

    @IsString()
    bodyType?: string;

    @IsOptional()
    @IsUUID()
    @IsString()
    brandId?: string;
  
} 