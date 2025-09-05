import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { contains } from 'class-validator';
import { VerifyPremiumUserGurd } from 'src/common/gurds/verify-premium-user.gurd';
import { AdvancedSearchQuery } from './dto/advanced-search-query.dto';
import { Prisma } from 'generated/prisma';

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

  @UseGuards(VerifyPremiumUserGurd)
  async findBySlug(slug: string, user: any) {
    const decoded = decodeURIComponent(slug);
    let post = await this.databaseSerivce.post.findUnique({
      where: {
        slug: decoded,
      },
      include: {
        movie: true,
        series: true,
        anime: true,
        download_links: true,
      },
    });

    if (!post) {
      post = await this.databaseSerivce.post.findFirst({
        where: {
          slug: {
            contains: decoded,
            mode: 'insensitive',
          },
        },
        include: {
          movie: true,
          series: true,
          anime: true,
          download_links: true,
        },
      });
    }

    if (!post) return null;

    if (post && post.is_premium && user && !user.is_premium) {
      const content = post.anime
        ? post.anime
        : post.movie
          ? post.movie
          : post.series;
      const withoutDownloadLink = {
        ...post,
        download_links: null,
        content,
        movie: null,
        anime: null,
        series: null,
      };
      return withoutDownloadLink;
    }

    const content = post.anime
      ? post.anime
      : post.movie
        ? post.movie
        : post.series;

    return { ...post, content, movie: null, anime: null, series: null };
  }

  async getAdvancedSearchQuery(queryDto: AdvancedSearchQuery) {
    const { country, genre, is_dubbed, score, type, year_from, year_to } =
      queryDto;

    if (!type) {
      throw new BadRequestException('type is required!');
    }

    if (!['anime', 'movie', 'series'].includes(type!)) {
      throw new BadRequestException('type is not valid!');
    }

    const where: Prisma.PostWhereInput = {};


    if (type) where[type] = {isNot : null}
    if (year_from) where.createdAt = { gte: new Date(year_from) };
    if (year_to) where.createdAt = { lte: new Date(year_to) };
    if (country) where[type] = { contains: country, mode: 'insensitive' };
    if (genre) where[type].genre = { contains: genre, mode: 'insensitive' };
    if (score && type === 'anime' && where.anime)
      where.anime.mal_score = { gte: score };
    if (score && type !== 'anime') where[type].rating = { gte: score };
    if (is_dubbed) where[type].is_dubbed = is_dubbed === 'true' ? true : false;

    return await this.databaseSerivce.post.findMany({
      where,
      include: { [type]: true },
    });
  }
}
