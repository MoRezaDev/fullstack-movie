import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { Response } from 'express';
import { CheckOtpDto } from './dto/check-otp.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { VerifyJwtGurds } from 'src/common/gurds/verify-jwt.gurd';
import { RequestWithUser } from 'src/common/types/globals.type';

@SkipThrottle()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipThrottle({ default: false })
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('send-otp')
  async sendOtp(@Body(new ValidationPipe()) sendOtpDto: SendOtpDto) {
    return await this.authService.sendOtp(sendOtpDto);
  }

  @Post('check-otp')
  async checkOtp(
    @Body(new ValidationPipe()) checkOtpDto: CheckOtpDto,
    @Res() res: Response,
  ) {
    const token = await this.authService.checkOtp(checkOtpDto);
    res.cookie('token', token.token, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });
    return res.send({ message: 'Login successful' });
  }

  @UseGuards(VerifyJwtGurds)
  @Get('session')
  async getSession(@Req() req: RequestWithUser) {
    return await this.authService.getSession(req.user);
  }

  @Get('test-otp')
  // @UseGuards(VerifyJwtGurds)
  async test() {
    // return 'test';
    throw new TypeError('test1111');
  }
}
