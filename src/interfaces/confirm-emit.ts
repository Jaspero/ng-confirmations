import {ConfirmSettings} from './confirm-settings';
import {TemplateRef} from '@angular/core';

export interface ConfirmEmit {
    close?: boolean;
    message?: string | TemplateRef<any>;
    title?: string | TemplateRef<any>;
    resolve$?: any;
    override?: ConfirmSettings;
}
