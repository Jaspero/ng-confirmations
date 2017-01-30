import {Component, Injector} from '@angular/core';
import {ResolveEmit} from './interfaces/resolve-emit';

@Component({
    selector: 'jaspero-confirmation',
    styleUrls: ['./confirmation.css'],
    template: `
        <div *ngIf="incomingData.overlay" class="jaspero__overlay" (click)="overlayClick()"></div>
        <div class="jaspero__dialog">
            <div class="jaspero__dialog-close" *ngIf="incomingData.showCloseButton" (click)="resolve({closedWithOutResolving: 'closeClick'})">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
                  <path d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm3.2 22.4l7.5 7.5c.2.2.3.5.3.7s-.1.5-.3.7l-1.4 1.4c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3l-7.5-7.5c-.2-.2-.5-.2-.7 0l-7.5 7.5c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3l-1.4-1.4c-.2-.2-.3-.5-.3-.7s.1-.5.3-.7l7.5-7.5c.2-.2.2-.5 0-.7l-7.5-7.5c-.2-.2-.3-.5-.3-.7s.1-.5.3-.7l1.4-1.4c.2-.2.5-.3.7-.3s.5.1.7.3l7.5 7.5c.2.2.5.2.7 0l7.5-7.5c.2-.2.5-.3.7-.3.3 0 .5.1.7.3l1.4 1.4c.2.2.3.5.3.7s-.1.5-.3.7l-7.5 7.5c-.2.1-.2.5 0 .7z" fill="#FFF"/>
                </svg>
            </div>
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
    `
})
export class ConfirmationComponent {
    constructor(
        private _injector: Injector
    ) {
        for (let key in this.incomingData) this.incomingData[key] = this._injector.get(key) || this.incomingData[key];
    }

    animationState: string = 'enter';

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
        this.resolve({closedWithOutResolving: 'overlayClick'});
    }

    resolve(how: ResolveEmit) {
        console.log(this.incomingData.resolve);
        this.incomingData.resolve.next(how);
    }
}