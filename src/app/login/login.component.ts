import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from './login';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Input() userList : User[] = []; 

  user: User | any;

  constructor(private router: Router, private loginService: LoginService, private dataService: DataService) {
    this.loginService.getUsers().subscribe(data => {
      this.userList = data;
    });
   }
  
   validateCredential(event: any) {
    this.user = this.userList.find(user => user.username === event.target.user.value);
    if (this.user && this.user.password === event.target.password.value) {
      this.loginService.setUser(this.user);
      this.router.navigate(['/kanban', event.target.user.value]);
    } else {
       alert('Login Failed')
    }
  }
}
