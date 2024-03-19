import { Component, Input } from '@angular/core';
import { Task } from '../task-list/task-list';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';
import { TaskListComponent } from '../task-list/task-list.component';
import { User } from '../login/login';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class TaskFilterComponent {

  id: number = 8;

  element: any;

  user : User | any;

  taskList:Task | any;

  subscription: Subscription | any;

  tasks: Task = { id: 1, name: '', description: '', status: 'To Do', assignee:''};

  constructor(private dataService: DataService,private taskListComponent: TaskListComponent) {}
  
  ngOnInit() {
    this.subscription = this.dataService.currentMessage.subscribe(message => this.taskList = message);    
  }

  openCreatePanel(){
    this.element = document.getElementById('name_add_id');
    this.element.value = '';
    this.element = document.getElementById('description_add_id');
    this.element.value = '';
    this.element = document.getElementById('status_add_id');
    this.element.value = '';
    this.element = document.getElementById('create-modal');
    this.element.open();
  }

  addTask(): void {
    var task = { id:1, name:'', description:'', status:''};
    this.element = document.getElementById('name_add_id');
    task.name = this.element.value;
    this.element = document.getElementById('description_add_id');
    task.description = this.element.value;
    this.element = document.getElementById('status_add_id');
    task.status = this.element.value;
    task.id =this.id + 1;
    this.id =task.id;
    this.taskList.push(task); 
    this.saveJsonToFile(this.taskList);
    this.element = document.getElementById('create-modal');
    this.element.close();
  }

  filterTask(){
    this.element = document.getElementById('filter-id');
    var searchText = this.element.value.toLowerCase();
    this.taskListComponent.filterTask(searchText);

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
