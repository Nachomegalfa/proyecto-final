import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { PedidoDetailPageComponent } from './components/pages/pedido-detail-page/pedido-detail-page.component';
import { PerfumePageComponent } from './components/pages/perfume-page/perfume-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { UserOrdersPageComponent } from './components/pages/user-orders-page/user-orders-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'perfume/:id', component: PerfumePageComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'checkout', component: CheckoutPageComponent },
  { path: 'orders', component: UserOrdersPageComponent },
  { path: 'detalle/:id', component: PedidoDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
