[![Build Status](https://travis-ci.org/Jaspero/ng2-confirmations.svg?branch=master)](https://travis-ci.org/jaspero/ng2-confirmations)
[![NPM Version](https://img.shields.io/npm/v/@jaspero/ng2-confirmations.svg)](https://www.npmjs.com/package/@jaspero/ng2-confirmations)
# NG2 Confirmations
An easy to use alert library for Angular 2.

```
npm install --save @jaspero/ng2-confirmations
```

A demo can be found [here](https://jaspero.co/resources/projects/ng-confirmations)

## Setup
Import `JasperoConfirmationsModule` in your `@NgModule`: 

```ts
@NgModule({
    imports: [
        JasperoConfirmationsModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

Then create the component in a root component (you can create it anywhere but you can only use it in that component on any lower ones).

```html
<jaspero-confirmations [defaultSettings]="options"></jaspero-confirmations>
```


## How To Use 
You need to import the `ConfirmationService` in your component:
 
```typescript
constructor(private _confirmation: ConfirmationService) {}
```

Then use the `create(title: string, message: string, settings: ConfirmSettings)` method to initiate thr confirmation modal.

```typescript
open() {
    this._confirmation.create('Do something?', 'You should really just do it.')
        // The confirmation returns an Observable Subject which will notify you about the outcome
        .subscribe((ans: ResolveEmit) => console.log(ans))
}
```

### ResolveEmit

This is returned by the `create()` method.

```typescript
export interface ResolveEmit {
    // Returns this if modal resolved with yes or no
    resolved?: boolean;
    // If the modal was closed in some other way this is removed
    closedWithOutResolving?: string;
}
```

If the modal was closed by clicking on yes/no this is returned: 
```typescript
{resolved: true // false if no was pressed}
```

If the modal was closed in any other way:
 ```typescript
{closedWithOutResolving: 'overlayClick' // reason for closing}
```

### Options

Available settings: 

```typescript
export interface ConfirmSettings {
    overlay?: boolean; // Default: true
    overlayClickToClose?: boolean; // Default: true
    showCloseButton?: boolean; // Default: true
    confirmText?: string; // Default: 'Yes'
    declineText?: string; // Default: 'No'
}
```

You can provide the settings as input to the `<jaspero-confirmations></jaspero-confirmations>` component.
Making the settings default for each created alert. However you can also override the settings by
passing them in the `create()` method.

### FAQ

**Does this library support AoT?**

Yes AoT is supported. 

**Does the `defaultSettings` input need to be provided?**

No, if none was provided the defaults are used. 

