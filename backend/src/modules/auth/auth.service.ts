import { HttpException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { UserService } from '../user/user.service';
import { randomInt } from 'crypto';
import { CheckOtpDto } from './dto/check-otp.dto';
import { JwtService } from '@nestjs/jwt';
import { decodedUser } from '../../common/types/globals.type';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async sendOtp(sendOtpDto: SendOtpDto) {
    const user = await this.databaseService.user.findUnique({
      where: { mobile: sendOtpDto.mobile },
    });

    const otp = {
      code: randomInt(11111, 99999),
      expire_date: (Date.now() + 2 * 60 * 1000).toString(),
    };

    if (!user) {
      const newUser = await this.databaseService.user.create({
        data: {
          mobile: sendOtpDto.mobile,
          otp: {
            create: otp,
          },
        },
        include: { otp: true },
      });
      return newUser.otp;
    }

    const updatedOtp = await this.databaseService.otp.update({
      where: {
        userId: user.id,
      },
      data: otp,
      select: { code: true, expire_date: true },
    });
    return { ...updatedOtp, mobile: sendOtpDto.mobile };
  }

  async checkOtp(checkOtpDto: CheckOtpDto) {
    const user = await this.userService.findByMobile(checkOtpDto.mobile);

    const isExpired = Date.now() > parseInt(user.otp?.expire_date || '');
    const isCodeInvalid = +checkOtpDto.code !== user.otp?.code;

    if (isCodeInvalid) throw new HttpException('Invalid code', 400);
    if (isExpired) throw new HttpException('Code expired', 400);

    const token = await this.jwtService.signAsync({ userId: user.id });
    return {
      message: 'success',
      token,
    };
  }

  async getSession(decodedUser: decodedUser) {
    const { userId } = decodedUser;

    const user = await this.userService.findById(userId);
    return user;
  }
}
