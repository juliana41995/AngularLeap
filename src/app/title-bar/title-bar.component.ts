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

    this.element.apps = [
      {
          description: 'The One Trimble Design System',
          logoUrl: 'https://modus.trimble.com/favicon.svg',
          name: 'Trimble Modus',
          url: 'https://modus.trimble.com/',
      },
    ];
    
    this.element.logoOptions = {
      primary: {
        url: '/assets/agile.png',
        ///https://modus-bootstrap.trimble.com/img/trimble-logo-rev.svg
        height: 24,
      },
      secondary: { url: 'https://modus.trimble.com/favicon.svg', height: 24 },
    };

    this.element.profileMenuOptions = {
      email: this.user.email,
      initials: this.user.username.charAt(0).toUpperCase(),
      signOutText: 'Sign out',
      username: this.user.username,
  };
 }
}
