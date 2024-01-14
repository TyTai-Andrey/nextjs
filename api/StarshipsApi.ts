// import qs from 'qs';
import { StarshipItemModel } from '@styles/interfaces';
import { BaseParams, FilterResult } from '../typings/base';
import { AxiosError, AxiosRequestConfig } from 'axios';

// Utils

// Types
import BaseApi from './BaseApi';

export default class StarshipsApi {
  static async getStarshipsList(
    params?: BaseParams,
  ): Promise<FilterResult<StarshipItemModel> | AxiosError> {
    const client = BaseApi.getSwapiClient();

    const options: AxiosRequestConfig = {
      url: '/starships/',
      method: 'GET',
      params,
    };

    try {
      const response = await client(options);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async getOneStarship(
    id: string | number,
  ): Promise<StarshipItemModel | AxiosError> {
    const client = BaseApi.getSwapiClient();

    return client
      .get(`/starships/${id}`)
      .then((response) => response.data)
      .catch(({ message }) => ({ isError: true, message }));
  }
}
