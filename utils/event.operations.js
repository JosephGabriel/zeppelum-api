import { gql } from "apollo-boost";

export const createEvent = gql`
  mutation($data: CreateEventInput!) {
    createEvent(data: $data) {
      id
      title
    }
  }
`;

export const updateEvent = gql`
  mutation($id: ID!, $data: UpdateEventInput!) {
    updateEvent(id: $id, data: $data) {
      id
      title
    }
  }
`;

export const deleteEvent = gql`
  mutation($data: DeleteEventInput!) {
    deleteEvent(data: $data) {
      id
      title
    }
  }
`;
