import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './dto/car.dto';
import { CarEntity } from 'src/entities/cars.entity';
import { UpdateCarDto } from './dto/update-car.dto';
import { DeleteCarDto } from './dto/delete-car.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRoles } from 'src/enums/user.roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CheckUserId } from 'src/decorators/userId.decorator';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Roles(UserRoles.User, UserRoles.Driver)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/:id')
  createNewCar(
    @Param('id')
    @CheckUserId() checkedUserId: string,
    @Body() carDto: CarDto,
  ): Promise<CarEntity> {
    return this.carService.createNewCar(checkedUserId, carDto);
  }

  @Roles(UserRoles.User, UserRoles.Driver)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch('/update/:id')
  updateCar(
    @Param('id')
    @CheckUserId() checkedUserId: string,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<void> {
    return this.carService.updateCar(checkedUserId, updateCarDto);
  }

  @Roles(UserRoles.User, UserRoles.Driver)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('/:id')
  deleteCar(
    @Param('id')
    @CheckUserId() checkedUserId: string,
    @Body() carId: DeleteCarDto,
  ): Promise<void> {
    return this.carService.deleteCar(checkedUserId, carId.id);
  }

  @Roles(UserRoles.User, UserRoles.Driver)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/:id')
  getCarsByIdUser(
    @Param('id')
    @CheckUserId() checkedUserId: string,
    ): Promise<CarEntity[]> {
    return this.carService.getCarsByUsers(checkedUserId);
  }
}
