const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const models = require("../models");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
  introspection: true,
  playground: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// server.listen(
//   {
//     port: env === 'production'? process.env.Port : 4000
//   }
// )
