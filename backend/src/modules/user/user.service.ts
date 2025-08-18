import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/modules/database/database.service';
import { SubscribeDto } from './dto/create-subscribe.dto';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}
  async create(createUserDto: CreateUserDto) {
    return await this.databaseService.user.create({
      data: {
        ...createUserDto,
        otp: {
          create: {
            code: 123456,
            expire_date: '123',
          },
        },
      },
    });
  }

  async findAll() {
    return this.databaseService.user.findMany({
      include: {
        watchlist: true,
        comments: true,
        likes: true,
        subscriptions: true,
      },
    });
  }

  async findById(userId: string) {
    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  async findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async deleteAll() {
    return await this.databaseService.user.deleteMany();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async addSubscribe(subscribeDto: SubscribeDto) {
    if (!subscribeDto.transaction_code)
      throw new HttpException('تراکنش انجام نشد', 403);

    //create expire date
    const expire_date =
      subscribeDto.amount === 10000
        ? (Date.now() + 30 * 24 * 60 * 60 * 1000).toString()
        : subscribeDto.amount === 50000
          ? (Date.now() + 90 * 24 * 60 * 60 * 1000).toString()
          : '0';

    return await this.databaseService.user.update({
      where: { id: subscribeDto.userId },
      data: {
        expire_date,
        plan_name: 'VIP',
        is_premium: true,
        subscriptions: {
          create: {
            amount: subscribeDto.amount,
            transaction_code: subscribeDto.transaction_code,
          },
        },
      },
    });
  }

  //utility functions
  async findByMobile(mobile: string) {
    const user = await this.databaseService.user.findUnique({
      where: { mobile },
      include: { otp: true },
    });

    if (!user) throw new HttpException('User not found', 404);
    return user;
  }
}
