import {AfterViewInit, Component, ElementRef, HostBinding, NgZone, ViewChild, ViewEncapsulation} from '@angular/core';
import {ResolveEmit} from '../../interfaces/resolve-emit';

@Component({
  selector: 'jaspero-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmationComponent implements AfterViewInit {
  constructor(
    private _ngZone: NgZone
  ) {}

  @HostBinding('class.jaspero__confirmation') true;
  @ViewChild('focus') focusEl: ElementRef;

  animationState = 'enter';
  incomingData: any = {
    title: '',
    titleIsTemplate: false,
    message: '',
    messageIsTemplate: false,
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: true,
    confirmText: 'Yes',
    confirmTextIsTemplate: false,
    declineText: 'No',
    declineTextIsTemplate: false,
    resolve$: null
  };

  ngAfterViewInit() {
    this.focusEl.nativeElement.focus();
  }

  overlayClick() {
    if (!this.incomingData.overlayClickToClose) {
      return;
    }

    this.close('overlayClick');
  }

  close(type: string) {
    this.animationState = 'leave';
    this._ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this._ngZone.run(() => {
          this.resolve({closedWithOutResolving: type});
        });
      }, 450);
    });
  }

  resolve(how: ResolveEmit) {
    this.animationState = 'leave';
    this._ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this._ngZone.run(() =>  {
          this.incomingData.resolve$.next(how);
        });
      }, 450);
    });
  }
}
