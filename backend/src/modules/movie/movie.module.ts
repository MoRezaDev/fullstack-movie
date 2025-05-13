import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [DatabaseModule],
})
export class MovieModule {}
