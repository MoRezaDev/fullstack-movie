import { Prisma } from 'generated/prisma';

export class CreateUserDto implements Prisma.UserCreateInput {
  mobile: string;
  role?: string;
  plan_name?: string;
  expire_date?: string;
  name?: string;

  subscriptions?: Prisma.SubscriptionCreateNestedManyWithoutUserInput;
}
