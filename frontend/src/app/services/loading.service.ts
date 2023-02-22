import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  constructor() {}

  //Método para mostrar la pantalla de carga
  showLoading() {
    this.isLoadingSubject.next(true);
  }

  //Método para esconder la pantalla de carga
  hideLoading() {
    this.isLoadingSubject.next(false);
  }

  //Método para saber si se está mostrando la pantalla de carga
  get isLoading() {
    return this.isLoadingSubject.asObservable();
  }
}
