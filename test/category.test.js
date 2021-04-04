import "cross-fetch/polyfill";
import { getClient } from "../utils/apollo";
import { seedDatebase, userTwo, categoryOne } from "../utils/test.utils";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../utils/category.operations";

beforeEach(seedDatebase);

const client = getClient();

test("Deve criar uma categoria usando um administrador", async () => {
  const client = getClient(userTwo.user.token);

  const variables = {
    data: {
      name: "Desenvolvimento Web",
    },
  };

  const { data } = await client.mutate({ mutation: createCategory, variables });

  expect(data.createCategory.name).toBe("Desenvolvimento Web");
});

test("Deve atualizar uma categoria usando um administrador", async () => {
  const client = getClient(userTwo.user.token);

  const variables = {
    data: {
      id: categoryOne.category.id,
      name: "Desenvolvimento Web",
    },
  };

  const { data } = await client.mutate({ mutation: updateCategory, variables });

  expect(data.updateCategory.name).toBe("Desenvolvimento Web");
});

test("Deve apagar uma categoria usando um administrador", async () => {
  const client = getClient(userTwo.user.token);

  const variables = {
    data: {
      id: categoryOne.category.id,
    },
  };

  const { data } = await client.mutate({ mutation: deleteCategory, variables });

  expect(data.deleteCategory.name).toBe("GraphQL");
});
