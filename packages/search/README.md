## Overview

The `<sp-search>` element is used for searching and filtering items.

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

- Label/placeholder
- Text field
- In-field button to clear the search term

### Options

#### Sizes

Search fields come in four different sizes for mobile and desktop platform scales: `small`, `medium`, `large`, and `extra-large`.

The default and most frequently used size is `medium`.

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

#### Icon

The search icon is set using the `icon magnifier icon-workflow icon-search` classes in the component.

```html demo
<sp-search label="This is a label"></sp-search>
```

#### Placeholder

A placeholder is a hint to the user about what to input in the search field. It is displayed when the search field is empty and is removed when the user starts typing.

```html demo
<sp-search placeholder="Enter a search term"></sp-search>
```

#### Help text

A search field can have help text below the field to give extra context or instruction about what a user should input. The description communicates a hint or helpful information, such as a search's scope. The component also supports negative help text, which is displayed when the search field is invalid.

```html demo
<sp-search>
    <sp-help-text slot="help-text">Enter a search term.</sp-help-text>
    <sp-help-text slot="negative-help-text">Invalid search term.</sp-help-text>
</sp-search>
```

#### Clear button

A clear button is a button that clears the search term. It is displayed when the search field is not empty.

```html demo
<sp-search value="Flights to Hawaii"></sp-search>
```

### States

#### Disabled

A search field in a disabled state shows that a search option exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that it may become available later.

```html demo
<sp-search disabled></sp-search>
```

### Events

The `submit` event fires when the `<sp-search>` is submitted. This is a non-`composed` event in line with what you would expect a [`<form />`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event) to fire. If you choose to prevent the default behavior of this event, the default action for the underlying `<form />` element will also be prevented, allowing you to handle the search action in JavaScript.

### Accessibility

#### Include a label

Every text field should have a label. A field without a label is ambiguous and not accessible.

The `aria-label` for the search field is set to `Search` by default. The text set in the `label` property is used as the `aria-label` for the search field.

#### Include help text

The description in the help text is flexible and encompasses a range of guidance. Sometimes this guidance is about what to input, and sometimes it's about how to input. This includes information such as:

- An overall description of the input field
- Hints for what kind of information needs to be input
- Specific formatting examples or requirements

Learn more about [using help text](https://spectrum.adobe.com/page/text-field/#Use-help-text-to-show-hints,-formatting,-and-requirements).

#### Include negative help text

Write error messaging in a human-centered way by guiding a user and showing them a solution — don't simply state what's wrong and then leave them guessing as to how to resolve it. Ambiguous error messages can be frustrating and even shame-inducing for users. Also, keep in mind that something that a system may deem an error may not actually be perceived as an error to a user.

Learn more about [writing error messages](https://spectrum.adobe.com/page/text-field/#Write-error-text-that-shows-a-solution).

#### Do not use a placeholder as a replacement for a label or help-text

Putting instructions for how to complete an input, requirements, or any other essential information into placeholder text is not accessible. Once a value is entered, placeholder text is no longer viewable; if someone is using an automatic form filler, they will never get the information in the placeholder text.

Instead, use the help text description to convey requirements or to show any formatting examples that would help user comprehension. If there's placeholder text and help text at the same time, it becomes redundant and distracting, especially if they're communicating the same thing.

#### Hold value on Escape key

The `holdValueOnEscape` attribute controls whether the typed value should be held (i.e., not cleared or reset) when the Escape key is pressed. If set to true, pressing the Escape key will not affect the value in the search field.
