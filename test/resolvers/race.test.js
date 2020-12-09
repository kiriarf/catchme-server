const gql = require('graphql-tag');
const { ApolloServer } = require("apollo-server");
const resolvers = require("../../src/resolvers/race.js");
const typeDefs = require("../../src/schema");
const models = require("../../models");
const { createTestClient } = require('apollo-server-testing');
const db = require("../../models/index");

const CREATE_RACE = gql`
  mutation createRace($distance: Int!) {
    createRace(distance: $distance) {
      id
      distance
    }
  }
`;
describe('Race resolvers', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true })
  })

  // afterAll(() => {
  //   // Closing the DB connection allows Jest to exit successfully.
  //   // mongoose.connection.close()
  //   // await process.exit()
  //   // return db.close()
  //   // await server.close()
  // })

  it('fetches single race', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: { models },
    });
  
    const { query, mutate } = createTestClient(server);
  
    const res = await mutate({ mutation: CREATE_RACE, variables: { distance: 1000 } });
    // res.data.createRace.id = 1;
    expect(res).toMatchSnapshot();
  });
  
});
