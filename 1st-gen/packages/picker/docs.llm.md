---
component: picker
tag: sp-picker
package: '@spectrum-web-components/picker'
source: 1st-gen/packages/picker/README.md
generated: 2026-06-17T11:01:22.157Z
generator: scripts/generate-llm-docs.mjs
---

## Overview

An `<sp-picker>` is an alternative to HTML's `<select>` element. Use [`<sp-menu-item>`](../menu-item) elements to outline the options that will be made available to the user when interacting with the `<sp-picker>` element.

### Usage

```bash
yarn add @spectrum-web-components/picker
```

Import the side effectful registration of `<sp-picker>` via:

```bash
import '@spectrum-web-components/picker/sp-picker.js';
```

The default of `<sp-picker>` will load dependencies in `@spectrum-web-components/overlay` asynchronously via a dynamic import. In the case that you would like to import those tranverse dependencies statically, import the side effectful registration of `<sp-picker>` as follows:

```bash
import '@spectrum-web-components/picker/sync/sp-picker.js';
```

When looking to leverage the `Picker` base class as a type and/or for extension purposes, do so via:

```bash
import { Picker } from '@spectrum-web-components/picker';
```

### Anatomy

A picker includes a label and a menu.

#### Labels

To render accessibly, an `<sp-picker>` element should be paired with an `<sp-field-label>` element that has the `for` attribute referencing the `id` of the `<sp-picker>` element.

For an accessible label that renders within the bounds of the picker itself, but still fulfills the accessibility contract, use the `label` attribute or a `<span slot="label">` as a child element of `<sp-picker>`.

```html
<sp-field-label for="uses-sp-field-label">Selection type:</sp-field-label>
<sp-picker id="uses-sp-field-label">
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
html
<sp-picker label="Selection type" id="uses-label-attribute">
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
html
<sp-picker id="uses-label-slot">
  <span slot="label">Selection type:</span>
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
```

#### Menu

The picker menu is a menu element that is used to display the options for the picker. A picker menu can include menu items, menu dividers, and menu groups. A picker menu should never contain submenus, as doing so would render it inaccessible.

If you require a submenu, use and [action menu](./action-menu) instead of a picker.

```html
<sp-picker>
    <span slot="label">Select a free food item:</span>
    <sp-menu-group>
        <span slot="header">Fruits</span>
        <sp-menu-item>Apple</sp-menu-item>
        <sp-menu-item>Banana</sp-menu-item>
        <sp-menu-item>Pear</sp-menu-item>
    </sp-menu-group>
    <sp-menu-divider></sp-menu-divider>
    <sp-menu-group>
        <span slot="header">Vegetables</span>
        <sp-menu-item>Artichoke</sp-menu-item>
        <sp-menu-item>Carrot</sp-menu-item>
        <sp-menu-item>Potato</sp-menu-item>
    </sp-menu-group>
    <sp-menu-group>
</sp-picker>
```

#### Icons

`<sp-menu-item>`s in an `<sp-picker>` that are provided content addressed to their `icon` slot will be passed to the `<sp-picker>` element when that item is chosen.

```html
<sp-field-label for="picker-icons">Choose an action...</sp-field-label>
<sp-picker label="What would you like to do?" value="item-2" id="picker-icons">
  <sp-menu-item>
    <sp-icon-save-floppy slot="icon"></sp-icon-save-floppy>
    Save
  </sp-menu-item>
  <sp-menu-item>
    <sp-icon-stopwatch slot="icon"></sp-icon-stopwatch>
    Finish
  </sp-menu-item>
  <sp-menu-item>
    <sp-icon-user-activity slot="icon"></sp-icon-user-activity>
    Review
  </sp-menu-item>
</sp-picker>
```

When using `<sp-menu-item>` elements without text content, be sure to use the `value` attribute so that the `<sp-picker>` element can differentiate between the available options. Furthermore, it is important to apply accessible labeling to the `[slot="icon"]` content as follows:

