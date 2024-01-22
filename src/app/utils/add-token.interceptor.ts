import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

export const addTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
  ): Observable<HttpEvent<unknown>> => {
    const router = inject(Router)
    const token = localStorage.getItem('token')
    if(token) {
      req = req.clone({setHeaders: {
        authorization: `Bearer ${token}`
      }})
    }
  return next(req).pipe(
    catchError((error) => {
      const codes = [401,403]

      if(codes.includes(error.status)) {
        router.navigate(['/login'])
      }

      return throwError(() => error)
    })
  );
};
