import { HttpException, Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { DatabaseService } from '../database/database.service';
import Together from 'together-ai';
import axios from 'axios';
import {
  deleteAnimeFolder,
  SavePoster,
  translatePersian,
} from 'src/common/helper/functions';
import { JikanResponse } from 'src/common/types/globals.type';

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
    return await this.checkAnimeExists(id);
  }

  async update(mal_id: string, updateSeriesDto: UpdateAnimeDto) {
    return await this.databaseService.anime.update({
      where: { mal_id },
      data: updateSeriesDto,
    });
  }

  async remove(mal_id: string) {
    return await this.databaseService.$transaction(async (tx) => {
      try {
        await deleteAnimeFolder(mal_id);
        await tx.anime.delete({ where: { mal_id } });
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
  async checkAnimeExists(mal_id: string) {
    const regex = /^\d{1,7}$/;
    if (!mal_id || !regex.test(mal_id))
      throw new HttpException('فرمت آیدی شتباه است', 403);

    const foundedAnime = await this.databaseService.anime.findUnique({
      where: { mal_id },
    });
    if (!foundedAnime) throw new HttpException('آیدی در سایت موجود نیست', 404);
    return foundedAnime
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

  async findOrAddAnime(mal_id: string) {
    const foundedSeries = await this.databaseService.anime.findUnique({
      where: { mal_id },
    });
    if (foundedSeries) {
      return foundedSeries;
    }

    //getting api and check imdb type ex.movie or series
    const { data } = await axios.get(
      `${process.env.Anime_BASE_URL}/${mal_id}/full` || '',
    );

    //creating folder and file
    console.log('saving poster');
    const poster = await SavePoster(
      data.data.images.jpg.image_url,
      mal_id,
      'anime',
    );
    const jikanData = data as JikanResponse;
    const translatedDescription =
      (await translatePersian(jikanData.data.synopsis)) || '';

    try {
      return await this.databaseService.anime.create({
        data: {
          mal_id: jikanData.data.mal_id.toString(),
          title: jikanData.data.title,
          title_english: jikanData.data.title_english ?? 'N/A',
          title_japanese: jikanData.data.title_japanese || 'N/A',
          description: translatedDescription,
          year: jikanData.data.year,
          aired_from: jikanData.data.aired.from,
          broadcast: jikanData.data.broadcast.day,
          poster,
          episodes: jikanData.data.episodes.toString(),
          mal_score: jikanData.data.score.toString(),
          mal_scored_by: jikanData.data.scored_by.toString(),
          mal_popularity: jikanData.data.popularity.toString(),
          mal_rank: jikanData.data.rank.toString(),
          mal_url: jikanData.data.url,
          type: jikanData.data.type,
          duration: jikanData.data.duration,
          rating: jikanData.data.rating,
          genre: jikanData.data.genres.map((item) => item.name),
          demographics: jikanData.data.demographics.map((demo) => demo.name),
          season: jikanData.data.season,
          streaming: jikanData.data.streaming.map((stream) => stream.name),
          status: jikanData.data.status,
        },
      });
    } catch (err) {
      await deleteAnimeFolder(mal_id);
      console.log(err);
      throw new HttpException(
        'مشکلی در دخیره اطلاعات پیش آمده، دوباره تلاش کنید',
        500,
      );
    }
  }
}
