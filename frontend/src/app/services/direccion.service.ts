import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DIRECCIONES_URL,
  DIRECCION_CREATE_URL,
} from '../components/partials/header/shared/constants/urls';
import { IDireccionCheckout } from '../components/partials/header/shared/interfaces/IDireccionCheckout';
import { Direccion } from '../components/partials/header/shared/models/Direccion';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class DireccionService {
  constructor(private http: HttpClient, private userService: UserService) {}

  //Método para subir una dirección a la BBDD
  pushDireccion(direccion: IDireccionCheckout): Observable<Direccion> {
    return this.http.post<Direccion>(DIRECCION_CREATE_URL, direccion).pipe();
  }

  //Método para buscar las direcciones de un usuario por su id
  findByUserId(): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(
      DIRECCIONES_URL + '/' + this.userService.currentUser.id
    );
  }
}
