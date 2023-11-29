import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from 'src/entities/cars.entity';
import { UserEntity } from 'src/entities/users.entity';
import { Connection, Repository } from 'typeorm';
import { CarDto } from './dto/car.dto';
import { UserRoles } from 'src/enums/user.roles.enum';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { CarBrandEntity } from 'src/entities/car-brands.entity';
import { OptionalCar } from './interfaces/optional-car.interface';

export class CarRepository {
  constructor(
    @InjectRepository(CarBrandEntity)
    private readonly carBrandRepository: Repository<CarBrandEntity>,
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
    private readonly connection: Connection,
  ) {}

  async createNewCar(
    user: UserEntity,
    carDto: CarDto,
    brandId: string,
  ): Promise<CarEntity> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(
        UserEntity,
        { id: user.id },
        { role: UserRoles.Driver },
      );

      const savedCar = await queryRunner.manager.save(CarEntity, {
        ...carDto,
        brand: { id: brandId },
        user,
      });
      await queryRunner.commitTransaction();
      return savedCar;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Не удалось создать машину',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async checkCarBrand(brandId: string): Promise<void> {
    try {
      const checkedbrandId = await this.carBrandRepository.findOne({
        where: { id: brandId },
      });

      if (!checkedbrandId) {
        throw new BadRequestException('Такой марки не существует');
      }
    } catch (err) {
      if (err instanceof BadRequestException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }

  async updateCar(
    updateCarDto: OptionalCar,
    carBrandId: string,
    carId: string,
  ): Promise<void> {
    try {
      await this.carRepository.update(
        { id: carId },
        {
          ...updateCarDto,
          brand: {
            id: carBrandId,
          },
        },
      );
    } catch (err) {
      throw new InternalServerErrorException('Не удалось обновить машину');
    }
  }

  async getCarsByUserId(user: UserEntity): Promise<CarEntity[]> {
    try {
      const cars = await this.carRepository.find({
        where: { user },
      });

      return cars;
    } catch (err) {
      throw new InternalServerErrorException(
        'Не удалось получить машины пользователя',
      );
    }
  }

  async getCarByUserId(carId: string): Promise<CarEntity> {
    try {
      const car = await this.carRepository.findOne({
        where: { id: carId },
        relations: { brand: true },
      });

      return car;
    } catch (err) {
      throw new InternalServerErrorException('Не удалось получить машину');
    }
  }

  async deleteCar(carId): Promise<void> {
    try {
      await this.carRepository.delete({ id: carId });
    } catch (err) {
      throw new InternalServerErrorException('Не удалось удалить машину');
    }
  }

  async checkCarById(carId: string): Promise<void> {
    try {
      const car = await this.carRepository.findOne({
        where: { id: carId },
      });

      if (!car) {
        throw new BadRequestException('Машины с таким Id нет');
      }
    } catch (err) {
      if (err instanceof BadRequestException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }
}
