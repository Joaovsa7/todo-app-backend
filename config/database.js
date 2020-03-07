const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_CONNECTION_STRING;

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;