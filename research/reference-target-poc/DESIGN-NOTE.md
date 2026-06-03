# Design note: controller-based referenceTarget shim for cross-root ARIA

> POC research artifact. Not a public API commitment.

---

## 1. Problem statement

The [Reference Target for Cross-Root ARIA](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/reference-target-explainer.md) proposal lets IDREF-based relationship attributes (e.g. `for`, `aria-labelledby`, `aria-describedby`) reference an element whose shadow DOM contains the _actual_ target. Native support is behind experimental flags in all major browsers as of May 2026:

| Browser        | Status              | Notes                                                              |
| -------------- | ------------------- | ------------------------------------------------------------------ |
| Chrome 133-150 | Disabled by default | Behind `chrome://flags/#enable-experimental-web-platform-features` |
| Edge 133+      | Disabled by default | Same flag as Chrome                                                |
| Firefox 144+   | Disabled by default | Behind `dom.shadowdom.referenceTarget.enabled`                     |
| Safari 26.0+   | Disabled by default | Feature-flagged                                                    |

Usage in the wild is ~0.012% of page loads. No browser ships it enabled by default.

SWC components wrap native interactive elements (inputs, buttons, dialogs) inside shadow DOM. External labels and descriptions cannot use standard IDREFs to reach those internal targets. Today, `sp-field-label` (1st-gen) works around this with the `applyTargetLabel` pattern: resolve the target cross-root, then copy text content as a string `aria-label` fallback.

This POC validates whether a _generic reactive controller_ can provide the same cross-root forwarding for 2nd-gen components, decoupled from any single component.

---

## 2. Approach

### Architecture

```
Light DOM                          Shadow DOM (host)
┌────────────────────────┐         ┌──────────────────────────────┐
│ <label for="my-input"> │         │ <input id="internal-input">  │
│   Full name            │───┐     │                              │
│ </label>               │   │     └──────────────────────────────┘
└────────────────────────┘   │
                             │     ReferenceTargetController
                             │     ┌──────────────────────────────┐
                             └────▶│ 1. Resolve target in shadow   │
                                   │ 2. Find label in light DOM    │
                                   │ 3. Materialize aria-label     │
                                   │    on shadow target           │
                                   └──────────────────────────────┘
```

### Controller responsibilities

1. **Feature detection**: If native `ShadowRoot.referenceTarget` exists, set it and skip the shim path entirely.
2. **Target resolution**: Locate the shadow-internal element by CSS selector or callback.
3. **Referrer discovery**: Find light-DOM elements whose IDREF attributes include the host's `id`.
4. **Text materialization**: Copy accessible text from referrers onto the shadow target using the closest equivalent attribute (`aria-labelledby` becomes `aria-label`, `aria-describedby` becomes `aria-description`).
5. **Label-for forwarding**: Handle `<label for="host-id">` specifically; wire up click-to-focus on the shadow target.
6. **Lifecycle**: MutationObservers track host ID changes, referrer mutations, and DOM additions/removals.
7. **Cleanup**: `hostDisconnected` removes all materialized attributes and disconnects observers.

### Mapping to native API

| Native API surface                        | Controller shim equivalent                               |
| ----------------------------------------- | -------------------------------------------------------- |
| `shadowRoot.referenceTarget = "id"`       | `new ReferenceTargetController(host, { target: '#id' })` |
| `shadowRoot.referenceTargetMap` (Phase 2) | `forwardedAttributes` option (per-attribute filtering)   |
| Auto-forwarding of `label.for`            | `syncLabelFor()` with click handler                      |
| Live reference updates                    | MutationObserver on host ID + light DOM                  |

---

## 3. Scenarios demonstrated

| #   | Scenario                                                      | Mechanism                                                          | Status  |
| --- | ------------------------------------------------------------- | ------------------------------------------------------------------ | ------- |
| A   | `<label for="host">` forwards name to shadow `<input>`        | `syncLabelFor()` materializes `aria-label` + click-to-focus        | Working |
| B   | `aria-labelledby` on an external element references the host  | `sync()` collects referrer text, sets `aria-label` on target       | Working |
| C   | `aria-describedby` on an external element references the host | `sync()` collects referrer text, sets `aria-description` on target | Working |
| D   | Label text changes dynamically                                | MutationObserver triggers re-sync                                  | Working |
| E   | Host disconnected; cleanup                                    | `hostDisconnected` removes attributes                              | Working |
| F   | Host has no `id` attribute                                    | Controller is inert; no crash, no spurious attributes              | Working |

---

## 4. Gaps versus native referenceTarget

