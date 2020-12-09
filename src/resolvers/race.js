const raceResolvers = {
  Query: {
    async race(root, { id }, { models }) {
      return models.Race.findByPk(id);
    },
    async races(root, args, { models }) {
      return models.Race.findAll();
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
  },

  Race: {
    async users(race) {
      return race.getUsers();
    },
  },
};

module.exports = raceResolvers;
