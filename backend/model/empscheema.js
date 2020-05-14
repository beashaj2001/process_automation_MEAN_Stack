const mongoose = require('mongoose');
const empscheema = mongoose.Schema({
    id: Number,
    name: String,
    team_id: Number,
    tasks: [{id: Number, content: String, status: Boolean}]
});

module.exports = mongoose.model('Employee',empscheema);
