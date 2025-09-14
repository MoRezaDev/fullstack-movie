import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { SubscribeDto } from './dto/create-subscribe.dto';
import { VerifyJwtGurds } from '../../common/gurds/verify-jwt.gurd';
import { Roles, RolesGurd } from '../../common/gurds/roles.gurd';

@UseGuards(VerifyJwtGurds)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(RolesGurd)
  @Roles(['EDITOR', 'ADMIN'])
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post('sub')
  async addSubscribe(
    @Req() req: Request,
    @Body() createSubscriptionDto: SubscribeDto,
  ) {
    return this.userService.addSubscribe({
      ...createSubscriptionDto,
      userId: req['user']['userId'],
    });
  }

  @Get('delete-all')
  async deleteAll() {
    await this.userService.deleteAll();
    return { message: 'success' };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
