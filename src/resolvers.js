const resolvers = {
  Query: {
    async user(root, { id }, { models }) {
      return models.User.findByPk(id);
    },
    async users(root, args, { models }) {
      return models.User.findAll();
    },
    async race(root, { id }, { models }) {
      return models.Race.findByPk(id);
    },
    async races(root, args, { models }) {
      return models.Race.findAll();
    },
    async location(root, { id }, { models }) {
      return models.Location.findByPk(id);
    },
    async score(root, { id }, { models }) {
      return models.Score.findByPk(id);
    },
  },

  Mutation: {
    async createRace(root, { distance, startTime, endTime }, { models }) {
      return models.Race.create({
        distance,
        startTime,
        endTime,
      });
    },
    async createUser(root, { username, position, raceId }, { models }) {
      return models.User.create({
        username,
        position,
        raceId,
      });
    },
    async createLocation(
      root,
      { startLat, startLong, endLat, endLong, distance, userId },
      { models }
    ) {
      return models.Location.create({
        startLat,
        startLong,
        endLat,
        endLong,
        distance,
        userId,
      });
    },
    async createScore(root, { time, userId }, { models }) {
      return models.Score.create({ time, userId });
    },
    async updateUser(root, { id, position }, { models }) {
      return models.User.update({ position: position }, { where: { id: id } });
    },
  },

  Race: {
    async users(race) {
      return race.getUsers();
    },
  },

  User: {
    async race(user) {
      return user.getRace();
    },
    async location(user) {
      return user.getLocation();
    },
    async score(user) {
      return user.getScore();
    },
  },

  Location: {
    async user(location) {
      return location.getUser();
    },
  },

  Score: {
    async user(score) {
      return score.getUser();
    },
  },
};

module.exports = resolvers;
