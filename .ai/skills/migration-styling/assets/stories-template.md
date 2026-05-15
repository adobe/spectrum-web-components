# Phase 5 stories template

A minimal `[component].stories.ts` file for visual verification of 2nd-gen CSS during Phase 5. Full JSDoc and the Accessibility story are deferred — JSDoc belongs to Phase 7 (Documentation); the Accessibility story belongs to the accessibility phase.

## What to replace

| Placeholder       | Meaning                              | Example      |
| ----------------- | ------------------------------------ | ------------ |
| `[Component]`     | PascalCase element name              | `Button`     |
| `[component]`     | kebab-case element name              | `button`     |
| `swc-[component]` | Custom element tag                   | `swc-button` |
| `[COMPONENT]`     | SCREAMING_SNAKE_CASE constant prefix | `BUTTON`     |

## Decisions to make before writing

**From the component's types file** (`[Component].types.ts`), identify which constant arrays exist:

- `[COMPONENT]_VALID_SIZES` → add a `Sizes` story and a `sizeLabels` helper
- `[COMPONENT]_VARIANTS` → add a `Variants` story and a `variantLabels` helper; if variants split into semantic/non-semantic, add two stories
- `[COMPONENT]_FILL_STYLES` or similar → add a fill-style story (e.g. `Outline`) and a `fillStyleLabels` helper
- `[COMPONENT]_STATIC_COLORS` → add a `StaticColors` story with `staticColorsDemo: true` and `'!test'` tag

**Add a `storyName` assignment** for any export whose PascalCase would not render in sentence case (e.g. `StaticColors` → `'Static colors'`, `IconOnly` → `'Icon only'`).

**Anatomy** should show every meaningful slot combination (e.g. label-only, icon + label). Icon-only buttons belong in Behaviors (they depend on a property, not just a slot).

**Behaviors** covers properties that change rendering in a non-obvious way: `icon-only`, `truncate`, text-wrapping constraints, etc. Prefer `template({ ...args, propName: value })` over raw `html\`\``— raw html is acceptable only when slot content (e.g. inline SVG with`slot="icon"`) cannot cleanly flow through `template()`.

**States** covers interactive states the CSS must style: default, disabled, pending (or selected, invalid, etc.) — whatever the component declares.

---

## Template

