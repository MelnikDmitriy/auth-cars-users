import { Injectable } from '@nestjs/common';
import { CredentialsEntity } from 'src/entities/credentials.entity';
import { CredentialsRepository } from './credential.repository';

@Injectable()
export class CredentialsService {
    constructor (private readonly credentialsRepository: CredentialsRepository) {}

    checkLoginNotExistance(login: string): Promise<CredentialsEntity> {
        return this.credentialsRepository.checkLoginNotExistance(login);
    }

    checkLoginExistance(login: string): Promise<CredentialsEntity> {
        return this.credentialsRepository.checkLoginExistance(login);
    }

    getUserCredentials(userId: string): Promise<CredentialsEntity> {
        return this.credentialsRepository.getUserCredentials(userId);
    }
}
