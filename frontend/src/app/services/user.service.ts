import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  USERS_URL,
  USER_LOGIN_URL,
  USER_REGISTER_URL,
} from '../components/partials/header/shared/constants/urls';
import { IUserLogin } from '../components/partials/header/shared/interfaces/IUserLogin';
import { IUserRegister } from '../components/partials/header/shared/interfaces/IUserRegister';
import { tarjetas_direcciones } from '../components/partials/header/shared/models/tarjetas_direcciones';
import { User } from '../components/partials/header/shared/models/User';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  //Método para devolver el usuario que ha iniciado sesión
  public get currentUser(): User {
    return this.userSubject.value;
  }

  //Método para realizar le login
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Bienvenido a Perfumes García ${user.nombre}`,
            'Login Correcto'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'El login falló');
        },
      })
    );
  }

  //Método para registrar un nuevo usuario
  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Bienvenido a Perfumes García ${user.nombre}`,
            'Registro exitoso'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Registro fallido');
        },
      })
    );
  }

  //Método para cerrar sesión
  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  //Método para actualizar el usuario del localstorage
  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  //Método para recoger el usuario almacenado en el localstorage
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      return JSON.parse(userJson) as User;
    }
    return new User();
  }
}
