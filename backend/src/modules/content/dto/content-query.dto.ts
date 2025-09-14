import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { normalizeTitle } from '../../../common/helper/functions';

export class QueryContent {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => normalizeTitle(value))
  query: string;
}
