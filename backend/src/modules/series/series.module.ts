import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [SeriesController],
  providers: [SeriesService],
  imports: [DatabaseService],
})
export class SeriesModule {}
