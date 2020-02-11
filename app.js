require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./config/database');

const app = express();
const taskRouter = require('./routes/task');
const userRouter = require('./routes/user');
const PORT = 4000;

app.use(express.json());
app.use(cors('*'));
app.use('/task', taskRouter);
app.use('/user', userRouter);

mongoose.connection.on('connected', () => app.listen(PORT, () => console.log('Server and mongoDB is running')));
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));