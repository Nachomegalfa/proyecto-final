import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  PEDIDO_BY_ID_URL,
  PEDIDO_BY_USER_URL,
  PEDIDO_CREATE_URL,
  PEDIDO_DELETE_URL,
} from '../components/partials/header/shared/constants/urls';
import { Pedido } from '../components/partials/header/shared/models/Pedido';
import { User } from '../components/partials/header/shared/models/User';
import { CartService } from './cart.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private cartService: CartService,
    private userService: UserService
  ) {}

  //Método para devolver un pedido por su id
  getPedidoById(id: string) {
    return this.http.get<Pedido>(PEDIDO_BY_ID_URL + id);
  }

  //Método para devolver los pedidos por el id del usuario
  getByUser(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(
      PEDIDO_BY_USER_URL + this.userService.currentUser.id
    );
  }

  //Método para subir un pedido a la BBDD
  pushPedido(pedido: Pedido) {
    return this.http.post<Pedido>(PEDIDO_CREATE_URL, pedido).pipe(
      tap({
        next: () => {
          this.toastrService.success(
            'Pedido realizado con éxito',
            'Pedido correcto'
          );
          this.cartService.clearCart();
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Pedido fallido');
        },
      })
    );
  }

  //Método para eliminar un pedido a la BBDD
  deletePedido(id: string) {
    return this.http.delete<Pedido>(PEDIDO_DELETE_URL + id);
  }
}
