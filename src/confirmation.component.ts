import {Component, Injector, NgZone} from '@angular/core';
import {ResolveEmit} from './interfaces/resolve-emit';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'jaspero-confirmation',
    template: `
        <div *ngIf="incomingData.overlay" class="jaspero__overlay" [@overlayAn]="animationState" (click)="overlayClick()"></div>
        <div class="jaspero__dialog" [@wrapperAn]="animationState">
            <div class="jaspero__dialog-title">
                {{incomingData.title}}
            </div>
            <div class="jaspero__dialog-content">
                {{incomingData.message}}
            </div>
            <div class="jaspero__dialog-actions">
                <button class="default" (click)="resolve({resolved: false})">{{incomingData.declineText}}</button>
                <button class="primary" (click)="resolve({resolved: true})">{{incomingData.confirmText}}</button>
            </div>
        </div>
    `,
    styleUrls: ['./confirmation.css'],
    animations: [
        trigger('overlayAn', [
            state('void', style({opacity: 0})),
            state('leave', style({opacity: 0})),
            state('enter', style({opacity: 1})),
            transition('void => enter', animate('400ms cubic-bezier(.25,.8,.25,1)')),
            transition('enter => leave', animate('400ms cubic-bezier(.25,.8,.25,1)'))
        ]),
        trigger('wrapperAn', [
            state('void', style({opacity: 0, transform: 'scale(0.75, 0.75) translate(0, 0)'})),
            state('leave', style({opacity: 0, transform: 'scale(0.75, 0.75) translate(0, 0)'})),
            state('enter', style({opacity: 1, transform: 'scale(1, 1) translate(0, 0)'})),
            transition('void => enter', animate('450ms cubic-bezier(.5, 1.4, .5, 1)')),
            transition('enter => leave', animate('450ms cubic-bezier(.5, 1.4, .5, 1)'))
        ])
    ]
})
export class ConfirmationComponent {
    constructor(
        private _injector: Injector,
        private _ngZone: NgZone
    ) {
        for (let key in this.incomingData) this.incomingData[key] = this._injector.get(key) || this.incomingData[key];
    }

    animationState = 'enter';

    incomingData: any = {
        title: '',
        message: '',
        overlay: true,
        overlayClickToClose: true,
        showCloseButton: true,
        confirmText: 'Yes',
        declineText: 'No',
        resolve: null
    };

    overlayClick() {
        if (!this.incomingData.overlayClickToClose) return;
        this.close('overlayClick')
    }

    close(type: string) {
        this.animationState = 'leave';
        this._ngZone.runOutsideAngular(() => setTimeout(() => this._ngZone.run(() => this.resolve({closedWithOutResolving: type})), 450));
    }

    resolve(how: ResolveEmit) {
        this.animationState = 'leave';
        this._ngZone.runOutsideAngular(() => setTimeout(() => this._ngZone.run(() =>  this.incomingData.resolve.next(how)), 450))
    }
}