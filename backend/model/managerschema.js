const mongoose = require('mongoose');
const managerSchema = mongoose.Schema({
    id: Number,
    name: String,
    teams: [String],
    projects: [{id: Number, name: String, assignstatus: Number,deadline: String, team: String,
        description: String,
        checkbox1: {static: Boolean, dynamic: Boolean, economic: Boolean, appln: Boolean, mob: Boolean},
        checkbox2: {seo: Boolean, sem:Boolean, smo: Boolean, smm: Boolean},
        nemail: Boolean,
        nsms: Boolean}]
});

module.exports = mongoose.model('Manager',managerSchema);
