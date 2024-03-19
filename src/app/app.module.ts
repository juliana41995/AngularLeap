import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { TaskListService } from './task-list/task-list.service';
import  {HttpClientModule} from '@angular/common/http';
import { TaskFilterComponent } from './tool-bar/tool-bar.component';
import { DataService } from './data.service';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { LoginService } from './login/login.service';
import { TaskComponent } from './task/task.component';
import { FilterPipe  } from './pipes/filter-task.pipe';
@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    LoginComponent,
    TaskFilterComponent,
    TitleBarComponent,
    TaskComponent,
    FilterPipe 
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TaskListService,DataService,LoginService,TaskComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
