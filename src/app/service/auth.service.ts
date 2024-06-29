import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUser } from '../interfaces/Auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: any;
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  login(user: IUser): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, user).pipe(
      tap((response) => {
        this.setCurrentUser(response);
      })
    );
  }
  register(user: IUser): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }
  isAdmin(): boolean {
    if (this.currentUser && this.currentUser.role === 'admin') {
      return true;
    }
    return false;
  }
}
