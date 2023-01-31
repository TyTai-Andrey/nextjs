export type N<T> = T | null;
export type NA<T> = T | 'n/a';
export type FilterResult<T> = {
  count: number;
  next: N<string>;
  previous: N<string>;
  results: N<T[]>;
};

export interface BaseParams {
  search?: string;
  page?: number;
}
