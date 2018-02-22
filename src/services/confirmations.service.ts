import {Injectable, TemplateRef} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ConfirmSettings} from '../interfaces/confirm-settings';
import {ConfirmEmit} from '../interfaces/confirm-emit';
import {ResolveEmit} from '../interfaces/resolve-emit';

@Injectable()
export class ConfirmationService {
  confirmation$ = new Subject<ConfirmEmit>();

  create(
    title: string | TemplateRef<any> = '',
    message: string | TemplateRef<any> = '',
    override: ConfirmSettings = {}
  ) {
    const resolve$ = new Subject<ResolveEmit>();

    this.confirmation$.next({
      title,
      message,
      resolve$,
      override
    });

    return resolve$;
  }
}
