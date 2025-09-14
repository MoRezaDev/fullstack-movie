import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DatabaseService } from '../../modules/database/database.service';

export const Roles = Reflector.createDecorator<string[]>();

@Injectable()
export class RolesGurd implements CanActivate {
  constructor(
    private databaseService: DatabaseService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.user;

    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new HttpException('no user found', 401);

    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles || !roles.includes(user.role))
      throw new HttpException('Access Denied', 401);
    return true;
  }
}
