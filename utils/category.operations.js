import { gql } from "apollo-boost";

export const createCategory = gql`
  mutation($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      id
      name
    }
  }
`;

export const updateCategory = gql`
  mutation($data: UpdateCategoryInput!) {
    updateCategory(data: $data) {
      id
      name
    }
  }
`;

export const deleteCategory = gql`
  mutation($data: DeleteCategoryInput!) {
    deleteCategory(data: $data) {
      id
      name
    }
  }
`;
