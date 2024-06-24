import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(
    private cartSV: CartService,
    private router: Router,
    private userSV: UserService
    ) { }

  ngOnInit(): void {
    // Kiểm tra xem có dữ liệu giỏ hàng được lưu trong Local Storage không
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.updateTotalPrice();
    } else {
      this.updateCart();
    }

    // Subscribe để theo dõi thay đổi trong giỏ hàng
    this.cartSV.cart$.subscribe(() => {
      this.updateCart();
    });

  }

  updateCart(): void {
    this.cartItems = this.cartSV.getCartItems();
    this.updateTotalPrice();
    // Lưu dữ liệu giỏ hàng vào Local Storage
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  updateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Function to decrease quantity of an item in the cart
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotalPrice();
    }
  }

  // Function to increase quantity of an item in the cart
  increaseQuantity(item: any) {
    item.quantity++;
    this.calculateTotalPrice();
  }

  removeItemFromCart(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.calculateTotalPrice();
    }
  }

  ItemSum(item: any): number {
    return item.price * item.quantity;
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  goToCheckout(): void {
    this.router.navigate(['page/checkout']);
  }
}
