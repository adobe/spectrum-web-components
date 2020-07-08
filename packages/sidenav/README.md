## Description

Side navigation allows users to locate information and features within the UI.
It can be used for either hierarchical or flat navigation, and gives the ability
to group navigable items categorically. Side navigation is an opportunity to
prioritize content or features based on your users’ needs in a way that
maintains clear, persistent visibility. Use side navigation within the context
of larger elements and mechanisms within the app frame.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/sidenav?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/sidenav)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/sidenav?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/sidenav)

```
yarn add @spectrum-web-components/sidenav
```

Import the side effectful registration of `<sp-sidenav>`, `<sp-sidenav-heading>`, or `<sp-sidenav-item>` via:

```
import '@spectrum-web-components/sidenav/sp-sidenav.js';
import '@spectrum-web-components/sidenav/sp-sidenav-heading.js';
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
```

When looking to leverage the `Sidenav`, `SidenavHeading`, or `SidenavItem` base classes as a type and/or for extension purposes, do so via:

```
import {
    Sidenav,
    SidenavHeading,
    SidenavItem
} from '@spectrum-web-components/sidenav';
```

## Example

```html
<sp-sidenav defaultValue="Docs">
    <sp-sidenav-item
        value="Docs"
        label="Docs"
        href="/components/SideNav"
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="Guides"
        label="Guides"
        href="/guides/getting_started"
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="Community"
        label="Community"
        href="/community"
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="Storybook"
        label="Storybook"
        href="/storybook"
        target="_blank"
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="Releases"
        label="Releases"
        href="http://git.corp.adobe.com/React/react-spectrum/releases"
        target="_blank"
        disabled
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="GitHub"
        label="GitHub"
        href="http://git.corp.adobe.com/React/react-spectrum"
        target="_blank"
    ></sp-sidenav-item>
</sp-sidenav>
```

## Multi-level

Use this variation when you have multiple layers of hierarchical navigation. The
headers are styled differently and possess the same interactive behavior as a
treeview; clicking the header opens and collapses the children navigation items.
In the instances where a top-level navigation item has no children, clicking
will send the user to the location of the item.

```html
<sp-sidenav variant="multilevel" defaultValue="Layout">
    <sp-sidenav-item value="Guidelines" label="Guidelines"></sp-sidenav-item>
    <sp-sidenav-item value="Styles" label="Styles" expanded>
        <sp-sidenav-item value="Color" label="Color"></sp-sidenav-item>
        <sp-sidenav-item value="Grid" label="Grid" expanded>
            <sp-sidenav-item value="Layout" label="Layout"></sp-sidenav-item>
            <sp-sidenav-item value="Responsive" label="Responsive"></sp-sidenav-item>
        </sp-sidenav-item>
        <sp-sidenav-item value="Typography" label="Typography"></sp-sidenav-item>
    </sp-sidenav-item>
    <sp-sidenav-item value="Elements" label="Elements"></sp-sidenav-item>
    <sp-sidenav-item value="Patterns" label="Patterns"></sp-sidenav-item>
</sp-sidenav-itm>
```

## Icon

```html
<sp-icons-medium></sp-icons-medium>
<sp-sidenav>
    <sp-sidenav-item value="Section Title 1" label="Section Title 1">
        <sp-icon slot="icon" size="s" name="ui:Star"></sp-icon>
    </sp-sidenav-item>
    <sp-sidenav-item value="Section Title 2" label="Section Title 2">
        <sp-icon slot="icon" size="s" name="ui:Star"></sp-icon>
    </sp-sidenav-item>
    <sp-sidenav-item value="Section Title 3" label="Section Title 3">
        <sp-icon slot="icon" size="s" name="ui:Star"></sp-icon>
    </sp-sidenav-item>
</sp-sidenav>
```

## Heading

```html
<sp-sidenav variant="multilevel">
    <sp-sidenav-item value="Section 1" label="Section 1"></sp-sidenav-item>
    <sp-sidenav-item value="Section 2" label="Section 2"></sp-sidenav-item>
    <sp-sidenav-heading label="Category 1">
        <sp-sidenav-item value="Section 3" label="Section 3"></sp-sidenav-item>
        <sp-sidenav-item value="Section 4" label="Section 4"></sp-sidenav-item>
    </sp-sidenav-heading>
    <sp-sidenav-heading label="Category 2">
        <sp-sidenav-item value="Section 5" label="Section 5"></sp-sidenav-item>
        <sp-sidenav-item value="Section 6" label="Section 6"></sp-sidenav-item>
    </sp-sidenav-heading>
</sp-sidenav>
```

## Accessibility

When the `manage-tab-index` attribute is set on an `sp-sidenav` element then it will presents its child `sp-sidenav-item` children with a single tab-stop. This will leave items beyond the selected item, or first when there is no focusable selected item, will be accessibile via the up and down arrow keys.
