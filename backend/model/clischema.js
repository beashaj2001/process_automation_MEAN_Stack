const mongoose = require('mongoose');

const clientdataSchema = mongoose.Schema({
    id: Number,
    name: String,
    phno: String,
    email: String,
    cname: String,
    pname: String,
    address: String,
    city: String,
    state: String,
    description: String,
    checkbox1: {static: Boolean, dynamic: Boolean, economic: Boolean, appln: Boolean, mob: Boolean },
    checkbox2: { seo: Boolean, sem: Boolean, smo: Boolean, smm: Boolean },
    select: { select1: String, select2: String, select3: String, select4: String},
    notifyCustomer: { customer: Boolean, email: Boolean, sms: Boolean },
    notifyMgmt: { mgmt: Boolean, email: Boolean, sms: Boolean },
    assignment: Boolean,
    date: String
});


module.exports = mongoose.model('ClientForm', clientdataSchema);
