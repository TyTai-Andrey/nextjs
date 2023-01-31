// import qs from 'qs';
import { PeopleItemModel } from '@redux/people/interfaces';
import { BaseParams, FilterResult } from '../typings/base';
import { AxiosRequestConfig } from 'axios';

// Utils

// Types
import BaseApi from './BaseApi';

export default class PeopleApi {
  static getPeoplesList(
    params?: BaseParams,
  ): Promise<FilterResult<PeopleItemModel>> {
    const client = BaseApi.getSwapiClient();
    console.log(params);

    const options: AxiosRequestConfig = {
      url: '/people/',
      method: 'GET',
      params,
    };

    return client(options).then((response) => response.data);
  }

  static getOnePeople(id: string | number): Promise<PeopleItemModel> {
    const client = BaseApi.getSwapiClient();

    return client.get(`/people/${id}`).then((response) => response.data);
  }
}
