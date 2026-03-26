---
name: migration-testing
description: Phase 6 of 1st-gen to 2nd-gen component migration. Use to write unit tests, accessibility tests, and Storybook play functions for a migrated component.
---

# Migration testing ([Phase 6](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 6](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is automated test coverage for behavior and accessibility — unit tests via Vitest, a11y tests via Playwright, and Storybook play functions.

## When to use this skill

- Phase 5 (migration-a11y) is complete
- The user asks to "add tests" or "write tests" for a migrated component
- The user asks to add play functions, a11y specs, or unit tests
- The user refers to "Phase 6" of the 2nd-gen component migration workstream

## When NOT to use

- Phase 5 is not complete — accessibility behavior must be implemented before it can be tested
- You are fixing an existing test failure unrelated to migration

## How to invoke

- "Add tests for [component]"
- "Write tests for [component]"
- "Phase 6 for [component] migration"

---

## File layout

Every component has exactly two test files:

```text
test/
├── <component>.test.ts        # Unit tests + Storybook play functions (Vitest)
└── <component>.a11y.spec.ts   # Accessibility tree snapshots (Playwright)
```

See [badge/test/](../../../2nd-gen/packages/swc/components/badge/test/) for the reference implementation. For a test-first approach to writing these tests, use the [`test-driven-development`](../test-driven-development/SKILL.md) skill.

---

## Workflow

### 1. Unit tests (`<component>.test.ts`)

Tests are Storybook stories with `play()` functions, run via Vitest. Each test story reuses a story from the main stories file and adds assertions.

```typescript
import { meta, Overview, Variants } from '../stories/<component>.stories.js';
import {
  getComponent,
  withWarningSpy,
} from '@adobe/spectrum-wc/utils/test-utils';

export default {
  ...meta,
  title: '<Component>/Tests',
  parameters: { docs: { disable: true } },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<Component>(canvasElement, 'swc-<component>');

    await step('renders expected defaults', async () => {
      expect(el.variant).toBe('...');
      expect(el.size).toBe('m');
    });

    await step('reflects property to attribute', async () => {
      el.variant = 'positive';
      await el.updateComplete;
      expect(el.getAttribute('variant')).toBe('positive');
    });
  },
};
```

**Coverage targets:**

- Default prop values render correctly
- Props reflect to attributes after mutation (`await el.updateComplete`)
- Slots accept and render content
- Key user interactions (click, keyboard) fire expected events
- Invalid prop combinations emit `window.__swc.warn()` — use `withWarningSpy()`

### 2. A11y tests (`<component>.a11y.spec.ts`)

Uses Playwright to snapshot the accessibility tree against Storybook stories.

```typescript
import { gotoStory } from '../../utils/a11y-helpers.js';

test.describe('<Component> - ARIA Snapshots', () => {
  test('default accessibility tree', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-<component>--overview',
      'swc-<component>'
    );
    await expect(root).toMatchAriaSnapshot(`
      - <expected tree here>
    `);
  });
});
```

Write one snapshot per meaningful story (default, key variants, interactive states). Snapshots validate what assistive technology actually announces.

### 3. Storybook play functions

Add `play()` functions to stories for defaults, variants, and keyboard interactions. These serve as both living documentation and test fixtures — the same story runs in both Storybook and Vitest.

---

## Async patterns

| Situation                         | Solution                                                    |
| --------------------------------- | ----------------------------------------------------------- |
| Waiting for a Lit property update | `await el.updateComplete`                                   |
| Waiting for a DOM repaint         | `await nextFrame()`                                         |
| Querying inside shadow DOM        | `el.shadowRoot.querySelector(...)` or the repo's test utils |
| Asserting debug warnings          | `withWarningSpy(async (warnCalls) => { ... })`              |

---

## Checklist

- [ ] `test/<component>.test.ts` exists and stories are under `<Component>/Tests`
- [ ] `test/<component>.a11y.spec.ts` exists and uses `gotoStory` + `toMatchAriaSnapshot`
- [ ] Default props, variants, slots, and key interactions are covered
- [ ] `await el.updateComplete` used after property mutations
- [ ] Unit tests pass (`yarn test`)
- [ ] A11y tests pass (`yarn test:a11y`)
- [ ] No tests unnecessarily skipped
- [ ] Tests follow the [project testing conventions](../../../CONTRIBUTOR-DOCS/02_style-guide/04_testing/README.md)

---

## Common problems

| Problem                             | Solution                                                                                        |
| ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| Async timing issues                 | Use `await el.updateComplete` after property changes; use `await nextFrame()` for DOM repaints. |
| Shadow DOM queries returning `null` | Use `el.shadowRoot.querySelector()` or the test utils provided by the repo.                     |
| A11y rules too strict               | Tune rules in the a11y config if needed — do not disable rules without team agreement.          |

---

## Quality gate

Phase 6 is complete when:

> All new tests pass; no tests are unnecessarily skipped; unit and a11y test files follow the two-file layout and [project testing conventions](../../../CONTRIBUTOR-DOCS/02_style-guide/04_testing/README.md).
