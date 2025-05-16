import { Injectable } from '@nestjs/common';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class WatchlistService {
  constructor(private databaseService: DatabaseService) {}
  async create(createWatchlistDto: CreateWatchlistDto) {
    return await this.databaseService.watchList.create({
      data: createWatchlistDto,
    });
  }

  async findAll() {
    return await this.databaseService.watchList.findMany({
      include: {
        user: true,
        posts: {
          include: { anime: true, series: true, movie: true },
        },
      },
    });
  }

  async findOne(id: string) {
    return await this.databaseService.watchList.findUnique({ where: { id } });
  }

  async update(id: string, updateWatchlistDto: UpdateWatchlistDto) {
    return await this.databaseService.watchList.update({
      where: { id },
      data: updateWatchlistDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.watchList.delete({ where: { id } });
  }
}
