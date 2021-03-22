import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const routeRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const userRole = context.getArgs()[0].user.role;

    const request = context.switchToHttp().getRequest();

    const routeUserId = request.params.userId;

    const userId = context.getArgs()[0].user.id;

    if (!routeRoles) {
      return true;
    }

    const hasRole = () => routeRoles.includes(userRole)

    if(hasRole() && userRole==="user" && routeUserId){
      if(userId===routeUserId){
        return true;
      }
      return false;
    }

    return hasRole();
  }
}