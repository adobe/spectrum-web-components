---
name: migration-documentation
description: Phase 7 of 1st-gen to 2nd-gen component migration. Use to write JSDoc, Storybook stories, and usage docs so the component is usable and understandable by others.
---

# Migration documentation ([Phase 7](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 7](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is JSDoc on the public API, Storybook stories covering the main use cases, and migration notes where the API diverges from 1st-gen.

See also: [`documentation`](../documentation/SKILL.md) for Adobe content writing standards to follow when writing usage docs and migration notes.

## When to use this skill

- Phase 6 (migration-testing) is complete
- The user asks to "document [component]" or "add stories for [component]"
- The user asks to write JSDoc, add Storybook stories, or document migration notes
- The user refers to "Phase 7" of the 2nd-gen component migration workstream

## When NOT to use

- Phase 6 is not complete — tests should pass before documentation is finalized
- You are updating docs for an existing component unrelated to migration

## How to invoke

- "Document [component]"
- "Add stories for [component]"
- "Phase 7 for [component] migration"

---

## Workflow

### 1. JSDoc

Add JSDoc to every public prop, slot, event, and the element class itself. Use these tags consistently:

| Tag                   | Use for                                          |
| --------------------- | ------------------------------------------------ |
| `@element swc-<name>` | The class declaration                            |
| `@slot`               | Each named and default slot                      |
| `@fires`              | Each custom event                                |
| `@prop` / `@attr`     | Public properties and their reflected attributes |
| `@example`            | At least one usage example per element           |
| `@internal`           | Non-public API (hides from generated docs)       |

### 2. Storybook stories

Use `getStorybookHelpers` to generate controls from the Custom Elements Manifest, then build stories for variants, sizes, and key behaviors.

```typescript
const { args, argTypes, template } = getStorybookHelpers('swc-<component>');

export const meta: Meta = {
  title: '<Component>',
  component: 'swc-<component>',
  args,
  argTypes,
  render: (args) => template(args),
  tags: ['migrated'],
};

// Use the component's own static arrays as the source of truth for options
export const Variants: Story = {
  render: () => html`
    ${Component.VARIANTS.map((variant) => template({ variant }))}
  `,
  tags: ['options'],
};
```

Reference implementations:

- [`badge/stories/badge.stories.ts`](../../../2nd-gen/packages/swc/components/badge/stories/badge.stories.ts)
- [`divider/stories/divider.stories.ts`](../../../2nd-gen/packages/swc/components/divider/stories/divider.stories.ts)

See [Step 7](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/07_add-stories-for-2nd-gen-component.md) for full structure and story organization examples.

### 3. Size and variant controls

Controls in Storybook only apply attributes listed in the Custom Elements Manifest (CEM). If a property comes from a mixin on the base class (e.g. `size` from `SizedMixin`), the CEM may not list it for the SWC element.

**Fix:** Declare the property explicitly on the SWC class with `@property({ reflect: true })`, then regenerate the manifest:

```sh
yarn analyze
```

Verify that the control changes the component in the Storybook canvas after regenerating.

### 4. Review, usage docs, and migration notes

- Confirm all stories render correctly and controls work
- Add usage documentation (when to use, when not to use, accessible usage notes)
- If the API is not a direct port from 1st-gen, document what changed and how to migrate

---

## Checklist

- [ ] Every public prop, slot, and event has JSDoc
- [ ] The element class has `@element`, at least one `@example`, and a description
- [ ] Storybook shows the main use cases (defaults, variants, sizes, key behaviors)
- [ ] Size/variant controls change the component in the canvas; if from a mixin, the SWC class declares the property and CEM was regenerated with `yarn analyze`
- [ ] Migration notes exist where the API is not a direct port from 1st-gen

---

## Common problems

| Problem                                              | Solution                                                                                                                                               |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Too many story variants                              | Use `Component.VARIANTS` or `VALID_SIZES` arrays (from core types) to iterate — one story can cover all variants.                                      |
| Missing examples                                     | Add at least one `@example` in JSDoc and one default Storybook story.                                                                                  |
| Size or variant control doesn't change the component | The attribute is missing from the CEM. Declare the property on the SWC class with `@property({ reflect: true })` and run `yarn analyze` to regenerate. |

---

## Quality gate

Phase 7 is complete when:

> JSDoc is complete for the public API; Storybook stories and usage docs are in place; migration notes are added where the API differs from 1st-gen.
