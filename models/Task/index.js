const { Schema, model } = require('mongoose');
// tarefa schema = o modo que vai ficar salvo no banco
// aqui eu to definindo a tipagem dos dados
// e dps vou usar ele para fazer o create, update, delete
const Task = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user_id: {
    type: Number,
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
