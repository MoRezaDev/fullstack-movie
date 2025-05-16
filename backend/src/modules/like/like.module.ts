import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [LikeController],
  providers: [LikeService],
  imports: [DatabaseModule],
})
export class LikeModule {}
