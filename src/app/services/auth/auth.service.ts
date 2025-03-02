import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface LoginResponse {
  accessToken: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private tokenSubject = new BehaviorSubject<string>('');
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticatedSubject.next(true);
      this.tokenSubject.next(token);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          const token = response.accessToken;
          localStorage.setItem('token', token);
          this.isAuthenticatedSubject.next(true);
          this.tokenSubject.next(token);
        }),
        map(() => true),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(() => new Error('Login failed. Please check your credentials.'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.tokenSubject.next('');
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): Observable<string> {
    return this.tokenSubject.asObservable();
  }
} 