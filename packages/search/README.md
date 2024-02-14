## Description

The `<sp-search>` element delivers a single input field with a "reset" button as well as a mangifying glass icon with which to power search interactions.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/search?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/search)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/search?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/search)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/RF8kOBhUdLovmzyZMpTk/src/index.ts)

```
yarn add @spectrum-web-components/search
```

Import the side effectful registration of `<sp-search>` via:

```
import '@spectrum-web-components/search/sp-search.js';
```

When looking to leverage the `Search` base class as a type and/or for extension purposes, do so via:

```
import { Search } from '@spectrum-web-components/search';
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-search size="s"></sp-search>
<sp-search size="s" disabled></sp-search>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-search></sp-search>
<sp-search disabled></sp-search>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-search size="l"></sp-search>
<sp-search size="l" disabled></sp-search>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-search size="xl"></sp-search>
<sp-search size="xl" disabled></sp-search>
```

</sp-tab-panel>
</sp-tabs>

## Variants

### Quiet

```html
<sp-search quiet></sp-search>
<sp-search quiet disabled></sp-search>
```

## Events

The `submit` event fires when the `<sp-search>` is submitted. This is a non-`composed` event inline with what you would expect a [`<form />`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event){:target="\_blank"} to fire. If you choose to prevent the default of this event, the default action for the underlying `<form />` element will also be prevented, which will allow you to handle the search action in javascript.
