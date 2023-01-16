import { gql } from "@apollo/client";

export const GET_ALL_MOVIES = gql`
  query AllMovies {
    allFilms {
      films {
        episodeID
        title
        releaseDate
        openingCrawl
      }
    }
  }
`;

export const GET_MOVIE = gql`
  query getMovie($id: ID!) {
    film(filmID: $id) {
      id
      title
      episodeID
      openingCrawl
      director
      producers
      releaseDate
      speciesConnection {
        totalCount
      }
      planetConnection {
        totalCount
      }
      vehicleConnection {
        totalCount
      }
      characterConnection {
        totalCount
        characters {
          id
          name
          birthYear
          height
          mass
          homeworld {
            id
            name
          }
        }
      }
    }
  }
`;
