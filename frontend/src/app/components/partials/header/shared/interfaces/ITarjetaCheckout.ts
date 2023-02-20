import { User } from '../models/User';

export interface ITarjetaCheckout {
  numeroTarjeta: string;
  fechaCaducidad: string;
  cvv: number;
  user: User;
}
