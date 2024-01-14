// import qs from 'qs';
import { FilmItemModel, StarshipItemModel } from '@styles/interfaces';
import { BaseParams, FilterResult } from '../typings/base';
import { AxiosError, AxiosRequestConfig } from 'axios';

// Utils

// Types
import BaseApi from './BaseApi';

export default class FilmsApi {
  static async getFilmsList(
    params?: BaseParams,
  ): Promise<FilterResult<FilmItemModel> | AxiosError> {
    const client = BaseApi.getSwapiClient();

    const options: AxiosRequestConfig = {
      url: '/films/',
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

  static async getOneFilm(
    id: string | number,
  ): Promise<FilmItemModel | AxiosError> {
    const client = BaseApi.getSwapiClient();

    return client
      .get(`/films/${id}`)
      .then((response) => response.data)
      .catch((error) => error);
  }
}
