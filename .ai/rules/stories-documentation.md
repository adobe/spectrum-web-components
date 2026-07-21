---
description: Authoring guide for the per-unit MDX docs page for 2nd-gen components, internal components, patterns, and controllers. Covers section content, accessible examples, and 1st-gen comparison notes. Story prose lives in MDX, not in JSDoc above story exports.
globs: 2nd-gen/packages/swc/components/*/*.mdx, 2nd-gen/packages/swc/patterns/*/*/*.mdx, 2nd-gen/packages/core/controllers/*/*.mdx
alwaysApply: false
---

# Per-unit MDX authoring standards

Authoring guide for the per-unit MDX file that powers each Storybook Docs page. Applies to all four 2nd-gen genres: components, internal components, patterns, and controllers.

**See also**: `.ai/rules/stories-format.md` for the stories file (`.stories.ts`) structure and conventions.

## Scope

Apply to per-unit MDX files in:

- `2nd-gen/packages/swc/components/<name>/<name>.mdx` (components)
- `2nd-gen/packages/swc/components/<name>/<name>.internal.mdx` (internal components — production builds exclude these)
- `2nd-gen/packages/swc/patterns/<group>/<unit>/<unit>.mdx` (patterns)
- `2nd-gen/packages/core/controllers/<name>/<name>.mdx` (controllers)

## Authoring surface: per-unit MDX

Long-form documentation lives in the per-unit MDX file at the unit's root, not in JSDoc above story exports. The MDX file is the source of truth for the Docs page layout and prose.

### File template

```mdx
import { Canvas, Meta } from '@storybook/addon-docs/blocks';
import { DocsFooter, DocsHeader } from '../../.storybook/blocks'; // components
// or '../../../.storybook/blocks' for patterns
// or '../../../swc/.storybook/blocks' for controllers

import * as Stories from './stories/<unit>.stories';

<Meta of={Stories} />

<DocsHeader />

## Anatomy

...prose...

<Canvas of={Stories.Anatomy} />

## Options

### Sizes

...prose...

<Canvas of={Stories.Sizes} />

## States

### States

...prose...

<Canvas of={Stories.States} />

## Behaviors

### Text wrapping

...prose...

<Canvas of={Stories.TextWrapping} />

## Accessibility

...prose with `### Features` and `### Best practices` subheadings...

<Canvas of={Stories.Accessibility} />

## Upcoming features

...prose only, no Canvas...

<DocsFooter />
```

### Canonical section order

`DocumentTemplate.mdx` (the fallback template for units without a per-unit MDX) renders sections in this same order, so converted units and unconverted units sit side-by-side without surprises:

1. **Anatomy** — `hideTitle` semantics: no per-story `###` heading
2. **Usage** — `hideTitle` semantics (controllers; describes how to instantiate)
3. **Options** — per-story `### Title` headings appear
4. **States** — per-story `### Title` headings appear
5. **Behaviors** — per-story `### Title` headings appear
6. **Accessibility** — `hideTitle` semantics
7. **Full pattern** — per-story `### Title` headings appear (patterns only)
8. **Upcoming features** — `hideTitle` semantics; prose-only sections allowed (no `<Canvas>`). Positioned before the footer so it reads as forward-looking notes after the current API/behavior, not as a preamble before Options.
9. **API** — rendered by `<DocsFooter />`. Controllers ship a hand-authored `## API` ahead of `<DocsFooter />` with a Methods/Events/Options table; `<DocsFooter />` omits `<ApiTable />` when `meta.tags` contains `'controller'`.
10. **Appendix** — `hideTitle` semantics; prose-only.
11. **Feedback** — rendered by `<DocsFooter />`.

### Genre-specific notes

| Topic                                | Component                   | Internal                          | Pattern                        | Controller                                           |
| ------------------------------------ | --------------------------- | --------------------------------- | ------------------------------ | ---------------------------------------------------- |
| MDX path                             | `components/<n>/<n>.mdx`    | `components/<n>/<n>.internal.mdx` | `patterns/<g>/<n>/<n>.mdx`     | `controllers/<n>/<n>.mdx`                            |
| Blocks import path                   | `'../../.storybook/blocks'` | `'../../.storybook/blocks'`       | `'../../../.storybook/blocks'` | `'../../../swc/.storybook/blocks'`                   |
| Meta tag for `DocsFooter` API branch | `'migrated'`                | n/a                               | n/a                            | `'controller'` (omits `<ApiTable />`)                |
| Anatomy section                      | required (DOM-bearing)      | required if applicable            | required (DOM-bearing)         | omitted (controllers have no DOM)                    |
| Production build inclusion           | yes                         | no (`.internal.mdx` excluded)     | yes                            | yes (dev) — core docs excluded from production build |

