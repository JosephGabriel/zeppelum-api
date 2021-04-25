import "cross-fetch/polyfill";
import { getClient } from "../utils/apollo";
import {
  seedDatebase,
  userTwo,
  categoryOne,
  eventOne,
  eventTwo,
} from "../utils/test.utils";
import {
  createEvent,
  updateEvent,
  deleteEvent,
} from "../utils/event.operations";

beforeEach(seedDatebase);

const client = getClient();

test("Deve criar um evento usando um administrador", async () => {
  const client = getClient(userTwo.user.token);

  const variables = {
    data: {
      ...eventTwo.input,
      category: categoryOne.category.id,
    },
  };

  const { data } = await client.mutate({ mutation: createEvent, variables });

  expect(data.createEvent.title).toBe("Prisma 202");
});

test("Deve atualizar um evento usando um administrador", async () => {
  const client = getClient(userTwo.user.token);

  const variables = {
    data: {
      title: "GraphQL 2021",
      category: categoryOne.category.id,
    },
    id: eventOne.event.id,
  };

  const { data } = await client.mutate({ mutation: updateEvent, variables });

  expect(data.updateEvent.title).toBe("GraphQL 2021");
});

test("Deve apagar um evento usando um administrador", async () => {
  const client = getClient(userTwo.user.token);

  const variables = {
    data: {
      id: eventOne.event.id,
    },
  };

  const { data } = await client.mutate({ mutation: deleteEvent, variables });

  expect(data.deleteEvent.title).toBe("Prisma 101");
});
