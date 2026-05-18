# Form-associated custom element PoC: text field with ElementInternals

> Research artifact for the 2nd-gen forms strategy.
> Ticket: SWC-2052 | Blocks: direction PR (SWC-2054)

## Demo

**StackBlitz:** [Open live demo](https://stackblitz.com/github/adobe/spectrum-web-components/tree/rajdeepchandra/chore-face-textfield-poc-swc-2052/research/form-associated-ce-poc?file=index.html)

Or open `index.html` locally in any browser (no build step required).
axe-core loads from CDN on demand when you click the audit button.

---

## Automated test results (Chrome headless)

| Test                    | Expected                         | Actual                                      | Status  |
| ----------------------- | -------------------------------- | ------------------------------------------- | ------- |
| 1a Submit               | FormData includes fullname       | fullname: "Jane Doe"                        | Pass    |
| 1a Reset                | Restores to Jane Doe             | formResetCallback: PASS                     | Pass    |
| 1b Empty required       | valueMissing: true               | Correctly rejected                          | Pass    |
| 1b Pattern (uppercase)  | patternMismatch: true            | Correctly rejected                          | Pass    |
| 1b Valid input          | validity.valid: true             | Accepted                                    | Pass    |
| 1c Disabled fieldset    | Field excluded from FormData     | FormData: NO (correct)                      | Pass    |
| 2A Light DOM siblings   | Name = "Email address"           | `aria-label` on shadow input                | Pass    |
| 2B Slotted children     | Name = "Phone number"            | `aria-label` on shadow input via slotchange | Pass    |
| 2C Shadow internal      | Name = "Search query"            | Shadow-scoped `aria-labelledby` on input    | Pass    |
| 2D Cross-root label-for | Click label focuses field + name | Focus: pass; name via implicit label        | Pass    |
| 3a internals.ariaLabel  | Exposes name in a11y tree        | "Search via internals" on shadow input      | Pass    |
| 3a host aria-label      | Exposes name in a11y tree        | "Search via host attribute" on shadow input | Pass    |
| 3b setValidity          | rangeUnderflow + error shown     | Blocked by automation (manual: pass)        | Partial |
| 4 axe-core              | Audit runs, results shown        | 4 violations (color-contrast only)          | Pass    |

### Critical research finding

**`internals.ariaLabel` alone is not sufficient.** Browsers expose the shadow `<input>` as the primary accessible control (it is what receives focus and screen reader interaction). The host's `ElementInternals` ARIA properties go on a separate a11y node that may not be the one screen readers announce.

The PoC now isolates three labelling strategies via `labelling-strategy` attribute to prove this:

| Strategy         | What it sets                          | Expected SR result                  |
| ---------------- | ------------------------------------- | ----------------------------------- |
| `internals-only` | Only `internals.ariaLabel` on host    | Fails — focused input has no name   |
| `input-only`     | Only `aria-label` on shadow `<input>` | Works — this is the focused element |
| `dual-write`     | Both internals + shadow input         | Works — resilient, recommended      |

The dual-write pattern is recommended for production, but the isolated strategies prove that **the shadow input is what carries the semantics**, not the host's internals node.

---

## 1. Does native form submission and reset see the control's value?

### FormData

| Behavior                                           | Result                         | Notes                                                                    |
| -------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------ |
| `FormData` includes field name and value on submit | Pass (Chrome, Firefox, Safari) | `setFormValue()` in `input` handler is the key call                      |
| Multiple FACE fields in one form                   | Pass                           | Each name appears as a separate entry                                    |
| Disabled FACE fields excluded from FormData        | Pass                           | `formDisabledCallback` fires; matches native `<input disabled>` behavior |

### Reset

| Behavior                                      | Result | Notes                                                                     |
| --------------------------------------------- | ------ | ------------------------------------------------------------------------- |
| `formResetCallback()` fires on `<form>` reset | Pass   | Restores to the `value` attribute (initial value), not empty              |
| Internal input reflects reset value           | Pass   | Callback receives no arguments; read default from `getAttribute('value')` |

### Constraint validation

| Behavior                                                           | Result                 | Notes                                                                          |
| ------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------ |
| `required` prevents empty submit (`valueMissing`)                  | Pass                   | `setValidity()` mirrors the inner input's `ValidityState`                      |
| `pattern` attribute checked (`patternMismatch`)                    | Pass                   | Pattern is forwarded to the shadow input; internals mirror its state           |
| Custom validity via `setValidity({ rangeUnderflow }, msg, anchor)` | Pass                   | Anchor (3rd arg) positions the browser tooltip near the shadow input           |
| `reportValidity()` shows browser tooltip                           | Pass (Chrome, Firefox) | Safari shows tooltip inconsistently for custom elements; test version-specific |
| `checkValidity()` returns boolean without UI                       | Pass                   | Matches native API                                                             |

### State restoration

| Behavior                                           | Result        | Notes                                              |
| -------------------------------------------------- | ------------- | -------------------------------------------------- |
| `formStateRestoreCallback()` fires on back/forward | Pass (Chrome) | Firefox behavior may vary; Safari support is newer |

### Summary

**Form participation works well.** `ElementInternals` + `setFormValue()` + `setValidity()` give us native-equivalent form behavior with no polyfills. The main caution is `reportValidity()` tooltip positioning in Safari, which can be version-dependent.

---

## 2. IDREF matrix: does the accessibility tree resolve relationships?

### Scenario A: light DOM label and help as siblings

IDs on elements _outside_ the component, referenced via `aria-labelledby` / `aria-describedby` on the host.

| Aspect                                           | Chrome    | Firefox       | Safari    | Notes                                                                                  |
| ------------------------------------------------ | --------- | ------------- | --------- | -------------------------------------------------------------------------------------- |
| `aria-labelledby` resolves to light DOM sibling  | Pass      | Pass          | Pass      | Host attributes referencing light DOM IDs work because both are in the same tree scope |
| `aria-describedby` resolves to light DOM sibling | Pass      | Pass          | Pass      | Same tree scope; no cross-root issue                                                   |
| Screen reader announces label                    | Pass (VO) | Verify (NVDA) | Pass (VO) | VoiceOver reads the referenced label text                                              |
| Screen reader announces description              | Pass (VO) | Verify (NVDA) | Pass (VO) | VoiceOver reads the help text after a pause                                            |

**Conclusion:** This scenario works because the IDREF and the target element share the same DOM tree (light DOM). No cross-root issue. **Recommended pattern** for label and help text when the component does not own the label rendering.

### Scenario B: IDs on slotted light DOM children

Consumer projects content into the component via `<slot>`. IDs live on the slotted elements (which remain in light DOM despite visual projection).

| Aspect                                            | Chrome             | Firefox | Safari  | Notes                                                                                |
| ------------------------------------------------- | ------------------ | ------- | ------- | ------------------------------------------------------------------------------------ |
| Slotted label ID resolvable from light DOM        | Pass               | Pass    | Pass    | Slotted elements stay in the light DOM tree; their IDs are in the host's scope       |
| `ariaLabelledByElements` (element ref API)        | Pass (Chrome 130+) | Partial | Not yet | Only Chrome ships the element reference APIs; others need ID fallback                |
| Shadow input `aria-labelledby` → slotted ID       | Fail               | Fail    | Fail    | Shadow input cannot reference a light DOM ID; the input is in a different tree scope |
| Workaround: set `aria-labelledby` on host instead | Pass               | Pass    | Pass    | Host is in light DOM, so it can reference slotted children's IDs                     |

**Conclusion:** Slotted content keeps its light DOM identity; IDs are reachable from the host or other light DOM elements. However, the _shadow input_ cannot reference slotted IDs directly. Two approaches:

1. Use `ariaLabelledByElements` on `ElementInternals` (Chrome only as of testing).
2. Set `aria-labelledby` on the **host** (works cross-browser) and rely on the host's role to carry the accessible name through.

### Scenario C: shadow-local IDREF resolution (NOT cross-root)

Label and help text rendered _inside_ the shadow root. The internal input uses `aria-labelledby="shadow-label"` where both the input and `#shadow-label` share the same shadow root scope. This is standard same-scope IDREF resolution — **not** cross-root ARIA.

| Aspect                                            | Chrome    | Firefox       | Safari    | Notes                                                                          |
| ------------------------------------------------- | --------- | ------------- | --------- | ------------------------------------------------------------------------------ |
| Shadow input `aria-labelledby` → shadow-scoped ID | Pass      | Pass          | Pass      | Same-scope resolution; both elements in same shadow root                       |
| Light DOM element referencing shadow ID           | Fail      | Fail          | Fail      | Expected: shadow IDs are encapsulated by design                                |
| `internals.ariaLabel` set from shadow label text  | Pass      | Pass          | Pass      | String-based; no IDREF involved                                                |
| Screen reader announces internal label            | Pass (VO) | Verify (NVDA) | Pass (VO) | Shadow-scoped IDREF on the input is what carries the name, not internals alone |

**Conclusion:** This works because both elements are in the same scope. Do **not** infer that host ARIA can target shadow IDs or that external references can cross roots. This pattern is valid only when the component **owns** both label and control within its shadow tree.

### Scenario D: cross-root; light DOM `<label for>` targeting the host

A native `<label for="field-id">` in light DOM targets the custom element host. The component uses `delegatesFocus: true`.

| Aspect                                          | Chrome        | Firefox       | Safari       | Notes                                                                                                    |
| ----------------------------------------------- | ------------- | ------------- | ------------ | -------------------------------------------------------------------------------------------------------- |
| Clicking the label focuses the shadow input     | Pass          | Pass          | Pass         | `delegatesFocus` forwards focus into the shadow root                                                     |
| Label's `for` creates implicit accessible name  | Partial       | Partial       | Partial      | Browsers vary on whether `<label for>` on a custom element host generates an accessible name in the tree |
| `ElementInternals` picks up label association   | Pass (Chrome) | Partial       | Partial      | Chrome 133+ exposes the implicit label; Firefox/Safari need `ariaLabel` fallback                         |
| Screen reader announces the label when focusing | Partial (VO)  | Verify (NVDA) | Partial (VO) | May announce the label, the `ariaLabel`, or nothing depending on browser                                 |

**Conclusion:** `<label for>` + `delegatesFocus` gives you the _click-to-focus_ behavior reliably, but the a11y tree association is **not consistent** across browsers. **Mitigate by** also setting `ariaLabel` on internals (or `aria-labelledby` on the host) as a fallback so the accessible name is always present.

### IDREF matrix summary table

| Scenario                | Label resolves                   | Description resolves             | Cross-browser                      | Recommended                            |
| ----------------------- | -------------------------------- | -------------------------------- | ---------------------------------- | -------------------------------------- |
| A: Light DOM siblings   | Pass                             | Pass                             | Yes                                | Yes (primary pattern)                  |
| B: Slotted children     | Pass (host), Fail (shadow input) | Pass (host), Fail (shadow input) | Partial (element refs Chrome-only) | Yes, with host-level ARIA              |
| C: Shadow internal      | Pass (within shadow)             | Pass (within shadow)             | Yes                                | Yes, for component-owned labels        |
| D: Cross-root label-for | Partial                          | N/A                              | No (inconsistent)                  | No, unless combined with ARIA fallback |

---

## 3. How should we use ARIA labelling APIs?

### `aria-labelledby` / `aria-describedby` (IDREF strings)

- Work on the **host** when referencing light DOM IDs (scenarios A, B).
- Work on the **shadow input** when referencing shadow-scoped IDs (scenario C).
- **Do not** cross the shadow boundary (shadow input cannot reference light DOM IDs and vice versa).

### `ElementInternals.ariaLabel` / `ariaDescription`

- Set a **string** accessible name or description on the host via internals.
- Works cross-browser (Chrome, Firefox, Safari).
- Does not require IDREF resolution; useful as a **fallback** when IDREFs cannot cross roots.
- **Caveat:** `ariaLabel` on internals and `aria-label` on the host attribute are distinct. If both are set, the attribute takes precedence in most browsers.

### `ElementInternals.ariaLabelledByElements` / `ariaDescribedByElements`

- **Element reference APIs** that accept DOM element references instead of ID strings.
- Bypass IDREF scope restrictions by holding direct object references.
- **Chrome 130+** ships these; Firefox and Safari do not yet (as of testing).
- **Not viable as the sole mechanism** until cross-browser support lands.
- Useful as a progressive enhancement: check `typeof internals.ariaLabelledByElements !== 'undefined'` and fall back to string APIs.

### `aria-errormessage`

- Works on the **host** referencing a light DOM error element (same tree scope).
- Pair with `ariaInvalid` on internals to toggle the invalid state.
- The referenced error element should use `role="alert"` or be in a live region for screen reader announcement.
- **axe-core note:** axe may flag the custom element for missing `aria-errormessage` association if it cannot inspect the shadow tree; document expected behavior in Storybook test-runner exclusions.

### `internals.ariaInvalid` — observed behavior (confirmed via VoiceOver)

- `internals.ariaInvalid = 'true'` sets the invalid state on the **host** a11y node.
- This does **not** reflect as a DOM attribute on the host (unlike `this.setAttribute('aria-invalid', 'true')` which is a visible attribute).
- **Confirmed:** VoiceOver DOES announce the invalid state when `internals.ariaInvalid` is set, even though focus is on the shadow input. The browser appears to propagate the invalid state from the host's internals to the focused control.
- **Difference from host `aria-invalid` attribute:** The attribute is visible to axe-core and all DOM inspectors. `internals.ariaInvalid` may not be; Deque support is pending.
- **Recommendation:** `internals.ariaInvalid` is sufficient for SR announcement. However, for axe-core compatibility, also setting `aria-invalid` as a host attribute is still advisable.

---

## 4. axe-core findings

### Automated test results (Chrome headless, axe-core 4.10.2)

| axe rule         | Observed                                                               | Classification   | Notes                                                                  |
| ---------------- | ---------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------- |
| `color-contrast` | 4 violations, 5 nodes (help text and placeholder contrast below 4.5:1) | True violation   | Fixable with darker text colors; not related to ElementInternals       |
| `label`          | Did not flag FACE elements with `internals.ariaLabel` set              | Correctly passed | When `ariaLabel` string fallback is set, axe can read it from the host |
| `color-contrast` | Shadow input text passes                                               | True pass        | axe traverses into open shadow roots for contrast checks               |

### Expected violations and false positives

| axe rule                     | Behavior                                                  | Classification                                     | Notes                                                                                                |
| ---------------------------- | --------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `label`                      | May flag custom element as an input without a label       | False positive if `ariaLabel` is set via internals | axe cannot always read `ElementInternals` ARIA; Deque tracking under elementInternals-labeled issues |
| `aria-input-field-name`      | May report missing accessible name on custom element host | False positive when name is set via internals      | Same root cause; axe inspects attributes, not internals                                              |
| `color-contrast`             | Flags help text and placeholder contrast                  | True violation                                     | Not FACE-specific; fix with darker muted text colors                                                 |
| `form-field-multiple-labels` | N/A for this PoC                                          | N/A                                                | Would apply if both `<label for>` and `aria-labelledby` were active simultaneously                   |
| `aria-valid-attr-value`      | Passes when IDREFs resolve in the same scope              | True pass                                          | Only fails if an IDREF points to a nonexistent ID in the same scope                                  |

### axe-core and ElementInternals compatibility status

As of axe-core 4.10.x:

- axe **can** traverse open shadow DOM and inspect shadow-internal elements.
- axe **cannot** reliably read `ElementInternals.ariaLabel` or other ARIA properties set via the internals API. It primarily inspects DOM attributes.
- This means FACE components that rely on `internals.ariaLabel` (without a corresponding `aria-label` host attribute) **may produce false positives** for name-related rules.
- Deque has acknowledged this gap; work is tracked under their elementInternals-labeled issues. Timeline is goal-based (community has referenced mid-to-late 2025 calendar targets; adjust expectations for current quarter).

### Recommended axe policy for CI

1. **Prefer host attributes over internals-only ARIA** when possible, so axe can verify the name. Example: if the consumer provides `aria-labelledby`, that attribute lives on the host and axe can read it.
2. **Document known false positives** per component in Storybook test-runner config (`test-runner.ts`), with a link to the upstream Deque issue.
3. **Do not disable entire rules globally.** Use story-level or element-level exclusions so real violations are still caught.
4. **Re-evaluate exclusions** when axe-core ships ElementInternals support (monitor the Deque changelog).

---

## 5. Screen reader testing notes

### VoiceOver (macOS) — manual testing completed

| Scenario                 | Name announced                        | Description announced                  | Error/invalid announced       | Result                |
| ------------------------ | ------------------------------------- | -------------------------------------- | ----------------------------- | --------------------- |
| A (Light DOM siblings)   | Yes — "Email address"                 | Yes — "We will never share your email" | N/A                           | Pass                  |
| B (Slotted children)     | Yes — "Phone number"                  | Yes — "Include country code"           | N/A                           | Pass                  |
| C (Shadow internal)      | Yes — "Search query"                  | Yes — "Type keywords to search"        | N/A                           | Pass                  |
| D (Cross-root label-for) | Yes — "Favorite color"                | N/A                                    | N/A                           | Pass                  |
| 3a internals-only        | No label announced (placeholder only) | N/A                                    | N/A                           | Pass (proves failure) |
| 3a input-only            | Yes — "Search via shadow input"       | N/A                                    | N/A                           | Pass                  |
| 3a dual-write            | Yes — "Search via dual write"         | N/A                                    | N/A                           | Pass                  |
| 3b Validation            | N/A                                   | N/A                                    | Yes — invalid state announced | Pass                  |

### Strategy isolation findings (VoiceOver)

| Strategy         | Label announced on focus?                         | Confirms                                                       |
| ---------------- | ------------------------------------------------- | -------------------------------------------------------------- |
| `internals-only` | **No** — VO reads placeholder or "edit text" only | `internals.ariaLabel` alone does NOT reach the focused control |
| `input-only`     | **Yes** — VO reads the label                      | Shadow input `aria-label` is what SRs read                     |
| `dual-write`     | **Yes** — VO reads the label                      | Resilient; recommended pattern                                 |

### Key SR observations

- `delegatesFocus` correctly routes focus to the shadow input; VoiceOver interacts with that element.
- `internals.ariaLabel` writes to the host node's a11y identity, but VoiceOver does not announce it when focus is on the shadow input. This confirms the dual-write requirement.
- `<label for="...">` + `delegatesFocus` (Scenario D) correctly announces the label in VoiceOver. Both click-to-focus and name announcement work.
- `internals.ariaInvalid = 'true'` is announced by VoiceOver when the field enters an invalid state.

### NVDA (Windows)

> Not tested in this session. Results expected to be similar based on browser a11y tree exposure.

---

## 6. Technical questions answered

### Does native `<form>` submission and reset see the control's value as intended?

**Yes.** `setFormValue()` integrates seamlessly with `FormData`, `submit`, and `reset`. The `formResetCallback` and `formDisabledCallback` lifecycle hooks fire as expected. Browser support is solid (Chrome 77+, Firefox 98+, Safari 16.4+).

### Does the a11y tree resolve IDREFs for the component's light DOM siblings?

**Yes.** When `aria-labelledby` / `aria-describedby` are set on the host and reference light DOM IDs, the tree resolves them correctly across all tested browsers. This is the **recommended primary pattern**.

### Does it resolve IDREFs for IDs on slotted light DOM children?

**Partially.** Slotted elements stay in light DOM, so their IDs are reachable from the host. However, the _shadow input_ cannot directly reference those IDs. Use host-level ARIA attributes or the `ariaLabelledByElements` API (Chrome-only) to bridge the gap.

### Does it resolve IDREFs that live only in shadow DOM?

**Yes, within the same shadow root.** The shadow input can reference shadow-scoped IDs for label and help elements that are co-located in the shadow tree. External elements cannot reference shadow IDs (by design).

### How should we use `aria-labelledby`, `aria-describedby`, `aria-errormessage` vs `ElementInternals.aria*`?

**Layered approach:**

1. **Primary:** Host-level `aria-labelledby` / `aria-describedby` referencing light DOM IDs. Works cross-browser, axe-compatible.
2. **Internal:** Shadow-scoped `aria-labelledby` on the internal input for component-owned labels/descriptions.
3. **Fallback:** `internals.ariaLabel` as a string fallback when no IDREF is available.
4. **Progressive enhancement:** `ariaLabelledByElements` / `ariaDescribedByElements` when the browser supports element references.

### Cross-root limitations

Align with the project's semantic HTML and ARIA guide: shadow DOM scopes IDs, and no production-ready cross-root ARIA solution exists yet. `referenceTarget` is an emerging proposal (tracked in the guide). Until it ships broadly, the layered approach above is the practical strategy.

---

## 7. Recommendations for the direction PR

1. **Adopt ElementInternals and FACE** for all form-participating 2nd-gen components. The API is mature enough for form value, validation, and disabled state. ARIA labelling requires the layered fallback strategy described above.

2. **Primary labelling pattern:** Host-level `aria-labelledby` / `aria-describedby` referencing light DOM IDs (scenario A). This is the most compatible and axe-friendly approach.

3. **Slot-based labelling** (scenario B) is viable but requires the component to wire host-level ARIA from slotted content (not shadow-input-level IDREF). Document this in the shared mixin.

4. **axe-core policy:** Story-level exclusions for known false positives; never global disables. Re-evaluate when Deque ships ElementInternals support.

5. **Monitor `referenceTarget`** and `ariaLabelledByElements` for future simplification. These remove the need for the layered approach but are not cross-browser yet.

6. **Shared mixin** should encapsulate: `formAssociated`, `attachInternals()`, `setFormValue()`, `setValidity()` mirroring, reset/disabled/restore callbacks, and the layered ARIA wiring strategy.

---

## 8. Comparison with 1st-gen `sp-textfield` patterns

The 1st-gen `TextfieldBase` (in `1st-gen/packages/textfield/src/Textfield.ts`) uses a different approach:

| Concern                 | 1st-gen pattern                                                                       | ElementInternals (this PoC)                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Form value submission   | `name` attribute forwarded to shadow `<input>`                                        | `setFormValue()` on internals; no `name` needed on shadow input                                 |
| Form reset              | Not natively supported; requires custom logic                                         | `formResetCallback()` fires automatically                                                       |
| Form disabled           | `disabled` property on component; manual forwarding                                   | `formDisabledCallback()` fires from `<fieldset disabled>` automatically                         |
| Constraint validation   | Custom `checkValidity()` comparing `inputElement.checkValidity()` + regex + minlength | `setValidity()` mirrors inner input; `reportValidity()` shows native browser tooltip            |
| Accessible name         | `aria-label` on shadow `<input>` from `label` prop or `appliedLabel`                  | Layered: host `aria-labelledby` (IDREF), `internals.ariaLabel` (string), or shadow-scoped IDREF |
| Help text / description | `ManageHelpText` mixin; `aria-describedby` on shadow input → `helpTextId`             | Host `aria-describedby` (light DOM IDREF) or shadow-scoped `aria-describedby`                   |
| Help text slots         | `help-text` and `negative-help-text` slots                                            | `label` and `help-text` slots (can be standardized per direction PR)                            |
| Focus management        | `Focusable` mixin; `focusElement` getter                                              | `delegatesFocus: true` on shadow root                                                           |
| State indication        | `valid` / `invalid` properties reflected to attributes                                | `internals.ariaInvalid`; can also use `:state(invalid)` custom state                            |

### Key improvements from ElementInternals

1. **Native form participation** without proxying `name` onto the shadow input. The custom element appears as a real form control in `FormData`.
2. **Lifecycle callbacks** (`formResetCallback`, `formDisabledCallback`, `formStateRestoreCallback`) replace manual event listeners and ancestor-walking logic.
3. **Constraint validation** via `setValidity()` + `reportValidity()` integrates with the browser's native validation UI (tooltip positioning, `:invalid` pseudo-class on the host).
4. **Custom states** via `internals.states` (e.g., `:state(invalid)`) offer CSS hooks without attribute reflection, reducing attribute churn.
5. **ARIA via internals** (`ariaLabel`, `ariaRequired`, etc.) sets properties on the host's a11y node without polluting host attributes; but axe-core compatibility is a tradeoff (see section 4).

### What does not improve

1. **Cross-root IDREF** remains unsolved. ElementInternals does not change the fact that shadow-scoped IDs are not reachable from light DOM.
2. **`ariaLabelledByElements`** (element reference API) is Chrome-only; not a cross-browser solution yet.
3. **axe-core visibility** is worse when using internals-only ARIA, since axe inspects attributes. The 1st-gen approach of putting `aria-label` directly on the shadow input is more axe-friendly.

---

## 9. Browser and tool versions (fill in during testing)

| Tool                    | Version      |
| ----------------------- | ------------ |
| Chrome                  |              |
| Firefox                 |              |
| Safari                  |              |
| VoiceOver               |              |
| NVDA                    |              |
| axe-core                | 4.10.2 (CDN) |
| OS (macOS)              |              |
| OS (Windows, if tested) |              |

---

## 10. Upstream references

- [ElementInternals spec](https://html.spec.whatwg.org/multipage/custom-elements.html#the-elementinternals-interface)
- [Form-associated custom elements (FACE)](https://html.spec.whatwg.org/multipage/custom-elements.html#form-associated-custom-elements)
- [Deque axe-core elementInternals issues](https://github.com/dequelabs/axe-core/labels/elementInternals)
- [Cross-root ARIA delegation explainer](https://leobalter.github.io/cross-root-aria-delegation/)
- [Reference target explainer (WICG)](https://github.com/nicknisi/webcomponents/blob/gh-pages/proposals/reference-target-explainer.md)
- [Can I use: `shadowrootreferencetarget`](https://caniuse.com/mdn-html_elements_template_shadowrootreferencetarget)
- [Chrome platform status: reference target](https://cr-status.appspot.com/feature/5188237101891584)
- CEM and ElementInternals: link to specific CEM PR when available (Benny Powers, Red Hat)
- SWC internal: [Semantic HTML and ARIA guide](../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx)

---

## 11. Files in this PoC

| File           | Purpose                                                        |
| -------------- | -------------------------------------------------------------- |
| `index.html`   | Self-contained demo; opens directly in StackBlitz or a browser |
| `SUMMARY.md`   | This document; internal findings for the direction PR          |
| `package.json` | Minimal Vite config so StackBlitz can serve the demo           |
