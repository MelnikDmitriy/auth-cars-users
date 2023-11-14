import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { UserWithLogin } from './interfaces/user-with-login.interface';
import { PASSWORD_HASH_COST } from 'src/constants/permanent';
import { CredentialsService } from 'src/credential/credential.service';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserEntity } from 'src/entities/users.entity';

@Injectable()
export class UserService {
    constructor (
        private readonly userRepository: UserRepository,
        private readonly credentialsService: CredentialsService,
        ) {}

    async createNewUser(userDto: UserDto): Promise<UserWithLogin> {
        const hashPassword = await bcrypt.hash(
            userDto.password,
            PASSWORD_HASH_COST
        );
        await this.credentialsService.checkLoginNotExistance(userDto.login);
        return this.userRepository.createNewUser(userDto, hashPassword);
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<void> {
        await this.userRepository.checkUserById(userId);
        const {
            login: newLogin,
            password: newPassword,
            ... newInfo
        } = updateUserDto;
        const credentials = {};
        let credentialsId;
        if (newLogin || newPassword) {
            const checkCredentials = await this.credentialsService.getUserCredentials(userId);
            credentialsId = checkCredentials.id;
        }
        if (newLogin) {
            await this.credentialsService.checkLoginNotExistance(newLogin);
            credentials['login'] = newLogin;
        }
        if (newPassword) {
            const hashPassword = await bcrypt.hash(newPassword, PASSWORD_HASH_COST);
            credentials['password'] = hashPassword;
        }
        return this.userRepository.updateUser(
            newInfo,
            userId,
            credentials,
            credentialsId
        );
    }

    async deleteUser(userId: string): Promise<void> {
        await this.userRepository.checkUserById(userId);
        return this.userRepository.deleteUser(userId);
    }

    getUsers(page: number, pageSize: number): Promise<UserEntity[]> {
        return this.userRepository.getUsers(page, pageSize);
    }
    
}

