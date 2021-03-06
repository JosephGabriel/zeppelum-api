import "@babel/polyfill";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/utils";
import { prisma } from "../src/prisma";

export const userOne = {
  input: {
    name: "Joseph",
    email: "joseph@gmail.com",
    password: bcrypt.hashSync("joseph111", 10),
  },
  user: null,
  token: null,
};

export const userTwo = {
  input: {
    name: "Alice",
    email: "alice@gmail.com",
    password: bcrypt.hashSync("alice123", 10),
  },
  user: null,
  token: null,
};

export const categoryOne = {
  input: {
    name: "GraphQL",
  },
  category: null,
};

export const eventOne = {
  input: {
    img: "https://cdn.codersociety.com/uploads/graphql-reasons.png",
    title: "Prisma 101",
    price: 299.99,
    dateStart: "15/10/2021",
    dateEnd: "22/10/2021",
  },
  event: null,
};

export const eventTwo = {
  input: {
    img: "https://cdn.codersociety.com/uploads/graphql-reasons.png",
    title: "Prisma 202",
    price: 299.99,
    dateStart: "15/10/2021",
    dateEnd: "22/10/2021",
  },
  event: null,
};

export const favoriteOne = {
  favorite: null,
};

export const seedDatebase = async () => {
  await prisma.mutation.deleteManyUsers();
  await prisma.mutation.deleteManyAdmins();
  await prisma.mutation.deleteManyCategories();
  await prisma.mutation.deleteManyEvents();
  await prisma.mutation.deleteManyFavorites();

  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });

  userOne.user.token = await generateToken(userOne.user.id);

  userTwo.user = await prisma.mutation.createAdmin({
    data: userTwo.input,
  });

  userTwo.user.token = await generateToken(userTwo.user.id);

  categoryOne.category = await prisma.mutation.createCategory({
    data: categoryOne.input,
  });

  eventOne.event = await prisma.mutation.createEvent({
    data: {
      ...eventOne.input,
      category: {
        connect: {
          id: categoryOne.category.id,
        },
      },
      admin: {
        connect: {
          id: userTwo.user.id,
        },
      },
    },
  });

  favoriteOne.favorite = await prisma.mutation.createFavorite({
    data: {
      event: { connect: { id: eventOne.event.id } },
      user: { connect: { id: userOne.user.id } },
    },
  });
};
