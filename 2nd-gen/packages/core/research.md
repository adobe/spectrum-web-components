# Core Package Cleanup Research

Analysis of `2nd-gen/packages/core/` against contributor style guides and modern browser capabilities.
**Target browsers:** last 2 versions of Chrome, Safari, and Firefox.

---

## 1. spectrum-element.ts — SpectrumElement & SpectrumMixin

### 1.1 Remove `.focus-visible` polyfill fallback

**File:** `element/spectrum-element.ts:66-69`
**What:** `hasVisibleFocusInTree()` falls back to `.focus-visible` CSS class after checking `:focus-visible`.

```ts
return (
  activeElement.matches(':focus-visible') ||
  activeElement.matches('.focus-visible') // <-- polyfill fallback
);
```

**Why remove:** `:focus-visible` has been supported since Chrome 86, Firefox 85, and Safari 15.4. The `.focus-visible` class was applied by the [focus-visible polyfill](https://github.com/WICG/focus-visible) for older browsers. All target browsers support it natively. The comment on line 63 ("Browsers without support for the `:focus-visible` selector will throw on the following test (Safari, older things)") is also outdated — Safari has supported `:focus-visible` since March 2022.

**Action:** Remove the `|| activeElement.matches('.focus-visible')` branch and the outdated comment.

### 1.2 Simplify `hasVisibleFocusInTree()` ancestor traversal

**File:** `element/spectrum-element.ts:37-57`
**What:** The `getAncestors` inner function builds a full ancestor chain but only the first element (`activeElement`) is ever used (line 58).

```ts
const activeElement = getAncestors(this.getRootNode() as Document)[0];
```

**Why simplify:** Only `[0]` (the deepest active element) is consumed. The ancestor-building loop (lines 46-55) is dead code — ancestors are pushed but never read. This can be replaced with a simple "find deepest active element" loop.

**Action:** Replace with a focused utility that walks `shadowRoot.activeElement` to the leaf, removing the unused ancestor collection.

### 1.3 Consider replacing computed `dir` getter with CSS `:dir()`

**File:** `element/spectrum-element.ts:80-82`
**What:** The `dir` getter calls `getComputedStyle(this).direction` on every access.

```ts
public override get dir(): CSSStyleDeclaration['direction'] {
  return getComputedStyle(this).direction ?? 'ltr';
}
```

**Why reconsider:** The CSS `:dir()` pseudo-class is now supported in Chrome 120+, Firefox 49+, and Safari 16.4+. Components could use `:host(:dir(rtl))` in CSS instead of reading a JS property, avoiding layout-triggering `getComputedStyle` calls. If `dir` is only consumed by CSS (e.g., to flip layouts), the getter is unnecessary overhead. If consumed in JS logic, it's still valid — but worth auditing downstream usage.

**Action:** Audit consumers. If `dir` is only used for CSS-driven layout flips, move to `:host(:dir(rtl))` selectors and remove the getter. If used in JS, keep but document the cost.

### 1.4 Nullish coalescing on `direction` is unnecessary

**File:** `element/spectrum-element.ts:81`

`getComputedStyle(this).direction` returns `""` (empty string) at worst, never `null` or `undefined`. The `?? 'ltr'` fallback will never trigger because `""` is not nullish. If the intent is to catch empty strings, use `|| 'ltr'` instead.

**Action:** Change `??` to `||` or remove if empty direction is impossible in practice.

---

## 2. language-resolution.ts — LanguageResolutionController

### 2.1 Remove 1st-gen `sp-language-context` provider bridge

**File:** `controllers/language-resolution.ts:16-18, 184-203`
**What:** The controller dispatches an `sp-language-context` CustomEvent to discover a 1st-gen `<sp-theme>` language provider. The TODO on line 16 acknowledges this: `// TODO: Update this when theme is migrated to 2nd-gen`.

```ts
type ProvideLang = {
  callback: (lang: string, unsubscribe: () => void) => void;
};
```

The `resolveLanguage()` method (lines 184-203), the `unsubscribe` field, and the `ProvideLang` type exist solely for this 1st-gen bridge.

**Why remove:** In pure 2nd-gen there is no `sp-theme` language provider. The `<html lang>` observer already provides the correct behavior for 2nd-gen. If 1st-gen compatibility is no longer needed, the entire provider pattern is dead code.

**Action:** Confirm whether 1st-gen interop is still required. If not:

- Remove `ProvideLang` type
- Remove `unsubscribe` field and its usage in `hostDisconnected()`
- Remove `resolveLanguage()` method
- Simplify `hostConnected()` to just register the lang listener
- Remove the `if (this.unsubscribe)` guard in `handleLangChange()`

### 2.2 `bind(this)` in `hostConnected` — use arrow method instead

**File:** `controllers/language-resolution.ts:150`

```ts
this.removeLangListener = addLangListener(this.handleLangChange.bind(this));
```

**Why:** Per style guide, prefer arrow functions/methods for callbacks to avoid runtime `bind()` allocation on every connect. `handleLangChange` is called on every `<html lang>` mutation and the listener is re-registered on each connect.

**Action:** Convert `handleLangChange` to an arrow method: `private handleLangChange = (): void => { ... }`.

---

## 3. observe-slot-text.ts — ObserveSlotText Mixin

### 3.1 Replace `@lit-labs/observers` with `@lit/observers` or native

**File:** `mixins/observe-slot-text.ts:14`

```ts
import { MutationController } from '@lit-labs/observers/mutation-controller.js';
```

**Why:** `@lit-labs/observers` is an experimental/labs package. The `MutationController` it provides is a thin wrapper around native `MutationObserver`. Given that the mixin already manages its own lifecycle via the Lit controller protocol, using the native `MutationObserver` directly (connected in `connectedCallback`, disconnected in `disconnectedCallback`) would remove the external dependency entirely. Alternatively, check if `@lit/observers` (graduated, stable) is available.

**Action:** Replace `MutationController` with a native `MutationObserver` managed in the constructor/connectedCallback/disconnectedCallback, or upgrade to `@lit/observers` if graduated.

_Same applies to `observe-slot-presence.ts:13`._

### 3.2 `notExcluded` has inverted naming

**File:** `mixins/observe-slot-text.ts:34-36`

```ts
const notExcluded = (el: HTMLElement) => (selector: string) => {
  return el.matches(selector);
};
```

**Why:** The function returns `true` when the element **matches** an excluded selector — meaning it **is** excluded. But it's named `notExcluded`. It's used with `.some(notExcluded(node))` (line 85, 99) which reads as "some are not excluded" when the intent is "some exclusion selectors match this node." This is confusing and a style guide readability concern.

**Action:** Rename to `matchesExclusion` or inline the check: `excludedSelectors.some(s => node.matches(s))`.

### 3.3 Pre-slot content check in `update()` is a 1st-gen workaround

**File:** `mixins/observe-slot-text.ts:93-113`
**What:** The `update()` override scans `childNodes` before the first render to determine `slotHasContent`, because slot assignment hasn't happened yet.

**Why reconsider:** This is a pattern from 1st-gen where components needed to know about content before slots were assigned. In 2nd-gen, the `firstUpdated` + `updateComplete` handler (lines 115-119) already handles the post-render case. If components can tolerate a single render cycle without `slotHasContent`, the `update()` workaround can be removed, simplifying the lifecycle.

**Action:** Audit 2nd-gen consumers. If none depend on `slotHasContent` being set before first render, remove the `update()` override.

---

## 4. observe-slot-presence.ts — ObserveSlotPresence Mixin

### 4.1 Duplicate `querySelector` call per selector

**File:** `mixins/observe-slot-presence.ts:89-95`

```ts
const nextValue = !!this.querySelector(`:scope > ${selector}`);
// ...
this[slotContentIsPresent].set(
  selector,
  !!this.querySelector(`:scope > ${selector}`) // <-- second query
);
```

**Why:** Each selector triggers two identical DOM queries. The second call on line 95 should use `nextValue` instead.

**Action:** Replace the second `querySelector` with `nextValue`:

```ts
this[slotContentIsPresent].set(selector, nextValue);
```

### 4.2 `updateComplete.then(() => this.requestUpdate())` is fragile

**File:** `mixins/observe-slot-presence.ts:98-100`

```ts
if (changes) {
  this.updateComplete.then(() => {
    this.requestUpdate();
  });
}
```

**Why:** This schedules an additional update after the current update completes. It creates an extra render cycle for every mutation change. A direct `this.requestUpdate()` should suffice — Lit batches updates and the mutation callback fires asynchronously anyway.

**Action:** Replace with `this.requestUpdate()` directly. If the `updateComplete` delay is needed for a specific reason, document it.

### 4.3 Replace `@lit-labs/observers` (same as 3.1)

See finding 3.1 — same dependency, same recommendation.

---

## 5. sized-mixin.ts — SizedMixin

### 5.1 `toLocaleLowerCase()` is overkill for ASCII size values

**File:** `mixins/sized-mixin.ts:65`

```ts
const size = (value ? value.toLocaleLowerCase() : value) as ElementSize;
```

**Why:** Size values are ASCII strings (`'xxs'`, `'xs'`, `'s'`, `'m'`, `'l'`, `'xl'`, `'xxl'`). `toLocaleLowerCase()` invokes locale-aware case conversion (e.g., Turkish İ → i rules), which is unnecessary overhead for these values. `toLowerCase()` is correct here.

**Action:** Replace `toLocaleLowerCase()` with `toLowerCase()`.

### 5.2 `update()` override to ensure attribute exists

**File:** `mixins/sized-mixin.ts:82-86`

```ts
protected override update(changes: PropertyValues): void {
  if (!this.hasAttribute('size') && !noDefaultSize) {
    this.setAttribute('size', this.size);
  }
  super.update(changes);
}
```

**Why:** The setter already calls `this.setAttribute('size', validSize)` (line 70), so this `update()` fallback only fires if the element is created without a `size` attribute. This could be handled once in `connectedCallback` or `firstUpdated` instead of checking on every update cycle.

**Action:** Move to `firstUpdated()` or `connectedCallback()` to avoid per-update overhead. Alternatively, set the default attribute in the constructor after super().

---

## 6. define-element.ts — defineElement

### 6.1 Missing error handling for duplicate registration

**File:** `element/define-element.ts:21-31`
**What:** The function warns in debug mode about duplicate definitions, but then unconditionally calls `customElements.define()` (line 30), which will **throw** a `DOMException` if the name is already registered.

```ts
if (window.__swc && window.__swc.DEBUG) {
  if (customElements.get(name)) {
    window.__swc.warn(/* ... */);
  }
}
customElements.define(name, constructor); // throws if already defined
```

**Why:** The warn-then-crash pattern means the debug warning is followed by an uncaught exception. The function should either guard the define call or use a try/catch.

**Action:** Wrap `customElements.define()` or early-return when `customElements.get(name)` already exists:

```ts
if (customElements.get(name)) {
  // warn in debug, but don't throw
  return;
}
customElements.define(name, constructor);
```

---

## 7. get-label-from-slot.ts — getLabelFromSlot

### 7.1 Simplify with `textContent` on slot

**File:** `utils/get-label-from-slot.ts:20-33`

```ts
const textContent = slotEl
  .assignedNodes()
  .reduce((accumulator: string, node: Node) => {
    if (node.textContent) {
      return accumulator + node.textContent;
    } else {
      return accumulator;
    }
  }, '');
```

**Why:** This manually concatenates `textContent` from each assigned node. A simpler approach:

```ts
const textContent = slotEl
  .assignedNodes()
  .map((n) => n.textContent ?? '')
  .join('');
```

Or even simpler — if the slot has a single wrapper element, just read its `textContent` directly.

**Action:** Simplify the reduce to a map+join.

---

## 8. Cross-Cutting Concerns

### 8.1 Duplicated `Constructor` type across 3 files

The identical type alias appears in:

- `element/spectrum-element.ts:17-20`
- `mixins/observe-slot-text.ts:18-21`
- `mixins/observe-slot-presence.ts:17-20`
- `mixins/sized-mixin.ts:15-18`

```ts
type Constructor<T = Record<string, unknown>> = {
  new (...args: any[]): T;
  prototype: T;
};
```

**Action:** Extract to a shared types file (e.g., `types/constructor.ts`) and import across all mixins.

### 8.2 Missing JSDoc per style guide requirements

Per the style guide, public methods and class declarations require JSDoc. Missing on:

- `SpectrumMixin` function — no `@param` or `@returns` tags
- `hasVisibleFocusInTree()` — no description
- `ObserveSlotText` function — no `@param` tags for `slotName` and `excludedSelectors`
- `ObserveSlotPresence` function — no `@param` tag for `lightDomSelector`
- `SizedMixin` function — no `@param` tags for options
- `defineElement` — no `@param` tags

### 8.3 `@lit-labs/observers` dependency should be evaluated

**File:** `package.json` dependencies
Both `observe-slot-text.ts` and `observe-slot-presence.ts` depend on `@lit-labs/observers`. This is a labs (experimental) package. Options:

1. **Replace with native `MutationObserver`** — removes the dependency entirely, ~10 lines of code per mixin
2. **Upgrade to `@lit/observers`** — if the package has graduated to stable
3. **Keep as-is** — if the Lit team recommends it for controller integration

**Recommendation:** Option 1 (native) for maximum control and zero external dependency.

---

## Summary: Priority Order

| Priority | Finding                                      | Impact                                   | Effort      |
| -------- | -------------------------------------------- | ---------------------------------------- | ----------- |
| P0       | 4.1 Duplicate querySelector                  | Bug/perf — wasted DOM queries            | Trivial     |
| P0       | 6.1 defineElement throws after warn          | Bug — uncaught exception                 | Trivial     |
| P1       | 1.1 Remove .focus-visible fallback           | Dead code removal                        | Trivial     |
| P1       | 1.2 Simplify ancestor traversal              | Dead code removal                        | Low         |
| P1       | 2.1 Remove sp-language-context bridge        | Dead code (if 1st-gen compat not needed) | Medium      |
| P1       | 5.1 toLocaleLowerCase → toLowerCase          | Correctness                              | Trivial     |
| P1       | 1.4 Nullish coalescing on direction          | Correctness                              | Trivial     |
| P2       | 3.1/4.3 Replace @lit-labs/observers          | Dependency cleanup                       | Medium      |
| P2       | 8.1 Deduplicate Constructor type             | DRY                                      | Low         |
| P2       | 4.2 Remove updateComplete.then pattern       | Perf — extra render cycle                | Low         |
| P2       | 5.2 Move size attribute init out of update() | Perf — per-update overhead               | Low         |
| P2       | 3.3 Remove pre-slot update() workaround      | Simplification                           | Medium      |
| P2       | 7.1 Simplify getLabelFromSlot                | Readability                              | Trivial     |
| P3       | 1.3 CSS :dir() to replace JS dir getter      | Modern CSS adoption                      | Medium-High |
| P3       | 2.2 bind(this) → arrow method                | Style consistency                        | Trivial     |
| P3       | 3.2 Rename notExcluded                       | Readability                              | Trivial     |
| P3       | 8.2 Add missing JSDoc                        | Style guide compliance                   | Low         |
