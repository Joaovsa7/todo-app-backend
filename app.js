require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const taskRouter = require('./routes/task');
const userRouter = require('./routes/user');

app.use(express.json());
app.use(cors('*'));
app.use('/task', taskRouter);
app.use('/user', userRouter);
app.listen(process.env.APP_PORT, () => console.log('Server is running'));