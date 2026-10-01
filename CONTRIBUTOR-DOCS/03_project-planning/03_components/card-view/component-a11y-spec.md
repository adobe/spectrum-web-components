<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Card View / Card view: accessibility specification

<!-- Document title (editable) -->

# Card view: accessibility specification

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What it is](#what-it-is)
    - [Verified implementation baseline](#verified-implementation-baseline)
    - [RSP reference and deliberate differences](#rsp-reference-and-deliberate-differences)
    - [When to use something else](#when-to-use-something-else)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-card-view>`](#recommendations-swc-card-view)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Form-associated custom elements](#form-associated-custom-elements)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Live regions, loading, and announcements](#live-regions-loading-and-announcements)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
    - [Manual screen reader testing](#manual-screen-reader-testing)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This analysis defines the accessibility requirements for `swc-card-view`, targeting WCAG 2.2 Level AA. Card view presents a collection of related cards with keyboard navigation, optional selection, and bulk actions. It replaces the planned public `swc-grid` component: grid is being deprecated, and Cord will not use card-view. These recommendations are a proposed contract, not a claim that card-view is implemented.

### Also read

- [Grid accessibility analysis](../grid/component-a11y-spec.md) for historical navigation and virtualization requirements.
- [Grid rendering and styling analysis](../grid/rendering-and-styling-migration-analysis.md) for the existing virtualization research. A card-view-specific rendering and styling analysis and migration plan do not exist yet.
- [Card migration plan](../card/migration-plan.md) for the existing card implementation.
- [Focus management](../../../01_contributor-guides/14_focus-management.md).
- [React Spectrum CardView](https://react-spectrum.adobe.com/CardView), the collection UX reference.

### What it is

`swc-card-view` is one composite widget with a fixed `grid` role. It owns collection naming, row and cell semantics, keyboard navigation, selection state, and logical positions when virtualized. Cards own their content and native navigation links. A CSS grid layout alone supplies none of these semantics.

Follow RSP's logical collection structure: one `row` per card and one `gridcell` per row, even when cards appear in several visual columns. This is a layout grid, not tabular data whose visual columns have separate meanings. The visual grid or waterfall layout controls directional focus movement; it does not change the host role or create logical data columns.

### Verified implementation baseline

- There is no gen2 card-view implementation to audit yet.
- [Legacy Grid](../../../../1st-gen/tools/grid/src/Grid.ts) virtualizes items and delegates item rendering and much of its ARIA structure to consumers. Its [controller](../../../../1st-gen/tools/grid/src/GridController.ts) uses the 1st-gen roving-tabindex controller.
- [Legacy Card](../../../../1st-gen/packages/card/src/Card.ts) adds a `gridcell` wrapper when consumers give its host `role="row"`, reflects selection onto that row, and renders a real anchor when `href` is present through [LikeAnchor](../../../../1st-gen/tools/shared/src/like-anchor.ts). Preserve native link rendering, but do not preserve consumer-controlled role switching.
- [CardBase](../../../../gen2/packages/core/components/card/Card.base.ts) intentionally accepts no `href`. Its `title-as-link` behavior depends on a consumer-supplied anchor. `selectable` sets `tabindex="0"`, but its ARIA role is explicitly deferred to a future CardView selection model.
- The [card template](../../../../gen2/packages/swc/components/card/card-template.ts) renders slots inside a `div`, not a card-owned navigation anchor. Adding `href` support is therefore an API and rendering change required by this analysis, not existing behavior.
- The existing [card accessibility tests](../../../../gen2/packages/swc/components/card/test/card.a11y.spec.ts) verify generic card semantics, the consumer-supplied title link, and selectable focus without a role. They do not verify card-owned `href` rendering, collection selection, or virtualized grid navigation.

### RSP reference and deliberate differences

The full [CardView documentation](https://react-spectrum.adobe.com/CardView) was read through its Markdown counterpart. Its collection API covers static and dynamic items, grid and waterfall layouts, single and multiple selection, selected keys, disabled items, async loading, empty states, actions, and bulk action bars. These are reference capabilities, not confirmed gen2 API names. The [RSP selection guide](https://react-spectrum.adobe.com/selection) also distinguishes selection, item actions, and disabling only selection versus all interaction.

Browser inspection on 2026-09-30 found `grid` with `aria-colcount="1"`, one indexed `row` per card, and a `gridcell` inside each row. In the Links example, the Collections grid contained `div[role="row"]` cards with `data-href`, but no `a[href]` or link-role elements. Do not copy that rendering: a destination stored as data does not expose a native link or its browser interactions. This is a verified DOM gap, not a completed screen-reader audit of RSP.

This request supersedes the existing card migration plan's no-`href` direction for the proposed implementation. Revise that plan and its API, rendering, and test requirements before implementing card-owned links. Existing consumer-supplied title anchors remain native links; define precedence and prevent duplicate or nested anchors when adding the new API.

### When to use something else

Use ordinary document markup for a small static collection without composite keyboard navigation. Use a listbox for options without nested interactive content, a table for read-only tabular data, and a data-grid component for editable or sortable tabular data. Card-view does not change its host role to represent those patterns.

---

## ARIA and WCAG context

### Pattern in the APG

Use the [APG Grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) and [layout grid examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/layout-grids/) as a layout grid containing rich card content, not a spreadsheet. A single collection entry in the page Tab sequence and arrow-key navigation must accompany the `grid` role.

- [MDN grid](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/grid_role) describes the composite and its required keyboard implementation.
- [MDN row](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/row_role) describes rows owned by the grid and selection and position attributes.
- [MDN gridcell](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/gridcell_role) requires cells to belong to rows. Native table markup remains preferable for actual tabular information; card-view is a collection layout widget, not a replacement for a table.
- APG's focus guidance distinguishes focusing a cell containing rich content from focusing its sole interactive element. Entering an interaction mode is necessary when a cell contains multiple controls or a control that needs arrow keys.
- Do not import spreadsheet-only shortcuts for column selection, sorting, or editing. Omit `aria-sort`, tree expansion, and `aria-readonly` when those functions do not exist; APG does not prescribe `aria-readonly` for a grid without editing.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [WCAG 1.3.1: Info and relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | Expose the grid, rows, cells, names, and selection relationships in the accessibility tree. |
| [WCAG 1.3.2: Meaningful sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html) | Preserve logical card order in the DOM and accessibility tree across responsive and waterfall layouts. |
| [WCAG 1.1.1: Non-text content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) | Give informative previews alternatives; hide decorative previews from assistive technology rather than duplicating the title. |
| [WCAG 1.4.3: Contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [1.4.11: Non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | Text, selection indicators, and focus indicators must remain perceivable, including in forced colors. |
| [WCAG 1.4.10: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | Cards and actions must remain usable under zoom and narrow viewports without a two-dimensional scrolling requirement. |
| [WCAG 2.1.1: Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) | Navigation, selection, links, and card actions must work without a pointer. |
| [WCAG 2.1.2: No keyboard trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) and [2.4.3: Focus order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) | Nested actions and virtualized content need predictable entry, exit, and focus recovery. |
| [WCAG 2.4.4: Link purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) | Each card link needs a meaningful destination and accessible name. |
| [WCAG 2.4.7: Focus visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) and [2.4.11: Focus not obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) | Show focus distinctly from selection and keep it visible during scrolling and bulk actions. |
| [WCAG 2.5.3: Label in name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) and [2.5.8: Target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | Link and action names include their visible labels; independent controls meet the 24 CSS pixel target requirement or a documented exception. |
| [WCAG 2.5.7: Dragging movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) | If drag and drop is added, provide keyboard and single-pointer alternatives; RSP's hooks are not proof of gen2 support. |
| [WCAG 4.1.2: Name, role, value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | Expose the collection name, cell states, native link roles, and action-control names. |
| [WCAG 4.1.3: Status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | Expose significant collection status changes without shifting focus or announcing every mounted card. |

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary | Notes |
| --- | --- | --- | --- | --- | --- |
| Pending issue IDs | Not available | Not verified | Not verified | Carry forward eligible 1st-gen grid accessibility issues rather than create duplicate card-view issues; address navigation, selection, and virtualization defects in card-view. | The checked-in grid analysis has an empty issue table. Jira retrieval on 2026-09-30 failed certificate validation, so IDs, labels, status, and resolution could not be verified. This is a research limitation, not a Jira issue. |

---

## Recommendations: `<swc-card-view>`

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| Fixed role | Expose exactly one `grid` on the card-view host. Do not allow an author-overridable role or add a nested second grid. |
| Required structure | Card-view owns one `row` wrapper and one `gridcell` for each card. The card host stays generic; do not switch it between `row`, `gridcell`, `button`, and `link`. A card-owned anchor retains its native link semantics inside the cell. |
| Name | Require a meaningful accessible collection name. Prefer visible labeling with references that resolve in the same root; otherwise supply `aria-label`. |
| Item name and description | Use the visible card title as the primary navigation label. Provide an equivalent text label when content cannot supply one; keep descriptive metadata separate from the name. Image filenames are not acceptable item names. |
| Selection | Use `aria-selected="true"` or `"false"` on selectable rows, matching RSP's item-level model. Omit it for nonselectable rows. Expose `aria-multiselectable="true"` for multiple selection; single selection uses false or the implicit false default. Selection is distinct from focus and navigation. |
| Selection indicators | A selection checkbox has its own name, such as "Select Desert Sunset", and checked state synchronized with row selection. A highlight is visual feedback, not a replacement for `aria-selected`. Do not expose the checkbox as a radio button in single-selection mode unless using a separate radio-group component. |
| Disabled items | Distinguish disabling the whole item from disabling only selection. Entirely disabled items expose `aria-disabled="true"` and cannot activate or select; omit their focus targets from navigation. Selection-disabled items may retain links and actions. ARIA alone does not suppress events or native link navigation. |
| Native card links | A card with `href` must render an actual `<a href="…">` with a name from its title. Do not substitute a click handler, a `role="link"` element, a `data-href`, or an anchor without `href`. Preserve the surrounding gridcell semantics and keep independent actions outside the anchor. |
| Browser link behavior | Preserve native <kbd>Enter</kbd> activation, modifier-click, middle-click, context-menu opening and copying the destination, and supported `target`/`rel`/`download` behavior. Do not intercept those gestures to toggle selection or double-fire navigation. Decide the supported link attributes in the API phase. |
| Logical size and position | When virtualized, set `aria-rowcount` to the total logical card count, or `-1` when the total is unknown, and `aria-colcount="1"`. Set each rendered row's `aria-rowindex` to its one-based logical collection position; the single cell's column index is 1. Never use viewport-relative indices or the number of mounted cards as the total. |
| Layout and density | Grid, waterfall, size, and density are visual options, not role changes. Preserve logical item order and update directional geometry after layout or viewport changes. |
| Bulk actions | Selection does not automatically move focus to a newly shown action bar. Give the bar its own toolbar/action-bar semantics and name outside the grid's row structure. Restore focus to a surviving card or explicit fallback after a bulk operation. |
| Empty, loading, and error content | Render these messages outside the card-row structure rather than as fake selectable cards. An empty collection must not leave an unreachable `tabindex="0"` item or claim a row that does not exist. Offer a named, keyboard-accessible retry or load-more button when needed. |

### Shadow DOM and cross-root ARIA Issues

Collection and cell labeling must not depend on string ID references resolving across shadow roots. Keep related wrappers and labels in the same root or use a supported element-reference strategy with browser and assistive-technology verification. A card's internal anchor needs its own accessible name; a name on the card host does not automatically name that link.

Keep the grid-to-row-to-cell ownership intact in the composed accessibility tree when cards are slotted or rendered in separate shadow roots. Do not use cross-root `aria-owns` strings to repair missing structure. Use real owned descendants and verify the computed tree, not just the light DOM. `ElementInternals` default roles and element-reference APIs are possible implementation mechanisms, not evidence that all browser and screen-reader combinations support a proposed structure.

The collection must coordinate with `CardBase` focus behavior: its current `selectable` implementation assigns every card `tabindex="0"` and later removes that attribute. Without coordination, it can overwrite the collection's roving tab stop or leave a card host and its internal link both focusable. One controller must own the active target and all other collection targets must be removed from the page Tab sequence.

### Form-associated custom elements

Does not apply to the collection itself. Selection is collection state, not a submitted form value. Any nested form control retains its own native form and labeling requirements.

### Accessibility tree expectations

The proposed tree is a named `grid` containing `row` nodes, each containing one `gridcell` with card content. Row selection and logical position remain on the row. A linked card exposes a named native `link` within its cell. An action control remains a separate named button, not a descendant of the link.

```text
grid "Nature photos" (rowcount: 200, colcount: 1)
    row (rowindex: 47, selected: false)
        gridcell
            link "Desert Sunset" (destination: /assets/desert-sunset)
            checkbox "Select Desert Sunset" (checked: false)
            button "More actions for Desert Sunset"
```

This is an illustrative required tree, not an existing gen2 snapshot. Generic card wrappers need no extra landmark or widget role. Informative previews remain available with appropriate alternatives; decorative previews do not add duplicate speech. Titles, descriptions, and action controls must remain discoverable even if a focused cell uses an explicit title-only name.

Without selection, omit the row's selected state and the selection checkbox. With an action-only card, use a genuine named button or the cell's documented item-action contract, not a fake link. A bulk action bar and empty/error messages are siblings of the collection, not cells counted as cards.

### Live regions, loading, and announcements

Preserve focus and selection while more items load. Use `aria-busy` on the collection only while its content is being updated, then clear it on completion or failure. Skeleton previews are placeholders, not focusable or selectable cards, and must not inflate logical item counts.

Do not make the whole grid a live region. Row selection states and checkbox states provide ordinary feedback; announce a meaningful aggregate change only when users would otherwise miss it. If a status message is necessary, use one concise, shared polite status region for loading completion, empty results, or a bulk-action outcome. Polite announcements still queue speech: do not announce every virtualizer range change or every appended card. Never use assertive announcements for routine loading or selection.

Loading visuals and motion need alignment with [Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) and reduced-motion preferences. The Figma API returned 403 during this analysis, so specific animation and variant decisions remain unverified; no timing or spinner treatment is prescribed here.

### Keyboard and focus

Use [FocusgroupNavigationController](../../../../gen2/packages/core/controllers/focusgroup-navigation-controller/) with `direction: 'grid'`, stable item keys, and no end-to-start wrap. Its current implementation supports geometry-based focus movement, memory, disabled-item skipping, and `refresh()`, but does not supply the collection selection model or virtualizer orchestration. Refresh after mounted ranges and layout geometry change, not just after item count changes.

For a cell with only one link or simple action control, make that control the roving focus target so its role is announced. For a rich card with several controls, use the cell as the navigation target and <kbd>F2</kbd> to enter its controls. Only the active navigation target has `tabindex="0"` in navigation mode; other targets and nested controls are `-1`. Do not focus both the card host and its native anchor as separate collection entry points.

| Key or interaction | Required behavior |
| --- | --- |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> in navigation mode | Enter at the remembered eligible item, or the first eligible item initially. Leave the composite for the next or previous page control; never traverse hundreds of cards or trap focus. |
| Arrow keys | Move to a neighboring card by visual geometry, including RTL and waterfall layouts. At the collection boundary, keep focus in place rather than wrapping to the opposite end. Do not silently change selection just because focus moved. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Move to the first or last logical card for this single-logical-column contract, using the APG layout-grid allowance. Override the controller's visual-row default if necessary; do not mix that default with the documented collection behavior. |
| <kbd>Ctrl</kbd> + <kbd>Home</kbd> / <kbd>Ctrl</kbd> + <kbd>End</kbd> | Move to the first or last available logical card, mounting and scrolling it into view before focus. For an unknown remote total, the end means the last loaded logical item, not an invented final item or an unbounded network fetch. |
| <kbd>Page Up</kbd> / <kbd>Page Down</kbd> | If supported, move approximately one viewport while keeping focus visible. Configure or augment `pageStep`; mounted-node navigation alone cannot reach an unmounted item. |
| <kbd>Enter</kbd> | Activate the focused native link or button. On a rich cell, activate its primary link/action once if present; otherwise enter its controls. Do not conflate activation with selection or fire both a native link and a collection action. |
| <kbd>Space</kbd> | On a selectable navigation cell, toggle item selection. On a checkbox/button, preserve its native behavior. On a directly focused link, preserve native behavior rather than turning it into a checkbox; use the separate selection control. With no selection or action, do not invent a Space activation contract. |
| <kbd>Shift</kbd> + arrow keys | If range selection is supported, extend from a stable selection anchor over logical card order while moving focus. Keep this separate from the controller's ordinary focus movement and exclude nonselectable items. |
| <kbd>Ctrl</kbd> + <kbd>A</kbd> / <kbd>Cmd</kbd> + <kbd>A</kbd> | In multiple-selection navigation mode, select all eligible items according to the documented collection scope, not just mounted cards. If scope includes unloaded results, bulk actions must honor that scope. Do not intercept text selection inside an editor or input. |
| <kbd>Escape</kbd> | Close an active menu or exit card interaction mode first. Only at collection navigation level clear selection, if allowed. Do not let selection clearing consume a descendant's dismissal key. |
| <kbd>F2</kbd> | Enter the active card's first interactive control; suspend collection arrow handling. Press again or use <kbd>Escape</kbd> to restore the cell's navigation focus. |
| <kbd>Tab</kbd> in interaction mode | Move among the active card's controls. At its boundaries leave the collection in the appropriate direction and restore navigation-mode tab indices; do not cycle indefinitely. |
| Typeahead | If implemented, use visible-title text equivalents to focus matching cards without activating or selecting them. Do not intercept typing while a nested control is active. |

Nested buttons, checkboxes, and menus retain their own semantics and keyboard behavior. A pointer press on those controls must not also trigger the card's primary link or selection handler. Native link gestures remain navigation gestures even when selection is enabled; selection uses a separate control or cell-navigation command. Touch users must have a visible selection control rather than needing to discover a long press.

Maintain the focused item by stable key rather than mounted index. Before moving to an unmounted target, mount it, update semantic indices, scroll it into view, then focus it. Keep a focused card mounted during ordinary scrolling, or deliberately transfer focus before recycling its DOM node. Never recycle a focused element to represent a different card.

After removal, choose the next eligible logical item, then the previous item, and finally an explicit empty-state or collection fallback if no items remain. Filtering, resizing, appending items, or showing an action bar must not move focus unexpectedly. An empty grid may temporarily be the fallback focus target, but must not add a second page Tab stop while populated. Keep focused content visible above sticky action bars.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| Unit and DOM tests | Fixed host role, one row/cell per item, collection and item names, unsupported role overrides, selection on rows, synchronized checkboxes, and disabled versus selection-disabled items. |
| Native link regression | Every href card renders `a[href]` with a title-based name, not a data attribute or role substitute. Removing href removes navigation semantics. Cover target/rel behavior, supplied title-link precedence, and no nested or duplicate anchors. |
| Keyboard integration | One collection entry point, arrow navigation, Home/End, optional page movement, RTL, remembered entry, nested interaction mode, and exit in both directions without a trap. |
| Selection and actions | None/single/multiple selection, range/select-all scope, clearing selection, disabled eligibility, native link activation once, and nested actions without accidental selection or navigation. |
| Virtualization integration | Logical counts and one-based indices, unknown total, navigation beyond the mounted range, focus persistence by key, item deletion/filtering, selection retained when items unmount, and no focused-node recycling. |
| Playwright accessibility snapshots | Named grid, indexed rows, one cell per row, selected state, actual named link nodes and destinations, and independent actions across shadow boundaries in supported browser projects. |
| Browser link interactions | Modified activation, context-menu destination, new-tab behavior, pointer hit testing, and independent action targets. Automate what browsers expose reliably and manually verify the rest. |
| aXe/Storybook | Static/dynamic collections, link-only/rich cards, single/multiple selection, disabled states, grid/waterfall/RTL layouts, virtualized loading, empty/error states, and bulk actions. Automated checks do not prove the keyboard or screen-reader contract. |
| Visual and responsive checks | Text/non-text contrast, selection versus focus, forced colors, reduced motion, zoom/reflow, target sizes, and focus not hidden by a sticky action bar. |
| Status and bulk actions | No per-card live announcements, busy state cleared on success/failure, keyboard-accessible retry, action-bar focus behavior, and deterministic focus recovery after deletion. |

### Manual screen reader testing

Use the [screen reader testing guide](../../../../gen2/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx). Verify with NVDA and JAWS on Windows in supported browser combinations, VoiceOver with Safari on macOS, and VoiceOver/TalkBack on mobile where supported. These are required future tests, not tests completed by writing this analysis.

- Focus navigation announces the collection name, logical item position, title, and relevant selection/disabled state without duplicating content.
- Browse mode and the screen reader's links list/rotor discover real card links with meaningful names; <kbd>Enter</kbd> and native browser link commands reach the correct destination.
- Rich-card controls remain reachable in interaction mode, and returning to collection navigation restores the correct item.
- Scrolling to unmounted content, filtering, and bulk deletion preserve logical context and recover focus predictably.
- Loading, selection, and bulk-operation announcements provide useful feedback without a backlog of per-item speech. Mobile selection is possible without long pressing or dragging.

## Summary checklist

- [ ] One fixed named grid owns one row and one gridcell per card; the card host does not switch roles.
- [ ] Collection focus, selection, and card activation have separate contracts.
- [ ] Every supported card `href` renders a named native anchor without nested interactive controls.
- [ ] Native browser link interactions, card-plan changes, and supplied title-link precedence are specified and verified.
- [ ] Selection state is exposed on rows, checkboxes are synchronized, and disabled-item rules are enforced.
- [ ] Roving focus, nested interaction mode, RTL, Home/End, range selection, and exit behavior are verified.
- [ ] Virtualized counts and indices describe the logical collection; focus and selection survive unmounting and deletion.
- [ ] Shadow-root labeling and the accessibility tree are verified in supported browsers and screen readers.
- [ ] Manual screen-reader tests include browse mode, link discovery, rich-card controls, and mobile selection.
- [ ] Loading and bulk operations avoid noisy live regions; the loading-design review is completed when Figma access is available.
- [ ] Focus, selection, contrast, reflow, target sizes, and forced-colors behavior meet the applicable WCAG criteria.
- [ ] Grid Jira issues are verified and carried forward without duplicate tickets.
- [ ] Card-view rendering analysis and migration plan are supplied before implementation.

## References

- [React Spectrum CardView](https://react-spectrum.adobe.com/CardView).
- [React Spectrum selection guide](https://react-spectrum.adobe.com/selection).
- [APG Grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/).
- [APG layout grid examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/layout-grids/).
- [APG Read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/).
- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/).
- [WAI-ARIA grid role](https://www.w3.org/TR/wai-aria-1.2/#grid), [row role](https://www.w3.org/TR/wai-aria-1.2/#row), and [gridcell role](https://www.w3.org/TR/wai-aria-1.2/#gridcell).
- [MDN grid role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/grid_role).
- [MDN gridcell role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/gridcell_role).
- [MDN row role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/row_role).
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- [Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) (design review pending access).
- [Grid rendering and styling analysis](../grid/rendering-and-styling-migration-analysis.md).
- [Grid accessibility analysis](../grid/component-a11y-spec.md).
- [Card migration plan](../card/migration-plan.md).
- [Focus management](../../../01_contributor-guides/14_focus-management.md).
- [Screen reader testing guide](../../../../gen2/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx).
