import { FilterResult, isErrorResponse } from '@typings/base';
import { AxiosError } from 'axios';

type IsNotFound = {
  isNotFound: true;
  isServerError: string;
};
type IsServerError = {
  isServerError: string;
};

export type Data<T> = {
  data: T;
};

export type FilterResultData<T> = Data<FilterResult<T>>;

export const isServerErrorCheck = <T>(
  props: TypeReturnServerRenderDataList<T> | TypeReturnServerRenderDataItem<T>,
): props is IsServerError =>
  (props as IsServerError).isServerError !== undefined;

export const isNotFoundCheck = <T>(
  props: TypeReturnServerRenderDataList<T> | TypeReturnServerRenderDataItem<T>,
): props is IsNotFound => (props as IsNotFound).isNotFound !== undefined;

export const isFilterResultDataCheck = <T>(
  props: TypeReturnServerRenderDataList<T> | TypeReturnServerRenderDataItem<T>,
): props is FilterResultData<T> | Data<T> =>
  (props as FilterResultData<T>).data !== undefined;

export type TypeReturnServerRenderData<T> = IsNotFound | IsServerError | T;

export type TypeReturnServerRenderDataList<T> = TypeReturnServerRenderData<
  FilterResultData<T>
>;

export type TypeReturnServerRenderDataItem<T> = TypeReturnServerRenderData<
  Data<T>
>;

export const returnServerRenderDataList = <T>(
  data: AxiosError<unknown, any> | FilterResult<T>,
): TypeReturnServerRenderDataList<T> => {
  if (isErrorResponse(data)) {
    const {
      message,
      response: { status },
    } = data;

    if (status === 404)
      return {
        isNotFound: true,
        isServerError: message,
      };

    return {
      isServerError: message,
    };
  }

  return {
    data,
  };
};

export const returnServerRenderDataItem = <T>(
  data: AxiosError<unknown, any> | T,
): TypeReturnServerRenderDataItem<T> => {
  if (isErrorResponse(data)) {
    const {
      message,
      response: { status },
    } = data;

    if (status === 404)
      return {
        isNotFound: true,
        isServerError: message,
      };

    return {
      isServerError: message,
    };
  }

  return {
    data,
  };
};
