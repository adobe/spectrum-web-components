# Labs - AI guidance for prototyping Spectrum components

You are helping a designer prototype a new atomic-level component or feature for the
Spectrum Design System (2nd generation). The designer may not be deeply technical,
so keep explanations clear and offer to generate code when asked.

## What is this space?

`labs/` is a sandbox alongside `components/` where designers and non-engineers can
rapidly prototype ideas using AI assistance. Labs prototypes:

- Appear in the 2nd-gen Storybook under the **Labs** section
- Use the same tokens, base classes, and patterns as production components
- Are NOT shipped to consumers — they are for exploration and validation only

## Project structure

Each lab prototype lives in its own folder:

```
labs/
  my-idea/
    MyIdea.ts          # Lit web component
    my-idea.css        # Styles using token() function
    index.ts           # Registration + export
    stories/
      my-idea.stories.ts  # Storybook story
```

Use kebab-case for folder and file names. The component class uses PascalCase.

## How to write a component

Components are Lit-based web components. Here is the minimal pattern:

```typescript
import { CSSResultArray, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { SpectrumElement } from '@spectrum-web-components/core/element';
import styles from './my-idea.css';

export class MyIdea extends SpectrumElement {
  // Declare observed attributes/properties
  @property({ type: String, reflect: true })
  public variant: string = 'default';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-MyIdea">
        <slot></slot>
      </div>
    `;
  }
}
```

### Registration (`index.ts`)

```typescript
import { MyIdea } from './MyIdea.js';

customElements.define('swc-my-idea', MyIdea);

export { MyIdea };
```

## How to use design tokens

**Never use raw color values, pixel sizes, or font stacks.** Always use the `token()` function
in CSS. The build tooling resolves `token()` calls to the correct CSS custom properties.

### Token syntax

```css
.swc-MyIdea {
  /* Sizing */
  min-block-size: token('component-height-200');
  padding-inline: token('component-edge-to-text-100');
  padding-block: token('component-top-to-text-100')
    token('component-bottom-to-text-100');
  gap: token('text-to-visual-100');

  /* Typography */
  font-family: token('sans-serif-font');
  font-size: token('font-size-100');
  font-weight: token('medium-font-weight');
  line-height: token('line-height-100');

  /* Colors — use semantic names */
  color: token('gray-900');
  background: token('accent-background-color-default');
  border-color: token('informative-visual-color');

  /* Corners & borders */
  border-radius: token('corner-radius-medium-size-medium');
  border-width: token('border-width-200');
}
```

### Common token categories

| Category                | Examples                                                                          | Usage                                |
| ----------------------- | --------------------------------------------------------------------------------- | ------------------------------------ |
| **Component sizing**    | `component-height-75` through `component-height-300`                              | Min heights for interactive elements |
| **Spacing**             | `component-edge-to-text-*`, `text-to-visual-*`, `component-top-to-text-*`         | Internal padding and gaps            |
| **Typography**          | `font-size-75` to `font-size-300`, `line-height-*`, `*-font-weight`               | Text styling                         |
| **Semantic colors**     | `accent-*`, `informative-*`, `positive-*`, `negative-*`, `notice-*`, `neutral-*`  | Status/meaning colors                |
| **Non-semantic colors** | `fuchsia-*`, `indigo-*`, `seafoam-*`, `purple-*`, etc.                            | Category/decorative colors           |
| **Surface colors**      | `background-layer-*-color`, `gray-*`                                              | Backgrounds and text                 |
| **Corner radius**       | `corner-radius-medium-size-small` through `corner-radius-medium-size-extra-large` | Border radius                        |
| **Icon sizing**         | `workflow-icon-size-75` to `workflow-icon-size-300`                               | Icon dimensions                      |

### Token naming conventions

- Sizes follow a T-shirt scale: `75` (XS), `100` (S/base), `200` (M), `300` (L)
- Background colors end with `-default`, `-hover`, `-down`, `-focus`
- Subtle variants: `accent-subtle-background-color-default`
- Visual (border) colors: `accent-visual-color`, `negative-visual-color`

### Verifying tokens before using them

**Not all size suffixes exist for every token category.** For example, `line-height` only
has `100` and `200` — there is no `line-height-75`. Figma designs may reference values
(like `--line-height/75`) that don't map to an actual token.

**Always verify a token exists** before using it. The source of truth is:

```
2nd-gen/packages/swc/stylesheets/tokens.css
```

Search for the token name with the `--swc-` prefix:

```bash
grep "swc-line-height" 2nd-gen/packages/swc/stylesheets/tokens.css
```

If the token doesn't exist, pick the closest available one. When in doubt, use the
`100` variant — it's the base/default for most categories.

## How to write styles

### Use `:host` for the outer element

```css
:host {
  display: inline-flex;
  /* Component-level defaults */
}
```

### Use size attributes on `:host`

```css
:host([size='s']) {
  --my-idea-height: token('component-height-75');
}
:host([size='m']) {
  --my-idea-height: token('component-height-100');
}
:host([size='l']) {
  --my-idea-height: token('component-height-200');
}
```

### BEM-like class naming

```css
.swc-MyIdea {
} /* Block */
.swc-MyIdea-label {
} /* Element */
.swc-MyIdea-icon {
} /* Element */
.swc-MyIdea--subtle {
} /* Modifier */
```

### Variant colors via classes or host attributes

```css
/* Semantic variants — use :host attribute selectors */
:host([variant='positive']) {
  --my-idea-bg: token('positive-background-color-default');
}

