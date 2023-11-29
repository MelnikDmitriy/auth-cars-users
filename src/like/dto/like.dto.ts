import { IsString } from 'class-validator';

export class LikeDto {
  @IsString()
  id: string;
}
