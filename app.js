require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const taskRouter = require('./routes/task');
const userRouter = require('./routes/user');

app.use(express.json());
app.use(cors('*'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.htm'));
});

app.use('/task', taskRouter);
app.use('/user', userRouter);

const server = app.listen(process.env.PORT || 4000);
