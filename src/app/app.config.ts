import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es-MX';

import localeFr from '@angular/common/locales/fr';

import { LocaleService } from './services/locale.service';


//registerLocaleData permite el registro de un idioma que puede ser usado por defecto en la aplicación
//para mostrar los números, nombres de meses, etc. en el formato de ciertos países
//en este caso se cambia el inglés por defecto a español de México
//se deja el francés también por si se requiere en un futuro


//como el archivo app.config está fuera del alcance la aplicación, se usa el servicio como depentencia
//en el parámetro deps:
//a continuación se usa el parámetro useFactory asignandole el getter que se definió en el servicio para obtener el valor de locale

registerLocaleData(localeEs, 'es');
registerLocaleData(localeFr, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),

    {
      provide: LOCALE_ID,
      // useValue: 'es'
      deps:[LocaleService],
      useFactory: (localeService: LocaleService) => localeService.getLocale,
    }

  ]
};