```html
<sp-field-label for="picker-icons-only">Choose an action...</sp-field-label>
<sp-picker
  label="What would you like to do?"
  value="item-2"
  id="picker-icons-only"
>
  <sp-menu-item value="item-1">
    <sp-icon-save-floppy slot="icon" label="Save"></sp-icon-save-floppy>
  </sp-menu-item>
  <sp-menu-item value="item-2">
    <sp-icon-stopwatch slot="icon" label="Finish"></sp-icon-stopwatch>
  </sp-menu-item>
  <sp-menu-item value="item-3">
    <sp-icon-user-activity slot="icon" label="Review"></sp-icon-user-activity>
  </sp-menu-item>
</sp-picker>
```

#### Advanced icon management

The `icons` attribute manages how the selected item will appear. Set `icons="only"` to display only the selected item's icon in the `<sp-picker>` element, or `icons="none"` to display the selected item text without the icon `<sp-picker>`.

When using `icons="only"` on `<sp-menu-item>` elements that have text content, that text will be applied to `<sp-picker>` element in a non-visible way.

```html
<sp-field-label for="picker-icons-value">Choose an action...</sp-field-label>
<sp-picker
  label="What would you like to do?"
  value="save"
  id="picker-icons-value"
  icons="only"
>
  <sp-menu-item value="save">
    <sp-icon-save-floppy slot="icon"></sp-icon-save-floppy>
    Save
  </sp-menu-item>
  <sp-menu-item value="finish">
    <sp-icon-stopwatch slot="icon"></sp-icon-stopwatch>
    Finish
  </sp-menu-item>
  <sp-menu-item value="review">
    <sp-icon-user-activity slot="icon"></sp-icon-user-activity>
    Review
  </sp-menu-item>
</sp-picker>
html
<sp-field-label for="picker-icons-none">Choose an action...</sp-field-label>
<sp-picker
  label="What would you like to do?"
  value="save"
  id="picker-icons-none"
  icons="none"
>
  <sp-menu-item value="save">
    <sp-icon-save-floppy slot="icon"></sp-icon-save-floppy>
    Save
  </sp-menu-item>
  <sp-menu-item value="finish">
    <sp-icon-stopwatch slot="icon"></sp-icon-stopwatch>
    Finish
  </sp-menu-item>
  <sp-menu-item value="review">
    <sp-icon-user-activity slot="icon"></sp-icon-user-activity>
    Review
  </sp-menu-item>
</sp-picker>
```

#### Value

When the `value` of an `<sp-picker>` matches either the `value` attribute or the trimmed `textContent` (or `itemText`) of a descendent `<sp-menu-item>`, it will mark that element as `selected`.

```html
<sp-field-label for="picker-value">Selection type:</sp-field-label>
<sp-picker
  label="Select a Country with a very long label, too long in fact"
  value="item-2"
  id="picker-value"
>
  <sp-menu-item value="item-1">Deselect</sp-menu-item>
  <sp-menu-item value="item-2">Select inverse</sp-menu-item>
  <sp-menu-item value="item-3">Feather...</sp-menu-item>
  <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item value="item-5">Save selection</sp-menu-item>
  <sp-menu-item disabled value="item-6">Make work path</sp-menu-item>
</sp-picker>
html
<sp-field-label for="picker-item-text">Selection type:</sp-field-label>
<sp-picker
  label="Select a Country with a very long label, too long in fact"
  value="Feather..."
  id="picker-item-text"
>
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item>Make work path</sp-menu-item>
</sp-picker>
```

### Options

#### Sizes

