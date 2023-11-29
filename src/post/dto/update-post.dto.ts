import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  postId: string;

  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  images?: string[];
  

}
