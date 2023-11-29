import { Module } from '@nestjs/common';
import { ImageUploadController } from './image-upload.controller';
import { MinioClientModule } from 'src/minio/minio.module';
import { ImageUploadService } from './image-upload.service';

@Module({
  imports: [MinioClientModule],
  controllers: [ImageUploadController],
  providers: [ImageUploadService],
})
export class ImageUploadModule {}
