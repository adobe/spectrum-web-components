## Description

`sp-dialog-wrapper` supplies an attribute based interface for the managed custmization of an `sp-dialog` element and the light DOM supplied to it. This is paired it with an `underlay` attribute that opts-in to the use of an `sp-underlay` element between your page content and the `sp-dialog` that opens over it.

### Installation

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/dialog?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/dialog)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/dialog?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/dialog)

```
npm install @spectrum-web-components/dialog

# or

yarn add @spectrum-web-components/dialog
```

## Example

### Small

```html
<sp-dialog-wrapper
    id="dialog-wrapper-demo"
    headline="Dialog title"
    dismissible
    underlay
    footer="Content for footer"
    hidden
>
    Content of the dialog
</sp-dialog-wrapper>
<sp-button
    onClick="
        const dialogWrapper = this.previousElementSibling;
        dialogWrapper.hidden = false;
        dialogWrapper.open = true;
        function handleEvent({type}) {
            alert(`Handling '${type}' event.`);
            dialogWrapper.open = false;
            dialogWrapper.removeEventListener('close', handleEvent);
        }
        dialogWrapper.addEventListener('close', handleEvent);
    "
    variant="primary"
>
    Toggle Dialog
</sp-button>
```

### Fullscreen Mode

```html
<sp-dialog-wrapper
    id="dialog-wrapper-demo"
    headline="Dialog title"
    mode="fullscreen"
    confirm-label="Keep Both"
    secondary-label="Replace"
    cancel-label="Cancel"
    footer="Content for footer"
    hidden
>
    Content of the dialog
</sp-dialog-wrapper>
<sp-button
    onClick="
        const dialogWrapper = this.previousElementSibling;
        dialogWrapper.hidden = false;
        dialogWrapper.open = true;
        function handleEvent({type}) {
            alert(`Handling '${type}' event.`);
            dialogWrapper.open = false;
            dialogWrapper.removeEventListener('confirm', handleEvent);
            dialogWrapper.removeEventListener('secondary', handleEvent);
            dialogWrapper.removeEventListener('cancel', handleEvent);
        }
        dialogWrapper.addEventListener('confirm', handleEvent);
        dialogWrapper.addEventListener('secondary', handleEvent);
        dialogWrapper.addEventListener('cancel', handleEvent);
    "
    variant="primary"
>
    Toggle Dialog
</sp-button>
```
