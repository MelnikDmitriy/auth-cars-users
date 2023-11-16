import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CredentialsModule } from 'src/credential/credential.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [CredentialsModule, TokenModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
