import { Component, NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'AngularNex';
  constructor() {}
  public name = "hello again";
}

@NgModule({
  declarations: [
  ],
  imports: [
    MatIconModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
 
}


