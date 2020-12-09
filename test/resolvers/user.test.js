// const gql = require('graphql-tag');
// const { ApolloServer } = require("apollo-server");
// const resolvers = require("../../src/resolvers/user.js");
// const typeDefs = require("../../src/schema");
// const models = require("../../models");
// const { createTestClient } = require('apollo-server-testing');

// const CREATE_USER = gql`
//   mutation createUser($username: String!, $RaceId: Int!) {
//     createUser(username: $username, RaceId: $RaceId ) {
//       id
//       username
//       position
//       race {
//         distance
//       }
//     }
//   }
// `;

// it('creates single user', async () => {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: { models },
//   });

//   const { query, mutate } = createTestClient(server);

//   const res = await mutate({ mutation: CREATE_USER, variables: { username: "testboy", RaceId: 1 } });
//   console.log(res);
//   console.log(res.data.createUser.race);
//   res.data.createUser.id = 1;
//   expect(res).toMatchSnapshot();
//   expect(res.data.createUser.race.distance).toEqual(1000);
// });