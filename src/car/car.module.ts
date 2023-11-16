import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from 'src/entities/cars.entity';
import { UserModule } from 'src/user/user.module';
import { CarRepository } from './car.repository';
import { CarBrandEntity } from 'src/entities/car-brands.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity, CarBrandEntity]), UserModule],
  providers: [CarService, CarRepository],
  controllers: [CarController]
})
export class CarModule {}
