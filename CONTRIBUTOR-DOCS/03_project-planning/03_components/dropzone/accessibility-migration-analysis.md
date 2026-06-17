<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Dropzone / Dropzone accessibility migration analysis

<!-- Document title (editable) -->

# Dropzone accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What a drop zone is](#what-a-drop-zone-is)
    - [When to use something else](#when-to-use-something-else)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-dropzone>`](#recommendations-swc-dropzone)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Known 1st-gen issues](#known-1st-gen-issues)
    - [No default host role or accessible name](#no-default-host-role-or-accessible-name)
    - [No status announcements for drag state changes](#no-status-announcements-for-drag-state-changes)
    - [Drag-and-drop not reliably keyboard-accessible by default](#drag-and-drop-not-reliably-keyboard-accessible-by-default)
    - [Documentation anti-patterns](#documentation-anti-patterns)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
    - [Manual screen reader testing](#manual-screen-reader-testing)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc covers how **`swc-dropzone`** should work for **accessibility** and targets **WCAG 2.2 Level AA**. Until a `2nd-gen` implementation exists, use `1st-gen/packages/dropzone/src/Dropzone.ts` (`<sp-dropzone>`) to validate 1st-gen behavior, and update this spec against the real 2nd-gen source when it ships.

### Also read

[Dropzone migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM changes.

### What a drop zone is

A **drop zone** is a target area that accepts dragged-and-dropped content, typically files, from the operating system or from within the same page. It is a **composite upload region**: a visual container paired with a **required browse button or link** that opens the OS file picker for keyboard and pointer users who cannot or prefer not to use drag-and-drop.

The component has three visual states:
- **Default (empty):** illustrated message and browse control invite the user to upload.
- **Dragged:** a file is being held over the zone; visual highlight indicates the zone is active.
- **Filled:** a file has been accepted; content reflects what was uploaded.
- **Filled + dragged (replace):** a new file is dragged over an already-filled zone; an overlay prompts "Drop file to replace."

### When to use something else

- A **simple file input** with no visual drop target: use a native `<input type="file">` directly.
- A **large-area upload flow** that is the primary purpose of the page: consider wrapping the drop zone in a `<main>` landmark rather than relying on the `role="group"` boundary alone.
- **DOM reordering** (repositioning elements by dragging within the page): use a sortable/drag-and-drop widget pattern; `<swc-dropzone>` is for file intake, not DOM reordering.

---

## ARIA and WCAG context

### Pattern in the APG

- The [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/) does **not** publish a dedicated drop-zone widget pattern. The `aria-dropeffect` and `aria-grabbed` attributes that existed for drag-and-drop are **deprecated** as of ARIA 1.1 and must not be used.
- The closest guidance is the general ["No ARIA is better than bad ARIA"](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) principle combined with WCAG 2.5.7 (dragging movements) and WCAG 4.1.3 (status messages).
- `role="group"` with an accessible name is the appropriate host semantic: it creates a labeled boundary that AT announces in browse mode without creating a page landmark. A `role="status"` region inside shadow DOM handles drag-state announcements.

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | All file-selection functionality must be reachable by keyboard. Drag-and-drop is not keyboard-accessible on its own; a browse **button or link** in the slot is required as the accessible baseline. |
| [Dragging movements (WCAG 2.5.7)](https://www.w3.org/TR/WCAG22/#dragging-movements) | Every operation performed by dragging must also be achievable by a single pointer action that does not require dragging. The browse control fulfills this requirement for file uploads. |
| [Status messages (WCAG 4.1.3)](https://www.w3.org/TR/WCAG22/#status-messages) | Messages that communicate drag state or upload success (for example "File ready to drop" or "File uploaded") must be programmatically determinable as status messages so AT can surface them without moving focus. Use `role="status"` or `aria-live="polite"` in shadow DOM. |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | The `role="group"` host must have an accessible name. Interactive descendants (browse button, links) must each have an accessible name. The `dragged` and `filled` states must be communicated to AT via the status region, not relying on visual change alone. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | The dragged/hover and replace states change border color and background. These visual changes must also be communicated via status announcements for users who cannot perceive color. |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/TR/WCAG22/#non-text-contrast) | The dashed border and drop zone boundary are graphical objects needing at least 3:1 contrast with adjacent colors in all states, including forced-colors (high-contrast) mode. |

**Bottom line:** `swc-dropzone` is a **composite upload region**: a `role="group"` host with an accessible name, a required browse control, and a shadow DOM `role="status"` for drag-state announcements. Drag-and-drop is a **progressive enhancement**; the browse control is the accessible baseline.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|-------------------------|---------|
| [SWC-2069](https://jira.corp.adobe.com/browse/SWC-2069) | Bug | To Do | Unresolved | `sp-dropzone-drop` event does not fire on Windows Chrome, affecting drag-and-drop reliability for all users |
| [SWC-241](https://jira.corp.adobe.com/browse/SWC-241) | Bug | Done | Fixed | Dropzone — dragged state background missing (visual state required for perceiving drop affordance) |

---

## Recommendations: `<swc-dropzone>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **Host role (prescribed and fixed)** | Set `role="group"` on the host element. A `group` role marks the upload area as a labeled semantic unit without creating a page landmark. This allows AT to announce the region label when entering it in browse mode. Do **not** use `role="region"` (too prominent for an inline upload control) or leave the host with no role (leaves the boundary unlabeled). The `group` role is the **one** semantic host role for `swc-dropzone`; it must not be author-overridable. If a different semantic treatment is needed, authors should use a different component or outer wrapper. |
| **Accessible name (required)** | The host must have an accessible name describing the upload purpose, for example "Upload files" or "Replace background image." Authors provide this via `aria-label` on `<swc-dropzone>` or via `aria-labelledby` referencing a visible heading in the slot. A dev warning should fire in debug builds when neither is present. |
| **`aria-dropeffect` and `aria-grabbed`** | **Do not use.** Both attributes are deprecated as of ARIA 1.1 and must not appear in the component or its documentation. |
| **Status region (shadow DOM)** | Include a visually-hidden `role="status"` (`aria-live="polite"`) element inside shadow DOM. Update its text when drag state changes: "File ready to drop" when `isDragged` becomes `true`; "File accepted" (or similar) when `sp-dropzone-drop` fires; "Drop to replace existing file" when `isDragged` is `true` while `filled` is already set. This ensures AT users receive the same cues as sighted users perceiving the visual highlight. Consumers who listen to the custom events can also update their own announcement in light DOM for more specific messages (for example, including the file name). |
| **`dragged` attribute** | Visual only. It changes border color and background. The state change must be paired with the `role="status"` announcement; it carries no ARIA semantics by itself. |
| **`filled` attribute** | Visual only. Signals that a file has been received. Pair the state transition with a status announcement. When `filled` is `true` and `isDragged` becomes `true` again, trigger the replace-state announcement. |
| **`dropEffect` property** | Controls the OS drag cursor icon only (`copy`, `move`, `link`, `none`). Has no ARIA mapping; do not expose as an ARIA attribute. |
| **Browse button or link (always required)** | A button or link that opens the OS file picker **must always** be slotted into `<swc-dropzone>`. This is the keyboard path for file uploads (WCAG 2.1.1 and 2.5.7). Documentation and stories must make this requirement explicit and must never show a usage example without the browse control. An `<sp-button>` labeled "Browse files" or an `<sp-link>` labeled "Select a file" are the two supported patterns; both are acceptable. The hidden `<input type="file">` that the browse control triggers should have an accessible label as well. |
| **Events and state in stories** | Stories and documentation must demonstrate how to listen to `sp-dropzone-drop` and to the file input `change` event to update the `filled` attribute and status announcements. This covers both the drag-and-drop path and the browse-button path, ensuring AT users see the same post-upload state as drag users. |
| **Docs** | Describe drag-and-drop as a progressive enhancement; the browse control is the accessible baseline. Warn against `aria-dropeffect` and `aria-grabbed`. Show accessible labeling patterns for the host (`aria-label` and `aria-labelledby`). Show how to provide a descriptive status update from event handlers when the component's default announcement is not specific enough. |

### Shadow DOM and cross-root ARIA Issues

The 1st-gen `sp-dropzone` renders only `<slot></slot>` in shadow DOM with no internal ARIA. For 2nd-gen, the shadow DOM adds a single `role="status"` element for announcements. All interactive elements (browse button, illustrated message, uploaded content) remain in light DOM via the default slot and own their own accessible semantics.

```html
<!-- shadow root -->
<div role="status" aria-live="polite" class="visually-hidden"></div>
<slot></slot>
```

Because the label, status region, and interactive content are all in light DOM or addressed through attributes on the host itself, **no cross-root ARIA references are required**. The `role="status"` element in shadow DOM is self-contained and requires no ID references.

If authors use `aria-labelledby` on the host to reference a visible heading inside the slot, the reference target is in light DOM and the attribute is on the host, so it does not cross a shadow boundary and resolves correctly. If an author places the visible label for the drop zone in a sibling or ancestor element outside `<swc-dropzone>`, they should verify the `aria-labelledby` reference resolves correctly across any surrounding custom element boundaries.

### Accessibility tree expectations

The 2nd-gen component does not yet exist. The following describes the target accessibility tree for the prescribed implementation.

#### Default (empty) state

```
group "Upload files"            ← host: role="group" aria-label="Upload files"
  status ""                     ← shadow DOM role="status" (empty; not announced)
  heading level 2 "Drag and drop your file"  ← sp-illustrated-message
  img (decorative illustration) ← aria-hidden="true" or role="img" with label
  button "Browse files"         ← sp-button (required, focusable)
```

#### Dragged state (file being held over the zone)

- Visual highlight appears; border color and background shift.
- Shadow DOM `role="status"` text updates to "File ready to drop."
- AT announces the live region update without moving focus.
- The group structure and browse button remain unchanged.

#### Filled state (file accepted)

- Slotted content reflects the uploaded item (file name, thumbnail, or other feedback).
- Shadow DOM `role="status"` text updates to "File accepted" (or a more specific consumer-provided message).
- The browse button should remain accessible or transform into a labeled "Replace file" control.

#### Filled + dragged (replace) state

- Visual overlay "Drop file to replace" appears over the filled content.
- Shadow DOM `role="status"` text updates to "Drop to replace existing file."
- AT announces the live region update without moving focus.

### Keyboard and focus

The `swc-dropzone` host carries no Tab stop. Keyboard users interact with the drop zone through the **slotted browse button or link**, which opens the OS file picker. There is no keyboard-emulated drag-and-drop.

| Key | Behavior |
|-----|----------|
| `Tab` | Moves focus to the browse button or link inside the drop zone |
| `Enter` / `Space` | Activates the browse button (opens the OS file picker) |

The browse control is **required** in the slot; its absence is a conformance failure. After the user selects a file via the OS picker, the `change` event on the hidden `<input type="file">` fires and application code should update the `filled` attribute and the status region, mirroring the drop path.

---

## Known 1st-gen issues

The following gaps in 1st-gen `<sp-dropzone>` should be addressed in 2nd-gen `<swc-dropzone>` and covered with tests.

### No default host role or accessible name

The 1st-gen host has no default `role` or accessible name. The README defers this to consumers ("supply the appropriate `role` and `aria-label` attributes"). This makes the accessible boundary of the upload region entirely dependent on consumer markup, which is inconsistently applied in practice. In 2nd-gen, `role="group"` is fixed on the host and a dev warning fires when no accessible name is provided.

### No status announcements for drag state changes

1st-gen changes the `isDragged` and `isFilled` attributes but provides no mechanism for AT to learn about these state changes. A user dragging a file over the zone has no programmatic cue that the zone is "active." In 2nd-gen, a shadow DOM `role="status"` element provides default announcements for drag state and upload completion.

### Drag-and-drop not reliably keyboard-accessible by default

1st-gen README guidance to add `tabindex` and a browse control is advisory only. The component does not enforce the browse control. SWC-2069 also documents that the `sp-dropzone-drop` event does not fire on Windows Chrome in some cases, further degrading the drag path. In 2nd-gen, stories and documentation should always include a browse control, and the drop event bug should be covered by a regression test.

### Documentation anti-patterns

1st-gen README examples use `javascript:;` as the `href` on browse links, which is an accessibility anti-pattern (produces incorrect link behavior in some AT). 2nd-gen documentation should use a proper `<sp-button>` or a `<sp-link>` that triggers the hidden file input via a `click()` call inside an event listener, not via an inline `onclick` on a parent element.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | `role="group"` is on the host. Shadow DOM contains a `role="status"` element. Status text updates to "File ready to drop" when `isDragged` becomes `true`. Status text updates to "File accepted" when `sp-dropzone-drop` fires. Status text updates to "Drop to replace existing file" when `isDragged` becomes `true` while `filled` is set. Host has no default Tab stop. Browse button inside slot is focusable. Dev warning fires when no accessible name is present. |
| **aXe + Storybook** | Run WCAG 2.x on all dropzone stories. Verify no ARIA errors on the group host or status region. Confirm every story includes a browse control. |
| **Playwright ARIA snapshots** | Add `dropzone.a11y.spec.ts`. Cover: default state (group label, heading, browse button), dragged state (status text update), filled state (status text update), filled + dragged (replace announcement). |
| **Color contrast** | Dashed border in default and dragged states (non-text, 3:1 minimum). Text inside illustrated message (4.5:1). Dragged-state highlight border and background (3:1). Forced-colors media query. |
| **Event regression** | `sp-dropzone-drop` fires when files are dropped. `sp-dropzone-dragover` and `sp-dropzone-dragleave` fire correctly. Include a Windows Chrome regression for SWC-2069. |
| **State via browse path** | `change` on hidden `<input type="file">` updates `filled` and the status region the same way as a drop event. |

### Manual screen reader testing

The `swc-dropzone` host has no Tab stop, so focus-mode navigation (forms mode, application mode) reaches the browse button but does not traverse the group boundary itself. To verify that the group label and status region are announced correctly:

Use **browse mode** (document or scan mode) to traverse the page in content order. This allows the tester to encounter the `role="group"` boundary and hear its accessible name before entering the drop zone content. It also allows verification that the `role="status"` text updates are announced when the drag state changes.

Steps to verify:

1. Open a dropzone story in a browser with a screen reader active.
2. Switch to browse mode and navigate through the drop zone using arrow keys.
3. Confirm the group label is announced when entering the boundary.
4. Confirm the browse button is reachable and its label is announced.
5. Simulate a drop (or use the story's built-in state toggle) and confirm the status region announces the state change without moving focus.
6. Confirm the replace announcement fires when the zone is filled and a new drag is initiated.

See the 2nd-gen Storybook [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) guide, including the **Browse mode (document/scan mode)** section.

---

## Summary checklist

- [ ] `role="group"` is present on the `swc-dropzone` host; the role is **fixed** and must not be author-overridable.
- [ ] An accessible name is required via `aria-label` or `aria-labelledby`; a dev warning fires in debug builds when neither is present.
- [ ] Shadow DOM contains a visually-hidden `role="status"` (`aria-live="polite"`) element.
- [ ] Status text updates to "File ready to drop" when `isDragged` becomes `true`.
- [ ] Status text updates to "File accepted" (or equivalent) when `sp-dropzone-drop` fires and `filled` is set.
- [ ] Status text updates to "Drop to replace existing file" when `isDragged` becomes `true` while `filled` is already set.
- [ ] `aria-dropeffect` and `aria-grabbed` are **not used** anywhere in implementation or documentation (deprecated).
- [ ] A browse button or link is **always** present in stories and docs; no usage example omits the browse control.
- [ ] Stories demonstrate `sp-dropzone-drop` and file input `change` event handling to update `filled` and status announcements.
- [ ] Keyboard users can open the OS file picker via the browse button using `Tab` then `Enter` or `Space`.
- [ ] Dashed border and drop zone chrome meet non-text contrast (3:1) in all states, including forced-colors mode.
- [ ] Illustrated message text meets text contrast (4.5:1).
- [ ] 1st-gen documentation anti-patterns (`javascript:;` hrefs, inline `onclick`) are replaced with accessible patterns in 2nd-gen docs and stories.
- [ ] SWC-2069 regression (drop event on Windows Chrome) is covered by integration tests.
- [ ] aXe (WCAG 2.x) runs on all dropzone stories.
- [ ] Playwright ARIA snapshot tests cover default, dragged, filled, and filled + dragged states.
- [ ] Manual screen reader testing uses browse mode per the Storybook screen reader testing guide.

---

## References

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WAI-ARIA 1.2: `group` role](https://www.w3.org/TR/wai-aria-1.2/#group)
- [WAI-ARIA 1.2: `status` role](https://www.w3.org/TR/wai-aria-1.2/#status)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WCAG 2.1.1: Keyboard](https://www.w3.org/TR/WCAG22/#keyboard)
- [WCAG 2.5.7: Dragging movements (AA)](https://www.w3.org/TR/WCAG22/#dragging-movements)
- [WCAG 4.1.2: Name, role, value](https://www.w3.org/TR/WCAG22/#name-role-value)
- [WCAG 4.1.3: Status messages](https://www.w3.org/TR/WCAG22/#status-messages)
- [WCAG 1.4.1: Use of color](https://www.w3.org/TR/WCAG22/#use-of-color)
- [WCAG 1.4.11: Non-text contrast](https://www.w3.org/TR/WCAG22/#non-text-contrast)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [React Spectrum: DropZone](https://react-spectrum.adobe.com/react-spectrum/DropZone.html)
- [Vaadin: Upload](https://vaadin.com/docs/latest/components/upload)
- [Web Awesome: File Input](https://webawesome.com/docs/components/file-input/)
- [Dropzone migration roadmap](./rendering-and-styling-migration-analysis.md)
- [2nd-gen Storybook: Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)
