import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ConfirmSettings} from './interfaces/confirm-settings';
import {ConfirmEmit} from './interfaces/confirm-emit';
import {ResolveEmit} from './interfaces/resolve-emit';

@Injectable()
export class ConfirmationService {
    confirmation$: Subject<ConfirmEmit> = new Subject();

    create(title: string, message: string, settingsOverrides: ConfirmSettings = {}) {
        let resolve$: Subject<ResolveEmit> = new Subject();

        this.confirmation$.next({title: title, message: message, resolve: resolve$, override: settingsOverrides});

        return resolve$;
    }
}
