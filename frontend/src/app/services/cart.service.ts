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

  //Método para añadir al carrito los productos
  addToCart(perfume: Perfume): void {
    //Buscamos si el perfume que se pasa al método está dentro del carrito ya
    let cartItem = this.cart.items.find(
      (item) => item.perfume.id === perfume.id
    );

    //Si se encuentra ya en el carrito, hacemos return para que no se ejecute el resto del método
    if (cartItem) {
      return;
    }

    //Si no se encuentra ya en el carrito, lo añadimos y actualizamos el carrito del localstorage
    this.cart.items.push(new CartItem(perfume));
    this.setCartToLocalStorage();
  }

  //Método para eliminar del carrito los productos
  removeFromCart(perfumeId: number): void {
    //Recorremos la lista de perfumes y los que tengan el id del producto, se eliminan
    this.cart.items = this.cart.items.filter(
      (item) => item.perfume.id != perfumeId
    );

    //Actualizamos el carrito del localstorage
    this.setCartToLocalStorage();
  }

  //Método para cambiar la cantidad de los productos del carrito
  changeQuantity(perfumeId: number, cantidad: number): void {
    //Búscamos el producto del que se quiere cambiar la cantidad
    let cartItem = this.cart.items.find((item) => item.perfume.id == perfumeId);

    //Si no existe el producto en el carrito, hacemos return para que no se ejecute el resto del método
    if (!cartItem) {
      return;
    }

    //Si exite, asignamos la nueva cantidad y actualizamos el precio
    cartItem.cantidad = cantidad;
    cartItem.precio = cantidad * cartItem.perfume.precio;

    //Actualizamos el carrito del localstorage
    this.setCartToLocalStorage();
  }

  //Método para limpiar el carrito
  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  //Método para devolver el Observable del carrito para usarlo dentro de la clase
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  //Método para devolver el carrito
  getCart(): Cart {
    return this.cartSubject.value;
  }

  //Método para actualizar el carrito del localstorage
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

  //Método para recoger el carrito del localstorage
  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
