import { GraphQLServer } from "graphql-yoga";

import { resolvers } from "./resolvers";

export const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});
