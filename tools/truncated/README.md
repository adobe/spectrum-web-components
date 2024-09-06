## Description

`<sp-truncated>` renders a line of text, truncating it if it overflows its container. When overflowing, a tooltip is automatically created
that renders the entire non-truncated content.

It is used like a `<span>` to contain potentially-long strings that are important for users to see, even when in small containers, like full
names and email addresses.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/truncated?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/truncated)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/truncated?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/truncated)

```
yarn add @spectrum-web-components/truncated
```

Import the side effectful registration of `<sp-truncated>` via:

```
import '@spectrum-web-components/truncated/sp-truncated.js';
```

When looking to leverage the `Truncated` base class as a type and/or for extension purposes, do so via:

```
import { Truncated } from '@spectrum-web-components/truncated';
```

## Example

```html
<sp-truncated>
    This will truncate into a tooltip if there isn't enough space for it.
</sp-truncated>
```

### With specific overflow content

By default, tooltip text will be extracted from overflowing content. To provide your own overflow content, slot it into "overflow":

```html
<sp-truncated placement="right">
    This is the inline content
    <span slot="overflow">
        And this overflow content will go into the tooltip, on the right
    </span>
</sp-truncated>
```
