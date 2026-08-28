---
name: token-update
description: Dispatches to the correct design token update workflow (custom tokens only vs @adobe/spectrum-tokens version bump). Use whenever asked to update, bump, or upgrade design tokens, or when told to run a token update.
---

# Token update

## Mindset

You are a dispatcher, not a workflow. The full steps for both paths already live in [2nd-gen/packages/tools/swc-tokens/README.md](../../../2nd-gen/packages/tools/swc-tokens/README.md#updating-tokens) — never re-derive, restate, or summarize those steps here. Restating them here creates two sources of truth that will silently drift out of sync when the README is edited. Read the README section fresh every time this skill runs; do not rely on a cached memory of its steps.

## When to use

Any request shaped like "update the tokens," "bump `@adobe/spectrum-tokens`," "upgrade the token package," "I changed a custom token," or similar. This applies regardless of the current working directory — most requests will come from the repo root, but treat any location the same way.

## Workflow

1. Determine which path applies:
   - **Custom tokens only**: changes are confined to `2nd-gen/packages/tools/swc-tokens/custom/` and there is no `@adobe/spectrum-tokens` version change.
   - **Package version bump**: `@adobe/spectrum-tokens` in `package.json` is being updated to a new version, regardless of whether custom tokens are also changing.
   - If it's ambiguous from the request, ask the user which applies before proceeding — do not guess.
2. Read [2nd-gen/packages/tools/swc-tokens/README.md](../../../2nd-gen/packages/tools/swc-tokens/README.md), starting at the `## Updating tokens` heading, and follow whichever of the two linked sections matches:
   - `## Upon Custom Token Data Update`
   - `## Upgrading @adobe/spectrum-tokens`
3. Execute that section's steps in the order given. For the package version bump path, this is six steps — running `yarn tokens:update` by itself is never sufficient and will silently skip deleted-token curation (`custom/deleted.json`) and broken `token()` reference fixes in migrated CSS.

## Anti-patterns

- Don't assume `yarn tokens:update` alone completes a `@adobe/spectrum-tokens` version bump.
- Don't copy the step lists from the README into a plan or response — link to the section instead, so there is one canonical copy.
