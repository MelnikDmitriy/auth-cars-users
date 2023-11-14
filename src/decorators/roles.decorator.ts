import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/constants/permanent';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
