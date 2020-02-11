const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(mongoUrl);
mongoose.Promise = global.Promise;

module.exports = mongoose;