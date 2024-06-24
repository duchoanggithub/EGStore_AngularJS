import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';


const routes: Routes = [
  {
    path: '',
     component: UserComponent
  },
  {
    path: 'edit/:id',
    component: EditUserComponent
  },
  {
    path: 'detail/:id',
    component: DetailUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
