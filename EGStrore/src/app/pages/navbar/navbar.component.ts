import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { userItems } from './navbar-item';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  userItems = userItems;
  searchKeyword: string = '';
  searchResults: any[] = [];

  @Output() designSelected = new EventEmitter<string>();

  constructor(
    private router: Router,
    private prodSV: ProductService,
    private authSV: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.authSV.isLoggedIn.subscribe(status => this.isLoggedIn = status);
    const userName = localStorage.getItem('userName');
  }

  search(): void {
    if (this.searchKeyword.trim() !== '') {
      this.prodSV.searchProduct(this.searchKeyword).subscribe(
        (results) => {
          this.searchResults = results;
        },
        (error) => {
          console.error('Error searching products:', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }

  goToProductDetail(productId: string): void {
    this.router.navigate(['/page/detail-category-product', productId]);
  }

  selectCategory(categoryId: string): void {
    this.prodSV.selectCategory(categoryId);
    this.router.navigate(['/page/home']);
  }

  selectSup(supId: string): void {
    this.prodSV.selectSup(supId);
    this.router.navigate(['/page/home']);
  }

  home(): void {
    this.router.navigate(['/page/home']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authSV.logout();
    this.router.navigate(['/login']);
  }
  navigateToCart(): void {
    this.router.navigate(['/page/cart']);
  }

  navigateToProfile() {
    const userName = localStorage.getItem('userName');
    console.log('UserName from local storage:', userName);
    if (userName) {
      this.router.navigate(['/page/user-detail', userName]);
    }
}

}
