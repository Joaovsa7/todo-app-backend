module.exports = {
  getConnection: () =>
    `${process.env.MONGO_CONNECTION_STRING}`
};
