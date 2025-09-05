import {
  Body,
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Post,
  Query,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { QueryContent } from './dto/content-query.dto';
import { Response } from 'express';
import { AdvancedSearchQuery } from './dto/advanced-search-query.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  async getContent(@Query(new ValidationPipe()) queryDto: QueryContent) {
    return this.contentService.getContent(queryDto.query);
  }

  @Get('slider')
  async getContentSlider() {
    return this.contentService.getContentSlider();
  }

  @Post('find-by-slug')
  async findBySlug(
    @Body() slugDto: { slug: string },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const post = await this.contentService.findBySlug(
      slugDto.slug,
      req['user'],
    );

    if (!post) throw new NotFoundException('Post not found!');

    if (post.slug !== decodeURIComponent(slugDto.slug)) {
      return res.json({
        redirect: `/content/${encodeURIComponent(post.slug)}`,
      });
    }

    return res.json(post);
  }

  @Get('s')

  async getAdvancedSearchQuery(@Query() queryDto : AdvancedSearchQuery) {
    return this.contentService.getAdvancedSearchQuery(queryDto);
  }
}
