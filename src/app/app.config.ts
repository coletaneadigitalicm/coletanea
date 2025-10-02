import { ApplicationConfig, APP_INITIALIZER, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { MetadataService } from './core';

/**
 * Função de inicialização da aplicação
 * Carrega os metadados dos louvores antes da aplicação iniciar
 */
function initializeApp(metadataService: MetadataService) {
  return () => {
    return new Promise<void>((resolve) => {
      metadataService.loadMetadata().subscribe({
        next: () => {
          console.log('✅ Aplicação inicializada com metadados carregados');
          resolve();
        },
        error: (error) => {
          console.error('❌ Erro ao inicializar aplicação:', error);
          resolve(); // Resolve mesmo com erro para não bloquear a aplicação
        }
      });
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [MetadataService],
      multi: true
    }
  ]
};
