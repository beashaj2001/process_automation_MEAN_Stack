const mongoose = require('mongoose');
const personSchema = mongoose.Schema({
    username: String,
    password: String,
    type: String,
    id: Number
});

module.exports = mongoose.model('People',personSchema);


