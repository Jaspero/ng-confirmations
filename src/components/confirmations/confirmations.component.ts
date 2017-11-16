import {
    Component,
    ComponentFactoryResolver,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ConfirmationService} from '../../services/confirmations.service';
import {ConfirmationComponent} from '../confirmation/confirmation.component';
import {ConfirmSettings} from '../../interfaces/confirm-settings';
import {ResolveEmit} from '../../interfaces/resolve-emit';

@Component({
    selector: 'jaspero-confirmations',
    entryComponents: [ConfirmationComponent],
    template: `<div #comp></div>`
})
export class ConfirmationsComponent implements OnInit, OnDestroy {
    constructor(
        private _service: ConfirmationService,
        private _resolver: ComponentFactoryResolver,
        private _domSanitize: DomSanitizer
    ) { }

    @ViewChild('comp', {read: ViewContainerRef}) compViewContainerRef: ViewContainerRef;

    @Input() set defaultSettings(settings: ConfirmSettings) {
        this.settings = {...this.settings, ...settings};
    }

    settings: ConfirmSettings | any = {
        overlay: true,
        overlayClickToClose: true,
        showCloseButton: true,
        confirmText: 'Yes',
        declineText: 'No'
    };

    private _current: any;
    private _lastResolve: any;
    private _listener: any;

    ngOnInit() {

        this._listener = this._service.confirmation$.subscribe((confirmation: any) => {
            if (this._current) {
                this._handleResolve();
            }

            if (confirmation.close) {
                return;
            }

            const settingsFinal = {};

            for (const key in this.settings) {
                if (this.settings.hasOwnProperty(key)) {
                    settingsFinal[key] = confirmation.override[key] !== undefined ? confirmation.override[key] : this.settings[key];
                }
            }

            const injector = Injector.create([], this.compViewContainerRef.parentInjector);
            const factory = this._resolver.resolveComponentFactory(ConfirmationComponent);
            const component = factory.create(injector);

            component.instance.incomingData = {
                ...settingsFinal,
                ...this._buildItemTemplate('message', confirmation.message),
                ...this._buildItemTemplate('title', confirmation.title),
                ...this._buildItemTemplate('confirmText', confirmation.override.confirmText),
                ...this._buildItemTemplate('declineText', confirmation.override.declineText),
                resolve$: confirmation.resolve$
            };

            this._lastResolve = confirmation.resolve$.subscribe((res: any) => this._handleResolve(res));

            this.compViewContainerRef.insert(component.hostView);

            this._current = component;
        });
    }

    ngOnDestroy() {
        if (this._listener) {
            this._listener.unsubscribe();
        }
    }

    private _handleResolve(res?: ResolveEmit) {
        this._current.destroy();
        this._lastResolve.unsubscribe();
    }

    private _buildItemTemplate(key: string, value: any) {

        if (!value) {
            return {};
        }

        if (value instanceof TemplateRef) {
            return {[key]: value, [`${key}IsTemplate`]: true};
        } else {
            return {[key]: this._domSanitize.bypassSecurityTrustHtml(value)};
        }
    }
}
