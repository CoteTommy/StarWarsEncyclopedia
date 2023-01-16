/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Home: undefined;
  MovieDetails: { movie_id: string };
  CharacterDetails: { character_id: string };
  Character: undefined;
  Episode: undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Episode: undefined;
  LikedCharacter: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

interface Query {
  pageInfo: PageInfo;
  edges: Edge[];
  totalCount: number;
}
export interface AllPeopleQuery extends Query {
  people: Person[];
}

export interface AllFilmsQuery extends Query {
  films: Film[];
}

export interface Edge {
  cursor: string;
}

export interface PageInfo {
  startCursor: string;
  endCursor: string;
}

export interface Person {
  id: string;
  name: string;
  birthYear: string;
  height: number | null;
  mass: number | null;
  homeworld: Homeworld;
  filmConnection: FilmConnection;
}

export interface Film {
  id: string;
  title: string;
  episodeID: number;
  openingCrawl: string;
  director: string;
  producers: string[];
  releaseDate: string;
  speciesConnection: Connection;
  planetConnection: Connection;
  vehicleConnection: Connection;
  characterConnection: CharacterConnection;
}

export interface Connection {
  totalCount: number;
}

export interface CharacterConnection extends Connection{
  characters: Person[];
}

export interface FilmConnection extends Connection{
  films: Film[];
}

// export interface Character {
//   name:      string;
//   birthYear: string;
//   height:    number;
//   mass:      number | null;
//   homeworld: Homeworld;
// }

export interface Homeworld {
  name: string;
}
