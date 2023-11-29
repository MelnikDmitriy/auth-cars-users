import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { UserDto } from './dto/user.dto';
import { UserWithLogin } from './interfaces/user-with-login.interface';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRoles } from 'src/enums/user.roles.enum';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserEntity } from 'src/entities/users.entity';
import { PaginationDto } from './dto/pagination.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CheckUserId } from 'src/decorators/userId.decorator';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    ) {}

  @Post()
  createNewUser(@Body() userDto: UserDto): Promise<UserWithLogin> {
    return this.userService.createNewUser(userDto);
  }

  @Roles(UserRoles.User, UserRoles.Driver)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch('/:id')
  updateUser(
    @Param('id', new ParseUUIDPipe())
    @CheckUserId()
    checkedUserId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> { 
    return this.userService.updateUser(checkedUserId, updateUserDto);
    
  }

  @Roles(UserRoles.User, UserRoles.Driver)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('/:id')
  async deleteUser(
    @Res({ passthrough: true}) response: Response,
    @Req() request: Request,
    @Param('id', new ParseUUIDPipe()) userId: string
    ): Promise<void> {
      const token = request.cookies.refreshToken;
      response.clearCookie('refreshToken');
      response.clearCookie('accessToken');
      await this.userService.deleteUser(userId);
      await this.authService.logout(token);
  }

  @Get('')
  getUsers(
    @Query(new ValidationPipe({ transform: true }))
    paginationDto: PaginationDto,
  ): Promise<UserEntity[]> {
    return this.userService.getUsers(
      paginationDto.page,
      paginationDto.pageSize,
    );
  }
}
