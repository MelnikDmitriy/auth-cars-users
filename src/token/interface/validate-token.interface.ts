import { UserEntity } from 'src/entities/users.entity';

export interface ValidateToken {
  payload: UserEntity;
  iat: number;
  exp: number;
}
