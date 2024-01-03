import { NA } from '../typings/base';

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

export type StarshipItemModel = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: [];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type FilmItemModel = {
  title: string;
  episode_id: 4;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};
