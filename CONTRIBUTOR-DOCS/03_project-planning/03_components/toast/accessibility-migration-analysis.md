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
    - [Hover pause missing](#hover-pause-missing)
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

Not a dialog, alert dialog, or replacement for critical error messaging. Toasts should not contain actions the user must take to complete a task. If a user must confirm, acknowledge, or act before continuing, use a dialog component instead.

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
| — | — | — | — | *No 1st-gen `sp-toast`–specific items in this snapshot.* |

---

## Recommendations: `<swc-toast>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **Host role: `role="status"`** | Prescribed and fixed on the host element. `role="status"` implies `aria-live="polite"` and `aria-atomic="true"`, ensuring the full toast message is announced once when the toast becomes visible without interrupting other announcements. Do not allow authors to override this role on the host element. If a different role is needed, the application should use a different component or pattern. |
| **Why not `role="alert"` on host** | The 1st-gen `sp-toast` places `role="alert"` on the inner `.body` div (assertive). `role="alert"` interrupts any announcement in progress, including other toasts, screen reader navigation, and content being read. This is appropriate for critical, time-sensitive errors requiring immediate user attention but not for routine status updates, success messages, or informational notices. Regardless of variant (including `negative`), `role="status"` (polite) is the correct role for `swc-toast`. Errors that require immediate user action should use a modal dialog, not a toast. |
| **`aria-hidden` when closed** | When the toast is not open, set `aria-hidden="true"` on the host to suppress the live region from the accessibility tree. Remove `aria-hidden` (or set `aria-hidden="false"`) when the toast opens. This is more reliable across browsers than relying on CSS `visibility: hidden` to suppress live region announcements, and prevents unexpected announcements when DOM content changes while the toast is hidden. |
| **Variant icon labels** | Variant icons (info, negative, positive) carry accessible labels into the live region content. Defaults inherited from 1st-gen: "Information" (info), "Error" (negative/error), "Warning" (warning, deprecated), "Success" (positive). Authors can override via the `icon-label` attribute. Document that the icon label may produce redundant announcements when the message already states the type (for example, "Error: Your upload failed"). Authors can set `icon-label=""` to suppress the icon label if the message text already conveys the type fully. |
| **Close button** | Must have an accessible name. 1st-gen uses `label="Close"` on `sp-close-button`. 2nd-gen should use `swc-close-button` with the same label. The close button is in the toast's shadow DOM; its label is not a cross-root ARIA concern because it is on the button element itself, not via ID reference. |
| **Action button slot** | The `action` slot is light DOM, provided by the author. Authors are responsible for giving the action button a descriptive, accessible label. Docs must require this and explain that the action label should make sense in context (for example, "Undo file deletion" rather than just "Undo" if the toast message is brief and ambiguous). |
| **`variant` and color** | `variant` is visual-only. Do not auto-map `variant` to `aria-invalid`, `aria-relevant`, or other ARIA properties. The icon label and message text carry semantic meaning; color is supplementary and must not be the only differentiator. |
| **No default `aria-label` on host** | Do not set `aria-label` on the host. The message content announced via the live region is the notification. Adding an `aria-label` would suppress the live region content from being announced in some AT combinations. |
| **Docs** | State clearly that `role="status"` (polite) is the prescribed host role and that `role="alert"` is not used. Document the 6-second minimum, the hover-and-focus pause behavior, and that toasts with an action button should generally not auto-dismiss. Advise against `aria-live="assertive"` for toast content. Do not claim `variant` sets ARIA states. |

### Shadow DOM and cross-root ARIA Issues

The 1st-gen shadow DOM contains the icon, the `.body` div (with `role="alert"`), and the close button (`sp-close-button`). There are no `aria-labelledby` or `aria-describedby` ID references that cross shadow boundaries; the live region on the inner div announces content by detecting changes within the shadow root.

In 2nd-gen, moving `role="status"` to the host element removes the need for any inner shadow DOM role at all. The host's live region picks up all descendant content changes (including shadow DOM content), so no cross-root ARIA is needed for the notification announcement itself.

The action slot is light DOM; authors provide the button and its label directly, which does not create cross-root ARIA concerns.

None

### Accessibility tree expectations

**Toast (closed)**

```
host [aria-hidden="true"]
  (not in accessibility tree)
```

**Toast with text only (open)**

```
host [role="status"]
  └── [text content from default slot]
  └── close button: "Close"
```

Screen reader announces when toast opens: "[message text]"

**Toast with icon + text (open)**

```
host [role="status"]
  └── icon: "Information" / "Error" / "Success" (from icon label)
  └── [text content from default slot]
  └── close button: "Close"
```

Screen reader announces: "[icon label] [message text]" — for example, "Error Upload failed"

Note: The icon label is part of the live region content, so it is announced alongside the message. Authors can suppress it with `icon-label=""` when the message text already conveys the type.

**Toast with action button (open)**

```
host [role="status"]
  └── icon label (optional)
  └── [text content from default slot]
  └── action button: [author-provided label]
  └── close button: "Close"
```

Screen reader announces the full content when the toast opens. The action button and close button are reachable via Tab navigation after the announcement.

### Assistive technology, live regions

Live region timing and the risk of over-announcing are significant concerns for toast components.

**Over-announcing risk:** Multiple toasts appearing rapidly (for example, bulk operations that generate one toast per file) will queue multiple `role="status"` announcements and create a backlog of screen reader speech. Docs must warn application developers against showing frequent toasts in rapid succession. Recommend batching updates into a single toast message or using a progress bar for bulk operations.

**Container region pattern:** Applications that show multiple simultaneous toasts should wrap them in a `role="region"` container with an `aria-label` (for example, `aria-label="Notifications"`). This makes the toast area discoverable via landmark navigation (F6/Shift+F6 in JAWS and NVDA). `swc-toast` does not provide this wrapper; it is the application's responsibility. The docs should include an example of this container pattern.

**Polite-only:** Docs must explicitly advise against `aria-live="assertive"` for toast content. Assertive live regions interrupt all other speech and cause significant disruption for screen reader users when used for routine notifications. When an error is critical enough to warrant assertive announcement, use a modal dialog instead.

**Actionable toasts and timing:** When an action button is present in the `action` slot, auto-dismiss should generally be disabled or set to a much longer timeout. Screen reader users who hear the toast announcement may not have time to Tab to the action button before the toast dismisses. The docs should strongly discourage combining `timeout` with the `action` slot.

### Keyboard and focus

When the toast is open, interactive children are reachable via keyboard:

- Tab moves focus to the action button (if present), then to the close button.
- Shift+Tab reverses focus order.
- Enter or Space activates the focused button.
- The toast host element itself is not a Tab stop.

Focus management on dismiss:

- When the user activates the close button or action button, the `close` event fires. The calling application is responsible for returning focus to a logical location. `swc-toast` should not attempt to manage focus externally on its own.
- When the toast auto-dismisses (timeout), if focus is inside the toast at the time of dismissal, focus is lost. Docs must note that applications should return focus to a logical location when handling the `close` event.

Hover pause (new in 2nd-gen): The 1st-gen `sp-toast` pauses the countdown only on `focusin`. The 2nd-gen should also pause on `pointerenter` (hover) and resume on `pointerleave`, satisfying WCAG 1.4.13 for users who rely on pointing devices and need time to read the toast content before it dismisses.

---

## Known 1st-gen issues

Gaps in `sp-toast` that `swc-toast` should fix and cover with tests.

### Role placement and type

The 1st-gen places `role="alert"` on the inner shadow DOM `.body` div. This creates an assertive live region that interrupts all other screen reader speech, which is too disruptive for most toast use cases. The 2nd-gen should use `role="status"` (polite) on the host element, not `role="alert"` on an inner div. This is a breaking change in announcement behavior; the migration guide should document the rationale.

### Hover pause missing

The 1st-gen only pauses the countdown timer on `focusin`, not on hover. WCAG 1.4.13 requires that content appearing on hover can be kept visible while the pointer is over it. For auto-dismissing toasts, pausing on hover lets sighted users with pointing devices read the content without racing the timer. The 2nd-gen should add `pointerenter`/`pointerleave` listeners in addition to the existing `focusin`/`focusout` handling.

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
| **Unit** | Host has `role="status"`. Host has `aria-hidden="true"` when `open` is false; no `aria-hidden` (or `aria-hidden="false"`) when open. Countdown pauses on `focusin` and `pointerenter`; resumes on `focusout` and `pointerleave`. Close button has accessible name "Close". Timeout below 6000ms is raised to 6000ms. Variant icon labels default correctly per variant. |
| **aXe + Storybook** | Run WCAG 2.x rules on all toast stories: default (no variant), positive, negative, info; with and without action button; closed state. |
| **Playwright ARIA snapshots** | `toast.a11y.spec.ts`: cover closed state (aria-hidden), text-only, icon + text, and with action button. Verify `role="status"` on host, button accessible names, and correct icon label defaults per variant. |
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

- [ ] Host element carries `role="status"` (not `role="alert"`; not on an inner shadow DOM element).
- [ ] `aria-hidden="true"` is set on the host when `open` is false; removed when `open` is true.
- [ ] Auto-dismiss timer enforces a minimum of 6000ms.
- [ ] Countdown pauses on both `focusin` and `pointerenter`; resumes on `focusout` and `pointerleave`.
- [ ] Close button has an accessible name ("Close" by default).
- [ ] Variant icons carry accessible labels ("Information", "Error", "Success", "Warning" by default); author can override via the `icon-label` attribute.
- [ ] Docs warn against using `timeout` when the `action` slot is populated.
- [ ] Docs include an example of a `role="region"` container with `aria-label="Notifications"` for applications showing multiple toasts.
- [ ] Docs explicitly advise against `aria-live="assertive"` for toast content.
- [ ] Docs do not claim `variant` sets ARIA states; color alone does not convey variant meaning.
- [ ] Dev warning fires when `timeout` and the `action` slot are both set.
- [ ] aXe (WCAG 2.x) runs on all toast stories.
- [ ] ARIA snapshot tests cover: closed state, text-only, icon + text, and with action button.
- [ ] Manual screen reader testing verifies the live region announcement fires correctly and interactive elements are reachable per the [Storybook screen reader testing guide](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx).

---

## References

- [WAI-ARIA 1.2: `status` role](https://www.w3.org/TR/wai-aria-1.2/#status)
- [WAI-ARIA 1.2: `alert` role](https://www.w3.org/TR/wai-aria-1.2/#alert)
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
