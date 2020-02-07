## Overview

`<sp-quick-actions>` allow users to perform contextual actions when hovering or focusing on a specific component. They're shortcuts meant to make workflows more efficient. Spectrum guidelines suggest that `<sp-quick-action>` feature only text buttons OR only icon buttons, and never both.

### Example

By default, the `<sp-quick-actions>` element places items applied to the `action` slot into the top right hand corner of the content supplied to the default slot.

<sp-icons-medium></sp-icons-medium>

```html
<sp-quick-actions>
    <sp-action-button quiet slot="action">
        <sp-icon name="ui:HelpMedium" slot="icon"></sp-icon>
    </sp-action-button>
    <sp-action-button quiet slot="action">
        <sp-icon name="ui:InfoMedium" slot="icon"></sp-icon>
    </sp-action-button>
    <img src="https://placedog.net/400/300?id=8" alt="Place Dog" />
</sp-quick-actions>
```

## Variants

### `enter-from`

The `enter-from` attribute (which can also be accessed via the `enterFrom` property) outlines from which direction the actions will enter view.

```html
<sp-quick-actions enter-from="left">
    <sp-action-button quiet slot="action">
        <sp-icon name="ui:HelpMedium" slot="icon"></sp-icon>
    </sp-action-button>
    <sp-action-button quiet slot="action">
        <sp-icon name="ui:InfoMedium" slot="icon"></sp-icon>
    </sp-action-button>
    <img src="https://placedog.net/400/300?id=10" alt="Place Dog" />
</sp-quick-actions>
<sp-quick-actions enter-from="right">
    <sp-action-button quiet slot="action">
        <sp-icon name="ui:HelpMedium" slot="icon"></sp-icon>
    </sp-action-button>
    <sp-action-button quiet slot="action">
        <sp-icon name="ui:InfoMedium" slot="icon"></sp-icon>
    </sp-action-button>
    <img src="https://placedog.net/400/300?id=11" alt="Place Dog" />
</sp-quick-actions>
```

### `overlay`

When the `overlay` attribute is present, a scrim will be added between the content and the actions for increased visibility of the actions.

```html
<sp-quick-actions overlay>
    <sp-action-button quiet slot="action">
        <sp-icon name="ui:HelpMedium" slot="icon"></sp-icon>
    </sp-action-button>
    <sp-action-button quiet slot="action">
        <sp-icon name="ui:InfoMedium" slot="icon"></sp-icon>
    </sp-action-button>
    <img src="https://placedog.net/400/300?id=9" alt="Place Dog" />
</sp-quick-actions>
```

### `text-only`

When the `text-only` attribute augments the positioning of the action buttons when they only feature text content.

```html
<sp-quick-actions text-only>
    <sp-action-button quiet slot="action">Edit</sp-action-button>
    <sp-action-button quiet slot="action">Delete</sp-icon></sp-action-button>
    <img src="https://placedog.net/400/300?id=19" alt="Place Dog" />
</sp-quick-actions>
```

## Customization

The `--spectrum-quick-actions-top`, `--spectrum-quick-actions-right`, `--spectrum-quick-actions-bottom`, and `--spectrum-quick-actions-left` CSS Custom Properties are provided to allow customization of the location of the actions. Don't forget to set `--spectrum-quick-actions-top` and `--spectrum-quick-actions-right` back to `auto` when applying `--spectrum-quick-actions-bottom` and `--spectrum-quick-actions-left` in this context.

```html
<sp-quick-actions
    style="
    --spectrum-quick-actions-top: auto;
    --spectrum-quick-actions-right: auto;
    --spectrum-quick-actions-left: 25px;
    --spectrum-quick-actions-bottom: 25px;
"
>
    <sp-action-button quiet slot="action">
        <sp-icon name="ui:HelpMedium" slot="icon"></sp-icon>
    </sp-action-button>
    <sp-action-button quiet slot="action">
        <sp-icon name="ui:InfoMedium" slot="icon"></sp-icon>
    </sp-action-button>
    <img src="https://placedog.net/400/300?id=12" alt="Place Dog" />
</sp-quick-actions>
```

## Accessibility

When using the `tab` key to navigate through the document, the content area is made available for focusing first. While the content is focused, the quick actions will be made available and the ensuing focusable content.

When using the `shift + tab` keys to navigate through the document, the content will again be made available for focusing first. Focusing via `shift + tab` will alter the document order making the quick actions available via sucessive `shift + tab` inputs.
