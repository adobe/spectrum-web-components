## Overview

The `<sp-search />` element delivers a single input field with a "reset" button as well as a mangifying glass icon with which to power search interactions.

## Example

```html
<sp-search></sp-search>
<sp-search disabled></sp-search>
```

## Variants

### Quiet

```html
<sp-search quiet></sp-search>
<sp-search quiet disabled></sp-search>
```

## Events

The `submit` event fires when the `<sp-search />` is submitted. This is a non-`composed` event inline with what you would expect a [`<form />`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event){:target="\_blank"} to fire. If you choose to prevent the default of this event, the default action for the underlying `<form />` element will also be prevented, which will allow you to handle the search action in javascript.
