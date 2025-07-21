import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-numbers-page',
  standalone: true,
  imports: [DecimalPipe, PercentPipe, CurrencyPipe],
  templateUrl: './numbers-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NumbersPageComponent { 


  totalSells = signal(2_233_232.5567);
  percent = signal(0.4856);

}
