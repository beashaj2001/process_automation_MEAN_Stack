const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ClientForm = require("./model/clischema");
const TeamLeaderForm = require("./model/post");
const Team = require("./model/teamschema");
const Manager = require("./model/managerschema");
const Employee = require("./model/empscheema");
const People = require("./model/personscheema")
const sgMail = require('@sendgrid/mail');

const app = express();
var id = 0;

mongoose
  .connect(
    "mongodb+srv://Ambva:Ambva@cluster-gy1pb.mongodb.net/test",{useNewUrlParser: true,useUnifiedTopology: true}
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed!");
    console.log(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post("/client-form", (req, res, next) => {
    const info = new ClientForm({
        id: req.body.id,
        name: req.body.name,
        phno: req.body.phno,
        email: req.body.email,
        cname: req.body.cname,
        pname: req.body.pname,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        description: req.body.description,
        checkbox1: {static: req.body.checkbox1.static, dynamic: req.body.checkbox1.dynamic, economic:req.body.checkbox1.economic, appln: req.body.checkbox1.appln, mob: req.body.checkbox1.mob },
        checkbox2: { seo: req.body.checkbox2.seo, sem: req.body.checkbox2.sem, smo: req.body.checkbox2.smo, smm: req.body.checkbox2.smm },
        select: { select1: req.body.select.select1, select2: req.body.select.select2, select3: req.body.select.select3, select4: req.body.select.select4},
        notifyCustomer: { customer: req.body.notifyCustomer.customer, email: req.body.notifyCustomer.email, sms: req.body.notifyCustomer.sms },
        notifyMgmt: { mgmt: req.body.notifyMgmt.mgmt, email: req.body.notifyMgmt.email, sms: req.body.notifyMgmt.sms },
        assignment: req.body.assignment,
        date: req.body.date
    });
    info.save().then(() => {
      Manager.find({name: req.body.select.select2}).then(document => {
        document[0].projects.push({id: req.body.id, name: req.body.pname, assignstatus: 0,deadline:  req.body.date, team: "",
      checkbox1: req.body.checkbox1, checkbox2: req.body.checkbox2, nemail: req.body.notifyCustomer.email, nsms: req.body.notifyCustomer.sms});
      console.log(document[0]);  
      Manager.updateOne({name: req.body.select.select2},{$set: document[0]}).
        then(() => console.log("Updated Sucessfully...!!")).catch((err) => console.log(err));
      });
      res.status(201).json({
        message: "Form added successfully"
      });
    });
});

app.post("/task-update", (req, res, next) => {
  console.log("Got");

  TeamLeaderForm.updateOne({team_id: id},{$set: {tasks: req.body.update.tasks, employee: req.body.update.employee}})
  .then(() => {
    Employee.find({id: req.body.update.e_id}).then((document) => {
      document[0].tasks.push({id: req.body.update.t_id, content: req.body.update.e_task, status: false});
      Employee.updateOne({id: req.body.update.e_id},{$set: {tasks: document[0].tasks}}).then(() => console.log("Employee Updated"))
    })
    res.status(201).json({message: "Employee Updated sucess..!!"});
  });
});

app.post("/task-update1", (req, res, next) => {
  console.log("Got1");
  TeamLeaderForm.updateOne({team_id: id},{$set: {tasks: req.body.tasks}})
  .then(() => {
    res.status(201).json({message: "Updated sucess..!!"});
  });
});

app.post("/update-employee", (req, res, next) => {
  console.log(req.body.id);
  console.log(req.body.update);
  Employee.updateOne({id: id},{$set: {tasks: req.body.update}})
  .then(() => {
    console.log("Came in");
    TeamLeaderForm.find({team_id: req.body.team_id}).then(document => {
      document[0].tasks.forEach(element => {
        if(element.id == req.body.spltask.id) {
          element.status = req.body.spltask.status;
        }
      });
      console.log(document[0]);
      TeamLeaderForm.updateOne({team_id: req.body.team_id}, {$set: {tasks: document[0].tasks}}).then(() => console.log("Updated Employee"))
    });
    res.status(201).json({message: "Teamform Updated sucess..!!"});
  });
});

app.post("/get-tasks", (req,res,next) => {
  TeamLeaderForm.find({teamLead_name: req.body.name}).then(documents => {
    res.status(201).json({tasks: documents[0].tasks});
  })
})

app.post("/update-projects", (req, res, next) => {
  Manager.updateOne({id: id},{$set: {projects: req.body.data}})
  .then(() => {
    (req.body.data).forEach(element => {
      if(element.team  != "")
      {
        ClientForm.find({id: element.id}).then((document) => {
          TeamLeaderForm.updateOne({teamLead_name: element.team, alloted: 0},{$set: {
            alloted: 1,
            email: document[0].email,
            phno: document[0].phno,
            ongoingProjects: {projectid: element.id, name: document[0].pname, deadline: element.deadline,
              description: document[0].description,
              checkbox1: document[0].checkbox1,
              checkbox2: document[0].checkbox2,
              nemail: document[0].notifyCustomer.email,
              nsms : document[0].notifyCustomer.sms},
          }}).then(() => console.log("Updated..:)"));
        });
      }
    })
    res.status(201).json({message: "Projects Updated sucessfully..!!"});
  });
});

app.post("/update-projects1", (req, res, next) => {
  Manager.updateOne({id: id},{$set: {projects: req.body.data}})
  .then(() => {
    TeamLeaderForm.find({teamLead_name: req.body.team}).then(document => {
      Employee.updateMany({team_id: document[0].team_id}, {$set: {tasks: []}}).then(() => {
        console.log("Employee db updated");
        TeamLeaderForm.updateOne({teamLead_name: req.body.team},{$set: {alloted: 0, email: "", phno: "", 
          ongoingProjects: {projectid: 0, name: "", deadline: ""},
          tasks: [],
          quatation: []}}).then(() => console.log("Team DB updated..."));
      })
    })
  });
});

app.post("/quatation-update", (req, res, next) => {
  TeamLeaderForm.updateOne({team_id: id},{$set: {quatation: req.body.quatation}})
  .then(() => {
    res.status(201).json({message: "Quataation Updated sucess..!!"});
    if(req.body.nsms) {
      const accountSid = "ACa1fb58f29be1cd23fbc1da4236b7ec43";
      const authTocken = "084d8b23b5a5fdb604763533f23a714f";

      const client = require('twilio')(accountSid, authTocken);
      req.body.phno = "+91"+req.body.phno;
      client.messages.create({
        to: req.body.phno,
        from: "+14432735073",
        body: 'Hii, '+req.body.quatation[req.body.quatation.length-1].stmt+' By your Project handeller:)'
      }).then((message) => console.log(message.sid)).catch((err) => console.log(err));
    }
    
    if(req.body.nemail) {
      sgMail.setApiKey('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');
      const msg = {
        to: req.body.email,
        from: 'beashaj2001@gmail.com',
        subject: "Quatation",
        text: 'Hii, '+req.body.quatation[req.body.quatation.length-1].stmt+' By your Project handeller:)',
      };
      sgMail.send(msg);
      console.log("Done");
    }
  })
});

app.get("/team-task", (req, res, next) => {
  TeamLeaderForm.find({team_id: id}).then(documents => {
    res.status(200).json({
      data: documents
    });   
  });
});

app.get("/get-projects", (req, res, next) => {
  Manager.find({id: id}).then(documents => {
    res.status(200).json({
      data: documents
    });
  });
});

app.get("/get-count", (req, res, next) => {
  ClientForm.find().then(documents => {
    res.status(200).json({
      value: documents.length
    });   
  });
});

app.get("/get-teams", (req, res, next) => {
  Team.find().then(documents => {
    res.status(200).json({
      data: documents
    });   
  });
});

app.get("/get-employee", (req, res, next) => {
  Employee.find({id: id}).then(documents => {
    res.status(200).json({
      data: documents
    });   
  });
});

app.get("/get-person", (req, res, next) => {
  console.log(req.query.searchKey);
  People.find({username: req.query.searchKey}).then(documents => {
    if(documents.length > 0){
      console.log(documents);
      id = documents[0].id;
      res.status(200).json({
        data: documents
      });
    }
    else{
      res.status(200).json({
        data: [{type: "null"}]
      });
    }
  });
});

module.exports = app;