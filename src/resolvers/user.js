const userResolvers = {
  Query: {
    async user(root, { id }, { models }) {
      return models.User.findByPk(id);
    },
    async users(root, args, { models }) {
      return models.User.findAll();
    },
  },

  Mutation: {
    async createUser(root, { username, position, RaceId }, { models }) {
      return models.User.create({
        username,
        position,
        RaceId,
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
};

module.exports = userResolvers;