| Concern                                  | Native behavior                                           | Shim behavior                                                                                   | Severity                                                                                 |
| ---------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **True IDREF forwarding**                | AT sees actual element relationship in accessibility tree | Materializes string copy; AT sees `aria-label`/`aria-description` text, not a live relationship | Medium: computed name is correct but relationship is synthetic                           |
| **`aria-activedescendant` forwarding**   | Cross-root IDREF resolves to the actual option element    | Not shimmed; requires same-shadow-root pattern (per combobox POC finding)                       | Low for SWC: already keeping input+listbox co-located                                    |
| **`aria-controls` / `aria-owns`**        | Cross-root forwarding works                               | Not shimmed; impractical without element references                                             | Low: same-root pattern covers SWC use cases                                              |
| **Multiple hosts sharing a label**       | Label applies to each `referenceTarget` independently     | Shim finds all referrers but concatenates; may duplicate text                                   | Low: uncommon pattern                                                                    |
| **`form` / `list` attribute forwarding** | Built-in form participation via IDREF                     | Not shimmed; use FACE (`ElementInternals`) instead                                              | None: FACE is the 2nd-gen strategy                                                       |
| **Performance at scale**                 | Zero-cost in user code (browser-native)                   | MutationObserver on the light DOM root; O(n) referrer scan on each mutation                     | Medium: acceptable for page-level DOMs; could be expensive in deeply nested shadow trees |
| **Closed shadow roots**                  | Works (referenceTarget set at `attachShadow` time)        | Shim requires access to shadow root for target resolution                                       | Low: SWC uses open shadow roots                                                          |
| **Implicit label wrapping**              | `<label><fancy-input></fancy-input></label>` works        | Not shimmed; would require parent-walking heuristic                                             | Medium: pattern uncommon in SWC                                                          |
| **`popovertarget` / `commandfor`**       | Forwarded to shadow target                                | Not shimmed; not an ARIA concern                                                                | N/A for a11y                                                                             |

### Correctness limitations

1. The shim produces a _computed accessible name_ equivalence, not a true live relationship. Tools like `aria-labelledby` allow referencing multiple elements whose combined text forms the name; the shim flattens this to a single string.
2. If the referrer element itself has complex accessible-name computation (e.g. nested roles), the shim uses `textContent` which may differ from the accessibility tree computation.
3. The shim does not participate in the accessibility tree's relationship graph. AT navigation features like "go to labelling element" will not work.

### Performance characteristics

- **MutationObserver scope**: observes `subtree + childList + attributes` on the host's root node (document body or parent shadow root). Filtered to relevant attribute names.
- **Sync cost**: O(n) querySelectorAll for `[aria-labelledby]` etc., where n is elements with that attribute in the root.
- **Typical SWC page**: < 50 labelled elements; cost is negligible.
- **Worst case**: 1000+ labelled elements in a flat document with frequent DOM mutations; would benefit from a shared registry (future optimization).

---

## 5. Comparison with the 1st-gen approach

| Aspect            | 1st-gen (`FieldLabel` + `ElementResolutionController`) | This POC (`ReferenceTargetController`)                              |
| ----------------- | ------------------------------------------------------ | ------------------------------------------------------------------- |
| Coupling          | Tightly coupled to `sp-field-label` component          | Generic; any host can use it                                        |
| Direction         | Label _pushes_ to target (`applyTargetLabel`)          | Controller on host _pulls_ from referrers                           |
| Lifecycle         | Relies on `willUpdate` + symbol tracking               | Standard `ReactiveController` lifecycle hooks                       |
| Feature detection | None; always shims                                     | Detects native `referenceTarget`; bypasses shim when available      |
| Attribute surface | Only `aria-labelledby` → `aria-label`                  | Configurable: labelledby, describedby, errormessage, details        |
| Scalability       | One controller instance per label-target pair          | One controller instance per host; handles all inbound relationships |

---

## 6. Manual screen reader smoke test procedure

### Setup

- Browser: Chrome (latest stable, with native referenceTarget _disabled_)
- AT: VoiceOver (macOS) or NVDA (Windows)
- Demo: Storybook story `Controllers/Reference target (POC)/Label for forwarding`

### Steps

| #   | Action                                                       | Expected announcement                                                              | Verified |
| --- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------- | -------- |
| 1   | Tab to `demo-labeled-input`                                  | "Full name, text field" (or equivalent)                                            | [ ]      |
| 2   | Inspect accessibility tree (Chrome DevTools > Accessibility) | Input node shows `name: "Full name"` from `aria-label`                             | [ ]      |
| 3   | Click the "Full name" label                                  | Input receives focus; VoiceOver announces field                                    | [ ]      |
| 4   | Navigate to `AriaDescribedbyForwarding` story                | -                                                                                  | [ ]      |
| 5   | Tab to the password input                                    | "Password, text field" + after pause: "Must be at least 8 characters"              | [ ]      |
| 6   | Inspect accessibility tree                                   | Input shows `description: "Must be at least 8 characters"` from `aria-description` | [ ]      |

