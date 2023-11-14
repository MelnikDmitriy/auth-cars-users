import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserWithLogin } from './interfaces/user-with-login.interface';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRoles } from 'src/enums/user.roles.enum';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserEntity } from 'src/entities/users.entity';
import { PaginationDto } from './dto/pagination.dto';

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Roles(UserRoles.User)
    @Post()
    createNewUser(@Body() userDto: UserDto): Promise<UserWithLogin> {
        return this.userService.createNewUser(userDto);
    }

    @Roles(UserRoles.User, UserRoles.Driver)
    @Post("/:id")
    updateUser(
        @Param("id", new ParseUUIDPipe()) userId: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<void> {
        return this.userService.updateUser(userId, updateUserDto);
    }

    @Roles(UserRoles.User, UserRoles.Driver)
    @Delete("/:id")
    deleteUser(@Param("id", new ParseUUIDPipe()) userId: string): Promise<void> {
        return this.userService.deleteUser(userId);
    }

    @Get("")
    getUsers(
        @Query(new ValidationPipe({ transform: true })) paginationDto: PaginationDto
    ): Promise<UserEntity[]> {
        return this.userService.getUsers(paginationDto.page, paginationDto.pageSize);
    }

}
