import { AxiosError } from 'axios';

export type N<T> = T | null;
export type NA<T> = T | 'n/a';
export type FilterResult<T> = {
  count: number;
  next: N<string>;
  previous: N<string>;
  results: N<T[]>;
};

export const isErrorResponse = <T>(
  errorResponse: AxiosError | FilterResult<T> | T,
): errorResponse is AxiosError =>
  (errorResponse as AxiosError).message !== undefined &&
  (errorResponse as AxiosError).response !== undefined;

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
