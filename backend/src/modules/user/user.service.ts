import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/modules/database/database.service';
import { SubscribeDto } from './dto/create-subscribe.dto';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}
  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return this.databaseService.user.findMany({ include: { watchlist: true } });
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async addSubscribe(subscribeDto: SubscribeDto) {
    return await this.databaseService.user.update({
      where: { id: subscribeDto.userId },
      data: subscribeDto,
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
