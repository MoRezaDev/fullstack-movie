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
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { MalDto } from './dto/mal-id.dto';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createAnimeDto: CreateAnimeDto) {
    return this.animeService.create(createAnimeDto);
  }

  @Get()
  async findAll() {
    return this.animeService.findAll();
  }

  //admin
  @Get('find-add')
  async findOrAddAnime(@Query() malDto: MalDto) {
    return this.animeService.findOrAddAnime(malDto.mal_id);
  }

  @Post('update-all')
  async updateAll(@Body() updateDto: UpdateAnimeDto) {
    return this.animeService.updateAll(updateDto);
  }

  @Get('remove-all')
  async removeAll() {
    return this.animeService.romeAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.animeService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAnimeDto: UpdateAnimeDto,
  ) {
    return this.animeService.update(id, updateAnimeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.animeService.remove(id);
  }
}
