import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginPayload { email: string; password: string; }
export interface AuthResponse { token: string; user: { id: number; name: string; email: string; role: string }; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = '/api/auth';
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const stored = localStorage.getItem('auth');
    if (stored) this.currentUserSubject.next(JSON.parse(stored));
  }

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/login`, payload).pipe(
      tap((res) => { localStorage.setItem('auth', JSON.stringify(res)); this.currentUserSubject.next(res); })
    );
  }

  logout(): void { localStorage.removeItem('auth'); this.currentUserSubject.next(null); this.router.navigate(['/login']); }
  isLoggedIn(): boolean { return !!this.currentUserSubject.value; }
  getToken(): string | null { return this.currentUserSubject.value?.token ?? null; }
}
