## Overview

An `<sp-field-label>` provides accessible labelling for form elements. Use the `for` attribute to outline the `id` of an element in the same DOM tree to which it should associate itself. Field labels give context to information that a user needs to input and are commonly used in forms to provide users with clear guidance about what information is required.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/field-label?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/field-label)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/field-label?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/field-label)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-zqj9achu)

```
yarn add @spectrum-web-components/field-label
```

Import the side effectful registration of `<sp-field-label>` via:

```ts
import '@spectrum-web-components/field-label/sp-field-label.js';
```

When looking to leverage the `FieldLabel` base class as a type and/or for extension purposes, do so via:

```ts
import { FieldLabel } from '@spectrum-web-components/field-label';
```

### Anatomy

Field labels can be associated with form elements by using the `for` attribute, which should reference the `id` of the related input element.

```html demo
<sp-field-label for="product-name">Product name</sp-field-label>
<sp-textfield id="product-name" placeholder="Enter product name"></sp-textfield>
```

Field labels can also be used to label a group of related inputs:

```html demo
<sp-field-label for="account-type">Account type</sp-field-label>
<sp-radio-group id="account-type">
    <sp-radio value="admin">Admin</sp-radio>
    <sp-radio value="member" checked>Member</sp-radio>
    <sp-radio value="guest">Guest</sp-radio>
</sp-radio-group>
```

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size attribute options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<sp-field-label for="lifestory-0" size="s">Life Story (Small)</sp-field-label>
<sp-textfield
    placeholder="Enter your life story"
    id="lifestory-0"
    size="s"
></sp-textfield>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<sp-field-label for="lifestory-1" size="m">Life Story (Medium)</sp-field-label>
<sp-textfield
    placeholder="Enter your life story"
    id="lifestory-1"
    size="m"
></sp-textfield>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<sp-field-label for="lifestory-2" size="l">Life Story (Large)</sp-field-label>
<sp-textfield
    placeholder="Enter your life story"
    id="lifestory-2"
    size="l"
></sp-textfield>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html demo
<sp-field-label for="lifestory-3" size="xl">
    Life Story (Extra Large)
</sp-field-label>
<sp-textfield
    placeholder="Enter your life story"
    id="lifestory-3"
    size="xl"
></sp-textfield>
```

</sp-tab-panel>
</sp-tabs>

#### Label Position

Field labels can be positioned either on top of an input (default) or to the side of an input. The top position is recommended for most cases as it works better with long text, localization, and responsive layouts.

Using the `side-aligned` attribute will display the `<sp-field-label>` element inline with surrounding elements and the `start` and `end` values outline the alignment of the label text in the width specified.

<sp-tabs selected="top" auto label="Label position options">
<sp-tab value="top">Top (Default)</sp-tab>
<sp-tab-panel value="top">

```html demo
<sp-field-label for="country-top">Country</sp-field-label>
<sp-textfield placeholder="Enter your country" id="country-top"></sp-textfield>
```

</sp-tab-panel>
<sp-tab value="side-start">Side (Start Aligned)</sp-tab>
<sp-tab-panel value="side-start">

Use `side-aligned="start"` to display the `<sp-field-label>` inline and to align the label text to the "start" of the flow of text:

```html demo
<sp-field-label for="lifestory-1" side-aligned="start" style="width: 120px">
    Life Story
</sp-field-label>
<sp-textfield
    placeholder="Enter your life story"
    id="lifestory-1"
></sp-textfield>
<br />
<br />
<sp-field-label
    for="birth-place-1"
    side-aligned="start"
    required
    style="width: 120px"
>
    Birthplace
</sp-field-label>
<sp-picker id="birth-place-1">
    <span slot="label">Choose a location:</span>
    <sp-menu-item>Istanbul</sp-menu-item>
    <sp-menu-item>London</sp-menu-item>
    <sp-menu-item>Maputo</sp-menu-item>
    <sp-menu-item>Melbourne</sp-menu-item>
    <sp-menu-item>New York</sp-menu-item>
    <sp-menu-item>San Francisco</sp-menu-item>
    <sp-menu-item>Santiago</sp-menu-item>
    <sp-menu-item>Tokyo</sp-menu-item>
