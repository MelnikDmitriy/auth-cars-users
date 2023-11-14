import { Repository } from "typeorm";   
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { CredentialsEntity } from "src/entities/credentials.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FullCredentials } from "./interfaces/full-credentials.interface";

export class CredentialsRepository {
    constructor(
        @InjectRepository(CredentialsEntity) 
        private readonly credentialsRepository: Repository<CredentialsEntity>
        ) {}

    async checkLoginNotExistance(login: string): Promise<CredentialsEntity> {
        const credentials = await this.credentialsRepository.findOne({
            where: { login },
        });
        if (credentials) {
            throw new BadRequestException('Пользователь с таким логином уже существует');
        }

        return credentials;
    }

    async checkLoginExistance(login: string): Promise<FullCredentials> {
        const credentials = await this.credentialsRepository.findOne({
            where: {login},
            select: ['login', 'password', 'id'],
            relations: ['user']
        });

        if (!credentials) {
            throw new BadRequestException('Пользователь с таким логином не найден');
        }

        return credentials;
    }

    async getUserCredentials(userId: string): Promise<FullCredentials> {
        try {
            return this.credentialsRepository.findOne({
                where: {user: {id: userId}}
            });
        } catch(err) {
            throw new InternalServerErrorException();
        }
    }
}