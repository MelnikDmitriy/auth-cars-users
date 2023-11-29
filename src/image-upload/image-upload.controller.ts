import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from './image-upload.service';
import { BufferedFile } from 'src/minio/interfaces/minio-client.interface';

@Controller('image-upload')
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingle(@UploadedFile() image: BufferedFile) {
    return this.imageUploadService.upload(image);
  }

  @Post('singles')
  @UseInterceptors(FilesInterceptor('image'))
  async uploadSingles(@UploadedFiles() images: BufferedFile[]) {
    return this.imageUploadService.uploadSingles(images);
  }
}
