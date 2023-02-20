import { PerfumeService } from 'src/app/services/perfume.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { UserService } from 'src/app/services/user.service';
import { IDireccionCheckout } from '../../partials/header/shared/interfaces/IDireccionCheckout';
import { ITarjetaCheckout } from '../../partials/header/shared/interfaces/ITarjetaCheckout';
import { Direccion } from '../../partials/header/shared/models/Direccion';
import { Pedido } from '../../partials/header/shared/models/Pedido';
import { Tarjeta } from '../../partials/header/shared/models/Tarjeta';
import { User } from '../../partials/header/shared/models/User';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  pedido: Pedido = new Pedido();
  tarjeta: Tarjeta = new Tarjeta();
  checkoutForm!: FormGroup;
  user!: User;
  mesCaducidad!: number;
  anoCaducidad!: number;
  ultimaTarjeta!: Tarjeta;
  ultimaDireccion!: Direccion;
  constructor(
    cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private pedidoService: PedidoService,
    private toastrService: ToastrService,
    private tarjetaService: TarjetaService,
    private direccionService: DireccionService,
    private perfumeService: PerfumeService,
    private router: Router
  ) {
    const cart = cartService.getCart();
    this.pedido.productos = cart.items;
    this.pedido.precioTotal = cart.totalPrice;
    this.user = userService.currentUser;
    let tarjetasObservable = tarjetaService.findByUserId();
    tarjetasObservable.subscribe((tarjetas) => {
      this.ultimaTarjeta = tarjetas[tarjetas.length - 1];
    });

    let direccionesObservable = direccionService.findByUserId();
    direccionesObservable.subscribe((direcciones) => {
      this.ultimaDireccion = direcciones[direcciones.length - 1];
    });
  }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      piso: ['', Validators.required],
      letra: ['', [Validators.required, Validators.maxLength(1)]],
      codigoPostal: ['', Validators.required],
      localidad: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16)]],
      anoCaducidad: ['', [Validators.required, Validators.maxLength(2)]],
      cvv: ['', [Validators.required, Validators.maxLength(3)]],
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  setValues() {
    if (this.ultimaDireccion) {
      const { calle, numero, piso, letra, codigoPostal, localidad } =
        this.ultimaDireccion;
      this.checkoutForm.patchValue({
        calle,
        numero,
        piso,
        letra,
        codigoPostal,
        localidad,
      });
    }
    if (this.ultimaTarjeta) {
      const { numeroTarjeta } = this.ultimaTarjeta;

      this.checkoutForm.patchValue({
        numeroTarjeta,
      });
    }
  }

  crearPedido() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning(
        'Por favor rellena los campos',
        'Campos inválidos'
      );
      return;
    }
    const fv = this.checkoutForm.value;
    const direccion: IDireccionCheckout = {
      calle: fv.calle,
      numero: fv.numero,
      piso: fv.piso,
      letra: fv.letra,
      codigoPostal: fv.codigoPostal,
      localidad: fv.localidad,
      user: this.user,
    };
    const tarjeta: ITarjetaCheckout = {
      numeroTarjeta: fv.numeroTarjeta,
      fechaCaducidad: this.mesCaducidad + '/' + fv.anoCaducidad,
      cvv: fv.cvv,
      user: this.user,
    };
    this.pedido.user = this.user;
    this.pedido.fecha = new Date();
    this.pedido.direccion = direccion;
    this.pedido.estado = 'En curso';
    this.pedido.tarjeta = tarjeta;
    this.tarjetaService.pushTarjeta(tarjeta).subscribe((data) => {
      console.log(data);
    });
    this.direccionService.pushDireccion(direccion).subscribe((data) => {
      console.log(data);
    });

    this.pedidoService.pushPedido(this.pedido).subscribe((_) => {
      this.pedido.productos.forEach((producto) => {
        this.perfumeService
          .updateStock(producto.perfume.id + '', producto.cantidad)
          .subscribe((data) => {
            console.log(data);
          });
      });
      this.router.navigateByUrl('/');
    });
  }

  changeMesCaducidad(mesCaducidad: string) {
    const mes = parseInt(mesCaducidad);
    this.mesCaducidad = mes;
    console.log(this.mesCaducidad);
  }

  get isAuth() {
    return this.user.token;
  }

  submit() {}
}
