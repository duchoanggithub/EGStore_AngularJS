import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryComponent } from './delivery.component';
import { EditDeliveryComponent } from './edit-delivery/edit-delivery.component';


const routes: Routes = [
  {
    path: '',
     component: DeliveryComponent
  },
  {
    path: 'edit/:id',
    component: EditDeliveryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }
