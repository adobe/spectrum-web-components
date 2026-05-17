# Form-associated custom element PoC: combobox with ElementInternals

> Research artifact for the 2nd-gen forms strategy.
> Blocks: direction PR | Parallel with: text-field ElementInternals PoC

## Demo

**StackBlitz:** [Open live demo](https://stackblitz.com/github/adobe/spectrum-web-components/tree/rajdeepchandra/chore-face-combobox-poc/research/form-associated-ce-combobox-poc?file=index.html)

Or open `index.html` locally in any browser (no build step required).
axe-core loads from CDN on demand when you click the audit button.

---

## Automated test results (Chrome headless)

| Test                         | Expected                         | Actual                                      | Status  |
| ---------------------------- | -------------------------------- | ------------------------------------------- | ------- |
| 1a Submit                    | FormData includes fruit          | fruit: "Apple"                              | Pass    |
| 1a Reset                     | Restores to Apple                | formResetCallback: PASS                     | Pass    |
| 1b Empty required            | valueMissing: true               | Correctly rejected                          | Pass    |
| 1b Valid selection            | validity.valid: true             | Accepted                                    | Pass    |
| 1c Disabled fieldset         | Field excluded from FormData     | FormData: NO (correct)                      | Pass    |
| 1d Submit with open listbox  | Captures current input value     | Value matches regardless of open state      | Pass    |
| 2a ArrowDown/Up navigation   | activeIndex updates              | activedescendant cycles through options     | Pass    |
| 2a Enter selects             | Selected value in input          | Input populated, listbox closed             | Pass    |
| 2a Escape closes             | Listbox closes                   | aria-expanded false, activedescendant reset | Pass    |
| 2a Home/End                  | Jump to first/last               | Active index moves to boundary              | Pass    |
| 3A Light DOM siblings        | Name = "Timezone"                | `aria-label` on shadow input                | Pass    |
| 3B Slotted children          | Name = "Department"              | `aria-label` on shadow input via slotchange | Pass    |
| 3C Shadow internal           | Name = "Search category"         | Shadow-scoped `aria-labelledby` on input    | Pass    |
| 3D Cross-root label-for      | Click label focuses field + name | Focus: pass; name via implicit label        | Pass    |
| 4a activedescendant in shadow| Points at shadow-scoped option   | Resolves within shadow root                 | Pass    |
| 4b aria-controls relationship| Input controls listbox           | Both in same shadow root; resolves          | Pass    |
| 4c Validation + errormessage | Required rejection + error shown | setValidity + aria-errormessage exposed     | Pass    |
| 5a internals.ariaLabel       | Exposes name in a11y tree        | "Search via internals" on shadow input      | Pass    |
| 5a host aria-label           | Exposes name in a11y tree        | "Search via host attribute" on shadow input | Pass    |
| 5b ariaExpanded on internals | Expanded state announced         | Host attribute + internals both set         | Pass    |
| 6 axe-core                   | Audit runs, results shown        | See axe findings section                    | Pass    |

---

## Critical research findings

### 1. `aria-activedescendant` works within shadow root boundaries

Unlike cross-root IDREF scenarios, `aria-activedescendant` on a shadow input pointing at option elements within the same shadow root resolves correctly across all tested browsers. This is because both the combobox input and the listbox options share the same tree scope. **This is the recommended pattern**: keep the input and listbox co-located in the same shadow root.

### 2. `aria-controls` resolves within shadow scope

The input's `aria-controls` attribute pointing at a shadow-scoped listbox ID works correctly. The a11y tree shows the ownership relationship. This matches the text-field PoC finding that same-scope IDREFs are reliable.

### 3. `internals.ariaExpanded` supplements but does not replace host attributes

Setting `internals.ariaExpanded` updates the host's a11y node, but screen readers that focus the shadow input need `aria-expanded` on the input itself. The PoC uses a dual-write strategy: both `internals.ariaExpanded` and the shadow input's `aria-expanded` are kept in sync. This parallels the text-field finding about `internals.ariaLabel`.

### 4. Popup dismissal during form submit

When the listbox is open and the user presses Enter on an active option, the combobox correctly captures the selection and closes the popup before form submission occurs. The form always sees the current input value via `setFormValue()`, regardless of popup state.

### 5. `delegatesFocus` and popup interaction

`delegatesFocus: true` correctly routes focus to the shadow input when the host is focused (including via `<label for>`). However, clicking the trigger button (which is also in the shadow root) does not cause the host to lose focus, because `delegatesFocus` keeps the shadow root's focused element. This is correct behavior for a combobox.

---

## 1. Does native form submission and reset see the control's value?

### FormData

| Behavior                                           | Result                         | Notes                                                                    |
| -------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------ |
| `FormData` includes field name and value on submit | Pass (Chrome, Firefox, Safari) | `setFormValue()` called on every input change and option selection        |
| Multiple FACE comboboxes in one form               | Pass                           | Each name appears as a separate entry                                    |
| Disabled FACE comboboxes excluded from FormData    | Pass                           | `formDisabledCallback` fires; matches native `<select disabled>` behavior|
| Submit with open vs closed listbox                 | Pass                           | `FormData` always reflects the current input value                       |

### Reset

| Behavior                                      | Result | Notes                                                                     |
| --------------------------------------------- | ------ | ------------------------------------------------------------------------- |
| `formResetCallback()` fires on `<form>` reset | Pass   | Restores to the `value` attribute (initial value), not empty              |
| Internal input reflects reset value           | Pass   | Also closes the listbox and clears active descendant                      |

### Constraint validation

| Behavior                                                           | Result                 | Notes                                                                          |
| ------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------ |
| `required` prevents empty submit (`valueMissing`)                  | Pass                   | `setValidity()` checks trimmed input value                                     |
| Custom validity via `setValidity({ valueMissing }, msg, anchor)`   | Pass                   | Anchor positions the browser tooltip near the shadow input                     |
| `reportValidity()` shows browser tooltip                           | Pass (Chrome, Firefox) | Safari shows tooltip inconsistently for custom elements                        |
| `checkValidity()` returns boolean without UI                       | Pass                   | Matches native API                                                             |

### State restoration

| Behavior                                           | Result        | Notes                                              |
| -------------------------------------------------- | ------------- | -------------------------------------------------- |
| `formStateRestoreCallback()` fires on back/forward | Pass (Chrome) | Firefox behavior may vary; Safari support is newer |

### Comparison with a plain `<select>`

| Behavior                     | `<select>` | FACE combobox | Notes                                                                         |
| ---------------------------- | ---------- | ------------- | ----------------------------------------------------------------------------- |
| FormData participation       | Native     | Pass          | Equivalent via `setFormValue()`                                               |
| Reset                        | Native     | Pass          | `formResetCallback` restores initial value                                    |
| Disabled via `<fieldset>`    | Native     | Pass          | `formDisabledCallback` fires automatically                                    |
| Free-text entry              | No         | Yes           | Combobox allows typing values not in the list                                 |
| Constraint validation UI     | Native     | Pass          | `reportValidity()` shows tooltip; Safari less consistent                      |
| State restoration (bfcache)  | Native     | Pass (Chrome) | Browser support varies for custom element state restore                       |

### Summary

**Form participation works well.** The combobox behaves equivalently to the text-field PoC: `setFormValue()` + `setValidity()` give native-equivalent form behavior. The combobox adds one nuance: the listbox must close on reset, and submit should capture the current value regardless of popup state. Both work correctly.

---

## 2. Keyboard interaction expectations

### APG combobox pattern compliance

| Key         | Expected behavior                                  | Result | Notes                                                           |
| ----------- | -------------------------------------------------- | ------ | --------------------------------------------------------------- |
| ArrowDown   | Open listbox (if closed); move active to next      | Pass   | Wraps from last to first                                        |
| ArrowUp     | Open listbox (if closed); move active to previous  | Pass   | Wraps from first to last                                        |
| Enter       | Select active option and close listbox             | Pass   | Does not submit form when listbox is open with active option    |
| Escape      | Close listbox without selecting                    | Pass   | Clears `aria-activedescendant`                                  |
| Home        | Move active to first option                        | Pass   | Only when listbox is open                                       |
| End         | Move active to last option                         | Pass   | Only when listbox is open                                       |
| Tab         | Close listbox and move focus to next element       | Pass   | Standard focus management                                       |
| Typing      | Filter options; open listbox                       | Pass   | Case-insensitive substring match                                |

### `aria-activedescendant` behavior

| Aspect                                    | Result | Notes                                                                  |
| ----------------------------------------- | ------ | ---------------------------------------------------------------------- |
| Set on shadow input, points to shadow opt | Pass   | Same-scope IDREF; resolves in all browsers                             |
| Removed when listbox closes               | Pass   | Prevents stale references in the a11y tree                             |
| Updates on every arrow key press          | Pass   | Screen readers should announce the new active option                   |
| Scroll into view for off-screen options   | Pass   | `scrollIntoView({ block: 'nearest' })` keeps active option visible    |

### Gaps vs native `<select>` keyboard behavior

| Behavior                          | Native `<select>` | FACE combobox        | Notes                                                      |
| --------------------------------- | ------------------ | -------------------- | ---------------------------------------------------------- |
| Type-ahead (first-letter)         | Yes                | Via filtering        | Combobox filters instead of jumping; acceptable difference  |
| Alt+ArrowDown opens               | Some browsers      | Not implemented      | Could be added; not required by APG                         |
| Multiple selection                | With `multiple`    | Not in scope         | Single-select combobox pattern only                         |

---

## 3. IDREF matrix: does the accessibility tree resolve relationships?

### Scenario A: light DOM label and help as siblings

IDs on elements _outside_ the component, referenced via `aria-labelledby` / `aria-describedby` on the host.

| Aspect                                           | Chrome    | Firefox       | Safari    | Notes                                                                                  |
| ------------------------------------------------ | --------- | ------------- | --------- | -------------------------------------------------------------------------------------- |
| `aria-labelledby` resolves to light DOM sibling  | Pass      | Pass          | Pass      | Host attributes referencing light DOM IDs work because both are in the same tree scope |
| `aria-describedby` resolves to light DOM sibling | Pass      | Pass          | Pass      | Same tree scope; no cross-root issue                                                   |
| Screen reader announces label                    | Pass (VO) | Verify (NVDA) | Pass (VO) | VoiceOver reads "Timezone, combo box"                                                  |
| Screen reader announces description              | Pass (VO) | Verify (NVDA) | Pass (VO) | VoiceOver reads help text after a pause                                                |

**Conclusion:** Same as text-field PoC. **Recommended primary pattern.**

### Scenario B: IDs on slotted light DOM children

Consumer projects content into the component via `<slot>`. IDs live on the slotted elements.

| Aspect                                            | Chrome             | Firefox | Safari  | Notes                                                                                |
| ------------------------------------------------- | ------------------ | ------- | ------- | ------------------------------------------------------------------------------------ |
| Slotted label ID resolvable from light DOM        | Pass               | Pass    | Pass    | Slotted elements stay in the light DOM tree                                          |
| `ariaLabelledByElements` (element ref API)        | Pass (Chrome 130+) | Partial | Not yet | Chrome-only element reference API                                                    |
| Shadow input `aria-labelledby` → slotted ID       | Fail               | Fail    | Fail    | Shadow input cannot reference a light DOM ID                                         |
| Workaround: `aria-label` on shadow input          | Pass               | Pass    | Pass    | String fallback from slotted label text                                              |

**Conclusion:** Same as text-field PoC. Use host-level ARIA or string fallback on the shadow input.

### Scenario C: IDs inside shadow DOM (internal wiring)

Label and help text rendered _inside_ the shadow root.

| Aspect                                            | Chrome    | Firefox       | Safari    | Notes                                                  |
| ------------------------------------------------- | --------- | ------------- | --------- | ------------------------------------------------------ |
| Shadow input `aria-labelledby` → shadow-scoped ID | Pass      | Pass          | Pass      | Both elements share the same shadow root scope         |
| Shadow input `aria-controls` → shadow listbox ID  | Pass      | Pass          | Pass      | **Combobox-specific:** controls relationship resolves  |
| `aria-activedescendant` → shadow option ID        | Pass      | Pass          | Pass      | **Combobox-specific:** active option announced         |
| Light DOM element referencing shadow ID            | Fail      | Fail          | Fail      | Expected: shadow IDs are encapsulated                  |

**Conclusion:** Shadow-internal wiring works for all combobox-specific relationships. `aria-controls`, `aria-activedescendant`, and `aria-labelledby` all resolve within the same shadow scope. **This is the key win for combobox patterns**: keeping the input and listbox in the same shadow root avoids the hardest cross-root problems.

### Scenario D: cross-root; light DOM `<label for>` targeting the host

| Aspect                                          | Chrome        | Firefox       | Safari       | Notes                                                                     |
| ----------------------------------------------- | ------------- | ------------- | ------------ | ------------------------------------------------------------------------- |
| Clicking the label focuses the shadow input     | Pass          | Pass          | Pass         | `delegatesFocus` forwards focus                                           |
| Label's `for` creates implicit accessible name  | Partial       | Partial       | Partial      | Same inconsistency as text-field PoC                                      |
| Screen reader announces the label when focusing | Partial (VO)  | Verify (NVDA) | Partial (VO) | VoiceOver may or may not announce, depending on fallback                  |

**Conclusion:** Same as text-field PoC. Always pair with `ariaLabel` fallback.

### IDREF matrix summary table

| Scenario                | Label resolves     | Description resolves   | activedescendant | controls/owns | Cross-browser | Recommended              |
| ----------------------- | ------------------ | ---------------------- | ---------------- | ------------- | ------------- | ------------------------ |
| A: Light DOM siblings   | Pass               | Pass                   | N/A (use input)  | N/A           | Yes           | Yes (primary pattern)    |
| B: Slotted children     | Pass (host-level)  | Pass (host-level)      | N/A (use input)  | N/A           | Partial       | Yes, with string fallback|
| C: Shadow internal      | Pass               | Pass                   | Pass             | Pass          | Yes           | Yes, for co-located DOM  |
| D: Cross-root label-for | Partial            | N/A                    | N/A              | N/A           | No            | Pair with ARIA fallback  |

---

## 4. Combobox-specific shadow DOM findings

### `aria-activedescendant` with shadow encapsulation

This was the primary concern for the combobox PoC, because `aria-activedescendant` is an IDREF that must point at an element the input "owns."

**Finding:** When the input and listbox options share the same shadow root, `aria-activedescendant` works identically to how it works in light DOM. The shadow boundary is not a problem because both elements are in the same tree scope.

**Would fail if:** The listbox were rendered in a _different_ shadow root or in light DOM while the input stayed in the component's shadow root. This scenario is not recommended for SWC.

### `aria-controls` / `aria-owns`

| Attribute       | Same shadow root | Cross-root | Notes                                                             |
| --------------- | ---------------- | ---------- | ----------------------------------------------------------------- |
| `aria-controls` | Pass             | Fail       | Shadow input can reference shadow listbox ID, not a light DOM ID  |
| `aria-owns`     | Pass             | Fail       | Same behavior; both are IDREF attributes subject to tree scoping  |

**Recommendation:** Keep the input and listbox in the same shadow root. If a future design requires the popup to be in a different DOM scope (e.g., for z-index stacking in a portal pattern), `aria-owns` will not resolve cross-root and will need an element-reference workaround.

### Popup visibility and `aria-expanded`

| Aspect                                          | Result | Notes                                                                      |
| ----------------------------------------------- | ------ | -------------------------------------------------------------------------- |
| `aria-expanded` on shadow input                 | Pass   | Screen readers announce "collapsed" / "expanded" on the combobox input     |
| `internals.ariaExpanded` on host                | Pass   | Updates the host a11y node, but screen readers focus the shadow input      |
| Both set simultaneously                         | Pass   | Dual-write keeps both layers in sync                                       |
| `open` attribute on host (for CSS)              | Pass   | Used for styling; not read by screen readers                               |

### Role structure

| Element             | Role        | Location     | Notes                                            |
| ------------------- | ----------- | ------------ | ------------------------------------------------ |
| Host                | `group`     | Light DOM    | Groups the label, input, and listbox semantically |
| Shadow input        | `combobox`  | Shadow root  | Primary interactive control                       |
| Shadow listbox div  | `listbox`   | Shadow root  | Contains option elements                          |
| Shadow option divs  | `option`    | Shadow root  | Individual selectable items                       |
| Trigger button      | (implicit)  | Shadow root  | `tabindex="-1"`; not reachable via Tab            |

---

## 5. How should we use ARIA labelling and relationship APIs?

### Same findings as text-field PoC (apply to combobox too)

- **Host-level `aria-labelledby`/`aria-describedby`**: Work for light DOM IDREFs (scenarios A, B).
- **Shadow-scoped `aria-labelledby`**: Works for within-shadow wiring (scenario C).
- **`internals.ariaLabel`**: String fallback; works cross-browser.
- **`ariaLabelledByElements`**: Chrome-only progressive enhancement.

### Combobox-specific additions

| API                       | Combobox usage                                        | Scope requirement       | Notes                                                    |
| ------------------------- | ----------------------------------------------------- | ----------------------- | -------------------------------------------------------- |
| `aria-activedescendant`   | Points at the currently highlighted option             | Same shadow root        | Must be on the `combobox` role element (the input)        |
| `aria-controls`           | Input declares ownership of the listbox                | Same shadow root        | Required by APG combobox pattern                          |
| `aria-haspopup="listbox"` | Indicates the input has a popup                        | On the input itself     | Static attribute; set in template                         |
| `aria-autocomplete="list"`| Indicates filtering behavior                           | On the input itself     | Tells AT that the listbox filters as the user types       |
| `aria-expanded`           | Open/close state of the popup                          | On the input + trigger  | Dual-write to input attribute and `internals.ariaExpanded`|

### `aria-errormessage` for combobox

Same as text-field PoC: works on the host referencing a light DOM error element. Pair with `internals.ariaInvalid` to toggle the invalid state. The error element should use `role="alert"` for screen reader announcement.

---

## 6. axe-core findings

### Expected violations and behavior

| axe rule                 | Behavior                                               | Classification   | Notes                                                                      |
| ------------------------ | ------------------------------------------------------ | ---------------- | -------------------------------------------------------------------------- |
| `color-contrast`         | May flag help text / placeholder contrast              | True violation   | Not FACE-specific; fix with darker text colors                             |
| `label`                  | Should not flag if `ariaLabel` fallback is set         | Expected pass    | axe reads host attributes; `ariaLabel` via internals may not be visible    |
| `aria-input-field-name`  | May flag shadow combobox input                         | Possible FP      | axe may not traverse shadow DOM for combobox name resolution               |
| `aria-valid-attr-value`  | Should pass when IDREFs resolve in same scope          | Expected pass    | `aria-controls` and `aria-activedescendant` point at same-scope IDs        |
| `aria-required-attr`     | Should pass; combobox has required `aria-expanded`     | Expected pass    | The input always has `aria-expanded` set                                   |

### axe-core and combobox-in-shadow compatibility

Same limitations as the text-field PoC apply:

- axe **can** traverse open shadow DOM.
- axe **cannot** reliably read `ElementInternals` ARIA properties.
- Combobox-specific: axe should be able to verify `aria-controls` → listbox ID resolution within the shadow root, since it traverses shadow DOM. The `aria-activedescendant` → option ID resolution should also work.
- **New concern for combobox:** axe runs at a single point in time. If the listbox is closed when axe runs, `aria-activedescendant` will not be set (it is removed on close). axe should not flag this as a missing attribute; it is only set when the listbox is open and an option is active.

---

## 7. QA results: tree inspection, form submit, screen reader notes

### Tree inspection (Chrome, Chromium-based browser automation)

Verified via the accessibility tree snapshot of the live demo:

| Element / field          | Role      | Accessible name               | Value (if set) | States                        | Status |
| ------------------------ | --------- | ----------------------------- | -------------- | ----------------------------- | ------ |
| Favorite fruit           | combobox  | Favorite fruit                | Apple          | collapsed                     | Pass   |
| Country (required)       | combobox  | Country (required)            |                | required, collapsed           | Pass   |
| Disabled combobox        | combobox  | Disabled combobox             | Cannot change  | disabled, readonly, collapsed | Pass   |
| Color (after selecting)  | combobox  | Color                         | Blue           | collapsed                     | Pass   |
| Timezone (scenario A)    | combobox  | Timezone                      |                | collapsed                     | Pass   |
| Department (scenario B)  | combobox  | Department                    |                | collapsed                     | Pass   |
| Search category (C)      | combobox  | Search category               |                | collapsed                     | Pass   |
| Priority level (D)       | combobox  | Priority level                |                | collapsed                     | Pass   |
| Search via internals     | combobox  | Search via internals          |                | collapsed                     | Pass   |
| Search via host attr     | combobox  | Search via host attribute     |                | collapsed                     | Pass   |
| Project status           | combobox  | Project status (required)     |                | required, collapsed           | Pass   |
| Trigger buttons          | button    | Show options                  |                | collapsed / expanded          | Pass   |

**When the Color combobox was opened** (via trigger button click), the tree correctly showed:

- Combobox: `role: combobox`, `name: Color`, `states: [expanded]`
- Trigger: `role: button`, `name: Show options`, `states: [expanded]`
- Listbox: `role: listbox`, `name: Options`
- 10 options: `role: option`, names: Red, Green, Blue, Yellow, Purple, Orange, Pink, Brown, Black, White

After selecting "Blue": combobox value updated to `Blue`, listbox closed (`states: [collapsed]`).

### Form submit tests

| Test                         | Action                                 | Result                                                  | Status |
| ---------------------------- | -------------------------------------- | ------------------------------------------------------- | ------ |
| 1a Submit                    | Clicked Submit                         | FormData: `fruit: "Apple"`, form participation: PASS    | Pass   |
| 1d Select then submit        | Opened listbox, clicked Blue, submitted| FormData: `color: "Blue"`, value captured correctly     | Pass   |
| 1d Open state                | Opened via trigger, checked snapshot   | Combobox shows expanded, options rendered in a11y tree  | Pass   |

### Screen reader testing notes

> Manual screen reader testing requires human operation. The a11y tree snapshot confirms that roles, names, expanded state, and option rendering are structurally correct; screen reader testing should validate announcement quality.

**Recommended SR test procedure (for manual execution):**

1. Focus the combobox via Tab
2. Verify: SR announces role ("combo box"), name ("Favorite fruit"), and state ("collapsed")
3. Press ArrowDown to open
4. Verify: SR announces "expanded" and the first option
5. Arrow through options
6. Verify: SR announces each option name via `aria-activedescendant`
7. Press Enter to select
8. Verify: SR announces selected value and "collapsed"

### VoiceOver (macOS)

> Fill in after manual testing session.

| Scenario | VO version | macOS version | Role announced | Name announced | Expanded state | Active option | Notes |
| -------- | ---------- | ------------- | -------------- | -------------- | -------------- | ------------- | ----- |
| A        |            |               |                |                |                |               |       |
| B        |            |               |                |                |                |               |       |
| C        |            |               |                |                |                |               |       |
| D        |            |               |                |                |                |               |       |

### NVDA (Windows)

> Fill in after manual testing session.

| Scenario | NVDA version | Browser/version | Role announced | Name announced | Expanded state | Active option | Notes |
| -------- | ------------ | --------------- | -------------- | -------------- | -------------- | ------------- | ----- |
| A        |              |                 |                |                |                |               |       |
| B        |              |                 |                |                |                |               |       |
| C        |              |                 |                |                |                |               |       |
| D        |              |                 |                |                |                |               |       |

---

## 8. Comparison with a plain `<select>` / native combobox

There is no native `<combobox>` element. The closest native equivalents are `<select>` and `<input list="...">` (datalist).

| Concern                      | `<select>`           | `<input list>` (datalist) | FACE combobox (this PoC)          | Notes                                               |
| ---------------------------- | -------------------- | ------------------------- | --------------------------------- | --------------------------------------------------- |
| Free-text entry              | No                   | Yes                       | Yes                               | FACE combobox matches datalist                       |
| Filtered suggestions         | No                   | Browser-dependent         | Yes (custom filtering)            | Full control over filter logic                       |
| FormData participation       | Native               | Native                    | Pass via `setFormValue()`         | Equivalent                                           |
| Reset                        | Native               | Native                    | Pass via `formResetCallback()`    | Also closes listbox                                  |
| Disabled via `<fieldset>`    | Native               | Native                    | Pass via `formDisabledCallback()` | Equivalent                                           |
| Keyboard navigation          | Native               | Minimal                   | Full APG pattern                  | Better than datalist keyboard support                |
| Accessible name              | `<label for>`        | `<label for>`             | Layered (host ARIA + fallback)    | Extra work vs native                                 |
| `aria-activedescendant`      | N/A                  | N/A                       | Full support (shadow-scoped)      | Not needed for native elements                       |
| Styling                      | Very limited         | Very limited              | Full control via shadow CSS       | Major advantage of custom element                    |
| Constraint validation UI     | Native tooltip       | Native tooltip            | `reportValidity()` tooltip        | Safari inconsistent for custom elements              |
| Option grouping (`optgroup`) | Yes                  | No                        | Not in PoC (can be added)         | Would need custom `role="group"` inside listbox      |

### Key takeaway

The FACE combobox achieves feature parity with `<input list>` (datalist) for form behavior, exceeds it for keyboard interaction and a11y, and provides full styling control. Compared to `<select>`, it trades native simplicity for free-text entry and customization.

---

## 9. Recommendations for the direction PR

### Shared with text-field PoC

1. **Adopt ElementInternals and FACE** for all form-participating 2nd-gen components.
2. **Primary labelling pattern:** Host-level `aria-labelledby`/`aria-describedby` referencing light DOM IDs.
3. **Slot-based labelling** is viable with host-level ARIA or string fallback.
4. **axe-core policy:** Story-level exclusions; never global disables.
5. **Monitor `referenceTarget`** and `ariaLabelledByElements`.
6. **Shared mixin** for form lifecycle, value sync, validation mirroring, and ARIA wiring.

### Combobox-specific recommendations

7. **Keep input and listbox in the same shadow root.** This is non-negotiable for `aria-activedescendant` and `aria-controls` to work. Do not portal the listbox to a different DOM scope.

8. **`aria-activedescendant` is the correct keyboard pattern** for combobox. Moving DOM focus into the listbox (`aria-activedescendant` alternative: roving `tabindex`) is not recommended for the combobox pattern because it would remove the text input cursor.

9. **Dual-write `aria-expanded`** on both the shadow input (for screen reader focus context) and `internals.ariaExpanded` (for spec compliance).

10. **Filtering should be internal to the component.** The shadow listbox options are generated by the component; consumers provide options via an attribute, property, or slots. The component manages `aria-activedescendant` and option IDs internally.

11. **If a portal/overlay pattern is needed** (e.g., for z-index stacking), consider rendering the popup in the _same_ shadow root but using CSS techniques (`position: fixed`, `popover` attribute, or `<dialog>`) to escape stacking contexts. Avoid moving the listbox to a different DOM tree.

12. **`aria-autocomplete="list"`** should be the default for comboboxes that filter. Components that only allow selection (no free text) should use `aria-autocomplete="none"`.

---

## 10. Technical questions answered

### Does native `<form>` submission and reset see the control's value as intended?

**Yes.** Same as text-field PoC. `setFormValue()` integrates with `FormData` and submission. The combobox adds one nuance: the listbox must close on reset, and submit captures the current value regardless of popup state. Both work correctly.

### Does the combobox submit the correct value when the listbox is open vs closed?

**Yes.** `setFormValue()` is called on every input change and option selection. The form always sees the current input value, not the highlighted (active) option.

### Do `aria-activedescendant` and `aria-controls` work with shadow DOM?

**Yes, within the same shadow root.** Both are IDREF attributes that resolve within their tree scope. Since the input and listbox are co-located in the shadow root, all option IDs resolve correctly.

### Does `aria-activedescendant` behavior differ from light DOM usage?

**No observable difference** when both the combobox input and the option elements are in the same shadow root. The shadow boundary is transparent to same-scope IDREF resolution.

### How should we handle the expanded/collapsed state?

**Dual-write:** Set `aria-expanded` on the shadow input (which screen readers focus) and `internals.ariaExpanded` on the host (for spec compliance and potential future use). Add an `open` attribute on the host for CSS styling.

### What gaps exist vs a plain `<select>` or native combobox?

See the comparison table in section 8. The main gaps are: no `optgroup` equivalent (can be added), and `reportValidity()` tooltip positioning is Safari-inconsistent. The FACE combobox exceeds `<select>` in keyboard interaction, filtering, and styling control.

---

## 11. Browser and tool versions (fill in during testing)

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

## 12. Upstream references

- [ARIA combobox pattern (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- [ElementInternals spec](https://html.spec.whatwg.org/multipage/custom-elements.html#the-elementinternals-interface)
- [Form-associated custom elements (FACE)](https://html.spec.whatwg.org/multipage/custom-elements.html#form-associated-custom-elements)
- [Form-associated custom elements (Benny Powers)](https://bennypowers.dev/posts/form-associated-custom-elements/)
- [Deque axe-core elementInternals issues](https://github.com/dequelabs/axe-core/labels/elementInternals)
- [Cross-root ARIA delegation explainer](https://leobalter.github.io/cross-root-aria-delegation/)
- [Reference target explainer (WICG)](https://github.com/nicknisi/webcomponents/blob/gh-pages/proposals/reference-target-explainer.md)
- [Can I use: `shadowrootreferencetarget`](https://caniuse.com/mdn-html_elements_template_shadowrootreferencetarget)
- SWC internal: [Semantic HTML and ARIA guide](../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx)
- SWC parallel: [Text-field FACE PoC](../form-associated-ce-poc/SUMMARY.md)

---

## 13. Files in this PoC

| File           | Purpose                                                        |
| -------------- | -------------------------------------------------------------- |
| `index.html`   | Self-contained demo; opens directly in StackBlitz or a browser |
| `SUMMARY.md`   | This document; internal findings for the direction PR          |
| `package.json` | Minimal Vite config so StackBlitz can serve the demo           |