### Per-story title rules

Per-story `### Title` headings (in sections with `hideTitle=false`: Options, States, Behaviors, Full pattern) must match the story's rendered name exactly:

- If the story has an explicit `<Story>.storyName = '...'` override, use that exact string.
- Otherwise, use Storybook's PascalCase → Title Case conversion of the export name (each word capitalized).

Examples:

| Export name                                                       | Rendered title          |
| ----------------------------------------------------------------- | ----------------------- |
| `Sizes`                                                           | `Sizes`                 |
| `TextWrapping`                                                    | `Text Wrapping`         |
| `InActionButton`                                                  | `In Action Button`      |
| `ActivationModes`                                                 | `Activation Modes`      |
| `SemanticVariants` with `.storyName = 'Semantic variants'`        | `Semantic variants`     |
| `NonSemanticVariants` with `.storyName = 'Non-semantic variants'` | `Non-semantic variants` |

### Single-story sections

When a section has only one story, and that story's rendered name is identical to the `## Section` heading (e.g., a single `States` story named `States`), omit the `### Title` subheading. Author the prose directly under `## Section`, with the `<Canvas>` reference immediately below it. A `## States` heading followed immediately by a `### States` subheading is redundant; collapse it to one heading. (`button.mdx`, `color-handle.mdx`.)

If a single-story section's rendered name _differs_ from the `## Section` heading (e.g., a `## Behaviors` section whose only story renders as "Toggle behavior"), keep the `### Title` subheading. It's adding real information there, not repeating the section title.

### Untagged stories do not appear

Stories without any section tag (`anatomy`, `options`, `states`, `behaviors`, `a11y`, `upcoming`, `usage`, `appendix`, `full-pattern`, `api`) are not surfaced on the Docs page (subject to the global `'!autodocs'` / `'!dev'` exclusion in `preview.ts`). Do not author a `<Canvas of={...}>` for an untagged story in MDX; that would surface content production does not render.

### Self-check with `yarn lint:docs-pages`

Run `yarn lint:docs-pages` during authoring to confirm a per-unit MDX file satisfies the structural rules above. The check walks every in-scope MDX file and reports:

- Missing or duplicate `<Meta of={...} />` declarations
- Unknown or out-of-order `##` section headings
- Section-tagged stories that have no `<Canvas of={Stories.X} />` reference in the MDX
- `<Canvas>` references that point to a story export that does not exist

The same checks run inside `yarn lint:ai` and in CI, so a green run locally means the docs page conforms to the published rules.

## Documentation structure

