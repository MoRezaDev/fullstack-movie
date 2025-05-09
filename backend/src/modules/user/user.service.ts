import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/modules/database/database.service';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findById(userId: string) {
    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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
