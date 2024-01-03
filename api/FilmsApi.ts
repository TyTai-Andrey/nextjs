// import qs from 'qs';
import { StarshipItemModel } from '@styles/interfaces';
import { BaseParams, ErrorResponse, FilterResult } from '../typings/base';
import { AxiosRequestConfig } from 'axios';

// Utils

// Types
import BaseApi from './BaseApi';

export default class FilmsApi {
  static async getFilmsList(
    params?: BaseParams,
  ): Promise<FilterResult<StarshipItemModel> | ErrorResponse> {
    const client = BaseApi.getSwapiClient();

    const options: AxiosRequestConfig = {
      url: '/films/',
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

  static async getOneFilm(
    id: string | number,
  ): Promise<(StarshipItemModel & { isError: false }) | ErrorResponse> {
    const client = BaseApi.getSwapiClient();

    return client
      .get(`/films/${id}`)
      .then((response) => response.data)
      .catch(({ message }) => ({ isError: true, message }));
  }
}
