import { GraphQLServer } from "graphql-yoga";

import { prisma } from "./prisma";
import { resolvers } from "./resolvers";

export const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context(request) {
    return {
      request,
      prisma,
    };
  },
});
