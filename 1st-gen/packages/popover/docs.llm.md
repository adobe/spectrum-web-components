---
component: popover
tag: sp-popover
package: '@spectrum-web-components/popover'
source: 1st-gen/packages/popover/README.md
generator: scripts/generate-llm-docs.mjs
---

## Overview

An `<sp-popover>` is used to display transient content (menus, options, additional actions etc.) and appears when clicking/tapping on a source (tools, buttons, etc.) It stands out via its visual style (stroke and drop shadow) and floats on top of the rest of the interface. This component does not implement the actual overlay behavior and interactions. This is handled by the [`Overlay`](../overlay) system.

### Usage

```
yarn add @spectrum-web-components/popover
```

Import the side effectful registration of `<sp-popover>` via:

```
import '@spectrum-web-components/popover/sp-popover.js';
```

When looking to leverage the `Popover` base class as a type and/or for extension purposes, do so via:

```
import { Popover } from '@spectrum-web-components/popover';
```

## Anatomy

```html
<div
  style="
        position: relative;
        height: 100px;
    "
>
  <sp-popover open>
    Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels.
  </sp-popover>
</div>
```

### Options

#### Default with no tip

Default popover with no tip and no placement. Popovers will fill up the space of their containing element by default. The default popover has no padding.

```html
<div
  style="
        position: relative;
        height: 180px;
        max-width: 320px;
    "
>
  <sp-popover variant="default" open>
    <h2>Popover title</h2>
    <p>
      Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels. Icing
      soufflé chupa chups donut cheesecake. Jelly-o chocolate cake sweet roll
      cake danish candy biscuit halvah
    </p>
  </sp-popover>
</div>
```

#### Dialog popovers

To apply a managed amount of padding within your `<sp-popover>`, you may choose to wrap your slotted content in an `<sp-dialog>` element, as seen below:

```html
<div
  style="
        position: relative;
        height: 250px;
        max-width: 320px;
    "
>
  <sp-popover open>
    <sp-dialog>
      <h3 slot="heading">Popover title</h3>
      Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels. Icing
      soufflé chupa chups donut cheesecake. Jelly-o chocolate cake sweet roll
      cake danish candy biscuit halvah
    </sp-dialog>
  </sp-popover>
</div>
```

#### Popover with tip

The `placement` attribute can be used to customize how the `<sp-popover>` points to its related content. `placement="top"` will point down to the related content from the top, etc.

```html
<div
  style="
        position: relative;
        height: 250px;
        max-width: 320px;
    "
>
  <sp-popover placement="top" tip open>
    <sp-dialog>
      <h3 slot="heading">Popover title</h3>
      Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels. Icing
      soufflé chupa chups donut cheesecake. Jelly-o chocolate cake sweet roll
      cake danish candy biscuit halvah
    </sp-dialog>
  </sp-popover>
</div>
html
<div
  style="
        position: relative;
        height: 200px;
        max-width: 320px;
    "
>
  <sp-popover placement="right" tip open>
    <sp-dialog>
      <h3 slot="heading">Popover title</h3>
      Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels. Icing
      soufflé chupa chups donut cheesecake. Jelly-o chocolate cake sweet roll
      cake danish candy biscuit halvah
    </sp-dialog>
  </sp-popover>
</div>
html
<div
  style="
        position: relative;
        height: 200px;
        max-width: 320px;
    "
>
  <sp-popover placement="bottom" tip open>
    <sp-dialog>
      <h3 slot="heading">Popover title</h3>
      Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels. Icing
      soufflé chupa chups donut cheesecake. Jelly-o chocolate cake sweet roll
      cake danish candy biscuit halvah
    </sp-dialog>
  </sp-popover>
</div>
html
<div
  style="
        position: relative;
        height: 200px;
        max-width: 320px;
    "
>
  <sp-popover placement="left" tip open>
    <sp-dialog>
      <h3 slot="heading">Popover title</h3>
      Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels. Icing
      soufflé chupa chups donut cheesecake. Jelly-o chocolate cake sweet roll
      cake danish candy biscuit halvah
    </sp-dialog>
  </sp-popover>
</div>
```

### Accessibility

For components used with a popover, see the accessibility guidelines of the particular component.
