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
    async updateRaceStartTime(root, { id, startTime }, { models }) {
      models.Race.update({ startTime: startTime }, { where: { id: id } });
      return models.Race.findByPk(id);
    },
    async updateRaceEndTime(root, { id, endTime }, { models }) {
      models.Race.update({ endTime: endTime }, { where: { id: id } });
      return models.Race.findByPk(id);
    },
    async createUser(root, { username, position, raceId }, { models }) {
      return models.User.create({
        username,
        position,
        raceId,
      });
    },
    async updateUser(root, { id, position }, { models }) {
      models.User.update({ position: position }, { where: { id: id } });
      return models.User.findByPk(id);
    },
    async deleteUser(root, { id }, { models }) {
      models.User.destroy({ where: { id: id } });
      return "User successfully deleted";
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
    async updateLocation(
      root,
      { id, startLat, startLong, endLat, endLong, distance },
      { models }
    ) {
      models.Location.update(
        {
          startLat: startLat,
          startLong: startLong,
          endLat: endLat,
          endLong: endLong,
          distance: distance,
        },
        { where: { id: id } }
      );
      return models.Location.findByPk(id);
    },
    async deleteLocation(root, { id }, { models }) {
      models.Location.destroy({ where: { id: id } });
      return "Location successfully deleted";
    },
    async createScore(root, { time, userId }, { models }) {
      return models.Score.create({ time, userId });
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
