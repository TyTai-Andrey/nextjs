export type N<T> = T | null;
export type NA<T> = T | 'n/a';
export type FilterResult<T> = {
  count: number;
  isError?: false;
  next: N<string>;
  previous: N<string>;
  results: N<T[]>;
};

export interface ErrorResponse {
  isError: true;
  message: string;
}

export interface BaseParams {
  search?: string;
  page?: number;
}

export type Identity<T> = { [P in keyof T]: T[P] };
export type Replace<T, K extends keyof T, TReplace> = Identity<
  Pick<T, Exclude<keyof T, K>> & {
    [P in K]: TReplace;
  }
>;
