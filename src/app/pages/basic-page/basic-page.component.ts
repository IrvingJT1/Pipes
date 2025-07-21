import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { AvailableLocale, LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-pages',
  standalone: true,
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicPagesComponent { 

  //A currentLocale se le asigna el valor de la constante LOCALE_ID para que sepa en todo momento que valor se tiene
  //de idioma durante los cambios

  localeService = inject(LocaleService);
  currentLocale = signal(inject(LOCALE_ID));

  nameLower = signal('irving');
  nameUpper = signal('IRVING');
  fullName = signal('IrVinG');

  customDate = signal(new Date());

  //La función de cleanup se ejecuta cuando el efecto se destruye (al cambiar de componente, por ejemplo), 
  //para que no se sigan ejecutando efectos innecesarios durante la navegación
  tickingDateEffect = effect((onCleanup) => {
    const interval = setInterval(() => {
      console.log('tick')
      this.customDate.set(new Date())
    }, 1000);

    onCleanup(() =>{
      clearInterval(interval);
    })
  });

  changeLocale = (locale: AvailableLocale) =>{
    this.localeService.changeLocale(locale);
  }

}
