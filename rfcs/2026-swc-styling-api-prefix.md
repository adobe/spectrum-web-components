# Public styling-API prefix for 2nd-generation components

- **Start Date:** 2026-09-01
- **RFC PR:** (fill in with the PR link once opened)
- **Authors:** Casey Eickhoff
- **Status:** Implemented

> **Note:** This is a *back-filled* RFC. The decision it records was already made and shipped during 2nd-generation development; this document captures the rationale retroactively to seed the RFC process with a real, worked example.

## Summary

The public CSS custom-property styling API for 2nd-generation Spectrum Web Components uses the `--swc-*` prefix. The 1st-generation prefixes `--mod-*` and `--spectrum-*` are treated as **1st-generation-only** and are not part of the 2nd-gen public styling contract.

## Motivation

1st-generation components exposed styling hooks through a mix of `--spectrum-*` (Spectrum design tokens) and `--mod-*` (component modification) custom properties. This created two problems for 2nd-gen:

- **No clear ownership boundary.** `--spectrum-*` names are owned by the design-token pipeline, so consumers overriding them were coupling to token internals rather than a stable component API. `--mod-*` was a partial fix but its scope and stability guarantees were never clearly defined.
- **No versioned namespace.** With 1st- and 2nd-gen components coexisting during migration, consumers need an unambiguous signal for which styling hooks are the supported, stable 2nd-gen surface.

A single, owned, versioned prefix (`--swc-*`) gives 2nd-gen a clear public styling contract that is independent of the design-token layer and visibly distinct from the 1st-gen surface.

## Detailed Design

- Every public styling hook on a 2nd-generation component is named `--swc-<component>-<property>` (e.g. `--swc-button-background-color`).
- These are the **only** custom properties consumers are supported in overriding on 2nd-gen components.
- Internally, components may consume `--spectrum-*` design tokens, but those are an implementation detail, not a public override surface.
- `--mod-*` and direct `--spectrum-*` overrides are **not** supported on 2nd-gen components. They remain the 1st-gen convention for as long as 1st-gen components are maintained.

## Design & Figma Alignment

The styling hooks map to the Spectrum 2 design spec's component options and states. Token values consumed internally track the Spectrum 2 token set.

## Token & Styling-API Impact

This RFC *defines* the 2nd-gen styling-API surface. Impact:

- **New:** the `--swc-*` public custom-property namespace.
- **Changed contract:** `--spectrum-*` moves from a de-facto override surface to an internal-only token layer on 2nd-gen components.
- **Deprecated for 2nd-gen:** `--mod-*` (remains valid for 1st-gen).

Consumers migrating from 1st- to 2nd-gen must move overrides from `--mod-*` / `--spectrum-*` to the corresponding `--swc-*` hook. Per-component mapping belongs in each component's migration guide.

## Documentation

- Each 2nd-gen component's MDX page documents its `--swc-*` hooks as the public styling API.
- Per-component migration guides map old overrides to new `--swc-*` hooks.
- The styling-API convention is captured in the contributor CSS/styling guidance.

## Drawbacks

- A third prefix in the ecosystem (`--spectrum-*`, `--mod-*`, `--swc-*`) adds short-term cognitive load during the migration window.
- Consumers with existing `--mod-*`/`--spectrum-*` overrides must migrate them; this is a breaking change for styling.

## Backwards Compatibility Analysis

- **Breaking for styling overrides**: 1st-gen overrides do not carry over to 2nd-gen components.
- Because 1st- and 2nd-gen components use distinct prefixes and coexist, there is no silent collision — a 1st-gen override simply has no effect on a 2nd-gen component, which is discoverable.
- Mitigation: per-component migration guides + (where feasible) lint/codemod support flagging 1st-gen overrides applied to 2nd-gen elements.

## Alternatives

- **Reuse `--mod-*` for 2nd-gen.** Rejected: it carries 1st-gen baggage and undefined stability guarantees, and gives no versioned signal.
- **Expose `--spectrum-*` tokens directly as the public API.** Rejected: couples consumers to token internals and blurs the ownership boundary between the token pipeline and the component API.
- **No public custom-property API; require ::part / shadow styling only.** Rejected: too limited for common theming needs and higher-friction for consumers.

## Related Discussions

- Contributor styling guidance (`--swc-*` public styling API convention).
- Per-component 1st-gen → 2nd-gen migration guides.
