import { IsNotEmpty, Matches } from 'class-validator';

export class IMDBIdParams {
  @Matches(/^tt.+$/, { message: 'فرمت وارد شده اشتباه است' })
  imdb_id: string;
}
