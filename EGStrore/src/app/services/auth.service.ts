import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5144/api';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userRole = new BehaviorSubject<string>('');
  private currentToken = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) {
    this.decodeToken();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || '';
      const userName = decodedToken['sub'] || ''; // Trích xuất userName
      if (userName) {
        console.log('Extracted userName:', userName);
        this.userRole.next(role);
        this.currentToken.next(token);
        localStorage.setItem('userName', userName); // Lưu userName vào local storage
      } else {
        console.error('Error extracting userName from token.');
      }
    }
}
  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get currentUserRole(): Observable<string> {
    return this.userRole.asObservable();
  }

  get currentTokenValue(): Observable<string | null> {
    return this.currentToken.asObservable();
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Authen/Register`, userData).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  login(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Authen/Login`, { userName, password }).pipe(
      map(res => {
        // Lưu trữ token vào local storage hoặc session storage
        const token = res.token;
        console.log('Received token:', token);
        localStorage.setItem('token', token);
        this.loggedIn.next(true);
        this.decodeToken();
        return res;
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.loggedIn.next(false);
    this.userRole.next('');
    this.currentToken.next(null);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}