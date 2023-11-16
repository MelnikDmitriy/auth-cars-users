import { Module } from '@nestjs/common';
import { CredentialsService } from './credential.service';
import { CredentialsRepository } from './credential.repository';
import { CredentialsEntity } from 'src/entities/credentials.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CredentialsEntity])],
  providers: [CredentialsRepository, CredentialsService],
  exports: [CredentialsRepository, CredentialsService],
})
export class CredentialsModule {}
