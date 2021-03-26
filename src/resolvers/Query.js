import { getUserId } from "../../utils/utils";

export const Query = {
  async users(parent, args, { prisma }, info) {
    const opArgs = {};

    const users = await prisma.query.users(opArgs, info);

    return users;
  },

  async me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.User({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }
    const user = await prisma.query.user({ where: { id: userId } }, info);

    return user;
  },
};
