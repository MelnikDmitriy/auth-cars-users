import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/constants/permanent';


export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
