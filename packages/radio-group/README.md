## Overview

**sp-radio** and **sp-radio-group** allow users to select a single option from a list of mutually exclusive options. All possible options are exposed up front for users to compare.

**sp-radio-group** holds a list of **sp-radio** elements, and is responsible for deselecting radio buttons when a new one is selected, which in turn makes it responsible for keeping track of which one is selected. **sp-radio** is responsible for handling user interactions and for visually reflecting if it is the one that is checked or not.

### Installation

```
npm install @spectrum-web-components/radio-group

# or

yarn add @spectrum-web-components/radio-group
```

### Example

```html
<sp-radio-group selected="first" name="example">
    <sp-radio value="first">Option 1</sp-radio>
    <sp-radio value="second">Option 2</sp-radio>
    <sp-radio value="third">Option 3</sp-radio>
    <sp-radio value="fourth">Option 4</sp-radio>
</sp-radio-group>
```

### Radio Group Column

By default, radio groups are inline and appear vertically. By adding the `column` property to **sp-radio-group**
the radio buttons will be listed vertically on their own line.

```html
<sp-radio-group column name="column-example">
    <sp-radio value="first">Option 1</sp-radio>
    <sp-radio value="second">Option 2</sp-radio>
    <sp-radio value="third">Option 3</sp-radio>
</sp-radio-group>
```

## Accessibility

Radio buttons are accessible by default, rendered in HTML using the `<input type="radio">` element. Tabbing into a group of radio buttons places the focus on the first radio button selected. If none of the radio buttons are selected, the focus is set on the first one in the group. Space selects the radio button in focus (if not already selected). Using the arrow keys moves focus and selection to the previous or next radio button in the group (last becomes first, and first becomes last). The new radio button in focus gets selected even if the previous one was not.
