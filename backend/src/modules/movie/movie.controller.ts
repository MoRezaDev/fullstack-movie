import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  async findAll() {
    return this.movieService.findAll();
  }

  @Delete('remove-all')
  async removeAll() {
    return this.movieService.removeAll();
  }

  @Get('find-add')
  async addOrFindMovie(@Query('imdb_id') imdb_id: string) {
    return await this.movieService.addOrFindMovie(imdb_id);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
