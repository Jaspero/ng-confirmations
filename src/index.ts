import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationsComponent} from './components/confirmations/confirmations.component';
import {ConfirmationComponent} from './components/confirmation/confirmation.component';
import {ConfirmationService} from './services/confirmations.service';
import {VariableContentComponent} from './components/variable-content/variable-content.component';

export * from './components/confirmations/confirmations.component';
export * from './components/confirmation/confirmation.component';
export * from './components/variable-content/variable-content.component';
export * from './services/confirmations.service';
export * from './interfaces/confirm-emit';
export * from './interfaces/confirm-settings';
export * from './interfaces/resolve-emit';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ConfirmationsComponent,
    ConfirmationComponent,
    VariableContentComponent
  ],
  exports: [
    ConfirmationsComponent
  ]
})
export class JasperoConfirmationsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: JasperoConfirmationsModule,
      providers: [ConfirmationService]
    };
  }
}
