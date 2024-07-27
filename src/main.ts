import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { ServiceWorkerModule } from '@angular/service-worker';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

if (environment.production) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `ngsw-worker.js`; // Ensure correct path
      navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(err => {
          console.error('Service Worker registration failed:', err);
        });
    });
  }
}
