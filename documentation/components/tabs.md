## Overview

The sp-tabs component contains set of tab-item elements. This is typically used as the interface for controlling a set of layered sections of content that display one panel of content at a time

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

## Keyboard Accesibility

By default, the first tab-item in tabs automatically becomes selected when it receives focus. By setting the keyboardActivation prop to "manual", a user will need to press the Enter or Space key after a Tab has received focus to select.

```html
<sp-sidenav variant="multiLevel" defaultValue="Layout">
    <sp-sidenav-item value="Guidelines" label="Guidelines"></sp-sidenav-item>
    <sp-sidenav-item value="Styles" label="Styles">
        <sp-sidenav-item value="Color" label="Color"></sp-sidenav-item>
        <sp-sidenav-item value="Grid" label="Grid">
            <sp-sidenav-item value="Layout" label="Layout"></sp-sidenav-item>
            <sp-sidenav-item value="Responsive" label="Responsive"></sp-sidenav-item>
        </sp-sidenav-item>
        <sp-sidenav-item value="Typography" label="Typography"></sp-sidenav-item>
    </sp-sidenav-item>
    <sp-sidenav-item value="Elements" label="Elements"></sp-sidenav-item>
    <sp-sidenav-item value="Patterns" label="Patterns"></sp-sidenav-item>
</sp-sidenav-itm>
```
