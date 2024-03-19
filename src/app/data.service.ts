import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task-list/task-list';
import { HttpClient } from '@angular/common/http';
import { User } from './login/login';

@Injectable()
export class DataService {
  
  tasks: Task[] = [];
  users: User[] = [];

  private messageSource = new BehaviorSubject(this.tasks);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {}

  changeMessage(message: Task[]) {
    this.messageSource.next(message)
  }

  saveJsonToFile(json: any) {
    return this.http.post<any>('http://localhost:5000/store-json', json);
  }
}