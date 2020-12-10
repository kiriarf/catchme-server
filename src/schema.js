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
    users: [User]!
    race(id: Int!): Race!
    location(id: Int!): Location!
    score(id: Int!): Score!
    races: [Race]!
  }

  type Mutation {
    createRace(distance: Int!, startTime: Int, endTime: Int): Race!
    createUser(username: String!, position: Int, RaceId: Int!): User!
    createLocation(
      startLat: Float!
      startLong: Float!
      endLat: Float!
      endLong: Float!
      distance: Float!
      UserId: Int!
    ): Location!
    createScore(time: Int!, UserId: Int!): Score!
    updateUser(id: Int!, position: Int!): User!
    updateRaceStartTime(id: Int!, startTime: Int!): Race!
    updateRaceEndTime(id: Int!, endTime: Int!): Race!
    updateLocation(
      id: Int!
      endLat: Float!
      endLong: Float!
      distance: Float!
    ): Location!
    deleteLocation(id: Int!): String!
  }
`;

module.exports = typeDefs;
