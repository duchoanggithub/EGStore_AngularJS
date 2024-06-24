import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';


const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'edit/:id',
    component: EditProductComponent
  },
  {
    path: 'detail/:id',
    component: DetailProductComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
