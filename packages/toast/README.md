## Description

`sp-toast`s display brief, temporary notifications. They are noticeable but do not disrupt the user experience and do not require an action to be taken.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/toast?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/toast)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/toast?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/toast)

```
yarn add @spectrum-web-components/toast
```

Import the side effectful registration of `<sp-toast>` via:

```
import '@spectrum-web-components/toast/sp-toast.js';
```

When looking to leverage the `Toast` base class as a type and/or for extension purposes, do so via:

```
import { Toast } from '@spectrum-web-components/toast';
```

## Example

### Default

```html
<sp-toast>This is important information that you should read, soon.</sp-toast>
```

### With actions

```html
<sp-toast>
    This is important information that you should read, soon.
    <sp-button slot="action" variant="overBackground" quiet>
        Do something
    </sp-button>
</sp-toast>
```

### Wrapping

```html
<sp-toast style="width: 300px">
    This is important information that you should read, soon.
    <sp-button slot="action" variant="overBackground" quiet>
        Do something
    </sp-button>
</sp-toast>
```

### Variants

#### Negative

```html
<sp-toast variant="negative">
    This is negative information that you should read, soon.
</sp-toast>
```

#### Positive

```html
<sp-toast variant="positive">
    This is positive information that you should read, soon.
</sp-toast>
```

#### Info

```html
<sp-toast variant="info">This is information that you should read.</sp-toast>
```

## Accessibility

An `<sp-toast>` element is by default rendered with a `role` of `alert`. When rendering the `<sp-toast>` to a page, it should be place in a container with a `role` of `region`.
