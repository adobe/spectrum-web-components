## Overview

The `<sp-search>` element delivers a single input field with a "reset" button as well as a mangifying glass icon with which to power search interactions.

[View the design documentation for this component.](https://spectrum.adobe.com/page/search-field/)

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/search?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/search)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/search?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/search)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-xnfnkgvf)

```zsh
yarn add @spectrum-web-components/search
```

Import the side effectful registration of `<sp-search>` via:

```js
import '@spectrum-web-components/search/sp-search.js';
```

When looking to leverage the `Search` base class as a type and/or for extension purposes, do so via:

```js
import { Search } from '@spectrum-web-components/search';
```

### Anatomy

The search field consists of several key parts:

- A label/search term
- A text field
- An in-field button to clear the search term

### Options

#### Sizes

Search fields come in four different sizes for mobile and desktop platform scales: small, medium, large, and extra-large. The medium size is the default and most frequently used option.

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<sp-search size="s"></sp-search>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<sp-search></sp-search>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<sp-search size="l"></sp-search>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html demo
<sp-search size="xl"></sp-search>
```

</sp-tab-panel>
</sp-tabs>

#### Label and icon

A search field should include a label. In the default state before a search term is input, the label is in regular body text style to meet contrast ratios and to show that this is a field label, not placeholder text. The search icon is set using the `icon magnifier icon-workflow icon-search` classes in the component.

```html demo
<sp-search label="This is a label"></sp-search>
```

#### Placeholder

A placeholder is a hint to the user about what to input in the search field. It is displayed when the search field is empty and is removed when the user starts typing.

```html demo
<sp-search placeholder="Enter a search term"></sp-search>
```

#### Help text

A search field can have help text below the field to give extra context or instruction about what a user should input. The description communicates a hint or helpful information, such as a search's scope.

```html demo
<sp-search>
    <sp-help-text slot="help-text">Enter a search term.</sp-help-text>
    <sp-help-text slot="negative-help-text">Invalid search term.</sp-help-text>
</sp-search>
```

### States

#### Disabled

A search field in a disabled state shows that a search option exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that it may become available later.

```html demo
<sp-search disabled></sp-search>
```

### Events

The `submit` event fires when the `<sp-search>` is submitted. This is a non-`composed` event inline with what you would expect a [`<form />`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event) to fire. If you choose to prevent the default of this event, the default action for the underlying `<form />` element will also be prevented, which will allow you to handle the search action in javascript.

### Accessibility

The `aria-label` for the search field is set to `Search` by default.

#### Include a label

Every text field should have a label. A field without a label is ambiguous and not accessible.

#### Include help text

The description in the help text is flexible and encompasses a range of guidance. Sometimes this guidance is about what to input, and sometime it's about how to input. This includes information such as:

- An overall description of the input field
- Hints for what kind of information needs to be input
- Specific formatting examples or requirements

Learn more about [using help text](https://spectrum.adobe.com/page/text-field/#Use-help-text-to-show-hints,-formatting,-and-requirements).

#### Include negative help text

Write error messaging in a human-centered way by guiding a user and showing them a solution — don't simply state what's wrong and then leave them guessing as to how to resolve it. Ambiguous error messages can be frustrating and even shame-inducing for users. Also, keep in mind that something that a system may deem an error may not actually be perceived as an error to a user.

Learn more about [writing error messages](https://spectrum.adobe.com/page/text-field/#Write-error-text-that-shows-a-solution).

#### Do not us a placeholder as a replacement for a label or help-text

Putting instructions for how to complete an input, requirements, or any other essential information into placeholder text is not accessible. Once a value is entered, placeholder text is no longer viewable; if someone is using an automatic form filler, they will never get the information in the placeholder text.

Instead, use the help text description to convey requirements or to show any formatting examples that would help user comprehension. If there's placeholder text and help text at the same time, it becomes redundant and distracting, especially if they're communicating the same thing.
