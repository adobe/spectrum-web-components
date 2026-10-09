<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Strategies / Card view strategy

<!-- Document title (editable) -->

# Card view strategy

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Problem with the current implementation](#problem-with-the-current-implementation)
    - [Announced structure and navigation do not align](#announced-structure-and-navigation-do-not-align)
    - [Positional feedback is unreliable](#positional-feedback-is-unreliable)
    - [Waterfall and virtualization add separate risks](#waterfall-and-virtualization-add-separate-risks)
    - [The design question](#the-design-question)
- [Existing recommendations and guidance](#existing-recommendations-and-guidance)
    - [The model originally recommended to RSP](#the-model-originally-recommended-to-rsp)
    - [APG layout grids](#apg-layout-grids)
    - [Expert cautions about layout grids](#expert-cautions-about-layout-grids)
    - [Observations from Google Docs and Google Drive](#observations-from-google-docs-and-google-drive)
- [Possible semantics and interaction models](#possible-semantics-and-interaction-models)
- [Requirements shared by all solutions](#requirements-shared-by-all-solutions)
    - [Reachability, selection, and activation](#reachability-selection-and-activation)
    - [Position, reading order, and responsive layout](#position-reading-order-and-responsive-layout)
    - [Geometry and virtualization](#geometry-and-virtualization)
- [Possible solutions](#possible-solutions)
    - [Mapping the RSP specification and implementation](#mapping-the-rsp-specification-and-implementation)
    - [Option 1: Retain and repair the RSP layout-grid model](#option-1-retain-and-repair-the-rsp-layout-grid-model)
    - [Option 2: Add complete forward traversal to the layout grid](#option-2-add-complete-forward-traversal-to-the-layout-grid)
    - [Option 3: Use native list semantics and explicit controls](#option-3-use-native-list-semantics-and-explicit-controls)
    - [Option 4: Use feed semantics with interactive articles](#option-4-use-feed-semantics-with-interactive-articles)
    - [Option 5: Use one semantic row with a cell per card](#option-5-use-one-semantic-row-with-a-cell-per-card)
    - [Option 6: Use semantic-order vertical navigation in waterfall](#option-6-use-semantic-order-vertical-navigation-in-waterfall)
    - [Option 7: Group card controls in a toolbar](#option-7-group-card-controls-in-a-toolbar)
    - [Option 8: Group card controls in a native fieldset](#option-8-group-card-controls-in-a-native-fieldset)
- [Evaluation and recommended next steps](#evaluation-and-recommended-next-steps)
    - [Test matrix](#test-matrix)
    - [Test tasks and acceptance criteria](#test-tasks-and-acceptance-criteria)
- [Sources](#sources)

</details>

<!-- Document content (editable) -->

## Problem with the current implementation

React Spectrum (RSP) `CardView` presents a collection of content objects with selection, activation, bulk actions, and interactive controls inside cards. Its accessibility model exposes a single-column ARIA grid while keyboard navigation follows the visual layout. This can create a mismatch between the structure a screen reader announces and the movement users experience.

This strategy records observations from the supplied team discussion, the original RSP accessibility specification, and published guidance. The implementation observations are reports from that discussion, not independently reproduced results. The document proposes exploration for Spectrum Web Components (SWC); it does not establish a final accessibility specification or conclude that a particular role is a WCAG failure.

### Announced structure and navigation do not align

Screen reader users hear a grid with one column, even when the screen displays several columns of cards. Pressing <kbd>ArrowDown</kbd> appears to be a reasonable way to traverse that collection. However, spatial navigation can reach the bottom of one visual column without visiting cards in other columns. Users may believe they reached the end of the collection when items remain undiscovered.

The regular grid reportedly allows sequential traversal with <kbd>ArrowLeft</kbd> and <kbd>ArrowRight</kbd>, but the one-column announcement does not explain why those keys are needed. In waterfall layouts, left/right navigation is spatial and non-wrapping, which adds uncertainty about how to reach every card.

Screen reader browse commands are not a sufficient substitute for an understandable widget interaction. NVDA and JAWS commonly enter focus mode for grids, where ordinary arrow keys go to the widget. VoiceOver commands and ordinary arrows can produce different movement and announcements. These behaviors require testing rather than assuming that screen reader navigation always follows collection order.

### Positional feedback is unreliable

RSP reportedly supplies `aria-rowcount` on the grid and `aria-rowindex` on each row, but testers do not consistently hear the current position and total, such as "3 of 10." Without that feedback, a jump over another item may not be apparent.

The discussion reports changing row-count announcements in some browser/screen reader combinations, alongside reports that the row-count attribute remains consistent and that the problem was not reproduced in Safari. Attribute values, accessibility-tree exposure, and spoken output must be checked separately before assigning a cause.

Neither grid attributes nor list position attributes guarantee a particular spoken phrase. Increasing verbosity or using different screen reader commands may help some combinations, but should not be assumed to resolve the default experience.

### Waterfall and virtualization add separate risks

Waterfall places cards according to available column height, so visual neighbors may not be neighbors in collection order. Spatial navigation can look sensible to sighted users while remaining difficult to predict without sight. Lack of a visual ordering does not remove the need for a stable, understandable route through the collection.

Virtualization can remove items from the DOM and complicate reading order, item counts, focus, and loading. Testers report that VoiceOver cursor navigation sometimes skips items or fails to scroll and load additional cards. These reports do not yet distinguish implementation gaps from browser or assistive technology limitations.

The discussion also flags a selected-items action bar potentially obscuring the focused card. This needs separate verification against [WCAG 2.4.11: Focus not obscured (minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html).

### The design question

The question is not only whether ARIA permits a layout grid. It is whether users can reliably reach every card, understand their location and selection, activate the card, and use its child controls without guessing the navigation model.

## Existing recommendations and guidance

### The model originally recommended to RSP

The [original Card accessibility specification](https://github.com/adobe/react-spectrum/blob/main/specs/accessibility/Card.mdx) distinguishes standalone cards from cards within a `GridView`.

For a standalone card, it recommends a named `region`, a non-focusable container, and normal page tab order for interactive children. Controls revealed on hover must also appear when focus enters the card. Card titles provide accessible names, supporting text provides descriptions, and images are decorative unless meaningful alternatives are supplied.

Within a collection, it recommends:

- A container with `role="grid"`, `aria-rowcount` representing the collection total, and `aria-colcount="1"`.
- One semantic `row` per card, with `aria-rowindex` representing its collection position.
- A focusable card container with `role="rowheader"` and `aria-colindex="1"`.
- Selection exposed through `aria-selected` on the row and card container.
- Tabbable child controls only in the active row; inactive rows' controls use `tabindex="-1"`.
- Accessible names and descriptions derived from card content and labelled selection controls.

Its keyboard recommendations deliberately combine sequential and spatial navigation:

| Keys | Original recommendation |
| --- | --- |
| <kbd>ArrowRight</kbd> / <kbd>ArrowLeft</kbd> | Move to the next/previous enabled card in collection order, regardless of layout, explicitly to make every item reachable. |
| <kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd> | Move to the card with the greatest overlap in the following/preceding visual row. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Move to the first/last card in the collection. |
| <kbd>PageDown</kbd> / <kbd>PageUp</kbd> | Optionally move by an implementation-defined number of visual rows. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Move through interactive descendants of the focused card. |
| <kbd>Space</kbd> | Toggle card selection, or activate the focused child control without also toggling card selection. |

The supplied discussion describes RSP's implemented tab behavior as moving into the focused card's children, through those children, and then out of the collection. The spec also includes an unusual instruction to make all card containers tabbable when no item has focus; resolve that detail explicitly in a new prototype rather than copying it as a single-tab-stop rule.

The spec does not guarantee spoken "x of y" feedback. It includes a historical note that the v2 implementation does not fully conform. The supplied discussion identifies spatial left/right navigation in waterfall as differing from the specified sequential behavior.

### APG layout grids

The WAI-ARIA Authoring Practices Guide (APG) [grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) supports both interactive data grids and layout grids that group links, buttons, or other widgets. A grid has one element in the page tab sequence, and the author implements focus movement within it.

The [layout grid examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/layout-grids/) demonstrate related links, recipient chips, and scrollable search results. Grid cells preserve the semantics of their children: a contained link remains a link rather than becoming an option or menu item.

The APG permits layouts without data headers or meaningful tabular relationships. It also permits wrapping at row or column boundaries so repeated forward navigation can traverse the collection. For example, moving down from the bottom of one visual column may move to the top of the next column. This is optional, not a requirement that every grid use wrapping.

These examples include discoverability aids for arrow navigation. They also explicitly warn that the example code is not intended for production. APG guidance is not itself the normative ARIA specification or proof that a particular implementation is usable.

### Expert cautions about layout grids

[Sarah Higley's table/grid guidance](https://sarahmhigley.com/writing/grids-part1/) recommends choosing semantics based on purpose and context. Reading and comparing information favors a table; editing or manipulating information may justify a grid. A visual grid of objects is not inherently semantic tabular data. Familiarity and long-term efficiency may justify more complex widgets in frequently used applications.

[Adrian Roselli's critique](https://adrianroselli.com/2020/07/aria-grid-as-an-anti-pattern.html) cautions against using grid solely to reduce tab stops or match visual layout. Changing expected keyboard behavior can confuse users, particularly keyboard users who do not receive a screen reader's role announcement. Native lists, tables, skip links, and disclosure patterns may solve the underlying problem more simply.

These positions differ from the APG's endorsement of layout grids. The decision needs user evidence, not an assumption that either valid grid markup or native HTML automatically solves every requirement.

### Observations from Google Docs and Google Drive

The supplied observations provide two comparisons for the card view prototypes:

- **Google Docs:** The observed implementation uses a listbox with interactive children. An axe DevTools scan flags this implementation as an accessibility error. This is not evidence that independently interactive children are supported within listbox options.
- **Google Drive:** The observed implementation uses a grid with a single semantic row. An axe DevTools scan does not flag this pattern as an error. This provides a comparison for option 5's single-row grid model.

These are reported observations, not independently reproduced findings. Automated scans do not establish whether users can reliably navigate, select items, understand their position, or reach child controls. Neither an existing product implementation nor the absence of an axe DevTools error replaces keyboard and screen reader testing.

## Possible semantics and interaction models

Roles communicate purpose and expected interaction; they do not implement keyboard behavior. A role should represent the collection's purpose, not serve as a mechanism for obtaining arrow-key events from screen readers.

| Role or structure | Benefits | Constraints for card view |
| --- | --- | --- |
| Native list (`ul`/`ol` and `li`) | Naturally represents related objects and preserves headings, links, buttons, and checkboxes. `aria-posinset` and `aria-setsize` can describe positions when only part of a set is rendered. | Does not establish a composite arrow-navigation or single-tab-stop contract. Use explicit selection controls, not `aria-selected` on list items. Supplementary arrow shortcuts may be consumed in browse mode and cannot be the only access path. |
| `listbox` with `option` | Provides established arrow navigation, selection, and positional semantics. Appropriate when cards are simple selectable choices. | Does not support independently interactive children inside options. Descendant structure is flattened into the option name. Requires moving secondary actions outside the options. |
| `toolbar` | Supports arrow navigation among real controls and typically one tab stop. Useful for card actions or bulk actions. | Describes a compact set of commands, not content objects. Does not supply card-level selection, positional semantics, or a standard enter-card interaction. |
| `menu` | Supports arrow navigation, activation, and checked menu items. Appropriate for a card's action menu. | Requires menu-item semantics and command-oriented behavior. Does not fit rich cards with independently interactive descendants. |
| `group` | Names a related set of controls while preserving their semantics. Useful within a card. | Provides no collection navigation, selection, item-position, or single-tab-stop contract. Adding handlers does not create those semantics. |
| `feed` with `article` | Represents dynamically loaded rich content, preserves interactive children, and coordinates reading with loading. Articles can expose position and total metadata. | Intended for a content stream, not a selectable spatial collection. Recommended navigation uses Page Up/Down, not four-direction arrows. Selection needs separate controls, and support needs testing. |
| `grid` | Established composite pattern supporting selection, arrow navigation, and interactive descendants. Supplies virtualized row/cell metadata. | Requires focus management and a clear relationship between announced structure and movement. Complex child controls can compete for the same keys. Position announcements vary. |
| `tree` / `treegrid` | Appropriate for genuinely hierarchical collections with expandable parent/child relationships. A treegrid supports interactive cells. | Adds hierarchy and expansion expectations that ordinary cards do not have. Not a replacement solely to gain arrow navigation. |

The [MDN role reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles) documents these role purposes. The [APG listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) specifically explains why options cannot provide accessible interaction with child links, buttons, or checkboxes.

A native table remains appropriate for meaningful data relationships, but not merely because cards align visually. A card container may use `article`, `group`, or an appropriately named `region` depending on its content; those structures do not determine collection keyboard behavior. `application` is not a substitute collection role and should not be used to force screen reader key handling.

The proposed [`aria-actions` work](https://github.com/w3c/aria/issues/1440) may eventually broaden access to secondary actions in other patterns. It is future-facing context, not a dependency for an interoperable solution today; verify its current specification and support before relying on it.

## Requirements shared by all solutions

### Reachability, selection, and activation

- Provide a documented, predictable path to every card and every child control, without requiring trial and error between arrow directions.
- Keep card activation, selection, and child activation distinct. Activating a child button must not accidentally select or activate the whole card.
- Expose selection through states supported by the chosen role or through native checkboxes. Announce bulk-action results and important selection changes without duplicating ordinary control announcements.
- Define collection entry, forward and reverse exit, return from child controls, disabled-item handling, and any range-selection behavior.
- Avoid nesting interactive elements inside a button or link that wraps the whole card.

Repeated forward traversal should reach every enabled card. Allowing both rightward and downward traversal to do so is a useful layout-grid hypothesis to test, not a universal requirement that repeated presses of any arrow key must visit every item.

### Position, reading order, and responsive layout

Keep a stable logical order unless the user actually sorts or reorders the collection. Do not rebuild semantic rows and columns solely to mirror viewport changes. This is a design preference to test, not a claim that responsive semantic restructuring is always a WCAG violation.

Verify current position, known total, selected state, and collection boundaries in actual spoken output. In virtualized views, report logical indices and totals rather than treating the rendered window as the entire collection. Use the relevant unknown-total convention when the total is unavailable; never invent a count. If metadata is insufficient, investigate concise contextual feedback without making card names excessively verbose.

Resizing, zooming, switching between grid and waterfall, and loading more items should preserve focus and selection by stable item identity. When the focused card is removed, move focus to a predictable remaining target and explain the change when necessary.

### Geometry and virtualization

Sequential navigation can use collection order without measuring positions. Spatial navigation needs an explicit algorithm, including overlap or distance criteria, tie-breaking, boundary behavior, scrolling, and wrapping.

For a uniform grid, a known column count may support geometric navigation. For waterfall, column count alone is insufficient; item positions and dimensions are needed. Consider `ResizeObserver` for relevant size changes, but account for image loading, content changes, layout switches, and newly rendered items as well. Batch geometry reads and avoid measuring the entire collection on every key press.

Do not remove the focused card or active child from the DOM without deliberate focus handling. Confirm that keyboard navigation and screen reader reading can both trigger loading and scrolling where required. Keep focus visible and unobscured by sticky content or action bars.

## Possible solutions

### Mapping the RSP specification and implementation

**Original RSP Card accessibility specification maps to option 1.** The [historical specification](https://github.com/adobe/react-spectrum/blob/main/specs/accessibility/Card.mdx) describes a single-column layout grid with one `row` per card and a `rowheader` inside it. Left/Right visits the next/previous enabled card in collection order regardless of layout; Up/Down chooses an adjacent visual row by overlap. Only the active card's interactive descendants are tabbable. Option 1 reproduces these central semantics and navigation rules, but its geometry scoring is a prototype approximation, not an exact implementation of the specification's largest-overlap rule.

**RSP's actual CardView implementation maps most closely to the baseline, `swc-card-view`, not a numbered option.** The [current CardView documentation](https://react-spectrum.adobe.com/CardView) renders a one-column semantic grid with `gridcell` rather than `rowheader`. Its [CardView source](https://github.com/adobe/react-spectrum/blob/main/packages/@react-spectrum/s2/src/CardView.tsx) uses GridLayout for uniform cards and WaterfallLayout for varied-height cards. The baseline adapts this distinction from the PR comparison; it is not a copy of RSP's production component.

| Contract | Original specification | Current RSP implementation | SWC comparison |
| --- | --- | --- | --- |
| Card role | `rowheader` inside a `row` | `gridcell` inside a `row`, observed in the documentation examples | Option 1 uses `rowheader`; baseline uses `gridcell`. |
| Semantic dimensions | One column, one row per card, regardless of visual wrapping | Documentation examples expose `aria-colcount="1"` and one semantic row per card | Both option 1 and baseline retain this framing; neither is option 5's single-row grid. |
| Left/Right | Sequential next/previous enabled card regardless of layout | Uniform grid follows collection order; [WaterfallLayout](https://github.com/adobe/react-spectrum/blob/main/packages/react-stately/src/layout/WaterfallLayout.ts) overrides Left/Right using geometry and perpendicular overlap | Option 1 stays sequential in both layouts; baseline switches to spatial movement in waterfall. |
| Waterfall selection range | Sequential horizontal keyboard traversal remains the specified route | WaterfallLayout also overrides range selection to work spatially | The baseline's Shift navigation still selects a collection-order range, so it does not provide exact RSP selection parity. |
| Rendering scope | Describes the Card/GridView interaction contract | Current CardView uses a Virtualizer with layout-specific measurement | All SWC prototypes are fully loaded; virtualization and production loading behavior are not reproduced. |

These comparisons distinguish a historical design contract, current source behavior, and the SWC adaptation. Role metadata and automated checks do not establish equivalent screen reader speech or usability. Verify release versions and assistive technology behavior before treating either mapping as full conformance.

**Baseline drawback:** In observed screen reader output, every card in `swc-card-view` is read as "1 of 1" rather than its position in the full collection. The same drawback applies to options 1 and 2; verify the screen reader and browser combinations in the evaluation matrix rather than treating this observation as universal behavior.

### Option 1: Retain and repair the RSP layout-grid model

Keep a stable single-column grid with one row per card. Restore or preserve collection-order left/right navigation for both uniform and waterfall layouts, as the original spec recommends. Retain spatial up/down navigation initially as the comparison baseline. Use one active card entry point and make that card's child controls available through Tab.

**Benefits:** Preserves selection, interactive children, efficient collection navigation, and familiarity with RSP's existing model. A sequential route remains independent of geometry.

**Tradeoffs:** Every card is read as "1 of 1" in observed screen reader output, so its position in the full collection is not conveyed. The one-column announcement still does not explain spatial up/down movement. Restoring sequential left/right in waterfall may feel visually surprising. Row/index attributes still require assistive technology verification.

**Decision condition:** Users can discover the sequential route, reach every item, understand position, and perform selection and child actions without relying on undocumented screen reader commands.

### Option 2: Add complete forward traversal to the layout grid

Prototype optional up/down column wrapping in a fully loaded uniform layout. Moving down from the bottom of a visual column moves to the top of the next column; reverse navigation mirrors that rule. Keep a collection-order route through left/right navigation. Compare against Option 1 before extending the algorithm to waterfall.

Option 5 separates the single-row semantic experiment from this wrapping-navigation contract.

**Benefits:** Tests the APG's optional wrapping behavior and reduces the chance that repeated downward navigation stops before users encounter all cards.

**Tradeoffs:** Every card is read as "1 of 1" in observed screen reader output, so its position in the full collection is not conveyed. Wrapping can surprise sighted users. Spatial traversal order may differ from collection order, and waterfall lacks clear visual rows. A one-row semantic variant could still conflict with expectations about vertical movement.

**Decision condition:** Users understand the boundaries and wrapping, all items are reachable, and the improvement does not introduce unacceptable visual-navigation confusion.

### Option 3: Use native list semantics and explicit controls

Represent the collection with a native list and each card as a list item. Provide a link or button for the primary action, a labelled checkbox for selection, and separate child controls. Use normal Tab navigation and screen reader reading commands. Consider skip links or other appropriate bypass mechanisms when the collection has many tab stops.

List items have a roving focus entry point. Left/Right moves sequentially between enabled items (mirrored in RTL); Up/Down moves spatially above/below with horizontal overlap. Home/End reaches the first/last enabled item. Child controls retain normal Tab access and native arrow behavior. These shortcuts supplement rather than replace normal access. Keep list position metadata accurate if items are virtualized.

**Benefits:** Preserves content structure and independent child interactions without claiming that a non-tabular collection is a grid. Selection and activation use familiar controls.

**Tradeoffs:** Arrow-key navigation is unexpected in a native list and requires discovery. In observed screen reader use, "x of y" is not announced even with `aria-posinset` and `aria-setsize` on the list items. More tab stops, no built-in composite range-selection model, and potentially slower repeated operation in a large application remain drawbacks. Reliable virtualized reading and positional speech across browser and screen reader combinations still need testing.

**Decision condition:** Users can complete reading, opening, selection, and bulk-action tasks with acceptable effort. The usability benefit outweighs the loss of a single-tab-stop collection.

### Option 4: Use feed semantics with interactive articles

Use a labelled `feed` with a focusable `article` for each card. Keep real selection checkboxes, primary actions, and secondary controls inside articles. Navigate sequentially between articles with <kbd>PageDown</kbd> and <kbd>PageUp</kbd>; preserve normal Tab access to article controls. Expose article position and total with `aria-posinset` and `aria-setsize`.

This replaces the earlier listbox prototype proposal. The exploration retains independently interactive controls inside cards, which the listbox pattern does not support. Listbox remains a possible product redesign only if actions can move outside the options.

**Benefits:** Preserves rich reading structure and independent card controls without row/column framing. Provides a starting point for testing reading-driven loading in a future dynamic content stream.

**Tradeoffs:** A feed represents a content stream, not every selectable asset collection. It uses <kbd>PageUp</kbd> and <kbd>PageDown</kbd> rather than four-direction arrows. Keyboard navigation is both unintuitive and tedious for sighted users because these keys move only one article at a time rather than a page, especially in large collections. It adds article tab stops and does not provide composite range selection. A fully loaded prototype cannot verify the feed's dynamic loading contract.

**Decision condition:** The collection genuinely fits a reading-oriented feed, and users understand article navigation, selection, child controls, and entry/exit. Dynamic loading requires separate implementation and assistive technology evaluation.

### Option 5: Use one semantic row with a cell per card

Represent the collection as a `grid` containing one `row`, with one focusable `gridcell` per card. Expose `aria-rowcount="1"`, `aria-colcount` equal to the collection size, `aria-rowindex="1"` on the row, and a stable one-based `aria-colindex` on each cell. Preserve this structure across grid and waterfall layouts, resize, and zoom.

Left/Right traverses enabled cards incrementally in collection order, mirrored for right-to-left layouts. Home/End reaches the first/last enabled card. Up/Down skips to the nearest enabled card visually above/below with horizontal overlap, stopping at visual boundaries. Keep checkbox selection, Space/Enter behavior, keyboard range selection, and Tab access to the active card's controls.

**Benefits:** Aligns horizontal navigation with the announced single-row structure. Announces “x of y” in observed screen reader use, communicating each card's position and the collection size. Arrow-key navigation is easy and intuitive for sighted users navigating items. Provides a complete sequential route in both visual layouts while retaining selection and independently interactive children. Does not regroup semantic rows as the viewport changes.

**Tradeoffs:** Announced columns describe collection order rather than visual columns. Screen reader users expect only one row from the announced structure, so vertical navigation with <kbd>ArrowUp</kbd> and <kbd>ArrowDown</kbd> may be unexpected. Sequential waterfall movement can look surprising. Column count/index metadata does not guarantee spoken “x of y” across browser and screen reader combinations; changing metadata alone is not proof of improved accessibility.

**Decision condition:** Users discover the sequential route, reach every enabled card, understand position and selection, and access child actions without excessive effort. Compare spoken output and sighted keyboard usability with Options 1–3 rather than assuming one-row semantics resolve the mismatch.

### Option 6: Use semantic-order vertical navigation in waterfall

Use Option 1's labelled single-column `grid`, with one `row` and `rowheader` per card. Preserve its selection, native checkbox and action controls, range selection, and active-card Tab access. Uniform-grid navigation is identical to Option 1.

In waterfall, support only one arrow-navigation axis: <kbd>ArrowDown</kbd> moves to the next enabled card in semantic collection order and <kbd>ArrowUp</kbd> moves to the previous one, regardless of visual geometry. <kbd>ArrowLeft</kbd> and <kbd>ArrowRight</kbd> do not navigate. Movement stops at collection boundaries; Home/End still reaches the first/last enabled card.

**Benefits:** Shares Option 5's evaluation goals: useful “x of y” positional feedback, easy and intuitive arrow navigation for sighted users, a complete semantic traversal route, selection and independent child controls, and stable semantics during reflow. Waterfall navigation is easy to follow visually because it uses one predictable semantic traversal sequence. Option 5's observed “x of y” result is not verified for this new Option 1-based variant.

**Tradeoffs:** As with Option 5, semantic dimensions differ from visual layout, sequential waterfall movement can place focus away from the nearest visual neighbor, and grid mode changes and positional speech require screen reader testing. This variant announces one column with multiple rows, not Option 5's single row. Waterfall traversal is slightly more tedious because reaching a distant item requires stepping through intervening items rather than using spatial shortcuts. Metadata alone does not guarantee “x of y” announcements.

**Decision condition:** Users can follow semantic-order waterfall traversal, understand that horizontal arrows do not navigate in that layout, and reach cards and child controls with acceptable effort. Compare actual positional speech and sighted keyboard usability with Options 1 and 5.

### Option 7: Group card controls in a toolbar

Use a labelled horizontal `toolbar` with a labelled `group` per card. Left/Right moves sequentially between enabled card checkboxes, mirrored in RTL; Up/Down moves to the checkbox spatially above/below. Home/End reaches the first/last enabled checkbox. Tab visits Open and Share within the active card, then exits; Shift+Tab reverses that path. Arrow keys on action buttons remain native. Native Space/Enter activation is preserved. With selection disabled, Open becomes the arrow-navigation entry point.

**Benefits:** Retains independent controls and native activation, with efficient checkbox-to-checkbox arrows and active-card action tab stops. Avoids grid position metadata and semantic restructuring during visual reflow.

**Tradeoffs:** A toolbar is a command grouping, not a content-reading or object-collection pattern. Tab entering card actions and vertical movement depart from the conventional horizontal-toolbar model. Sequential horizontal order can differ from visual neighbors in waterfall, and there is no standard card-position announcement.

**Decision condition:** Users understand checkbox arrows and the separate Tab path through card actions. Compare content-reading tasks and positional feedback against list/grid/fieldset models before choosing this approach.

### Option 8: Group card controls in a native fieldset

Use a native `fieldset` with a visible `legend` naming the collection and a labelled `group` per card. Retain real checkboxes and Open/Share buttons. Reuse option 7's checkbox arrow navigation and active-card Tab sequence without assigning toolbar or grid roles. Native selection and action events remain independent.

**Benefits:** Uses native form grouping and a visible collection label. Preserves independent controls without claiming that a content collection is a toolbar or a tabular grid.

**Tradeoffs:** A fieldset does not define arrow navigation, collection positions, or roving tab stops. The custom checkbox shortcuts and inactive-card action tab indices still require discoverability and assistive technology testing. Fieldset/legend names may be repeated by some screen readers.

**Decision condition:** The collection fits a set of related selectable controls, users can discover the arrow/Tab model, and card groups and the legend provide useful context without excessive repetition.

## Evaluation and recommended next steps


Start with a fully loaded, uniform card layout to isolate semantics and keyboard behavior. Compare the PR's default RSP-style baseline, the repaired sequential grid, the wrapping-grid variant, the native-list variant, the feed/article variant, the single-row grid, the semantic-order waterfall grid, the toolbar, and the fieldset. All nine prototypes include waterfall as a follow-up comparison; virtualization remains a separate later dimension.

The Storybook examples live in the card-view component folder as `swc-card-view` and `swc-card-view-option-1` through `swc-card-view-option-8`. Each has grid, waterfall, and accessibility stories, with a dedicated docs page describing its interaction and tradeoffs. The baseline adapts [PR #6798](https://github.com/adobe/spectrum-web-components/pull/6798)'s default RSP model rather than its entire multi-model inspector application.

Automated Playwright tests scan each prototype in both layouts with axe-core and compare accessibility-tree snapshots in initial, selected, and disabled states. The snapshots describe the browser accessibility tree, not verified screen reader speech. All prototypes require no axe violations. Real Tab/Shift+Tab tests verify grid child-control entry and exit for Option 6 and grouped-control action entry and exit for options 7–8.

Use the same content, primary actions, selection tasks, and child controls across comparable prototypes. Record DOM attributes, accessibility-tree structure, spoken output, focus movement, and task completion separately.

### Test matrix

| Environment | Focus of evaluation |
| --- | --- |
| NVDA with Chrome and Firefox | Widget focus-mode navigation, selection, positional announcements, and child controls. |
| JAWS with Chrome | Grid/listbox interaction, position, entry/exit, and selection. |
| VoiceOver with Safari | Ordinary arrows and VoiceOver commands separately; reading, scrolling, and loading. |
| Narrator with Edge | Navigation, position, and child controls. |
| VoiceOver on iOS and TalkBack on Android | Touch reading order, selection, actions, and virtualized loading. |
| Keyboard without a screen reader | Discoverability, spatial predictability, reverse navigation, and visible focus at zoom. |

### Test tasks and acceptance criteria

- Reach the seventh card and explain how to reach the next and previous cards.
- Reach every card without overlooking a visual column or encountering a false collection boundary.
- Identify the current item position and collection total when known.
- Select two cards, distinguish focused from selected state, and act on the selected cards.
- Activate a card's primary action and a child action without accidentally triggering the other interaction.
- Enter and leave the collection and its child controls in both directions without a keyboard trap.
- Preserve focus and selection during resizing, zooming, layout changes, and virtualized loading.
- Keep focused content visible when the action bar appears and when navigation scrolls.

Include screen reader users in usability testing, not only internal checks. Record browser/screen reader versions and relevant settings. Test default settings before treating verbosity changes as a remedy.

Evaluate results against [WCAG 1.3.1: Info and relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html), [1.3.2: Meaningful sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html), [1.4.10: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [2.1.1: Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html), [2.4.3: Focus order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html), and [4.1.2: Name, role, value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), as well as focus visibility and obstruction. These criteria guide verification; the reported observations do not establish failures by themselves.

The initial recommendation is to compare a repaired layout grid with a native list before choosing the SWC contract. Keep waterfall and virtualization out of the first decision so their complexity does not obscure the basic interaction question. Design may provide flexible example layouts and guidance rather than one fixed card-view composition; the accessibility contract must still define supported interactions for each use case.

## Sources

- [RSP CardView documentation](https://react-spectrum.adobe.com/CardView) and [Markdown documentation](https://react-spectrum.adobe.com/CardView.md).
- [Original RSP Card accessibility specification](https://github.com/adobe/react-spectrum/blob/main/specs/accessibility/Card.mdx).
- [APG grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) and [layout grid examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/layout-grids/).
- [Sarah Higley: Grids Part 1, To grid or not to grid](https://sarahmhigley.com/writing/grids-part1/).
- [Adrian Roselli: ARIA Grid As an Anti-Pattern](https://adrianroselli.com/2020/07/aria-grid-as-an-anti-pattern.html).
- [MDN ARIA role reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles) and [APG listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/).
- [Team discussion supplied for this strategy](https://adobedesign.slack.com/archives/G01P2PHJMC6/p1791294472435709) (Adobe workspace access required).
- [WebKit issue referenced in the discussion](https://bugs.webkit.org/show_bug.cgi?id=236790) as a possible explanation for VoiceOver announcement differences, not a confirmed diagnosis.
- [ARIA secondary-actions proposal](https://github.com/w3c/aria/issues/1440) as future-facing context, not an implementation requirement.
