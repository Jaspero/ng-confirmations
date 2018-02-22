import {TemplateRef} from '@angular/core';

export interface ConfirmSettings {
  overlay?: boolean;
  overlayClickToClose?: boolean;
  showCloseButton?: boolean;
  confirmText?: string | TemplateRef<any>;
  declineText?: string | TemplateRef<any>;
}
