import { Injectable, signal } from '@angular/core';

export type AvailableLocale = 'es'|'fr'|'en';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

//La variable currentLocale va a contener el valor de idioma actual, por defecto es español
//al construir la aplicación va a buscar en localStorage por si hay algun valor para sobreescribir y si no lo encuentra asignará español por defecto
//al cambiar el valor de locale con el metodo changeLocale se graba el valor en localStorage, se actualiza el valor de currentLocale
//y como la interacción con el archivo appConfig no puede ser reactiva se tiene que recargar la página para que se
//obtenga la nueva configuración con el idioma cambiado

  private currentLocale = signal<AvailableLocale>('es');

  constructor(){
    this.currentLocale.set(
      (localStorage.getItem('locale') as AvailableLocale) ?? 'es'
    );
  }

  get getLocale(){
    return this.currentLocale();
  }

  changeLocale(locale: AvailableLocale){
    localStorage.setItem('locale', locale);
    this.currentLocale.set(locale);

    window.location.reload();
  }

}
