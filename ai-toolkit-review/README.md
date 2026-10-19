# AI Toolkit pattern: onboarding and audit pack

Scope: `gen2/packages/swc/patterns/ai-toolkit/` (13 custom elements, about 10k lines).
Snapshot: branch `caseyisonit/gen2-ai-toolkit-onboarding`, after `yarn install && yarn build` passed.

## Read in this order

| #   | File                                                                   | Use it for                                                                             | Time      |
| --- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------- |
| 1   | [`01-onboarding-guide.md`](./01-onboarding-guide.md)                   | Mental model, diagrams, file anatomy, where to start reading code                      | 20 min    |
| 2   | [`02-api-cheatsheet.md`](./02-api-cheatsheet.md)                       | One table per element: attributes, slots, events, CSS props                            | Reference |
| 3   | [`03-issues-audit.md`](./03-issues-audit.md)                           | 36 prioritized inconsistencies with file:line and fix                                  | 15 min    |
| 4   | [`04-docs-recommendations.md`](./04-docs-recommendations.md)           | Why the docs are hard to follow; task-first restructure where code lives in stories    | 10 min    |
| 5   | [`05-react-spectrum-comparison.md`](./05-react-spectrum-comparison.md) | Element mapping vs. `@react-spectrum/ai`, with an adopt/consider/skip verdict per idea | 10 min    |

**Note on 01 and 02:** they're _onboarding snapshots_ that include signatures (events, `detail` shapes, attributes) to get you up to speed quickly. Don't copy them into the MDX. 04 explains why: the stories' generated source and the CEM API tables are the sources of truth.

## The five-sentence version

1. The AI Toolkit is a set of 13 `swc-*` elements that you compose into a chat UI: thread → turn → message, plus a prompt field outside the thread.
2. Unlike components, pattern elements have no core `*Base` class. Each one extends `SpectrumElement` directly and lives entirely in `swc/patterns/ai-toolkit/<unit>/`.
3. The toolkit renders state but doesn't run the conversation. Your product listens to `swc-*` events, appends turns, and flips `status`/`generating` attributes.
4. Each element owns state differently (controlled, self-updating, or mirrored). That's the main source of confusion, and it isn't documented in one place.
5. The only end-to-end integration example is a 480-line `LitElement` hidden inside `conversation-thread.stories.ts` (`FullPattern`), and its visible code panel is a hand-typed string.

## What React Spectrum teaches us (from 05)

1. **One state rule everywhere** (controlled + uncontrolled + change callback). This is the fix for SWC's three ownership models.
2. **Announce streaming content.** SWC never announces the arrival of an answer. This is the largest gap (audit #32, 🔴).
3. **Model failure.** A `failed` status plus an in-thread alert. SWC has no error state.
4. **Organize docs by task**, with a hero example. Keep SWC's code in generated story panels, not prose.
5. **Skip for now:** the rich token/command input, voice, a separate package, and a collection-driven thread.

## Top five fixes (quick wins, about 1 hour total)

1. Fix the broken overview link in `get-started.mdx` (2 min).
2. Fix the stale `prompt-field` modes in `pattern-overview.mdx:85` (5 min).
3. Fix `upload-artifact` → `upload-attachment` in `16_gen2-shared-resources.md` (2 min).
4. Resolve the self-contradiction in `user-message.mdx` (lines 23 vs 40) (10 min).
5. Show the hero's code: drop `sourceState="none"` in `pattern-overview.mdx:30`, and flag `fullPatternSource` for replacement (audit #36) (5 min).

Why this matters more than usual: the MDX pages, including `pattern-overview.mdx`, compile into the published consumer AI skill (`scripts/generate-agent-skills.mjs` → `gen2/packages/ai/skills/spectrum-wc-skill/references/patterns/`). Doc errors reach product teams' coding agents as well as people reading Storybook.
