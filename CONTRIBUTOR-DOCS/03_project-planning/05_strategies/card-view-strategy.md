<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Strategies / Card view strategy

<!-- Document title (editable) -->

# Card view strategy

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Purpose and current recommendation](#purpose-and-current-recommendation)
- [Why the current model needs review](#why-the-current-model-needs-review)
- [What the guidance supports](#what-the-guidance-supports)
    - [RSP specification and implementation](#rsp-specification-and-implementation)
    - [APG and expert guidance](#apg-and-expert-guidance)
    - [Product comparisons](#product-comparisons)
- [Prototype comparison](#prototype-comparison)
    - [Semantics and navigation](#semantics-and-navigation)
    - [Shared keyboard navigation](#shared-keyboard-navigation)
    - [Controls and selection](#controls-and-selection)
    - [Main tradeoffs and reported results](#main-tradeoffs-and-reported-results)
- [Requirements for every option](#requirements-for-every-option)
    - [Access and interaction](#access-and-interaction)
    - [Order and position](#order-and-position)
    - [Geometry and virtualization](#geometry-and-virtualization)
- [Evaluation plan](#evaluation-plan)
    - [Test stages](#test-stages)
    - [Environments](#environments)
    - [Tasks and decision criteria](#tasks-and-decision-criteria)
- [Sources and further context](#sources-and-further-context)

</details>

<!-- Document content (editable) -->

For an illustrated summary, read <a href="./?path=/docs/components-card-view-the-card-view-oracle--docs" target="_top">The card view oracle</a>.

## Purpose and current recommendation

Choose an accessible interaction model for Spectrum Web Components (SWC) card view. Users need to reach every card, understand their position and selection, and use card actions without confusing keyboard behavior.

We recommend a single-row grid as the working hypothesis for collection-position feedback such as "x of y" and incremental horizontal navigation. One semantic row contains every card as a gridcell. This describes a one-dimensional collection even when its visual layout has many rows. The current prototypes omit explicit ARIA row/column indices and counts. Gridcells have no explicit `aria-label`; the row is labelled with the collection total, such as "50 items," and card content remains exposed to assistive technology. A row label does not guarantee native positional announcements.

Semantics are no longer the variable in the primary experiment. Keep the recommended single-row structure fixed. All nine named grid, masonry, and waterfall examples share horizontal collection-order navigation with wrapping. Compare four vertical-navigation policies in the uniform grid and four in masonry; waterfall follows visual columns vertically and advances between them at their edges. The single-column grid, single-row grid, list, feed, toolbar, and fieldset remain named reference examples with their existing navigation, not numbered semantic options awaiting a decision.

The keyboard policy is not selected yet. Reported positional feedback supports the single-row recommendation, but ARIA attributes do not guarantee spoken output across screen readers and browsers. Automated checks and product precedents do not establish usability; test the recommendation and the navigation policies with users.

A single-column semantic grid does not automatically resolve the interaction mismatch. When cards visually fill a row before moving to the next row, a screen reader user following that sequence may expect horizontal arrows to advance incrementally. A semantic column instead suggests vertical progression, while spatial horizontal arrows can skip collection items. Placing consecutive cards down a visual column before moving to the next column makes a single-column model more coherent, but sighted users commonly expect a uniform grid to fill rows first. These are competing expectations to test, not universal rules about screen reader users. Both the uniform grid and the updated adaptive masonry place consecutive cards across visual rows. Neither visual layout changes the single-row semantics of the primary experiments.

## Why the current model needs review

React Spectrum (RSP) `CardView` exposes a single-column ARIA grid while keyboard navigation follows visual layout. The original issues are:

- **Collection-position feedback:** Users need to understand the current item and total, such as "7 of 50." Reported single-column output includes "1 of 1" instead. The single-row recommendation addresses this positional-feedback problem; verify actual speech rather than inferring it from metadata.
- **One semantic dimension, two visual dimensions:** Users relying on the accessibility tree encounter one ordered sequence of cards. Sighted keyboard users see a two-dimensional grid and may expect directional arrows to follow that geometry. Navigation must be understandable from both perspectives and provide a discoverable route to every card.
- **Nonuniform geometry:** Waterfall uses unequal-height cards in independent columns; masonry uses equal-height cards within each visual row and variable widths based on image aspect ratios. Vertical neighbors can be ambiguous in both. The shared horizontal route avoids choosing spatial Left/Right neighbors. Test vertical movement in these two geometries separately rather than using their names interchangeably.

Virtualization introduces additional loading, reading-order, scrolling, and focus risks, but it is a later implementation stage, not a substitute for resolving these three original issues.

The discussion also reports that a selected-items action bar may obscure the focused card. Test this separately against [WCAG 2.4.11: Focus not obscured (minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html).

These are reported observations, not independently reproduced findings. Record DOM attributes, accessibility-tree structure, and spoken output separately before assigning a cause.

**Cell verbosity and focus:** React Spectrum's feedback identifies a separate problem: focusing a gridcell can announce its entire contents, including checkbox and action labels, rather than only its accessible name. [Issue #2946](https://github.com/adobe/react-spectrum/issues/2946) documents this in ListView and led to [moving focus to the row](https://github.com/adobe/react-spectrum/pull/3000). The team cites this as the rationale for its row-focused, single-column approach. A cell label alone did not suppress descendant announcements in that investigation. Acknowledge this usability benefit alongside the semantic/visual navigation tradeoff; do not assume that changing labels fixes it.

VoiceOver also reads the entire semantic row in the reported prototype testing, sometimes on each arrow movement. In a single-row grid, that can mean the entire collection. Users can pause speech or use VoiceOver navigation commands, but these are available techniques, not proof that repeated full-row speech is acceptable. Apple's [interaction commands](https://support.apple.com/guide/voiceover/interaction-commands-cpvokys07/mac) specify <kbd>VO</kbd> + <kbd>Shift</kbd> + <kbd>Left Arrow</kbd> or <kbd>Right Arrow</kbd> to navigate without automatically interacting with a webpage group; with Quick Nav enabled, use <kbd>Shift</kbd> + <kbd>Right Arrow</kbd> or <kbd>Left Arrow</kbd>. These commands do not enable Quick Nav and are distinct from the component's ordinary arrow handling. Test whether they help in each browser rather than promising that they suppress row reading.

Reading more than the title can also be necessary: two cards with identical titles may differ by description or other metadata. Compare concise navigation announcements with access to enough detail to distinguish those cards. Selection announcements complement this information; they do not replace it or suppress focus announcements.

## What the guidance supports

### RSP specification and implementation

The [original RSP Card accessibility specification](https://github.com/adobe/react-spectrum/blob/main/specs/accessibility/Card.mdx) recommends:

- A single-column `grid`, with one `row` and focusable `rowheader` per card.
- Collection-order navigation with <kbd>ArrowLeft</kbd> and <kbd>ArrowRight</kbd> in every layout.
- Spatial navigation with <kbd>ArrowUp</kbd> and <kbd>ArrowDown</kbd>.
- Selection states, labelled controls, and <kbd>Tab</kbd> access to the active card's interactive children.

This historical contract remains research context, not a currently selectable numbered variant. The retained `swc-card-view-single-column-grid` reference uses a gridcell per card and spatial arrows without wrapping. The recommended `swc-card-view-single-row-grid` instead places all gridcells in one semantic row.

[Current RSP CardView](https://react-spectrum.adobe.com/CardView) and Piyush's [PR #6798](https://github.com/adobe/spectrum-web-components/pull/6798) informed the earlier prototypes. Current RSP also uses virtualization and spatial masonry range selection. The SWC examples are fully loaded and retain collection-order range selection; they do not establish production RSP parity.

### APG and expert guidance

The WAI-ARIA Authoring Practices Guide (APG) [grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) supports layout grids containing independent controls. Authors must implement focus movement. The [layout grid examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/layout-grids/) permit optional wrapping between visual rows or columns; they do not require it.

[Sarah Higley](https://sarahmhigley.com/writing/grids-part1/) recommends choosing semantics based on the task, not visual appearance. [Adrian Roselli](https://adrianroselli.com/2020/07/aria-grid-as-an-anti-pattern.html) cautions against using a grid merely to reduce tab stops. Native lists and ordinary controls may be simpler.

These sources support different approaches. Use them to form testable hypotheses, not to declare a winning pattern.

### Product comparisons

Reported observations provide two additional references:

- **Google Docs:** Uses a listbox with interactive children; an axe DevTools scan flags an error. The [APG listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) does not support independently interactive controls inside options.
- **Google Drive:** Uses a single semantic row; an axe DevTools scan does not flag the pattern. The reported implementation also uses `aria-hidden` on cell content beyond the title. This informed the earlier prototype, but we reject the Google-inspired content-hiding approach based on the screen reader feedback below. Retaining single-row semantics does not require hiding cards.

These observations are not independently verified. A product precedent or passing scan does not establish accessible interaction.

We are not proceeding with the Google-inspired hidden-card experiment. Review feedback reports that users navigating with VoiceOver commands hear every card as "blank" and cannot access the cards without using the component's arrow keys. The feedback identifies the same access risk for touch-based screen readers. Screen reader reading navigation and touch exploration do not reliably trigger DOM focus or component key handlers, so revealing content only after keyboard entry cannot provide a reliable access path. This decision rejects our content-hiding experiment, not Google's implementation as a whole; the product observation was not independently verified.

The current working implementation keeps card content in the accessibility tree before, during, and after focus. It removes card-level `aria-hidden`, card-level `aria-live`, the offscreen entry hint, and explicit gridcell labels. The row label supplies the collection total, such as "50 items." The separate selection-announcement live region remains. This replaces Tab-to-reveal; access to titles, descriptions, and actions must not depend on first using the component's arrow keys or <kbd>Tab</kbd>.

With focus on a gridcell in the named navigation examples, <kbd>Tab</kbd> enters its first enabled control in the sequential tab order, currently the title action. Grid selection checkboxes are labelled "Select [card title]" and have `tabindex="-1"`, so Tab entry skips them; <kbd>Space</kbd> on the gridcell still toggles selection. The checkboxes remain exposed native controls, and `tabindex="-1"` does not prevent pointer or programmatic focus. Subsequent <kbd>Tab</kbd> presses follow the card's action order and then leave the collection; <kbd>Shift</kbd> + <kbd>Tab</kbd> reverses the path. Arrow keys move to the appropriate gridcell even when focus starts on a checkbox, title action, or Share action, rather than transferring focus to a control in the destination card. Automated regression coverage verifies these arrow destinations across 11 grid variants in LTR and RTL. Real screen reader reading, touch access, duplicate-title disambiguation, spoken output, and entry/exit behavior remain validation gates; automated focus tests do not establish accessibility conformance.

## Prototype comparison

The numbered variants are retired. Six descriptive semantic references remain: single-column grid, single-row grid, list, feed, toolbar, and fieldset. The recommended single-row grid supplies the semantics for all nine keyboard-navigation examples below, including Waterfall Advance.

Each grid, masonry, or waterfall navigation component has its own Storybook Docs page and one Playground containing 50 cards. All nine expose `grid > row > gridcell`, without explicit `aria-rowindex`, `aria-colindex`, `aria-rowcount`, or `aria-colcount`. The row is labelled "50 items"; gridcells have no explicit `aria-label` and their card content stays exposed. Photos use Picsum IDs matching one-based collection positions, making skipped or reordered items easier to identify.

"Semantic" means collection order; "spatial" means measured visual position. In all nine named grid, masonry, and waterfall examples, <kbd>ArrowRight</kbd> moves to the next enabled collection item and <kbd>ArrowLeft</kbd> to the previous one. At the last or first enabled item, movement wraps to the opposite end of the collection. This rule is independent of geometry and directionality: Right remains next and Left remains previous in RTL. It also applies to NoWrap, Loop, and Advance; their names distinguish vertical behavior, not horizontal behavior. The single-column grid and other semantic reference examples retain their existing navigation.

### Semantics and navigation

This strategy distinguishes three visual layout types. These names describe placement, not ARIA roles or keyboard policies.

| Layout | Card sizing and placement | Navigation question | Prototype status |
| ------ | ------------------------- | ------------------- | ---------------- |
| Grid | Equal-width columns and equal-height cards aligned in rows. Consecutive items fill each row before the next. | Which vertical policy best complements the shared horizontal collection-order route? | Four named `swc-card-view-grid-*` examples. |
| Masonry | Adaptive rows with equal card heights within each row and variable widths based on image aspect ratios. Consecutive items fill rows; vertical edges can differ between rows. | Which vertical neighbor should an arrow choose when several cards overlap horizontally? | Four named `swc-card-view-masonry-*` examples, renamed from the former waterfall family. |
| Waterfall | Equal-width, variable-height cards are assigned left to right across columns: 1, 2, 3, then 4, 5, 6, then 7, 8, 9 in a three-column LTR layout. Each column stacks independently, so later card tops can stagger instead of aligning in rows. Placement is neither shortest-column nor column-first; RTL mirrors it without changing collection order. | Is vertical column traversal and advancement predictable alongside horizontal collection-order navigation? | <a href="./?path=/docs/components-card-view-waterfall-advance--docs" target="_top">Waterfall advance</a> (`swc-card-view-waterfall-advance`), using vertical Advance navigation. |

The grid, masonry, and waterfall examples share one semantic row. Waterfall Advance assigns consecutive cards across columns before returning to the first column: 1, 2, 3, then 4, 5, 6 in a three-column LTR layout. Each card sits below the previous card in its assigned column, not in the shortest available column, so later card tops need not align. Right/Left follows next/previous collection order. Down follows the current visual column, then advances from its bottom to the first enabled card in the next column. Up reverses that route, moving from a column's top to the last enabled card in the previous column. Vertical movement skips disabled cards and columns, and wraps at the outer collection boundary. Selection, Home/End collection boundaries, and Tab entry into card actions follow the shared interaction contract; card content is never hidden pending entry. RTL mirrors placement while preserving column layout order. Test switching between the horizontal collection route and the vertical column route.

| Policy        | Uniform-grid example                                                                                                             | Masonry example                                                                                                                                              | Up/Down behavior                                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| NoWrap        | <a href="./?path=/docs/components-card-view-grid-nowrap--docs" target="_top">Grid nowrap</a> (`swc-card-view-grid-nowrap`)       | <a href="./?path=/docs/components-card-view-masonry-nowrap--docs" target="_top">Masonry nowrap</a> (`swc-card-view-masonry-nowrap`)                      | Move to a spatial vertical neighbor; stop when none exists.                                                              |
| Loop          | <a href="./?path=/docs/components-card-view-grid-loop--docs" target="_top">Grid loop</a> (`swc-card-view-grid-loop`)             | <a href="./?path=/docs/components-card-view-masonry-loop--docs" target="_top">Masonry loop</a> (`swc-card-view-masonry-loop`)                            | Move spatially; loop to the opposite vertical edge within the same overlapping column.                                |
| Advance       | <a href="./?path=/docs/components-card-view-grid-advance--docs" target="_top">Grid advance</a> (`swc-card-view-grid-advance`)    | <a href="./?path=/docs/components-card-view-masonry-advance--docs" target="_top">Masonry advance</a> (`swc-card-view-masonry-advance`)                   | Move spatially; cross a vertical edge into the next or previous column. Cycle at the outer collection boundary. |
| Semantic      | <a href="./?path=/docs/components-card-view-grid-semantic--docs" target="_top">Grid semantic</a> (`swc-card-view-grid-semantic`) | <a href="./?path=/docs/components-card-view-masonry-semantic--docs" target="_top">Masonry semantic</a> (`swc-card-view-masonry-semantic`)                | Move through semantic collection order on either arrow axis. Cycle at collection boundaries.                               |

NoWrap, Loop, and Advance use horizontal overlap to identify spatial vertical neighbors. Left/Right does not use this geometry. Masonry is row-based and adaptive, unlike waterfall's independent columns: cards share a height within each visual row, while image aspect ratios determine their widths. Full rows fill the available width; an incomplete final row need not stretch. All four masonry examples use the same placement. In a three-card-per-row LTR example, numbering runs 1, 2, 3 across the first row, 4, 5, 6 across the second, and 7, 8, 9 across the third. RTL mirrors placement from the inline start without changing collection order. The uniform grid also fills rows, but keeps equal-width columns. Visual rows do not create additional semantic rows.

This adaptive layout addresses the reported Lightroom-style horizontal ordering and equal-height row feedback; it does not claim exact Lightroom layout parity. The Oracle diagram reflects the new target. The latest layout regression still fails, so implementation validation remains open.

Repeated Right or Left provides a complete route through enabled items in every named variant, including NoWrap and Loop. Vertical Loop stays within the current overlapping column and need not reach every card. Vertical Advance crosses a visual boundary in column order. Semantic ignores geometry on both axes. These are vertical-policy differences on identical single-row semantics, not semantic alternatives.

The retained reference examples are:

| Reference                                                                                                  | Element                            | Role and purpose                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="./?path=/docs/components-card-view-single-row-grid--docs" target="_top">Single-row grid</a>       | `swc-card-view-single-row-grid`    | Recommended semantic structure: one row, one gridcell and semantic column per card. Its reference navigation is spatial without wrapping.   |
| <a href="./?path=/docs/components-card-view-single-column-grid--docs" target="_top">Single-column grid</a> | `swc-card-view-single-column-grid` | One semantic row per card and one column; retained as a contrast for positional-feedback testing. Spatial arrows stop at visual boundaries. |
| <a href="./?path=/docs/components-card-view-list--docs" target="_top">List</a>                             | `swc-card-view-list`               | Native `ul`/`li` with position metadata and ordinary child controls; a useful native-content reference.                                     |
| <a href="./?path=/docs/components-card-view-feed--docs" target="_top">Feed</a>                             | `swc-card-view-feed`               | Labelled feed and articles; a reading-stream reference, not the recommendation for asset selection.                                         |
| <a href="./?path=/docs/components-card-view-toolbar--docs" target="_top">Toolbar</a>                       | `swc-card-view-toolbar`            | Labelled command groups with native selection and actions; retained to illustrate the content-versus-command distinction.                   |
| <a href="./?path=/docs/components-card-view-fieldset--docs" target="_top">Fieldset</a>                     | `swc-card-view-fieldset`           | Native grouping with a visible legend; grouping alone does not establish arrow navigation or position feedback.                             |

### Shared keyboard navigation

The grid references and nine named grid, masonry, and waterfall examples share the following keys. Navigation from a checkbox, title action, or Share action focuses the destination gridcell, not another card's child control. Disabled items are skipped. These rules do not replace the list, feed, toolbar, or fieldset reference contracts; for example, the feed retains one-article page movement.

| Key | Behavior |
| --- | -------- |
| <kbd>ArrowRight</kbd> / <kbd>ArrowLeft</kbd> | In the nine named examples, move to the next / previous enabled collection item and wrap at either end, including in RTL. The grid references retain their spatial arrow behavior. |
| <kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd> | Follow the example's NoWrap, Loop, Advance, or Semantic vertical policy. |
| <kbd>Home</kbd> | Focus the first enabled item in the entire grid, not just the current placement row. |
| <kbd>End</kbd> | Focus the last enabled item in the entire grid, not just the current placement row. |
| <kbd>Page Down</kbd> | Focus the next enabled checkpoint after the current cell without wrapping. |
| <kbd>Page Up</kbd> | Focus the previous enabled checkpoint before the current cell without wrapping. |
| <kbd>Tab</kbd> | From a gridcell, focus its first enabled control in the sequential tab order, currently the title action. Skip the selection checkbox. Further presses visit the remaining actions, then leave the collection. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Reverse the tab path. |
| <kbd>Space</kbd> | Toggle selection of the focused gridcell. With focus on an interactive descendant, preserve that control's native activation behavior and stop propagation, so activating it does not also toggle card selection. A selection checkbox changes selection only through its own action. |
| <kbd>Enter</kbd> | Open the focused card. With focus on a child control, retain its native activation behavior. |
| <kbd>Shift</kbd> + navigation key | In multiple-selection mode, extend the collection-order selection range from the anchor to the destination, excluding disabled items. |

For paging, `totalVisualRows = Math.ceil(items.length / columns)`, using the current layout's column count, not the number of ARIA rows. Grid and masonry rows are placement rows. Waterfall uses each consecutive group of cards assigned across the columns as one placement row, even though their tops can be staggered.

Checkpoints are the first cell of the first visual row and the first cell every interval rows after that. The interval is `Math.floor(totalVisualRows / 2)` for fewer than 20 visual rows and `Math.floor(totalVisualRows / 5)` for 20 or more. Use a minimum interval of one row for a single-row grid, whose only checkpoint is its first cell. With 20 visual rows, checkpoints are the first cells of rows 1, 5, 9, 13, and 17. The last row is not an extra checkpoint unless it falls on the interval.

Page movement does not preserve the current column. From a checkpoint, move to the strictly previous or next checkpoint. From a later cell in a checkpoint row, <kbd>Page Up</kbd> returns to that row's first cell. Skip disabled checkpoint cells in the requested direction; do not substitute another cell in their row. If no enabled checkpoint remains in that direction, keep the current cell. Unmodified navigation does not change selection.

### Controls and selection

| Examples                                          | Child-control access                                                                                                   | Selection                                                                               |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Nine named grid, masonry, and waterfall navigation examples | Card content stays exposed. <kbd>Tab</kbd> from a gridcell focuses its first eligible action, skipping the checkbox. Further <kbd>Tab</kbd> presses visit actions, then leave the collection. Arrows from child controls focus the appropriate gridcell. | Exposed native checkboxes with `tabindex="-1"`, grid selection states, and <kbd>Space</kbd> selection on a gridcell; collection-order keyboard range selection. |
| Single-row and single-column grid references | <kbd>Tab</kbd> visits the active card's actions, then leaves the collection. Checkboxes and inactive-card controls are not tabbable. Arrows from child controls focus gridcells. | Exposed native checkboxes and grid selection states; collection-order keyboard range selection. |
| List and feed                                     | Every enabled checkbox and action remains in normal page tab order. Child-control arrows remain native.                | Native checkboxes; no custom range selection.                                           |
| Toolbar and fieldset                              | <kbd>Tab</kbd> visits the active card's Open and Share actions, then leaves. Action-button arrows remain native.       | Native checkboxes; selection and actions remain independent.                            |

<kbd>Shift</kbd> + <kbd>Tab</kbd> reverses the tab path. Card activation, checkbox selection, and child actions must remain separate.

The prototypes now include a visually hidden ARIA live region for selection feedback. Following React Aria's [`useGridSelectionAnnouncement`](https://github.com/adobe/react-spectrum/blob/main/packages/react-aria/src/grid/useGridSelectionAnnouncement.ts), it announces a single added or removed item's title and, when appropriate, the selected count. Changes outside the focused collection stay silent. The current prototype uses `aria-live="assertive"`; evaluate interruption as well as message content. This addresses missing selection announcements, not verbose gridcell or row speech. The prototype does not implement React Aria's localized message infrastructure or its special all-items selection value.

### Main tradeoffs and reported results

- **Single-row recommendation:** Earlier reported output provides useful "x of y" feedback and supports an incremental horizontal route through a row-first visual grid. VoiceOver's full-row speech and verbose cell contents remain counterevidence to evaluate. The current version removes explicit gridcell labels, labels the row with the item count, and keeps card content exposed. All policies need fresh speech testing; earlier speech reports do not establish the output of this version.
- **Shared horizontal route:** Right visits the next enabled collection item and Left the previous, wrapping at both ends in LTR and RTL. Test discovery of this complete route separately from vertical-policy preferences.
- **NoWrap:** Keeps a visible stopping boundary for Up/Down; horizontal movement still wraps through the collection.
- **Loop:** Preserves the overlapping column for Up/Down; a repeated vertical arrow may stay in a local loop, while Left/Right can reach the rest of the collection.
- **Advance:** Continues across vertical boundaries, but users must understand a column traversal order that the single-row semantics do not describe. Test vertical movement where variable-width cards overlap several cards in another row.
- **Semantic:** Gives either arrow axis a complete sequential route. Sighted users may instead expect spatial vertical movement to a card above or below. Whole-collection cycling also requires users to recognize repeated items.
- **Reference examples:** Lists preserve ordinary content and controls but add tab stops; feeds describe reading streams; toolbars describe commands; fieldsets provide grouping without establishing collection navigation. Retain them as context, not parallel semantic decision tracks.

Reported speech is specific to the tested environment. ARIA metadata and accessibility-tree snapshots do not guarantee the same announcements elsewhere.

## Requirements for every option

### Access and interaction

- Provide a discoverable path to every enabled card and child control.
- Define collection entry, forward and reverse exit, and return from child controls.
- Keep selection, card activation, and child actions independent.
- Use selection states supported by the role or native checkboxes.
- Define disabled-item and range-selection behavior.
- Keep focus visible and clear of sticky content and action bars.

Repeated forward traversal must provide a reliable way to reach the collection's items. This does not mean every arrow direction must visit every item.

### Order and position

- Preserve logical order and stable item identity through resizing, zooming, layout changes, and loading.
- Preserve focus and selection; define a predictable focus destination when an item is removed.
- Expose logical position and known total, including when only part of the collection is rendered. Use the supported unknown-total convention when the total is unavailable.
- Verify spoken position, selected state, and boundary feedback in real screen readers.
- Avoid restructuring semantic rows solely to match viewport changes unless testing supports that choice.

### Geometry and virtualization

Sequential navigation can use collection order. Spatial navigation needs documented overlap or distance rules, tie-breaking, boundaries, scrolling, and wrapping.

Update geometry after resizing, image loading, content changes, and layout changes. Batch measurements rather than reading every card's geometry on each key press.

Virtualization is a separate implementation stage. It must preserve focused elements and support loading and scrolling through both keyboard navigation and screen reader reading.

## Evaluation plan

### Test stages

1. Verify positional feedback for the recommended single-row grid with real screen readers. Use the single-column grid and list references only where a comparison helps explain the evidence.
2. Hold single-row semantics, 50 cards, content, and actions constant. Verify next/previous horizontal movement and end-to-start/start-to-end wrapping in every named variant, including in RTL and when boundary items are disabled. Compare Grid NoWrap, Loop, Advance, and Semantic as vertical policies with both sighted keyboard users and users relying on semantic order.
3. Compare the four masonry policies with the same adaptive row placement. Verify equal heights within a row, variable widths, and collection numbering across rows. Test vertical-neighbor choice where card edges do not align between rows. Evaluate Waterfall Advance separately: verify equal widths, consecutive left-to-right column assignment, independent column stacking, horizontal collection-order cycling, and vertical traversal within and between visual columns, including disabled cards and columns, boundary wrapping, RTL, and reflow.
4. Test disabled cards, reverse traversal, incomplete final rows, RTL, resizing, zoom, focus visibility, and entry/exit. Record shared horizontal collection-edge cycling separately from vertical looping or advancement. Confirm the single-column grid and other semantic references retain their existing behavior.
5. Add virtualization only after choosing a clear keyboard contract.

Automated checks cover axe violations, accessibility-tree structure, selection states, and relevant focus paths. They do not verify spoken output or user understanding.

### Environments

| Environment                              | Test focus                                                                              |
| ---------------------------------------- | --------------------------------------------------------------------------------------- |
| NVDA with Chrome and Firefox             | Focus-mode navigation, selection, position, and child controls.                         |
| JAWS with Chrome                         | Navigation, position, collection entry/exit, and selection.                             |
| VoiceOver with Safari                    | Ordinary arrows and VoiceOver commands separately; reading, scrolling, and loading.     |
| Narrator with Edge                       | Navigation, position, and child controls.                                               |
| VoiceOver on iOS and TalkBack on Android | Touch reading order, selection, actions, and loading.                                   |
| Keyboard without a screen reader         | Discoverability, visual predictability, reverse movement, and focus visibility at zoom. |

### Tasks and decision criteria

Ask users to:

- Reach the seventh card and explain how to continue forward and backward.
- Visit every card without missing a column or mistaking a boundary for the end.
- Identify the current position, total, and selected state.
- Distinguish cards with identical titles using their additional content.
- Read card titles, descriptions, and actions with VoiceOver reading commands and touch-based screen readers before using component arrows or <kbd>Tab</kbd>. Cards must remain available, not be announced as "blank" because their contents are hidden.
- From a gridcell, press <kbd>Tab</kbd> and confirm that its first eligible action receives focus, skipping the checkbox without changing selection or activating an action. Check subsequent <kbd>Tab</kbd> and <kbd>Shift</kbd> + <kbd>Tab</kbd> navigation. From each child control, verify that arrow keys return focus to the appropriate gridcell rather than another card's controls. Test checkbox selection through gridcell <kbd>Space</kbd>, pointer input, and assistive technology separately.
- Compare full-cell and full-row speech with concise names; record ordinary arrows, Quick Nav, group-navigation commands, and pausing speech separately rather than requiring an undocumented workaround.
- Confirm selection and deselection messages without mistaking live-region speech for a focus announcement.
- Select two cards and use a bulk action.
- Activate a card and a child action independently.
- Enter and leave the collection and its controls in both directions.
- Continue after resizing, changing layouts, loading items, or removing the focused card.

Record task completion, errors, effort, focus movement, and spoken output. Include screen reader users, record browser and assistive technology versions, and test default settings first.

Choose a keyboard-navigation policy only when users can complete these tasks with acceptable effort and without undocumented workarounds. The single-row semantic recommendation and the final keyboard-policy decision are separate conclusions.

Assess the result against [WCAG 1.3.1: Info and relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html), [1.3.2: Meaningful sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html), [1.4.10: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [2.1.1: Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html), [2.4.3: Focus order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html), and [4.1.2: Name, role, value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html). Reported observations alone do not establish conformance or failure.

## Sources and further context

- [RSP CardView documentation](https://react-spectrum.adobe.com/CardView), [CardView source](https://github.com/adobe/react-spectrum/blob/main/packages/@react-spectrum/s2/src/CardView.tsx), and [MasonryLayout source](https://github.com/adobe/react-spectrum/blob/main/packages/react-stately/src/layout/MasonryLayout.ts).
- [Original RSP Card accessibility specification](https://github.com/adobe/react-spectrum/blob/main/specs/accessibility/Card.mdx).
- [React Spectrum gridcell verbosity report](https://github.com/adobe/react-spectrum/issues/2946) and [row-focus refactor](https://github.com/adobe/react-spectrum/pull/3000).
- [React Aria selection-announcement hook](https://github.com/adobe/react-spectrum/blob/main/packages/react-aria/src/grid/useGridSelectionAnnouncement.ts).
- [Apple VoiceOver interaction commands](https://support.apple.com/guide/voiceover/interaction-commands-cpvokys07/mac).
- [Piyush's PR #6798](https://github.com/adobe/spectrum-web-components/pull/6798).
- [APG grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/), [layout grid examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/layout-grids/), and [feed pattern](https://www.w3.org/WAI/ARIA/apg/patterns/feed/).
- [APG listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) and [MDN ARIA role reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles).
- [Sarah Higley: Grids Part 1, To grid or not to grid](https://sarahmhigley.com/writing/grids-part1/).
- [Adrian Roselli: ARIA Grid As an Anti-Pattern](https://adrianroselli.com/2020/07/aria-grid-as-an-anti-pattern.html).
- [Team discussion](https://adobedesign.slack.com/archives/G01P2PHJMC6/p1791294472435709), requiring Adobe workspace access.
- [WebKit issue referenced in the discussion](https://bugs.webkit.org/show_bug.cgi?id=236790), a possible explanation for announcement differences, not a confirmed diagnosis.
- [ARIA secondary-actions proposal](https://github.com/w3c/aria/issues/1440), future context rather than an implementation dependency.
