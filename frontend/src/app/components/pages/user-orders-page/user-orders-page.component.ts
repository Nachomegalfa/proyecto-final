import { Component } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from '../../partials/header/shared/models/Pedido';

@Component({
  selector: 'app-user-orders-page',
  templateUrl: './user-orders-page.component.html',
  styleUrls: ['./user-orders-page.component.css'],
})
export class UserOrdersPageComponent {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {
    let pedidosObservable = this.pedidoService.getByUser();
    pedidosObservable.subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }

  cancelarPedido(pedidoId: number) {
    this.pedidoService.deletePedido(pedidoId + '').subscribe((err) => {
      let pedidosObservable = this.pedidoService.getByUser();
      pedidosObservable.subscribe((pedidos) => {
        this.pedidos = pedidos;
      });
    });
  }
}
