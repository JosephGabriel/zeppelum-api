import { gql } from "apollo-boost";

export const logginUser = gql`
  mutation ($data: LogginUserInput!) {
    logginUser(data: $data) {
      user {
        id
        name
        email
      }
    }
  }
`;

export const createUser = gql`
  mutation ($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        email
        password
      }
    }
  }
`;

export const updateUser = gql`
  mutation ($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      name
      email
      password
    }
  }
`;

export const deleteUser = gql`
  mutation {
    deleteUser {
      id
      name
      email
      password
    }
  }
`;
