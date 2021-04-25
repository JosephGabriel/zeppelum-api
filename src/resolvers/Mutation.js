import bcrypt from "bcrypt";
import { generateToken, hashPassword, getUserId } from "../../utils/utils";

export const Mutation = {
  async logginUser(parent, { data }, { prisma }, info) {
    const user = await prisma.query.user({ where: { email: data.email } });

    if (!user) {
      throw new Error("Email ou Senha Inválido");
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new Error("Email ou Senha Inválido");
    }

    const result = await prisma.mutation.updateUser(
      {
        data: { token: generateToken(user.id) },
        where: { id: user.id },
      },
      info
    );

    return result;
  },

  async createUser(parent, { data }, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: data.email });

    if (emailTaken) {
      throw new Error("Email em uso");
    }

    const passwordHash = await hashPassword(data.password);

    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password: passwordHash,
      },
    });

    const result = await prisma.mutation.updateUser(
      {
        data: { token: generateToken(user.id) },
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

  async logginAdmin(parent, { data }, { prisma }, info) {
    const user = await prisma.query.admin({ where: { email: data.email } });

    if (!user) {
      throw new Error("Email ou Senha Inválido");
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new Error("Email ou Senha Inválido");
    }

    const result = await prisma.mutation.updateAdmin(
      {
        data: { token: generateToken(user.id) },
        where: { id: user.id },
      },
      info
    );

    return result;
  },

  async createAdmin(parent, { data }, { prisma }, info) {
    const emailTaken = await prisma.exists.Admin({ email: data.email });

    if (emailTaken) {
      throw new Error("Email em uso");
    }

    const passwordHash = await hashPassword(data.password);

    const user = await prisma.mutation.createAdmin({
      data: {
        ...data,
        password: passwordHash,
      },
    });

    const result = await prisma.mutation.updateAdmin(
      {
        data: { token: generateToken(user.id) },
        where: { id: user.id },
      },
      info
    );

    return result;
  },

  async updateAdmin(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.Admin({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    if (typeof data.password === "string") {
      data.password = await hashPassword(data.password);
    }

    const user = await prisma.mutation.updateAdmin(
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

  async deleteAdmin(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.Admin({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    const deletedUser = await prisma.mutation.deleteAdmin(
      { where: { id: userId } },
      info
    );

    return deletedUser;
  },

  async createEvent(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.Admin({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    const categoryExists = await prisma.exists.Category({ id: data.category });

    if (!categoryExists) {
      throw new Error("Categoria inválida");
    }

    const event = await prisma.mutation.createEvent(
      {
        data: {
          ...data,
          category: {
            connect: {
              id: data.category,
            },
          },
          admin: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info
    );

    return event;
  },

  async updateEvent(parent, { id, data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.Admin({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    if (typeof data.category === "string") {
      const categoryExists = await prisma.exists.Category({
        id: data.category,
      });

      if (!categoryExists) {
        throw new Error("Categoria inválida");
      }
    }

    const event = await prisma.mutation.updateEvent(
      {
        data: {
          ...data,
          category: {
            connect: {
              id: data.category,
            },
          },
          admin: {
            connect: {
              id: userId,
            },
          },
        },
        where: {
          id,
        },
      },
      info
    );

    return event;
  },

  async deleteEvent(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.Admin({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    const event = prisma.mutation.deleteEvent(
      {
        where: { id: data.id },
      },
      info
    );

    return event;
  },

  async createFavorite(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.User({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    const favorite = await prisma.mutation.createFavorite(
      {
        data: {
          event: {
            connect: {
              id: data.event,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info
    );

    return favorite;
  },

  async deleteFavorite(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.User({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    const event = await prisma.mutation.deleteFavorite(
      {
        where: {
          id,
        },
      },
      info
    );

    return event;
  },

  async createCategory(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.Admin({ id: userId });

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

    const userExists = await prisma.exists.Admin({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    const category = await prisma.mutation.updateCategory(
      { data: { name: data.name }, where: { id: data.id } },
      info
    );

    return category;
  },

  async deleteCategory(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.Admin({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    const category = await prisma.mutation.deleteCategory(
      { where: { id: data.id } },
      info
    );

    return category;
  },
};
