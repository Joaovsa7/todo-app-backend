const { Schema, model } = require('mongoose');
// tarefa schema = o modo que vai ficar salvo no banco
// aqui eu to definindo a tipagem dos dados
// e dps vou usar ele para fazer o create, update, delete
const Task = new Schema({
  title: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  dueTime: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: null
  },
  deletedAt: {
    type: Date,
    default: null
  },
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1
  }
}, { collection: 'Tarefa' }
);

const TasksModel = model('Tarefa', Task);
module.exports = TasksModel;
