<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Tooltip / Tooltip accessibility migration analysis

<!-- Document title (editable) -->

# Tooltip accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What a tooltip is](#what-a-tooltip-is)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
    - [Related](#related)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-tooltip>`](#recommendations-swc-tooltip)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Form-associated custom properties (labels, `ElementInternals`)](#form-associated-custom-properties-labels-elementinternals)
    - [Live regions, loading, and announcements](#live-regions-loading-and-announcements)
    - [Motion (dedicated recommendations subsection)](#motion-dedicated-recommendations-subsection)
    - [Positioning: CSS anchor and JavaScript fallbacks](#positioning-css-anchor-and-javascript-fallbacks)
    - [Interaction: pointer, keyboard, and touch](#interaction-pointer-keyboard-and-touch)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
    - [Playwright-only or host-only accessibility gates](#playwright-only-or-host-only-accessibility-gates)
    - [Manual and screen reader testing](#manual-and-screen-reader-testing)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This document sets accessibility expectations for 2nd-gen Tooltip (`swc-tooltip`, tag TBD) against **WCAG 2.2 Level AA**.

Placement must not rely on the 1st-gen overlay stack teleporting tooltip DOM. Prefer **[CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)** (`anchor-name`, `position-anchor`, `position-area`, `position-try` / `@position-try`); reserve JavaScript for unsupported browsers or behavior CSS cannot express. See [CSS-Tricks: CSS anchor positioning guide](https://css-tricks.com/css-anchor-positioning-guide/).

Interaction must work beyond hover-only: keyboard users need focus-triggered parity, touch users need an intentional path (paired help toggle, long-press, tap target). Align with [Inclusive Components: Tooltips and toggletips](https://inclusive-components.design/tooltips-toggletips/).

Verified in **1st-gen** code: **`sp-tooltip` does not set `role="tooltip"`** on its host today; only the decorative tip span uses `aria-hidden="true"`. Self-managed tooltips use **`sp-overlay`** `type="hint"` **`triggerInteraction` `hover`**:

```326:344:../../../../1st-gen/packages/tooltip/src/Tooltip.ts
    if (this.selfManaged) {
      this.dependencyManager.add('sp-overlay');
      import('@spectrum-web-components/overlay/sp-overlay.js');
      return html`
        <sp-overlay
          ?open=${this.open && !this.disabled && this.dependencyManager.loaded}
          ?delayed=${this.delayed}
          ?disabled=${this.disabled}
          offset=${this.offset}
          .placement=${this.placement}
          type="hint"
          .tipPadding=${this.tipPadding}
          .triggerInteraction=${'hover'}
          @sp-opened=${this.handleOpenOverlay}
          @sp-closed=${this.handleCloseOverlay}
        >
          ${tooltip}
        </sp-overlay>
      `;
```

So touch-first tooltip activation is not first-class today. **`aria-describedby`** wiring is delegated to **`HoverController`** (see **`sp-overlay`**), which splits logic by DOM root parity—**cross-root** behavior is detailed below.

Shared **popover** **styles** or an anchored **`swc-popover` shell** (see [popover roadmap](../popover/rendering-and-styling-migration-analysis.md)) may still wrap Spectrum chrome—they do **not** replace prescribing **`role="tooltip"`** + association + interaction on the tooltip primitive.

### Also read

[Tooltip migration roadmap](./rendering-and-styling-migration-analysis.md) for Spectrum 2 styling and DOM.

[Popover accessibility migration analysis](../popover/accessibility-migration-analysis.md): `swc-popover` is chrome + anchored geometry Tooltip may share; Tooltip still exposes **`role="tooltip"`**, **associations**, **delays**, **touch**/**keyboard**, **Escape**, and dismissal.

### What a tooltip is

- Short supplementary explanation for a **focusable trigger** ([APG Tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)). While shown, **`aria-describedby`** binds description to trigger; toggletips add **`aria-expanded`** / **`aria-controls`** patterns per [Inclusive Components](https://inclusive-components.design/tooltips-toggletips/).
- Focus stays on the trigger; **`role="tooltip"`** content is skipped by sequential focus in the baseline pattern.

### When to use something else

- Dense or interactive payloads, forms, or quasi-modal workflows — **[Deque tooltip dialog](https://dequeuniversity.com/library/aria/tooltip-dialog)** + **`role="dialog"`**/focus choreography, contextual help, or popover—not a tooltip bubble.
- Unlabeled static text/disabled shells without usable focus sibling — contextual help flows ([React Spectrum Tooltip: Non-interactive elements](https://react-spectrum.adobe.com/Tooltip)).
- Text duplicates **`aria-labelledby`/`aria-label`**/`title` equivalents — **`describeTrigger="none"`** semantics (as on **`sp-overlay`**) or omit **`aria-describedby`** altogether.

### What it is not

- Not menu / listbox / dialog (baseline tooltip avoids internal roving tabindex and focus traps).
- Not a labeling primitive—paired controls still expose an accessible **name**.

### Related

- 1st-gen [`sp-overlay`](../../../../1st-gen/packages/overlay/README.md) `type="hint"` + [`overlay-trigger`](../../../../1st-gen/packages/overlay/overlay-trigger.md) hover overlays implement today’s stacking + **`aria-describedby`** heuristics.
- 2nd-gen direction: **`position-anchor`** layering first; retire overlay-driven tooltip placement—not “no popover visuals,” rather “no teleporting Overlay stack owning tooltip placement.”

---

## ARIA and WCAG context

### Pattern in the APG

- Follow the **[Tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)**: **`role="tooltip"`**, stable **`id`**, **`aria-describedby`** on trigger while visible, visibility synced via **`aria-hidden`**, **`inert`**, or DOM removal; baseline keeps focus outside the bubble.
- **[Deque Tooltip](https://dequeuniversity.com/library/aria/tooltip)** demos hover plus focus plus optional dwell on tooltip plus Escape—all without moving focus inside.
- **[Inclusive Components](https://inclusive-components.design/tooltips-toggletips/)** splits classic **`aria-describedby`** additions from **`aria-expanded`** toggletips when touch needs deterministic open/close.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Pointer gestures (2.5.1)](https://www.w3.org/TR/WCAG22/#pointer-gestures) / [Target size (2.5.8)](https://www.w3.org/TR/WCAG22/#target-size-minimum) | Touch has no hover—offer simple tap/long-press/toggletip affordances; meet minimum target size or documented exceptions. |
| [Focus order (2.4.3)](https://www.w3.org/TR/WCAG22/#focus-order) / [Keyboard (2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | Showing hints on `:focus-visible` matches keyboard-only use; **`role="tooltip"`** shells stay outside Tab order in the APG model. |
| [Name, role, value (4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | Pair **`role="tooltip"`** with **`aria-describedby`** associations; toggletips add **`aria-expanded`/`aria-controls`** as modeled in [Inclusive Components](https://inclusive-components.design/tooltips-toggletips/). |
| [Non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | Tooltip border/tip cues meet contrast vs adjacent backgrounds. |
| [Orientation (1.3.4)](https://www.w3.org/TR/WCAG22/#orientation) / [Reflow (1.4.10)](https://www.w3.org/TR/WCAG22/#reflow) | Brief tooltips preferred—Deque notes long supplemental text is arduous to resume ([Deque Tooltip](https://dequeuniversity.com/library/aria/tooltip)). Use `position-try-fallbacks` / logical placements so clipped regions reflow cleanly. |
| [Animation from interactions (2.3.3)](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions) | Respect `prefers-reduced-motion` when animating surfaces. |

**Bottom line:** Standardize **`role="tooltip"`** semantics, expand beyond hover-only overlays, anchor with **[CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)** first ([guide](https://css-tricks.com/css-anchor-positioning-guide/)), and promote rich interactions to dialogs/popovers ([Deque tooltip dialog](https://dequeuniversity.com/library/aria/tooltip-dialog)).

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary | Notes |
| --- | --- | --- | --- | --- | --- |
| [SWC-1558](https://jira.corp.adobe.com/browse/SWC-1558) | Bug | To Do | Unresolved | Tooltip is missing **`role="tooltip"`** | Confirms gap vs APG—2nd-gen must fix on surfaced node. |
| [SWC-1465](https://jira.corp.adobe.com/browse/SWC-1465) | Story | To Do | Unresolved | Docs: **`aria-describedby`** guidance for Tooltip | Tie to **`describeTrigger`/`none`** and cross-root **`HoverController`** behavior. |
| [SWC-321](https://jira.corp.adobe.com/browse/SWC-321) | Bug | To Do | Unresolved | Clicking **open**, **self-managed** tooltip on **action-button** triggers underlying button ([#3969](https://github.com/adobe/spectrum-web-components/issues/3969)) | Regression-test **hit-target layering** (**`pointer-events`**, stacking order, dismiss-on-press). Align dismiss-on-pointer behavior with React Spectrum **`shouldCloseOnPress`** ([React Spectrum Tooltip](https://react-spectrum.adobe.com/Tooltip)). |
| [SWC-324](https://jira.corp.adobe.com/browse/SWC-324) | Bug | To Do | Unresolved | Shared **`sp-tooltip`/`sp-overlay`** across buttons — content swaps but ghost position persists | Overlay must **re-anchor** when active trigger identity changes; **anchor-name** keyed to trigger helps; add perf-safe regression (**SWC-2025**). |
| [SWC-890](https://jira.corp.adobe.com/browse/SWC-890) | Bug | To Do | Unresolved | Tooltip in **ActionMenu** logs overlay warning (**#5462**) | Stacks with menu/hint overlays — validate **`OverlayTrigger`** coexistence docs + Storybook (**SWC-2026**). |
| [SWC-994](https://jira.corp.adobe.com/browse/SWC-994) | Bug | To Do | Unresolved | Tooltip **max-width** overrides **`--mod`** variable | Token/mod fidelity — fold into **Spectrum 2** visual pass (**SWC-2023**). |
| [SWC-286](https://jira.corp.adobe.com/browse/SWC-286) | Story | Done | Done | VoiceOver reads tooltip/overlay content | Carry forward SR passes for supplementary description vs duplication on focus. |
| [SWC-1603](https://jira.corp.adobe.com/browse/SWC-1603) | Bug | Done | Fixed | **Self-managed** tooltip logs **`TRAVERSAL_EXHAUSTED`** in valid slotted usage | Keep **`triggerElement`** override + traversal docs (**SWC-2019** plan). |

**Historical placement / browser regressions** (lesson: widen VRT + Safari/Firefox in **Storybook**/CI per **SWC-2026**/**SWC-2025**): [SWC-1331](https://jira.corp.adobe.com/browse/SWC-1331) (no-break word wrapping, **Done**/**Fixed**); [SWC-539](https://jira.corp.adobe.com/browse/SWC-539) (Firefox horizontal offset — **Done**/**Fixed**); [SWC-532](https://jira.corp.adobe.com/browse/SWC-532) + [SWC-530](https://jira.corp.adobe.com/browse/SWC-530) (**Safari** tip alignment / jitter — **Done**/**Fixed**); [SWC-852](https://jira.corp.adobe.com/browse/SWC-852) (Safari flicker — **Cannot Reproduce**); [SWC-681](https://jira.corp.adobe.com/browse/SWC-681) (**ActionMenu**: clickable tooltip closed menu — **Done**/**Fixed**); [SWC-561](https://jira.corp.adobe.com/browse/SWC-561) (**delayed overlay** interplay — **Won't Fix** — treat as integration constraint in docs).

**Overlay direction (closed):** [SWC-1674](https://jira.corp.adobe.com/browse/SWC-1674) (**RFC**: next-gen overlay — **Done**) supports retiring teleport-heavy defaults in favor of **anchor-first** Tooltip placement spelled out below; **API/port** (**[SWC-2021](https://jira.corp.adobe.com/browse/SWC-2021)**) and **style** (**[SWC-2024](https://jira.corp.adobe.com/browse/SWC-2024)**) work on **Jira** should keep that bias.

---

## Recommendations: `<swc-tooltip>`

Component tag may change (`swc-tooltip` placeholder)—this section covers the surfaced tooltip primitive plus its triggering contract. It addresses **`role="tooltip"`** / **`aria-describedby`** gaps tracked under **[SWC-1558](https://jira.corp.adobe.com/browse/SWC-1558)** and authoring guidance under **[SWC-1465](https://jira.corp.adobe.com/browse/SWC-1465)**.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **`role="tooltip"`** | Prescribe on surfaced content; disallow host role swaps into menu/dialog metaphors ([Deque tooltip dialog](https://dequeuniversity.com/library/aria/tooltip-dialog)). |
| **`id`** | Stable unique id per instance so **`aria-describedby`** and **`aria-controls`** resolve deterministically. |
| **`aria-describedby` on trigger** | Present only while visibly rendered (APG rhythm). Preserve **`describeTrigger="none"`** semantics from **`sp-overlay`** whenever names already announce the hint ([describeTrigger](../../../../1st-gen/packages/overlay/src/Overlay.ts)). |
| **Visibility bookkeeping** | Remove relationships when collapsed; **`inert`/`aria-hidden`** track actual presentation. Nested focusables imply a richer pattern—likely **`dialog`/`popover`** instead. |
| **Toggletip mode** | When touch mandates explicit buttons, expose **`aria-expanded`/`aria-controls`** per [Inclusive Components](https://inclusive-components.design/tooltips-toggletips/). Document `trigger="toggle"` (name TBD) separately from hover+focus presets. |
| **Spectrum variants (**`info`/`positive`/`negative`**)** | Visual cues only—tie semantic states (e.g. **`aria-invalid`**) through explicit authoring guidance rather than silent auto-mapping. |

### Shadow DOM and cross-root ARIA Issues

Cross-root **`aria-describedby`** branches in **`HoverController.prepareDescription`** when comparing trigger, overlay, and content roots. See **`prepareOverlayRelativeDescription`** vs **`prepareContentRelativeDescription`** in [`HoverController.ts`](../../../../1st-gen/packages/overlay/src/HoverController.ts).

2nd-gen: keep ids on predictable nodes (prefer light DOM) or expose helper APIs documenting how to sync references across shadow gaps so SR testers never chase disappearing ids.

### Accessibility tree expectations

- Default combo: hovered/focus-visible trigger references tooltip id via **`aria-describedby`** even if browse/virtual cursor order skips the detached bubble until focus lands.
- Toggletip: labelled button exposes expanded state + **`aria-controls`**, tooltip still flagged **`role="tooltip"`** or nested region per pattern choice—document divergence from APG **pure supplementary** semantics.
- **Self-managed mirrors** `Tooltip.resolveSelfManagedTriggerElement`—walk ancestors until **`focusableSelector`** matches unless authors pass **`triggerElement`** explicitly (`Tooltip.ts`). Prefer **`triggerElement`** for complex slots to silence false **`TRAVERSAL_EXHAUSTED`** (**[SWC-1603](https://jira.corp.adobe.com/browse/SWC-1603)**) and expose that path in **[SWC-2027](https://jira.corp.adobe.com/browse/SWC-2027)**-style migration copy.

### Form-associated custom properties (labels, `ElementInternals`)

**Does not apply.** Tooltip is not a **[form-associated custom element](https://html.spec.whatwg.org/multipage/custom-elements.html#form-associated-custom-element)**; associated inputs keep their **`ElementInternals`**/`label` contracts while tooltip offers supplemental hints via **`aria-describedby`** only.

### Live regions, loading, and announcements

**Does not apply.** Avoid `aria-live` flips during routine hint toggles—stick to relational ARIA (**`aria-describedby`**) and button/toggletip state. **`aria-live="assertive"`** remains unacceptable for supplementary hints.

### Motion (dedicated recommendations subsection)

**Intentionally omitted.** **Reduced-motion** expectations sit in [Guidelines that apply](#guidelines-that-apply); tooltip is **not** a loading/progress meter.

### Positioning: CSS anchor and JavaScript fallbacks

| Topic | What to do |
| --- | --- |
| Primary mechanism | `anchor-name` on triggers + **`position-anchor` / `anchor()` / logical insets**, guided by MDN (**[CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)**) and **[CSS-Tricks](https://css-tricks.com/css-anchor-positioning-guide/)**. Keep DOM co-located with trigger when clipping allows so scroll/resize need less JS teleporting—only hoist to viewport layers when unavoidable. |
| JavaScript allowances | Progressive enhancement for browsers lacking anchors, nuanced collision surpassing declarative **`@position-try`**, syncing multiple simultaneous hints, bridging virtual references, **recomputing anchor** when the active trigger swaps ([SWC-324](https://jira.corp.adobe.com/browse/SWC-324)). Overlay stack must not silently become default. |
| RTL / Spectrum placement vocabulary | Translate `start`/`end` cleanly; regress RTL tip parity (see [SWC-917 popover precedent](https://jira.corp.adobe.com/browse/SWC-917)). Historical **Firefox**/**Safari** tip and jitter bugs (**[SWC-539](https://jira.corp.adobe.com/browse/SWC-539)**, **[SWC-532](https://jira.corp.adobe.com/browse/SWC-532)**, **[SWC-530](https://jira.corp.adobe.com/browse/SWC-530)**—**Done**) justify cross-browser visual regression—not only logical placement APIs. |
| **`--mod`**, max-width, long unbroken strings | Honor mod tokens (**[SWC-994](https://jira.corp.adobe.com/browse/SWC-994)**) and **wrapping**/overflow (**[SWC-1331](https://jira.corp.adobe.com/browse/SWC-1331)**—**Done**) so Tooltip chrome does not truncate or clash with authored constraints in **Spectrum 2** (**[SWC-2023](https://jira.corp.adobe.com/browse/SWC-2023)** drives visual fidelity). |

### Interaction: pointer, keyboard, and touch

| Topic | What to do |
| --- | --- |
| Keyboard | Show on `:focus-visible` whenever hover also triggers; collapse on blur appropriately while mirroring **[Deque Tooltip](https://dequeuniversity.com/library/aria/tooltip)** semantics. **`Escape`** dismisses transient hints globally without stealing focus (see [`OverlayStack.ts`](../../../../1st-gen/packages/overlay/src/OverlayStack.ts) hint handling). |
| Pointer hover | Support warmup/cooldown delays matching Spectrum guidance (React Spectrum default **delay** knobs) and tolerate pointer movement onto tooltip copy (Deque `keepTooltipOnMouseOver`). **Delayed overlay interplay** (**[SWC-561](https://jira.corp.adobe.com/browse/SWC-561)** — **Won’t Fix**) stays an **integrator documentation** concern: **`OverlayTrigger`** hover/long-press timing plus delayed tooltip warmup must read clearly together—not a Tooltip-only defect. |
| Touch | Do not mimic React Spectrum “no touch tooltips”—document explicit taps/long-press/toggletip buttons. Align **`triggerInteraction`** long-press expectations with **`tooltip-directive`** options. Stories must validate on device emulation. |
| Menu / stacking regression targets | Maintain **Storybook/e2e** coverage where Tooltip coexists with **menus**/**buttons** (**[SWC-321](https://jira.corp.adobe.com/browse/SWC-321)**, historical **[SWC-681](https://jira.corp.adobe.com/browse/SWC-681)**, **[SWC-890](https://jira.corp.adobe.com/browse/SWC-890)**): overlays stay reachable without unintended activation of underlying primary actions (**[SWC-2026](https://jira.corp.adobe.com/browse/SWC-2026)** narratives). |

**React Spectrum TooltipTrigger recap (map into WC equivalents):**

- Controlled/uncontrolled **`open`**, **`onOpenChange`**, warmup **`delay`**, **`shouldFlip`/`placement`/`crossOffset`/`containerPadding`**, **`shouldCloseOnPress`**, **`isDisabled`**, **`trigger="focus"`** vs hover+focus, cautious **`defaultOpen`** (avoid orphaned **`aria-describedby`**)—see **[React Spectrum Tooltip](https://react-spectrum.adobe.com/Tooltip)**.

### Keyboard and focus

- Classic supplementary tooltip stays on trigger; **`Escape`** listener mirrors Deque demos + existing hint stack behavior.
- Toggletip buttons manage Tab routing if inner widgets exist—otherwise abide by APG supplementary description rules.
- **Self-managed compositions** reuse `Tooltip.resolveSelfManagedTriggerElement` + optional **`triggerElement`** override behaviors from `Tooltip.ts`.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit / component** | Modes (**hover**, **focus-visible**, **`longpress`**, toggletip) mutate **`aria-describedby`/`aria-expanded`** predictably; `describeTrigger="none"` never leaves stale references. |
| **aXe + Storybook** | No duplicate relational attributes, stray interactive nodes inside **`role="tooltip"`**, violations on contrast/touch targets when toggletip buttons shrink. |
| **Playwright ARIA snapshots** | Cross-browser anchor placement smoke + tree snapshots for **`swc-action-button`** + Tooltip bundles; widen coverage commensurate with historical Safari/Firefox placement bugs (**[SWC-539](https://jira.corp.adobe.com/browse/SWC-539)**, **[SWC-532](https://jira.corp.adobe.com/browse/SWC-532)**, **[SWC-530](https://jira.corp.adobe.com/browse/SWC-530)**) and shared-trigger re-anchor (**[SWC-324](https://jira.corp.adobe.com/browse/SWC-324)**)—see **[Related 1st-gen accessibility](#related-1st-gen-accessibility-jira)**. Prior doc/test-structure debt (**[SWC-420](https://jira.corp.adobe.com/browse/SWC-420)**, **[SWC-421](https://jira.corp.adobe.com/browse/SWC-421)**; **[SWC-166](https://jira.corp.adobe.com/browse/SWC-166)**) should converge into coherent suites (**[SWC-2025](https://jira.corp.adobe.com/browse/SWC-2025)**). |

### Playwright-only or host-only accessibility gates

Meaningful only when Tooltip ships beside real triggers—isolated shell stories skip heavy gates.

### Manual and screen reader testing

Exercise VoiceOver/NVDA/JAWS in browse versus focus modes using the [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) guide (see **Browse mode**). Confirm supplementary speech fires once triggers gain focus—not only when pointer hovers—and verify touch/long-press/toggletip flows on handheld emulation. **[SWC-286](https://jira.corp.adobe.com/browse/SWC-286)** (**Done**) established VO behavior on overlay/tooltip narration—reuse that lineage when asserting **`aria-describedby`** supplemental output vs duplication.

---

## Summary checklist

- [ ] **`role="tooltip"`**, **`aria-describedby`**, **`id`**, **`describeTrigger`/opt-out parity** coded and documented (closes **[SWC-1558](https://jira.corp.adobe.com/browse/SWC-1558)**, informs **[SWC-1465](https://jira.corp.adobe.com/browse/SWC-1465)**/**[SWC-2022](https://jira.corp.adobe.com/browse/SWC-2022)**).
- [ ] **Hover + focus + touch** pathways covered; **keyboard** hides/show rules match **Deque** guidance.
- [ ] **CSS anchor positioning first** documented in migration + Storybook (**[CSS tricks guide](https://css-tricks.com/css-anchor-positioning-guide/)**) with **explicit** fallback story for **unsupported** UA.
- [ ] **`aria-expanded`/`aria-controls` toggletip variant** scoped and separated from **`aria-describedby`-only**.
- [ ] Escape dismisses transient tooltips **without focus trap**.
- [ ] Regression tests for **`aria-describedby`** lifecycle across **shadow/light** coupling plus **hit-target**/stacking cases from **[SWC-321](https://jira.corp.adobe.com/browse/SWC-321)**/**[SWC-890](https://jira.corp.adobe.com/browse/SWC-890)** and shared-trigger **re-anchor** from **[SWC-324](https://jira.corp.adobe.com/browse/SWC-324)** (**[SWC-2025](https://jira.corp.adobe.com/browse/SWC-2025)**).
- [ ] SR manual pass per [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) (`focus`/`browse`/`touch`).
- [ ] Refresh **[Related 1st-gen accessibility](#related-1st-gen-accessibility-jira)** when **`sp-tooltip`** tickets close or supersede (Adobe Jira remains authoritative—**omit** duplicated **`gen2`** program rows here per contributor-doc rules).

---

## References

- [ARIA APG Tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- [ARIA APG Read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Deque University: Tooltip](https://dequeuniversity.com/library/aria/tooltip), [Deque: Tooltip dialog](https://dequeuniversity.com/library/aria/tooltip-dialog)
- [Inclusive Components: Tooltips and toggletips](https://inclusive-components.design/tooltips-toggletips/)
- [CSS-Tricks: CSS anchor positioning guide](https://css-tricks.com/css-anchor-positioning-guide/)
- [MDN: CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)
- [React Spectrum: Tooltip — interactions, accessibility notices, TooltipTrigger props](https://react-spectrum.adobe.com/Tooltip)
- WCAG **2.2**: [Understanding](https://www.w3.org/WAI/WCAG22/Understanding/) (topics cited above)
- 1st-gen: [`Tooltip.ts`](../../../../1st-gen/packages/tooltip/src/Tooltip.ts), [`HoverController.ts`](../../../../1st-gen/packages/overlay/src/HoverController.ts) (description wiring), [`OverlayStack.ts`](../../../../1st-gen/packages/overlay/src/OverlayStack.ts) (Escape closes `hint` overlays)
- Tooltip [rendering-and-styling migration](./rendering-and-styling-migration-analysis.md); Popover [accessibility migration analysis](../popover/accessibility-migration-analysis.md)
- 2nd-gen guides: [Semantic HTML and ARIA](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx), [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx), [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)
- Adobe Jira (**1st-gen** snapshot table): [Related 1st-gen accessibility](#related-1st-gen-accessibility-jira)
