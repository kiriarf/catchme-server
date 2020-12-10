const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");
const raceResolvers = require("../../src/resolvers/race");
const userResolvers = require("../../src/resolvers/user");
const scoreResolvers = require("../../src/resolvers/score");
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
const CREATE_USER = gql`
  mutation createUser($username: String!, $RaceId: Int!) {
    createUser(username: $username, RaceId: $RaceId) {
      id
      username
      position
    }
  }
`;
const CREATE_SCORE = gql`
  mutation createScore($time: Int!, $UserId: Int!) {
    createScore(time: $time, UserId: $UserId) {
      id
      time
    }
  }
`;
const QUERY_SCORE = gql`
  query score($id: Int!) {
    score(id: $id) {
      id
      time
      user {
        id
        position
        username
      }
    }
  }
`;
describe("User resolvers", () => {
  let server;

  beforeAll(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers: [raceResolvers, userResolvers, scoreResolvers],
      context: { models },
    });
  });

  afterAll(async () => {
    await db.sequelize.sync({ force: true });
    await db.sequelize.close();
    await server.stop();
  });

  it("the score can be fetched with the user that belongs to", async () => {
    const { query, mutate } = createTestClient(server);
    const resCreateRace = await mutate({
      mutation: CREATE_RACE,
      variables: { distance: 1000 },
    });
    const resUser1 = await mutate({
      mutation: CREATE_USER,
      variables: { username: "testguy", RaceId: 1 },
    });
    const resCreateScore = await mutate({
      mutation: CREATE_SCORE,
      variables: { time: 300000, UserId: 1 },
    });
    const resScore = await query({
      query: QUERY_SCORE,
      variables: { id: 1 },
    });
    expect(resScore).toMatchSnapshot();
  });
});
