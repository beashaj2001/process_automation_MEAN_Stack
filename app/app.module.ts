import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule , ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import {MatSortModule} from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppComponent } from "./app.component";
import { ClientComponent } from "src/app/client/client.component";
import { ManagerComponent } from "src/app/manager/manager.component";
import { TeamleaderComponent } from "./teamleader/teamleader.component";
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { WavesModule, TableModule } from 'angular-bootstrap-md';
import { EmpComponent } from './employee/employee.component';
import { ManagerDialogComponent } from './manager-dialog/man-dialog.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IgxSnackbarModule } from 'igniteui-angular';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ManagerComponent,
    TeamleaderComponent,
    TaskDialogComponent,
    EmpComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    WavesModule.forRoot(),
    TableModule,
    MDBBootstrapModule.forRoot(),
    MatSortModule,
    MatFormFieldModule,
    IgxSnackbarModule
  ],
  entryComponents: [TaskDialogComponent,ManagerDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
