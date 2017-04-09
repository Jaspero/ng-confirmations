import {Component, OnInit, ViewContainerRef, OnDestroy, Input, ReflectiveInjector, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {ConfirmationService} from './confirmations.service';
import {ConfirmationComponent} from './confirmation.component';
import {ConfirmSettings} from './interfaces/confirm-settings';
import {ResolveEmit} from './interfaces/resolve-emit';

@Component({
    selector: 'jaspero-confirmations',
    entryComponents: [ConfirmationComponent],
    template: `<div #comp></div>`
})
export class ConfirmationsComponent implements OnInit, OnDestroy {
    constructor(
        private _service: ConfirmationService,
        private _resolver: ComponentFactoryResolver
    ) { }

    @ViewChild('comp', {read: ViewContainerRef}) compViewContainerRef: ViewContainerRef;

    @Input() set defaultSettings(settings: ConfirmSettings) {
        this.settings = Object.assign({}, this.settings, settings);
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

        this._listener = this._service.confirmation$.subscribe((alert: any) => {
            if (this._current) this._handleResolve();

            if (!alert.close) {

                let settingsFinalAsArray = [],
                    settingFinalAsObj: any = {};

                for (let key in this.settings) {
                    let toUse: any = alert.override[key] !== undefined ? alert.override[key] : this.settings[key];

                    settingsFinalAsArray.push({key: key, value: toUse});
                    settingFinalAsObj[key] = toUse;
                }

                let inputProviders = [
                        {key: 'message', value: alert.message},
                        {key: 'title', value: alert.title},
                        {key: 'resolve', value: alert.resolve},
                        ...settingsFinalAsArray
                    ].map((input) => {
                        return {provide: input.key, useValue: input.value};
                    }),
                    resolvedInputs = ReflectiveInjector.resolve(inputProviders),
                    injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.compViewContainerRef.parentInjector),
                    factory = this._resolver.resolveComponentFactory(ConfirmationComponent),
                    component = factory.create(injector);

                this._lastResolve = alert.resolve.subscribe((res: any) => this._handleResolve(res));

                this.compViewContainerRef.insert(component.hostView);

                this._current = component;
            }
        });
    }

    private _handleResolve(res?: ResolveEmit) {
        this._current.destroy();
        this._lastResolve.unsubscribe();
    }

    ngOnDestroy() {
        this._listener.unsubscribe();
    }
}
