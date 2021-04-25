import { gql } from "apollo-boost";

export const createFavorite = gql`
  mutation($data: CreateFavoriteInput!) {
    createFavorite(data: $data) {
      id
      event {
        id
      }
    }
  }
`;

export const deleteFavorite = gql`
  mutation($data: ID!) {
    deleteFavorite(id: $data) {
      id
    }
  }
`;
