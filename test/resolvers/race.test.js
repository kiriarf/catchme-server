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
      startTime
      endTime
    }
  }
`;
const QUERY_RACES = gql`
  query {
    races {
      id
      distance
    }
  }
`;
const UPDATE_RACE_START_TIME = gql`
  mutation updateRaceStartTime($id: Int!, $startTime: Int!) {
    updateRaceStartTime(id: $id, startTime: $startTime) {
      id
      startTime
    }
  }
`;
const UPDATE_RACE_END_TIME = gql`
  mutation updateRaceEndTime($id: Int!, $endTime: Int!) {
    updateRaceEndTime(id: $id, endTime: $endTime) {
      id
      endTime
    }
  }
`;

describe("Race resolvers", () => {
  let server;

  beforeAll(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
      context: { models },
    });
  });

  afterAll(async () => {
    await db.sequelize.sync({ force: true });
    await db.sequelize.close();
    await server.stop();
  });

  it("fetches single race after it is created", async () => {
    const { query, mutate } = createTestClient(server);
    const createRaceRes = await mutate({
      mutation: CREATE_RACE,
      variables: { distance: 1000 },
    });
    const raceRes = await query({
      query: QUERY_RACE,
      variables: { id: 1 },
    });
    expect(raceRes).toMatchSnapshot();
  });

  it("fetches array of two races when second race is created", async () => {
    const { query, mutate } = createTestClient(server);
    const createRaceRes = await mutate({
      mutation: CREATE_RACE,
      variables: { distance: 2000 },
    });
    const racesRes = await query({
      query: QUERY_RACES,
    });
    expect(racesRes).toMatchSnapshot();
  });

  it("can update the start and end time", async () => {
    const { query, mutate } = createTestClient(server);
    const updateRaceStartTimeRes = await mutate({
      mutation: UPDATE_RACE_START_TIME,
      variables: { id: 1, startTime: 1607598979 }
    });
    const updateRaceEndTimeRes = await mutate({
      mutation: UPDATE_RACE_END_TIME,
      variables: { id: 1, endTime: 1607698979 }
    });
    const raceRes = await query({
      query: QUERY_RACE,
      variables: { id: 1 },
    });
    expect(raceRes).toMatchSnapshot();
  });
});
