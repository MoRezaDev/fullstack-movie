import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DatabaseModule } from 'src/modules/database/database.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [DatabaseModule],
  exports: [PostService],
})
export class PostModule {}
