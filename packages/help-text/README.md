## Description

An `<sp-help-text>` provides either an informative description or an error message that gives more context about what a user needs to input. It's commonly used in forms.

## Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/help-text?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/help-text)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/help-text?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/help-text)

```
yarn add @spectrum-web-components/help-text
```

Import the side effectful registration of `<sp-help-text>` via:

```
import '@spectrum-web-components/help-text/sp-help-text.js';
```

When looking to leverage the `HelpText` base class as a type and/or for extension purposes, do so via:

```
import { HelpText } from '@spectrum-web-components/help-text';
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<sp-field-label size="s" for="size-s">Password</sp-field-label>
<sp-textfield size="s" id="size-s" type="password">
    <sp-help-text size="s" slot="help-text">
        Create a password with at least 8 characters.
    </sp-help-text>
</sp-textfield>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<sp-field-label size="m" for="size-m">Password</sp-field-label>
<sp-textfield size="m" id="size-m" type="password">
    <sp-help-text size="m" slot="help-text">
        Create a password with at least 8 characters.
    </sp-help-text>
</sp-textfield>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-field-label size="l" for="size-l">Password</sp-field-label>
<sp-textfield size="l" id="size-l" type="password">
    <sp-help-text size="l" slot="help-text">
        Create a password with at least 8 characters.
    </sp-help-text>
</sp-textfield>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-field-label size="xl" for="size-xl">Password</sp-field-label>
<sp-textfield size="xl" id="size-xl" type="password">
    <sp-help-text size="xl" slot="help-text">
        Create a password with at least 8 characters.
    </sp-help-text>
</sp-textfield>
```

</sp-tab-panel>
</sp-tabs>

## Negative

The negative variant of `<sp-help-text>` is used to convey error messages. An error message should be different than the informative message otherwise delivers to the visitor and should show a solution for correcting the error that has been encountered.

```html
<sp-field-label for="negative">Password</sp-field-label>
<sp-textfield id="negative" type="password" required invalid>
    <sp-help-text slot="help-text">
        Create a password with at least 8 characters.
    </sp-help-text>
    <sp-help-text variant="negative" slot="help-text-negative">
        Passwords must be at least 8 characters
    </sp-help-text>
</sp-textfield>
```

### Icon

When associated with content that does not supply an icon outlining the presence of an error, use the `icon` attribute to display one as part of the `<sp-help-text>` element.

```html
<sp-field-label for="icon">Password</sp-field-label>
<sp-textfield id="icon" type="password" required invalid>
    <sp-help-text slot="help-text">
        Create a password with at least 8 characters.
    </sp-help-text>
    <sp-help-text icon variant="negative" slot="help-text-negative">
        Passwords must be at least 8 characters
    </sp-help-text>
</sp-textfield>
```

## Disabled

When associated to content the is disabled, use the `disabled` attribute to match the delivery of the `<sp-help-text>` element to that content.

```html
<sp-field-label for="disabled">Password</sp-field-label>
<sp-textfield id="disabled" type="password" disabled required>
    <sp-help-text slot="help-text" disabled>
        Create a password with at least 8 characters.
    </sp-help-text>
</sp-textfield>
```
