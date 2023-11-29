import { BadRequestException, Injectable } from '@nestjs/common';
import { Sizes } from 'src/enums/size.enum';
import { BufferedFile } from 'src/minio/interfaces/minio-client.interface';
import { MinioClientService } from 'src/minio/minio.service';


@Injectable()
export class ImageUploadService {
  constructor(private readonly minioClientService: MinioClientService) {}

  async upload(image: BufferedFile) {
    if (image.size > Sizes.MaxSize) {
      throw new BadRequestException('Файл большеват');
    }
    return this.minioClientService.upload(image);
  }

  async uploadSingles(images: BufferedFile[]) {
    const uploadPromise = images.map(async (image) => {
      if (image.size > Sizes.MaxSize) {
        throw new BadRequestException("Какой-то файл большеват");
      }

      return this.minioClientService.upload(image);
    });

    return Promise.all(uploadPromise);
  }
}
