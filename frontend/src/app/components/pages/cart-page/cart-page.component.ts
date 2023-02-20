import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from '../../partials/header/shared/models/Cart';
import { CartItem } from '../../partials/header/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {}

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.perfume.id);
  }

  changeQuantity(quantityInString: string, cartItem: CartItem) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.perfume.id, quantity);
  }
}
