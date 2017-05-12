import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {JasperoConfirmationsModule} from '@jaspero/ng2-confirmations';
import {AppComponent} from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        JasperoConfirmationsModule
    ],
    declarations: [AppComponent],
    bootstrap:    [AppComponent]
})
export class AppModule { }
