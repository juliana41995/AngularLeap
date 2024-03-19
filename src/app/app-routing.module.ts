import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: '',component: LoginComponent },
  { path: 'kanban/:inputValue',component: TaskListComponent }
];

// const routes: Routes = [
//   {
//     path: 'login/:id',
//     component: LoginComponent,
//     data:{
//       role: 'ADMIN'
//     },
//     resolve: {
//       message: () => 'Rosolver Message'
//     }
//   }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
