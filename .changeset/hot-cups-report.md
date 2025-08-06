---
'@spectrum-web-components/clear-button': minor
'@spectrum-web-components/button': minor
'@spectrum-web-components/styles': patch
---

Clear button styles have been updated to the latest Spectrum CSS version of the clear button. This update includes a major reduction in the number of custom property abstractions needed to support the multiple theming layers (as seen in the `styles` package).

This update spans the following additional packages:

- @spectrum-web-components/button
- @spectrum-web-components/styles

As the updated styles now offer additional styling options, we have added the following API to the clear button component that exists in the `button` package:

- `quiet` - when set to true, the button will be rendered as a quiet button. This is useful for cases where you want to use the clear button in a more subtle way.
- `disabled` - when set to true, the button will be rendered as a disabled button.
- `static-color` - currently this only supports the `white` context color. This is useful for cases where the button appears on a dark background texture. This is a replacement for the previously used `variant="overBackground"` attribute which is deprecated.

### Deprecation

The `variant="overBackground"` attribute is deprecated; please use the new `static-color="white"` attribute instead. When this property is used in the component, a deprecation warning will be shown in the console when in debug mode. The `variant` attribute will be removed in a future release.
