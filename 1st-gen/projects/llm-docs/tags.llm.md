---
component: tags
tag: sp-tags
package: '@spectrum-web-components/tags'
source: 1st-gen/packages/tags/README.md
generated: 2026-06-17T10:49:38.838Z
generator: scripts/generate-llm-docs.mjs
---

## Overview

`<sp-tags>` elements contain a collection of `<sp-tag>` elements and allow users to categorize content. They can represent keywords or people, and are grouped to describe an item or a search request.

[View the design documentation for this component.](https://spectrum.adobe.com/page/tag/)

### Usage

```zsh
yarn add @spectrum-web-components/tags
```

Import the side effectful registration of `<sp-tags>` or `<sp-tag>` via:

```js
import '@spectrum-web-components/tags/sp-tags.js';
import '@spectrum-web-components/tags/sp-tag.js';
```

When looking to leverage the `Tags` or `Tag` base classes as a type and/or for extension purposes, do so via:

```js
import { Tags, Tag } from '@spectrum-web-components/tags';
```

### Anatomy

Tags are created from the following parts:

- **Tags**: The container component (`<sp-tags>`) that manages a collection of `<sp-tag>` elements.
- **Tag**: The individual tag element (`<sp-tag>`) represents a single tag. [Read more about the `Tag` component.](/components/tag/)

### Options

```html
<sp-tags>
  <sp-tag>Tag 1</sp-tag>
  <sp-tag invalid>Tag 2</sp-tag>
  <sp-tag disabled>Tag 3</sp-tag>
</sp-tags>
html
<sp-tags>
    <sp-tag>
        Tag 1
        <sp-avatar
            slot="avatar"
            label="Tag 1"
            src=https://picsum.photos/500/500
        ></sp-avatar>
    </sp-tag>
    <sp-tag invalid>
        Tag 2
        <sp-avatar
            slot="avatar"
            label="Tag 1"
            src=https://picsum.photos/500/500
        ></sp-avatar>
    </sp-tag>
    <sp-tag disabled>
        Tag 3
        <sp-avatar
            slot="avatar"
            label="Tag 1"
            src=https://picsum.photos/500/500
        ></sp-avatar>
    </sp-tag>
</sp-tags>
html
<sp-tags>
  <sp-tag>
    Tag 1
    <sp-icon-magnify slot="icon" size="s"></sp-icon-magnify>
  </sp-tag>
  <sp-tag invalid>
    Tag 2
    <sp-icon-magnify slot="icon" size="s"></sp-icon-magnify>
  </sp-tag>
  <sp-tag disabled>
    Tag 3
    <sp-icon-magnify slot="icon" size="s"></sp-icon-magnify>
  </sp-tag>
</sp-tags>
```

### Accessibility

`<sp-tags>` is a `role="list"` container that manages a collection of `<sp-tag>` elements. It has an `aria-label` attribute that defaults to `Tags`.

`<sp-tags>` uses the [roving tabindex](/tools/roving-tab-index) pattern for efficient keyboard navigation. `Tab` enters the collection, arrow keys navigate between tags, and only deletable tags are focusable. The container provides `role="list"` semantics with each tag as a `role="listitem"` for proper screen reader support.

**Mouse**

- Read-only tags: Do not get mouse functionality besides a mouse cursor on hover and do not have interactive functionality.

**Keyboard**

- Read-only tags: Cannot be operated by a keyboard and have no interactive functionality.
