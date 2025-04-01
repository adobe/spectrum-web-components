---
'@spectrum-web-components/combobox': minor
'@spectrum-web-components/styles': patch
---

Updates the combobox component from version 4.0.0-s2-foundations.21 to 4.1.2. This work also addresses the design feedback for combobox in S2 foundations:

-   corrects the border colors for several combobox states including focus, keyboardFocus, focus+hover, disabled, read-only for all themes
-   increases the specificity of the `#textfield:hover .input` selector to `#textfield:hover .input:focus` in order to properly render the focus+hover border color styles (within the `combobox.css` file)
-   adds an additional selector for disabled comboboxes that correctly renders the border colors based on theme context
