import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('toggle')
  async togglePostLike(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.togglePostLike(createLikeDto);
  }

  @Get()
  async findAll() {
    return this.likeService.findAll();
  }
}
