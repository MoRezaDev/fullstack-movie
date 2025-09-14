import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryPostDto } from './dto/query-post.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PostService {
  constructor(private databaseService: DatabaseService) {}

  async create(createPostDto: CreatePostDto) {
    return await this.databaseService.post.create({ data: createPostDto });
  }

  async findAll(page: string | null) {
    const queryPage = page ? Number(page) : 1;
    const skip = (queryPage - 1) * 8;

    return await this.databaseService.post.findMany({
      skip,
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: {
        movie: true,
        series: true,
        anime: true,
      },
    });
  }

  async getLastPostsByType(type: 'anime' | 'movie' | 'series') {
    if (!['anime', 'movie', 'series'].includes(type)) {
      throw new BadRequestException('type is not valid!');
    }

    const result = await this.databaseService.post.findMany({
      where: {
        [type]: { isNot: null },
      },
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { [type]: true },
    });

    return result.map((item) => ({ ...item, content: item[type], type }));
  }

  async searchPost(queryDto: QueryPostDto) {
    return await this.databaseService.post.findMany({
      where: { title: { contains: queryDto.query, mode: 'insensitive' } },
      include: {
        anime: true,
        movie: true,
        series: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return await this.databaseService.post.findUnique({
      where: {
        id,
      },
      include: {
        anime: { where: { NOT: { title: undefined } } },
        movie: { where: { NOT: { title: undefined } } },
        series: { where: { NOT: { title: undefined } } },
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      const [deletedPost, updated] = await this.databaseService.$transaction([
        this.databaseService.downloadLink.deleteMany({ where: { postId: id } }),
        this.databaseService.post.update({
          where: { id },
          data: updatePostDto,
        }),
      ]);
      return updated;
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }

  async remove(id: string) {
    return await this.databaseService.post.delete({ where: { id } });
  }
}
