import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';


const routes: Routes = [
  {
    path: '',
    component: RoleComponent
  },
  {
    path: 'edit/:id',
    component: EditRoleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
