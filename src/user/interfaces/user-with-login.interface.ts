import { UserEntity } from 'src/entities/users.entity';

export interface UserWithLogin extends UserEntity {
  login: string;
}