```html
<sp-field-label for="picker-s" size="s">Selection type:</sp-field-label>
<sp-picker id="picker-s" size="s" label="Selection type">
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
<br />
<br />
<sp-field-label for="picker-s-quiet" size="s">Selection type:</sp-field-label>
<sp-picker id="picker-s-quiet" quiet size="s" label="Selection type">
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
html
<sp-field-label for="picker-m" size="m">Selection type:</sp-field-label>
<sp-picker id="picker-m" size="m" label="Selection type">
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
<br />
<br />
<sp-field-label for="picker-m-quiet" size="m">Selection type:</sp-field-label>
<sp-picker id="picker-m-quiet" quiet size="m" label="Selection type">
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
html
<sp-picker id="picker-l" size="l" label="Selection type">
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
<br />
<br />
<sp-field-label for="picker-l-quiet" size="l">Selection type:</sp-field-label>
<sp-picker id="picker-l-quiet" quiet size="l" label="Selection type">
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
html
<sp-field-label for="picker-xl" size="xl">Selection type:</sp-field-label>
<sp-picker id="picker-xl" size="xl" label="Selection type">
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
<br />
<br />
<sp-field-label for="picker-xl-quiet" size="xl">Selection type:</sp-field-label>
<sp-picker id="picker-xl-quiet" quiet size="xl" label="Selection type">
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
```

#### Side Label

```html
<sp-field-label side-aligned="start" for="picker-sideLabel">
  Standard:
</sp-field-label>
<sp-picker
  label="Select a Country with a very long label, too long in fact"
  id="picker-sideLabel"
>
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
html
<sp-field-label side-aligned="start" for="picker-sideLabel-quiet">
  Quiet:
</sp-field-label>
<sp-picker
  label="Select a Country with a very long label, too long in fact"
  quiet
  id="picker-sideLabel-quiet"
>
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
```

### States

#### Invalid

```html
<sp-field-label for="picker-invalid">Standard:</sp-field-label>
<sp-picker
  label="Select a Country with a very long label, too long in fact"
  invalid
  id="picker-invalid"
>
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
html
<sp-field-label for="picker-invalid-quiet">Quiet:</sp-field-label>
<sp-picker
  label="Select a Country with a very long label, too long in fact"
  invalid
  quiet
  id="picker-invalid-quiet"
>
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
```

#### Disabled

```html
<sp-field-label for="picker-disabled">Standard:</sp-field-label>
<sp-picker
  label="Select a Country with a very long label, too long in fact"
  disabled
  id="picker-disabled"
>
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
html
<sp-field-label for="picker-disabled-quiet">Quiet:</sp-field-label>
<sp-picker
  label="Select a Country with a very long label, too long in fact"
  disabled
  quiet
  id="picker-disabled-quiet"
>
  <sp-menu-item>Deselect</sp-menu-item>
  <sp-menu-item>Select inverse</sp-menu-item>
  <sp-menu-item>Feather...</sp-menu-item>
  <sp-menu-item>Select and mask...</sp-menu-item>
  <sp-menu-divider></sp-menu-divider>
  <sp-menu-item>Save selection</sp-menu-item>
  <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
```

#### Pending

While in pending state, `<sp-picker>` elements will not respond to click events and will be delivered with `<sp-progress-circle>` to visually denote that it is pending. It will not toggle open or display its `<sp-menu-item>` descendants until the attribute is removed. Use the `pending-label` attribute to customize the pending text for assoistive technology, which is set to `Pending` by default.

```html
<sp-field-label for="picker-loading">Standard:</sp-field-label>
<sp-picker
  id="picker-loading"
  label="Loading blending modes..."
  pending
  pending-label="loading options"
>
  <sp-menu-item>Pass through</sp-menu-item>
  <sp-menu-item>Normal</sp-menu-item>
  <sp-menu-item>Multiply</sp-menu-item>
  <sp-menu-item>Screen</sp-menu-item>
</sp-picker>
html
<sp-field-label for="picker-loading-quiet">Quiet:</sp-field-label>
<sp-picker
  id="picker-loading-quiet"
  label="Loading blending modes..."
  pending
  quiet
>
  <sp-menu-item>Pass through</sp-menu-item>
  <sp-menu-item>Normal</sp-menu-item>
  <sp-menu-item>Multiply</sp-menu-item>
  <sp-menu-item>Screen</sp-menu-item>
</sp-picker>
```

