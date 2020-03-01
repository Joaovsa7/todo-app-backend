const TasksModel = require('../../models/Task');

module.exports = {
  byUser: async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({ error: 'You must to pass the id of user' });
    }

    const userTasks = await TasksModel.find({
      user_id: id,
      status: 1
    }).exec();

    const hasTasks = userTasks.length ? {
      tasks: userTasks
    } : { error: 'Tasks by user not found' };
    res.status(200).send(hasTasks);
  },
  create: async (req, res, next) => {
    const taskObj = {
      ...req.body,
      status: 1
    };

    try {
      const taskCreated = await TasksModel.create({ ...taskObj });
      res.send({ task: taskCreated });
    } catch (e) {
      res.send({
        error: `${e}`
      });
    }
  },
  update: async (req, res, next) => {
    const { title } = req.params;
    if (!title) {
      res.status(422).send({
        error: 'You must to pass the title of task',
      });
    }
    const { user } = req.body;
    if (!Object.keys(user).length) {
      res.status(422).send({
        error: 'You must to pass any data',
      });
    };

    const newTaskObj = {
      ...user,
    };

    try {
      const task = await TasksModel.findOne({ title });;
      if (!task) {
        res.send({
          error: `The task ${title} does not exist in database`
        });
      }

      const newDoc = Object.assign(task, { ...newTaskObj });
      newDoc.save();
      res.send({ task: newDoc });
    } catch (e) {
      res.send({ error: `${e}` });
    }
  },
  deleteTask: async (req, res, next) => {
    const { id } = req.params;
    const { token } = req.headers;
    if (!token) {
      return res.status(403).send({
        error: 'Unauthorized'
      });
    }
    if (!id) {
      return res.send({
        error: 'You must to pass the id of task to delete'
      });
    }

    try {
      const task = await TasksModel.findOne({ _id: id });;
      if (!task) {
        res.send({
          error: `The task with id: ${id} does not exist in database`,
        });
      }

      const newTaskObj = Object.assign(task, { ...task, status: 0 });
      newTaskObj.save();
      res.status(200).send({
        success: 'Task was deleted with successfull'
      });
    } catch (e) {
      res.send({ error: `${e}` });
    }
  },
  getAll: async (req, res) => {
    console.log('oi');
    const tasks = await TasksModel.find({ status: 1 });
    return res.send(tasks);
  }
};
