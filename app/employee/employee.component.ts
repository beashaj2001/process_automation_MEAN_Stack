import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { element } from 'protractor';


interface Task {
    id: number, content: string, status: boolean
}

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmpComponent implements OnInit, OnDestroy {
    
    id:number;
    name: string;
    team_id: number;
    tasks: Task[] = [];
    pendingTasks: Task[] = [];
    completedTasks: Task[] = [];
    pendingStatus = false;
    completedStatus = false;
    constructor(private http: HttpClient) {}

    getDetails() {
        return this.http.get("http://localhost:3000/get-employee").pipe(
            map((res)=>{
                console.log(res);
                this.id = Object.values(res)[0][0].id;
                this.name = Object.values(res)[0][0].name;
                this.team_id = Object.values(res)[0][0].team_id;
                this.tasks = Object.values(res)[0][0].tasks;
                this.tasks.forEach(element => {
                    if(element.status == true) {
                        this.completedTasks.push(element);
                        this.completedStatus = true;
                    }
                    else {
                        this.pendingTasks.push(element);
                        this.pendingStatus = true;
                    }
                });
            }));
    }

    ngOnInit()
    {
        this.getDetails().subscribe((data) => console.log(data));        
    }

    saveTask(el: Task) {
        var temp: Task[] = [];
        this.pendingTasks.forEach(element =>{
            if(element.id != el.id) {
                temp.push(element);
            }
            else {
                el.status = true;
                element.status = true;
            }
        });
        this.pendingTasks = temp;
        this.completedTasks.push(el);
        console.log(this.pendingTasks);
        console.log(this.completedTasks); 
        temp = [];
        this.completedTasks.forEach(element => temp.push(element));
        this.pendingTasks.forEach(element => temp.push(element));
        temp.sort(function(a,b){
            return a.id - b.id;
        });
        this.http.post("http://localhost:3000/update-employee",{id: this.id, team_id: this.team_id, spltask: el, update: temp}).subscribe(res => console.log(res));
        this.completedStatus = true;
    }

    ds = ['Id','Task','Conform'];
    ds1 = ['Id','Task'];
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
}
