import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class VerifyJwtGurds implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: any = context.switchToHttp().getRequest();

    const token = request.cookies['token'] || request.headers['authorization'];

    if (!token) {
      throw new HttpException('Unauthorized', 401);
    }

    //verifying
    try {
      const result = await this.jwtService.verifyAsync(token);
      request.user = result;
      return true;
    } catch (err) {
      throw new HttpException(err, err.code || 401);
    }
  }
}
