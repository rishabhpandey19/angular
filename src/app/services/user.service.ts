import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User { id: number; name: string; email: string; role: 'admin' | 'editor' | 'viewer'; createdAt: string; active: boolean; }
export interface PaginatedResponse<T> { data: T[]; total: number; page: number; limit: number; }

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly API = '/api/users';
  constructor(private http: HttpClient) {}

  getUsers(page = 1, limit = 20): Observable<PaginatedResponse<User>> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<PaginatedResponse<User>>(this.API, { params });
  }
  getUserById(id: number): Observable<User> { return this.http.get<User>(`${this.API}/${id}`); }
  createUser(user: Omit<User, 'id' | 'createdAt'>): Observable<User> { return this.http.post<User>(this.API, user); }
  updateUser(id: number, changes: Partial<User>): Observable<User> { return this.http.patch<User>(`${this.API}/${id}`, changes); }
  deleteUser(id: number): Observable<void> { return this.http.delete<void>(`${this.API}/${id}`); }
}
