---
layout: guide.njk
title: 'Styling Components: Spectrum Web Components'
displayName: Styling Components
slug: styling-components
---

# Styling Components

This document outlines the details of the CSS styling for Spectrum Web Components.

## Component Styling

For each component in the project, there are up to 3 CSS files:

- `[component-name].css` - This is the main CSS file and contains the component's styles.

### How to update the component styling

We will try to keep the concerns separate for the component styling and so depending on the changes, we will need to update the component styling in the following ways:

- If it's a fix to the core visual structure or token usage, it belongs in `spectrum-[component-name].css`.
- If it's something unique to SWC or a workaround, then `[component-name].css` is acceptable — but should be reviewed for long-term cleanup.

The process to update these two css files is the same and is as follows:

Example:

```css
:host {
    - --spectrum-accordion-item-height: var(--spectrum-component-height-200);
    + --spectrum-accordion-item-height: var(--spectrum-component-height-300);
}
```

This will just work! As long as the `--spectrum-component-height-300` variable exists in the tokens package.

## Global styling

SWC project uses styles package to manage the global css tokens for all three themes. The styles package can be found in `tools/styles`. There is one very small caveat in the way we manage the styles package. We have two different tokens packages, one for the express + spectrum theme and one for the spectrum 2 theme.

- `styles/tokens` - This is the tokens package.

NOTE: In all likelihood, you would only need to do minor changes to the styles package. However, if you feel like you need to make major changes to the styles package, the correct approach would be to start a discussion among the team and figure out a plan together.

### How to update the global styling

In our styles package, we have separation of separate variables for different contexts i.e, size and color.

#### Updating size-specific css variables

If you're updating a size (e.g. `--spectrum-accordion-item-height`) variable, you'll need to update the `tools/styles/tokens/[large | medium]-vars.css` file depending on the theme.

#### Updating color-specific css variables

If you're updating a color (e.g. `--spectrum-accordion-background-color`) variable, you'll need to update
the `tools/styles/tokens/[dark | light]-vars.css` file depending on the theme.

**NOTE:** If the variable that you're updating is not present in those files, chances are that this variable had the same value for both contexts in that tokens package. In that case, if you want the variable to continue to have the same value then you can update the `tools/styles/tokens/index.css` file.
Or if you want to make the variable context-specific, then you can add those new values in both of the files like we talked about above.
