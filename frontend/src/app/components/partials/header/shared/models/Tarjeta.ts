import { User } from './User';

export class Tarjeta {
  id!: string;
  numeroTarjeta!: string;
  fechaCaducidad!: string;
  cvv!: number;
  user!: User;
}
