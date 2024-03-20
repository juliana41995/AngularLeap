import { Component, Input } from '@angular/core';
import { Task } from '../task-list/task-list';
import { TaskListService } from '../task-list/task-list.service';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  
  @Input() taskList: any[] = [];
  @Input() searchText: string = '';
  @Input() userList: any[] = [];

  subscription: Subscription | any;

  taskListTemp: Task | any; 
  
  element: any;

  statusList = [
    { id: "To Do", color: '#e0e1e9' },
    { id: "In Progress", color: '#e0eccf' },
    { id: "Completed", color: '#4ea646' },
    { id: "Blocked", color: '#fbd4d7' }
  ];

  constructor( private dataService:DataService){}

  ngOnInit(){}

  assignUsertoTask(taskID: any, username :string){
    this.taskList[this.findTaskbyIndex(taskID)].assignee = username;
    this.saveJsonToFile(this.taskList);
  }

  changeStatus(taskID: number, id:string){
    this.taskList[this.findTaskbyIndex(taskID)].status = id;
    this.saveJsonToFile(this.taskList);
  }

  findTaskbyIndex(id :number){
    return this.taskList.findIndex(x => x.id ===id);
  }

  buttonClick(){
    console.log('Button Clicked');
  }

  getColorForId(id: string){
    const status = this.statusList.find(status => status.id === id);
    return status ? status.color : '';
  }
  
  openEditPanel(task: Task){
    this.element = document.getElementById('edit-modal');
    this.element.open();
    this.taskListTemp = task;
    this.element = document.getElementById('name_edit_id');
    this.element.value = task.name;
    this.element = document.getElementById('description_edit_id');
    this.element.value = task.description;
    this.element = document.getElementById('status_edit_id');
    this.element.value = task.status;
  }

  openDeletePanel(task: Task){
    this.element = document.getElementById('delete-modal');
    this.element.open();
    this.taskListTemp = task; 
  }

  editTask(){
    var index = this.taskListTemp.id;
    this.element = document.getElementById('name_edit_id');
    this.taskListTemp.name = this.element.value;
    this.element = document.getElementById('description_edit_id');
    this.taskListTemp.description = this.element.value;
    this.element = document.getElementById('status_edit_id');
    this.taskListTemp.status = this.element.value;
    index = this.taskList.findIndex((obj: { id: any; }) => obj.id === index);
    this.taskList[index] = { ...this.taskList[index], ...this.taskListTemp };
    this.saveJsonToFile(this.taskList);
    this.closeEditPanel();
  }

  closeEditPanel(){
    this.element = document.getElementById('edit-modal');
    this.element.close();
  }

  closeDeletePanel(){
    this.element = document.getElementById('delete-modal');
    this.element.close();
  }

  deleteTask(){
    var index = this.taskList.findIndex((x: { id: any; }) => x.id ===this.taskListTemp.id);
    this.taskList.splice(index, 1);
    this.saveJsonToFile(this.taskList);
    this.element = document.getElementById('delete-modal');
    this.element.close();
  }
  
  saveJsonToFile(saveJsonToFile:any){
    this.dataService.saveJsonToFile(saveJsonToFile).subscribe(
      response => {
        console.log('Data stored successfully:', response);
      },
      error => {
        console.error('Error storing data:', error);
      }
    );
  }
}
