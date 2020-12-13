const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const raceResolvers = require('../../src/resolvers/race');
const userResolvers = require('../../src/resolvers/user');
const locationResolvers = require('../../src/resolvers/location');
const typeDefs = require('../../src/schema');
const models = require('../../models');
const db = require('../../models/index');

const CREATE_RACE = gql`
  mutation createRace($distance: Float!) {
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
const QUERY_LOCATION = gql`
  query location($id: Int!) {
    location(id: $id) {
      id
      user {
        id
        position
        username
      }
      startLat
      startLong
      endLat
      endLong
      distance
    }
  }
`;
const UPDATE_LOCATION = gql`
  mutation updateLocation(
    $id: Int!
    $startLat: Float!
    $startLong: Float!
    $endLat: Float!
    $endLong: Float!
    $distance: Float!
  ) {
    updateLocation(
      id: $id
      startLat: $startLat
      startLong: $startLong
      endLat: $endLat
      endLong: $endLong
      distance: $distance
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
const DELETE_LOCATION = gql`
  mutation deleteLocation($id: Int!) {
    deleteLocation(id: $id)
  }
`;

describe('Location resolvers', () => {
  let server;

  beforeAll(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers: [raceResolvers, userResolvers, locationResolvers],
      context: { models },
    });
  });

  afterAll(async () => {
    await db.sequelize.sync({ force: true });
    await db.sequelize.close();
    await server.stop();
  });

  it('1: the location can be fetched with the user that belongs to', async () => {
    const { query, mutate } = createTestClient(server);
    const resCreateRace = await mutate({
      mutation: CREATE_RACE,
      variables: { distance: 1000 },
    });
    const resUser1 = await mutate({
      mutation: CREATE_USER,
      variables: { username: 'testguy', RaceId: 1 },
    });
    const resCreateLocation = await mutate({
      mutation: CREATE_LOCATION,
      variables: {
        startLat: 51.5007,
        startLong: 0.1246,
        endLat: 51.5007,
        endLong: 0.1246,
        distance: 0,
        UserId: 1,
      },
    });
    const resLocation = await query({
      query: QUERY_LOCATION,
      variables: { id: 1 },
    });
    expect(resLocation).toMatchSnapshot();
  });
  it('2: the location can be updated and fetched with the user that belongs to', async () => {
    const { query, mutate } = createTestClient(server);
    const resUpdateLocation = await mutate({
      mutation: UPDATE_LOCATION,
      variables: {
        id: 1,
        startLat: 51.4987,
        startLong: 0.1289,
        endLat: 51.4987,
        endLong: 0.1289,
        distance: 300.0,
      },
    });
    const resNewLocation = await query({
      query: QUERY_LOCATION,
      variables: { id: 1 },
    });
    expect(resNewLocation).toMatchSnapshot();
  });

  it('3: can delete the location', async () => {
    const { mutate } = createTestClient(server);
    const resDeleteLocation = await mutate({
      mutation: DELETE_LOCATION,
      variables: { id: 1 },
    });
    expect(resDeleteLocation).toMatchSnapshot();
  });
});
