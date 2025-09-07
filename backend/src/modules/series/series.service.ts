import { HttpException, Injectable } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { DatabaseService } from '../database/database.service';
import Together from 'together-ai';
import axios from 'axios';
import {
  deleteSeriesFolder,
  SavePoster,
  translatePersian,
} from 'src/common/helper/functions';
import { OmdbSeriesResponse } from 'src/common/types/globals.type';

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
    return await this.checkSeriesExists(id);
  }

  async update(imdb_id: string, updateSeriesDto: UpdateSeriesDto) {
    return await this.databaseService.series.update({
      where: { imdb_id },
      data: updateSeriesDto,
    });
  }

  async updateAll(updateDto: UpdateSeriesDto) {
    return await this.databaseService.series.updateMany({ data: updateDto });
  }

  async remove(imdb_id: string) {
    return await this.databaseService.$transaction(async (tx) => {
      try {
        await deleteSeriesFolder(imdb_id);
        await tx.series.delete({ where: { imdb_id } });
        return { status: 'success' };
      } catch (err) {
        throw new HttpException(
          'مشکلی در حذف بوجود آمده، دوباره تلاش کنید',
          500,
        );
      }
    });
  }

 

  //for admin
  async checkSeriesExists(imdb_id: string) {
    const regex = /^tt.+$/;
    if (!imdb_id || !regex.test(imdb_id))
      throw new HttpException('فرمت آیدی شتباه است', 403);

    const foundedSeries = await this.databaseService.series.findUnique({
      where: { imdb_id },
    });
    if (!foundedSeries) throw new HttpException('آیدی در سایت موجود نیست', 404);
    return foundedSeries;
  }

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
      `${process.env.MOVIE_BASE_URL}i=${imdb_id}&plot=full` || '',
    );

    const { data: backgroundData } = await axios.get(
      `https://api.themoviedb.org/3/find/${imdb_id}?external_source=imdb_id`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      },
    );

    if (typeof data === 'string' || data.Error)
      throw new HttpException(data.Error ?? 'Movie not found', 404);

    if (data.Type.toLowerCase() !== 'series') {
      throw new HttpException('آیدی وارد شده از نوع سریال نیست', 403);
    }

    //creating folder and file
    const [poster, backgroundPoster] = await SavePoster(
      data.Poster,
      imdb_id,
      'series',
      `https://image.tmdb.org/t/p/w1280/${backgroundData.tv_results[0].backdrop_path}`,
    );
    const translatedDescription = await translatePersian(data.Plot);
    const newData: OmdbSeriesResponse = data;

    try {
      return await this.databaseService.series.create({
        data: {
          title: newData.Title,
          description: translatedDescription || newData.Plot,
          duration: newData.Runtime,
          imdb_id: newData.imdbID,
          year: Number(newData.Year.replace(/[^\d]/g, '')),
          director: newData.Director,
          genre: newData.Genre.split(', '),
          rating: newData.imdbRating,
          total_seasons: +newData.totalSeasons,
          country: newData.Country,
          stars: newData.Actors.split(', '),
          released: newData.Released,
          language: newData.Language.split(', '),
          poster,
          images_url: backgroundPoster ? [backgroundPoster] : [],
        },
      });
    } catch (err) {
      await deleteSeriesFolder(imdb_id);
      console.log(err);
      throw new HttpException(
        'مشکلی در دخیره اطلاعات پیش آمده، دوباره تلاش کنید',
        500,
      );
    }
  }
}
