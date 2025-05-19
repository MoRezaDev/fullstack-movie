export class SubscribeDto {
  userId: string;
  is_premium: boolean;
  plan_name: string;
  expire_date: string;
  subscriptions: {
    create: {
      transaction_code?: string;
      amount?: number;
      status: 'pending' | 'success' | 'failed';
    }[];
  };
}
