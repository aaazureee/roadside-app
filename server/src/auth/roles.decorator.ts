import { SetMetadata } from '@nestjs/common';

export const RequiresRoles = (...roles: string[]) => {
  return SetMetadata('roles', roles);
};
