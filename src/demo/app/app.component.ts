import {Component} from '@angular/core';
import {ConfirmationService} from '@jaspero/ng2-confirmations';

@Component({
  selector: 'demo-app',
  template: `
      <jaspero-confirmations></jaspero-confirmations>
      <h3>Meaning is: {{meaning}}</h3>
  `,
})
export class AppComponent {
  constructor(serivice: ConfirmationService) {
    serivice.create('Do something?', 'You should really just do it.')
        .subscribe((ans: any) => console.log(ans))
  }
}
