export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'unpaid' | 'none';

export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
}

export interface Subscription {
  id: string;
  status: SubscriptionStatus;
  plan: Plan;
  currentPeriodEnd: string;
}
