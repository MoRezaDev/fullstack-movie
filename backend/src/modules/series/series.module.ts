import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [SeriesController],
  providers: [SeriesService],
  imports: [DatabaseModule],
})
export class SeriesModule {}
