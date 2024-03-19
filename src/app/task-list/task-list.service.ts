import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { Task } from './task-list';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  private task_url : string = "/assets/data/tasks.json";

  jsonList : Task[] = []; 

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.task_url);
  }
}
