<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Tooltip / Tooltip accessibility migration analysis

<!-- Document title (editable) -->

# Tooltip accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Quick scan](#quick-scan)
    - [Verified gap in today’s Tooltip (`sp-tooltip`)](#verified-gap-in-todays-tooltip-sp-tooltip)
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

This guide explains accessibility for the planned 2nd gen Tooltip (`swc-tooltip`, final tag name may change). The target standard is WCAG **2.2 Level AA**.

### Quick scan

1. Keep placement **predictable and testable** for users. Near-term overlay and Tooltip delivery still leans on **JavaScript placement** (for example **Floating UI** in Ruben’s overlay/popover work)—not **CSS anchor positioning** as the default yet, because anchor support is still uneven across browsers and gaps remain (caret alignment, collision refinement). Treat deep positioning stack choices as **[rendering-and-styling migration](./rendering-and-styling-migration-analysis.md)** scope; this doc stays focused on **roles, names, keyboard, pointer, and SR behavior**. **[MDN anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)** and the [CSS-Tricks anchor positioning guide](https://css-tricks.com/css-anchor-positioning-guide/) stay useful background for where CSS may eventually reduce JS.
2. Give everyone a fair path—not only hover. Keyboard users need the same cue when an element is focused. On touch, **prefer toggletip (explicit toggle)** or a dedicated help affordance—not **`longpress`**/`triggerInteraction='longpress'` as the primary way to expose brief hints (**[SWC-2022](https://jira.corp.adobe.com/browse/SWC-2022)**, **[SWC-1465](https://jira.corp.adobe.com/browse/SWC-1465)** Notes).
3. Match established patterns ([Sarah Higley: Tooltips in the time of WCAG 2.1](https://sarahmhigley.com/writing/tooltips-in-wcag-21/), [Inclusive Components: Tooltips and toggletips](https://inclusive-components.design/tooltips-toggletips/)) where they fit.

### Verified gap in today’s Tooltip (`sp-tooltip`)

The host never sets **`role="tooltip"`** today (only the small tip glyph uses `aria-hidden="true"`). Self-managed tooltips use **`sp-overlay`** `type="hint"` with hover-only trigger wiring:

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

So touch-first tooltip open/close is not the default today. The link between trigger and tooltip text (`aria-describedby`) is handled inside **`HoverController`** (via **`sp-overlay`**). That logic splits when markup lives in different shadow/light trees—details below.

Popover-style chrome (`swc-popover`, etc.) may still wrap the visuals—see [popover roadmap](../popover/rendering-and-styling-migration-analysis.md)—but Tooltip still needs its own **`role="tooltip"`**, wiring, delays, keyboard/touch handling, Escape, and close rules.

### Also read

- Spectrum 2 visuals and markup: [Tooltip rendering and styling roadmap](./rendering-and-styling-migration-analysis.md)
- Nearby overlay pattern: [Popover accessibility migration](../popover/accessibility-migration-analysis.md) — Tooltip may reuse shell geometry; Tooltip still owns `role`, `aria` wiring, delays, **`Escape`**, keyboard/touch

### What a tooltip is

- A Tooltip is brief extra text for a **real control** someone can Tab to (for example a **button**, **link**, or **text field**). It is **not** a free-floating label you bolt onto static copy—that pattern is spelled out in the [APG Tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/).
- **Toggletips** (popover-style surfaces and derivatives) intentionally pair with a **dedicated disclosure control**; do **not** stretch Tooltip into a “button to nowhere” that exists only to open help. Prefer **`swc-popover`**, **`sp-contextual-help`**, or another popover-derived pattern when the UX needs an explicit affordance—see [Sarah Higley: Tooltips in the time of WCAG 2.1](https://sarahmhigley.com/writing/tooltips-in-wcag-21/) and [Inclusive Components: Tooltips and toggletips](https://inclusive-components.design/tooltips-toggletips/).
- While the hint shows, connect it with **`aria-describedby`**. Toggle-style variants may add **`aria-expanded`** / **`aria-controls`** (see [Inclusive Components: Tooltips and toggletips](https://inclusive-components.design/tooltips-toggletips/)).
- Keyboard focus stays on the trigger. Tooltip text is **`role="tooltip"`** and is not normally in Tab order.

### When to use something else

Pick **contextual help** when the UX is “user opens explicit help”—not “hint follows focus.” Guides:

| Use contextual help instead | Links |
| --- | --- |
| Headings, static text strips, grouped fields the user taps “help” beside, richer copy or links inside the panel | [Spectrum Contextual help](https://spectrum.adobe.com/page/contextual-help/), [`sp-contextual-help`](../../../../1st-gen/packages/contextual-help/README.md), [React Spectrum ContextualHelp](https://react-spectrum.adobe.com/ContextualHelp) vs [Tooltip](https://react-spectrum.adobe.com/Tooltip) (non-interactive layouts) |

- **Do not** treat Tooltip as **contextual help** or as a focusable **`dialog`**-style surface. Patterns that expose **interactive** bubble content, **`role="dialog"`** choreography, moving **focus inside** the popup, or a **persistent “help opens here” panel** belong in **`sp-contextual-help`**, **popover**, or **dialog**—not under **`role="tooltip"`**. See **[SWC-1465](https://jira.corp.adobe.com/browse/SWC-1465)** (**Notes**) for authoring guidance (**[APG](#pattern-in-the-apg)** non-modal dialog caveat points at the same boundary).
- Long or interactive content wears out screen reader users if forced through **`aria-describedby`** only—Deque explains why in **[Deque Tooltip](https://dequeuniversity.com/library/aria/tooltip)**. Move heavy UI to **`dialog`**, **`popover`**, or contextual help.
- Thick forms / nested controls / almost-modal flows — **[Deque tooltip dialog pattern](https://dequeuniversity.com/library/aria/tooltip-dialog)** with **`role="dialog"`**, focus passes, **`popover`**, or **`sp-contextual-help`**.
- Tooltip text repeats what **`aria-labelledby`**, **`aria-label`**, or `title` already says — use **`describeTrigger="none"`** (overlay rule) or drop **`aria-describedby`**.

### What it is not

- Contextual-help popovers are **`sp-contextual-help`**, not Tooltip—when that is what you intend, skip **`role="tooltip"`** (**[When to use something else](#when-to-use-something-else)**).
- Not a **focusable** hint or an APG **non-modal `dialog`** wrapped in Tooltip chrome—those are **contextual help** / **popover** / **`dialog`**, not Tooltip (**[When to use something else](#when-to-use-something-else)**).
- Not a menu, listbox, or full **`dialog`** with links/buttons trapped inside Tooltip chrome—those belong under **[When to use something else](#when-to-use-something-else)**.
- Not a substitute for a **visible** control when users need discoverable help—**prefer popover-derived patterns** (explicit button or info icon that opens **`aria-expanded`** content) instead of a Tooltip that is the only visible cue. **`aria-labelledby`** from tooltip copy onto an **icon-only button** can satisfy the **accessible name** in narrow cases ([Carbon Tooltip accessibility](https://carbondesignsystem.com/components/tooltip/accessibility/)), but product guidance here is still: **default to popover/contextual help** so the affordance and **`role`** story stay distinct from **`role="tooltip"`** supplementary text.

### Related

- 1st-gen: [`sp-overlay`](../../../../1st-gen/packages/overlay/README.md) **`type="hint"`** plus [`overlay-trigger`](../../../../1st-gen/packages/overlay/overlay-trigger.md) handle stacking plus **`aria-describedby`** heuristics today.
- 2nd-gen: keep placement implementation aligned with **[Tooltip rendering and styling](./rendering-and-styling-migration-analysis.md)** (overlay/Floating UI roadmap today); revisit **CSS anchor positioning** when browser support and caret/collision behavior meet product bars.

---

## ARIA and WCAG context

### Pattern in the APG

Follow the **[APG Tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)**. Treat the banner on that page as real—it is marked draft / **work in progress** and consensus can change. Watch GitHub for updates: [#128 draft text](https://github.com/w3c/aria-practices/issues/128), [#127 examples](https://github.com/w3c/aria-practices/issues/127).

- **Roles.** The hint uses **`role="tooltip"`**. The trigger links to it via **`aria-describedby`** while it shows. Keep visibility in sync (**`aria-hidden`**, **`inert`**) and allow **`Escape`** to close (**APG keyboard**).
- **Focus.** Tooltip text does **not** sit in Tab order (**APG** quote: “Tooltip widgets do not receive focus”). Focus stays on the trigger until you ship a richer **`dialog`/popover**.
- **Keyboard rhythm.** Hint tracks focus/blur behavior from APG—if opened via focus it drops on blur; if opened via hover it stays until pointer leaves trigger **or tooltip bubble**—shape hit targets so testers can glide between them ([Deque Tooltip](https://dequeuniversity.com/library/aria/tooltip) aligns).
- **Delay.** Hint after brief delay (**APG**)—mirror Spectrum warmup/delay knobs (see **[Interaction](#interaction-pointer-keyboard-and-touch)** + [React Spectrum Tooltip](https://react-spectrum.adobe.com/Tooltip)).
- **Interactive popups.** No links/buttons/traps inside pure Tooltip (**APG**). When the APG points to a **non-modal `dialog`** for popups with focusable internals, read that as **contextual help** / **popover** / **`dialog`** in this repo—not a Tooltip upgrade path ([Deque tooltip dialog](https://dequeuniversity.com/library/aria/tooltip-dialog); **[When to use something else](#when-to-use-something-else)**).

More demos and patterns:

- **[Deque Tooltip](https://dequeuniversity.com/library/aria/tooltip)** — hover/focus dwell + **`Escape`**
- **[Sarah Higley: Tooltips in the time of WCAG 2.1](https://sarahmhigley.com/writing/tooltips-in-wcag-21/)** — tooltip vs toggletip, dismissal, WCAG **1.4.13** framing
- **[Inclusive Components](https://inclusive-components.design/tooltips-toggletips/)** — toggletip/touch fills gaps where hover misses

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Use of color (1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | Do not rely on color **`variant`** alone—add readable words/icons; same spirit as [USWDS general tests](https://designsystem.digital.gov/components/tooltip/accessibility-tests/) and [non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) cues. |
| [Contrast minimum (1.4.3)](https://www.w3.org/TR/WCAG22/#contrast-minimum) | Tooltip text reaches **≥4.5:1** against its own background for normal-sized copy. |
| [Non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | Tooltip rim/tip/outline meets **≥3:1** against the nearby page—not just text vs tooltip fill ([USWDS checklist](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)). |
| [Content on hover or focus (1.4.13)](https://www.w3.org/TR/WCAG22/#content-on-hover-or-focus) | **`Escape`** closes hint without dragging focus elsewhere. Users can hover onto bubble safely ([APG](#pattern-in-the-apg), [USWDS](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)). Close cleanly on blur for focus mode; supply touch-dismiss paths too. Keep the bubble available until the user dismisses it (**no arbitrary auto-timeout**) or the hint is **no longer valid** (for example a loading state finished). |
| [Resize text (1.4.4)](https://www.w3.org/TR/WCAG22/#resize-text) / [Reflow (1.4.10)](https://www.w3.org/TR/WCAG22/#reflow) | At browser **200%** zoom tooltip + trigger remain readable—bubble hides nothing vital ([USWDS zoom bundle](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)). Use **`position-try-fallbacks`** plus short copy guidance ([Deque Tooltip](https://dequeuniversity.com/library/aria/tooltip)). |
| [Info and relationships (1.3.1)](https://www.w3.org/TR/WCAG22/#info-and-relationships) / [Meaningful sequence (1.3.2)](https://www.w3.org/TR/WCAG22/#meaningful-sequence) | Hear trigger first, tooltip second—in natural order ([USWDS SR tests](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)). |
| [Pointer gestures (2.5.1)](https://www.w3.org/TR/WCAG22/#pointer-gestures) / [Target size (2.5.8)](https://www.w3.org/TR/WCAG22/#target-size-minimum) | Touch users lack hover—expose **toggle/toggletip** (or an explicit help control) before relying on **`longpress`**; sized targets meet Spectrum minimums/exceptions docs. See **[SWC-2022](https://jira.corp.adobe.com/browse/SWC-2022)** / **[SWC-1465](https://jira.corp.adobe.com/browse/SWC-1465)** (**Notes**). |
| [Keyboard (2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | Tab-to-trigger shows tooltip for keyboard paths—never hover-only UX. |
| [No keyboard trap (2.1.2)](https://www.w3.org/TR/WCAG22/#no-keyboard-trap) | **`Tab`** still passes Tooltip host while bubble shows—no stuck focus cage ([USWDS keyboard](https://designsystem.digital.gov/components/tooltip/accessibility-tests/), [APG](#pattern-in-the-apg)). |
| [Focus order (2.4.3)](https://www.w3.org/TR/WCAG22/#focus-order) / [Focus visible (2.4.7)](https://www.w3.org/TR/WCAG22/#focus-visible) | Clear focus ring during keyboard open; Tooltip element itself stays outside Tab loops. |
| [Name, role, value (4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | Tooltip uses **`aria-describedby`** pairings; toggles add **`aria-expanded`/`aria-controls`** patterns per [Inclusive Components](https://inclusive-components.design/tooltips-toggletips/). |
| [Orientation (1.3.4)](https://www.w3.org/TR/WCAG22/#orientation) | Respect RTL/rotation—keep tips anchored neatly next to triggers. |
| [Animation from interactions (2.3.3)](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions) | Honor `prefers-reduced-motion` for open/close motion. |

**Note:** USWDS tests cite WCAG **2.1 AA** wording; Spectrum still shoots for **WCAG 2.2 AA** (`## Overview`)—overlap is strong—track any extra **2.2** checks separately in product QA.

**Bottom line.** Ship **`role="tooltip"`**, stop hover-only overlays, keep placement predictable (see **[rendering-and-styling migration](./rendering-and-styling-migration-analysis.md)** for Floating UI vs future anchors), and push heavy UI toward dialogs/popovers ([Deque tooltip dialog](https://dequeuniversity.com/library/aria/tooltip-dialog)).

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary | Notes |
| --- | --- | --- | --- | --- | --- |
| [SWC-1558](https://jira.corp.adobe.com/browse/SWC-1558) | Bug | To Do | Unresolved | Tooltip is missing **`role="tooltip"`** | Confirms gap vs APG—2nd-gen must fix on surfaced node. Implementation must **not** smuggle **`dialog`** semantics or focusable panels into **`role="tooltip"`**; that UX is **`sp-contextual-help`** / popover/dialog (**[When to use something else](#when-to-use-something-else)**). |
| [SWC-1465](https://jira.corp.adobe.com/browse/SWC-1465) | Story | To Do | Unresolved | Docs: **`aria-describedby`** guidance for Tooltip | Tie to **`describeTrigger`/`none`** and cross-root **`HoverController`** behavior. Document Tooltip vs **`sp-contextual-help`**: **no focusable-tooltip / tooltip-as-dialog pattern**. For touch: **prefer toggletip (`aria-expanded`/`aria-controls`)** over **`longpress`** / **`triggerInteraction='longpress'`** for supplementary hints; align overlay + directive docs (**[Interaction](#interaction-pointer-keyboard-and-touch)**). |
| [SWC-2022](https://jira.corp.adobe.com/browse/SWC-2022) | Story | To Do | Unresolved | Tooltip: implement accessibility features | **Cross-program ticket** (typically **`gen2`**-labelled migration work). Tracks shipping toggletip-first touch and shrinking reliance on **`longpress`**/`overlay-trigger` for Tooltip-class hints (**[Quick scan](#quick-scan)**). See **SWC-1465** for doc-side guidance. |
| [SWC-321](https://jira.corp.adobe.com/browse/SWC-321) | Bug | To Do | Unresolved | Clicking **open**, **self-managed** tooltip on **action-button** triggers underlying button ([#3969](https://github.com/adobe/spectrum-web-components/issues/3969)) | Regression-test **hit-target layering** (**`pointer-events`**, stacking order, dismiss-on-press). Align dismiss-on-pointer behavior with React Spectrum **`shouldCloseOnPress`** ([React Spectrum Tooltip](https://react-spectrum.adobe.com/Tooltip)). |
| [SWC-324](https://jira.corp.adobe.com/browse/SWC-324) | Bug | To Do | Unresolved | Shared **`sp-tooltip`/`sp-overlay`** across buttons — content swaps but ghost position persists | Overlay must **re-anchor** when active trigger identity changes; keep placement refs keyed to the **active** trigger (see **[Positioning](#positioning-css-anchor-and-javascript-fallbacks)** + **[rendering-and-styling migration](./rendering-and-styling-migration-analysis.md)**); add perf-safe regression (**SWC-2025**). |
| [SWC-890](https://jira.corp.adobe.com/browse/SWC-890) | Bug | To Do | Unresolved | Tooltip in **ActionMenu** logs overlay warning (**#5462**) | Stacks with menu/hint overlays — validate **`OverlayTrigger`** coexistence docs + Storybook (**SWC-2026**). |
| [SWC-994](https://jira.corp.adobe.com/browse/SWC-994) | Bug | To Do | Unresolved | Tooltip **max-width** overrides **`--mod`** variable | Token/mod fidelity — fold into **Spectrum 2** visual pass (**SWC-2023**). |
| [SWC-286](https://jira.corp.adobe.com/browse/SWC-286) | Story | Done | Done | VoiceOver reads tooltip/overlay content | Carry forward SR passes for supplementary description vs duplication on focus. |
| [SWC-1603](https://jira.corp.adobe.com/browse/SWC-1603) | Bug | Done | Fixed | **Self-managed** tooltip logs **`TRAVERSAL_EXHAUSTED`** in valid slotted usage | Keep **`triggerElement`** override + traversal docs (**SWC-2019** plan). |

**History nuggets (already closed)**

- Tooltip wrap + browser offset bugs (**[SWC-1331](https://jira.corp.adobe.com/browse/SWC-1331)**, **[SWC-539](https://jira.corp.adobe.com/browse/SWC-539)**, **[SWC-532](https://jira.corp.adobe.com/browse/SWC-532)**, **[SWC-530](https://jira.corp.adobe.com/browse/SWC-530)**) — keep screenshots/Playwright parity wide.
- Menus stacking with Tooltip (**[SWC-681](https://jira.corp.adobe.com/browse/SWC-681)**) — remember when designing overlay stacks.
- Delayed overlays vs Tooltip warmup (**[SWC-561](https://jira.corp.adobe.com/browse/SWC-561)**) — Won’t Fix; spell integration quirks in docs.

RFC **[SWC-1674](https://jira.corp.adobe.com/browse/SWC-1674)** (**Done**) pointed overlays toward anchors first — **API/spacing tickets** (**[SWC-2021](https://jira.corp.adobe.com/browse/SWC-2021)**, **[SWC-2024](https://jira.corp.adobe.com/browse/SWC-2024)**) should honor that stance.

---

## Recommendations: `<swc-tooltip>`

Tag name may shift (`swc-tooltip` placeholder). This section lists what Tooltip must ship. Use Jira **[SWC-1558](https://jira.corp.adobe.com/browse/SWC-1558)** (**`role="tooltip"`**), **[SWC-1465](https://jira.corp.adobe.com/browse/SWC-1465)** (**authoring guidance** incl. Tooltip vs **`sp-contextual-help`** + touch model), plus **[SWC-2022](https://jira.corp.adobe.com/browse/SWC-2022)** (**implementation**/toggle-vs-**`longpress`** backlog) as anchors.

Borrow ideas from—not rules from—Carbon / Red Hat / IBM:

| Source | What to mirror inside this repo |
| --- | --- |
| [Carbon Tooltip accessibility](https://carbondesignsystem.com/components/tooltip/accessibility/) | Focus hover parity, authored strings in specs |
| [USWDS Tooltip](https://designsystem.digital.gov/components/tooltip/) + [USWDS tests](https://designsystem.digital.gov/components/tooltip/accessibility-tests/) | Usage prose + QA buckets echoed in **[Guidelines](#guidelines-that-apply)** + **[Interaction](#interaction-pointer-keyboard-and-touch)** + **`## Testing`** |
| [Red Hat Tooltip accessibility](https://ux.redhat.com/elements/tooltip/accessibility/) | Keyboard chart, dwell on bubble, **silent**/opt-out parallels |

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **`role="tooltip"`** | Prescribe on surfaced content; disallow host role swaps into menu/dialog metaphors ([Deque tooltip dialog](https://dequeuniversity.com/library/aria/tooltip-dialog)). |
| **`id`** | Stable unique id per instance so **`aria-describedby`** and **`aria-controls`** resolve deterministically. |
| **`aria-labelledby`** (unnamed triggers) | [Carbon](https://carbondesignsystem.com/components/tooltip/accessibility/) shows **`aria-labelledby`** from tooltip text onto **icon-only** triggers when that text must be the **accessible name**. Prefer a **popover-derived** disclosure (explicit control + **`aria-expanded`**) so help is not only exposed on hover/focus; reserve this wiring for legacy or tightly scoped cases where the trigger is still a **real** focusable widget. |
| **`aria-describedby` on trigger** | Present only while visibly rendered (APG rhythm). Reserve for **extra** hints when the control **already** has an obvious **name**—avoid duplicating naming strings that **`aria-labelledby`**/`aria-label` already convey (**[When to use something else](#when-to-use-something-else)**, **[What it is not](#what-it-is-not)**). Preserve **`describeTrigger="none"`** semantics from **`sp-overlay`** whenever names already announce the hint ([describeTrigger](../../../../1st-gen/packages/overlay/src/Overlay.ts)). |
| **Visibility bookkeeping** | Remove relationships when collapsed; **`inert`/`aria-hidden`** track actual presentation. **APG:** popup with focusable internals belongs in **non-modal `dialog`/popover**—**in product terms** that is **contextual help** / **popover** / **`dialog`**, not a Tooltip mode (**[APG Tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)**; **[When to use something else](#when-to-use-something-else)**). |
| **Toggletip mode** | When touch needs deterministic open/close, ship a **dedicated control** (not Tooltip pretending to be one). Expose **`aria-expanded`/`aria-controls`** per [Inclusive Components](https://inclusive-components.design/tooltips-toggletips/) and [Sarah Higley: Tooltips in the time of WCAG 2.1](https://sarahmhigley.com/writing/tooltips-in-wcag-21/). Document `trigger="toggle"` (name TBD) separately from hover+focus presets. |
| **Spectrum variants (**`neutral`/`info`/`negative`**)** | Spectrum 2 keeps **neutral**, **info**, and **negative**; **`positive`** is **deprecated**—do not introduce new **`positive`** usage in docs or examples. Visual cues only—tie semantic states (e.g. **`aria-invalid`**) through explicit authoring guidance rather than silent auto-mapping; pair hue with legible text so meaning never relies on color alone (**[USWDS general](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)** / **1.4.1** in [Guidelines that apply](#guidelines-that-apply)). |

### Shadow DOM and cross-root ARIA Issues

`HoverController.prepareDescription` toggles **`aria-describedby`** paths when Tooltip, overlay, or trigger live in mismatched DOM roots (**`prepareOverlayRelativeDescription`** vs **`prepareContentRelativeDescription`** in [`HoverController.ts`](../../../../1st-gen/packages/overlay/src/HoverController.ts)). For **`swc-tooltip`**, keep ids stable—or document helper APIs—so screen reader testers always find the pairing.

### Accessibility tree expectations

- Default hover/focus-visible path binds tooltip id via **`aria-describedby`** even when browse/virtual cursors skim past the floated bubble early.
- Hiding Tooltip from AT (Red Hat **`silent`** demo on **[`<rh-tooltip>`](https://ux.redhat.com/elements/tooltip/accessibility/)**) means you owe another audible label (**`aria-label`**, **`aria-labelledby`**, off-screen span, sparing **`aria-live`**). **`describeTrigger="none"`** needs the same double-check—verify the trigger still exposes every word users rely on before launch.
- Toggletip buttons advertise **`aria-expanded`/`aria-controls`** while tooltip keeps **`role="tooltip"`** (or sibling region)—write down when that diverges from pure APG add-on semantics.
- Self-managed lookups mirror `Tooltip.resolveSelfManagedTriggerElement`—prefer explicit **`triggerElement`** on twisty layouts to dodge noisy **`TRAVERSAL_EXHAUSTED`** (**[SWC-1603](https://jira.corp.adobe.com/browse/SWC-1603)**) and **[SWC-2027](https://jira.corp.adobe.com/browse/SWC-2027)** migrations.

### Form-associated custom properties (labels, `ElementInternals`)

**Does not apply.** Tooltip is not a **[form-associated custom element](https://html.spec.whatwg.org/multipage/custom-elements.html#form-associated-custom-element)**; associated inputs keep their **`ElementInternals`**/`label` contracts while tooltip offers supplemental hints via **`aria-describedby`** only. The heading stays so this file lines up with sibling **accessibility migration analysis** docs and the **accessibility-migration-analysis** contributor skill (template subsections that do not apply keep the heading and a short rationale).

### Live regions, loading, and announcements

**Does not apply.** Avoid `aria-live` flips during routine hint toggles—stick to relational ARIA (**`aria-describedby`**) and button/toggletip state. **`aria-live="assertive"`** remains unacceptable for supplementary hints. Same “keep the heading” convention as **Form-associated** above.

### Motion (dedicated recommendations subsection)

**Intentionally omitted.** **Reduced-motion** expectations sit in [Guidelines that apply](#guidelines-that-apply); tooltip is **not** a loading/progress meter.

### Positioning: CSS anchor and JavaScript fallbacks

**Scope note.** Placement math, Floating UI vs overlay stacks, and future **CSS anchor positioning** experiments live in **[Tooltip rendering and styling](./rendering-and-styling-migration-analysis.md)** and **[Popover accessibility](../popover/accessibility-migration-analysis.md)**. This subsection only records **a11y-adjacent** expectations (predictability, re-anchor when triggers swap, zoom safety).

| Topic | What to do |
| --- | --- |
| Primary mechanism (today) | Ship **predictable** placement via the overlay/Floating UI plan the rendering doc tracks; do not promise pure **CSS anchor positioning** as the default Tooltip strategy until browser support and caret/collision polish meet product bars. **[MDN anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)** + [CSS-Tricks guide](https://css-tricks.com/css-anchor-positioning-guide/) remain forward-looking references. |
| JavaScript allowances | Use JS when collision logic beats declarative **`@position-try`**, clipping needs lifted layers, or active trigger swaps need re-anchor (**[SWC-324](https://jira.corp.adobe.com/browse/SWC-324)**). Do not silently fall back to the old overlay teleport every time. |
| RTL / Spectrum placement vocabulary | Map `start`/`end`; mirror **[SWC-917 popover precedent](https://jira.corp.adobe.com/browse/SWC-917)** for parity. Older Firefox/Safari tip bugs (**[SWC-539](https://jira.corp.adobe.com/browse/SWC-539)** / **[SWC-532](https://jira.corp.adobe.com/browse/SWC-532)** / **[SWC-530](https://jira.corp.adobe.com/browse/SWC-530)**) proved we still need screenshots—logical CSS alone misses pixels. |
| **`--mod`**, max-width, long text | Respect mods (**[SWC-994](https://jira.corp.adobe.com/browse/SWC-994)**) + wrapping (**[SWC-1331](https://jira.corp.adobe.com/browse/SWC-1331)** Done) inside Spectrum 2 fidelity (**[SWC-2023](https://jira.corp.adobe.com/browse/SWC-2023)**). QA: zoom **≈200%** so Tooltip never hides critical UI (**[USWDS magnification prompts](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)**, [Guidelines](#guidelines-that-apply)). |

### Interaction: pointer, keyboard, and touch

| Topic | What to do |
| --- | --- |
| Keyboard | Follow **[APG Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)** + peers ([Red Hat](https://ux.redhat.com/elements/tooltip/accessibility/), [Carbon Tooltip accessibility](https://carbondesignsystem.com/components/tooltip/accessibility/)): **`Escape`** hides hint without ripping focus elsewhere; **`Tab`** blur dismisses keyboard-open bubbles; Tooltip never equals **`document.activeElement`**. 1st gen closes hints on **`Escape`** via [`OverlayStack.ts`](../../../../1st-gen/packages/overlay/src/OverlayStack.ts). Sync `:focus-visible` affordances elsewhere in this guide. |
| Pointer hover | Add Spectrum-style warmup/cooldown (React **`delay`** knobs) and let mice slide onto Tooltip text (**Deque keepTooltipOnMouseOver**, [Red Hat dwell](https://ux.redhat.com/elements/tooltip/accessibility/), **[USWDS 1.4.13](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)**). **[SWC-561](https://jira.corp.adobe.com/browse/SWC-561)** (Won't Fix) warns integrators mixing delayed overlays vs Tooltip warmup—capture that pairing in docs—not a Tooltip bug alone. |
| Touch | Do not pretend “desktop-only Tooltip.” **Recommend toggletip / explicit toggle** (and sized tap targets) for supplementary hints. Treat **`longpress`** + **`triggerInteraction='longpress'`** (see [`overlay-trigger`](../../../../1st-gen/packages/overlay/overlay-trigger.md), [`tooltip-directive`](../../../../1st-gen/packages/tooltip/tooltip-directive.md)) as **legacy/low-priority**, not the default Tooltip story—track delivery in **[SWC-2022](https://jira.corp.adobe.com/browse/SWC-2022)** + doc carve-outs in **[SWC-1465](https://jira.corp.adobe.com/browse/SWC-1465)**. Test on emulator hardware. |
| Menu / stacking | Maintain Storybook/E2E glue when Tooltip overlaps buttons/menus (**[SWC-321](https://jira.corp.adobe.com/browse/SWC-321)**, **[SWC-681](https://jira.corp.adobe.com/browse/SWC-681)**, **[SWC-890](https://jira.corp.adobe.com/browse/SWC-890)**) so clicks never bleed through overlays (**SWC-2026** narration). |
| Host surface | Triggers ought to be Tab-focusable (**[RH static warning](https://ux.redhat.com/elements/tooltip/accessibility/)**). **`disabled`** items that still expose help must remain focus-plausible or reroute authors to contextual help ([React Spectrum non-interactive](https://react-spectrum.adobe.com/Tooltip), **[when to use something else](#when-to-use-something-else)**). |

**Carbon** keeps “definition Tooltip” (**Enter**/`Space`-not-required) alongside normal icon-only buttons ([Carbon Tooltip accessibility](https://carbondesignsystem.com/components/tooltip/accessibility/)). Label Storybook stories so testers know which mode they poke.

Translate React TooltipTrigger props (**`open`**, **`delay`**, **`shouldCloseOnPress`**, **`trigger="focus"`**, safe **`defaultOpen`**) straight into **`swc`** parity—see **[React Spectrum Tooltip docs](https://react-spectrum.adobe.com/Tooltip)**.

### Keyboard and focus

- Supplementary Tooltip keeps focus anchored to trigger; **`Escape`** aligns with **Deque**, **`OverlayStack`**, **Red Hat**, **Carbon**, and **[USWDS Esc tests](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)** unless authors ship dialogs instead.
- Toggletips only alter Tab hops when nested controls exist—else stay additive description mode.
- Self-managed combos reuse **`resolveSelfManagedTriggerElement`** + optional **`triggerElement`** from **`Tooltip.ts`**, mirroring **`sp-tooltip`** today.

---

## Testing

Use **[USWDS Tooltip accessibility tests](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)** as your checklist headings—each row lines up with this doc:

1. **Look & contrast.** Color carries meaning plus text (**1.4.1**), text contrasts with bubble (**4.5:1**), bubble edge contrasts page (**≥3:1**) — see **[Guidelines](#guidelines-that-apply)**.
2. **Hover & focus.** Pointer can move trigger → bubble (**1.4.13**). **`Escape`** closes without bouncing focus oddly. No surprise **auto-dismiss timers** unless the hint truly becomes invalid.
3. **Zoom.** Browser zoom **≈200%** still readable / does not bury page chrome — same prompts as **[USWDS zoom](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)**.
4. **Keyboard.** **`Tab`** shows Tooltip, **`Tab`** onward closes, traps never form, focus ring noticeable — echoes keyboard block on **USWDS** + **[Recommendations](#recommendations-swc-tooltip)**.
5. **Screen reader.** Announce trigger wording first, Tooltip second (**1.3.1**, **1.3.2**) plus **[manual steps below](#manual-and-screen-reader-testing)**.

Automated suites only cover slices of Tooltip behavior—remember **[USWDS](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)** tests widgets on their own. Teams must replay those buckets inside real product shells for Section 508 sign-off too. Everyday wording also appears in **[USWDS Tooltip overview](https://designsystem.digital.gov/components/tooltip/)** alongside **[Recommendations](#recommendations-swc-tooltip)**.

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit / component** | Every mode (**hover**, **focus-visible**, **toggletip/toggle**, and—where retained—**`longpress`**) flips **`aria-describedby`/`aria-expanded`**. `describeTrigger="none"` never orphan ids. Simulate **`Tab`** / **`Escape`** + bubble dwell (**1.4.13**) where unit harness allows. Prioritize regressions affecting **toggle** paths over **`longpress`** stacking (**[SWC-2022](https://jira.corp.adobe.com/browse/SWC-2022)**). |
| **aXe + Storybook** | Catch duplicate `aria-*`, forbidden interactives inside **`role="tooltip"`**, tint/touch regressions feeding **[USWDS general](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)** rows once tokens render. |
| **Playwright snapshots** | Snapshot **placement** for **`swc-action-button`** + Tooltip across browsers; regress historical Safari/Firefox offsets (**[SWC-539](https://jira.corp.adobe.com/browse/SWC-539)**, **[SWC-532](https://jira.corp.adobe.com/browse/SWC-532)**, **[SWC-530](https://jira.corp.adobe.com/browse/SWC-530)**); retarget overlays when triggers swap (**[SWC-324](https://jira.corp.adobe.com/browse/SWC-324)**). Sweep doc backlog (**[SWC-420](https://jira.corp.adobe.com/browse/SWC-420)**, **[SWC-421](https://jira.corp.adobe.com/browse/SWC-421)**, **[SWC-166](https://jira.corp.adobe.com/browse/SWC-166)**) into **[SWC-2025](https://jira.corp.adobe.com/browse/SWC-2025)** bundles. Toss in **viewport ≈200%** smoke so Tooltip never overlaps vital UI (**[USWDS zoom](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)** parity). |

### Playwright-only or host-only accessibility gates

Gates matter when Tooltip nests beside real widgets—thin demo frames skip hardest cases. **[USWDS isolation note](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)** means automated gates **plus** human passes must still run inside production-like layouts.

### Manual and screen reader testing

Manual flow (paired with **[Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)** Browse vs Focus notes):

1. Trigger speech first, Tooltip second (**[USWDS SR list](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)**, [Guidelines](#guidelines-that-apply)).
2. Keyboard users hear hints on **`Tab`** focus—not only hover; **toggletip/toggle** flows cover handheld (test **`longpress`** only where product still exposes it (**[SWC-2022](https://jira.corp.adobe.com/browse/SWC-2022)**)).
3. Walk **`Tab`**, **`Escape`**, dwell-on-bubble, and **200% zoom** cues straight from **[USWDS manual matrix](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)** whenever Tooltip ships broadly.
4. Carry VoiceOver lineage from **[SWC-286](https://jira.corp.adobe.com/browse/SWC-286)** when arguing **`aria-describedby`** output vs duplication.

---

## Summary checklist

- [ ] Ship Tooltip with **`role="tooltip"`**, stable **`id`**, clean **`aria-describedby`**, and documented **`describeTrigger`/opt-outs** (**[SWC-1558](https://jira.corp.adobe.com/browse/SWC-1558)**, **[SWC-1465](https://jira.corp.adobe.com/browse/SWC-1465)**/**[SWC-2022](https://jira.corp.adobe.com/browse/SWC-2022)**).
- [ ] Cover hover, focus, touch, and keyboard timelines that mirror **Deque** + internal guides.
- [ ] Align Tooltip placement docs with **Floating UI / overlay** roadmap in **[rendering-and-styling migration](./rendering-and-styling-migration-analysis.md)**; treat **CSS anchor positioning** as follow-up once browser support + caret/collision gaps close (**[guide](https://css-tricks.com/css-anchor-positioning-guide/)**).
- [ ] Split toggletip **`aria-expanded`/`aria-controls`** plans from **`aria-describedby`-only** hints.
- [ ] Confirm **`Escape`** closes hints without trapping focus.
- [ ] Automated suites exercise shadow/light **`aria-describedby`**, stacking/hit-testing (**[SWC-321](https://jira.corp.adobe.com/browse/SWC-321)**, **[SWC-890](https://jira.corp.adobe.com/browse/SWC-890)**), overlay re-anchor (**[SWC-324](https://jira.corp.adobe.com/browse/SWC-324)**) under **[SWC-2025](https://jira.corp.adobe.com/browse/SWC-2025)** umbrellas.
- [ ] Manual **[screen reader](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)** plus keyboard + USWDS buckets (**general / zoom / keyboard / SR**) inside **live product chrome**, not story shells alone (**[USWDS tests](https://designsystem.digital.gov/components/tooltip/accessibility-tests/)**).
- [ ] Keep **[Related 1st-gen accessibility](#related-1st-gen-accessibility-jira)** table fresh as Jira changes (default: skip standalone **`gen2`**-only mirrors—keep **[SWC-2022](https://jira.corp.adobe.com/browse/SWC-2022)** here as the Tooltip a11y program anchor for toggle vs **`longpress`** work).

---

## References

- [ARIA APG Tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- **`w3c/aria-practices` (APG source discussions):** [Issue #128 — Draft tooltip design pattern](https://github.com/w3c/aria-practices/issues/128); [Issue #127 — Tooltip pattern example](https://github.com/w3c/aria-practices/issues/127)
- [ARIA APG Read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Deque University: Tooltip](https://dequeuniversity.com/library/aria/tooltip), [Deque: Tooltip dialog](https://dequeuniversity.com/library/aria/tooltip-dialog)
- [IBM Carbon — Tooltip accessibility](https://carbondesignsystem.com/components/tooltip/accessibility/)
- [USWDS — Tooltip](https://designsystem.digital.gov/components/tooltip/); [USWDS — Tooltip accessibility tests](https://designsystem.digital.gov/components/tooltip/accessibility-tests/) (manual WCAG 2.1 AA matrix; retest in product context)
- [Red Hat — Tooltip accessibility](https://ux.redhat.com/elements/tooltip/accessibility/)
- [Sarah Higley — Tooltips in the time of WCAG 2.1](https://sarahmhigley.com/writing/tooltips-in-wcag-21/)
- [Inclusive Components: Tooltips and toggletips](https://inclusive-components.design/tooltips-toggletips/)
- [CSS-Tricks: CSS anchor positioning guide](https://css-tricks.com/css-anchor-positioning-guide/)
- [MDN: CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)
- [React Spectrum: Tooltip — interactions, accessibility notices, TooltipTrigger props](https://react-spectrum.adobe.com/Tooltip)
- Spectrum design: [Contextual help](https://spectrum.adobe.com/page/contextual-help/); React Spectrum: [`ContextualHelp`](https://react-spectrum.adobe.com/ContextualHelp); 1st-gen: [`sp-contextual-help` README](../../../../1st-gen/packages/contextual-help/README.md)
- WCAG **2.2**: [Understanding](https://www.w3.org/WAI/WCAG22/Understanding/) (topics cited above)
- 1st-gen: [`Tooltip.ts`](../../../../1st-gen/packages/tooltip/src/Tooltip.ts), [`HoverController.ts`](../../../../1st-gen/packages/overlay/src/HoverController.ts) (description wiring), [`OverlayStack.ts`](../../../../1st-gen/packages/overlay/src/OverlayStack.ts) (Escape closes `hint` overlays)
- Tooltip [rendering-and-styling migration](./rendering-and-styling-migration-analysis.md); Popover [accessibility migration analysis](../popover/accessibility-migration-analysis.md)
- 2nd-gen guides: [Semantic HTML and ARIA](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx), [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx), [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)
- Adobe Jira (**1st-gen** snapshot table + Tooltip a11y program cross-ref): [Related 1st-gen accessibility](#related-1st-gen-accessibility-jira)
