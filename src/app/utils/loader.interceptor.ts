import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { inject } from '@angular/core';

export const loaderInterceptor: HttpInterceptorFn = (req, next, )=> {
    const _loaderService = inject( LoaderService)
    _loaderService.showLoader();
    return next(req).pipe(
      finalize(() => _loaderService.hideLoader())
    );
};
