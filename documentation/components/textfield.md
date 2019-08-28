## Overview

`sp-textfield` components are text boxes that allow users to input custom text entries with a keyboard. Various decorations can be displayed around the field to communicate the entry requirements.

## Example

```html
<sp-textfield label="Enter your name"></sp-textfield>
```

## Variants

### Valid

Dictate the validity state of the text entry with the `valid` attribute.

```html
<sp-textfield label="Enter your name" valid></sp-textfield>
```

### Invalid

Dictate the invalidity state of the text entry with the `invalid` attribute.

```html
<sp-textfield label="Enter your name" invalid></sp-textfield>
```

### Quiet

The quiet style works best when a clear layout (vertical stack, table, grid) makes it easy to parse. Too many quiet components in a small space can be hard to read.

```html
<sp-textfield label="Enter your name" quiet></sp-textfield>
```
