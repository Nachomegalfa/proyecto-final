import { IDireccionCheckout } from '../interfaces/IDireccionCheckout';
import { ITarjetaCheckout } from '../interfaces/ITarjetaCheckout';

export class User {
  id!: string;
  nombre!: string;
  apellidos!: string;
  email!: string;
  password!: string;
  fechaNacimiento!: string;
  token!: string;
}
