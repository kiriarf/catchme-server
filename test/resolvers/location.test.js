const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");
const raceResolvers = require("../../src/resolvers/race");
const userResolvers = require("../../src/resolvers/user");
const locationResolvers = require("../../src/resolvers/location");
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
