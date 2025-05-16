import { Injectable } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class SeriesService {
  constructor(private databaseService: DatabaseService) {}
  async create(createSeriesDto: CreateSeriesDto) {
    return await this.databaseService.series.create({ data: createSeriesDto });
  }

  async findAll() {
    return await this.databaseService.series.findMany();
  }

  async findOne(id: string) {
    return await this.databaseService.series.findUnique({ where: { id } });
  }

  async update(id: string, updateSeriesDto: UpdateSeriesDto) {
    return await this.databaseService.series.update({
      where: { id },
      data: updateSeriesDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.series.delete({ where: { id } });
  }
}
