import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [AnimeController],
  providers: [AnimeService],
  imports: [DatabaseModule],
})
export class AnimeModule {}
