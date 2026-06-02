import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly BASE_URL = 'https://api.example.com/v1';
  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` });
  }
  get<T>(endpoint: string): Observable<T> { return this.http.get<T>(`${this.BASE_URL}${endpoint}`, { headers: this.headers() }).pipe(catchError(this.handleError)); }
  post<T>(endpoint: string, body: unknown): Observable<T> { return this.http.post<T>(`${this.BASE_URL}${endpoint}`, body, { headers: this.headers() }).pipe(catchError(this.handleError)); }
  patch<T>(endpoint: string, body: unknown): Observable<T> { return this.http.patch<T>(`${this.BASE_URL}${endpoint}`, body, { headers: this.headers() }).pipe(catchError(this.handleError)); }
  delete<T>(endpoint: string): Observable<T> { return this.http.delete<T>(`${this.BASE_URL}${endpoint}`, { headers: this.headers() }).pipe(catchError(this.handleError)); }
  private handleError(error: any): Observable<never> { return throwError(() => new Error(error.message || 'Unknown API error')); }
}
