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

### Also read

- [Textfield and Textarea migration roadmap](../textfield/rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM changes (still filed under the combined 1st-gen `textfield/` folder pending a rendering-doc split).
- [Text area accessibility migration analysis](../text-area/accessibility-migration-analysis.md) for the multiline sibling.

### What it is

- A **single-line text input** that collects a short custom string (name, email, job title). The accessible semantics come from a real `<input type="text">` in the component's shadow root; `swc-text-field` does not set a host-level ARIA role.
- Normally paired with an external `swc-field-label` (not yet migrated) for its visible label, and optionally with help text or an error message.

### When to use something else

- Longer-form input (comments, descriptions) — use [`swc-text-area`](../text-area/accessibility-migration-analysis.md), not a wide `swc-text-field`.
- A closed set of choices — use a picker, combobox, or radio group; a text field is for open-ended text.
- A number-only value with stepping — use number field, not `type="number"` on a text field (1st-gen already carries a `type="number"` styling hook that is out of scope for this doc).

### What it is not

- Not a combobox or autocomplete widget. 1st-gen widens the `autocomplete` property's type to include `'list'`/`'none'` "to support the combobox accessibility pattern" — that coupling exists so a *different* component can reuse the type, not because `swc-text-field` itself implements combobox behavior. Do not carry that type-widening into 2nd-gen; each component should own its own `autocomplete` type.

### Related

- [`swc-field-label`](#) (not yet migrated) — external, cross-root label association is the main accessibility problem this doc's [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues) section addresses.
- [`swc-help-text`](#) (not yet migrated) — renders help text and error messages inside the field's own shadow root.
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
| [Status messages (4.1.3)](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | If help text or an error message appears without the user moving focus, a screen reader needs some way to learn about it — but that does not mean every help-text region should be an `aria-live` region by default (see [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)). |
| [Content on hover or focus (1.4.13)](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html) | 1st-gen's truncated-value tooltip must be dismissible, hoverable, and persistent, and — this is the part 1st-gen already gets right — must also appear on **keyboard focus**, not just pointer hover. Keep that dual trigger in 2nd-gen. |

**Bottom line:** the native `<input>` already supplies role and most keyboard behavior; the accessibility work for `swc-text-field` is almost entirely about correctly wiring the *external* label, help text, and validity state to that native element, and about making sure the JS layer (LabellingController, FieldAssociationController) never contradicts the native semantics it's built on top of.

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
| **Accessible name — single writer** | The accessible name comes from exactly one of: (1) an externally associated `swc-field-label`, wired by the **`LabellingController`** ([SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466)) using the `ariaLabelledByElements` element-reference API, or (2) a `label` property fallback rendered as `aria-label` when no external label is associated. Only one of these should ever write the accessible name at a time. 1st-gen has two independent writers racing on the same `aria-label` attribute (the component's own render, and `sp-field-label`'s imperative `setAttribute` reach-in) — do not carry that forward. |
| **Placeholder is never the accessible name** | 1st-gen falls back to `placeholder` for `aria-label` when no `label`/associated field label exists. Drop this fallback. Placeholder text is unstable (clears once a value exists, often truncates) and WCAG 3.3.2/2.5.3 expect a persistent label. Dev-warn (matching the project's existing `window.__swc.warn` pattern) when a field has no accessible name at all, instead of silently borrowing the placeholder. |
| **Description / help text / error message** | Rendered inside `swc-text-field`'s own shadow root (same root as the `<input>`), so plain same-root `aria-describedby` IDREF wiring is correct and should be kept — this is not a cross-root problem (see [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)). `aria-describedby` should point at the container only when help text or an error message is actually slotted, not unconditionally at an empty container as 1st-gen does. |
| **`aria-invalid`** | Set `aria-invalid="true"` only when the field is actually invalid; never write `aria-invalid="false"` explicitly (matches 1st-gen; keep). |
| **`autocomplete` / `inputmode`** | Pass `autocomplete` straight through with its own dedicated type — do not widen it to include combobox-only tokens (`'list'`, `'none'`) as 1st-gen does; that coupling belongs to whatever combobox-like component needs it, not to `swc-text-field`. Add `inputmode` (missing from 1st-gen entirely) so authors can hint virtual-keyboard layout, matching [React Spectrum's `inputMode`](https://react-spectrum.adobe.com/TextField). Keep the [SWC-1176](https://jira.corp.adobe.com/browse/SWC-1176) input-purpose fix ([WCAG 1.3.5](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html)). |
| **Required** | Reflect `required` onto the native `<input>` so the browser's own required semantics apply; do not set `aria-required` separately — the native attribute already produces the correct AT mapping. Any asterisk shown by `swc-field-label` is a visual-only indicator with no ARIA role of its own (matches 1st-gen `sp-field-label`). |
| **Validation icon** | The invalid/valid status icon rendered inside the field is decorative and must stay `aria-hidden="true"` (1st-gen's icon components default to `aria-hidden` when no label is passed — verify this default is preserved, not accidentally given a label). The icon must not be the only way `aria-invalid`/validity state reaches AT; it is a sighted-user reinforcement of state the input attribute already communicates. |
| **Live region for help/error text** | Do not default to `aria-live="assertive"` on the help-text container as 1st-gen unconditionally does. Because help text and errors are already wired via same-root `aria-describedby`, a screen reader announces them when focus lands on (or stays on) the field — no live region is needed for the common case. If a real live-update case is later found (e.g. an error appearing while focus stays elsewhere), use `aria-live="polite"` sparingly, never `assertive`, per [WCAG 4.1.3](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) and the project's existing guidance against noisy assertive regions for routine field-level messaging. |
| **Character count (new surface)** | 1st-gen never implemented the CSS spec's character-count feature. If 2nd-gen adds it, associate it via `aria-describedby` alongside help text/error text rather than leaving it a visual-only `<span>` — otherwise screen reader users get no remaining-character information at all. |
| **Truncated-value tooltip** | Keep 1st-gen's deliberate choice to mark the tooltip and its `swc-overlay` host `aria-hidden="true"` and non-describing (`describeTrigger="none"`): the full value is already the input's accessible value on focus, so exposing it a second time via the tooltip would duplicate the announcement. This behavior is single-line only — do not port it to `swc-text-area`, which wraps rather than truncates. |
| **Form association** | Use the **`FieldAssociationController`** ([SWC-2467](https://jira.corp.adobe.com/browse/SWC-2467)): `static formAssociated = true`, `attachInternals()`, `internals.setFormValue(value)` on value change, `formResetCallback()`, and `formDisabledCallback()` so a `<fieldset disabled>` ancestor correctly disables the field — 1st-gen has no `ElementInternals` at all and relies solely on a real named `<input>` inside the shadow root for form participation, which does not get the `fieldset`-disabled cascade for free. Do not set `ElementInternals.role` — the native `<input>` already supplies the role (see **Host role** above). |

### Shadow DOM and cross-root ARIA Issues

This is a genuine, non-trivial cross-root case, not a "None."

1st-gen's `sp-field-label` labels `sp-textfield` by reaching directly into `sp-textfield`'s shadow root and calling `setAttribute('aria-label', labelText)` on the inner `<input>` — an imperative, cross-shadow-root DOM mutation from one component into another's internals. `aria-labelledby` with an IDREF is not a viable alternative here: ID references do not resolve across disconnected shadow trees, so an IDREF written on the light-DOM `swc-field-label` could never point at an id living inside `swc-text-field`'s shadow root, and vice versa.

**Recommended fix (`LabellingController`, [SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466)):** use the ARIAMixin element-reference APIs — `ariaLabelledByElements` (and `ariaDescribedByElements` if a cross-root description source is ever needed) — instead of either IDREF strings or direct attribute mutation into another component's shadow root. These are element references, not string IDs, so they resolve correctly regardless of which shadow root the label and the field each live in. Browser support is Baseline 2025 (Chrome 135+, Safari 16.4+, Firefox 136+), so this is safe to build on now.

This also fixes the two-writer hazard noted in [ARIA roles, states, and properties](#aria-roles-states-and-properties): today, `Textfield.ts`'s own render and `FieldLabel.ts`'s imperative override both write to `aria-label` on the same `<input>`, and whichever runs last wins. `LabellingController` should be the single owner of the externally-labeled case; the component's own `label` property fallback should only apply when no external label is associated at all.

**Future simplification, not usable yet:** the `referenceTarget` proposal (behind flags only — Chrome 133+, Safari 26+, Firefox 144+ as of this doc) would let an author write `aria-labelledby="my-text-field"` directly on the host and have the browser route it to the inner `<input>` automatically, removing the need for a controller-managed element-reference property for this case. Don't build around it yet; note it as a possible future removal of custom wiring once unflagged.

### Accessibility tree expectations

- **Labeled, with a value:** name comes from the associated `swc-field-label` (or the `label` fallback); role `textbox`; value is the current text. Description, if help text or an error message is slotted, comes from the same-root `aria-describedby` target.
- **Labeled, placeholder only, no value:** name still comes from the label, never from the placeholder. The placeholder is exposed as the native `placeholder` accessible-name-fallback *only* in the true edge case of a completely unlabeled field — which 2nd-gen should dev-warn against rather than quietly rely on.
- **Invalid:** `aria-invalid="true"`; error message text is both visible and reachable via `aria-describedby`; the alert-triangle icon stays `aria-hidden="true"` and adds no separate node to the tree.
- **Disabled vs. readonly:** `disabled` removes the field from the tab order (native `disabled` IDL property does this for free); `readonly` keeps it focusable but non-editable — these must remain visibly and programmatically distinct outcomes, not just distinct CSS.
- **Truncated value, single line:** the accessible value read by AT is always the full, untruncated string — visual clipping never changes what's exposed. The hover/focus tooltip repeating that value stays `aria-hidden="true"` so it isn't announced a second time.

### Keyboard and focus

- **Tab stop:** one Tab stop per field. Attach the shadow root with `delegatesFocus: true` so focus lands on the real `<input>` directly rather than on an intermediate host-level stop, per the form-strategy recommendations this migration follows.
- **Text editing:** arrow keys move the caret, <kbd>Home</kbd>/<kbd>End</kbd> jump to line start/end, platform select-all and undo/redo shortcuts work — all native `<input>` behavior; `swc-text-field` should not intercept or reimplement any of it.
- **<kbd>Enter</kbd>:** submits the enclosing `<form>` natively (the default single-line `<input>` behavior, preserved by the `FieldAssociationController`'s native form participation). Contrast with `swc-text-area`, where <kbd>Enter</kbd> inserts a newline instead — see [that doc's Keyboard and focus section](../text-area/accessibility-migration-analysis.md#keyboard-and-focus).
- **Readonly vs. disabled:** a `readonly` field stays in the Tab order and can receive focus (so a user can still select and copy its value); a `disabled` field is removed from the Tab order entirely. Keep this distinction — do not let `readonly` accidentally behave like `disabled` or vice versa.
- **Truncated-value tooltip:** must reveal on both pointer hover *and* keyboard focus, not hover alone, per [WCAG 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html) — 1st-gen already does this; keep it.
- **Known gap to fix, not carry forward:** the rendering-and-styling migration doc notes that 1st-gen does not visually differentiate keyboard focus from pointer/mouse focus on the input (CSS expects a distinct "keyboard-focused" ring; SWC currently shows the same focus styling for both). This is a [focus-visible (2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) risk worth fixing in 2nd-gen, most naturally via `:focus-visible` rather than a hand-rolled "keyboard focused" state.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | `aria-describedby` targets the same-root help/error container only when content is slotted; `aria-invalid` appears only when actually invalid (never explicitly `"false"`); `LabellingController` writes the accessible name from exactly one source at a time (no stale `aria-label` left behind after an external label is associated, or vice versa); `FieldAssociationController` participates in a native `<form>` — value appears in `FormData`, `formResetCallback()` resets the value, `formDisabledCallback()` correctly disables the field when an ancestor `<fieldset>` is disabled. |
| **aXe + Storybook** | Dev-warning story for a field with no accessible name at all (no label, no `aria-label`, placeholder only) — this should warn, not silently pass. Error/invalid state story. Disabled and readonly stories. |
| **Playwright ARIA snapshots** | `role=textbox` with the correct accessible name, value, and description across both label positions (top, side) and the default/error/disabled/readonly/placeholder states from the design spec's state matrix. |
| **Manual keyboard** | Tab order (one stop, `delegatesFocus`), <kbd>Enter</kbd> submits the form, readonly field stays reachable and selectable while disabled does not, truncation tooltip appears on keyboard focus as well as hover. |

---

## Summary checklist

- [ ] `LabellingController` uses `ariaLabelledByElements` (element-reference API) for the external `swc-field-label` case — no IDREF string across shadow roots, no direct `setAttribute` reach-in to another component's shadow root.
- [ ] Accessible name has exactly one writer at a time; associating or removing an external label does not leave a stale `aria-label` behind.
- [ ] Placeholder is never the sole accessible name; an unlabeled field is dev-warned, not silently fixed up with the placeholder.
- [ ] `FieldAssociationController` wires `formAssociated`, `attachInternals()`, `setFormValue()`, `formResetCallback()`, and `formDisabledCallback()`.
- [ ] Help text / error message container does not default to `aria-live="assertive"`; same-root `aria-describedby` covers the common case.
- [ ] Validation icon stays `aria-hidden="true"`.
- [ ] Truncated-value tooltip stays `aria-hidden="true"` / non-describing, and reveals on keyboard focus as well as hover.
- [ ] `readonly` and `disabled` remain distinct in the tab order, not just visually.
- [ ] Keyboard-focus vs. pointer-focus styling is differentiated (fixing the gap noted in the rendering-and-styling doc), addressing [WCAG 2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html).
- [ ] If character count ships, it is `aria-describedby`-associated, not visual-only.
- [ ] `autocomplete` keeps the [SWC-1176](https://jira.corp.adobe.com/browse/SWC-1176) input-purpose fix and does not carry forward 1st-gen's combobox-only type widening; `inputmode` is added.

## References

- [Web component form strategy demos](https://github.com/nikkimk/web-component-form-strategy-demos/tree/main) — labelling, form-association, and ARIA-role-placement recommendations this doc follows.
- [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [APG: read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [React Spectrum: TextField](https://react-spectrum.adobe.com/TextField)
- [Spectrum 2: Text field](https://s2.spectrum.corp.adobe.com/page/text-field/), [Spectrum 2: Field label](https://s2.spectrum.corp.adobe.com/page/field-label/) (internal, SSO-gated — verify directly if you have access; not independently fetchable while drafting this doc)
- 1st-gen: [`sp-textfield`](../../../../1st-gen/packages/textfield/README.md), [`sp-field-label`](../../../../1st-gen/packages/field-label/README.md), [`sp-help-text`](../../../../1st-gen/packages/help-text/README.md)
- [Textfield and Textarea migration roadmap (this repo)](../textfield/rendering-and-styling-migration-analysis.md)
- [Text area accessibility migration analysis (this repo)](../text-area/accessibility-migration-analysis.md)
- Jira: [SWC-2323](https://jira.corp.adobe.com/browse/SWC-2323) (epic), [SWC-2324](https://jira.corp.adobe.com/browse/SWC-2324) (this research ticket), [SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466) (`LabellingController`), [SWC-2467](https://jira.corp.adobe.com/browse/SWC-2467) (`FieldAssociationController`), [SWC-1888](https://jira.corp.adobe.com/browse/SWC-1888) (RFC: form field strategy for 2nd-gen migration)
