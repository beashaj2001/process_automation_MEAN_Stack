const mongoose = require('mongoose');
const teamleaderdataSchema = mongoose.Schema({
    alloted: Number,
    email: String,
    phno: String,
    team_id: Number,
    teamLead_name: String,
    employee: [{id : Number, name: String, assignmentStatus: Boolean}],
    ongoingProjects: { projectid: Number,name: String, deadline: String,
        description: String,
        checkbox1: {static: Boolean, dynamic: Boolean, economic: Boolean, appln: Boolean, mob: Boolean},
        checkbox2: {seo: Boolean, sem:Boolean, smo: Boolean, smm: Boolean},
        nemail: Boolean,
        nsms: Boolean
    },
    tasks : [{id: Number, content: String, employee_id: Number, status: Boolean,empAssignStatus: Boolean, employee: String}],
    quatation: [{id: Number, stmt: String}]
});

module.exports = mongoose.model('TeamLeaderForm',teamleaderdataSchema);
