import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if(authService.isLoggedIn()){

    const cloneReq = req.clone({
      headers: req.headers.set('Authorization','Bearer ' + authService.getToken())
    });
    return next(cloneReq).pipe(
      tap({
        error: (err:any)=>{
          if(err.status == 401){
            authService.deleteToken();
            setTimeout(() => {
              toastr.info('Porfavor inicie sesión de nuevo', 'Sesión expirada');
            }, 1500);
            router.navigateByUrl('/user/login');
          }
          else if (err.status == 403)
            toastr.error('No tiene permisos para acceder a este recurso', 'Acceso denegado');
            router.navigateByUrl('/layout/forbidden');
        }
      })
    )
  }
  else
    return next(req);
};
