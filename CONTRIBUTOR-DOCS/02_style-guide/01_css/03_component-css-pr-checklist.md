<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-Gen CSS](README.md) / Component CSS PR Checklist

<!-- Document title (editable) -->

# Component CSS PR Checklist

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Structure & Order](#structure--order)
- [Layout & Tokens](#layout--tokens)
- [Specificity](#specificity)
- [Variants & States](#variants--states)
- [Cascade Layers (if used)](#cascade-layers-if-used)
- [High-Contrast](#high-contrast)

</details>

<!-- Document content (editable) -->

Use this checklist when opening or reviewing a PR.

## Structure & Order

- [ ]  Styles follow the documented rule order
- [ ]  `:host` is used only for layout participation and defensive styles
- [ ]  Visual styling lives on `.swc-ComponentName` or internal elements
- [ ]  `@media (forced-colors: active)` (if present) is last in the file

## Layout & Tokens

- [ ]  Visual values come from design tokens and are applied via `token()` 
- [ ]  Non-tokenized values are limited to allowed properties (layout, alignment)
- [ ]  Layout primitives (`gap`, alignment, min/max sizes) are preferred over margins/padding hacks
- [ ]  Padding values are defensive, not layout-driven, where possible

## Specificity

- [ ]  Selector specificity is ≤ `(0,1,0)` in normal cases
- [ ]  Compounded selectors use `:where()`
- [ ]  Any necessary specificity bump is minimal and justified
- [ ]  Overrides rely on rule order or layers before increasing specificity

## Variants & States

- [ ]  Variants that should expose custom properties use `:host([variant=&quot;…&quot;])`
- [ ]  Variants that should *not* expose custom properties use class modifiers
- [ ]  States are attached to `:host` unless the state is internal by design

## Cascade Layers (if used)

- [ ]  All styles are inside layers (no unlayered rules)
- [ ]  Standard layer order is used exactly
- [ ]  Unused layers are still declared
- [ ]  Nested layers are rare and justified

## High-Contrast

- [ ]  Forced-colors styles are only added when necessary
- [ ]  Critical component parts and states remain visible in high-contrast mode
