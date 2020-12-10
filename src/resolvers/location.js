const locationResolvers = {
  Query: {
    async location(root, { id }, { models }) {
      return models.Location.findByPk(id);
    },
  },

  Mutation: {
    async createLocation(
      root,
      { startLat, startLong, endLat, endLong, distance, UserId },
      { models }
    ) {
      return models.Location.create({
        startLat,
        startLong,
        endLat,
        endLong,
        distance,
        UserId,
      });
    },
    async updateLocation(root, { id, endLat, endLong, distance }, { models }) {
      models.Location.update(
        {
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
  },

  Location: {
    async user(location) {
      return location.getUser();
    },
  },
};

module.exports = locationResolvers;
