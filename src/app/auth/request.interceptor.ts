import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../shared/service/login.service';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  let authReq = req;

  if (!req.url.includes('viacep.com.br')) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
      if (usuarioAutenticado) {
        const usuario = JSON.parse(usuarioAutenticado);
        authReq = req.clone({
          setHeaders: { idSessao: usuario.idSessao }
        });
      }
    }
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        loginService.sair();
        router.navigate(['/login']);
      }
      return throwError(error);
    })
  );
};
