// import qs from 'qs';
import { PeopleItemModel } from '@styles/interfaces';
import { BaseParams, FilterResult } from '../typings/base';
import { AxiosError, AxiosRequestConfig } from 'axios';

// Utils

// Types
import BaseApi from './BaseApi';

export default class PeopleApi {
  static async getPeoplesList(
    params?: BaseParams,
  ): Promise<FilterResult<PeopleItemModel> | AxiosError> {
    const client = BaseApi.getSwapiClient();

    const options: AxiosRequestConfig = {
      url: '/people/',
      method: 'GET',
      params,
    };

    return client(options)
      .then((response) => response.data)
      .catch((error) => error);
  }

  static async getOnePeople(
    id: string | number,
  ): Promise<PeopleItemModel | AxiosError> {
    const client = BaseApi.getSwapiClient();

    return client
      .get(`/people/${id}`)
      .then((response) => response.data)
      .catch((error) => error);
  }
}
