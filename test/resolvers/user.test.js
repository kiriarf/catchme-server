const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const raceResolvers = require('../../src/resolvers/race');
const userResolvers = require('../../src/resolvers/user');
const locationResolvers = require('../../src/resolvers/location');
const scoreResolvers = require('../../src/resolvers/score');
const typeDefs = require('../../src/schema');
const models = require('../../models');
const db = require('../../models/index');

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
      users {
        id
        username
        position
      }
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
const CREATE_LOCATION = gql`
  mutation createLocation(
    $startLat: Float!
    $startLong: Float!
    $endLat: Float!
    $endLong: Float!
    $distance: Float!
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
const QUERY_USER = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      username
      position
      race {
        id
        distance
      }
      location {
        id
        startLat
        startLong
        endLat
        endLong
        distance
      }
      score {
        id
        time
      }
    }
  }
`;
const QUERY_USERS = gql`
  query {
    users {
      id
      username
      position
    }
  }
`;
const UPDATE_USER = gql`
  mutation updateUser($id: Int!, $position: Int!) {
    updateUser(id: $id, position: $position) {
      id
      position
    }
  }
`;

describe('User resolvers', () => {
  let server;

  beforeAll(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers: [raceResolvers, userResolvers, locationResolvers, scoreResolvers],
      context: { models },
    });
  });

  afterAll(async () => {
    await db.sequelize.sync({ force: true });
    await db.sequelize.close();
    await server.stop();
  });

  it('1: the race has two users', async () => {
    const { query, mutate } = createTestClient(server);
    const resCreateRace = await mutate({
      mutation: CREATE_RACE,
      variables: { distance: 1000 },
    });
    const resUser1 = await mutate({
      mutation: CREATE_USER,
      variables: { username: 'testguy', RaceId: 1 },
    });
    const resUser2 = await mutate({
      mutation: CREATE_USER,
      variables: { username: 'testguy2', RaceId: 1 },
    });
    const resRace = await query({
      query: QUERY_RACE,
      variables: { id: 1 },
    });
    expect(resRace).toMatchSnapshot();
  });

  it('2: can fetch a user with its race, location, score and updated position', async () => {
    const { query, mutate } = createTestClient(server);
    const resLoc = await mutate({
      mutation: CREATE_LOCATION,
      variables: {
        startLat: 53.12345,
        startLong: 0.12345,
        endLat: 53.12345,
        endLong: 0.12345,
        distance: 0,
        UserId: 1,
      },
    });
    const resScore = await mutate({
      mutation: CREATE_SCORE,
      variables: { time: 300000, UserId: 1 },
    });
    const updateUser1Res = await mutate({
      mutation: UPDATE_USER,
      variables: { id: 1, position: 1 },
    });
    const resUser = await query({
      query: QUERY_USER,
      variables: { id: 1 },
    });
    expect(resUser).toMatchSnapshot();
  });

  it("can fetch multiple users", async () => {
    const { query, mutate } = createTestClient(server);
    const resUsers = await query({
      query: QUERY_USERS,
    });
    expect(resUsers).toMatchSnapshot();
  });

  // it("3: can update the users' position", async () => {
  //   const { query, mutate } = createTestClient(server);
  //   const updateUser1Res = await mutate({
  //     mutation: UPDATE_USER,
  //     variables: { id: 1, position: 1 },
  //   });
  //   const updateUser2Res = await mutate({
  //     mutation: UPDATE_USER,
  //     variables: { id: 2, position: 2 },
  //   });
  //   const resUsers = await query({
  //     query: QUERY_USERS,
  //   });
  //   expect(resUsers).toMatchSnapshot();
  // });
});
