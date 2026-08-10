<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Text Area / Text area accessibility migration analysis

<!-- Document title (editable) -->

# Text area accessibility migration analysis

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
- [Recommendations: `<swc-text-area>`](#recommendations-swc-text-area)
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

This doc tells you how **`swc-text-area`** should work for **accessibility**. It matches the goal of **WCAG 2.2 Level AA**. `swc-text-area` is the 2nd-gen replacement for the multiline configuration of 1st-gen `sp-textfield` (`sp-textfield[multiline]`). 1st-gen has no separate textarea package — multiline is a mode of the single `Textfield` class. 2nd-gen splits it into its own component, matching [React Spectrum's `TextField`](https://react-spectrum.adobe.com/TextField) / [`TextArea`](https://react-spectrum.adobe.com/TextArea) split. This doc shares most of its ARIA and form-association guidance with [`swc-text-field`'s accessibility migration analysis](../text-field/accessibility-migration-analysis.md); it calls out only what differs for multiline input.

### Also read

- [Textfield and Textarea migration roadmap](../textfield/rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM changes (still filed under the combined 1st-gen `textfield/` folder pending a rendering-doc split).
- [Text field accessibility migration analysis](../text-field/accessibility-migration-analysis.md) for the single-line sibling; most of its [ARIA roles, states, and properties](../text-field/accessibility-migration-analysis.md#aria-roles-states-and-properties) and [Shadow DOM and cross-root ARIA Issues](../text-field/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) content applies here unchanged.

### What it is

- A **multi-line text input** for longer, open-ended text (comments, descriptions). The accessible semantics come from a real `<textarea>` in the component's shadow root; `swc-text-area` does not set a host-level ARIA role.
- Optionally grows vertically to fit its content (`grows`), and is normally paired with an external `swc-field-label` and, optionally, help text or an error message — the same label/help-text association model as `swc-text-field`.

### When to use something else

- A short, single-line value — use [`swc-text-field`](../text-field/accessibility-migration-analysis.md), not a one-row `swc-text-area`.
- A closed set of choices — use a picker, combobox, or radio group.

### What it is not

- Not a rich-text or code editor. It is a plain-text `<textarea>` with Spectrum styling and validation wiring, not a formatting or syntax-highlighting surface.
- Does not carry `swc-text-field`'s truncated-value hover/focus tooltip. That feature is single-line only in 1st-gen (explicitly skipped when `multiline` is set) because a multiline field wraps its content instead of clipping it — there is no truncated value to reveal.

### Related

- [`swc-field-label`](#) (not yet migrated) — same cross-root association problem as `swc-text-field`; see [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues).
- [`swc-help-text`](#) (not yet migrated) — renders help text and error messages inside the field's own shadow root, same as `swc-text-field`.
- [`LabellingController`](https://jira.corp.adobe.com/browse/SWC-2466) and [`FieldAssociationController`](https://jira.corp.adobe.com/browse/SWC-2467) — the same two shared controllers `swc-text-field` depends on; `swc-text-area` should use the exact same integration, not a parallel one.

---

## ARIA and WCAG context

### Pattern in the APG

- As with `swc-text-field`, the [APG](https://www.w3.org/WAI/ARIA/apg/) does not define a bespoke "text area" widget — a multi-line text field has a native HTML equivalent (`<textarea>`) with an implicit `textbox` role and an implicit `aria-multiline="true"`, so the guidance is again "use the native element," per the [APG "read me first"](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) principle.
- Exactly one role (`textbox`), supplied by the browser, never conditional — same single-host-role outcome as `swc-text-field`. No dual-role prompt needed.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Info and relationships (1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | Label, help text, and error message must be programmatically associated, same as `swc-text-field`. |
| [Identify input purpose (1.3.5)](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html) | Less commonly applicable to free-form multi-line text than to `swc-text-field`, but the `autocomplete` fix from [SWC-1176](https://jira.corp.adobe.com/browse/SWC-1176) still applies wherever a multiline field genuinely collects a recognized data type (for example a mailing address). |
| [Labels or instructions (3.3.2)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html) and [Label in name (2.5.3)](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) | Same requirement as `swc-text-field`: a real, persistent accessible name, never the placeholder alone. |
| [Error identification (3.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) | Same as `swc-text-field`: visible error text plus `aria-describedby`. |
| [Reflow (1.4.10)](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | Multiline-specific: the field must not force horizontal scrolling at narrow widths or in languages with different line-breaking behavior. [SWC-779](https://jira.corp.adobe.com/browse/SWC-779) (unwanted scrollbar in CJK languages at `rows="1"`) and [SWC-1520](https://jira.corp.adobe.com/browse/SWC-1520)/[SWC-1035](https://jira.corp.adobe.com/browse/SWC-1035) (inaccurate `grows`/positioning behavior) are exactly this failure mode; verify they don't recur in 2nd-gen. |
| [Focus visible (2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | Same keyboard-vs-pointer-focus gap noted for `swc-text-field` applies here too — it's the same underlying styling implementation. |
| [Status messages (4.1.3)](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | Same guidance as `swc-text-field`: don't default the help-text/error container to `aria-live="assertive"`. |

**Bottom line:** almost all of `swc-text-field`'s accessibility guidance carries over unchanged, because both components share the same label/help-text/validity architecture. The genuinely multiline-specific concerns are (1) the native `<textarea>`'s lack of `pattern` support, (2) the `grows` auto-sizing sizer element, and (3) reflow/line-wrapping correctness across languages — covered below.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-1520](https://jira.corp.adobe.com/browse/SWC-1520) | Bug | To Do | Unresolved | Textarea `multiline`/`grows` behavior is inaccurate |
| [SWC-1316](https://jira.corp.adobe.com/browse/SWC-1316) | Story | Done | Fixed | Align slotted field label CSS styling with the standalone field-label component |
| [SWC-1208](https://jira.corp.adobe.com/browse/SWC-1208) | Story | Done | Done | [Docs] Create migration documentation for text field/area, search, number field, color field |
| [SWC-1176](https://jira.corp.adobe.com/browse/SWC-1176) | Bug | Done | Fixed | Missing input-purpose identification on `sp-textfield` ([WCAG 1.3.5](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html)) |
| [SWC-1073](https://jira.corp.adobe.com/browse/SWC-1073) | Story | Done | Fixed | Improve text area components in the `spectrum-two` theme |
| [SWC-1042](https://jira.corp.adobe.com/browse/SWC-1042) | Story | Done | Done | Create `FormFieldMixin` and refactor two components |
| [SWC-1035](https://jira.corp.adobe.com/browse/SWC-1035) | Bug | To Do | Unresolved | Textarea incorrectly positioned when the `value` attribute is missing |
| [SWC-779](https://jira.corp.adobe.com/browse/SWC-779) | Bug | To Do | Unresolved | `sp-textfield` multiline with 1 row shows an unwanted scrollbar in Asian languages |
| [SWC-772](https://jira.corp.adobe.com/browse/SWC-772) | Story | Done | Fixed | RFC: form element patterns |
| [SWC-645](https://jira.corp.adobe.com/browse/SWC-645) | Epic | In Progress | Unresolved | Improve accessibility of form/field components |
| [SWC-634](https://jira.corp.adobe.com/browse/SWC-634) | Bug | Done | Cannot Reproduce | Escape/delete key doesn't work in Japanese language input |
| [SWC-513](https://jira.corp.adobe.com/browse/SWC-513) | Bug | Done | Fixed | Textarea multiline has incorrect line-height |
| [SWC-418](https://jira.corp.adobe.com/browse/SWC-418) | Story | Done | Done | docs(textarea): audit documentation |
| [SWC-320](https://jira.corp.adobe.com/browse/SWC-320) | Story | Done | Deferred | Improve form association for input elements |
| [SWC-267](https://jira.corp.adobe.com/browse/SWC-267) | Story | Done | Deferred | Consistency and documentation around labelling of form fields |
| [SWC-196](https://jira.corp.adobe.com/browse/SWC-196) | Epic | Done | Duplicate | Loosening the API for form input elements |
| [SWC-76](https://jira.corp.adobe.com/browse/SWC-76) | Story | Done | Won't Fix | Text fields with patterns should validate positively/negatively independently — relevant here because native `<textarea>` has no `pattern` attribute at all (see [ARIA roles, states, and properties](#aria-roles-states-and-properties)) |
| [SWC-48](https://jira.corp.adobe.com/browse/SWC-48) | Epic | Done | Deferred | RFC: recommendations for form-associated custom elements (`ElementInternals`) |

---

## Recommendations: `<swc-text-area>`

Component tag may change until API freeze. `swc-text-area` covers only the multiline configuration of 1st-gen `sp-textfield[multiline]`; see [`swc-text-field`](../text-field/accessibility-migration-analysis.md#recommendations-swc-text-field) for the single-line sibling. Everything in that doc's [ARIA roles, states, and properties](../text-field/accessibility-migration-analysis.md#aria-roles-states-and-properties) table applies here as well (host role, accessible-name single-writer rule, placeholder-is-never-the-name, `aria-invalid`, required, validation icon, live-region policy, character count, `FieldAssociationController` wiring) — only the rows below are specific to multiline.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Host role** | None, same as `swc-text-field`. The inner, real `<textarea>` supplies the implicit `textbox` role plus an implicit `aria-multiline="true"` — both from the browser's native HTML-AAM mapping, not from component code. Document this precisely: 1st-gen's `textarea.md` says `aria-multiline="true"` "is automatically applied," which is true only in the sense that the browser supplies it; `swc-text-area` itself should not set `aria-multiline` explicitly. |
| **Accessible name, description, live region, validation icon, character count** | Identical policy to [`swc-text-field`](../text-field/accessibility-migration-analysis.md#aria-roles-states-and-properties) — same `LabellingController`/single-writer rule, same "no `aria-live="assertive"` by default," same decorative validation icon. Do not create a second, parallel implementation of any of this for multiline; both components should call into the same controllers. |
| **`pattern` has no native support on `<textarea>`** | The native `<textarea>` element does not support the `pattern` attribute or constraint at all — this is a browser/spec limitation, not a bug. 1st-gen already works around this by running a manual regex check in `checkValidity()` when `multiline` is set. 2nd-gen must keep this JS-side emulation **and** feed its result into `internals.setValidity()` (via the `FieldAssociationController`) so the form's native validity state, `:invalid` styling, and `invalid` event fire correctly — otherwise a `pattern`-constrained `swc-text-area` would silently never register as invalid through the native form-validation path. |
| **`grows` auto-sizing sizer** | When `grows` is set with an unset `rows`, an invisible sizer element mirrors the value purely for CSS measurement purposes. It must stay `aria-hidden="true"` and must never end up with its own accessible name or role — it exists only so the browser can compute layout, and duplicating the value into the tree a second time (even hidden) is worth double-checking on every markup change so it never accidentally becomes exposed. |
| **No truncation tooltip** | Do not port `swc-text-field`'s hover/focus truncation tooltip to `swc-text-area`. Multiline text wraps instead of clipping, so there is no truncated value to reveal; 1st-gen's tooltip controller already explicitly skips setup when `multiline` is set — keep that scoping in 2nd-gen. |
| **Reflow across languages** | Verify `rows`/`grows` sizing does not force an unwanted scrollbar at small row counts in CJK text ([SWC-779](https://jira.corp.adobe.com/browse/SWC-779)) and that `grows` sizing is accurate when `value` is empty or unset ([SWC-1520](https://jira.corp.adobe.com/browse/SWC-1520), [SWC-1035](https://jira.corp.adobe.com/browse/SWC-1035)) — these are functional bugs with a real [reflow (1.4.10)](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) consequence, not purely cosmetic ones. |

### Shadow DOM and cross-root ARIA Issues

Same issue and same fix as [`swc-text-field`](../text-field/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues): the external `swc-field-label` must label an input living in `swc-text-area`'s own shadow root, which today (1st-gen) is done via an imperative, cross-shadow-root `setAttribute('aria-label', …)` reach-in rather than an IDREF (IDREFs cannot cross disconnected shadow trees). The `LabellingController` ([SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466)) should use the `ariaLabelledByElements` element-reference API for both `swc-text-field` and `swc-text-area` — one implementation, not two. Same-root `aria-describedby` for help text/error message continues to work fine since the `<textarea>` and the help-text container both live in the field's own shadow root.

### Accessibility tree expectations

- **Labeled, with a value:** name from the associated `swc-field-label` (or `label` fallback); role `textbox`; `aria-multiline="true"` (implicit, browser-supplied); value is the current multi-line text, wrapped as authored.
- **Labeled, placeholder only, no value:** same rule as `swc-text-field` — the name never comes from the placeholder alone.
- **Invalid, including `pattern` failures:** `aria-invalid="true"`; error text visible and `aria-describedby`-linked; validity must reflect a `pattern` failure even though the browser itself cannot check `pattern` on a `<textarea>` (see **`pattern` has no native support** above) — the manually computed result must still reach `internals.setValidity()`.
- **`grows` sizer:** never appears as its own node with a name or role; purely a hidden layout-measurement aid.
- **Disabled vs. readonly:** same distinction as `swc-text-field` — `disabled` removed from the tab order, `readonly` stays focusable and selectable but non-editable.

### Keyboard and focus

- **Tab stop:** one Tab stop, `delegatesFocus: true` onto the real `<textarea>`, same as `swc-text-field`.
- **Text editing:** arrow keys move the caret across wrapped lines, <kbd>Home</kbd>/<kbd>End</kbd> jump to the start/end of the *visual* line (native `<textarea>` behavior), select-all and undo/redo work natively.
- **<kbd>Enter</kbd> inserts a newline, it does not submit the form.** This is the opposite of `swc-text-field`'s native <kbd>Enter</kbd>-submits behavior, and it is also native `<textarea>` behavior — do not add custom key handling to make <kbd>Enter</kbd> submit the form from inside a `swc-text-area`; that would surprise both sighted and AT users expecting standard multiline editing.
- **Readonly vs. disabled:** same distinction as `swc-text-field` — keep it.
- **Known gap to fix, not carry forward:** the same keyboard-focus-vs-pointer-focus styling gap noted for `swc-text-field` (see [that doc's Keyboard and focus section](../text-field/accessibility-migration-analysis.md#keyboard-and-focus)) applies here, since both share the same underlying focus-styling implementation today.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | Same checks as [`swc-text-field`](../text-field/accessibility-migration-analysis.md#automated-tests) (name/description wiring, single-writer accessible name, `FieldAssociationController` form participation), plus: a `pattern`-constrained `swc-text-area` correctly reports invalid through `internals.validity` (not just through the component's own `checkValidity()`), and the `grows` sizer never gains an accessible name or role. |
| **aXe + Storybook** | Same unlabeled-field dev-warning and error/disabled/readonly stories as `swc-text-field`. Add a CJK-content story to catch reflow regressions like [SWC-779](https://jira.corp.adobe.com/browse/SWC-779). |
| **Playwright ARIA snapshots** | `role=textbox` with `aria-multiline="true"` (implicit) across label positions and states, matching the design spec's state matrix for text area. |
| **Manual keyboard** | Tab order, <kbd>Enter</kbd> inserts a newline (does not submit), caret movement across wrapped lines, `grows` resizing behaves correctly with an empty value ([SWC-1035](https://jira.corp.adobe.com/browse/SWC-1035)). |

---

## Summary checklist

- [ ] Shares the same `LabellingController`/`FieldAssociationController` integration as `swc-text-field` — no parallel, divergent implementation for multiline.
- [ ] `pattern` validation is emulated in JS (native `<textarea>` has no `pattern` support) and its result is fed into `internals.setValidity()`, not just the component's own `checkValidity()`.
- [ ] `grows` sizer element stays `aria-hidden="true"` with no accessible name or role.
- [ ] No truncation tooltip ported from `swc-text-field` — multiline wraps instead of clipping.
- [ ] `aria-multiline` is never set explicitly by component code; it stays a native, implicit mapping.
- [ ] <kbd>Enter</kbd> inserts a newline and does not submit the form.
- [ ] Reflow regressions from 1st-gen ([SWC-779](https://jira.corp.adobe.com/browse/SWC-779) CJK scrollbar, [SWC-1520](https://jira.corp.adobe.com/browse/SWC-1520)/[SWC-1035](https://jira.corp.adobe.com/browse/SWC-1035) inaccurate `grows`/positioning) are verified fixed, not just re-implemented as-is.
- [ ] `readonly` and `disabled` remain distinct in the tab order.
- [ ] Keyboard-focus vs. pointer-focus styling is differentiated, same as `swc-text-field`.

## References

- [Web component form strategy demos](https://github.com/nikkimk/web-component-form-strategy-demos/tree/main) — labelling, form-association, and ARIA-role-placement recommendations this doc follows.
- [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [APG: read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [React Spectrum: TextArea](https://react-spectrum.adobe.com/TextArea)
- [Spectrum 2: Text field](https://s2.spectrum.corp.adobe.com/page/text-field/), [Spectrum 2: Field label](https://s2.spectrum.corp.adobe.com/page/field-label/) (internal, SSO-gated — verify directly if you have access; not independently fetchable while drafting this doc)
- 1st-gen: [`sp-textfield`](../../../../1st-gen/packages/textfield/README.md) (see `textarea.md` in that package for the informal 1st-gen "textarea" spec), [`sp-field-label`](../../../../1st-gen/packages/field-label/README.md), [`sp-help-text`](../../../../1st-gen/packages/help-text/README.md)
- [Textfield and Textarea migration roadmap (this repo)](../textfield/rendering-and-styling-migration-analysis.md)
- [Text field accessibility migration analysis (this repo)](../text-field/accessibility-migration-analysis.md)
- Jira: [SWC-2323](https://jira.corp.adobe.com/browse/SWC-2323) (epic), [SWC-2324](https://jira.corp.adobe.com/browse/SWC-2324) (this research ticket), [SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466) (`LabellingController`), [SWC-2467](https://jira.corp.adobe.com/browse/SWC-2467) (`FieldAssociationController`), [SWC-1888](https://jira.corp.adobe.com/browse/SWC-1888) (RFC: form field strategy for 2nd-gen migration)
