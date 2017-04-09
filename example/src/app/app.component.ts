import { Component } from '@angular/core';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng2-confirmations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private _confirmation: ConfirmationService) {}

    create() {
        this._confirmation.create('Do something?', 'You should really just do it.')
        // The confirmation returns an Observable Subject which will notify you about the outcome
            .subscribe((ans: ResolveEmit) => console.log(ans))
    }
}
