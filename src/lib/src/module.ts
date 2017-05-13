import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationsComponent} from './confirmations.component';
import {ConfirmationComponent} from './confirmation.component';
import {ConfirmationService} from './confirmations.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ConfirmationsComponent,
        ConfirmationComponent
    ],
    providers: [ConfirmationService],
    exports: [ConfirmationsComponent]
})
export class JasperoConfirmationsModule {}
