import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private tokenKey = 'auth-token';
  private userKey = 'user-fullname';

  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;

  

  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser$: Observable<string | null>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const tokenExists = !!this.getToken();
    this.isLoggedInSubject = new BehaviorSubject<boolean>(tokenExists);
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();

    const fullName = this.getFullNameFromLocalStorage();
    this.currentUserSubject = new BehaviorSubject<string | null>(fullName);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user).pipe(
      tap((res: any) => {
        
        this.handleAuthentication(res.accessToken, res.user?.fullName, '/home');
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap((res: any) => {
        this.handleAuthentication(res.accessToken, res.user?.fullName, '/home');
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.setFullName(null);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private handleAuthentication(token: string, fullName: string | null, navigateTo: string): void {
    this.setToken(token);
    this.setFullName(fullName);
    this.isLoggedInSubject.next(true);
    this.currentUserSubject.next(fullName);
    this.router.navigate([navigateTo]);
  }

  private setFullName(name: string | null): void {
    if (name) {
      localStorage.setItem(this.userKey, name);
    } else {
      localStorage.removeItem(this.userKey);
    }
    this.currentUserSubject.next(name);
  }

  private getFullNameFromLocalStorage(): string | null {
    return localStorage.getItem(this.userKey);
  }
}
