import { Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AnimeService {
  constructor(private databaseService: DatabaseService) {}
  async create(createAnimeDto: CreateAnimeDto) {
    return await this.databaseService.anime.create({ data: createAnimeDto });
  }

  async findAll() {
    return await this.databaseService.anime.findMany();
  }

  async findOne(id: string) {
    return await this.databaseService.anime.findUnique({ where: { id } });
  }

  async update(id: string, updateAnimeDto: UpdateAnimeDto) {
    return await this.databaseService.anime.update({
      where: { id },
      data: updateAnimeDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.anime.delete({ where: { id } });
  }
}
