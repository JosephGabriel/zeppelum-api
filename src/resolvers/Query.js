import { getUserId } from "../../utils/utils";

export const Query = {
  async users(parent, args, { prisma }, info) {
    const users = await prisma.query.users({}, info);

    return users;
  },

  async me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const user = await prisma.query.user({ where: { id: userId } }, info);

    return user;
  },
};
