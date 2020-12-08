const { gql } = require('apollo-server')

const typeDefs = gql`
    type Race {
      id: Int!
      distance: Int!
      startTime: Int
      endTime: Int
      users: [User]
      locations: [Location]
      scores: [Score]
      }

    type User {
      id: Int!
      username: String!
      position: Int
      race: Race!
      locations: [Location]
      scores: [Score]
    }

    type Location {
      id: Int!
      startLat: Float!
      startLong: Float!
      endLat: Float!
      endLong: Float!
      distance: Float!
      race: Race!
      user: User!
    }

    type Score {
      id: Int!
      time: Int!
      race: Race!
      user: User!
    }

    type Query {
        user(id: Int!): User
        users: [User]
        race(id: Int!): Race!
        locations: [Location]
        scores: [Score]
    }

    type Mutation {
        createRace(distance: Int!, startTime: Int, endTime: Int): Race!
        createUser(username: String!, position: Int, raceId: Int!): User!
        createLocation(
          startLat: Float!, 
          startLong: Float!, 
          endLat: Float!, 
          endLong: Float!, 
          distance: Float!,
          raceId: Int!,
          userId: Int!): Location!
        createScore(time: Int!, raceId: Int!, userId: Int!): Score!

    }
`

module.exports = typeDefs

// query {
//   race {
//     dist
//     ..
//     users {
//       [
//         user1 {
//           username
//           location {
//             start
//             end
//             ...
//           }
//           score {
//             time
//             ...
//           }
//         }
//       ]
//     }
//   }
// }