### Behaviors

#### Force Popover on Mobile Devices

On mobile, the menu can be exposed in either a `sp-popover` or `sp-tray`. By default, `sp-picker` will render an `sp-tray`. If you would like to render `sp-popover` on mobile, add the attribute `force-popover` to the `sp-picker`.

Usage Guidance:

- Use a tray when a menu’s proximity to its trigger is considered to be less important to the experience, or for showing a volume of content that is too overwhelming for a popover.
- Use a popover when a menu’s proximity to its trigger is considered to be important to the experience, or for showing a volume of content that is manageable for a popover.

To see this functionality in action, load this page from your mobile device or use Chrome DevTools (or equivalent) and select a mobile device once the Device Toolbar (the phone/tablet icon) is active.

```html
<sp-field-label for="picker-tray">
  Do you want to see a tray menu?
</sp-field-label>
<sp-picker id="picker-tray" label="Select an option">
  <sp-menu-item value="option-1">Yes</sp-menu-item>
  <sp-menu-item value="option-2">No</sp-menu-item>
</sp-picker>
<br />
<sp-field-label for="picker-popover">
  Do you want to see a popover menu?
</sp-field-label>
<sp-picker id="picker-popover" label="Select an option" force-popover>
  <sp-menu-item value="option-1">Yes</sp-menu-item>
  <sp-menu-item value="option-2">No</sp-menu-item>
</sp-picker>
```

### Accessibility

#### Include a visible label

Every picker should have a label. A picker without a label is ambiguous and not accessible.

#### Use help text to show context

A picker’s description in the help text can communicate what to select or how to select an option. This includes information such as:

- An overall description of the picker options
- Hints for what kind of information to choose
- More context for why a user needs to make a selection

The help text’s message should not simply restate the same information in the label in order to prompt someone to interact with a picker. Don’t add help text to maintain layout continuity with other inputs that require help text if it isn’t actually relevant or meaningful to a user.

The help text area also displays an error message. When a picker already includes help text and an error is triggered, the help text is replaced with error text. Once the error is resolved, the help text description reappears below the picker.

Since one gets replaced by the other, the language of the help text and error text need to work together to convey the same messaging. Help text explains the requirement or adds supplementary context for how to complete the interaction. Error text tells a user how to fix the error by re-stating the selection requirements or describing the necessary interaction. Make sure that the help text and the error text include the same essential information so that it isn’t lost if one replaces the other (e.g., minimum requirements).

Use [`<sp-help-text>`](../help-text/) to add help text and error text:

```html
<sp-field-label for="text">Preferred contact method:</sp-field-label>
<sp-picker id="text" label="Select contact method" aria-describedby="help-text">
  <sp-menu-item>Phone</sp-menu-item>
  <sp-menu-item>Text</sp-menu-item>
  <sp-menu-item>Email</sp-menu-item>
</sp-picker>
<sp-help-text id="help-text">
  Choose the best way to contact you in case there's an issue with your account.
</sp-help-text>
html
<sp-field-label for="error-text" required invalid>
  Preferred contact method:
</sp-field-label>
<sp-picker
  id="error-text"
  invalid
  label="Select contact method"
  required
  aria-describedby="error-help-text"
>
  <sp-menu-item>Phone</sp-menu-item>
  <sp-menu-item>Text</sp-menu-item>
  <sp-menu-item>Email</sp-menu-item>
</sp-picker>
<sp-help-text id="error-help-text" variant="negative">
  Select a contact method.
</sp-help-text>
```

#### Do not use submenus

A picker menu should never contain submenus, as doing so would render it inaccessible. A picker's menu role is a listbox, and its menu items are listbox options, which are not allowed to have submenus.
