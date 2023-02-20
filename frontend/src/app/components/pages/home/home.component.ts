import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PerfumeService } from 'src/app/services/perfume.service';
import { Perfume } from '../../partials/header/shared/models/Perfume';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  perfumes: Perfume[] = [];
  constructor(
    private perfumeService: PerfumeService,
    activatedRoute: ActivatedRoute
  ) {
    let perfumesObservable: Observable<Perfume[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        perfumesObservable = this.perfumeService.getAllPerfumesBySearchTerm(
          params.searchTerm
        );
      } else {
        perfumesObservable = perfumeService.getAll();
      }
      let perfumesConStock: Perfume[] = [];
      perfumesObservable.subscribe((perfumes) => {
        perfumes.forEach((perfume) => {
          if (perfume.stock > 10) {
            perfumesConStock.push(perfume);
          }
          this.perfumes = perfumesConStock;
        });
      });
    });
  }
  ngOnInit(): void {}
}