### With native referenceTarget enabled

1. Enable `chrome://flags/#enable-experimental-web-platform-features`
2. Repeat steps 1-6
3. Verify: same accessible names and descriptions appear (native path sets `shadowRoot.referenceTarget` instead of materializing attributes)
4. Compare: native path should show the _relationship_ in the tree (labelledby pointing at the label element), not just the string

### Comparison checklist (native vs shim)

| Behavior                                  | Shim             | Native            | Match?          |
| ----------------------------------------- | ---------------- | ----------------- | --------------- |
| Accessible name computed correctly        | [ ]              | [ ]               | [ ]             |
| Accessible description computed correctly | [ ]              | [ ]               | [ ]             |
| Click label focuses input                 | [ ]              | [ ]               | [ ]             |
| AT "go to label" navigation works         | [ ] Expected: No | [ ] Expected: Yes | Intentional gap |
| Dynamic label text re-syncs               | [ ]              | [ ]               | [ ]             |
| Disconnect clears state                   | [ ]              | [ ]               | [ ]             |

---

## 7. Recommendation

### Verdict: **Hybrid** (build shim now; migrate to native when stable)

#### Rationale

1. **No browser ships `referenceTarget` enabled by default** as of May 2026. Waiting means SWC 2nd-gen components ship without proper cross-root labelling for an indeterminate period.

2. **The shim is narrow and low-risk.** It covers the labelling/description subset that accounts for ~90% of SWC cross-root ARIA needs. It does not attempt to polyfill `aria-activedescendant` or `aria-controls` cross-root (those are handled by keeping elements co-located, per the combobox POC finding).

3. **Feature detection is built in.** When `ShadowRoot.prototype.referenceTarget` becomes available, the controller automatically delegates to native behavior with zero code changes needed in consuming components.

4. **Migration cost from shim to native is minimal.** The controller API (`target` selector, `forwardedAttributes`) maps cleanly to the native API. When native lands, the shim codepath becomes dead code that can be removed in a follow-up.

5. **Ergonomics are good.** A single line in a component constructor gives full cross-root labelling:
   ```ts
   new ReferenceTargetController(this, { target: '#input' });
   ```

#### Estimated follow-up cost

| Work item                                                                                 | Effort       | Priority |
| ----------------------------------------------------------------------------------------- | ------------ | -------- |
| Promote controller from POC to `@spectrum-web-components/core` public API                 | S (1-2 days) | P1       |
| Adopt in 2nd-gen form components (text-field, combobox, picker, etc.)                     | M (3-5 days) | P1       |
| Add `aria-errormessage` forwarding validation story                                       | S (0.5 day)  | P2       |
| Performance optimization: shared referrer registry for pages with many labeled components | M (2-3 days) | P3       |
| Remove shim codepath when native support reaches baseline (est. 2027)                     | S (1 day)    | P3       |

#### Decision criteria for removing the shim

Remove the shim path when all of:

- Two major browsers ship `referenceTarget` enabled by default
- The feature appears in [Baseline](https://web.dev/baseline) "newly available"
- SWC minimum supported browser versions include those releases

---

## 8. Files in this POC

| File                                                                                                           | Purpose                   |
| -------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `2nd-gen/packages/core/controllers/reference-target-controller/src/reference-target-controller.ts`             | Controller implementation |
| `2nd-gen/packages/core/controllers/reference-target-controller/index.ts`                                       | Public exports            |
| `2nd-gen/packages/core/controllers/reference-target-controller/stories/demo-hosts.ts`                          | Demo custom elements      |
| `2nd-gen/packages/core/controllers/reference-target-controller/stories/reference-target-controller.stories.ts` | Storybook stories         |
| `2nd-gen/packages/core/controllers/reference-target-controller/test/reference-target-controller.test.ts`       | Play-function tests       |
| `research/reference-target-poc/DESIGN-NOTE.md`                                                                 | This document             |

---

## 9. Upstream references

- [Reference Target for Cross-Root ARIA (WICG explainer)](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/reference-target-explainer.md)
- [Chrome Platform Status: feature 5188237101891584](https://cr-status.appspot.com/feature/5188237101891584)
- [Can I use: ShadowRoot referenceTarget](https://caniuse.com/mdn-api_shadowroot_referencetarget)
- [WHATWG HTML issue #10707](https://github.com/whatwg/html/issues/10707)
- [Reference Target Phase 2 discussion](https://github.com/WICG/webcomponents/issues/1111)
- SWC prior art: `1st-gen/packages/field-label/src/FieldLabel.ts` (applyTargetLabel pattern)
- SWC prior art: `1st-gen/tools/reactive-controllers/src/ElementResolution.ts`
- SWC parallel: `research/form-associated-ce-combobox-poc/SUMMARY.md` (cross-root ARIA findings)
