import { Injectable } from '@angular/core';
import { Cart } from '../components/partials/header/shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Perfume } from '../components/partials/header/shared/models/Perfume';
import { CartItem } from '../components/partials/header/shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() {}

  addToCart(perfume: Perfume): void {
    let cartItem = this.cart.items.find(
      (item) => item.perfume.id === perfume.id
    );

    if (cartItem) {
      return;
    }
    this.cart.items.push(new CartItem(perfume));
    this.setCartToLocalStorage();
  }

  removeFromCart(perfumeId: number): void {
    this.cart.items = this.cart.items.filter(
      (item) => item.perfume.id != perfumeId
    );
    this.setCartToLocalStorage();
  }

  changeQuantity(perfumeId: number, cantidad: number): void {
    let cartItem = this.cart.items.find((item) => item.perfume.id == perfumeId);
    if (!cartItem) {
      return;
    }

    cartItem.cantidad = cantidad;
    cartItem.precio = cantidad * cartItem.perfume.precio;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.precio,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.cantidad,
      0
    );
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
