// import qs from 'qs';
import { StarshipItemModel } from '@styles/interfaces';
import { BaseParams, ErrorResponse, FilterResult } from '../typings/base';
import { AxiosRequestConfig } from 'axios';

// Utils

// Types
import BaseApi from './BaseApi';

export default class StarshipsApi {
  static async getStarshipsList(
    params?: BaseParams,
  ): Promise<FilterResult<StarshipItemModel> | ErrorResponse> {
    const client = BaseApi.getSwapiClient();

    const options: AxiosRequestConfig = {
      url: '/starships/',
      method: 'GET',
      params,
    };

    try {
      const response = await client(options);
      return response.data;
    } catch ({ message }) {
      return { isError: true, message };
    }
  }

  static async getOneStarship(
    id: string | number,
  ): Promise<(StarshipItemModel & { isError: false }) | ErrorResponse> {
    const client = BaseApi.getSwapiClient();

    return client
      .get(`/starships/${id}`)
      .then((response) => response.data)
      .catch(({ message }) => ({ isError: true, message }));
  }
}