/* Non-semantic variants — use CSS classes */
.swc-MyIdea--fuchsia {
  --my-idea-bg: token('fuchsia-background-color-default');
}
```

## How to write a Storybook story

Stories make your prototype visible in the Storybook sidebar under **Labs**.

```typescript
import { html } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

// Import your component (triggers registration)
import '../index.js';

const meta: Meta = {
  title: 'My idea',
  component: 'swc-my-idea',
  render: (args) => html`
    <swc-my-idea variant=${args.variant || 'default'}>
      ${args['default-slot'] || 'Hello world'}
    </swc-my-idea>
  `,
  parameters: {
    docs: {
      subtitle: 'A brief description of what this prototype explores.',
    },
  },
};

export default meta;

export const Playground: Story = {
  args: {
    variant: 'default',
    'default-slot': 'Hello world',
  },
  tags: ['autodocs', 'dev'],
};

export const Variants: Story = {
  render: (args) => html`
    <swc-my-idea variant="default">Default</swc-my-idea>
    <swc-my-idea variant="accent">Accent</swc-my-idea>
  `,
  tags: ['options'],
};
```

## Spectrum design principles to follow

1. **Clarity** — Components should be immediately understandable. Minimize decoration.
2. **Consistency** — Reuse existing tokens and patterns. Don't invent new spacing or color values.
3. **Accessibility** — Every component must be usable by everyone:
   - Provide text alternatives (`aria-label`, visible labels)
   - Ensure keyboard operability if interactive
   - Use semantic colors (not just decorative) for status meaning
   - Maintain sufficient contrast (tokens handle this automatically)
4. **Responsiveness** — Use logical properties (`inline-size`, `block-size`, `padding-inline`)
   instead of physical (`width`, `height`, `padding-left`).
5. **Theming** — Never hardcode colors. Tokens adapt to light/dark themes automatically.

## Spectrum color usage rules

- **Semantic colors** (`positive`, `negative`, `notice`, `informative`, `neutral`, `accent`)
  carry meaning. Use them when the color itself communicates status.
- **Non-semantic colors** (`fuchsia`, `indigo`, `seafoam`, etc.) are for categorization
  without inherent meaning (e.g., tagging departments or projects).
- **Static colors** (`white`, `black`) are for overlays on images or colored backgrounds.
- **Gray scale** (`gray-50` through `gray-1000`) for text, borders, and surfaces.
- Text on bold backgrounds uses `token("white")` or `token("black")`.
- Text on subtle backgrounds uses `token("gray-1000")`.

## What NOT to do

- Do not use raw hex/rgb colors — always use tokens
- Do not use `px` for sizing — use tokens or relative units
- Do not use physical CSS properties — prefer logical ones
- Do not skip accessibility — every prototype needs labels
- Do not import from `1st-gen` packages — labs is 2nd-gen only
- Do not add your lab to the `components/` directory — keep it in `labs/`

## How to use icons

Use `<swc-icon>` to display icons. Import it and any icon templates from `@adobe/spectrum-wc/icon`:

```typescript
import '@adobe/spectrum-wc/icon';
import { Checkmark100Icon } from '@adobe/spectrum-wc/icon';

