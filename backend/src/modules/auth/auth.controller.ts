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
import { Request, Response } from 'express';
import { CheckOtpDto } from './dto/check-otp.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { VerifyJwtGurds } from 'src/common/gurds/verify-jwt.gurd';
import { RequestWithUser } from 'src/common/types/globals.type';
import { Roles } from 'src/common/gurds/roles.gurd';

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

    return (
      res
        .cookie('token', token.token, {
          secure: true,
          sameSite: 'none',
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        })
        // .cookie('token', token.token)
        .send({ message: 'Login successful', token })
    );
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

  @Get('tt')
  async testCookie(
    @Res({ passthrough: true }) response: Response,
    @Req() req: Request,
  ) {
    console.log(req.cookies);
    response
      .cookie('test', 'test1', {
        sameSite: 'none',
        httpOnly: true,
        secure: true,
      })
      .send({ message: 'hu' });
  }
}
