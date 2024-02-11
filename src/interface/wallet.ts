import { CurrencyCode } from './currency.interface';

export type Wallet = {
  budget: number,
  currency: CurrencyCode,
  lastUpdate: Date,
  lastDailyBudgetUpdate: Date,
  dailyBudget: number
}
