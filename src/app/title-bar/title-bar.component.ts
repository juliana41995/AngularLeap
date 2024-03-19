import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../login/login';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent {
  subscription: Subscription | any;
  element:any;
  user : User | any;
  usersData:User | any;

  constructor(private router: Router, private loginService : LoginService){
  }
  ngOnInit(): void {
    this.loadTitleMenuUI();
  }

  signout(){
    this.router.navigateByUrl('/');
  }
  
  loadTitleMenuUI(){
    this.user = this.loginService.getUserData();
    this.element = document.querySelector('modus-navbar');
    
    this.element.logoOptions = {
      primary: {
      url: 'https://modus-bootstrap.trimble.com/img/trimble-logo-rev.svg',
      height: 24,
    },
      secondary: { url: 'https://modus-bootstrap.trimble.com/img/trimble-logo-rev.svg', height: 24 },
    };

    this.element.profileMenuOptions = {
      avatarUrl: 'https://avatar.example.com/broken-image-link.png',
      email: this.user.email,
      initials: this.user.username.charAt(0).toUpperCase(),
      signOutText: 'Sign out',
      username: this.user.username,
  };
 }
}
