import "cross-fetch/polyfill";
import { getClient } from "../utils/apollo";
import { seedDatebase, userOne } from "../utils/test.utils";
import {
  logginUser,
  createUser,
  updateUser,
  deleteUser,
} from "../utils/user.operations";

beforeEach(seedDatebase);

const client = getClient();

test("Deve fazer login e retornar um usuário válido", async () => {
  const variables = {
    data: {
      email: "joseph@gmail.com",
      password: "joseph111",
    },
  };

  const { data } = await client.mutate({ mutation: logginUser, variables });

  expect(data.logginUser.user.email).toBe("joseph@gmail.com");
});

test("Deve criar um novo usuário e retornar o mesmo", async () => {
  const variables = {
    data: {
      email: "cronos@gmail.com",
      password: "daredevil",
      name: "José",
    },
  };

  const { data } = await client.mutate({ mutation: createUser, variables });
  expect(data.createUser.user.email).toBe("cronos@gmail.com");
});

test("Deve fazer update de um usuário", async () => {
  const client = getClient(userOne.user.token);

  const variables = {
    data: {
      email: "cronos@gmail.com",
      password: "daredevil",
      name: "José",
    },
  };

  const { data } = await client.mutate({ mutation: updateUser, variables });

  expect(data.updateUser.email).toBe("cronos@gmail.com");
});

test("Deve deletar um usuário", async () => {
  const client = getClient(userOne.user.token);

  const { data } = await client.mutate({ mutation: deleteUser });

  expect(data.deleteUser.name).toBe("Joseph");
});
