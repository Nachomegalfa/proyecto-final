import { IDireccionCheckout } from '../interfaces/IDireccionCheckout';
import { ITarjetaCheckout } from '../interfaces/ITarjetaCheckout';
import { CartItem } from './CartItem';
import { User } from './User';

export class Pedido {
  id!: number;
  fecha!: Date;
  estado!: string;
  user!: User;
  tarjeta!: ITarjetaCheckout;
  direccion!: IDireccionCheckout;
  productos!: CartItem[];
  precioTotal!: number;
}
