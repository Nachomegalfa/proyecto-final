import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, tap } from 'rxjs';
import {
  TARJETAS_URL,
  TARJETA_CREATE_URL,
} from '../components/partials/header/shared/constants/urls';
import { ITarjetaCheckout } from '../components/partials/header/shared/interfaces/ITarjetaCheckout';
import { Tarjeta } from '../components/partials/header/shared/models/Tarjeta';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  constructor(private http: HttpClient, private userService: UserService) {}

  //Método para subir una tarjeta a la BBDD
  pushTarjeta(tarjeta: ITarjetaCheckout): Observable<Tarjeta> {
    console.log('push tarjeta');
    return this.http.post<Tarjeta>(TARJETA_CREATE_URL, tarjeta).pipe();
  }

  //Método para devolver las tarjeta de un usuario por su id
  findByUserId(): Observable<Tarjeta[]> {
    console.log(this.userService.currentUser.id);
    return this.http.get<Tarjeta[]>(
      TARJETAS_URL + '/' + this.userService.currentUser.id
    );
  }
}
