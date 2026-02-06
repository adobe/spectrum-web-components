<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-Gen CSS](README.md) / Component CSS

<!-- Document title (editable) -->

# Component CSS

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Contributor TL;DR](#contributor-tldr)
- [Rule Order](#rule-order)
- [Managing Specificity](#managing-specificity)
    - [Shadow DOM Specificity and Custom Property Inheritance](#shadow-dom-specificity-and-custom-property-inheritance)
    - [Using Cascade Layers (`@layer`)](#using-cascade-layers-layer)
- [Component Specs vs. Component Styles](#component-specs-vs-component-styles)
- [Closing Note for Contributors](#closing-note-for-contributors)

</details>

<!-- Document content (editable) -->

The following are high-level guidelines for the CSS creation for components.

## Contributor TL;DR

> For examples of all these rules in practice, review the [reference migration for Badge](04_spectrum-swc-migration.md#reference-migration-badge) as well as examples for avoiding issues in the [anti-patterns guide](05_anti-patterns.md).

- `:host` is for defining how the container participates in the global layout, not the core component styles
- Follow the prescribed rule order
- Strive to keep selector specificity ≤ `\(0,1,0\)` with [explicit management](#managing-specificity)
- Use variants and custom property exposure intentionally
- Prefer CSS layout primitives when applying component specs
- Introduce cascade layers if needed as a specificity controller, using the prescribed layer order
- Forced colors styles are only included when browser defaults are not sufficient

## Rule Order

Follow this outline for ordering rulesets within component stylesheets. This will provide consistency across component stylesheets, as well as help mitigate common specificity issues.

1. *If applicable*: `@layer` , `@keyframes`
2. `:host`
        - Considered as a "container" for the component, and should not directly manage component styles itself. Its only concern is how the web component participates in the layout.
        - Primarily includes a `display`  property to match the layout flow intent, using either `inline-block` or `block`
            - Avoid `inline` which would prevent consumers applying reasonable layout properties such as `margin`
        - May also include "defensive" styles for `inline-block` elements
            - `place-self: start` to avoid stretch behaviors if they are placed in a flex or grid context
            - `vertical-align: middle` to keep a vertically centered position next to other `inline-block` elements (ex. a row of badges outside of a flex or grid context)
3. `* { box-sizing: border-box; }`
    - Unless there is a strong reason not to, this rule should be included in all components. Expand to pseudo-elements if in use.
    - Required if the component or its descendants set  `padding` and/or `border` to avoid the compounding effect against the element's size.
4. component styles
    - base class: `.swc-ComponentName`
    - subcomponents: `.swc-ComponentName-sub-component`
    - t-shirt sizes: `:host([size="s"])`
        - Uses `:host()` to maintain exposure of size-related custom properties
    - other variants
        - generally ordered from lower-specificity simple selectors to compound selectors as part of specificity management
        - `.swc-ComponentName--variant` - used for variants excluded from custom property exposure
        - `:host([variant="value"])` - used for variants that should maintain custom property exposure
    - states: `:host([aria-expanded])` , `:host:focus-visible` , etc.
        - states should be attached to `:host/:host()` unless the WC expresses the state on internal elements
        - include within variant styles if needed for specificity reasons
    - `::slotted()` and `slot` styles
    - `@media (forced-colors: active)`
        - **First ensure that the styles are actually necessary**. Do not include styles if the browser defaults achieve visibility of critical component parts and states.
        - If needed, this media query should *always* be at the end of the stylesheet to take priority over other styles.
        - Use direct internal selectors, not host selectors, to enforce the style and prevent accidental consumer overrides.

Sizes, variants, and states should primarily modify the component via updating component custom property values. Refer to the [custom properties style guide](02_custom-properties.md).

## Managing Specificity

Most components are scoped enough that following the prescribed rule order will avoid specificity clashes. However, in some cases such as compounded variants or variants plus states, selectors can still start to bump up specificity.

The issue with bumping up specificity is that it makes valid overrides - such as for a `:disabled` state - more challenging.

Try to keep specificity no greater than `(0,1,0)` which means a maximum of 1 class.

> - Learn [how specificity is calculated](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity#how_is_specificity_calculated)
> - Test with a [specificity calculator](https://polypane.app/css-specificity-calculator/)

To keep specificity low, clauses beyond a single class can be wrapped in `:where()` which nulls the specificity of that clause to zero. Use of `:where()` is encouraged, has ample browser support, and will be expected in PR reviews for compounding class selectors.

```css
/* Before */
.swc-Divider--staticWhite.swc-Divider--sizeL

/* After */
.swc-Divider--staticWhite:where(.swc-Divider--sizeL) 
```

Reducing specificity in this way means the *order* of the rulesets takes precedence.

Occasionally, specificity bumping *is* necessary, but carefully evaluate the order of the rule first. Then, only add the most critical selectors to achieve the necessary specificity bump. Alternatively, consider cascade layers, as described next.

**Exceptions to max-specificity rule**:

- use of pseudo-classes and pseudo-elements (ex. `.spectrum-Button:hover`) are an acceptable bump to specificity, and should be applied outside of `:where()`
- compound attribute selectors in `:host()` are permissable, and most often should not use `:where()` as their computed value will be treated differently, as described next

### Shadow DOM Specificity and Custom Property Inheritance

When working in Shadow DOM, selector specificity does not always determine which custom property value wins.

This is because CSS custom properties are inherited, and their resolved value is determined by the nearest override in the inheritance chain, not by selector specificity alone.

As a result:

- An internal class selector that updates a custom property (e.g. `.swc-ComponentName--variant`)
- ...will override a `:host()` selector that updates the same custom property
- ...even if the `:host()` selector appears more specific

```html
<style>
    p {
      color: var(--color, blue);
    }
    
    .red {
      --color: red;
    }
    
    :host([purple]) {
      --color: purple;
    }
</style>

<p class="red">content</p>
```

Even when the host element has the [purple] attribute, the paragraph will render as red.

This happens because:

- `.red` applies the custom property directly on the element that consumes it
- `:host([purple])` applies the custom property higher in the inheritance chain
- the nearer override wins, regardless of selector specificity

In our real-world component styles, we would use a consistent selector application for these variants (based on custom property exposure intent, not visual similarity) which largely avoids clashes between these styles. And rule order should typically resolve variant vs. variant plus state compounded selectors, if applicable.

This is also why the system intentionally uses different selector types for variants:

- Variants expressed via `:host([…])` are part of the component’s **customization surface** and are expected to update custom property values.
- Variants expressed via internal classes (e.g. `.swc-ComponentName--variant`) are **implementation details** and are not intended to expose or preserve custom property overrides.

This distinction allows us to safely rely on custom property inheritance rules while keeping the public styling surface predictable.

Because of this inheritance behavior:

- It is safe to compound attribute selectors within `:host()`
- ...as long as those selectors are only modifying custom property values

In these cases, `:where()` should generally not be used inside `:host()`, since selector specificity is not the determining factor.

However:

- If you need to modify a direct CSS property (not a custom property),
- or there is no corresponding custom property available,

then the change should be made on the base component or subcomponent selector, as described in the [custom properties style guide](02_custom-properties.md).

### Using Cascade Layers (`@layer`)

> *[DRAFT] guidance - formal RFC in the works*

In more complex components that are juggling a lot of variants in coordination with states, you can introduce cascade layers. An indicator this may be the best course is extensive use of `:where()` to try to wrangle competing variant and state selectors.

The initial order layers are defined is the order they will remain, where the first listed layer has the lowest priority, and the last listed layer has the highest priority.

If you require layers, insert this rule at the top of your stylesheet.

```css
@layer swc-host, swc-component, swc-variants, swc-states, swc-slots;
```

> **Note**: Layer names are prefixed because although they are isolated and do not compound with light DOM-based layers, the prefix helps identify the correct layer source in browser dev tools.

This exact layer order should stay consistent anytime layers are introduced to maintain a more predictable implementation. Please keep each layer name as listed even if the layer isn't presently populated by the component.

Then, adjust styles into those layers, such as:

```css
@layer swc-host {
    :host {
        display: block;
    }
    
    * {
        box-sizing: border-box;
    }
}

@layer swc-component {
    .swc-Divider {
        /* ... */
    }
}
```

**Important notes about layers:**

- If you introduce layers, then *all* of the component's styles must be within a layer. This is because unlayered styles have the highest priority, and therefore beat all layered styles, which negates the benefit of introducing layers.
- Simple selectors such as `:disabled` can beat out classically higher-specificity selectors located in earlier layers. This is both useful, but also a potential foot-gun, and is the reason for the recommended layer order.
- Within a layer, specificity still matters, so in some cases you may still employ `:where()` to keep individual selector specificity reduced.
- It's possible to nest layers to further deprioritize a rule set since nested layers have *less* priority then un-nested layers.
  - Nested layers should be rare and require a clear justification; most components will never need them.
- Use of `!important` will invert the priority order to allow those styles to still take precedence, but proper use of layers should largely prevent the need for enforced importance.

## Component Specs vs. Component Styles

Component specs use design tokens to assign values to nearly all visual aspects of components.

Exempt from tokens but relevant to CSS are values for properties such as:
- `display` - intent is expressed via spec visuals, but not tokenized
- grid and flex alignment properties, ex. `align-items`
- `grid-template-` layout conditions

Often, specs will be very prescriptive about what equates to `padding` for an element. That padding may vary for scenarios such as between the top of the component to it's text label vs. from the top to an optional icon.

It is tempting to use those values as prescribed in order to match the specs. However, the `display` choice of `grid` or `flex` should be taken into account first.

For example:

- Prefer `gap` over overly prescriptive selectors that apply or remove margin
  - *Exception*: if using `grid-template-areas`, the `gap` will still exist even if the grid area is not populated, so `margin` may be more appropriate
- Prefer alignment properties in coordination with min/max sizes before overly prescribing `padding` values
  - *Example*: for Badge, there is a `min-block-size` and the specs provide different block padding values for an icon vs. a text label. By using flexbox and `align-items: center`, we only really need to set the *text-relative* block padding, which is more of a defense mechanism in case the badge label needs to wrap to prevent the text touching the component edge.
    - Badge also uses `:has()` to conditionally adjust padding when icons are present; this replaces Spectrum-era spacing rules.

The ultimate intent here is to prioritize working with the grain of CSS layout models.

## Closing Note for Contributors

If you feel like you’re:

- stacking selectors,
- adding `!important`,
- or fighting overrides

**pause and reconsider rule order or layers first**.

The system is designed so you rarely need more power than `(0,1,0)` and proper rule ordering.
