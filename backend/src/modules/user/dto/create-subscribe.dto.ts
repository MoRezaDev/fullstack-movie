import { IsNotEmpty, Matches, Max, Min } from 'class-validator';

export class SubscribeDto {
  userId: string;
  is_premium: boolean;
  plan_name?: string;
  expire_date?: string;
  transaction_code: string;

  @IsNotEmpty()
  @Min(10000, { message: 'Invalid Amount babe! (min 10000)' })
  @Max(99999, { message: 'Invalid Amount babe! (max 99999)' })
  amount: number;
  subscriptions?: {
    create: {
      transaction_code?: string;
      amount?: number;
      status: 'pending' | 'success' | 'failed';
    }[];
  };
}
