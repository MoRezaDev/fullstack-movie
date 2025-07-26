import { IsNotEmpty, Matches } from 'class-validator';

export class MalDto {
  @IsNotEmpty()
  @Matches(/^\d{1,7}$/, { message: 'فرمت آیدی انیمه اشتباه است' })
  mal_id: string;
}
