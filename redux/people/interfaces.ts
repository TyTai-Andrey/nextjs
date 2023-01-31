import { NA } from '../../typings/base';

export type PeopleItemModel = {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: NA<'Male' | 'female'>;
  hair_color: NA<string>;
  height: string | number;
  homeworld: string;
  mass: string | number;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
};
