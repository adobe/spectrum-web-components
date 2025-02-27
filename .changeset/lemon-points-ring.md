---
'@spectrum-web-components/reactive-controllers': minor
'@spectrum-web-components/action-menu': minor
'@spectrum-web-components/picker': minor
'@spectrum-web-components/menu': minor
---

Used WAI ARIA Authoring Practices Guide (APG) to make accessibility improvements for `<sp-action-menu>`, `<sp-menu>`, and `<sp-picker>`, including:

-   Numpad keys now work with `<sp-picker>` and `<sp-action-menu>` -`<sp-action-menu>`'s `<sp-menu-item>` elements can now be read by a screen reader ([#4556](https://github.com/adobe/spectrum-web-components/issues/4556))
-   `<sp-menu-item>` href can now be clicked by a screen reader ([#4997](https://github.com/adobe/spectrum-web-components/issues/4997))
-   Opening a `<sp-action-menu>`, `<sp-menu>`, and `<sp-picker>` with a keyboard now sets focus on an item within the menu. ([#4557](https://github.com/adobe/spectrum-web-components/issues/4557))

See the following APG examples for more information:

-   [Navigation Menu Example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/)
-   [Editor Menubar Example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/)
