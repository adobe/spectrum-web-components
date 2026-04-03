# SWC Package — Agent Guide

`@adobe/spectrum-wc` is the **rendering layer** of the 2nd-gen Spectrum Web Components. It extends abstract base classes from `@spectrum-web-components/core` and adds `render()`, CSS, element registration, Storybook stories, and tests. No shared logic or types belong here — those live in core.

---

## Directory structure

```text
swc/
├── components/          # One folder per component
│   └── badge/
│       ├── Badge.ts         # Concrete class — extends core base, adds render() and CSS
│       ├── badge.css        # Component styles (token-based)
│       ├── index.ts         # Element registration and re-exports
│       ├── stories/         # Storybook stories
│       └── test/            # Functional tests (.test.ts) and a11y tests (.a11y.spec.ts)
├── stylesheets/
│   ├── tokens.css           # Generated design tokens (do not edit by hand)
│   ├── swc.css              # Main stylesheet
│   └── typography.css       # Generated typography styles
├── utils/
│   ├── test-utils.ts        # getComponent(), withWarningSpy() — use in all tests
│   └── a11y-helpers.ts      # gotoStory(), Playwright a11y helpers
└── .storybook/              # Storybook config, decorators, custom addons
```

---

## Component pattern

Every component follows the same three-file structure. Use [Badge](./components/badge/) as the reference implementation.

### `Component.ts` — concrete class

```typescript
import { BadgeBase, BADGE_VARIANTS_S2, ... } from '@spectrum-web-components/core/components/badge';
import styles from './badge.css?inline';

export class Badge extends BadgeBase {
  // 1. Override static arrays with S2 values
  static override readonly VARIANTS = BADGE_VARIANTS_S2;
  static override readonly VALID_SIZES = BADGE_VALID_SIZES;

  // 2. Add S2-only properties (mark with @todo to move to base once 1st-gen is removed)
  @property({ type: Boolean, reflect: true })
  public subtle: boolean = false;

  // 3. Apply styles
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  // 4. Implement render()
  protected override render(): TemplateResult {
    return html`
      <div class=${classMap({ 'swc-Badge': true, ... })}>
        <slot></slot>
      </div>
    `;
  }
}
```

**Rules:**

- Extend the core base class — never re-implement logic that already lives there
- S2-only props go here with `@todo` to move to base once 1st-gen is removed
- `reflect: true` is required on all properties that map to HTML attributes
- CSS class names follow `swc-ComponentName` and `swc-ComponentName--modifier`

### `index.ts` — registration

```typescript
import { defineElement } from '@spectrum-web-components/core/element/index.js';
import { Badge } from './Badge.js';

export * from './Badge.js';

declare global {
  interface HTMLElementTagNameMap {
    'swc-badge': Badge;
  }
}

defineElement('swc-badge', Badge);
```

All components register with the `swc-` prefix. The `HTMLElementTagNameMap` declaration enables TypeScript type narrowing on `document.querySelector('swc-badge')`.

---

## CSS patterns

### Token usage

Use `token("design-token-name")` — PostCSS compiles this to `var(--swc-design-token-name)`. Never hard-code colors, font sizes, spacing, or radii.

```css
.swc-Badge {
  background-color: var(
    --swc-badge-background-color,
    token('accent-color-default')
  );
  border-radius: var(--swc-badge-corner-radius, token('corner-radius-m'));
  font-size: var(--swc-badge-font-size, token('font-size-75'));
}
```

### Two-tier custom property pattern

- `--_swc-*` — private internal variables (set defaults here)
- `--swc-*` — public customizable variables (consumers override these)

```css
:host {
  --_swc-badge-height: token('component-height-100');
  --swc-badge-height: var(--_swc-badge-height);
  height: var(--swc-badge-height);
}
```

### Size variants

```css
:host([size='s']) {
  --swc-badge-height: token('component-height-75');
}
:host([size='l']) {
  --swc-badge-height: token('component-height-200');
}
```

### Specificity ordering

Lower-specificity selectors must come before higher-specificity ones. stylelint enforces this:

```css
/* Correct */
:host([disabled]) { ... }
:host([checked][disabled]) { ... }

/* Wrong — will fail stylelint */
:host([checked][disabled]) { ... }
:host([disabled]) { ... }
```

### Running stylelint

```sh
nx run swc:lint
```

Fix all errors before committing. See [linters/stylelint-property-order.js](../../../linters/stylelint-property-order.js) for the enforced property order.

---

## Testing

### Functional tests (`component.test.ts`)

Tests use Storybook stories as fixtures via Vitest. Each test story reuses a main story and adds a `play()` function.

```typescript
import { meta, Overview } from '../stories/badge.stories.js';
import {
  getComponent,
  withWarningSpy,
} from '@adobe/spectrum-wc/utils/test-utils';

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

    await step('renders expected defaults', async () => {
      expect(badge.variant).toBe('informative');
    });

    await step('variant reflects to attribute after mutation', async () => {
      badge.variant = 'positive';
      await badge.updateComplete;
      expect(badge.getAttribute('variant')).toBe('positive');
    });
  },
};
```

Use `withWarningSpy()` to assert that debug warnings fire correctly:

```typescript
await step('warns on invalid variant', () =>
  withWarningSpy(async (warnCalls) => {
    badge.variant = 'not-valid' as any;
    await badge.updateComplete;
    expect(warnCalls.length).toBeGreaterThan(0);
  })
);
```

Run tests: `yarn test`

### Accessibility tests (`component.a11y.spec.ts`)

Uses Playwright to validate the accessibility tree against Storybook stories.

```typescript
import { gotoStory } from '../../utils/a11y-helpers.js';

test('default badge accessibility tree', async ({ page }) => {
  const root = await gotoStory(page, 'components-badge--overview', 'swc-badge');
  await expect(root).toMatchAriaSnapshot(`
    - text: Active
  `);
});
```

Run a11y tests: `yarn test:a11y`

---

## Storybook stories

Stories serve dual purpose: documentation and test fixtures. Structure every story file the same way:

```typescript
const { args, argTypes, template } = getStorybookHelpers('swc-badge');

export const meta: Meta = {
  title: 'Badge',
  component: 'swc-badge',
  args,
  argTypes,
  render: (args) => template(args),
  tags: ['migrated'],
};

// Use VALID_SIZES / VARIANTS arrays from core as the source of truth for iterating options
export const Sizes: Story = {
  render: () => html`
    ${BADGE_VALID_SIZES.map((size) => template({ size }))}
  `,
  tags: ['options'],
};
```

Tags control what appears in which Storybook view: `autodocs`, `dev`, `overview`, `anatomy`, `options`, `behaviors`, `a11y`.

---

## Import paths

```typescript
// From inside the SWC package — referencing core
import { BadgeBase } from '@spectrum-web-components/core/components/badge';
import { SizedMixin } from '@spectrum-web-components/core/mixins';

// Consumers importing SWC components
import { Badge } from '@adobe/spectrum-wc/badge';
import { Badge } from '@adobe/spectrum-wc/components/badge';
```

---

## Build

```sh
yarn build       # Compile TS + CSS → dist/
yarn storybook   # Dev server with live Storybook
```

Core must be built first (`yarn build` in `2nd-gen/packages/core/`) before SWC can compile.

---

## What does NOT belong in the SWC package

- Shared logic, validation, or lifecycle hooks — goes in the core base class
- Type definitions or const arrays — goes in `Component.types.ts` in core
- `abstract` class definitions — goes in core
- Anything that 1st-gen also needs — goes in core
