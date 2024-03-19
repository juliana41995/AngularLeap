import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private user_url : string = "/assets/data/users.json";
    user: User = {"username": "", "email": "", "password": ""};  
    private localStorageKey = 'userData';

    constructor(private http: HttpClient){}

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>(this.user_url);
    }

    setUser(data: any) {
      this.user = data;
      localStorage.setItem(this.localStorageKey, JSON.stringify(data));
    }
  
    getUserData() {
      const userData = localStorage.getItem(this.localStorageKey);
      return userData ? JSON.parse(userData) : null;
    }
}
