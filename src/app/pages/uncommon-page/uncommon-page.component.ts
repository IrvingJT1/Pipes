import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { catchError, interval, map, tap, throwError } from 'rxjs';

const client1 = {
  name: 'Irving',
  gender: 'male',
  age: '34',
  address: 'Iztpalapa, CDMX'
}

const client2 = {
  name: 'Ivonne',
  gender: 'female',
  age: '37',
  address: 'Nagasaki, Japón'
}


@Component({
  selector: 'app-uncommon-page',
  standalone: true,
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './uncommon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UncommonPageComponent {

  // i18n Select

  //Se hace un objeto map para asociar los valores de género (male y female) con la palabra adecuada (invitarlo, invitarla)
   
  client= signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }

  changeClient = () =>{

    if( this.client() === client1 )
    {
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }

  // i18n Plural

  //Se hace un objeto similar al anterior, pero ahora asociado con un signal Object cuyos pares (key, value)
  //se asocian a un valor numérico, en este caso la cantidad de clientes
  //se muestran diversos escenarios como si solo hay 1 o ningún cliente esperando
  //o si hay más se hace un caso genérico, tomando en cuenta que si se desea incluir el valor numérico
  //en la cadena que se va a mostrar se usa un # para indicar que ahí se usará el valor

  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    other: 'tenemos # clientes esperando',
  })

  clients = signal([
    'Maria',
    'Pedro',
    'Fernando',
    'Melissa',
    'Natalia',
    'Andrea',
    'Juan',
    'Carlos'
  ]);


  deleteClient = () => {
    this.clients.update( (prev) => prev.slice(1) );

    //No se puede aplicar pop() directamente a un signalArray
    //por lo cual se usan copias auxiliares y al final un set para el signalArray original
    // const current = this.clients();
    // const newArray = current.slice(0,-1);
    // this.clients.set(newArray);

    console.log(this.clients())
  }

  //KeyValue Pipe

  profile = {
    name:'Irving',
    age: 34,
    address: 'Iztapalapa, CDMX'
  }


  // Async Pipe
  promiseValue: Promise<string>= new Promise((resolve, reject) =>{

    setTimeout(()=>{
      resolve('Tenemos data en la promesa.')

      // reject('Tenemos un problema.')

      console.log('Promesa finalizada')
    }, 3500);

  });

  // myObservableTimer = throwError(()=> new Error('Error en la ejecución'));
  
  myObservableTimer = interval(2000).pipe(
    map((value)=> value + 1),
    tap((value)=> console.log('tap', value)),
  );
  
 }
