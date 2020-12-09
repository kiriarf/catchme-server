const { gql } = require("apollo-server");

const typeDefs = gql`
  type Race {
    id: Int!
    distance: Int!
    startTime: Int
    endTime: Int
    users: [User]
  }

  type User {
    id: Int!
    username: String!
    position: Int
    race: Race!
    location: Location
    score: Score
  }

  type Location {
    id: Int!
    startLat: Float!
    startLong: Float!
    endLat: Float!
    endLong: Float!
    distance: Float!
    user: User!
  }

  type Score {
    id: Int!
    time: Int!
    user: User!
  }

  type Query {
    user(id: Int!): User!
    users: [User]
    race(id: Int!): Race!
    location: Location
    score: Score
    races: [Race]
  }

  type Mutation {
    createRace(distance: Int!, startTime: Int, endTime: Int): Race!
    createUser(username: String!, position: Int, raceId: Int!): User!
    createLocation(
      startLat: Float!
      startLong: Float!
      endLat: Float!
      endLong: Float!
      distance: Float!
      userId: Int!
    ): Location!
    createScore(time: Int!, userId: Int!): Score!
    updateUser(id: Int!, position: Int!): User!
    deleteUser(id: Int!): String!
    updateRaceStartTime(id: Int!, startTime: Int!): Race!
    updateRaceEndTime(id: Int!, endTime: Int!): Race!
    updateLocation(
      id: Int!
      startLat: Float!
      startLong: Float!
      endLat: Float!
      endLong: Float!
      distance: Float!
    ): Location!
    deleteLocation(id: Int!): String!
  }
`;

module.exports = typeDefs;
