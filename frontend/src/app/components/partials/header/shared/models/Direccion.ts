import { User } from './User';

export class Direccion {
  id!: number;
  calle!: number;
  numero!: number;
  piso!: number;
  letra!: string;
  codigoPostal!: string;
  localidad!: string;
  user!: User;
}
