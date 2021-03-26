import { generateToken, hashPassword, getUserId } from "../../utils/utils";

export const Mutation = {
  async createUser(parent, { data }, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: data.email });

    if (emailTaken) {
      throw new Error("Email em uso");
    }

    const password = await hashPassword(data.password);

    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password,
      },
    });

    const result = await prisma.mutation.updateUser(
      {
        data: { ...data, token: generateToken(user.id) },
        where: { id: user.id },
      },
      info
    );

    return result;
  },

  async updateUser(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.User({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    if (typeof data.password === "string") {
      data.password = await hashPassword(data.password);
    }

    const user = await prisma.mutation.updateUser(
      {
        data,
        where: {
          id: userId,
        },
      },
      info
    );

    return user;
  },

  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.User({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    const deletedUser = await prisma.mutation.deleteUser(
      { where: { id: userId } },
      info
    );

    return deletedUser;
  },

  async createEvent(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.User({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    const postExists = await prisma.exists.Post({ id: data.category });

    if (!postExists) {
      throw new Error("Categoria inválida");
    }

    const event = await prisma.mutation.createEvent(
      {
        ...data,
        category: {
          connect: {
            id: data.category,
          },
        },
        users: {
          connect: {
            id: userId,
          },
        },
      },
      info
    );

    return event;
  },

  async updateEvent(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.User({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    if (typeof data.category === "string") {
      const postExists = await prisma.exists.Post({ id: data.category });

      if (!postExists) {
        throw new Error("Categoria inválida");
      }
    }

    const event = await prisma.mutation.updateEvent(
      {
        data: { ...data },
        where: {
          id: data.id,
        },
      },
      info
    );

    return event;
  },

  async deleteEvent(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.User({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    const event = prisma.mutation.deleteEvent(
      {
        where: { id },
      },
      info
    );

    return event;
  },

  async createCategory(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.User({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    const category = await prisma.mutation.createCategory(
      { data: { ...data } },
      info
    );

    return category;
  },

  async updateCategory(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.User({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    const category = await prisma.mutation.updateCategory(
      { data: { ...data }, where: { id: data.id } },
      info
    );

    return category;
  },

  async deleteCategory(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.User({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    const category = await prisma.mutation.deleteCategory(
      { where: { id } },
      info
    );

    return category;
  },
};
