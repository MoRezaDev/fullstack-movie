import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class LikeService {
  constructor(private databaseService: DatabaseService) {}
  async togglePostLike(createLikeDto: CreateLikeDto) {
    const {
      post: {
        connect: { id: postId },
      },
      user: {
        connect: { id: userId },
      },
    } = createLikeDto;
    const detectedPostWithUserLiked = await this.databaseService.post.findFirst(
      {
        where: { id: postId, likes: { some: { userId } } },
      },
    );
    if (detectedPostWithUserLiked) {
      const result = await this.databaseService.post.update({
        where: { id: detectedPostWithUserLiked.id },
        data: {
          like_count: { decrement: 1 },
          likes: { delete: { userId_postId: { userId, postId } } },
        },
      });
      return { message: 'success' };
    } else {
      const result = await this.databaseService.post.update({
        where: { id: postId },
        data: {
          like_count: { increment: 1 },
          likes: { create: { userId } },
        },
      });
      return { message: 'success' };
    }
  }

  async findAll() {
    return await this.databaseService.like.findMany({
      include: { post: true, user: true },
    });
  }
}
