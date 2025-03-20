## Description

A `sp-contextual-help` shows a user extra information about the state of either an adjacent component or an entire view. It explains a high-level topic about an experience and can point users to more information elsewhere.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/contextual-help?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/contextual-help)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/contextual-help?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/contextual-help)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/WPGsKF04KHJ3tVB852UD/src/index.ts)

```
yarn add @spectrum-web-components/contextual-help
```

Import the side effectful registration of `<sp-contextual-help>` via:

```
import '@spectrum-web-components/contextual-help/sp-contextual-help.js';
```

When looking to leverage the `ContextualHelp` base class as a type and/or for extension purposes, do so via:

```
import { ContextualHelp } from '@spectrum-web-components/contextual-help';
```

## Example

```html
<sp-contextual-help>
    <h2 slot="heading">Permission required</h2>
    Your admin must grant you permission before you can create a segment.
    <sp-link
        slot="link"
        href="https://opensource.adobe.com/spectrum-web-components/"
    >
        Request permission
    </sp-link>
</sp-contextual-help>
```

## Help

Use `variant="help"` for helpful content: more detailed, in-depth guidance about a task, UI element, tool, or keyboard shortcuts. This may include an image, video, or link and should be helpful in tone.

```html
<sp-contextual-help variant="help">
    <h2 slot="heading">What is a segment?</h2>
    Segments identify who your visitors are, what devices and services they use,
    where they navigate from, and much more.
    <sp-link
        slot="link"
        href="https://opensource.adobe.com/spectrum-web-components/"
    >
        Learn more about segments
    </sp-link>
</sp-contextual-help>
```

## Placement

By default a `sp-contextual-help` will render its popover at the `bottom-start` position. This can be customized using the `placement` attribute and supports [all the placement options](http://localhost:8000/components/overlay-trigger/#placement) an `overlay-trigger` component supports.

```html
<sp-contextual-help placement="top-start">
    <h2 slot="heading">Permission required</h2>
    Your admin must grant you permission before you can create a segment.
    <sp-link
        slot="link"
        href="https://opensource.adobe.com/spectrum-web-components/"
    >
        Request permission
    </sp-link>
</sp-contextual-help>
```

## Custom max width

Contextual help allows for a custom maximum width to be set using the `--mod-spectrum-contextual-help-popover-maximum-width` custom property.

Note: Maximum width should not be less than 100px.

```html
<sp-contextual-help
    style="--mod-spectrum-contextual-help-popover-maximum-width: 200px;"
>
    <h2 slot="heading">Custom max width</h2>
    This is a test of the contextual help component with a custom max width of
    200px.
</sp-contextual-help>
```

## Events

`sp-contextual-help` does not fire any events of its own. You can listen, however, for the `sp-open` and `sp-closed` events which are fired when the popover opens or closes.

## Accessibility

Given that the trigger is an icon-only `sp-action-button`, it is important to provide an accessible name for it, so that it can be properly announced by screen readers.
By default, the `sp-contextual-help` uses an `aria-label` property with either "Informations" or "Help" as values, depending on the component's `variant`.
You can customize this using the `label` attribute.

When providing headings using the `heading` slot, make sure to provide actual heading elements such as `h1`, `h2`, `h3` ... or use the `role="heading"` attribute.
