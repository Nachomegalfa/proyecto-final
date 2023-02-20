import { User } from '../models/User';

export interface IDireccionCheckout {
  calle: string;
  numero: number;
  piso: number;
  letra: string;
  codigoPostal: string;
  localidad: string;
  user: User;
}
