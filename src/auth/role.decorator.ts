import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../user/user.entity';

export type AllowedRoles = keyof typeof UserRole | 'Any';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Role = (roles: AllowedRoles[]) => SetMetadata('roles', roles);
