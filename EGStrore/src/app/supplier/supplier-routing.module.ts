import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierComponent } from './supplier.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';


const routes: Routes = [
  {
    path: '',
     component: SupplierComponent
  },
  {
    path: 'edit/:id',
    component: EditSupplierComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