Organize MDX into these sections (skip sections that don't apply):

1. **Overview** - rendered automatically by `<DocsHeader />` from the meta JSDoc, subtitle, and Overview story
2. **Anatomy** - A flat, unordered list of the component's parts, with slot names called out inline where needed (components and patterns)
3. **Usage** - How to instantiate and configure (controllers)
4. **Options** - Configuration, variants, sizes, styles
5. **States** - Different component states
6. **Behaviors** - Methods, events, automatic behaviors
7. **Accessibility** - Features and best practices
8. **Upcoming features** - Roadmap intent (prose only, no Canvas)
9. **API** - Rendered automatically by `<DocsFooter />`. Controllers hand-author a `## API` section first.
10. **Feedback** - Rendered automatically by `<DocsFooter />`.

The remaining sections of this rule describe the **prose content** for each section. Author that prose inside the per-unit MDX, not as JSDoc above stories.

## Helpers section

**Purpose**: Organize shared code, label mappings, and utilities used across multiple stories.

**Location**: Between `export default meta` and first story (Playground/Autodocs).

**When to use:**

- Component has multiple variants, sizes, or options that need consistent labels
- Stories require reusable label mappings or data structures
- Complex rendering logic needs to be shared across stories

**Pattern**:

```typescript
// ────────────────────
//    HELPERS
// ────────────────────

// Label mappings for sizes
const sizeLabels = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<ComponentSize, string>;

// Label mappings for semantic variants
const semanticLabels = {
  positive: 'Approved',
  negative: 'Rejected',
  informative: 'Active',
  neutral: 'Archived',
  notice: 'Pending',
} as const satisfies Record<SemanticVariant, string>;

// Combined label objects for convenience
const allLabels = { ...semanticLabels, ...colorLabels };
```

**Key principles:**

- Use TypeScript `as const satisfies` for type-safe label mappings
- Group related helpers together (size labels, variant labels, etc.)
- Use clear, descriptive constant names (`sizeLabels`, not `labels`)
- Provide realistic, meaningful labels (not "Label 1", "Label 2")

**When NOT to use:**

- Component has only 1-2 options (no need for label mappings)
- Labels are self-explanatory (e.g., true/false)
- Stories don't share any common code

## Section patterns

> **Where the prose lives.** Each pattern below shows a "prose" block. Author that prose as Markdown inside the corresponding `## Section` / `### Story Title` in the `<unit>.mdx` file, immediately above the `<Canvas of={Stories.MyStory} />` reference. The accompanying story definition has no JSDoc above it.

### Overview

**Purpose**: Quick introduction showing the component in its most common use case.

**Documentation**: The Overview story content comes from two sources:

1. **JSDoc description above meta**: Provides the main description of what the component does and when to use it. This description:
   - Is displayed as the primary documentation for the Overview story
   - Can include markdown formatting and links to other components
   - Should reference other components using Storybook paths: `[Badge](../?path=/docs/badge--readme)`
   - Should provide fuller context than the subtitle

2. **`parameters.docs.subtitle`**: Provides a brief summary displayed as the subtitle. This subtitle:
   - Cannot include links (plain text only)
   - Should be concise and to-the-point
   - Should not repeat the JSDoc description verbatim
   - Complements the JSDoc description

**Pattern**:

```typescript
/**
 * A badge is a non-interactive visual label that displays a status, category, or attribute.
 * Badges can be used to highlight important information or to categorize items. For interactive
 * labels, see [Button](../?path=/docs/button--readme).
 */
const meta: Meta = {
  title: 'Badge',
  component: 'swc-badge',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: { subtitle: `Visual label for status, category, or attribute` },
    // ... other parameters
  },
  tags: ['migrated'],
};

export default meta;

// ... HELPERS section if needed ...

export const Overview: Story = {
  tags: ['overview'],
  args: {
    // Most common/representative configuration
  },
};
```

**Note**: the Overview story renders into the docs page header via `<OverviewStory />` inside `<DocsHeader />`. The meta-level JSDoc (above `const meta`) and the `parameters.docs.subtitle` provide the surrounding prose; the Overview story itself just supplies the canvas.

### Anatomy

**Purpose**: Give the reader a mental model of the component's parts in plain language. Anatomy is not a second copy of the API table: the generated `<ApiTable />` (rendered by `<DocsFooter />`) already lists every slot and property from source with type and description. Anatomy should not duplicate it.

**Required content:**

- A flat, unordered list of the component's visual parts
- Slot names called out **inline**, only where a reader needs to know a piece of content comes from a slot (so they write it as markup) rather than a property (so they write it as an attribute); not a separate slot inventory
- Visual examples showing structure

**Consolidation rule**: Combine all slotted content combinations into a **single Anatomy story**.

**MDX prose** (`## Anatomy` section uses `hideTitle` semantics: no per-story `###`, and no `###`/`####` subsections of any kind):

```mdx
## Anatomy

A component-name consists of:

- **Primary element**: main visual component
- **Secondary element**, provided via the `icon` slot
- **Optional indicator**: shown conditionally

<Canvas of={Stories.Anatomy} />
```

**Story definition** (no JSDoc above it):

```typescript
export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args /* minimal */ })}
    ${template({ ...args /* with icon */ })}
    ${template({ ...args /* with additional content */ })}
  `,
  tags: ['anatomy'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};
```

**Key principles:**

- Use a flat, unordered list of parts. Never a numbered list: there is no numbered diagram for the numbers to key off of, and it reads oddly for single-part components. Never `###`/`####` subsections (e.g. no "Content", "Slots", or "Properties" headings). Doing so re-creates the API table by hand and drifts out of sync with it.
- Name a slot inline in the parts list only when a reader needs to know content is passed as a slot rather than a property to compose it correctly
- Don't re-list content-rendering properties that are already visible in the rendered example or covered by the API table
- Show all meaningful combinations in one story

### Options

**Purpose**: Document every attribute or property not covered in Anatomy, States, or Behaviors.

**Order**: Sizes → Semantic variants → Non-semantic variants → Quiet/Subtle/Emphasized → Outline → Static color → Positioning → Other options

**Consolidation rules**:

- All sizes → single `Sizes` story
- All semantic variants → single `SemanticVariants` story
- All non-semantic variants → single `NonSemanticVariants` story

**Layout requirement**: Use `flexLayout: 'row-wrap'` for stories displaying multiple variations.

**Pattern for sizes**:

```typescript
/**
 * Component-names come in [X] sizes to fit various contexts:
 *
 * - **Small (`s`)**: Used for inline indicators or space-constrained areas
 * - **Medium (`m`)**: Default size, used for typical use cases
 * - **Large (`l`)**: Used for prominent displays or primary content areas
 * - **Extra-large (`xl`)**: Maximum visibility (if applicable)
 *
 * All sizes shown below for comparison.
 */
export const Sizes: Story = {
  render: (args) => html`
    ${template({ ...args, size: 's', label: 'Small' })}
    ${template({ ...args, size: 'm', label: 'Medium' })}
    ${template({ ...args, size: 'l', label: 'Large' })}
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};
```

**Pattern for semantic variants**:

```typescript
/**
 * Semantic variants provide meaning through color:
 *
 * - **`accent`**: New, beta, prototype, draft
 * - **`informative`**: Active, in use, live, published
 * - **`neutral`**: Archived, deleted, paused, draft, not started, ended
 * - **`positive`**: Approved, complete, success, new, purchased, licensed
 * - **`notice`**: Needs approval, pending, scheduled
 * - **`negative`**: Error, alert, rejected, failed
 *
 * All semantic variants shown below for comparison.
 */
