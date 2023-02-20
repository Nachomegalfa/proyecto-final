import { Perfume } from './Perfume';

export class CartItem {
  constructor(public perfume: Perfume) {}
  cantidad: number = 1;
  precio: number = this.perfume.precio;
}
