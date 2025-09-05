import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/modules/database/database.service';

@Injectable()
export class VerifyPremiumUserGurd implements CanActivate {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    let tokenFromHeader = request.headers['Authorization'];

    if (tokenFromHeader && tokenFromHeader.startsWith('Bearer ')) {
      tokenFromHeader = request.headers['Authorization'].split(' ')[1];
    }

    const token = request.cookies['token'] || tokenFromHeader;

    if (!token) {
      request.user = null;
    }

    //verifying
    try {
      const result = await this.jwtService.verifyAsync(token);
      const user = await this.databaseService.user.findUnique({
        where: { id: result.userId },
      });

      // verifying premium
      if (!user) {
        request.user = null;
      }

      if (user && user.is_premium) {
        const now = Date.now();
        if (Number(user.expire_date) < now) {
          await this.databaseService.user.update({
            where: { id: user.id },
            data: { is_premium: false, expire_date: '0', plan_name: 'free' },
          });
          request.user = { is_premium: false };
        }
        request.user = {is_premium: true};
      }
    } catch (err) {
      request.user = null;
    }

    return true;
  }
}
