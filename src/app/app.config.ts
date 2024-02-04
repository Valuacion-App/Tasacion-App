import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { addTokenInterceptor } from './utils/add-token.interceptor';
import { loaderInterceptor } from './utils/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(withInterceptors([addTokenInterceptor, loaderInterceptor])),
    provideAnimations(),
    provideToastr({
      timeOut: 7000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })]
};
