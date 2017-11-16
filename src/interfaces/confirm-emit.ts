import {ConfirmSettings} from './confirm-settings';

export interface ConfirmEmit {
    close?: boolean;
    message?: string;
    title?: string;
    resolve$?: any;
    override?: ConfirmSettings;
}
