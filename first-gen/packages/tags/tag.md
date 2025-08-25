## Description

`<sp-tag>` elements represent a category to which the content they are a part of belongs. They can represent keywords or people, and are grouped to describe an item or a search request.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tags?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tags)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tags?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tags)

```
yarn add @spectrum-web-components/tags
```

Import the side effectful registration of `<sp-tag>` via:

```
import '@spectrum-web-components/tags/sp-tag.js';
```

When looking to leverage the `Tag` base class as a type and/or for extension purposes, do so via:

```
import { Tag } from '@spectrum-web-components/tags';
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-tags>
    <sp-tag size="s">Tag 1</sp-tag>
    <sp-tag invalid size="s">Tag 2</sp-tag>
    <sp-tag disabled size="s">Tag 3</sp-tag>
</sp-tags>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-tags>
    <sp-tag size="m">Tag 1</sp-tag>
    <sp-tag invalid size="m">Tag 2</sp-tag>
    <sp-tag disabled size="m">Tag 3</sp-tag>
</sp-tags>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-tags>
    <sp-tag size="l">Tag 1</sp-tag>
    <sp-tag invalid size="l">Tag 2</sp-tag>
    <sp-tag disabled size="l">Tag 3</sp-tag>
</sp-tags>
```

</sp-tab-panel>
</sp-tabs>

### Deletable

Use the `deletable` attribute to signify `<sp-tag>` elements that can be removed. The tags will only be focusable and deletable when they have the `deletable` and non-disabled attribute. When the clear button within the `<sp-tab>` is clicked, a `delete` event will be dispatched.

<sp-tabs selected="default" auto label="Visual Variants">
<sp-tab value="default">Default</sp-tab>
<sp-tab-panel value="default">

```html-live
<sp-tags>
    <sp-tag deletable>Tag 1</sp-tag>
    <sp-tag invalid deletable>Tag 2</sp-tag>
    <sp-tag disabled deletable>Tag 3</sp-tag>
</sp-tags>
```

</sp-tab-panel>
<sp-tab value="avatar">With Avatars</sp-tab>
<sp-tab-panel value="avatar">

```html-live
<sp-tags>
    <sp-tag deletable>
        Tag 1
        <sp-avatar
            slot="avatar"
            label="Tag 1"
            src=https://picsum.photos/500/500
        ></sp-avatar>
    </sp-tag>
    <sp-tag invalid deletable>
        Tag 2
        <sp-avatar
            slot="avatar"
            label="Tag 1"
            src=https://picsum.photos/500/500
        ></sp-avatar>
    </sp-tag>
    <sp-tag disabled deletable>
        Tag 3
        <sp-avatar
            slot="avatar"
            label="Tag 1"
            src=https://picsum.photos/500/500
        ></sp-avatar>
    </sp-tag>
</sp-tags>
```

</sp-tab-panel>
<sp-tab value="icon">With Icons</sp-tab>
<sp-tab-panel value="icon">

```html-live
<sp-tags>
    <sp-tag deletable>
        Tag 1
        <sp-icon-magnify slot="icon" size="s"></sp-icon-magnify>
    </sp-tag>
    <sp-tag invalid deletable>
        Tag 2
        <sp-icon-magnify slot="icon" size="s"></sp-icon-magnify>
    </sp-tag>
    <sp-tag disabled deletable>
        Tag 3
        <sp-icon-magnify slot="icon" size="s"></sp-icon-magnify>
    </sp-tag>
</sp-tags>
```

</sp-tab-panel>
</sp-tabs>

<script type="module">
    customElements.whenDefined('sp-tag').then(() => {
        const deletable = document.querySelectorAll('sp-tag[deletable]');
        deletable.forEach(tag => {
            tag.addEventListener('delete', () => {
                spAlert(tag, 'Tag item deleted.');
            })
        });
    });
</script>