// Icon templates are functions — call them inside <swc-icon>
html`
  <swc-icon label="Done">${Checkmark100Icon()}</swc-icon>
`;
```

- Set `label` for meaningful icons. Omit it for decorative ones (auto `aria-hidden`).
- Set `size` (`xs`, `s`, `m`, `l`, `xl`) to control dimensions via tokens.
- Icons inherit `color` from their parent via `currentColor`.
- You can slot any raw SVG instead of using a template.

Available templates: `AlertIcon`, `Arrow100Icon`, `Asterisk100Icon`,
`Checkmark[75|100|200|300]Icon`, `Chevron[50|75|100|200]Icon`,
`Cross[75|100|200|300]Icon`, `Dash[75|100|200|300]Icon`, `CornerTriangle300Icon`.
Pick the size suffix closest to your component's icon token size.

## Available base classes and utilities

From `@spectrum-web-components/core`:

- `SpectrumElement` — base class for all components (extends LitElement with Spectrum mixins)
- `SizedMixin` — adds `size` property (xs, s, m, l, xl)
- `ObserveSlotPresence` — reacts to slot content changes
- `ObserveSlotText` — reads text content from slots

## Using Figma designs as input

This project has the Figma MCP server configured (see `.mcp.json` at the repo root).
Once authenticated, you can paste Figma links directly into your prompt and Claude will
read the design — layout, colors, typography, spacing — and map them to Spectrum tokens.

### First-time authentication

Each designer needs to authenticate once:

1. Open Claude Code in this project
2. Run `/mcp`
3. Select **figma** and choose **Authenticate**
4. A browser window opens — click **Allow Access** to authorize with your Figma account
5. You'll see "Authentication successful. Connected to figma"

### Comparing designs with screenshots

This project has the Playwright MCP server configured (see `.mcp.json` at the repo root).
After building a component, you can use Playwright to visually verify it against the
Figma design. This is an iterative loop — generate, screenshot, compare, refine.

#### How to compare

1. **Get the Figma screenshot** — use the Figma MCP `get_screenshot` tool on the design node
2. **Build the component** — generate the files, register the element, create a story
3. **Screenshot the Storybook result** — Storybook must be running on `localhost:6006`
   (started via `yarn start:labs`). Use Playwright MCP to navigate to the story and
   take a screenshot. If Storybook is not running, skip this step:
   - Navigate to `http://localhost:6006/iframe.html?id=labs-{component-name}--{story-name}&viewMode=story`
   - Use `browser_take_screenshot` to capture the rendered component
4. **Compare visually** — look at both screenshots side by side. Check:
   - Spacing and sizing match the Figma design
   - Colors are correct (tokens mapped properly)
   - Typography (font size, weight, line height) matches
   - Border radius and borders are correct
   - Layout and alignment match
5. **Iterate** — if something doesn't match, adjust the CSS tokens or component
   structure and screenshot again. Repeat until it matches.

#### When to use this

- After building any component from a Figma design
- When the user asks you to verify or compare
- When you're unsure if a token mapping is correct — a visual check is faster than guessing

#### Storybook URL pattern

Stories in labs follow this URL pattern:
```
http://localhost:6006/iframe.html?id=labs-{component-name}--{story-name}&viewMode=story
```
For example:
- `labs-tree-view--playground`
- `labs-chat-bubble--conversation`
- `labs-list-view--file-browser`

### Example workflow

> "Here's my Figma design: https://www.figma.com/design/...
> Create a lab component that matches this frame. Use Spectrum tokens for all values."

Steps:
1. Use `get_screenshot` on the Figma node to see the design
2. Use `get_design_context` to extract layout, colors, typography
3. Build the component and story
4. Navigate Playwright to the Storybook story URL and screenshot it
5. Compare the Storybook screenshot against the Figma screenshot
6. Fix any mismatches and repeat steps 4-5 until they match

## Tips for prompting

When asking AI to generate a component, be specific about:

- **What it looks like** — "a pill-shaped tag with an icon and label"
- **What variants it has** — "semantic colors like badge, plus sizes s/m/l"
- **What it does** — "non-interactive, just displays information" or "clickable, fires a change event"
- **Accessibility needs** — "needs aria-label when icon-only"

Example prompts:

> "Create a lab component called `swc-color-swatch` that shows a small colored square
> with an optional label beneath it. It should support all non-semantic Spectrum colors
> via a `color` attribute. Size it using component-height tokens. Make it non-interactive."

> "Here's my Figma frame: [paste link]. Turn this into a lab component. Match the
> spacing and colors using Spectrum tokens."
