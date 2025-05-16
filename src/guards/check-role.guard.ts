import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/decorators';
import { UserRoles } from 'src/modules';

@Injectable()
export class CheckRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    if (!roles.includes(request.role)) {
      throw new NotAcceptableException("Sizda ruhsat yo'q");
    }

    return true;
  }
}