```typescript
/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { html } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '@adobe/spectrum-wc/components/[component]/swc-[component].js';

import {
  [COMPONENT]_VALID_SIZES,
  [COMPONENT]_VARIANTS,
  // …add other constant arrays that have corresponding stories
  type [Component]Size,
  type [Component]Variant,
  // …add other types used in satisfies constraints below
} from '@spectrum-web-components/core/components/[component]';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-[component]');

// Override argTypes for any attribute that needs explicit options or a control type.
// Use the constant array from the types file — not a hand-written list.
argTypes.variant = {
  ...argTypes.variant,
  control: { type: 'select' },
  options: [COMPONENT]_VARIANTS,
};

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: [COMPONENT]_VALID_SIZES,
};

/**
 * [One or two sentences describing what the component does and when to use it.
 * Keep this brief — detailed usage guidance belongs in Phase 7 docs.]
 */
const meta: Meta = {
  title: '[Component]',
  component: 'swc-[component]',
  parameters: {
    docs: {
      subtitle: `[Plain-text one-liner displayed as the subtitle — no links, no markdown.]`,
    },
    // design: { type: 'figma', url: 'https://www.figma.com/...' },
    // stackblitz: { url: 'https://stackblitz.com/...' },
    // flexLayout: 'row-wrap', // set here to apply to all stories; use 'row-wrap' if items should wrap
  },
  args,
  argTypes,
  render: (args) => template(args),
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

// Add one label map per constant array that has a corresponding story.
// Use `as const satisfies Record<Type, string>` for type safety.
const sizeLabels = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<[Component]Size, string>;

// If variants split into semantic and non-semantic groups, use two maps and combine:
const variantLabels = {
  // [first-variant]: '[Label]',
  // …one entry per variant
} as const satisfies Record<[Component]Variant, string>;

// Example split pattern (delete if not applicable):
// const semanticLabels = {
//   positive: 'Approved', informative: 'Active', neutral: 'Archived',
//   notice: 'Pending', negative: 'Rejected',
// } as const satisfies Record<[Component]SemanticVariant, string>;
//
// const nonSemanticLabels = {
//   indigo: 'Engineering', magenta: 'Design', // …
// } as const satisfies Record<[Component]ColorVariant, string>;
//
// const allVariantLabels = { ...semanticLabels, ...nonSemanticLabels };

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  args: {
    // Most common real-world configuration
    variant: '[first-variant]',
    size: 'm',
    'default-slot': '[Component]',
  },
};

// ──────────────────────────────
//    OVERVIEW STORIES
// ──────────────────────────────

export const Overview: Story = {
  tags: ['overview'],
  args: {
    variant: '[first-variant]',
    size: 'm',
    'default-slot': '[Realistic label]', // Use a real word, not the component name
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Label only' })}
    ${template({ ...args, 'default-slot': 'Icon and label', 'icon-slot': '…' })}
    ${/* Add or remove combinations to match this component's actual slots */}
  `,
  tags: ['anatomy'],
  args: {
    variant: '[first-variant]',
    size: 'm',
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

// One story per distinct constant array in the types file (sizes, variants,
// fill styles, static colors, etc.). Add section-order to control display order.

export const Sizes: Story = {
  render: (args) => html`
    ${[COMPONENT]_VALID_SIZES.map((size) =>
      template({ ...args, size, 'default-slot': sizeLabels[size] })
    )}
  `,
  parameters: { 'section-order': 1 },
  tags: ['options'],
};

export const Variants: Story = {
  render: (args) => html`
    ${[COMPONENT]_VARIANTS.map((variant) =>
      template({ ...args, variant, 'default-slot': variantLabels[variant] })
    )}
  `,
  parameters: { 'section-order': 2 },
  tags: ['options'],
};
Variants.storyName = 'Variants'; // rename if PascalCase doesn't read as sentence case (e.g. 'Semantic variants', 'Non-semantic variants')

// Add additional Options stories here (Outline, StaticColors, etc.)
// For StaticColors, use: tags: ['options', '!test'] and parameters: { staticColorsDemo: true }

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const States: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Default' })}
    ${template({ ...args, disabled: true, 'default-slot': 'Disabled' })}
    ${/* Add pending, selected, invalid, or other states as applicable */}
  `,
  tags: ['states'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

// Add one story per behavior that changes rendering in a non-obvious way
// (text wrapping, truncation, icon-only layout, etc.).
// Prefer template({ ...args, prop: value }) over raw html`` where possible.

// Example — text wrapping (common for text-bearing components):
// export const TextWrapping: Story = {
//   render: (args) => html`
//     ${template({ ...args, 'default-slot': 'A label long enough to demonstrate wrapping behavior', style: 'max-inline-size: 120px' })}
//   `,
//   tags: ['behaviors'],
// };
// TextWrapping.storyName = 'Text wrapping';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

// TODO: will complete in separate documentation pass of phase 7
```

## Checklist before moving to CSS work

- [ ] File exists at `2nd-gen/packages/swc/components/[component]/stories/[component].stories.ts`
- [ ] `Playground` renders with correct defaults
- [ ] `Anatomy` shows all meaningful slot combinations
- [ ] Every constant array in the types file has a corresponding Options story
- [ ] `StaticColors` story (if applicable) has `staticColorsDemo: true` and `'!test'` tag
- [ ] `storyName` added for any PascalCase export that doesn't read as sentence case
- [ ] Component renders in Storybook with no console errors before touching CSS
