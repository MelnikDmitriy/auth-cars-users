import { Injectable } from '@nestjs/common';
import { CarRepository } from './car.repository';
import { CarDto } from './dto/car.dto';
import { CarEntity } from 'src/entities/cars.entity';
import { UserRepository } from 'src/user/user.repository';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createNewCar(userId: string, carDto: CarDto): Promise<CarEntity> {
    await this.carRepository.checkCarBrand(carDto.brandId);
    const user = await this.userRepository.checkUserById(userId);
    const { brandId, ...updateCarDto } = carDto;
    return this.carRepository.createNewCar(user, updateCarDto, brandId);
  }

  async updateCar(userId: string, updateCarDto: UpdateCarDto): Promise<void> {
    await this.userRepository.checkUserById(userId);
    const { carId, brandId, ...carDto } = updateCarDto;
    if (updateCarDto.brandId) {
      await this.carRepository.checkCarBrand(updateCarDto.brandId);
      return this.carRepository.updateCar(carDto, brandId, carId);
    } else {
      const car = await this.carRepository.getCarByUserId(carId);
      return this.carRepository.updateCar(carDto, car.brand.id, carId);
    }
  }

  async getCarsByUsers(userId: string): Promise<CarEntity[]> {
    const user = await this.userRepository.checkUserById(userId);
    return this.carRepository.getCarsByUserId(user);
  }

  async deleteCar(userId: string, carId: string): Promise<void> {
    await this.carRepository.checkCarById(carId);
    const user = await this.userRepository.checkUserById(userId);
    await this.carRepository.deleteCar(carId);
    const cars = await this.carRepository.getCarsByUserId(user);

    if (!cars.length) {
      this.userRepository.updateUserRole(user);
    }
  }
}
