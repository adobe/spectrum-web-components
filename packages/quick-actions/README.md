## Description

`<sp-quick-actions>` allow users to perform contextual actions when hovering or focusing on a specific component. They're shortcuts meant to make workflows more efficient. Spectrum guidelines suggest a `<sp-quick-action>` element feature only text buttons OR only icon buttons, and never both.

### Installation

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/quick-actions?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/quick-actions)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/quick-actions?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/quick-actions)

```
npm install @spectrum-web-components/quick-actions

# or

yarn add @spectrum-web-components/quick-actions
```

## Example

<sp-icons-medium></sp-icons-medium>

```html
<div
    style="padding: 2em; background-color: var(--spectrum-quickactions-overlay-color, var(--spectrum-alias-background-color-quickactions-overlay));"
>
    <sp-quick-actions opened>
        <sp-action-button quiet label="Info">
            <sp-icon slot="icon" size="s" name="ui:InfoMedium"></sp-icon>
        </sp-action-button>
        <sp-action-button quiet label="Magnify">
            <sp-icon slot="icon" size="s" name="ui:Magnifier"></sp-icon>
        </sp-action-button>
        <sp-action-button quiet label="Star">
            <sp-icon slot="icon" size="s" name="ui:Star"></sp-icon>
        </sp-action-button>
    </sp-quick-actions>
</div>
```

### Text Only

When the buttons have text only, be sure to include the `text-only` attribute to ensure correct layout of your actions.

```html
<div
    style="padding: 2em; background-color: var(--spectrum-quickactions-overlay-color, var(--spectrum-alias-background-color-quickactions-overlay));"
>
    <sp-quick-actions opened text-only>
        <sp-action-button quiet>Edit</sp-action-button>
        <sp-action-button quiet>Copy</sp-action-button>
        <sp-action-button quiet>Delete</sp-action-button>
    </sp-quick-actions>
</div>
```
