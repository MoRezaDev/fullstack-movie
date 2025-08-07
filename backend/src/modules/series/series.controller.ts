import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { SeriesService } from './series.service';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { IMDBIdParams } from './dto/imdb_id-params.dto';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Post()
  create(@Body(new ValidationPipe()) createSeriesDto: CreateSeriesDto) {
    return this.seriesService.create(createSeriesDto);
  }

  @Get()
  findAll() {
    return this.seriesService.findAll();
  }

  //for admin

  @Get('find-add')
  async findOrAddSeries(@Query() imdbIdDto: IMDBIdParams) {
    return await this.seriesService.findOrAddSeries(imdbIdDto.imdb_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeriesDto: UpdateSeriesDto) {
    return this.seriesService.update(id, updateSeriesDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.seriesService.remove(id);
  }
}
