[![Build Status](https://travis-ci.org/Jaspero/ng-confirmations.svg?branch=master)](https://travis-ci.org/jaspero/ng-confirmations)
[![NPM Version](https://img.shields.io/npm/v/@jaspero/ng-confirmations.svg)](https://www.npmjs.com/package/@jaspero/ng-confirmations)

# NG Confirmations
An easy to use alert library for Angular.

A demo can be found [here](https://stackblitz.com/edit/jaspero-ng-confirmations)

## Installation

To install this library, run:

```bash
$ npm install --save @jaspero/ng-confirmations
```

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

Then use the `create(title: any, message: any, settings: ConfirmSettings)` method to initiate the confirmation modal.

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
    confirmText?: string | TemplateRef; // Default: 'Yes'
    declineText?: string | TemplateRef; // Default: 'No'
}
```

You can provide the settings as input to the `<jaspero-confirmations></jaspero-confirmations>` component.
Making the settings default for each created alert. However you can also override the settings by
passing them in the `create()` method.

**Note:**

The `title`, `message`, `confirmText` and `declineText` properties can all be either a string an html string or a TemplateRef.

### FAQ

**Does this library support AoT?**

Yes AoT is supported. 

**Does the `defaultSettings` input need to be provided?**

No, if none was provided the defaults are used. 

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Jaspero co.](mailto:info@jaspero.co)
