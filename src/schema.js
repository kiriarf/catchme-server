const { gql } = require('apollo-server');

const typeDefs = gql`
  type Race {
    id: Int!
    distance: Float!
    startTime: Float
    endTime: Float
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
    time: Float!
    user: User!
  }

  type Query {
    user(id: Int!): User!
    users: [User]!
    race(id: Int!): Race!
    location(id: Int!): Location!
    score(id: Int!): Score!
    races: [Race]!
    scores: [Score]!
  }

  type Mutation {
    createRace(distance: Float!, startTime: Float, endTime: Float): Race!
    createUser(username: String!, position: Int, RaceId: Int!): User!
    createLocation(
      startLat: Float!
      startLong: Float!
      endLat: Float!
      endLong: Float!
      distance: Float!
      UserId: Int!
    ): Location!
    createScore(time: Float!, UserId: Int!): Score!
    updateUser(id: Int!, position: Int!): User!
    updateRaceStartTime(id: Int!, startTime: Float!): Race!
    updateRaceEndTime(id: Int!, endTime: Float!): Race!
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
