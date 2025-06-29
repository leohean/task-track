import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Skip adding token for refresh token requests
  if (req.url.includes('auth/refresh')) {
    return next(req);
  }
  
  const token = authService.getToken();
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        return authService.refreshToken().pipe(
          switchMap(response => {
            authService.setToken(response.token);
            authService.setIsRefreshing(false);

            // Clone the original request with the new token
            const newRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.token}`
              }
            });

            // Retry the request with the new token
            return next(newRequest);
          }),
          catchError(refreshError => {
            authService.setIsRefreshing(false);
            authService.removeTokens();
            router.navigate(['/login']);
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
}; 