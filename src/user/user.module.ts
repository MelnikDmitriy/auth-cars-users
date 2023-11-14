import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/users.entity';
import { CredentialsModule } from 'src/credential/credential.module';
import { UserRepository } from './user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), CredentialsModule],
    providers: [UserService, UserRepository],
    controllers: [UserController]
})
export class UserModule {}