</sp-picker>
```

</sp-tab-panel>
<sp-tab value="side-end">Side (End Aligned)</sp-tab>
<sp-tab-panel value="side-end">

Use `side-aligned="end"` to display the `<sp-field-label>` inline and to align the label text to the "end" of the flow of text:

```html demo
<sp-field-label
    for="lifestory-2"
    side-aligned="end"
    required
    style="width: 120px"
>
    Life Story
</sp-field-label>
<sp-textfield
    placeholder="Enter your life story"
    id="lifestory-2"
></sp-textfield>
<br />
<br />
<sp-field-label for="birth-place-2" side-aligned="end" style="width: 120px">
    Birthplace
</sp-field-label>
<sp-picker id="birth-place-2">
    <span slot="label">Choose a location:</span>
    <sp-menu-item>Istanbul</sp-menu-item>
    <sp-menu-item>London</sp-menu-item>
    <sp-menu-item>Maputo</sp-menu-item>
    <sp-menu-item>Melbourne</sp-menu-item>
    <sp-menu-item>New York</sp-menu-item>
    <sp-menu-item>San Francisco</sp-menu-item>
    <sp-menu-item>Santiago</sp-menu-item>
    <sp-menu-item>Tokyo</sp-menu-item>
</sp-picker>
```

</sp-tab-panel>
</sp-tabs>

#### Necessity Indicator

Field labels can indicate whether an input is required or optional. By default, required fields are marked with an asterisk icon.

<sp-tabs selected="required" auto label="Necessity indicator options">
<sp-tab value="required">Required (Icon)</sp-tab>
<sp-tab-panel value="required">

```html demo
<sp-field-label for="name-required" required>Full name</sp-field-label>
<sp-textfield
    placeholder="Enter your full name"
    id="name-required"
    required
></sp-textfield>
```

</sp-tab-panel>
<sp-tab value="optional">Optional (Text)</sp-tab>
<sp-tab-panel value="optional">

```html demo
<sp-field-label for="description-optional">
    Profile description (optional)
</sp-field-label>
<sp-textfield
    placeholder="Enter a description"
    id="description-optional"
></sp-textfield>
```

</sp-tab-panel>
</sp-tabs>

### States

#### Disabled

When the associated input field is disabled, the field label should also be disabled.

```html demo
<sp-field-label for="disabled-field" disabled>Country</sp-field-label>
<sp-textfield
    placeholder="Enter your country"
    id="disabled-field"
    disabled
></sp-textfield>
```

### Behaviors

#### Text Overflow

When a field label is too long for the available horizontal space, it wraps to form another line.

```html demo
<sp-field-label for="seminar-field" style="max-width: 200px">
    What you're hoping to learn from the seminar and any specific topics you'd
    like covered
</sp-field-label>
<sp-textfield
    placeholder="Enter your expectations"
    id="seminar-field"
></sp-textfield>
```

### Accessibility

#### Always include a label

Every input should have a label. An input without a label is ambiguous and not accessible. In rare cases where context is sufficient and an accessibility expert has reviewed the design, the label could be visually hidden but should still include an `aria-label` in HTML.

#### Ensure proper association

The `for` attribute of the field label should match the `id` attribute of the associated input element to ensure proper association for screen readers and other assistive technologies.

#### Keep labels concise

Use a short, descriptive label (1-3 words) for the information that users need to provide. Supplementary information or requirements should be shown in help text below the field, not in the label.

#### Use sentence case

Following Adobe's UX writing style, field labels should be written in sentence case unless they contain words that are branded terms.

#### Don't add a colon at the end of a field label

The design of the component already communicates the relationship between the label and the input field, so a colon is unnecessary.

#### Mark only required or only optional fields, not both

In a single form, mark only the required fields or only the optional fields, depending on whichever is less frequent in the entire form. This reduces visual noise and makes the form easier to understand.
