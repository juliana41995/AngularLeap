import { Component, Input } from '@angular/core';
import { Task } from './task-list';
import { Router } from '@angular/router';
import { TaskListService } from './task-list.service';
import { DataService } from '../data.service';
import { User } from '../login/login';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-task-list',
   templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  userList: User[] = [];
  taskList : Task[] = []; 
  searchText: string =  '';

  element: any;
  user: User | any;

  statusList = [
    { id: "To Do", color: '#e0e1e9' },
    { id: "In Progress", color: '#e0eccf' },
    { id: "Completed", color: '#4ea646' },
    { id: "Blocked", color: '#fbd4d7' }
  ];

  constructor(private router: Router, private taskService:TaskListService, private dataService:DataService , private loginService: LoginService) {
    this.taskService.getTasks().subscribe(data => {
      this.taskList = data;
      this.dataService.changeMessage(this.taskList);
    }); 
    this.loginService.getUsers().subscribe(data => {
      this.userList = data;
    }); 
  }
  ngOnInit() {}

  filterTask(searchTerm:string){
    this.searchText = searchTerm;
  } 

  assignUsertoTask(event: any, id :number){
    this.taskList[this.findTaskbyIndex(id)].assignee = event.target.value;
  }

  changeStatus(event: any, id :number){
    this.taskList[this.findTaskbyIndex(id)].status = event.target.value;
  }

  findTaskbyIndex(id :number){
    return this.taskList.findIndex(x => x.id ===id);
  }
  
  fetchTaskAssignedToUser(){
    this.user = this.loginService.getUserData();
    this.element = document.getElementById('assinged-button-id');
    if(this.element.value == undefined || this.element.value == 'false'){
      this.element.value = 'true';
      this.searchText = this.user.username;
    }else{
      this.element.value = 'false';
      this.searchText = '';
    }
  }
}
