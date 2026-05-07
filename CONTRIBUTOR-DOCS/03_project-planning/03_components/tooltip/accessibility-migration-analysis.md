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

- **Contextual help** instead of Tooltip when Spectrum’s **popover-style help** fits: **[Contextual help](https://spectrum.adobe.com/page/contextual-help/)** (design), **[`sp-contextual-help`](../../../../1st-gen/packages/contextual-help/README.md)** (1st-gen), **[React Spectrum `ContextualHelp`](https://react-spectrum.adobe.com/ContextualHelp)** (**vs [`Tooltip`](https://react-spectrum.adobe.com/Tooltip)**—including **non-interactive** adjacent targets). Use it for explanatory UI beside headings, summaries, plain text bands, **disabled** groups, tool regions, workflows where the user **consciously opens** help and may **read longer copy or follow links**. Typical **ARIA** is **`popover`**/**`dialog`**-style disclosure; focus **may enter** the surfaced panel—different from Tooltip’s **`role="tooltip"`** + **`aria-describedby`** supplementary hint anchored to **one** focusable control (**[What a tooltip is](#what-a-tooltip-is)**). **Deque** warns long supplemental strings overwhelm **`aria-describedby`** ergonomics (**[Deque Tooltip](https://dequeuniversity.com/library/aria/tooltip)**)—that is a cue to escalate here or to **`dialog`**.
- Dense or interactive payloads, forms, or quasi-modal workflows — **[Deque tooltip dialog](https://dequeuniversity.com/library/aria/tooltip-dialog)** + **`role="dialog"`**/focus choreography, **popover**, or **`sp-contextual-help`** when the authoring model matches disclosure—not Tooltip copy stretched into **`role="tooltip"`**.
- Text duplicates **`aria-labelledby`/`aria-label`**/`title` equivalents — **`describeTrigger="none"`** semantics (as on **`sp-overlay`**) or omit **`aria-describedby`** altogether.

### What it is not

- Not **`sp-contextual-help`**—do **not** ship **`role="tooltip"`** when the authoring intent is **Spectrum contextual help disclosure** (**popover** beside a region)—see **[When to use something else](#when-to-use-something-else)**.
- Not menu / listbox / **`dialog`** in the Tooltip sense—baseline tooltip avoids internal roving **`tabindex`**, actionable children, and focus traps (rich interactive surfaces belong under **[When to use something else](#when-to-use-something-else)**).
- Not a labeling primitive—paired controls still expose an accessible **name**.

### Related

- 1st-gen [`sp-overlay`](../../../../1st-gen/packages/overlay/README.md) `type="hint"` + [`overlay-trigger`](../../../../1st-gen/packages/overlay/overlay-trigger.md) hover overlays implement today’s stacking + **`aria-describedby`** heuristics.
- 2nd-gen direction: **`position-anchor`** layering first; retire overlay-driven tooltip placement—not “no popover visuals,” rather “no teleporting Overlay stack owning tooltip placement.”

---

## ARIA and WCAG context

### Pattern in the APG

The **[APG Tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)** is authoritative reference material; **treat its “About this pattern” note seriously:** the pattern is **work in progress** and **does not yet have task-force consensus** on the page—implementations should track APG revisions and reconcile when guidance stabilizes. Discussion and stabilization work align with **`w3c/aria-practices`** issues **[#128 — Draft tooltip design pattern](https://github.com/w3c/aria-practices/issues/128)** (pattern prose, editorial gaps, tooltip vs **`title`/tooltip-dialog cross-links**) and **[#127 — Develop example](https://github.com/w3c/aria-practices/issues/127)** (**APG** reference example work still tracked there).

- **Semantics:** Tooltip container **`role="tooltip"`**; trigger references it with **`aria-describedby`** while the tooltip is shown (**APG — WAI-ARIA roles, states, and properties**). Sync **`aria-hidden`/`inert`/DOM pruning** so the relationship matches visibility; **`Escape`** dismisses (**APG — Keyboard Interaction**).

- **No tooltip focus:** **“Tooltip widgets do not receive focus”** (**APG**). Focus stays on the **trigger** while supplemental text displays; escalate to **`dialog`/popover** when users must Tab into explanatory content (**APG** directs focusable-rich popups to **non-modal dialog**).

- **Keyboard notes (verbatim intent from APG):** (1) focus remains on the **triggering element** during display; (2) if invoked on **focus**, dismiss when trigger **blur**s; (3) if invoked on **hover**, tooltip **stays** open while pointer is over **trigger or tooltip** (**APG Keyboard Interaction**, notes)—design hitboxes/gaps accordingly (Deque “keep dwell on tooltip” behavior aligns).

- **Small delay:** APG describes tooltip appearance **after a short delay**; match Spectrum/product **warmup**/**delay** to reduce accidental flashes (see [Interaction: pointer, keyboard, and touch](#interaction-pointer-keyboard-and-touch) and the React Spectrum **`TooltipTrigger`** recap there).

- **Focusable popup content:** **“A hover that contains focusable elements can be made using a non-modal dialog”** (**APG**)—do **not** embed `<a href>`, **`<button>`**, fields, roving tabindex, or traps inside **`role="tooltip"`**; use **`role="dialog"`**/**popover**/contextual help when users must tab into explanatory UI (**[Deque tooltip dialog](https://dequeuniversity.com/library/aria/tooltip-dialog)**; **[When to use something else](#when-to-use-something-else)**).

- **[Deque Tooltip](https://dequeuniversity.com/library/aria/tooltip)** illustrates hover + focus + optional dwell plus **Escape**, consistent with APG dismissal expectations.

- **[Inclusive Components](https://inclusive-components.design/tooltips-toggletips/)** extends touch with **`aria-expanded` toggletips** where pointer hover alone is insufficient—beyond strict APG keyboard bullets but complementary.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Use of color (1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | **`variant`** hues are not the **sole** carrier of meaning—pair with **visible** text (and/or [non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) cues) like the [USWDS general checks](https://designsystem.digital.gov/components/tooltip/accessibility-tests/). |
| [Contrast minimum (1.4.3)](https://www.w3.org/TR/WCAG22/#contrast-minimum) | Tooltip **label** text maintains **≥4.5:1** against the tooltip **fill** (minimum for normal body copy). |
| [Non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | Tooltip **boundary** (outline, tip, shadow silhouette) hits **≥3:1** versus **adjacent page** background—not only internal text/surface pairing (see [USWDS](https://designsystem.digital.gov/components/tooltip/accessibility-tests/) non-text row). |
| [Content on hover or focus (1.4.13)](https://www.w3.org/TR/WCAG22/#content-on-hover-or-focus) | **Dismissible:** **`Escape`** hides the hint **without** forcing pointer or focus to leave the trigger first. **Hover path:** pointer may move onto the bubble without collapse (matches [APG](#pattern-in-the-apg) + [USWDS hover criteria](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)). **Persistence:** close on trigger **blur**/**mouse-out** per APG—avoid “stuck open” beyond stated rules. Touch/toggletip modes still need an explicit dismiss path. |
| [Resize text (1.4.4)](https://www.w3.org/TR/WCAG22/#resize-text) / [Reflow (1.4.10)](https://www.w3.org/TR/WCAG22/#reflow) | At **200%** zoom Tooltip **copy** and **trigger** stay legible; bubble does not **obstruct** unrelated required content ([USWDS zoom checklist](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)). Use **`position-try-fallbacks`** / logical placements so clipped regions reflow cleanly (Deque warns long supplemental text is arduous—[Deque Tooltip](https://dequeuniversity.com/library/aria/tooltip)). |
| [Info and relationships (1.3.1)](https://www.w3.org/TR/WCAG22/#info-and-relationships) / [Meaningful sequence (1.3.2)](https://www.w3.org/TR/WCAG22/#meaningful-sequence) | Screen readers should hear **trigger naming** then **supplementary** tooltip text in a sensible order ([USWDS screen reader checklist](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)). |
| [Pointer gestures (2.5.1)](https://www.w3.org/TR/WCAG22/#pointer-gestures) / [Target size (2.5.8)](https://www.w3.org/TR/WCAG22/#target-size-minimum) | Touch has no hover—offer simple tap/long-press/toggletip affordances; meet minimum target size or documented exceptions. |
| [Keyboard (2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | Tab to **trigger** reveals tooltip (when using focus activation); no reliance on hover-only affordances. |
| [No keyboard trap (2.1.2)](https://www.w3.org/TR/WCAG22/#no-keyboard-trap) | Users can **Tab** past the trigger even while hint is open—Tooltip never intercepts sequential focus (see [USWDS keyboard tests](https://designsystem.digital.gov/components/tooltip/accessibility-tests/) and [APG](#pattern-in-the-apg)). |
| [Focus order (2.4.3)](https://www.w3.org/TR/WCAG22/#focus-order) / [Focus visible (2.4.7)](https://www.w3.org/TR/WCAG22/#focus-visible) | Visible **focus ring** on trigger when keyboard opens the hint; **`role="tooltip"`** host remains untabbable in the APG-aligned model. |
| [Name, role, value (4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | Pair **`role="tooltip"`** with **`aria-describedby`** associations; toggletips add **`aria-expanded`/`aria-controls`** as modeled in [Inclusive Components](https://inclusive-components.design/tooltips-toggletips/). |
| [Orientation (1.3.4)](https://www.w3.org/TR/WCAG22/#orientation) | Respect **rotation**/`writing-mode`; logical placement tokens keep tips from rendering as orphaned islands in RTL or vertical stacks alongside reflow tweaks above. |
| [Animation from interactions (2.3.3)](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions) | Respect `prefers-reduced-motion` when animating surfaces. |

**Note:** The USWDS checklist was drafted against **WCAG 2.1 AA** passes; this doc targets **WCAG 2.2 Level AA**—the success criteria cited above remain aligned, with 2.2-only additions elsewhere in product QA as needed.

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

Authoring/interaction parallels (non-normative here): **[IBM Carbon — Tooltip accessibility](https://carbondesignsystem.com/components/tooltip/accessibility/)** (**focus**/**hover**, **Escape**, icon-only vs glossary-style definition triggers, authored tooltip strings in specs—see **ARIA** table below); **[USWDS — Tooltip](https://designsystem.digital.gov/components/tooltip/)** (when/how to use in specs) and the **[USWDS Tooltip accessibility tests](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)** checklist—its **general**, **200% zoom**, **keyboard**, and **screen reader** groupings are the same probes this doc encodes in **[Guidelines that apply](#guidelines-that-apply)**, **Interaction**/**Positioning** below, and **`## Testing`** (no separate checklist section); **[Red Hat — Tooltip accessibility](https://ux.redhat.com/elements/tooltip/accessibility/)** (keyboard summaries, dwell on bubble, **silent** suppression — **Interaction**, **Accessibility tree expectations**).

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **`role="tooltip"`** | Prescribe on surfaced content; disallow host role swaps into menu/dialog metaphors ([Deque tooltip dialog](https://dequeuniversity.com/library/aria/tooltip-dialog)). |
| **`id`** | Stable unique id per instance so **`aria-describedby`** and **`aria-controls`** resolve deterministically. |
| **`aria-labelledby`** (unnamed triggers) | [Carbon](https://carbondesignsystem.com/components/tooltip/accessibility/) illustrates wiring **tooltip** copy as the trigger’s **accessible name** for **unnamed icon-only** controls (**`aria-labelledby`**); use that pattern when **`aria-describedby`** supplemental text would wrongly leave the element **without a name**. |
| **`aria-describedby` on trigger** | Present only while visibly rendered (APG rhythm). Reserve for **extra** hints when the control **already** has an obvious **name**—avoid duplicating naming strings that **`aria-labelledby`**/`aria-label` already convey (**[When to use something else](#when-to-use-something-else)**, **[What it is not](#what-it-is-not)**). Preserve **`describeTrigger="none"`** semantics from **`sp-overlay`** whenever names already announce the hint ([describeTrigger](../../../../1st-gen/packages/overlay/src/Overlay.ts)). |
| **Visibility bookkeeping** | Remove relationships when collapsed; **`inert`/`aria-hidden`** track actual presentation. **APG:** popup with focusable internals belongs in **non-modal `dialog`/popover**, not **`role="tooltip"`** (**[APG Tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)**). |
| **Toggletip mode** | When touch mandates explicit buttons, expose **`aria-expanded`/`aria-controls`** per [Inclusive Components](https://inclusive-components.design/tooltips-toggletips/). Document `trigger="toggle"` (name TBD) separately from hover+focus presets. |
| **Spectrum variants (**`info`/`positive`/`negative`**)** | Visual cues only—tie semantic states (e.g. **`aria-invalid`**) through explicit authoring guidance rather than silent auto-mapping; pair hue with legible text so meaning never relies on color alone (**[USWDS general](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)** / **1.4.1** in [Guidelines that apply](#guidelines-that-apply)). |

### Shadow DOM and cross-root ARIA Issues

Cross-root **`aria-describedby`** branches in **`HoverController.prepareDescription`** when comparing trigger, overlay, and content roots. See **`prepareOverlayRelativeDescription`** vs **`prepareContentRelativeDescription`** in [`HoverController.ts`](../../../../1st-gen/packages/overlay/src/HoverController.ts).

2nd-gen: keep ids on predictable nodes (prefer light DOM) or expose helper APIs documenting how to sync references across shadow gaps so SR testers never chase disappearing ids.

### Accessibility tree expectations

- Default combo: hovered/focus-visible trigger references tooltip id via **`aria-describedby`** even if browse/virtual cursor order skips the detached bubble until focus lands.
- **Suppressing tooltip from AT:** Red Hat **`silent`** on **`<rh-tooltip>`** ([Tooltip accessibility](https://ux.redhat.com/elements/tooltip/accessibility/)) removes tooltip content from the accessibility tree—authors **must** provide equivalent exposure (**`aria-label`**, **`aria-labelledby`**, visually hidden strings, **`aria-live`**, etc.) and prove it manually. **`describeTrigger="none"`** and similar Spectrum opt-outs need the **same caution**—never ship without verifying the trigger/control still communicates required text.
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
| **`--mod`**, max-width, long unbroken strings | Honor mod tokens (**[SWC-994](https://jira.corp.adobe.com/browse/SWC-994)**) and **wrapping**/overflow (**[SWC-1331](https://jira.corp.adobe.com/browse/SWC-1331)**—**Done**) so Tooltip chrome does not truncate or clash with authored constraints in **Spectrum 2** (**[SWC-2023](https://jira.corp.adobe.com/browse/SWC-2023)** drives visual fidelity). Storybook/QA should include **200%** zoom / reflow spot checks so tips stay legible and do not **occlude** critical UI—same intent as [USWDS magnification tests](https://designsystem.digital.gov/components/tooltip/accessibility-tests/) (**1.4.4**/**1.4.10** in [Guidelines that apply](#guidelines-that-apply)). |

### Interaction: pointer, keyboard, and touch

| Topic | What to do |
| --- | --- |
| Keyboard | Match **[APG Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)** keyboard bullets: **`Escape`** dismisses **without stealing** sequential focus (**[Red Hat Esc row](https://ux.redhat.com/elements/tooltip/accessibility/)**, [Carbon Tooltip accessibility](https://carbondesignsystem.com/components/tooltip/accessibility/)); tooltip opened from trigger **focus** dismisses when the trigger **blur**s or **Tab** moves away (**[RH keyboard table](https://ux.redhat.com/elements/tooltip/accessibility/)**); **`role="tooltip"`** never becomes **`document.activeElement`**. Align `:focus-visible`/`hover` touchpoints elsewhere in this doc. **1st-gen:** hint overlays also close on **Escape** via [`OverlayStack.ts`](../../../../1st-gen/packages/overlay/src/OverlayStack.ts). |
| Pointer hover | Support warmup/cooldown delays matching Spectrum guidance (React Spectrum default **delay** knobs) and tolerate pointer movement onto tooltip copy (**Deque** **`keepTooltipOnMouseOver`**; **[Red Hat dwell guideline](https://ux.redhat.com/elements/tooltip/accessibility/)**, [USWDS 1.4.13 rows](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)). **Delayed overlay interplay** (**[SWC-561](https://jira.corp.adobe.com/browse/SWC-561)** — **Won’t Fix**) stays an **integrator documentation** concern: **`OverlayTrigger`** hover/long-press timing plus delayed tooltip warmup must read clearly together—not a Tooltip-only defect. |
| Touch | Do not mimic React Spectrum “no touch tooltips”—document explicit taps/long-press/toggletip buttons. Align **`triggerInteraction`** long-press expectations with **`tooltip-directive`** options. Stories must validate on device emulation. |
| Menu / stacking regression targets | Maintain **Storybook/e2e** coverage where Tooltip coexists with **menus**/**buttons** (**[SWC-321](https://jira.corp.adobe.com/browse/SWC-321)**, historical **[SWC-681](https://jira.corp.adobe.com/browse/SWC-681)**, **[SWC-890](https://jira.corp.adobe.com/browse/SWC-890)**): overlays stay reachable without unintended activation of underlying primary actions (**[SWC-2026](https://jira.corp.adobe.com/browse/SWC-2026)** narratives). |
| Host surface | Prefer **focusable triggers** ([Red Hat warns against tooltips on static elements](https://ux.redhat.com/elements/tooltip/accessibility/)); if a **`disabled`** control still warrants guidance, keep it **focusable** or pivot to contextual help (**[RH same page](https://ux.redhat.com/elements/tooltip/accessibility/)**, [React Spectrum **non-interactive** guidance](https://react-spectrum.adobe.com/Tooltip), **[When to use something else](#when-to-use-something-else)**). |

**Carbon** splits **definition** tooltips (**focus**/**hover** glossary triggers—not primary **Enter** / **Space** actions) from **activating icon-only buttons** beside them ([Carbon Tooltip accessibility](https://carbondesignsystem.com/components/tooltip/accessibility/)); document which pattern Storybook/fixtures emulate so testers do not confuse activation expectations.

**React Spectrum TooltipTrigger recap (map into WC equivalents):**

- Controlled/uncontrolled **`open`**, **`onOpenChange`**, warmup **`delay`**, **`shouldFlip`/`placement`/`crossOffset`/`containerPadding`**, **`shouldCloseOnPress`**, **`isDisabled`**, **`trigger="focus"`** vs hover+focus, cautious **`defaultOpen`** (avoid orphaned **`aria-describedby`**)—see **[React Spectrum Tooltip](https://react-spectrum.adobe.com/Tooltip)**.

### Keyboard and focus

- Classic supplementary tooltip stays on trigger; **`Escape`** mirrors Deque demos, **`OverlayStack`** behavior, **[Red Hat](https://ux.redhat.com/elements/tooltip/accessibility/)**, **[Carbon Tooltip accessibility](https://carbondesignsystem.com/components/tooltip/accessibility/)**, and [USWDS keyboard / **1.4.13** Escape](https://designsystem.digital.gov/components/tooltip/accessibility-tests/) dismissal expectations (**focus remains on trigger** unless authors intentionally ship a richer dialog pattern).
- Toggletip buttons manage Tab routing if inner widgets exist—otherwise abide by APG supplementary description rules.
- **Self-managed compositions** reuse `Tooltip.resolveSelfManagedTriggerElement` + optional **`triggerElement`** override behaviors from `Tooltip.ts`.

---

## Testing

Treat the procedural groupings from **[USWDS Tooltip accessibility tests](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)** as the backbone for Tooltip QA here: **general** probes (meaning not color-only **1.4.1**, text **4.5:1** on surface, non-text **3:1** vs page), **1.4.13** hover persistence + pointer path onto the bubble + **`Escape`** without moving focus, **200%** zoom legibility/reflow, **keyboard** (**Tab**, no trap, **focus visible**), and **screen reader** order (**1.3.1**/**1.3.2**). Those map to [Guidelines that apply](#guidelines-that-apply) and **[Recommendations](#recommendations-swc-tooltip)** (**Interaction**, **Positioning**, **ARIA**, variants). Because USWDS documents tests **in isolation**, automation and Storybook exercises are insufficient—repeat the same categories in **host** application chrome for Section 508/product sign-off. For authoring norms aligned with Spectrum + USWDS usage prose, skim **[USWDS Tooltip overview](https://designsystem.digital.gov/components/tooltip/)** beside **Recommendations**.

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit / component** | Modes (**hover**, **focus-visible**, **`longpress`**, toggletip) mutate **`aria-describedby`/`aria-expanded`** predictably; `describeTrigger="none"` never leaves stale references—cover USWDS **keyboard**/hover-dismiss states that are observable in behavior tests (**Tab** away, **`Escape`**, tooltip stays while pointer dwells on trigger or bubble per **1.4.13**). |
| **aXe + Storybook** | No duplicate relational attributes, stray interactive nodes inside **`role="tooltip"`**, violations on contrast/touch targets when toggletip buttons shrink; surface failures that would block **[USWDS general](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)** checks (**1.4.3**/text surface, **1.4.11**/chrome vs adjacent page, targets) wherever tokens resolve in the snapshot DOM. |
| **Playwright ARIA snapshots** | Cross-browser anchor placement smoke + tree snapshots for **`swc-action-button`** + Tooltip bundles; widen coverage commensurate with historical Safari/Firefox placement bugs (**[SWC-539](https://jira.corp.adobe.com/browse/SWC-539)**, **[SWC-532](https://jira.corp.adobe.com/browse/SWC-532)**, **[SWC-530](https://jira.corp.adobe.com/browse/SWC-530)**) and shared-trigger re-anchor (**[SWC-324](https://jira.corp.adobe.com/browse/SWC-324)**)—see **[Related 1st-gen accessibility](#related-1st-gen-accessibility-jira)**. Prior doc/test-structure debt (**[SWC-420](https://jira.corp.adobe.com/browse/SWC-420)**, **[SWC-421](https://jira.corp.adobe.com/browse/SWC-421)**; **[SWC-166](https://jira.corp.adobe.com/browse/SWC-166)**) should converge into coherent suites (**[SWC-2025](https://jira.corp.adobe.com/browse/SWC-2025)**). Add recurring **viewport ~200%** / overflow sanity where feasible so placement does not regress [USWDS magnification intent](https://designsystem.digital.gov/components/tooltip/accessibility-tests/) alongside pixel placement. |

### Playwright-only or host-only accessibility gates

Meaningful only when Tooltip ships beside real triggers—isolated shell stories skip heavy gates; **[USWDS isolation caveat](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)** means **gates + manual passes must still execute in realistic host layouts.**

### Manual and screen reader testing

Using the [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) guide (**Browse** versus **focus** modes), deliberately hit the **[USWDS screen reader](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)** expectations: trigger content first, supplementary tooltip wording second, sane reading order (**1.3.1**/**1.3.2** per [Guidelines that apply](#guidelines-that-apply)). Supplementary speech must fire once triggers gain focus—not only on hover—and handheld flows should cover touch/long-press/toggletip. Combine with manual keyboard (**Tab**, **`Escape`**, dwell on bubble) + **200%** zoom walks drawn from the same USWDS page when accepting Tooltip integrations. **[SWC-286](https://jira.corp.adobe.com/browse/SWC-286)** (**Done**) VoiceOver narration lineage still applies when comparing **`aria-describedby`** output vs duplication.

---

## Summary checklist

- [ ] **`role="tooltip"`**, **`aria-describedby`**, **`id`**, **`describeTrigger`/opt-out parity** coded and documented (closes **[SWC-1558](https://jira.corp.adobe.com/browse/SWC-1558)**, informs **[SWC-1465](https://jira.corp.adobe.com/browse/SWC-1465)**/**[SWC-2022](https://jira.corp.adobe.com/browse/SWC-2022)**).
- [ ] **Hover + focus + touch** pathways covered; **keyboard** hides/show rules match **Deque** guidance.
- [ ] **CSS anchor positioning first** documented in migration + Storybook (**[CSS tricks guide](https://css-tricks.com/css-anchor-positioning-guide/)**) with **explicit** fallback story for **unsupported** UA.
- [ ] **`aria-expanded`/`aria-controls` toggletip variant** scoped and separated from **`aria-describedby`-only**.
- [ ] Escape dismisses transient tooltips **without focus trap**.
- [ ] Regression tests for **`aria-describedby`** lifecycle across **shadow/light** coupling plus **hit-target**/stacking cases from **[SWC-321](https://jira.corp.adobe.com/browse/SWC-321)**/**[SWC-890](https://jira.corp.adobe.com/browse/SWC-890)** and shared-trigger **re-anchor** from **[SWC-324](https://jira.corp.adobe.com/browse/SWC-324)** (**[SWC-2025](https://jira.corp.adobe.com/browse/SWC-2025)**).
- [ ] SR + keyboard manual pass per [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) (`focus`/`browse`/`touch`), explicitly covering **[USWDS Tooltip accessibility tests](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)** categories (**general**, **zoom**, **keyboard**, **SR**) in **host** layouts—not isolated story shells alone.
- [ ] Refresh **[Related 1st-gen accessibility](#related-1st-gen-accessibility-jira)** when **`sp-tooltip`** tickets close or supersede (Adobe Jira remains authoritative—**omit** duplicated **`gen2`** program rows here per contributor-doc rules).

---

## References

- [ARIA APG Tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- **`w3c/aria-practices` (APG source discussions):** [Issue #128 — Draft tooltip design pattern](https://github.com/w3c/aria-practices/issues/128); [Issue #127 — Tooltip pattern example](https://github.com/w3c/aria-practices/issues/127)
- [ARIA APG Read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Deque University: Tooltip](https://dequeuniversity.com/library/aria/tooltip), [Deque: Tooltip dialog](https://dequeuniversity.com/library/aria/tooltip-dialog)
- [IBM Carbon — Tooltip accessibility](https://carbondesignsystem.com/components/tooltip/accessibility/)
- [USWDS — Tooltip](https://designsystem.digital.gov/components/tooltip/); [USWDS — Tooltip accessibility tests](https://designsystem.digital.gov/components/tooltip/accessibility-tests/) (manual WCAG 2.1 AA matrix; retest in product context)
- [Red Hat — Tooltip accessibility](https://ux.redhat.com/elements/tooltip/accessibility/)
- [Inclusive Components: Tooltips and toggletips](https://inclusive-components.design/tooltips-toggletips/)
- [CSS-Tricks: CSS anchor positioning guide](https://css-tricks.com/css-anchor-positioning-guide/)
- [MDN: CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)
- [React Spectrum: Tooltip — interactions, accessibility notices, TooltipTrigger props](https://react-spectrum.adobe.com/Tooltip)
- Spectrum design: [Contextual help](https://spectrum.adobe.com/page/contextual-help/); React Spectrum: [`ContextualHelp`](https://react-spectrum.adobe.com/ContextualHelp); 1st-gen: [`sp-contextual-help` README](../../../../1st-gen/packages/contextual-help/README.md)
- WCAG **2.2**: [Understanding](https://www.w3.org/WAI/WCAG22/Understanding/) (topics cited above)
- 1st-gen: [`Tooltip.ts`](../../../../1st-gen/packages/tooltip/src/Tooltip.ts), [`HoverController.ts`](../../../../1st-gen/packages/overlay/src/HoverController.ts) (description wiring), [`OverlayStack.ts`](../../../../1st-gen/packages/overlay/src/OverlayStack.ts) (Escape closes `hint` overlays)
- Tooltip [rendering-and-styling migration](./rendering-and-styling-migration-analysis.md); Popover [accessibility migration analysis](../popover/accessibility-migration-analysis.md)
- 2nd-gen guides: [Semantic HTML and ARIA](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx), [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx), [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)
- Adobe Jira (**1st-gen** snapshot table): [Related 1st-gen accessibility](#related-1st-gen-accessibility-jira)
