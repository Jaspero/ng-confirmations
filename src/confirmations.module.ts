import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmationsComponent} from './confirmations.component';
import {ConfirmationComponent} from './confirmation.component';
import {ConfirmationService} from './confirmations.service';

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
