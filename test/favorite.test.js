import "cross-fetch/polyfill";
import { getClient } from "../utils/apollo";
import {
  seedDatebase,
  userOne,
  eventOne,
  favoriteOne,
} from "../utils/test.utils";
import { createFavorite, deleteFavorite } from "../utils/favorite.operations";

beforeEach(seedDatebase);

const client = getClient();

test("Deve criar um favorito usando um usuário comum", async () => {
  const client = getClient(userOne.user.token);

  const variables = {
    data: {
      event: eventOne.event.id,
    },
  };

  const { data } = await client.mutate({ mutation: createFavorite, variables });

  expect(data.createFavorite.event.id).toBe(eventOne.event.id);
});

test("Deve deletar um favorito usando um usuário comum", async () => {
  const client = getClient(userOne.user.token);

  const variables = {
    data: favoriteOne.favorite.id,
  };

  const { data } = await client.mutate({ mutation: deleteFavorite, variables });

  expect(data.deleteFavorite.id).toBe(favoriteOne.favorite.id);
});
