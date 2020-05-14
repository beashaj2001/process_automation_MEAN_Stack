import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';


// MDB Angular Free
// import { WavesModule, TableModule } from 'angular-bootstrap-md';


interface OnTable {
  id: number;
  assignstatus: number;
  deadline: string;
  name: string;
  team: string;
  description: string,
  checkbox1: {static: Boolean, dynamic: Boolean, economic: Boolean, appln: Boolean, mob: Boolean};
  checkbox2: {seo: Boolean, sem:Boolean, smo: Boolean, smm: Boolean};
  nemail: Boolean;
  nsms: Boolean
}

// var onGoingArray : OnTable[] = [
//   {name: "Project1" , status: 75 , deadline: "03-03-2020"},
//   {name: "Project2" , status: 52 , deadline: "13-04-2020"},
//   {name: "Project3" , status: 25 , deadline: "01-07-2020"}
// ];

interface FutureTable {
  tempid: number;
  id: number;
  assignstatus: number;
  deadline: string;
  name: string;
  team: string;
  description: string,
  checkbox1: {static: Boolean, dynamic: Boolean, economic: Boolean, appln: Boolean, mob: Boolean};
  checkbox2: {seo: Boolean, sem:Boolean, smo: Boolean, smm: Boolean};
  nemail: Boolean;
  nsms: Boolean
}


interface CompleteTable {
  id: number;
  assignstatus: number;
  deadline: string;
  name: string;
  team: string;
  description: string,
  checkbox1: {static: Boolean, dynamic: Boolean, economic: Boolean, appln: Boolean, mob: Boolean};
  checkbox2: {seo: Boolean, sem:Boolean, smo: Boolean, smm: Boolean};
  nemail: Boolean;
  nsms: Boolean
}

interface Team {
  name: string
}

@Component({
  selector: 'man-ager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})

export class ManagerComponent implements OnInit, OnDestroy  {
  name: String[];
  deadline: String[];
  futureArray : FutureTable[] = [];
  onGoingArray : OnTable[] = [];
  completeArray: CompleteTable[] = [];
  team:Team[] = [];
  tempteam: String[] = [];
  select: string;
  completedStatus: Boolean = true;

  constructor(public dialog: MatDialog, private http: HttpClient) {}
  gettask()
    {
        return this.http.get("http://localhost:3000/get-projects").pipe(
          map((responce)=>{
              console.log(responce);
              this.onGoingArray = [];
              this.futureArray = [];
              console.log("Projects are")
              console.log(Object.values(responce)[0][0].projects);
              (Object.values(responce)[0][0].projects).forEach(element => {
                if(element.assignstatus == 1) {
                  // var dd = (element.date.date).toString()+"-"+(element.date.month).toString()+"-"+(element.date.year).toString();
                  this.onGoingArray.push(element);
                  this.tempteam.push(element.team); // Getting all alloted teams
                  // this.dataSource1.push({name: element.name, status: 25, deadline: dd});
                }
                else if(element.assignstatus == 0) {
                  this.futureArray.push({tempid: this.futureArray.length+1,assignstatus: element.assignstatus, deadline: element.deadline, id: element.id, name: element.name, team: element.team,
                    description: element.description,
                    checkbox1: element.checkbox1,
                    checkbox2: element.checkbox2,
                    nemail: element.nemail,
                    nsms: element.nsms});
                  // this.dataSource2.push({id: this.onGoingArray.length+this.futureArray.length+1, name: element.pname});
                }
                else {
                  this.completeArray.push(element);
                  this.completedStatus = true;
                }
              });
              console.log("teams are");
              (Object.values(responce)[0][0].teams).forEach(element => {
                if(!this.tempteam.includes(element)){
                  this.team.push({name: element})
                }
              });
              console.log(this.team);
              console.log(this.onGoingArray);
              console.log(this.futureArray);
          } ));
    }

    ngOnInit()
    {
        this.gettask()
        .subscribe((data) => {
          console.log("Check1");
          console.log(data)
        });
    }


    completeProject(elem: OnTable) {
      var temp:OnTable[] = [];
      this.onGoingArray.forEach(element => {
        if(elem.id != element.id) {
          temp.push(element);
        }
        else {
          elem.assignstatus = 2;
          this.completeArray.push(elem);
          this.completedStatus = true;
        }
      });
      this.team.push({name:elem.team});
      this.team.sort(function(a,b) {
        if(a.name>b.name){
          return 1
        }
        else {
          return -1
        }
      });
      var curr = []; //Used as temp variable to remove the freed team
      this.tempteam.forEach( element => {
        if(element != elem.name) {
          curr.push(element);
        }
      });
      this.tempteam = [];
      curr.forEach(element => this.tempteam.push(element));
      console.log("The available teams are");
      console.log(this.team);
      console.log(this.tempteam);
      this.onGoingArray = [];
      temp.forEach(element => this.onGoingArray.push(element));
      this.completeArray.forEach(el => temp.push(el));
      this.futureArray.forEach(el => temp.push(el));
      console.log("Modified ones are: ");
      console.log(this.onGoingArray);
      console.log(this.futureArray);
      console.log(this.completeArray);
      temp.sort(function(a,b){
        return (a.id-b.id);
      });
      this.http.post("http://localhost:3000/update-projects1",{id: 1, team: elem.team, data: temp}).subscribe((res) => console.log(res));
    }

    confirm(element: FutureTable) {
      let array: FutureTable[] = [];
      console.log(element.tempid);
      this.tempteam.push(element.team);
      var current: Team[] = [];
      this.team.forEach((element) => {
        if(!this.tempteam.includes(element.name)){
          current.push({name: element.name})
        }
      })
      this.team = [];
      current.forEach(element => this.team.push(element));
      for(let i=0;i<this.futureArray.length;i++) {
        if(i != element.tempid-1) {
          array.push(this.futureArray[i]);
        }
      }
      this.futureArray = array;
      this.onGoingArray.push({assignstatus: 1, deadline: element.deadline, id: element.id, name: element.name, team: element.team,
        description: element.description,
        checkbox1: element.checkbox1,
        checkbox2: element.checkbox2,
        nemail: element.nemail,
        nsms: element.nsms});
      console.log("Modified project status is: ");
      console.log(this.onGoingArray);
      console.log(this.futureArray);
    }

    saveProjects() {
      var array: OnTable[] =[];
      this.onGoingArray.forEach(element => array.push(element));
      this.futureArray.forEach(element => array.push({assignstatus: element.assignstatus, deadline: element.deadline, id: element.id,
        name: element.name, team: element.team,
        description: element.description,
        checkbox1: element.checkbox1,
        checkbox2: element.checkbox2,
        nemail: element.nemail,
        nsms: element.nsms}));
      this.completeArray.forEach(element => array.push(element));
      array.sort(function(a,b){
        return a.id - b.id;
      });
      console.log(array);
      this.http.post("http://localhost:3000/update-projects",{data: array}).subscribe((response) => console.log(response));
    }

    ds1 = ['Name','Team','Deadline','View'];
    ds2 = ['ID','Name','Assign','Conformation'];
    ds3 = ['Id','Name', 'Team'];
  ngOnDestroy() {

  }

}
