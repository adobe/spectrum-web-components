<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Toast / Toast accessibility migration analysis

<!-- Document title (editable) -->

# Toast accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What a toast is](#what-a-toast-is)
    - [What it is not](#what-it-is-not)
    - [When to use something else](#when-to-use-something-else)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-toast>`](#recommendations-swc-toast)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Assistive technology, live regions](#assistive-technology-live-regions)
    - [Keyboard and focus](#keyboard-and-focus)
- [Known 1st-gen issues](#known-1st-gen-issues)
    - [Role placement and type](#role-placement-and-type)
    - [Timer pause incomplete](#timer-pause-incomplete)
    - [`aria-hidden` when closed](#aria-hidden-when-closed)
    - [Action button and auto-dismiss](#action-button-and-auto-dismiss)
    - [Documentation](#documentation)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
    - [Manual screen reader testing](#manual-screen-reader-testing)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc covers how `swc-toast` should work for accessibility. It targets WCAG 2.2 Level AA. Until `swc-toast` exists under `2nd-gen/`, use `1st-gen/packages/toast/src/Toast.ts` (`<sp-toast>`) to validate behavior, and update this spec against the real 2nd-gen source when it ships.

### Also read

[Toast migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM changes.

### What a toast is

A temporary, non-modal notification that appears briefly on screen to communicate a status update without interrupting user flow. Toasts require minimal user attention and disappear automatically after a minimum of 6 seconds, or when the user dismisses them.

### What it is not

Not a replacement for critical error messaging or decisions requiring mandatory user response. `swc-toast` uses `role="alertdialog"` by design; this does not make it a general-purpose dialog. It may include one optional action button, but that action must never be required to complete a task or continue a flow. If a user must confirm, acknowledge, or act before continuing, use a dialog component instead.

### When to use something else

- Message requires user confirmation or action before the user can continue: use a dialog.
- Status must remain visible until explicitly dismissed: use an alert banner or inline message.
- Sequential log of updates (for example, a notification history): use a container with `role="log"`.
- Error that must be resolved before the user can proceed: use inline field validation or an error dialog.

---

## ARIA and WCAG context

### Pattern in the APG

- The [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/) does not define a dedicated "toast" pattern. The closest patterns are the [alert pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) and the guidance in [WCAG 4.1.3 Status Messages](https://www.w3.org/TR/WCAG22/#status-messages).
- The APG [alert pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) uses `role="alert"` (which implies `aria-live="assertive"`). This is appropriate for urgent, time-sensitive errors but is too disruptive for most toast use cases. Toasts are typically informational and should use the less interruptive `role="status"` (which implies `aria-live="polite"`).
- WCAG 4.1.3 identifies both `role="status"` and `role="alert"` as ways to satisfy the requirement that status messages be determinable programmatically without focus. For `swc-toast`, `role="status"` is the prescribed approach.

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [Status Messages (WCAG 4.1.3)](https://www.w3.org/TR/WCAG22/#status-messages) | Status messages must be programmatically determinable without receiving focus. The `role="status"` on the host satisfies this requirement by creating a polite live region. |
| [Timing Adjustable (WCAG 2.2.1)](https://www.w3.org/TR/WCAG22/#timing-adjustable) | Auto-dismissing content must be visible long enough for users to read and interact with it. The minimum is 6 seconds; add 1 second per 120 words beyond the first 120. The timer must pause on focus and hover. |
| [Pause, Stop, Hide (WCAG 2.2.2)](https://www.w3.org/TR/WCAG22/#pause-stop-hide) | Moving or auto-updating content that lasts more than 5 seconds must be pausable by the user. Auto-dismiss timers apply. |
| [Content on Hover or Focus (WCAG 1.4.13)](https://www.w3.org/TR/WCAG22/#content-on-hover-or-focus) | Content that appears on hover or focus must be dismissible, hoverable (without dismissing), and persistent. For toast, the countdown timer must pause when the pointer is over the component. |
| [Use of Color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | Variant meaning (negative, positive, informative) must not be conveyed by color alone. Icon labels or message text must carry the semantic meaning. |
| [Contrast (WCAG 1.4.3)](https://www.w3.org/TR/WCAG22/#contrast-minimum) | Text inside the toast must meet the 4.5:1 contrast ratio for normal text. |
| [Non-text Contrast (WCAG 1.4.11)](https://www.w3.org/TR/WCAG22/#non-text-contrast) | The close button and action button must meet 3:1 non-text contrast against their adjacent colors. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | All interactive elements within the toast (close button, action button) must be keyboard accessible. |
| [Name, Role, Value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | The close button and any action button must have accessible names. The toast host must expose its role (`status`) to the accessibility tree. |

**Bottom line:** `swc-toast` must expose its content as a polite live region via `role="status"` on the host element, with `aria-hidden="true"` when closed. The auto-dismiss timer must pause on hover and focus. The close button and any action button must have accessible names. Color alone must not convey variant meaning.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|-------------------------|---------|
| [SWC-281](https://jira.corp.adobe.com/browse/SWC-281) | Bug | Done | Fixed | A screen reader should announce a toast message when it is added to the DOM |
| [SWC-280](https://jira.corp.adobe.com/browse/SWC-280) | Bug | Done | Fixed | Toast should have API for overriding the icon's alt text |
| [SWC-610](https://jira.corp.adobe.com/browse/SWC-610) | Bug | To Do | Unresolved | [Bug/Research]: Toast timeout minimum differs from design docs |

---

## Recommendations: `<swc-toast>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **Host role: `role="alertdialog"`** | Prescribed and fixed on the host element. `role="alertdialog"` conveys that the toast is a non-modal notification that may contain interactive controls (close button, optional action button). Set `aria-modal="false"` so assistive technologies do not restrict browsing outside the toast. Set `tabindex="0"` on the host so focus lands on the dialog element itself rather than its first focusable child. Do not allow authors to override this role. This pattern aligns with the [React Spectrum Toast](https://react-spectrum.adobe.com/react-spectrum/Toast.html) implementation. |
| **Inner `role="alert"` (live region)** | An inner shadow DOM element wraps the notification content and carries `role="alert"` with `aria-atomic="true"`. This creates an assertive live region that announces the full toast message when the component opens, without requiring the user to navigate to it. The `role="alertdialog"` on the host provides the interactive dialog semantics; the inner `role="alert"` handles the automatic announcement. This matches the React Spectrum structure: `<div role="alert" aria-atomic="true">` inside the alertdialog. |
| **`aria-labelledby` on host** | The `role="alertdialog"` host must have an accessible name. Align with React Spectrum: the host carries `aria-labelledby` referencing a stable ID on the content element. Because the notification text is in the default slot (light DOM), the ID is resolvable from the host without crossing a shadow boundary. When no explicit content ID is available, the component should fall back to setting `aria-label` dynamically from the resolved slot text content. |
| **`aria-hidden` when closed** | When the toast is not open, set `aria-hidden="true"` on the host to suppress the alertdialog and its inner live region from the accessibility tree. Remove `aria-hidden` (or set `aria-hidden="false"`) when the toast opens. This is more reliable across browsers than relying on CSS `visibility: hidden` to suppress live region announcements, and prevents unexpected announcements when DOM content changes while the toast is hidden. |
| **Timer pause (hover and focus-within)** | The auto-dismiss timer must pause both when the pointer is over the component (`pointerenter`) and when focus is within the component (`focusin`). Resume the timer only when both conditions have ended (`pointerleave` and `focusout`). These two conditions are independent: if both are active simultaneously, the timer must not resume until both have cleared. Pausing on pointer hover satisfies WCAG 1.4.13; pausing on focus-within ensures keyboard and screen reader users have sufficient time to read and interact with the toast before it dismisses. |
| **Variant icon labels** | Variant icons carry accessible labels as part of the live region content. Align with the React Spectrum structure: render the icon with `role="img"` and `aria-label` set to the icon label ("Information", "Error", "Success" by default). Authors can override via the `icon-label` attribute. Document that the icon label may produce redundant announcements if the message already states the type (for example, "Error: Your upload failed"). Authors can set `icon-label=""` to suppress it when the message text conveys the type fully. |
| **Close button** | Must have an accessible name ("Close"). 1st-gen uses `label="Close"` on `sp-close-button`. 2nd-gen should use `swc-close-button` with the same label. The close button's label is on the button element itself; no cross-root ARIA concern. |
| **Action button slot** | Design allows a maximum of one action button per toast. The `action` slot is light DOM; authors must provide a descriptive label (for example, "Undo file deletion" rather than just "Undo"). Docs must state the one-action limit explicitly. |
| **`variant` and color** | `variant` is visual-only. Do not auto-map `variant` to `aria-invalid`, `aria-relevant`, or other ARIA properties. The icon label and message text carry semantic meaning; color is supplementary and must not be the only differentiator. |
| **Docs** | Document the `role="alertdialog"` + inner `role="alert"` pattern and why it is used. Document the 6-second minimum, the hover-and-focus pause behavior, and the one-action limit. Do not claim `variant` sets ARIA states. |
| **Consumer docs (timing formula)** | The consumer migration guide must include the following timing guidance verbatim: "Auto-dismissing content must be visible long enough for users to read and interact with it. The minimum is 6 seconds; add 1 second per 120 words beyond the first 120. The timer must pause on focus and hover." This is a WCAG 2.2.1 requirement; it must not be omitted or paraphrased into vagueness. |

### Shadow DOM and cross-root ARIA Issues

The `aria-labelledby` on the host (`role="alertdialog"`) must reference an ID that resolves from the host's perspective. Notification text lives in the default slot, which is light DOM authored by the consumer. As long as the ID is on a light DOM element (or the component sets `aria-label` dynamically from the slot text), no shadow boundary is crossed. If the component attempts to use `aria-labelledby` to reference an ID on an element inside the shadow root, that reference will not resolve for the host element — this is the standard cross-root ARIA limitation for non-`aria-owns` relationships. The implementation must avoid this: either use light DOM IDs from the slot content, or derive the label programmatically and apply it as `aria-label` on the host.

The inner `role="alert"` element and its contents are entirely within the shadow DOM. The `aria-atomic` attribute and the live region behavior of that element do not require any cross-shadow ID references; the browser detects the `role="alert"` element becoming visible or its content changing and fires the announcement.

The action slot is light DOM; the author-provided button and its label do not create cross-root ARIA concerns.

The close button (`swc-close-button`) is a web component in shadow DOM; its accessible name is set via its own `label` property and does not require cross-root ARIA.

### Accessibility tree expectations

The structure below follows the React Spectrum Toast pattern.

**Toast (closed)**

```
host [aria-hidden="true"]
  (not in accessibility tree)
```

**Toast with text only (open)**

```
host [role="alertdialog", aria-modal="false", tabindex="0", aria-labelledby="[content-id]"]
  └── (shadow) alert [role="alert", aria-atomic="true"]
        └── [text content from default slot, id="[content-id]"]
  └── (shadow) close button: "Close"
```

Screen reader announces assertively when toast opens: "[message text]". Focus is placed on the host alertdialog element.

**Toast with icon + text (open)**

```
host [role="alertdialog", aria-modal="false", tabindex="0", aria-labelledby="[content-id]"]
  └── (shadow) alert [role="alert", aria-atomic="true"]
        └── img [role="img", aria-label="Information" / "Error" / "Success"]
        └── [text content from default slot, id="[content-id]"]
  └── (shadow) close button: "Close"
```

Screen reader announces assertively: "[icon label] [message text]" — for example, "Error Toast is burned!". Authors can suppress the icon label with `icon-label=""` when the message text already conveys the type.

**Toast with action button (open)**

```
host [role="alertdialog", aria-modal="false", tabindex="0", aria-labelledby="[content-id]"]
  └── (shadow) alert [role="alert", aria-atomic="true"]
        └── img [role="img", aria-label="[variant label]"]
        └── [text content from default slot, id="[content-id]"]
  └── (slot) action button: [author-provided label]   ← light DOM
  └── (shadow) close button: "Close"
```

Screen reader announces the full alert content when the toast opens. Focus is on the alertdialog host; Tab then moves to the action button and close button.

### Assistive technology, live regions

**Open design question — toast container ownership:** PR review feedback and the React Spectrum implementation surface an important unresolved design question: should `swc-toast` ship alongside a first-party `swc-toast-queue` (or equivalent) container component, or should authors compose their own container? The React Spectrum approach provides a `ToastQueue` that manages a `role="region"` wrapper labeled with the live notification count (for example, `aria-label="2 notifications."`), renders toasts in an ordered list, manages focus across toasts on dismiss, and handles live region coordination for the group. The individual `swc-toast` component alone cannot fully replicate this behavior. This question should be raised at a team sync before finalizing the 2nd-gen API.

The React Spectrum container structure for reference:

```html
<div role="region" tabindex="-1" aria-label="2 notifications.">
  <ol>
    <li>
      <swc-toast role="alertdialog" aria-modal="false" tabindex="0" aria-labelledby="[id]"> … </swc-toast>
    </li>
    <li>
      <swc-toast role="alertdialog" aria-modal="false" tabindex="0" aria-labelledby="[id]"> … </swc-toast>
    </li>
  </ol>
</div>
```

**Assertive inner alert:** The inner `role="alert"` element uses assertive semantics by definition. This is appropriate because each toast is already scoped as an `alertdialog` — the announcement is bounded to a single dialog unit, reducing the interruption risk compared to a page-level assertive live region. Docs should still warn against stacking many toasts simultaneously and recommend batching updates (a single summary toast, or a progress bar) for bulk operations.

**Container region and landmark navigation:** When a container is used, the `role="region"` wrapper with a dynamic `aria-label` (for example, `"2 notifications."`) makes the toast area discoverable via landmark navigation (F6/Shift+F6 in JAWS and NVDA). Without a container, this landmark is absent and screen reader users must rely solely on the live region announcements. If no first-party container ships with 2nd-gen, the docs must show the manual container pattern and note this limitation.

**Actionable toasts and timing:** When an action button is present, auto-dismiss should generally be disabled or set to a much longer timeout. A screen reader user who hears the alert announcement and moves focus to the toast (via Tab or the live region) needs sufficient time to activate the action. The docs must warn against combining `timeout` with the `action` slot.

### Keyboard and focus

Focus placement: When a toast opens, focus is placed on the `role="alertdialog"` host element itself (`tabindex="0"`), not on the first focusable child. This matches the React Spectrum behavior confirmed by the RS team (Michael Jordan): "We actually want to focus the alert dialog element itself, rather than the first focusable element."

When the toast has focus:

- Tab moves focus from the alertdialog host to the action button (if present), then to the close button.
- Shift+Tab reverses that order.
- Enter or Space activates the focused button.
- Arrow keys are not used to navigate between toasts; Tab handles all toast and action navigation (confirmed by the RS team: "We use Tab to navigate between Toasts, and actions within the Toasts, in the ToastContainer list. No need for down/up arrow keys.").

Focus management on dismiss:

- When the user activates the close button or action button, the `close` event fires. The calling application is responsible for returning focus to a logical location.
- When a toast auto-dismisses and focus is on the toast at the time, focus is lost. If a container (`swc-toast-queue` or author-composed) manages the list, it should move focus to the next toast in the list, or return focus to the triggering element when the last toast dismisses. Without a container, `swc-toast` fires the `close` event and the application must handle focus return.

Timer pause (hover and focus-within): The auto-dismiss timer must pause both when the pointer enters the toast (`pointerenter`) and when focus moves inside the toast (`focusin`). The timer resumes only when both conditions have ended — `pointerleave` and `focusout`. If a user is both hovering and has focus inside simultaneously, the timer must not resume until both have cleared. The 1st-gen already pauses on `focusin`; 2nd-gen must additionally pause on `pointerenter` to satisfy WCAG 1.4.13 for pointing-device users.

---

## Known 1st-gen issues

Gaps in `sp-toast` that `swc-toast` should fix and cover with tests.

### Role placement and type

The 1st-gen places `role="alert"` directly on the inner shadow DOM `.body` div with no outer dialog semantics. This exposes a flat live region with no interactive dialog identity — the toast announces its content but does not signal to AT that it is a dismissible, potentially actionable notification. The 2nd-gen should use `role="alertdialog"` (with `aria-modal="false"` and `tabindex="0"`) on the host for the dialog semantics, and retain `role="alert"` with `aria-atomic="true"` on an inner shadow DOM element for the live region announcement. This aligns with the React Spectrum implementation and properly represents the component's interactive nature. The migration guide should document both the structural change and the rationale.

### Timer pause incomplete

The 1st-gen pauses the countdown timer on `focusin` and resumes on `focusout`, but does not pause on hover. WCAG 1.4.13 requires that content appearing on pointer hover can be kept visible while the pointer is over it. For auto-dismissing toasts, pausing on hover lets sighted users with pointing devices read the content without racing the timer.

The 2nd-gen must pause the timer on both `pointerenter` and `focusin`, and resume only when both conditions have cleared (`pointerleave` and `focusout`). If the pointer is over the toast while focus is also inside it, the timer must not resume until both have ended.

### `aria-hidden` when closed

The 1st-gen controls visibility via CSS (`visibility: hidden; opacity: 0` when not open) but does not set `aria-hidden` on the host. The inner `role="alert"` div remains in the accessibility tree when the toast is closed, which can cause unexpected announcements in some browsers when DOM content changes while the toast is hidden. The 2nd-gen should set `aria-hidden="true"` on the host when `open` is false.

### Action button and auto-dismiss

The 1st-gen has no documentation or guardrails preventing auto-dismiss from triggering when an action button is in the slot. A user relying on a screen reader may hear the toast announcement and then try to Tab to the action button, only to have the toast dismiss before they get there. The 2nd-gen docs should strongly advise against combining `timeout` with the `action` slot, and a dev warning should fire when both are set simultaneously.

### Documentation

The 1st-gen README mentions the minimum timeout and the `role="region"` container recommendation, but does not address hover pause, does not explain why `role="alert"` is not recommended for application use, and does not warn about the action-button-plus-auto-dismiss hazard.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | Host has `role="alertdialog"`, `aria-modal="false"`, `tabindex="0"`. Inner shadow element has `role="alert"` and `aria-atomic="true"`. Host has `aria-hidden="true"` when `open` is false. Countdown pauses on `focusin` and `pointerenter`; resumes on `focusout` and `pointerleave`. Close button has accessible name "Close". Timeout below 6000ms is raised to 6000ms. Variant icon labels and `role="img"` render correctly per variant. |
| **aXe + Storybook** | Run WCAG 2.x rules on all toast stories: default (no variant), positive, negative, info; with and without action button; closed state. |
| **Playwright ARIA snapshots** | `toast.a11y.spec.ts`: cover closed state (aria-hidden), text-only, icon + text, and with action button. Verify `role="alertdialog"` on host, `role="alert"` on inner element, button accessible names, and correct icon labels per variant. |
| **Color contrast** | Verify text contrast (4.5:1) and close button non-text contrast (3:1) for all variants. Check forced-colors (high-contrast) mode. |

### Manual screen reader testing

Automated tests can verify ARIA attributes but cannot verify that the live region announcement actually fires or that the announced text is correct. The following scenarios require manual testing with a screen reader:

1. **Live region announcement:** Open a toast while a screen reader is active and verify the full message (icon label + text content) is announced automatically without requiring focus.
2. **Tab navigation:** While a toast is open, Tab into it and verify the action button (if present) and close button are reachable and their labels are announced correctly.
3. **Dismiss and focus return:** Activate the close button from keyboard focus and verify the toast closes; confirm where focus goes and whether the application returns it to an appropriate location.
4. **Auto-dismiss:** Verify that the auto-dismiss timer fires and that no announcement repeats after the toast closes.

See the 2nd-gen Storybook [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) guide for browser and screen reader combinations to use.

---

## Summary checklist

- [ ] Host element carries `role="alertdialog"`, `aria-modal="false"`, and `tabindex="0"`.
- [ ] Inner shadow DOM element carries `role="alert"` and `aria-atomic="true"` (the live region).
- [ ] Host carries `aria-labelledby` referencing the content element ID (light DOM), or `aria-label` derived dynamically from slot text content when no explicit ID is present.
- [ ] `aria-hidden="true"` is set on the host when `open` is false; removed when `open` is true.
- [ ] Focus is placed on the alertdialog host element when a toast opens (not on the first focusable child).
- [ ] Tab navigates from the alertdialog host to the action button (if present), then to the close button; arrow keys are not used.
- [ ] Auto-dismiss timer enforces a minimum of 6000ms.
- [ ] Countdown pauses on both `focusin` and `pointerenter`; resumes on `focusout` and `pointerleave`.
- [ ] Close button has an accessible name ("Close" by default).
- [ ] Variant icons render with `role="img"` and `aria-label`; defaults are "Information", "Error", "Success", "Warning"; author can override via `icon-label`.
- [ ] Action button slot is limited to one action; docs state this limit explicitly.
- [ ] Docs warn against using `timeout` when the `action` slot is populated.
- [ ] Docs include the `role="region"` container pattern (with `aria-label` and notification count) for applications showing multiple toasts.
- [ ] Open design question — container ownership — is raised at team sync before the 2nd-gen API is finalized.
- [ ] Docs do not claim `variant` sets ARIA states; color alone does not convey variant meaning.
- [ ] Dev warning fires when `timeout` and the `action` slot are both set.
- [ ] aXe (WCAG 2.x) runs on all toast stories.
- [ ] ARIA snapshot tests cover: closed state, text-only, icon + text, and with action button; verify `role="alertdialog"` on host and `role="alert"` on inner element.
- [ ] Manual screen reader testing verifies the live region announcement fires, focus lands on the alertdialog host, and interactive elements are reachable per the [Storybook screen reader testing guide](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx).

---

## References

- [WAI-ARIA 1.2: `alertdialog` role](https://www.w3.org/TR/wai-aria-1.2/#alertdialog)
- [WAI-ARIA 1.2: `alert` role](https://www.w3.org/TR/wai-aria-1.2/#alert)
- [WAI-ARIA 1.2: `status` role](https://www.w3.org/TR/wai-aria-1.2/#status)
- [WCAG 2.2: 4.1.3 Status Messages](https://www.w3.org/TR/WCAG22/#status-messages)
- [WCAG 2.2: 2.2.1 Timing Adjustable](https://www.w3.org/TR/WCAG22/#timing-adjustable)
- [WCAG 2.2: 2.2.2 Pause, Stop, Hide](https://www.w3.org/TR/WCAG22/#pause-stop-hide)
- [WCAG 2.2: 1.4.13 Content on Hover or Focus](https://www.w3.org/TR/WCAG22/#content-on-hover-or-focus)
- [WCAG 2.2: 1.4.1 Use of Color](https://www.w3.org/TR/WCAG22/#use-of-color)
- [WCAG 2.2: 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG22/#name-role-value)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [APG: Alert pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
- [Scott O'Hara: A toast to (better) accessibility](https://www.scottohara.me/blog/2019/07/08/a-toast-to-a11y-toasts.html)
- [Sheri Byrne-Haber: Designing toast messages for accessibility](https://sheribyrnehaber.medium.com/designing-toast-messages-for-accessibility-fb610ac364be)
- [USWDS: Accessible notifications discussion](https://github.com/uswds/uswds/discussions/5770)
- [React Spectrum: Toast](https://react-spectrum.adobe.com/react-spectrum/Toast.html)
- [Toast migration roadmap](./rendering-and-styling-migration-analysis.md)
- [2nd-gen Storybook: Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)
