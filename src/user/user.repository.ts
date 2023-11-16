import { UserEntity } from 'src/entities/users.entity';
import { Connection, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserWithLogin } from './interfaces/user-with-login.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoles } from 'src/enums/user.roles.enum';
import { CredentialsEntity } from 'src/entities/credentials.entity';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { OptionalUser } from './interfaces/optional-user.interface';
import { OptionalCredentials } from 'src/credential/interfaces/optional-credentials.interface';
import { CarEntity } from 'src/entities/cars.entity';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly connection: Connection,
  ) {}

  async createNewUser(
    userDto: UserDto,
    hashPassword: string,
  ): Promise<UserWithLogin> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const savedUser = await queryRunner.manager.save(UserEntity, {
        ...userDto,
        role: UserRoles.User,
      });
      const savedCredentials = await queryRunner.manager.save(
        CredentialsEntity,
        {
          login: userDto.login,
          password: hashPassword,
          user: savedUser,
        },
      );

      await queryRunner.commitTransaction();
      return { ...savedUser, login: savedCredentials.login }; // почему savedCredentials а не userDto
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Не удалось создать пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async checkUserById(userId: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new BadRequestException('Пользователь с таким id не найден');
      }

      return user;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async updateUserRole(user: UserEntity): Promise<void> {
    try {
      await this.userRepository.update(
        {id: user.id},
        {role: UserRoles.User}
        );
    } catch (err) {
      throw new InternalServerErrorException('Не удалось обновить пользователя');
    }
  }

  async updateUser(
    newInfo: OptionalUser,
    userId: string,
    credentials: OptionalCredentials,
    credentialsId: string,
  ): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (userId) {
        await queryRunner.manager.update(
          UserEntity,
          { id: userId },
          { ...newInfo },
        );
      }
      if (credentialsId) {
        await queryRunner.manager.update(
          CredentialsEntity,
          { id: credentialsId },
          { ...credentials },
        );
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      throw new HttpException(
        'Не удалось обновить пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async deleteUser(userId: string): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(CredentialsEntity, {
        user: { id: userId },
      });
      await queryRunner.manager.softDelete(UserEntity, { id: userId });

      await queryRunner.commitTransaction();
    } catch (err) {
      throw new InternalServerErrorException('Не удалось удалить пользователя');
    } finally {
      await queryRunner.release();
    }
  }

  async getUsers(page: number, pageSize: number): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find({
        where: {
          deletedAt: null,
        },
        order: {
          role: 'DESC',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return users;
    } catch (err) {
      throw new InternalServerErrorException(
        'Не удалось получить пользователей',
      );
    }
  }


}
