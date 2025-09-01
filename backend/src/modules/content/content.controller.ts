import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ContentService } from './content.service';
import { QueryContent } from './dto/content-query.dto';

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
}
