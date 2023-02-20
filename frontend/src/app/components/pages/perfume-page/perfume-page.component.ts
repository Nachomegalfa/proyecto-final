import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { PerfumeService } from 'src/app/services/perfume.service';
import { UserService } from 'src/app/services/user.service';
import { Perfume } from '../../partials/header/shared/models/Perfume';

@Component({
  selector: 'app-perfume-page',
  templateUrl: './perfume-page.component.html',
  styleUrls: ['./perfume-page.component.css'],
})
export class PerfumePageComponent implements OnInit {
  perfume!: Perfume;

  constructor(
    activatedRoute: ActivatedRoute,
    perfumeService: PerfumeService,
    private cartService: CartService,
    private router: Router,
    private userService: UserService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        perfumeService.getPerfumeById(params.id)!.subscribe((perfume) => {
          this.perfume = perfume;
        });
      }
    });
  }

  ngOnInit(): void {}

  addToCart() {
    this.cartService.addToCart(this.perfume);
    this.router.navigateByUrl('/');
  }

  get isAuth() {
    return this.userService.currentUser.token;
  }
}
