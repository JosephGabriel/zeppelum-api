import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../src/prisma";

export const userOne = {
  input: {
    name: "Joseph",
    email: "joseph@gmail.com",
    password: bcrypt.hashSync("joseph111", 10),
  },
  user: null,
};

export const userTwo = {
  input: {
    name: "Alice",
    email: "alice@gmail.com",
    password: bcrypt.hashSync("alice123", 10),
  },
  user: null,
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

export const favoriteOne = {
    favorite: null
}

export const seedDatebase = () => {
    await prisma.mutation.deleteManyUsers();
    await prisma.mutation.deleteManyEvents();
    await prisma.mutation.deleteManyFavorites();
    await prisma.mutation.deleteManyCategories();


  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });

  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input,
  });

  categoryOne.category = await prisma.mutation.createCategory({
      data:userOne.input,
  })

  eventOne.event = await prisma.mutation.createEvent({
      data:{
          ...userOne.input,
          category:{
              connect:{
                  id: categoryOne.category.id
              }
          },
          users: { 
              connect: { 
                  id: userOne.user.id 
            } 
        }
      }
  })

  favoriteOne.favorite = await prisma.mutation.createFavorite({
    data: { 
        event: {
             connect: {
                  id: eventOne.event.id
            } 
        },
        user: { 
            connect: {
                 id: userOne.user.id
            } 
        }
    }
  })
}