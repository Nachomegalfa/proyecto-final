import { PERFUMES_UPDATE_URL } from './../components/partials/header/shared/constants/urls';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_perfume } from 'src/data';
import {
  PERFUMES_BY_ID_URL,
  PERFUMES_BY_SEARCH_URL,
  PERFUMES_URL,
} from '../components/partials/header/shared/constants/urls';
import { Perfume } from '../components/partials/header/shared/models/Perfume';

@Injectable({
  providedIn: 'root',
})
export class PerfumeService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Perfume[]> {
    return this.http.get<Perfume[]>(PERFUMES_URL);
  }

  getAllPerfumesBySearchTerm(searchTerm: string) {
    return this.http.get<Perfume[]>(PERFUMES_BY_SEARCH_URL + searchTerm);
  }

  getPerfumeById(perfumeId: string) {
    return this.http.get<Perfume>(PERFUMES_BY_ID_URL + perfumeId);
  }

  updateStock(perfumeId: string, cantidad: number): Observable<Perfume> {
    return this.http.post<Perfume>(PERFUMES_UPDATE_URL + perfumeId, {
      cantidad: cantidad,
    });
  }
}
