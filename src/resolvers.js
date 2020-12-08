const resolvers = {
  Query: {
      async user (root, { id }, { models }) {
        return models.User.findById(id)
      },
      async race (root, { id }, { models }) {
        return models.Race.findById(id)
      },
      async users (root, args, { models }) {
            return models.User.findAll()
      },
      async locations (root, args, { models }) {
        return models.Location.findAll()
      },
      async scores (root, args, { models }) {
        return models.Score.findAll()
      },
    },

  Mutation: {
    async createRace (root, { distance, startTime, endTime }, { models }) {
        return models.Race.create({
          distance, 
          startTime,
          endTime
        })
    },
    async createUser (root, { username, position, raceId }, { models }) {
      return models.User.create({
          username,
          position,
          raceId
      })
    },
    async createLocation (root, { startLat, startLong, endLat, endLong, distance, raceId, userId }, { models }) {
      return models.Location.create({
        startLat, 
        startLong, 
        endLat, 
        endLong, 
        distance,
        raceId,
        userId
      })
    },
    async createScore (root, { time, raceId, userId }, { models }) {
      return models.User.create({ time, raceId, userId })
    },
  },
}

module.exports = resolvers