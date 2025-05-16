import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class MovieService {
  constructor(private databaseService: DatabaseService) {}
  async create(createMovieDto: CreateMovieDto) {
    return await this.databaseService.movie.create({
      data: createMovieDto,
    });
  }

  async findAll() {
    return await this.databaseService.movie.findMany();
  }

  async findOne(id: string) {
    return await this.databaseService.movie.findUnique({ where: { id } });
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    return await this.databaseService.movie.update({
      where: { id },
      data: updateMovieDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.movie.delete({where: {id}})
  }

  async removeAll() {
    return this.databaseService.movie.deleteMany();
  }
}
