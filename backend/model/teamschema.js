const mongoose = require('mongoose');
const teamsschema = mongoose.Schema({
    id: Number,
    name: String,
    projects: [{id: Number, name: String}],
    employee: [{id: Number, name: String}]
});

module.exports = mongoose.model('Team',teamsschema);
