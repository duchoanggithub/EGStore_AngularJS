import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();

  private totalPrice = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPrice.asObservable();

  addToCart(product: any): void {
    const currentCart = this.cart.value;
    const existingProductIndex = currentCart.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
      currentCart[existingProductIndex].quantity += product.quantity;
    } else {
      currentCart.push(product);
    }
    this.cart.next(currentCart);
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    const total = this.cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
    this.totalPrice.next(total);
  }

  getCartItems(): any[] {
    return this.cart.value;
  }

  getTotalPrice(): number {
    return this.totalPrice.value;
  }

  clearCart(): void {
    this.cart.next([]);
    this.totalPrice.next(0);
  }
}
