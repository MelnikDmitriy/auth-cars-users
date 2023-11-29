import { IsOptional, IsString } from 'class-validator';

export class PostDto {
  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  images?: string[];
}
