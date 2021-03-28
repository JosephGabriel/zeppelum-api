import { gql } from "apollo-boost";

export const logginUser = gql`
  mutation($data: LogginUserInput!) {
    logginUser(data: $data) {
      id
      name
      email
    }
  }
`;

export const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      name
      email
      password
      token
    }
  }
`;

export const updateUser = gql`
  mutation($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      name
      email
      password
      token
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
      token
    }
  }
`;
