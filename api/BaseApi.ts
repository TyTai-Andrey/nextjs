import axios from 'axios';

export default class BaseApi {
  static getSwapiClient() {
    return axios.create({
      baseURL: 'https://swapi.dev/api',
      headers: {
        // 'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }
}
