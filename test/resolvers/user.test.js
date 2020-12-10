const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");
const resolvers = require("../../src/resolvers/*");
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
      race {
        distance
      }
    }
  }
`;
const CREATE_LOCATION = gql`
  mutation createLocation(
    $startLat: Int!
    $startLong: Int!
    $endLat: Int!
    $endLong: Int!
    $distance: Int!
    $UserId: Int!
  ) {
    createLocation(
      startLat: $startLat
      startLong: $startLong
      endLat: $endLat
      endLong: $endLong
      distance: $distance
      UserId: $UserId
    ) {
      id
      startLat
      startLong
      endLat
      endLong
      distance
      UserId
    }
  }
`;
const CREATE_SCORE = gql`
  mutation createScore($time: Int!, $UserId: Int!) {
    createScore(time: $time, UserId: $UserId) {
      id
      time
      UserId
    }
  }
`;
const QUERY_USER = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      username
      position
      race {
        distance
      }
      location {
        startLat
        startLong
        endLat
        endLong
        distance
      }
      score {
        time
      }
    }
  }
`;

describe("User resolvers", () => {
  let server;

  beforeEach(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
      context: { models },
    });
  });

  afterAll(async () => {
    await db.sequelize.sync({ force: true });
    await db.sequelize.close();
  });
  afterEach(async () => {
    await server.stop();
  });

  it("creates a user", async () => {
    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: CREATE_RACE,
      variables: { distance: 1000 },
    });
    const resUser = await mutate({
      mutation: CREATE_USER,
      variables: { username: "testguy", RaceId: 1 },
    });
    expect(res).toMatchSnapshot();
    expect(resUser).toMatchSnapshot();
  });

  // it("fetches single race", async () => {
  //   const { query } = createTestClient(server);
  //   const res = await query({
  //     query: QUERY_RACE,
  //     variables: { id: 1 },
  //   });
  //   expect(res).toMatchSnapshot();
  //   expect(res.data).toEqual({ race: { distance: 1000, id: 1 } });
  //   expect(res.error).toEqual(undefined);
  //});
});
