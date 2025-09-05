import { IsNotEmpty, Matches } from 'class-validator';

export class AdvancedSearchQuery {
  type?: string;
  year_from?: string;
  year_to?: string;
  genre?: string;
  country?: string;
  score?: string;
  is_dubbed?: string;
}
