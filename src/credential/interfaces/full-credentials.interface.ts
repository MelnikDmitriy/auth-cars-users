import { UserEntity } from 'src/entities/users.entity';

export interface FullCredentials {
  id: string;
  login: string;
  password: string;
  user: UserEntity;
}
