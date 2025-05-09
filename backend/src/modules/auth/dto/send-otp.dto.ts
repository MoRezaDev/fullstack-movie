import { IsNotEmpty, Matches } from 'class-validator';

export class SendOtpDto {
  @IsNotEmpty()
  @Matches(/^0?9\d{9}$/, { message: 'Invalid phone number' })
  mobile: string;
}
