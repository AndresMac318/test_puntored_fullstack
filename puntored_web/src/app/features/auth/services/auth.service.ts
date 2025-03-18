import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { SignupRequest } from '../interfaces/signupRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'auth_token';
  private api_url = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient, private router: Router, private location: Location) { }

  login(body: LoginRequest): Observable<any>{
    return this.http.post<any>(`${this.api_url}/auth/sign-in`, body).pipe(
      map(res => {        
        if (res.user) {
          const user = res.user;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userId', user.id);
          localStorage.setItem(this.TOKEN_KEY, res.token);
          localStorage.setItem('user', JSON.stringify(user));
          Swal.fire('Success', 'Login exitoso!', 'success');
          this.router.navigate(['recharges/all-recharges']).then(() => {
            this.location.replaceState('recharges/all-recharges');
          });
        } else {
          throw new Error('Invalid email or password');
        }
      }),
      catchError(error => {
        console.error('Error:', error);
        Swal.fire('Error', 'Email o contraseña incorrecta, intenta nuevamente!', 'error');
        throw new Error('Invalid email or password');
      })
    );
  }

  signup(userData: SignupRequest): Observable<any> {
    return this.http.post<any>(`${this.api_url}/auth/sign-up`, userData).pipe(
      map(res => {        
        if (res.firstName) {
          Swal.fire('Success', 'Registro exitoso, Inicia sesión', 'success');
          this.router.navigate(['auth/login']).then(() => {
            this.location.replaceState('auth/login');
          }); 
        }
      }),
      catchError(error => {
        console.error('Error:', error);
        Swal.fire('Error', error.error.message, 'error');
        throw new Error('Ocurrio un error al registrarte. Intenta nuevamente');
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUserId(){
    const userId = localStorage.getItem('userId');
    const parsedUserId = Number(userId);
    return isNaN(parsedUserId) ? 0 : parsedUserId;
  }
}
