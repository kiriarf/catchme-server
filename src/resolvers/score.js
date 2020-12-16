const scoreResolvers = {
  Query: {
    async score(root, { id }, { models }) {
      return models.Score.findByPk(id);
    },
    async scores(root, args, { models }) {
      return models.Score.findAll();
    },
  },

  Mutation: {
    async createScore(root, { time, UserId }, { models }) {
      return models.Score.create({ time, UserId });
    },
  },

  Score: {
    async user(score) {
      return score.getUser();
    },
  },
};

module.exports = scoreResolvers;
