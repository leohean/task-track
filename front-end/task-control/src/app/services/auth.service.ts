import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';
import { Role } from '../enums/role.enum';

interface TokenResponse {
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface JwtPayload {
  email?: string;
  password?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private isRefreshing = false;

  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${environment.apiUrl}auth/login`, credentials);
  }

  register(registerData: RegisterData): Observable<any> {
    return this.http.post(`${environment.apiUrl}auth/register`, registerData);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Decodifica um token JWT usando a biblioteca jwt-decode
   */
  public decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }

  /**
   * Extrai as credenciais do token JWT atual
   */
  private getCredentialsFromToken(): LoginCredentials | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const payload = this.decodeToken(token);
    if (!payload || !payload.email || !payload.password) {
      return null;
    }

    return {
      email: payload.email,
      password: payload.password
    };
  }

  refreshToken(): Observable<TokenResponse> {
    if (this.isRefreshing) {
      return throwError(() => new Error('Token refresh already in progress'));
    }

    this.isRefreshing = true;

    // Tenta obter as credenciais do token atual
    const credentials = this.getCredentialsFromToken();
    
    if (!credentials) {
      return throwError(() => new Error('Não foi possível extrair credenciais do token'));
    }

    return this.login(credentials);
  }

  setIsRefreshing(value: boolean): void {
    this.isRefreshing = value;
  }
} 