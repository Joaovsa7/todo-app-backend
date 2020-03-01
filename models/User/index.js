const { Schema, model } = require('mongoose');

const User = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: Number,
        default: 1
    }
}, { collection: 'User' }
);

const UserModel = model('User', User);
module.exports = UserModel;
