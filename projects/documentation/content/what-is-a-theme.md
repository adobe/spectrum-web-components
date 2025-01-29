---
layout: introduction.njk
title: 'What is a theme?'
displayName: What is a theme?
slug: what-is-a-theme
---

# Understanding "Theme" in Spectrum Web Components

Theme is an overloaded term that can lead to confusion and a general thought of "What is a theme anyway?". Is it just color appearance changes for light and dark mode? Is it scale changes? Our answer historically has kind of been, "yes—all that". We've built `sp-theme` to represent these different contexts as a collective type called a "theme".

```html
<sp-theme system="spectrum" color="dark" scale="medium">
    <sp-button>Don't Click</sp-button>
</sp-theme>
```

This guide aims to provide an understanding of what we mean when we say "theme" in the project and how you should think about it in your projects.

## What is a theme anyway?

In a world where "theme" is often used to describe the look and feel of an application, we often tie the term to color alone. If we think about how a theme in a CMS (like Wordpress) works, however, it’s often much more than just color. It can affect the entire layout of the page. We don't quite have that concept to worry about but we do have multiple parameters to think about. Those are:

-   **System** » The design system to use, in our case we have Spectrum and Express. This system can be spectrum itself, and as we work towards future versions of Spectrum, this system can become a way to control which version of the Design System you are using. It's also an open API which opens the door to a limited system you build for your product.
-   **Color** » The color appearance, typically light or dark mode.
-   **Scale** » The scale of the components as designed, often used for mobile—for example `medium`, `large`.
-   **Direction** » The directionality of layout, this helps support right-to-left languages like Arabic.
-   **Language** » The language of the content, such as `en-US`, `it`, `jp`, `uk`,—as defined [by mozilla](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang).

## A theme is all of it

All these parameters together are what we consider a "theme". Theme becomes an aggregate concept that represents the state of this collection of values. This state can be modified in some cases by the user of the application—toggling light/dark mode with the `color` attribute. It could also be modified by their browser configuration or their locale—affecting `direction`. Themes also have advanced use cases as described in the [theme guide](/tools/theme/#advanced-usage) where you could define overrides or custom subsystems that can then be exposed as new sets of `color`, `system`, etc. Finally, the theme may be dependent on future versions of the design system—for example, the `system` attribute will be the entry point for future versions of Spectrum allowing teams that need to migrate a clearer path to the new design language—which allows these parameters, like `system`, to be capable of their own beta cycle.

```html
<sp-theme system="spectrum" color="dark" scale="medium">
    <sp-button>Don't Click</sp-button>
</sp-theme>

<!-- is a different "theme" from -->

<sp-theme system="express" color="light" scale="large">
    <sp-button>Don't Click</sp-button>
</sp-theme>
```
