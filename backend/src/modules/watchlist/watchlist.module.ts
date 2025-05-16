import { Module } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistController } from './watchlist.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [WatchlistController],
  providers: [WatchlistService],
  imports: [DatabaseModule],
})
export class WatchlistModule {}
