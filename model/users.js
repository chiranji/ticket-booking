const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    phone: Number,
    name: String,
    username: String,
    password: String,
});

module.exports = mongoose.model('users', usersSchema);