export const SemanticVariants: Story = {
  render: (args) => html`
    ${template({ ...args, variant: 'positive', label: 'Positive' })}
    ${template({ ...args, variant: 'informative', label: 'Informative' })}
    ${template({ ...args, variant: 'negative', label: 'Negative' })}
    ${template({ ...args, variant: 'neutral', label: 'Neutral' })}
    ${template({ ...args, variant: 'notice', label: 'Notice' })}
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};
```

**Pattern for static color**: sourced from Spectrum's static color usage guidance (e.g. [Button](https://spectrum.adobe.com/page/button/#Static-color)). The component's color pins to the chosen value regardless of the active theme, and the choice of value depends on the background it sits over.

```mdx
Use `static-color` when the component-name needs to sit on top of a photo or colored background. It pins the component-name's color to the chosen value regardless of the active color theme:

- **`white`**: use on dark color or image backgrounds
- **`black`**: use on light color or image backgrounds
```

```typescript
export const StaticColors: Story = {
  render: (args) => html`
    ${['white', 'black'].map(
      (color) => html`
        ${template({ ...args, 'static-color': color })}
      `
    )}
  `,
  args: {
    label: 'Loading',
  },
  tags: ['options', '!test'],
  parameters: {
    flexLayout: false,
    staticColorsDemo: true,
  },
};
```

### States

**Purpose**: Document all possible states the component can be in.

**Order**: Default → Selected → Active → Disabled → Readonly → Error → Loading/Pending/Indeterminate → Other states

**Consolidation rule**: Combine all states into a **single States story** when possible (or minimal stories when states are complex).

**Pattern**:

```typescript
/**
 * Components can exist in various states:
 *
 * - **Default**: Normal, interactive state
 * - **Selected**: Item has been chosen or activated
 * - **Disabled**: Functionality exists but is not available
 * - **Error**: Validation failure or error condition
 *
 * All states shown below for comparison.
 */
export const States: Story = {
  render: (args) => html`
    ${template({ ...args, label: 'Default' })}
    ${template({ ...args, selected: true, label: 'Selected' })}
    ${template({ ...args, disabled: true, label: 'Disabled' })}
    ${template({ ...args, invalid: true, label: 'Error' })}
  `,
  tags: ['states'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};
```

**Pattern for complex states** (when animation or interaction is critical):

```typescript
/**
 * The indeterminate state shows an animated loading indicator when progress is unknown or cannot be determined.
 * The animation automatically loops until the state changes.
 */
export const Indeterminate: Story = {
  tags: ['states'],
  args: {
    indeterminate: true,
    label: 'Loading...',
  },
};
```

**Disabled state template**:

```typescript
/**
 * A component in a disabled state shows that [functionality] exists, but is not available in that circumstance.
 * This can be used to maintain layout continuity and communicate that [functionality] may become available later.
 *
 * **ARIA support**: When disabled, the component automatically sets `aria-disabled="true"`.
 */
```

### Behaviors

**Purpose**: Document methods, events, and automatic behaviors.

**Focus management belongs here only when it's a side effect of a lifecycle or state transition**, independent of which input method triggered it: for example, a dialog trapping focus when it opens and restoring it when it closes, or a listbox auto-focusing its first result when it opens. Focus movement that **is** the keyboard interaction model itself (roving tabindex, arrow keys moving focus between items) belongs in `## Accessibility` under keyboard navigation instead: it isn't separable from "how do you operate this with a keyboard," which is already that section's job.

**Pattern for automatic behaviors**:

```typescript
/**
 * ### Text handling
 *
 * Long text content automatically wraps to multiple lines to fit the available space.
 * When space is constrained, text truncates with an ellipsis (...).
 *
 * ### Focus management
 *
 * When opened, focus is automatically trapped within the component.
 * When closed, focus returns to the triggering element.
 */
export const TextWrapping: Story = {
  render: (args) => html`
    ${template({ 'default-slot': 'Short text' })}
    ${template({
      'default-slot':
        'This is a much longer text that will wrap to multiple lines when the container becomes too narrow to fit it all on one line',
    })}
  `,
  tags: ['behaviors'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};
```

**Pattern for methods**:

````typescript
/**
 * ### Methods
 *
 * The component exposes the following public methods:
 *
 * - **open()**: Opens the component programmatically
 * - **close()**: Closes the component programmatically
 * - **toggle()**: Toggles between open and closed states
 * - **reset()**: Resets the component to its initial state
 *
 * Example usage:
 *
 * ```javascript
 * const component = document.querySelector('swc-component-name');
 * component.open();
 * ```
 */
export const Methods: Story = {
  tags: ['behaviors'],
  // ... implementation
};
````

**Pattern for events**:

````typescript
/**
 * ### Events
 *
 * The component dispatches the following custom events:
 *
 * - **change**: Fired when the value changes (bubbles: true, composed: true)
 * - **input**: Fired during user input (bubbles: true, composed: true)
 * - **swc-opened**: Fired when the component opens (bubbles: true, composed: true)
 * - **swc-closed**: Fired when the component closes (bubbles: true, composed: true)
 *
 * Example event listener:
 *
 * ```javascript
 * component.addEventListener('change', (event) => {
 *     console.log('Value changed:', event.target.value);
 * });
 * ```
 */
export const Events: Story = {
  tags: ['behaviors'],
  // ... implementation
};
````

### Accessibility

**Purpose**: Document built-in accessibility features and provide best practices guidance.

**Required structure**: Two subsections - Features and Best practices.

**Pattern**:

```typescript
/**
 * ### Features
 *
 * The `<swc-component-name>` element implements several accessibility features:
 *
 * #### Keyboard navigation
 *
 * - <kbd>Tab</kbd>: Moves focus to/from the component
 * - <kbd>Space</kbd> or <kbd>Enter</kbd>: Activates the component
 * - <kbd>Arrow keys</kbd>: Navigate between items
 * - <kbd>Escape</kbd>: Closes the component (if applicable)
 *
 * #### ARIA implementation
 *
 * 1. **ARIA role**: Automatically sets `role="progressbar"` (or appropriate role)
 * 2. **Labeling**: Uses the `label` attribute as `aria-label`
 * 3. **States**:
 *     - Sets `aria-valuenow` with current progress value
 *     - Sets `aria-disabled="true"` when disabled
 * 4. **Status communication**: Screen readers announce value changes
 *
 * #### Visual accessibility
 *
 * - Progress is shown visually through multiple cues, not relying solely on color
 * - High contrast mode is supported with appropriate color overrides
 * - Static color variants ensure sufficient contrast on different backgrounds
 *
 * ### Best practices
 *
 * - Always provide a descriptive `label` that explains what the component represents
 * - Use meaningful, specific labels (e.g., "Uploading document" instead of "Loading")
 * - Ensure sufficient color contrast between the component and its background
 * - Use semantic variants when status has specific meaning
 * - Test with screen readers to verify announcements are clear
 */
export const Accessibility: Story = {
  tags: ['a11y'],
  args: {
    // ... accessible example
  },
};
```

**Common accessibility features to document:**

- **Keyboard navigation**: Document all keyboard interactions
- **ARIA role**: Document automatic role assignment
- **ARIA labels**: Document labeling mechanism (aria-label, aria-labelledby)
- **ARIA states**: Document state attributes (aria-disabled, aria-valuenow, etc.)
- **Color meaning**: For components using color to convey information
- **High contrast mode**: If supported via forced-colors media query

**Accessibility requirements for all stories:**

All stories must demonstrate accessible usage:

- Include required labels (`label`, `aria-label`, or slot content)
- Use meaningful, realistic content (no placeholder text)
- Show proper ARIA usage when applicable
- Never demonstrate inaccessible patterns

## 1st-gen to 2nd-gen comparison

When creating 2nd-gen documentation, check 1st-gen (`1st-gen/packages/*/README.md`) for content to preserve or differences to highlight.

### Where to document differences

Document 1st-gen vs 2nd-gen differences as inline notes in the relevant per-unit MDX section, immediately under the section heading and above the `<Canvas>` reference. Keep notes concise — link to the consumer migration guide for full upgrade instructions.

**Pattern for new options or variants**:

```mdx
### Sizes

Component-names come in [X] sizes...

> **Note**: the `xl` size is new in 2nd-gen and not available in 1st-gen.

<Canvas of={Stories.Sizes} />
```

**Pattern for removed features**:

```mdx
### Methods

The component exposes the following public methods...

> **Migration note**: the `validate()` method from 1st-gen has been removed in 2nd-gen. Use the `invalid` property instead. See the [consumer migration guide](?path=/docs/components-<name>-migration-guide--docs) for full upgrade steps.

<Canvas of={Stories.Methods} />
```

### Content to check from 1st-gen

Compare 2nd-gen against 1st-gen for:

1. **Size options**: Verify all sizes (especially `xl`) are documented
2. **Variant lists**: Ensure all variants are listed (check for `accent`, etc.)
3. **States**: Check for disabled, loading, or other states
4. **Behavioral details**: Text wrapping, truncation, tooltip integration
5. **Keyboard interactions**: If documented in 1st-gen
6. **Methods and events**: Check for API changes
7. **Advanced examples**: Tooltips, containers, complex layouts
8. **Specific guidance**: Color contrast guidance for static-color variants

### Common differences to highlight

**New in 2nd-gen:**

- Additional sizes (e.g., `xl`)
- Additional variants (e.g., `accent`)
- New properties (e.g., `subtle`, `outline`)
- Improved ARIA implementation
- Better high contrast support

**Changed in 2nd-gen:**

- Property names (e.g., `emphasized` → `outline`)
- Slot names or structure
- Event names or payloads
- Default values

**Removed from 2nd-gen:**

- Deprecated properties
- Removed methods
- Unsupported variants

### Using CEM for comparison

Use the Custom Elements Manifest (CEM) to verify differences:

1. **Check 1st-gen CEM**: `1st-gen/packages/component-name/custom-elements.json`
2. **Check 2nd-gen types**: `2nd-gen/packages/core/components/component-name/*.types.ts`
3. **Compare**:
   - Properties and their types
   - Slots and their descriptions
   - Methods and their signatures
   - Events and their details

**Example verification**:

```bash
# Check 1st-gen properties
grep -A 5 '"name": "size"' 1st-gen/packages/badge/custom-elements.json

# Check 2nd-gen types
grep "VALID_SIZES" 2nd-gen/packages/core/components/badge/Badge.types.ts
```

### Common gaps to check

- [ ] Missing installation instructions
- [ ] Missing size options (xl is common)
- [ ] Missing semantic variants (accent is common)
- [ ] Undocumented disabled state
- [ ] Missing readonly state documentation
- [ ] Missing ARIA disabled documentation
- [ ] Lack of tooltip integration examples
- [ ] Missing icon-only accessibility guidance
- [ ] No keyboard navigation documentation
- [ ] Missing static-color contrast guidance
- [ ] No text truncation/wrapping behavior explanation
- [ ] Missing methods documentation
- [ ] Missing events documentation

## Verification and accuracy

**Critical**: Always verify documentation against the actual component implementation to prevent hallucinations and inaccuracies.

### Verification process

After creating or updating documentation:

1. **Read the component source files:**
   - Base class implementation (`2nd-gen/packages/core/components/*/Component.base.ts`)
   - Component-specific implementation (`2nd-gen/packages/swc/components/*/Component.ts`)
   - TypeScript type definitions (`2nd-gen/packages/core/components/*/Component.types.ts`)
   - CSS stylesheets (`2nd-gen/packages/swc/components/*/component.css`)

2. **Verify slots:**
   - Check JSDoc comments in component class (`@slot` decorators)
   - Verify slot names in the render method
   - Confirm which slots are required vs. optional

3. **Verify properties:**
   - Check `@property` decorators in component and base classes
   - Verify property types, defaults, and reflect values
   - Confirm valid values (enums, arrays defined in types file)
   - Check if properties exist in both base and subclass

4. **Verify ARIA implementation:**
   - Search for `aria-*` attributes in component code
   - Check for `role` assignments
   - Verify attribute behavior (when added/removed)
   - **Don't claim attributes that aren't implemented**

5. **Verify behavior:**
   - Check for methods in component class (public methods only)
   - Look for event dispatching (`dispatchEvent`, custom events)
   - Verify automatic behaviors in lifecycle methods

6. **Verify constraints:**
   - Look for validation logic (e.g., outline only with semantic variants)
   - Check for console warnings about invalid combinations
   - Verify size/variant/option restrictions

### Common hallucination patterns to avoid

❌ **Claiming attributes that don't exist:**

```typescript
// WRONG: Claiming a `label` attribute when component only has a slot
- Provide label via the `label` attribute
```

✅ **Verify what actually exists:**

```typescript
// CORRECT: Check component source for actual API
- Provide label via the default slot or `aria-label` attribute
```

❌ **Assuming ARIA attributes are set:**

```typescript
// WRONG: Claiming aria-valuemin/aria-valuemax without checking
- Includes `aria-valuemin="0"` and `aria-valuemax="100"`
```

✅ **Verify ARIA implementation in code:**

```typescript
// CORRECT: Only document what the component actually sets
- Sets `aria-valuenow` with the current progress value
```

❌ **Claiming methods that don't exist:**

```typescript
// WRONG: Assuming common methods exist
- **reset()**: Resets the component to initial state
```

✅ **Check component class for public methods:**

```typescript
// CORRECT: Only document methods defined in the class
// (If no public methods exist, state this clearly)
```

### Verification tools

Use these commands to verify claims:

```bash
# Search for properties
grep -n "@property" 2nd-gen/packages/swc/components/component-name/Component.ts

# Search for slots
grep -n "@slot" 2nd-gen/packages/core/components/component-name/Component.base.ts

# Search for ARIA attributes
grep -n "aria-" 2nd-gen/packages/swc/components/component-name/Component.ts

# Search for events
grep -n "dispatchEvent\|new CustomEvent" 2nd-gen/packages/swc/components/component-name/Component.ts

# Compare with 1st-gen
diff <(grep "@property" 1st-gen/packages/component-name/*.ts) \
     <(grep "@property" 2nd-gen/packages/swc/components/component-name/*.ts)
```

### Documentation after verification

After verifying accuracy:

1. Document what was checked in commit message or PR
2. Note any inaccuracies found and fixed
3. Include code references for major claims (in the per-unit MDX where helpful)
4. Consider creating a verification checklist for complex components

## General guidelines

### Documentation style

- **Use sentence case** for all headings and descriptions
- **Be specific** - Instead of "Loading", use "Uploading document" or "Processing request"
- **Show, don't just tell** - Include visual examples for every concept
- **Consolidate variations** - Combine related options into single stories for easier comparison
- **Think multi-audience** - Balance designer needs (visual) with developer needs (technical)

### Component linking

When referencing other components — whether in the meta-level JSDoc, the meta `parameters.docs.subtitle`, or anywhere in the per-unit MDX:

- **Use Storybook paths**: Link to the component's docs page using relative paths
- **Format**: `[ComponentName](../?path=/docs/components-component-name--docs)` (or `--readme` if that's the convention in your area)
- **Component name format**: Use kebab-case in the path (e.g., `action-button`, `progress-circle`)
- **Subtitle exception**: `parameters.docs.subtitle` is plain text and cannot include links.

**Examples (meta-level JSDoc)**:

```typescript
/**
 * A `<swc-badge>` is a non-interactive visual label. For interactive labels,
 * see [Action Button](../?path=/docs/components-action-button--docs).
 */

/**
 * Progress circles are commonly used with [Button](../?path=/docs/components-button--docs)
 * and [Card](../?path=/docs/components-card--docs) components to show loading states.
 */
```

**Examples (in MDX prose)**:

```mdx
For interactive labels, see [Action Button](../?path=/docs/components-action-button--docs).
```

### Code examples

- **Use realistic content** - Avoid placeholder text, use meaningful labels
- **Always be accessible** - Include required labels, ARIA attributes
- **Show complete patterns** - Don't abbreviate important details
- **Use consistent formatting** - Follow project style guidelines

### Story organization

- **Use flexLayout** for multi-item comparisons
- **Tag appropriately** — use correct tags for each section
- **Order sections in MDX** — section ordering is hand-authored in the per-unit MDX, not via a story parameter
- **Author prose in MDX** — for each tagged story, add a `### Title` heading and prose to the per-unit MDX above the corresponding `<Canvas of={Stories.MyStory} />`. Do not add JSDoc above story exports.

### No filler closing sentences

Do not end MDX prose blocks with sentences that restate what the reader can already see rendered in the Canvas below, such as:

- "All sizes shown below for comparison."
- "Both variants shown below for comparison."
- "Label-only and icon-with-label wrapping shown below for comparison."

These add no information. End the prose when the substantive content ends.

### MDX heading levels

All headings inside MDX section prose must start at level 3 (`###`) or deeper:

- **Level 2 (`##`)**: Reserved for top-level sections (`## Anatomy`, `## Options`, etc.) — author these as the section roots in MDX
- **Level 3 (`###`)**: Per-story title in sections with `hideTitle=false` (Options, States, Behaviors, Full pattern)
- **Level 4 (`####`)**: Sub-sections inside per-story prose (e.g., "Slots", "ARIA implementation", "Keyboard navigation")

This preserves the hierarchy expected by the docs page layout (the unit title is `h1`, section headings are `h2`, story titles are `h3`).

## Checklist

When creating or updating documentation:

### Stories file (`<unit>.stories.ts`)

- [ ] Overview story with common use case (tag: `'overview'`)
- [ ] Meta-level JSDoc above `const meta` (explains unit purpose, links to related units)
- [ ] `parameters.docs.subtitle` is concise and non-repetitive (plain text, no links)
- [ ] Helpers section for shared label mappings and utilities (if applicable)
- [ ] Proper story tags for all sections (`anatomy`, `options`, `states`, `behaviors`, `a11y`, `upcoming` as applicable; `controller` on meta for controllers)
- [ ] Playground uses `tags: ['dev']` (not `['autodocs', 'dev']`) when a per-unit MDX exists
- [ ] No story-level JSDoc comments above any `export const`
- [ ] No `section-order` parameter; no `description-only` tag

### Per-unit MDX (`<unit>.mdx`)

- [ ] File exists at the unit root with the correct relative import path for `DocsHeader` / `DocsFooter`
- [ ] `<Meta of={Stories} />` declared exactly once
- [ ] `<DocsHeader />` at the top, `<DocsFooter />` at the bottom
- [ ] Sections appear in the canonical order (Anatomy → Usage → Options → States → Behaviors → Accessibility → Full pattern → Upcoming features → API → Appendix → Feedback) — skip sections that do not apply
- [ ] Every section-tagged story is referenced via `<Canvas of={Stories.StoryName} />`
- [ ] Per-story `### Title` headings match Storybook's rendered story names (PascalCase → Title Case, or explicit `storyName`)
- [ ] No `<Canvas>` references to untagged stories
- [ ] Controllers: hand-authored `## API` section ahead of `<DocsFooter />`; `meta.tags` contains `'controller'` so `<ApiTable />` is omitted
- [ ] Anatomy: parts listed as a flat, unordered list with no `###`/`####` subsections (components and patterns)
- [ ] Slot names called out inline in the Anatomy list only where needed for composition clarity (not a separate slot inventory)
- [ ] All configuration options documented
- [ ] All states documented
- [ ] Methods documented (if applicable)
- [ ] Events documented (if applicable)
- [ ] Automatic behaviors explained
- [ ] Comprehensive accessibility section with features and best practices
- [ ] All examples use accessible, meaningful content

### Cross-checks

- [ ] **Checked 1st-gen README.md for missing content or differences**
- [ ] **Documented 1st-gen differences where apparent (new/changed/removed features)**
- [ ] **Verified against component implementation** (no hallucinations)
- [ ] All slots verified in component source
- [ ] All properties verified with `@property` decorators
- [ ] ARIA attributes verified in component code
- [ ] Methods and events verified in implementation
- [ ] Docs page renders cleanly in Storybook with no console errors and all sections in the canonical order
