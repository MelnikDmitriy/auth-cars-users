import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './config/orm.config';
import { UserModule } from './user/user.module';
import { CredentialsModule } from './credential/credential.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmModuleOptions), UserModule, CredentialsModule, AuthModule, TokenModule],
  providers: [],
  controllers: []
})
export class AppModule {}
