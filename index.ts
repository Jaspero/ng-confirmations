import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationsComponent} from './src/confirmations.component';
import {ConfirmationComponent} from './src/confirmation.component';
import {ConfirmationService} from './src/confirmations.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export * from './src/confirmations.component';
export * from './src/confirmation.component';
export * from './src/confirmations.service';
export * from './src/interfaces/confirm-emit';
export * from './src/interfaces/confirm-settings';
export * from './src/interfaces/resolve-emit';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule
    ],
    declarations: [
        ConfirmationsComponent,
        ConfirmationComponent
    ],
    providers: [ConfirmationService],
    exports: [ConfirmationsComponent]
})
export class JasperoConfirmationsModule {}
