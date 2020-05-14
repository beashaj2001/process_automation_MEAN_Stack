import { Component, OnInit } from '@angular/core'
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
// import { Select } from "./dropdown.model";

interface Cli {
    name: string,
    phno: String,
    email: string,
    cname: string,
    address: string,
    city: string,
    state: string,
    description: string
}

interface Select {
    id: number;
    name: string;
}

@Component({
    selector: 'cli-ent',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css']
})

export class  ClientComponent{
    selectoption1 = 1;
    selectoption2 = 1;
    selectoption3 = 1;
    selectoption4 = 1;

    mydate: Date;

    select1: Select[] = [
        {id: 1, name: "SD"},
        {id: 2, name: "SVLETH"},
        {id: 3, name: "KEF"},
        {id: 4, name: "WEB"},
        {id: 5, name: "CHAT"},
        {id: 6, name: "NA"}
    ];

    select2: Select[] = [
        {id: 1, name: "Bala"},
        {id: 2, name: "AJ"},
        {id: 3, name: "Har"},
        {id: 4, name: "VY"},
        {id: 5, name: "Sar"}
    ];

    select3: Select[] = [
        {id: 1, name: "CALL"},
        {id: 2, name: "QUOTE"},
        {id: 3, name: "VISIT"},
        {id: 4, name: "PAYMENT"},
        {id: 5, name: "FOLLOW UP"}
    ];

    select4: Select[] = [
        {id: 1, name: "ADA"},
        {id: 2, name: "DAN"},
        {id: 3, name: "ANN"}
    ];

    id: Number;
    name = "";
    phno = "";
    email = "";
    cname = "";
    pname = "";
    address = "";
    city = "";
    state = "";
    description = "";
    web = false;
    static = false;
    dynamic = false;
    economic = false;
    appln = false;
    mob = false;
    indeterminate = false || this.static || this.dynamic || this.economic || this.appln || this.mob;
    
    digital = false;
    seo = false;
    sem = false;
    smo = false;
    smm = false;
    indeterminate1 = false;

    ncustomer = false;
    nemail = false;
    nsms = false;
    nmgmt = false;
    nmemail = false;
    nmsms = false;

    constructor(private http: HttpClient) {}
    
    func(){
        this.indeterminate = !(this.static && this.dynamic && this.economic && this.appln && this.mob);
        if(!(this.static || this.dynamic || this.economic || this.appln || this.mob))
        {
            this.indeterminate = false;
            this.web = false;
        }
    }

    func1(){
        this.static = false || this.web;
        this.dynamic = false || this.web;
        this.economic = false || this.web;
        this.appln = false || this.web;
        this.mob = false || this.web;
    }

    check(){
        this.indeterminate1 = !(this.seo && this.sem && this.smo && this.smm);
        if(!(this.seo || this.sem || this.smo || this.smm))
        {
            this.indeterminate1 = false;
            this.digital = false;
        }
    }

    check1(){
        this.seo = false || this.digital;
        this.sem = false || this.digital;
        this.smo = false || this.digital;
        this.smm = false || this.digital;
    }

    cc1() {
        this.nsms = false;
    }

    cc2() {
        this.nemail = false;
    }

    onSave(){
        this.http.get("http://localhost:3000/get-count").subscribe((responce) => {
            
            console.log(responce);
            this.id = Object.values(responce)[0]+1;
            console.log(this.id);
            let checkbox1 = { static: this.static, dynamic: this.dynamic, economic: this.economic, appln: this.appln, mob: this.mob };
            let checkbox2 = { seo: this.seo, sem: this.sem, smo: this.smo, smm: this.smm }; 
            let select = { select1: this.select1[this.selectoption1-1]['name'],
                           select2: this.select2[this.selectoption2-1]['name'],
                           select3: this.select3[this.selectoption3-1]['name'],
                           select4: this.select4[this.selectoption4-1]['name']};
            let notify_customer = { customer: this.ncustomer, email: this.nemail, sms: this.nsms };
            let notify_mgmt = { mgmt: this.nmgmt, email: this.nmemail, sms: this.nmsms }; 
            var dd = (this.mydate.getDate()).toString()+"-"+(this.mydate.getMonth()).toString()+"-"+(this.mydate.getFullYear()).toString();
            const info = {id: this.id,
                          name: this.name,
                          phno: this.phno,
                          email: this.email,
                          cname: this.cname,
                          pname: this.pname,
                          address: this.address,
                          city: this.city,
                          state: this.state,
                          description: this.description,
                          checkbox1: checkbox1,
                          checkbox2: checkbox2,
                          select: select,
                          notifyCustomer: notify_customer,
                          notifyMgmt: notify_mgmt,
                          assignment: false,
                        //   date: {date: this.mydate.getDate(), month: this.mydate.getMonth(), year: this.mydate.getFullYear()}
                          date: dd
                        };
            console.log(info);
            this.name = "";
            this.phno = "";
            this.email = "";
            this.cname = "";
            this.pname = "";
            this.address = "";
            this.city = "";
            this.state = "";
            this.description = "";
            this.web = false;
            this.static = false;
            this.dynamic = false;
            this.economic = false;
            this.appln = false;
            this.mob = false;
            this.indeterminate = false;
            this.indeterminate1 = false;

            this.digital = false;
            this.seo = false;
            this.sem = false;
            this.smo = false;
            this.smm = false;

            this.ncustomer = false;
            this.nemail = false;
            this.nsms = false;

            this.http.post("http://localhost:3000/client-form",info).
            subscribe(responce => {
                console.log(responce)
            });
        });
    }
        

}