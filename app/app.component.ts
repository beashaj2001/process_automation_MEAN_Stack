import { Component } from '@angular/core';
import {OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { HttpClient } from "@angular/common/http";
import { from } from 'rxjs';
import { element } from 'protractor';

class User {
  constructor(public name: string, public password: string) {
    this.name = name;
    this.password = password;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'project2';
  vis = true;
  hide = false;
  vis1 = true;
  hide1 = false;
  
  clie = false;
  mana = false;
  empl = false;
  tea = false;
  alert = false;

  constructor(private http: HttpClient) {}

  userModel = new User("","");
  onSubmit() {
    this.http.get("http://localhost:3000/get-person",{params: {searchKey: this.userModel.name}}).
            subscribe(responce => {
                console.log(responce)
                let type = Object.values(responce)[0][0].type;
                if(type == 'manager') {
                  this.mana = true;
                  this.vis1= false;
                  this.alert = false;
                }
                else if(type == 'teamleader'){
                  this.tea = true;
                  this.vis1= false;
                  this.alert = false;
                }
                else if(type == 'employee'){
                  this.empl = true;
                  this.vis1= false;
                  this.alert = false;
                }
                else {
                  this.alert = true;
                }
            });
  };
  clientOpen() {
    this.clie = true;
    this.alert = false;
    this.vis1= false;
  }
}

