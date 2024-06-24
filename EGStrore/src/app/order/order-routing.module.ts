import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';


const routes: Routes = [
  {
    path: '',
    component: OrderComponent
  },
  {
    path: 'edit/:id',
    component: EditOrderComponent
  },
  {
    path: 'detail/:id',
    component: DetailOrderComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
