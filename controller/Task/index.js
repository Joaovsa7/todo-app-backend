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
      res.send({ task: taskCreated, success: `Task ${taskCreated.title} was created.` });
    } catch (e) {
      res.send({
        error: `${e}`,
        success: null
      });
    }
  },
  update: async (req, res, next) => {
    const { id } = req.params;
    const { task } = req.body;
    if (!id) {
      res.status(422).send({
        error: 'You must to pass the id of task',
      });
    }
    if (!Object.keys(task).length) {
      res.status(422).send({
        error: 'You must to pass any data',
      });
    };

    const date = new Date();
    const newTaskObj = {
      ...task,
      updatedAt: date,
    };

    try {
      const task = await TasksModel.findOne({ _id: id });;
      if (!task) {
        res.send({
          error: `This task does not exists in database`
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
      const date = new Date();
      const newTaskObj = Object.assign(task, { ...task, status: 0, deletedAt: date });
      newTaskObj.save();
      res.status(200).send({
        success: 'Task was deleted with successfull'
      });
    } catch (e) {
      res.send({ error: `${e}` });
    }
  },
  getAll: async (req, res) => {
    const tasks = await TasksModel.find({ status: 1 });
    return res.send(tasks);
  }
};
