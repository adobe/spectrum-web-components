<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Text Field / Text field accessibility migration analysis

<!-- Document title (editable) -->

# Text field accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What it is](#what-it-is)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
    - [Related](#related)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-text-field>`](#recommendations-swc-text-field)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc tells you how **`swc-text-field`** should work for **accessibility**. It matches the goal of **WCAG 2.2 Level AA**. `swc-text-field` is the 2nd-gen replacement for the single-line configuration of 1st-gen `sp-textfield`. Multiline (`sp-textfield[multiline]`) becomes its own component, [`swc-text-area`](../text-area/accessibility-migration-analysis.md), matching [React Spectrum's `TextField`](https://react-spectrum.adobe.com/TextField) / [`TextArea`](https://react-spectrum.adobe.com/TextArea) split. This doc and the text-area doc share most of their ARIA and form-association guidance; each calls out only what differs.

2nd-gen also retires `sp-field-label` and `sp-help-text` as separate components that a field associates with externally. Instead, the **`LabellingController`** ([SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466)) renders the label, help text, and error message directly inside `swc-text-field`'s own shadow root, using a shared, stateless render directive plus a shared stylesheet — the same structural pattern `PendingController` already uses for the pending spinner (see [`renderPendingSpinner`](../../../../2nd-gen/packages/core/directives/pending-spinner/src/pending-spinner.ts)). This is a significant change from the cross-root association model 1st-gen uses; see [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues) for why it matters.

### Also read

- [Textfield and Textarea migration roadmap](../textfield/rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM changes (still filed under the combined 1st-gen `textfield/` folder pending a rendering-doc split).
- [Text area accessibility migration analysis](../text-area/accessibility-migration-analysis.md) for the multiline sibling.

### What it is

- A **single-line text input** that collects a short custom string (name, email, job title). The accessible semantics come from a real `<input type="text">` in the component's shadow root; `swc-text-field` does not set a host-level ARIA role.
- Its visible label, help text, and error message are rendered directly inside `swc-text-field`'s own shadow root by the `LabellingController` — not by an externally associated `swc-field-label`/`swc-help-text` component. The visible label is slotted content, rendered as a real, same-root `<label>`; an `accessible-label` property (this project's established `accessible-label` → `aria-label` pattern) sets the accessible name directly when no visible label is slotted. Help/error content arrives via slots; the controller and its shared render directive produce the label, required-indicator, and help-text markup from that input.

### When to use something else

- Longer-form input (comments, descriptions) — use [`swc-text-area`](../text-area/accessibility-migration-analysis.md), not a wide `swc-text-field`.
- A closed set of choices — use a picker, combobox, or radio group; a text field is for open-ended text.
- A number-only value with stepping — use number field, not `type="number"` on a text field (1st-gen already carries a `type="number"` styling hook that is out of scope for this doc).

### What it is not

- Not a combobox or autocomplete widget. 1st-gen widens the `autocomplete` property's type to include `'list'`/`'none'` "to support the combobox accessibility pattern" — that coupling exists so a *different* component can reuse the type, not because `swc-text-field` itself implements combobox behavior. Do not carry that type-widening into 2nd-gen; each component should own its own `autocomplete` type.

### Related

- 1st-gen [`sp-field-label`](../../../../1st-gen/packages/field-label/README.md) and [`sp-help-text`](../../../../1st-gen/packages/help-text/README.md) are being retired as standalone 2nd-gen components for this use case. Their visual output (label text, required asterisk, help/error text and icon) moves into a shared, stateless render directive that `LabellingController` calls from inside `swc-text-field`'s own template, paired with a shared stylesheet — not a separate custom element a consumer slots in. [SWC-1316](https://jira.corp.adobe.com/browse/SWC-1316) (aligning slotted field-label CSS with the standalone component) is the direct predecessor of this shared-stylesheet work.
- [`LabellingController`](https://jira.corp.adobe.com/browse/SWC-2466) and [`FieldAssociationController`](https://jira.corp.adobe.com/browse/SWC-2467) — the two shared controllers this component depends on (see [Recommendations](#recommendations-swc-text-field)).

---

## ARIA and WCAG context

### Pattern in the APG

- The [APG](https://www.w3.org/WAI/ARIA/apg/) does not list a "text field" widget pattern. A single-line text field has a native HTML equivalent (`<input type="text">`) with an implicit `textbox` role, so the APG's guidance here is "use the native element" rather than a hand-built pattern. `swc-text-field` should keep that native element as the thing assistive technology actually interacts with, per the [APG "read me first"](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) principle of preferring native semantics over ARIA when a native element does the job.
- Because the native `<input>` supplies the role, `swc-text-field` satisfies the project's single-host-role policy automatically: there is exactly one role (`textbox`), it is never conditional, and it is not set by `swc-text-field`'s own code — it is inherited from the browser's mapping of the inner element. No dual-role prompt is needed here; the field/area split the user already chose is the same split this policy would have recommended if 1st-gen `sp-textfield` had instead tried to expose two different roles from one host.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Info and relationships (1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | Label, help text, and error message must be programmatically associated with the input, not just visually adjacent. |
| [Identify input purpose (1.3.5)](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html) | When the field collects a common personal-data type (name, email, address), set the matching `autocomplete` token. 1st-gen was missing this until [SWC-1176](https://jira.corp.adobe.com/browse/SWC-1176); 2nd-gen should keep the fix and consider adding `inputmode` (not present in 1st-gen) to match [React Spectrum's `inputMode`](https://react-spectrum.adobe.com/TextField). |
| [Labels or instructions (3.3.2)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html) and [Label in name (2.5.3)](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) | Every field needs a real, stable accessible name. Placeholder text is not a substitute — it disappears once a value is entered and is easy to truncate, so it must not be the only source of the accessible name. |
| [Error identification (3.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) | When `invalid`, the error message text must be both visible and exposed via `aria-describedby`, not conveyed by color or an icon alone. |
| [Non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | Border and focus-ring contrast need to meet 3:1 against adjacent colors. 1st-gen's [SWC-214](https://jira.corp.adobe.com/browse/SWC-214) was marked Won't Fix under the old theme; re-evaluate against Spectrum 2 tokens rather than assuming the old disposition still holds. |
| [Focus visible (2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | Keyboard focus needs a visible indicator distinct from mouse/pointer interaction. The rendering-and-styling doc already flags that 1st-gen does not differentiate keyboard focus from pointer focus in the input's styling — that gap is a focus-visible risk, not just a cosmetic one. |
| [Status messages (4.1.3)](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | If help text or an error message appears without the user moving focus, a screen reader needs some way to learn about it — but that does not mean every help-text region should be an `aria-live` region by default (see [ARIA roles, states, and properties](#aria-roles-states-and-properties)). |
| [Content on hover or focus (1.4.13)](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html) | Does not apply the way it did in 1st-gen. 2nd-gen drops the custom hover/focus tooltip for truncated values (see **Truncated value** in [ARIA roles, states, and properties](#aria-roles-states-and-properties)) in favor of the native `title` attribute, whose presentation is user-agent-controlled and out of this criterion's scope — matching [React Spectrum's explicit guidance against tooltips on text fields](https://github.com/adobe/react-spectrum/wiki/Frequently-Asked-Questions-(FAQs)). |

**Bottom line:** the native `<input>` already supplies role and most keyboard behavior; the accessibility work for `swc-text-field` is almost entirely about correctly rendering the label, help text, and error message inside the field's own shadow root and wiring their same-root ARIA associations correctly, and about making sure the JS layer (`LabellingController`, `FieldAssociationController`) never contradicts the native semantics it's built on top of.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-1870](https://jira.corp.adobe.com/browse/SWC-1870) | Bug | To Do | Unresolved | Pressing <kbd>Esc</kbd> during a rename discards the edit instead of cancelling IME composition first |
| [SWC-1316](https://jira.corp.adobe.com/browse/SWC-1316) | Story | Done | Fixed | Align slotted field label CSS styling with the standalone field-label component |
| [SWC-1208](https://jira.corp.adobe.com/browse/SWC-1208) | Story | Done | Done | [Docs] Create migration documentation for text field/area, search, number field, color field |
| [SWC-1176](https://jira.corp.adobe.com/browse/SWC-1176) | Bug | Done | Fixed | Missing input-purpose identification on `sp-textfield` ([WCAG 1.3.5](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html)) |
| [SWC-1078](https://jira.corp.adobe.com/browse/SWC-1078) | Bug | To Do | Unresolved | Cannot view truncated placeholder text in `sp-textfield` |
| [SWC-1072](https://jira.corp.adobe.com/browse/SWC-1072) | Story | Done | Done | Improve text field components in the `spectrum-two` theme |
| [SWC-1042](https://jira.corp.adobe.com/browse/SWC-1042) | Story | Done | Done | Create `FormFieldMixin` and refactor two components |
| [SWC-847](https://jira.corp.adobe.com/browse/SWC-847) | Bug | To Do | Unresolved | Number field / text field: invalid border colors |
| [SWC-772](https://jira.corp.adobe.com/browse/SWC-772) | Story | Done | Fixed | RFC: form element patterns |
| [SWC-713](https://jira.corp.adobe.com/browse/SWC-713) | Bug | To Do | Unresolved | Validation icons not responsive to field resizing |
| [SWC-645](https://jira.corp.adobe.com/browse/SWC-645) | Epic | In Progress | Unresolved | Improve accessibility of form/field components |
| [SWC-634](https://jira.corp.adobe.com/browse/SWC-634) | Bug | Done | Cannot Reproduce | Escape/delete key doesn't work in Japanese language input |
| [SWC-523](https://jira.corp.adobe.com/browse/SWC-523) | Bug | Done | Fixed | Incorrect icon sizes in dialog, search, textfield, menu, etc. |
| [SWC-499](https://jira.corp.adobe.com/browse/SWC-499) | Story | Done | Fixed | S2 Foundations: text field updates to current SWC implementation |
| [SWC-417](https://jira.corp.adobe.com/browse/SWC-417) | Story | Done | Fixed | docs(textfield): audit documentation |
| [SWC-320](https://jira.corp.adobe.com/browse/SWC-320) | Story | Done | Deferred | Improve form association for input elements |
| [SWC-306](https://jira.corp.adobe.com/browse/SWC-306) | Bug | Done | Fixed | Textfield: line-height for input has decreased |
| [SWC-267](https://jira.corp.adobe.com/browse/SWC-267) | Story | Done | Deferred | Consistency and documentation around labelling of form fields |
| [SWC-214](https://jira.corp.adobe.com/browse/SWC-214) | Bug | Done | Won't Fix | Textfield border should have a 3:1 minimum contrast ratio |
| [SWC-196](https://jira.corp.adobe.com/browse/SWC-196) | Epic | Done | Duplicate | Loosening the API for form input elements |
| [SWC-76](https://jira.corp.adobe.com/browse/SWC-76) | Story | Done | Won't Fix | Text fields with patterns should validate positively/negatively independently |
| [SWC-48](https://jira.corp.adobe.com/browse/SWC-48) | Epic | Done | Deferred | RFC: recommendations for form-associated custom elements (`ElementInternals`) |

---

## Recommendations: `<swc-text-field>`

Component tag may change until API freeze. `swc-text-field` covers only the single-line configuration of 1st-gen `sp-textfield`; see [`swc-text-area`](../text-area/accessibility-migration-analysis.md#recommendations-swc-text-area) for the multiline sibling.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Host role** | None. The host element sets no `role`. The inner, real `<input type="text">` supplies the implicit `textbox` role. Do not add a `role` to the host to "help" AT — it would conflict with, not duplicate, the native semantics. |
| **Accessible name — three sources, one writer** | Three ways to name the field, all rendered/wired by the **`LabellingController`** ([SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466)), not by an externally associated `swc-field-label`, in accessible-name-computation precedence order (highest first): (1) the **`accessible-labelledby`** property, which resolves to one or more external elements and sets `aria-labelledby` via the `ariaLabelledByElements` element-reference API — for composing a name from elements the field does not own, such as deriving a grid cell's label from its row and column headers; (2) the **`accessible-label`** property (this project's established `accessible-label` → `aria-label` pattern, e.g. `swc-popover`'s), which sets `aria-label` directly on the `<input>` — for a field with no visible label of its own; (3) a **visible label**, provided as slotted content and rendered by the shared directive as a real, same-root `<label>` — the default, recommended path for an ordinary standalone field. Only the highest-precedence source that is actually set becomes the accessible name; a lower-precedence source with different visible text does not get silently overridden into agreement, so don't combine sources with conflicting text (risk of a [WCAG 2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) mismatch) — `accessible-labelledby` is expected to name the field on its own in the grid case, not alongside a differently-worded slotted label. `accessible-labelledby` resolves to element references, not an IDREF string, so it works whether or not the referenced headers live in the same shadow root as the field (see [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)). Whichever source is used, there is exactly one writer by construction (one Lit render pass, one shadow root), which removes 1st-gen's two-writer hazard where `Textfield.ts`'s own render and `FieldLabel.ts`'s imperative cross-root `setAttribute('aria-label', …)` raced on the same attribute. |
| **Placeholder is never the accessible name** | 1st-gen falls back to `placeholder` for `aria-label` when no `label`/associated field label exists. Drop this fallback. Placeholder text is unstable (clears once a value exists, often truncates) and WCAG 3.3.2/2.5.3 expect a persistent label. Dev-warn (matching the project's existing `window.__swc.warn` pattern) when a field has no visible label and no `accessible-label` at all, instead of silently borrowing the placeholder. |
| **Description / help text / error message** | Rendered inside `swc-text-field`'s own shadow root (same root as the `<input>`), so plain same-root `aria-describedby` IDREF wiring is correct and should be kept for the common slotted-help-text case — this is not a cross-root problem (see [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)). `aria-describedby` should point at the container only when help text or an error message is actually slotted, not unconditionally at an empty container as 1st-gen does. For symmetry with `accessible-labelledby` above, `LabellingController` should also expose an **`accessible-describedby`** property that resolves external elements via the `ariaDescribedByElements` element-reference API, per the [forms strategy's naming table](../../05_strategies/forms-strategy-rfc.md#4-naming-table) — for describing a field from light-DOM content it doesn't own, the same way `accessible-labelledby` composes a name from row/column headers it doesn't own. |
| **`aria-errormessage`, in addition to `aria-describedby`** | When `invalid` is `true`, also set `aria-errormessage` on the `<input>` pointing at the error-message element's id (same shadow root, so a plain IDREF works). `aria-errormessage` is ARIA's purpose-built "this is specifically the error text" reference, meant to pair with `aria-invalid="true"`; keep the error content in `aria-describedby` too (1st-gen already does, via the shared help-text container), since `aria-errormessage` support varies across AT and `aria-describedby` is the broadly-supported fallback. Do not set `aria-errormessage` while `invalid` is `false` — per spec it's only meaningful alongside a true/invalid state. 1st-gen has no `aria-errormessage` at all today; add it in 2nd-gen rather than relying on `aria-describedby` alone for [error identification (3.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html). |
| **`placeholder` — no `aria-placeholder`** | Set only the native `placeholder` attribute on the real `<input>`. Do not also set `aria-placeholder`: the browser already exposes the native `placeholder` attribute to the accessibility tree via its own HTML-AAM mapping, so `aria-placeholder` would be redundant on a real `<input>`/`<textarea>` (it exists for custom widgets that fake `role="textbox"` on a non-native element and have no native placeholder mechanism to rely on — not the case here). Setting both risks the two drifting out of sync. |
| **`aria-invalid`** | Set `aria-invalid="true"` only when the field is actually invalid; never write `aria-invalid="false"` explicitly (matches 1st-gen; keep). |
| **`autocomplete` / `inputmode`** | Pass `autocomplete` straight through with its own dedicated type — do not widen it to include combobox-only tokens (`'list'`, `'none'`) as 1st-gen does; that coupling belongs to whatever combobox-like component needs it, not to `swc-text-field`. Add `inputmode` (missing from 1st-gen entirely) so authors can hint virtual-keyboard layout, matching [React Spectrum's `inputMode`](https://react-spectrum.adobe.com/TextField). Keep the [SWC-1176](https://jira.corp.adobe.com/browse/SWC-1176) input-purpose fix ([WCAG 1.3.5](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html)). |
| **Required** | Reflect `required` onto the native `<input>` so the browser's own required semantics apply; do not set `aria-required` separately — the native attribute already produces the correct AT mapping. Any required asterisk is rendered by the shared label directive as a visual-only indicator with no ARIA role of its own — same behavior as 1st-gen `sp-field-label`'s asterisk, just now produced from inside `swc-text-field` itself rather than by a separate custom element. |
| **Validation icon** | The invalid/valid status icon rendered inside the field is decorative and must stay `aria-hidden="true"` (1st-gen's icon components default to `aria-hidden` when no label is passed — verify this default is preserved, not accidentally given a label). The icon must not be the only way `aria-invalid`/validity state reaches AT; it is a sighted-user reinforcement of state the input attribute already communicates. |
| **Live region for help/error text** | Do not default to `aria-live="assertive"` on the help-text container as 1st-gen unconditionally does. Because help text and errors are already wired via same-root `aria-describedby`, a screen reader announces them when focus lands on (or stays on) the field — no live region is needed for the common case. If a real live-update case is later found (e.g. an error appearing while focus stays elsewhere), use `aria-live="polite"` sparingly, never `assertive`, per [WCAG 4.1.3](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) and the project's existing guidance against noisy assertive regions for routine field-level messaging. |
| **Character count (new surface)** | 1st-gen never implemented the CSS spec's character-count feature. If 2nd-gen adds it, associate it via `aria-describedby` alongside help text/error text rather than leaving it a visual-only `<span>` — otherwise screen reader users get no remaining-character information at all. |
| **Truncated value — no custom tooltip** | Drop 1st-gen's `TruncatedValueTooltipController` (the custom `swc-overlay`/`swc-tooltip` popup that reveals the full value on hover/focus). [React Spectrum is explicit that tooltips should not be used on text fields at all](https://github.com/adobe/react-spectrum/wiki/Frequently-Asked-Questions-(FAQs)) — a field's value is critical content, and tooltips are for supplementary, hover-gated content. Instead: mirror `value` into the native `title` attribute so pointer users get the browser's own native tooltip (no custom overlay, no `aria-hidden` tricks needed — the browser already excludes `title` from the accessible name/description computation when a real label is present, same as the placeholder case above); and rely on the input already being fully readable via focus, caret movement, and select-all for every input method, so no bespoke reveal mechanism is required for accessibility at all. This is single-line only — `swc-text-area` never truncates (it wraps), so it has no equivalent need. |
| **Form association** | Use the **`FieldAssociationController`** ([SWC-2467](https://jira.corp.adobe.com/browse/SWC-2467)): `static formAssociated = true`, `attachInternals()`, `internals.setFormValue(value)` on value change, `formResetCallback()`, and `formDisabledCallback()` so a `<fieldset disabled>` ancestor correctly disables the field — 1st-gen has no `ElementInternals` at all and relies solely on a real named `<input>` inside the shadow root for form participation, which does not get the `fieldset`-disabled cascade for free. Do not set `ElementInternals.role` — the native `<input>` already supplies the role (see **Host role** above). |

### Shadow DOM and cross-root ARIA Issues

**None — resolved by design, not by omission.** This is worth explaining because 1st-gen genuinely has a cross-root problem here, and the point of replacing `sp-field-label`/`sp-help-text` with the `LabellingController` is that 2nd-gen doesn't inherit it.

**1st-gen's problem:** `sp-field-label` labels `sp-textfield` by reaching directly into `sp-textfield`'s shadow root and calling `setAttribute('aria-label', labelText)` on the inner `<input>` — an imperative, cross-shadow-root DOM mutation from one component into another's internals. `aria-labelledby` with an IDREF is not a viable alternative there: ID references do not resolve across disconnected shadow trees, so an IDREF written on the light-DOM `sp-field-label` could never point at an id living inside `sp-textfield`'s shadow root. This also created a two-writer hazard: `Textfield.ts`'s own render and `FieldLabel.ts`'s imperative override both wrote to `aria-label` on the same `<input>`, and whichever ran last won.

**2nd-gen's fix:** remove the cross-root boundary itself rather than build a bridge across it. `swc-text-field` no longer delegates its label or help/error text to a separately-authored, separately-rooted component. The `LabellingController` renders the label, required indicator, help text, and error message directly inside `swc-text-field`'s own shadow root — via a shared, stateless render directive (the same pattern `PendingController` already uses for the pending spinner; see [`renderPendingSpinner`](../../../../2nd-gen/packages/core/directives/pending-spinner/src/pending-spinner.ts)) plus a shared stylesheet consumed by every component that adopts the controller. Label, input, and help-text/error container are therefore always in the same shadow root, so a real `<label for="…">`/`id` pair for the slotted-label case, `aria-label` for the `accessible-label`-property case, and same-root `aria-describedby`/`aria-errormessage` for help text and errors, all work without any element-reference API or cross-shadow reach-in. There is exactly one render pass, so the two-writer hazard is gone by construction, not by convention.

**External labelling is still supported, just not via IDREF strings or a cross-root reach-in.** The default in-shadow label covers the ordinary standalone field, but some layouts need a name derived from elements the field doesn't own — the canonical case is a grid, where a cell's label should come from combining its row header and column header rather than from a per-cell visible label. `LabellingController` supports this via the **`accessible-labelledby`** property (the "light DOM siblings via properties" half of the hybrid model in the [web component form strategy demos](https://github.com/nikkimk/web-component-form-strategy-demos/tree/main)): it resolves to one or more external elements and sets `aria-labelledby` using the ARIAMixin `ariaLabelledByElements` element-reference API (Baseline 2025: Chrome 135+, Safari 16.4+, Firefox 136+), not an IDREF string and not a direct `setAttribute` into another component's shadow root. Element references resolve correctly regardless of which shadow root the field and the referenced headers each live in, so this composes cleanly with the same-root default rather than reintroducing the cross-root hazard the rest of this section describes. The same pattern extends to descriptions: **`accessible-describedby`** resolves external elements via `ariaDescribedByElements` for a description the field doesn't own, mirroring `accessible-labelledby` rather than leaving cross-root description composition as a second, asymmetric mechanism.

### Accessibility tree expectations

- **Labeled, with a value:** name comes from whichever of `accessible-labelledby` (highest precedence), `accessible-label`, or a slotted visible label is set, in that order; role `textbox`; value is the current text. Description, if help text or an error message is slotted, comes from the same-root `aria-describedby` (and, when invalid, `aria-errormessage`) target; if instead composed from light-DOM content the field doesn't own, `accessible-describedby` resolves it via `ariaDescribedByElements`, mirroring `accessible-labelledby`.
- **In a grid, named by row/column headers:** with `accessible-labelledby` pointing at the row and column header elements, the accessible name is the concatenation of those headers' text (per the [`aria-labelledby` accessible-name algorithm](https://www.w3.org/TR/accname-1.2/)), not any slotted label text the field might also carry — that slotted text, if present, is not part of the computed name in this configuration.
- **Labeled, placeholder only, no value:** name still comes from the label, never from the placeholder. The placeholder is exposed as the native `placeholder` accessible-name-fallback *only* in the true edge case of a completely unlabeled field — which 2nd-gen should dev-warn against rather than quietly rely on.
- **Invalid:** `aria-invalid="true"`; error message text is both visible and reachable via `aria-describedby`/`aria-errormessage`; the alert-triangle icon stays `aria-hidden="true"` and adds no separate node to the tree.
- **Disabled vs. readonly:** `disabled` removes the field from the tab order (native `disabled` IDL property does this for free); `readonly` keeps it focusable but non-editable — these must remain visibly and programmatically distinct outcomes, not just distinct CSS.
- **Truncated value, single line:** the accessible value read by AT is always the full, untruncated string — visual clipping never changes what's exposed. There is no separate tooltip node in the tree at all; a native `title` attribute (not exposed as a distinct accessibility-tree node) carries the same full value for pointer users.

### Keyboard and focus

- **Tab stop:** one Tab stop per field. Attach the shadow root with `delegatesFocus: true` so focus lands on the real `<input>` directly rather than on an intermediate host-level stop, per the form-strategy recommendations this migration follows.
- **Click-to-focus on the label:** because the label now renders in the same shadow root as the `<input>`, a real `<label for="…">` pointing at a same-root id gives click-to-focus for free from the browser. 1st-gen has to do this manually (`FieldLabel.ts`'s `handleClick` calls `this.target.focus()` across the shadow boundary, with extra branching for cross-root `forceFocusVisible()`) precisely because its label and input are not in the same root — that manual work goes away once both render in one shadow tree.
- **Text editing:** arrow keys move the caret, <kbd>Home</kbd>/<kbd>End</kbd> jump to line start/end, platform select-all and undo/redo shortcuts work — all native `<input>` behavior; `swc-text-field` should not intercept or reimplement any of it.
- **<kbd>Enter</kbd>:** submits the enclosing `<form>` natively (the default single-line `<input>` behavior, preserved by the `FieldAssociationController`'s native form participation). Contrast with `swc-text-area`, where <kbd>Enter</kbd> inserts a newline instead — see [that doc's Keyboard and focus section](../text-area/accessibility-migration-analysis.md#keyboard-and-focus).
- **Readonly vs. disabled:** a `readonly` field stays in the Tab order and can receive focus (so a user can still select and copy its value); a `disabled` field is removed from the Tab order entirely. Keep this distinction — do not let `readonly` accidentally behave like `disabled` or vice versa.
- **Truncated value:** no bespoke reveal-on-focus behavior is needed. Placing the caret in the field (by any input method) already lets the user read the full value via the native caret, selection, and horizontal scroll — that native affordance, not a tooltip, is what makes a truncated value accessible to keyboard users. A `title` attribute (if added at all) is a pointer-hover convenience only; it is not relied on for keyboard accessibility.
- **Known gap to fix, not carry forward:** the rendering-and-styling migration doc notes that 1st-gen does not visually differentiate keyboard focus from pointer/mouse focus on the input (CSS expects a distinct "keyboard-focused" ring; SWC currently shows the same focus styling for both). This is a [focus-visible (2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) risk worth fixing in 2nd-gen, most naturally via `:focus-visible` rather than a hand-rolled "keyboard focused" state.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | `LabellingController` renders the label, required indicator, help text, and error message inside the component's own shadow root with correct, unique, same-root ids (no id collisions when multiple fields render on one page); `aria-describedby` targets the help/error container only when content is present, and `aria-errormessage` is set only while `invalid` is `true`; `aria-invalid` appears only when actually invalid (never explicitly `"false"`); `FieldAssociationController` participates in a native `<form>` — value appears in `FormData`, `formResetCallback()` resets the value, `formDisabledCallback()` correctly disables the field when an ancestor `<fieldset>` is disabled. |
| **aXe + Storybook** | Dev-warning story for a field with no accessible name at all (no slotted label, no `accessible-label`, no `accessible-labelledby`, placeholder only) — this should warn, not silently pass. A story with both a slotted label and a differently-worded `accessible-label`/`accessible-labelledby` set, to catch the [Label in Name (2.5.3)](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) mismatch risk. A grid-style story with `accessible-labelledby` pointing at row and column header elements outside the field's shadow root, asserting the composed name matches those headers' text; a parallel story with `accessible-describedby` pointing at an external description element, asserting the composed description. Error/invalid state story. Disabled and readonly stories. |
| **Playwright ARIA snapshots** | `role=textbox` with the correct accessible name, value, and description across both label positions (top, side) and the default/error/disabled/readonly/placeholder states from the design spec's state matrix; separately, a grid-labelling snapshot verifying the `accessible-labelledby` composed name and an `accessible-describedby` snapshot verifying the composed description. |
| **Manual keyboard** | Tab order (one stop, `delegatesFocus`), <kbd>Enter</kbd> submits the form, readonly field stays reachable and selectable while disabled does not, full value is reachable via caret/selection when visually truncated. |

---

## Summary checklist

- [ ] `LabellingController` renders label, required indicator, help text, and error message inside `swc-text-field`'s own shadow root via the shared render directive — no external `swc-field-label`/`swc-help-text` component and no cross-root reach-in for the default case.
- [ ] Accessible name has exactly one writer, by construction (one Lit render pass), not by convention.
- [ ] Placeholder is never the sole accessible name; a field with no slotted label and no `accessible-label` is dev-warned, not silently fixed up with the placeholder. `aria-placeholder` is never set alongside the native `placeholder` attribute.
- [ ] `accessible-labelledby`, `accessible-label`, and a slotted visible label are never combined with conflicting text — only the highest-precedence source that is set (`accessible-labelledby` > `accessible-label` > slotted label) becomes the accessible name, so a lower-precedence source with different text risks a silent [WCAG 2.5.3](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) mismatch.
- [ ] `accessible-labelledby` resolves external elements (e.g. grid row/column headers) via `ariaLabelledByElements`, not an IDREF string, and works regardless of which shadow root those elements live in.
- [ ] `accessible-describedby` mirrors `accessible-labelledby` for descriptions: it resolves external elements via `ariaDescribedByElements`, so cross-root description composition isn't left as an asymmetric gap in the naming/describing API.
- [ ] `aria-errormessage` points at the error-message element while `invalid` is `true`, in addition to `aria-describedby`.
- [ ] `FieldAssociationController` wires `formAssociated`, `attachInternals()`, `setFormValue()`, `formResetCallback()`, and `formDisabledCallback()`.
- [ ] Help text / error message container does not default to `aria-live="assertive"`; same-root `aria-describedby` covers the common case.
- [ ] Validation icon stays `aria-hidden="true"`.
- [ ] No custom truncation tooltip (`swc-overlay`/`swc-tooltip`) is ported from 1st-gen; a native `title` attribute (if used) is a pointer-only convenience, not an accessibility dependency.
- [ ] `readonly` and `disabled` remain distinct in the tab order, not just visually.
- [ ] Keyboard-focus vs. pointer-focus styling is differentiated (fixing the gap noted in the rendering-and-styling doc), addressing [WCAG 2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html).
- [ ] If character count ships, it is `aria-describedby`-associated, not visual-only.
- [ ] `autocomplete` keeps the [SWC-1176](https://jira.corp.adobe.com/browse/SWC-1176) input-purpose fix and does not carry forward 1st-gen's combobox-only type widening; `inputmode` is added.

## References

- [Web component form strategy demos](https://github.com/nikkimk/web-component-form-strategy-demos/tree/main) — labelling, form-association, and ARIA-role-placement recommendations this doc follows.
- [Forms Strategy: 2nd-Gen Proposal (this repo)](../../05_strategies/forms-strategy-rfc.md) — the team's recommended direction for form fields generally (`FieldAssociationController`, ARIA role placement, and the `accessible-labelledby`/`accessible-describedby` naming table), which this doc's `swc-text-field`-specific guidance follows.
- [Forms RFC (approved)](https://rfc-hub.adobe.io/rfcs/07afc8e3-960a-4fa6-a25a-361c28d2203d?from=%2F%3Fstatus%3DApproved) — approved architecture this doc's `LabellingController`/`FieldAssociationController` guidance is based on (internal, SSO-gated — not independently fetchable while drafting this doc; verify directly if you have access).
- [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [APG: read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [React Spectrum: TextField](https://react-spectrum.adobe.com/TextField), [React Spectrum FAQ: tooltips and TextField](https://github.com/adobe/react-spectrum/wiki/Frequently-Asked-Questions-(FAQs)) (why truncated values use a native `title`, not a custom tooltip)
- [`renderPendingSpinner` (this repo)](../../../../2nd-gen/packages/core/directives/pending-spinner/src/pending-spinner.ts) — the shared-directive structural precedent `LabellingController` follows
- [Spectrum 2: Text field](https://s2.spectrum.corp.adobe.com/page/text-field/), [Spectrum 2: Field label](https://s2.spectrum.corp.adobe.com/page/field-label/) (internal, SSO-gated — verify directly if you have access; not independently fetchable while drafting this doc)
- 1st-gen: [`sp-textfield`](../../../../1st-gen/packages/textfield/README.md), [`sp-field-label`](../../../../1st-gen/packages/field-label/README.md), [`sp-help-text`](../../../../1st-gen/packages/help-text/README.md)
- [Textfield and Textarea migration roadmap (this repo)](../textfield/rendering-and-styling-migration-analysis.md)
- [Text area accessibility migration analysis (this repo)](../text-area/accessibility-migration-analysis.md)
- Jira: [SWC-2323](https://jira.corp.adobe.com/browse/SWC-2323) (epic), [SWC-2324](https://jira.corp.adobe.com/browse/SWC-2324) (this research ticket), [SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466) (`LabellingController`), [SWC-2467](https://jira.corp.adobe.com/browse/SWC-2467) (`FieldAssociationController`), [SWC-1888](https://jira.corp.adobe.com/browse/SWC-1888) (RFC: form field strategy for 2nd-gen migration)
