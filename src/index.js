const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const raceResolvers = require("./resolvers/race");
const userResolvers = require("./resolvers/user");
const locationResolvers = require("./resolvers/location");
const scoreResolvers = require("./resolvers/score");
const models = require("../models");

const server = new ApolloServer({
  typeDefs,
  resolvers: [raceResolvers, userResolvers, locationResolvers, scoreResolvers],
  context: { models },
  introspection: true,
  playground: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

module.exports = server;

// server.listen(
//   {
//     port: env === 'production'? process.env.Port : 4000
//   }
// )
