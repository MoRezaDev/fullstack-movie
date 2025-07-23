import { HttpException, Injectable } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { DatabaseService } from '../database/database.service';
import Together from 'together-ai';
import axios from 'axios';
import { SavePoster, translatePersian } from 'src/common/helper/functions';

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
    return await this.databaseService.series.findUnique({
      where: { imdb_id: id },
    });
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

  //for admin
  async translateDescription(description: string) {
    const together = new Together();
    try {
      const response = await together.chat.completions.create({
        model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        messages: [
          {
            role: 'user',
            content: `this is the decription text for the movie,without any external answers like Here are a few Persian translations, with slightly different nuances, to capture the meaning of the description text:\n\n**Option 1 (More Literal) or something else...please translate this text to persian: ${description}. and please in response just show me the translated text without any other text or answers**`,
          },
        ],
      });

      return response.choices[0].message?.content;
    } catch (err) {}
  }

  async findOrAddSeries(imdb_id: string) {
    const foundedSeries = await this.databaseService.series.findUnique({
      where: { imdb_id },
    });
    if (foundedSeries) {
      return foundedSeries;
    }

    //getting api and check imdb type ex.movie or series
    const { data } = await axios.get(
      `${process.env.MOVIE_BASE_URL}i=${imdb_id}` || '',
    );

    if (typeof data === 'string' || data.Error)
      throw new HttpException(data.Error ?? 'Movie not found', 404);

    if (data.Type.toLowerCase() !== 'series') {
      throw new HttpException('آیدی وارد شده از نوع سریال نیست', 403);
    }

    //creating folder and file
    const poster = await SavePoster(data.Poster, imdb_id, 'series');
    const translatedDescription = await translatePersian(data.Plot);
  }
}
