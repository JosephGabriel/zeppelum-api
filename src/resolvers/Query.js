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

  async event(parent, { id }, { prisma }, info) {
    const event = await prisma.query.event({ where: { id } }, info);

    if (!event) {
      throw new Error("Evento inválido");
    }

    return event;
  },

  async events(parent, { query, first, skip, orderBy }, { prisma }, info) {
    const opArgs = {
      first,
      skip,
      orderBy,
    };

    if (query) {
      opArgs.where.OR = [
        {
          title_contains: query,
        },
      ];
    }

    const events = await prisma.query.events(opArgs, info);

    return events;
  },

  async relatedEvents(parent, { query, first, skip }, { prisma }, info) {
    const opArgs = {
      first,
      skip,
    };

    opArgs.where = {
      title_contains: query,
    };

    const events = await prisma.query.events(opArgs, info);

    return events;
  },

  async categories(parent, args, { prisma }, info) {
    const categories = await prisma.query.categories({}, info);

    return categories;
  },

  async favorites(parent, args, { prisma, request }, info) {
    const userId = await getUserId(request);

    const favorites = await prisma.query.favorites(
      {
        where: {
          user: {
            id: userId,
          },
        },
      },
      info
    );

    return favorites;
  },
};
