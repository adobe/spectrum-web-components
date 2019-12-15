## Overview

`sp-toast`s display brief, temporary notifications. They are noticeable but do not disrupt the user experience and do not require an action to be taken.

### Installation

```
npm install @spectrum-web-components/toast

# or

yarn add @spectrum-web-components/toast
```

## Example

### Default

```html
<sp-toast>This is important information that you should read, soon.</sp-toast>
```

### With Actions

```html
<sp-toast>
    This is important information that you should read, soon.
    <sp-button slot="action" variant="overBackground" quiet>
        Do Something
    </sp-button>
</sp-toast>
```

### Wrapping

```html
<sp-toast style="width: 300px">
    This is important information that you should read, soon.
    <sp-button slot="action" variant="overBackground" quiet>
        Do Something
    </sp-button>
</sp-toast>
```

### Variants

#### Negative

```html
<sp-toast variant="negative">
    This is negative information that you should read, soon.
</sp-toast>
```

#### Positive

```html
<sp-toast variant="positive">
    This is positive information that you should read, soon.
</sp-toast>
```

#### Info

```html
<sp-toast variant="info">This is information that you should read.</sp-toast>
```

## Accessibility

An `<sp-toast>` element is by default rendered with a `role` of `alert`. When rendering the `<sp-toast>` to a page, it should be place in a container with a `role` of `region`.
