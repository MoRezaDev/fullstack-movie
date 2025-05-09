import { IsNotEmpty, Matches } from 'class-validator';

export class CheckOtpDto {
  @IsNotEmpty()
  @Matches(/^0?9\d{9}$/)
  mobile: string;

  @IsNotEmpty()
  @Matches(/^\d{5}$/)
  code: number;
}
