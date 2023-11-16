import { UserEntity } from 'src/entities/users.entity';
import { GeneratedTokens } from 'src/token/interface/generated-tokens.interface';

export interface InfoAndTokens {
  userInfo: UserEntity;
  tokens: GeneratedTokens;
}
