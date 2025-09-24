import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';

import { App } from './app/app';
import { routes } from './app/app.routes';
import { errorInterceptor } from './app/core/interceptors/error-interceptor';
import { loadingInterceptor } from './app/core/interceptors/loading-interceptor';

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor, loadingInterceptor])),
  ],
}).catch((err) => console.error(err));
