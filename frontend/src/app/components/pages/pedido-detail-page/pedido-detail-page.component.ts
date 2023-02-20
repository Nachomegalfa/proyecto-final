import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from '../../partials/header/shared/models/Pedido';

@Component({
  selector: 'app-pedido-detail-page',
  templateUrl: './pedido-detail-page.component.html',
  styleUrls: ['./pedido-detail-page.component.css'],
})
export class PedidoDetailPageComponent {
  pedido!: Pedido;

  constructor(activatedRoute: ActivatedRoute, pedidoService: PedidoService) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        pedidoService.getPedidoById(params.id)!.subscribe((pedido) => {
          this.pedido = pedido;
        });
      }
    });
  }
}
