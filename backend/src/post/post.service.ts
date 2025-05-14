import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DatabaseService } from 'src/modules/database/database.service';

@Injectable()
export class PostService {
  constructor(private databaseService: DatabaseService) {}
  async create(createPostDto: CreatePostDto) {
    return await this.databaseService.post.create({
      data: createPostDto,
    });
  }

  async findAll() {
    return await this.databaseService.post.findMany({
      include: {
        anime: true,
        movie: true,
        series: true,
      },
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
