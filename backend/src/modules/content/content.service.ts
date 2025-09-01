import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ContentService {
  constructor(private databaseSerivce: DatabaseService) {}

  async getContent(query: string) {
    const [movies, series, animes] = await Promise.all([
      this.databaseSerivce.movie.findMany({
        where: { title: { contains: query, mode: 'insensitive' } },
        orderBy: { createdAt: 'desc' },
      }),
      this.databaseSerivce.series.findMany({
        where: { title: { contains: query, mode: 'insensitive' } },
        orderBy: { createdAt: 'desc' },
      }),
      this.databaseSerivce.anime.findMany({
        where: { title: { contains: query, mode: 'insensitive' } },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return [...movies, ...series, ...animes];
  }

  async getContentSlider() {
    const result = await this.databaseSerivce.post.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        movie: true,
        series: true,
        anime: true,
      },
    });

    const data = result.map((item) => ({
      ...item,
      content: item.anime ? item.anime : item.movie ? item.movie : item.series,
      type: item.anime ? 'anime' : item.movie ? 'movie' : 'series',
    }));
    return data;
  }
}
