import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './dto/car.dto';
import { CarEntity } from 'src/entities/cars.entity';
import { UpdateCarDto } from './dto/update-car.dto';
import { UUID } from 'crypto';

@Controller('car')
export class CarController {
    constructor (private readonly carService: CarService) {}

    @Post("/:id")
    createNewCar(
        @Param('id') userId: string,
        @Body() carDto: CarDto
        ): Promise<CarEntity> {
            return this.carService.createNewCar(userId, carDto)
        }

    @Patch("/update/:id")
    updateCar(
        @Param('id') userId: string,
        @Body() updateCarDto: UpdateCarDto
    ): Promise<void> {
        return this.carService.updateCar(userId, updateCarDto);
    }

    @Delete("/:id")
    deleteCar(
        @Param('id') userId: string,
        @Body() qwe
    ): Promise<void> {
        return this.carService.deleteCar(userId, qwe.id);
    }

    @Get("/:id")
    getCarsByIdUser(
        @Param('id') userId: string
        ): Promise<CarEntity[]> {
        return this.carService.getCarsByUsers(userId);
    }

}
