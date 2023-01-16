import { gql } from "@apollo/client";

export const GET_ALL_CHARACTERS = gql`
  query GET_ALL_CHARACTERS {
    allPeople(first: 200) {
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        cursor
      }
      totalCount
      people {
        id
        name
        birthYear
        height
        mass
        homeworld {
          name
        }
        filmConnection {
          films {
            title
            episodeID
          }
        }
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query getCharacter($id: ID) {
    person(personID: $id) {
      id
      name
      birthYear
      height
      mass
      homeworld {
        name
      }
      filmConnection {
        totalCount
        films {
          id
          episodeID
          title
          openingCrawl
        }
      }
    }
  }
`;
