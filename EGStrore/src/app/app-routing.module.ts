import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { LayoutComponent } from './layout/layout.component';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { DetailCategoryprodComponent } from './pages-product/detail-categoryprod/detail-categoryprod.component';
import { CartComponent } from './pages-product/cart/cart.component';
import { AllProductComponent } from './pages-product/all-product/all-product.component';
import { GlassesProductComponent } from './pages-product/glasses-product/glasses-product.component';
import { SunglassProductComponent } from './pages-product/sunglass-product/sunglass-product.component';
import { LensProductComponent } from './pages-product/lens-product/lens-product.component';
import { BlogPageComponent } from './pages-product/blog-page/blog-page.component';
import { AmoComponent } from './pages-product/amo/amo.component';
import { AncciComponent } from './pages-product/ancci/ancci.component';
import { BolonComponent } from './pages-product/bolon/bolon.component';
import { PumaComponent } from './pages-product/puma/puma.component';
import { GucciComponent } from './pages-product/gucci/gucci.component';
import { BlogDetailComponent } from './pages-product/blog-page/blog-detail/blog-detail.component';
import { CheckoutComponent } from './pages-product/cart/checkout/checkout.component';
import { authGuard } from './auth.guard';
import { UserDetailComponent } from './pages-user/user-detail/user-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/page/home', pathMatch: 'full' },
  {
    path: 'page',
    component: PagesComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'user-detail/:id', component: UserDetailComponent },
      { path: 'detail-category-product/:id', component: DetailCategoryprodComponent },
      { path: 'all-product', component: AllProductComponent },
      { path: 'glasses-product/:id', component: GlassesProductComponent },
      { path: 'lens-product/:id', component: LensProductComponent },
      { path: 'sunglass-product/:id', component: SunglassProductComponent },
      { path: 'amo/:id', component: AmoComponent },
      { path: 'ancci/:id', component: AncciComponent },
      { path: 'bolon/:id', component: BolonComponent },
      { path: 'puma/:id', component: PumaComponent },
      { path: 'gucci/:id', component: GucciComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'blog-page', component: BlogPageComponent },
      { path: 'blog-detail/:id', component: BlogDetailComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
    children: [
      { 
        path: 'dashboard', component: DasboardComponent 
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
      },
      {
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.RoleModule),
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
      },
      {
        path: 'delivery',
        loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule),
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
      },
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
      },
      {
        path: 'supplier',
        loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule),
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
