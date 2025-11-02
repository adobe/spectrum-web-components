## Overview

`sp-textfield[multiline]` components are text areas that allow users to input custom multiline text entries with a keyboard. Various decorations can be displayed around the field to communicate the entry requirements.

[View the design documentation for this component.](https://spectrum.adobe.com/page/text-area/)
### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/textfield?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/textfield)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/textfield?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/textfield)

```zsh
yarn add @spectrum-web-components/textfield
```

Import the side effectful registration of `<sp-textfield>` via:

```js
import '@spectrum-web-components/textfield/sp-textfield.js';
```

When looking to leverage the `Textfield` base class as a type and/or for extension purposes, do so via:

```js
import { Textfield } from '@spectrum-web-components/textfield';
```

### Anatomy

A text area consists of an area for the user to enter text and optional placeholder text. It should be used with an [field label](../field-label/index.md) element.

```html
<sp-field-label for="story-0">Background</sp-field-label>
<sp-textfield
    id="story-0"
    multiline
    placeholder="Enter your life story"
    pattern=".{0,1000}"
>
    <sp-help-text slot="help-text">1000 character limit</sp-help-text>
    <sp-help-text slot="negative-help-text">
        Exceeded 1000 character limit
    </sp-help-text>
</sp-textfield>
```

#### Label

A textarea must have a label in order to be accessible. A label can be provided either via the `label` attribute or with an `<sp-field-label>` element.

```html
<sp-textfield
    label="questions"
    multiline
    placeholder="Do you have any questions?"
></sp-textfield>

<sp-field-label for="comments">Comments</sp-field-label>
<sp-textfield id="comments" multiline></sp-textfield>
```

#### Help text

Help text can be accessibly associated with an `<sp-textfield multiline>` element by using the `help-text` or `negative-help-text` slots. When using the `negative-help-text` slot, `<sp-textfield multiline>` will self manage the presence of this content based on the value of the `invalid` property on your `<sp-textfield multiline>` element. Content within the `help-text` slot will be shown by default. When your `<sp-textfield multiline>` should receive help text based on state outside of the complexity of `invalid` or not, manage the content addressed to the `help-text` from above to ensure that it displays the right messaging and possesses the right `variant`. See [help text](../help-text/index.md) for more information.

```html
<sp-field-label for="feedback">Feedback</sp-field-label>
<sp-textfield id="feedback" multiline pattern=".{0,500}">
    <sp-help-text slot="help-text">500 character limit</sp-help-text>
    <sp-help-text slot="negative-help-text">
        Exceeded character limit
    </sp-help-text>
</sp-textfield>
```

#### Placeholder

Use the `placeholder` attribute to include placeholder text. **Note**: Placeholder text should not be used as a replacement for a label or help text.

```html
<sp-field-label for="goal">Professional goal</sp-field-label>
<sp-textfield
    id="goal"
    multiline
    placeholder="I would like to..."
></sp-textfield>
```

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-field-label size="s" for="story-s">Background</sp-field-label>
<sp-textfield
    size="s"
    id="story-s"
    multiline
    placeholder="Enter your life story"
>
    <sp-help-text slot="help-text">1000 character limit</sp-help-text>
    <sp-help-text slot="negative-help-text">
        Exceeded 1000 character limit
    </sp-help-text>
</sp-textfield>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-field-label for="story-m">Background</sp-field-label>
<sp-textfield id="story-m" multiline placeholder="Enter your life story">
    <sp-help-text slot="help-text">1000 character limit</sp-help-text>
    <sp-help-text slot="negative-help-text">
        Exceeded 1000 character limit
    </sp-help-text>
</sp-textfield>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-field-label size="l" for="story-l">Background</sp-field-label>
<sp-textfield
    size="l"
    id="story-l"
    multiline
    placeholder="Enter your life story"
>
    <sp-help-text slot="help-text">1000 character limit</sp-help-text>
    <sp-help-text slot="negative-help-text">
        Exceeded 1000 character limit
    </sp-help-text>
</sp-textfield>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-field-label size="xl" for="story-xl">Background</sp-field-label>
<sp-textfield
    size="xl"
    id="story-xl"
    multiline
    placeholder="Enter your life story"
>
    <sp-help-text slot="help-text">1000 character limit</sp-help-text>
    <sp-help-text slot="negative-help-text">
        Exceeded 1000 character limit
    </sp-help-text>
</sp-textfield>
```

</sp-tab-panel>
</sp-tabs>

### Options

#### Quiet

The quiet style works best when a clear layout (vertical stack, table, grid) assists in a user's ability to parse the element. Too many quiet components in a small space can be hard to read.

```html
<sp-field-label for="story-3">Message</sp-field-label>
<sp-textfield
    id="message"
    multiline
    placeholder="Write your message..."
    quiet
></sp-textfield>
```

#### Grows

By default the text area has a fixed height and will scroll when text entry goes beyond the available space. With the use of the `grows` attribute the text area will grow to accommodate the full content of the element.

```html
<div style="display: flex; flex-wrap: wrap; gap: 20px;">
    <div style="overflow: scroll">
        <sp-field-label for="pinocchio-1">Tell me a story</sp-field-label>
        <sp-textfield
            id="pinocchio-1"
            multiline
            value="Pinocchio eats sugar, but refuses to take medicine. When the undertakers
come for him, he drinks the medicine and feels better. Afterwards he
tells a lie and, in punishment, his nose grows longer and longer."
        ></sp-textfield>
    </div>
    <div>
        <sp-field-label for="pinocchio-2">Tell me a story</sp-field-label>
        <sp-textfield
            id="pinocchio-2"
            grows
            multiline
            value="Pinocchio eats sugar, but refuses to take medicine. When the undertakers
come for him, he drinks the medicine and feels better. Afterwards he
tells a lie and, in punishment, his nose grows longer and longer.


As soon as the three doctors had left the room, the Fairy went to
Pinocchio’s bed and, touching him on the forehead, noticed that he was
burning with fever."
        ></sp-textfield>
    </div>
    <div>
        <sp-field-label for="pinocchio-3">Tell me a story</sp-field-label>
        <sp-textfield
            id="pinocchio-3"
            grows
            multiline
            value="Pinocchio eats sugar, but refuses to take medicine. When the undertakers
come for him, he drinks the medicine and feels better. Afterwards he
tells a lie and, in punishment, his nose grows longer and longer.


As soon as the three doctors had left the room, the Fairy went to
Pinocchio’s bed and, touching him on the forehead, noticed that he was
burning with fever."
            quiet
        ></sp-textfield>
    </div>
</div>
```

### States

#### Valid

Dictate the validity state of the text entry with the `valid` attribute.

```html
<sp-field-label for="description-1" required>
    Product description
</sp-field-label>
<sp-textfield id="description-1" multiline valid></sp-textfield>
```

#### Invalid

Dictate the invalidity state of the text entry with the `invalid` attribute.

```html
<sp-field-label for="description-2" required>
    Product description
</sp-field-label>
<sp-textfield id="description-2" multiline invalid></sp-textfield>
```

### Behaviors

Textareas support standard form input behaviors:

- **Text input**: Users can type and edit multiline text
- **Scrolling**: Content scrolls vertically when it exceeds the visible area
- **Resizing _(optional)_**: Can be resized by users when the `grows` attribute is not set
- **Form integration**: Works with standard HTML forms and validation

#### Managed validation

<sp-tabs selected="self" auto label="Help text usage in multiline textfields">
<sp-tab value="self">Self managed</sp-tab>
<sp-tab-panel value="self">

```html
<sp-field-label for="e-words-0">Words that start with "E"</sp-field-label>
<sp-textfield
    multiline
    id="e-words-0"
    pattern="[Ee]\w+(\s[Ee]\w+)*$"
    value="Elephant Engineer Echo"
>
    <sp-help-text slot="help-text">Words can be space-separated.</sp-help-text>
    <sp-help-text slot="negative-help-text">
        Words must start with the letter "E".
    </sp-help-text>
</sp-textfield>
```

</sp-tab-panel>
<sp-tab value="above">Managed from above</sp-tab>
<sp-tab-panel value="above">

```html
<sp-field-label for="e-words-1">Words that start with "E"</sp-field-label>
<sp-textfield
    multiline
    id="e-words-1"
    pattern="[Ee]\w+(\s[Ee]\w+)*$"
    value="Elephant Engineer Echo"
    oninput='
        const helpText = this.querySelector(`[slot="help-text"]`);
        const val = this.value;
        const notE = val.match(/\s[^Ee]\w*/) || val.match(/^[^Ee]\w+\s/);
        const notSeparated = val.match(/[Ee]\w+[^\w\s][Ee]\w+$/);
        if (!this.invalid) {
            helpText.textContent = `Words can be space-separated.`;
            helpText.variant = `neutral`;
        } else {
            helpText.variant = `negative`;
            if(notE && notSeparated) {
                helpText.textContent = `Words must be space-separated and start with the letter "E".`;
            } else if(notE) {
                helpText.textContent = `Words must start with the letter "E".`;
            } else {
                helpText.textContent = `Words must be space-separated.`;
            }
        }
    '
>
    <sp-help-text slot="help-text">Words can be space-separated.</sp-help-text>
</sp-textfield>
```

</sp-tab-panel>
</sp-tabs>

### Accessibility

#### Include a label

Every textarea must have an associated label for accessibility. Use either:

- The `label` attribute on the `<sp-textfield>` element
- An `<sp-field-label>` element with a `for` attribute that matches the textarea's `id`

#### Keyboard navigation and focus management

- Use <kbd>Tab</kbd> to move focus to and from the textarea
- Use <kbd>Enter</kbd> to create new lines within the textarea
- Use arrow keys to navigate within the text content
- Screen readers announce the textarea label and current value
- Focus indicators are clearly visible for keyboard users

#### Screen reader support

- The `aria-multiline="true"` attribute is automatically applied
- Labels are properly associated with the textarea
- Help text and validation messages are announced
- Current value and character count are accessible
