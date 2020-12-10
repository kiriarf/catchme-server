const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");
const resolvers = require("../../src/resolvers/race.js");
const typeDefs = require("../../src/schema");
const models = require("../../models");
const { createTestClient } = require("apollo-server-testing");
const db = require("../../models/index");

const CREATE_RACE = gql`
  mutation createRace($distance: Int!) {
    createRace(distance: $distance) {
      id
      distance
    }
  }
`;
const QUERY_RACE = gql`
  query race($id: Int!) {
    race(id: $id) {
      id
      distance
    }
  }
`;
describe("Race resolvers", () => {
  let server;
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
      context: { models },
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
  afterEach(async () => {
    await server.stop();
  });

  it("fetches single race", async () => {
    const { query, mutate } = createTestClient(server);
    const res = await mutate({
      mutation: CREATE_RACE,
      variables: { distance: 1000 },
    });
    expect(res).toMatchSnapshot();
  });

  it("fetches single race", async () => {
    const { query, mutate } = createTestClient(server);
    const res = await query({
      query: QUERY_RACE,
      variables: { id: 1 },
    });
    expect(res).toMatchSnapshot();
    expect(res.data).toEqual({ race: { distance: 1000, id: 1 } });
    expect(res.error).toEqual(undefined);
  });
});
