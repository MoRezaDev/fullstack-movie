import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [ContentController],
  providers: [ContentService,DatabaseService],
})
export class ContentModule {}
