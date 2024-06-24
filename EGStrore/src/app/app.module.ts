import { NgModule } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule, provideToastr, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDividerModule } from '@angular/material/divider';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FilterPipe } from './filter.pipe';

import { BodyComponent } from './body/body.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AddOrderComponent } from './order/add-order/add-order.component';
import { DetailOrderComponent } from './order/detail-order/detail-order.component';
import { EditOrderComponent } from './order/edit-order/edit-order.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { DetailProductComponent } from './product/detail-product/detail-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './supplier/edit-supplier/edit-supplier.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { DetailUserComponent } from './user/detail-user/detail-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AddBlogComponent } from './blog/add-blog/add-blog.component';
import { EditBlogComponent } from './blog/edit-blog/edit-blog.component';
import { AddRoleComponent } from './role/add-role/add-role.component';
import { EditRoleComponent } from './role/edit-role/edit-role.component';
import { PagesComponent } from './pages/pages.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { DetailCategoryprodComponent } from './pages-product/detail-categoryprod/detail-categoryprod.component';
import { CartComponent } from './pages-product/cart/cart.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { AddDeliveryComponent } from './delivery/add-delivery/add-delivery.component';
import { EditDeliveryComponent } from './delivery/edit-delivery/edit-delivery.component';

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
import { ImgSliderComponent } from './slider/img-slider/img-slider.component';
import { ProductSliderComponent } from './slider/product-slider/product-slider.component';
import { CheckoutComponent } from './pages-product/cart/checkout/checkout.component';
import { UserDetailComponent } from './pages-user/user-detail/user-detail.component';
import { AuthInterceptor } from './auth.interceptor';





export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    LoginComponent,
    SidenavComponent,
    HeaderComponent,
    BodyComponent,
    SublevelMenuComponent,
    DasboardComponent,

    AddOrderComponent,
    EditOrderComponent,
    DetailOrderComponent,

    DetailProductComponent,
    AddProductComponent,
    EditProductComponent,

    EditSupplierComponent,
    AddSupplierComponent,

    AddUserComponent,
    EditUserComponent,
    DetailUserComponent,

    AddBlogComponent,
    EditBlogComponent,

    FilterPipe,

    AddRoleComponent,
    EditRoleComponent,

    AddCategoryComponent,
    EditCategoryComponent,

    AddDeliveryComponent,
    EditDeliveryComponent,

    PagesComponent,
    NavbarComponent,
    FooterComponent,
    
    DetailCategoryprodComponent,
    CartComponent,
    AllProductComponent,
    GlassesProductComponent,
    SunglassProductComponent,
    LensProductComponent,
    BlogPageComponent,
    AmoComponent,
    AncciComponent,
    BolonComponent,
    PumaComponent,
    GucciComponent,
    BlogDetailComponent,
    ImgSliderComponent,
    ProductSliderComponent,
    CheckoutComponent,
    UserDetailComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CdkMenuModule,
    MatSlideToggleModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,
    OverlayModule,
    MatCardModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatGridListModule,
    MatMenuModule,
    MatExpansionModule,
    MatBadgeModule,
    MatDividerModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
         allowedDomains: ['localhost:4200'],  
        disallowedRoutes: ['localhost:4200/api/auth'],  
      },
    }),
  ],
  providers: [
    provideAnimationsAsync(),
    provideToastr(),
    ToastrService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
