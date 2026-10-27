# Card view prototype research

## Scope

Create nine experimental elements grouped by semantics: single-column grids 1A–1F, single-row grids 2B–2E, list 3A, feed 4A, toolbar 5A, and fieldset 6A. Element names use lowercase suffixes, such as `swc-card-view-option-1a` for the baseline. Keep their rendering, registration, stories, tests, and comparison docs together under the card-view component folder. Follow gen2's core/rendering separation for reusable collection behavior.

These are accessibility comparison prototypes, not a completed production CardView migration. The strategy calls for a fully loaded collection before adding virtualization. Each prototype needs a regular grid and a shortest-column waterfall layout, identical card content, checkbox-style selection, and a distinct documented interaction contract.

## Existing card integration

- `swc-card` renders through `renderCardTemplate` and inherits styling and behavior from `CardBase`.
- `CardBase` supports `selectable` surface activation through `swc-card-click` but does not supply the collection's selection model or final ARIA role.
- Its title, description, preview, and actions slots provide the existing visual structure. Collection code must keep card activation separate from child actions and checkbox selection.
- The first-generation grid fixture uses card images, selected state, an action menu, and a selected-items action bar. This is a visual and task reference, not a semantics implementation to copy unchanged.
- There is no existing gen2 card-view folder or registered element before this exploration.

## PR reference

[PR #6798](https://github.com/adobe/spectrum-web-components/pull/6798), inspected at commit `adc6aa8d472105dcddbe67129606c54ad41562b3`, contains a standalone prototype alongside planning documentation. It does not contain a Lit custom element.

The standalone prototype provides five semantics models: RSP-style grid, visual-row APG grid, single-row grid, list, and listbox. It also provides selection, layout, density, size, direction, and tab-model controls. Its simulated screen reader output is not actual assistive technology output and must not be presented as verified accessibility evidence.

Its default RSP model uses one row per card and a gridcell rather than the historical spec's rowheader. In a uniform grid, Left/Right moves sequentially. In waterfall, Left/Right moves spatially. Up/Down uses geometry. This makes the default RSP model a useful baseline against the proposed repairs.

The PR can guide layout metrics, fixtures, geometry, and interaction comparisons. It should be adapted rather than transplanted as a standalone page. The initial baseline proposal is to implement its default RSP semantics model as `swc-card-view-option-1a`; the four separate elements expose the strategy alternatives.

## Option contracts

| Element                   | Semantics                                              | Navigation                                                                             | Child controls                                                           |
| ------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `swc-card-view-option-1a` | PR default RSP grid, one row per card                  | Sequential horizontal movement in grid; spatial movement in waterfall; spatial Up/Down | Active-card checkbox and actions.                                        |
| `swc-card-view-option-1d` | Historical RSP single-column grid with rowheader cards | Sequential Left/Right in both layouts; spatial Up/Down                                 | Active-card checkbox and actions.                                        |
| `swc-card-view-option-1f` | Stable single-column layout grid                       | Sequential Left/Right; spatial Up/Down with column-boundary wrapping                   | Active-card checkbox and actions.                                        |
| `swc-card-view-option-3a` | Native list/list items                                 | Normal Tab navigation; any arrow shortcut remains supplementary                        | Independently tabbable checkbox, primary action, and secondary actions.  |
| `swc-card-view-option-4a` | Feed/articles                                          | Sequential Page Up/Down, normal Tab access                                             | Real checkbox, primary action, and secondary action inside each article. |

The single-row semantic experiment is implemented separately as Option 2B, not as Option 1F's primary wrapping-grid contract. It must not silently replace that contract.

The user replaces the listbox proposal with feed/articles so real checkboxes and child actions remain inside cards. The feed uses sequential Page Up/Down rather than four-direction arrows. Dynamic feed loading is not part of the first fully loaded comparison.

## Verification approach

Use the neighboring Storybook/Vitest story-test pattern to verify registration and then each option's actual roles, selection, primary/child action separation, entry/exit, and keyboard movement. A registration assertion can fail before implementation without relying on a missing-module error.

Exercise both layouts with real, unequal-height card images. For wrapping, check forward and reverse reachability rather than only one boundary. Check that native-list and feed controls stay tabbable and grid child controls are active-card-only.

Verify desktop/mobile rendering, resize behavior, focus preservation, and non-overlapping content in the browser. Automated checks can validate DOM semantics and keyboard behavior but do not verify spoken positional announcements; docs must preserve the screen reader testing caveat.

Use nine story files and associated MDX docs pages so each prototype has its own inspectable component and grid/waterfall canvases. Include accessibility notes, pros, cons, and the exact navigation model for each. Playwright runs axe-core and ARIA snapshots in both layouts across initial, selected, and disabled states. Twenty-seven named snapshots are shared across layouts to check stable semantic structure.

## Confirmed scope decisions

- Option 2E uses Option 1D's single-column grid, rows, rowheaders, native checkboxes, actions, and range selection. Uniform-grid navigation is identical. Waterfall supports only vertical arrow traversal: Down/Up follows enabled semantic collection order regardless of geometry, and Left/Right does not navigate. Home/End remains available. Its documentation uses Option 2B's evaluation goals, with easier-to-follow but slightly more tedious waterfall traversal; Option 2B's observed positional speech is not yet verified for this variant. Every option now requires zero axe violations.
- Option 5A uses a horizontal toolbar with labelled card groups and native checkbox/Open/Share controls. Left/Right moves sequentially between enabled card checkboxes, mirrored in RTL; Up/Down moves spatially above/below. Home/End reaches enabled-card boundaries. Only the active card's controls are tabbable, and Tab visits its actions before leaving. Native activation and action-button arrow behavior are preserved. With selection disabled, Open is the arrow entry point.
- Option 6A uses a native fieldset and visible legend with labelled card groups, without toolbar or grid roles. It shares option 5A's checkbox arrows and active-card Tab access.
- Option 3A adds sequential horizontal and spatial vertical list-item arrows, plus Home/End. Only the active list item is in the tab sequence, while all enabled native child controls retain normal Tab access. Child keys remain native; supplemental arrows do not add Shift-range selection.
- Both command variants share fully loaded grid/waterfall measurement and preserve the other options. They are experiments in command semantics, not recommendations for generic asset collections; real assistive technology and task testing remains necessary.

- Option 2B adds the separate single-row experiment as `swc-card-view-option-2b`: one `row` containing all card `gridcell` elements, with stable column indices in both grid and waterfall layouts. Left/Right is sequential (mirrored in RTL); Home/End reaches collection boundaries. Up/Down moves spatially to the nearest enabled aligned card above/below, despite the single semantic row. It reuses active-card child tab stops, checkbox selection, and selection/action events without changing the other models.
- Option 2B's visual cells remain absolutely positioned relative to the collection, so the semantic row does not need its own visual-layout rules. Its column metadata describes collection order rather than responsive visual columns. Real screen reader testing is still required to assess position announcements and discoverability.

## Named keyboard comparison options

### Requested scope

Add eight named comparisons without replacing the existing numbered options. Each new comparison has one Storybook story containing exactly 50 cards. Every new collection exposes a grid with one semantic row, 50 gridcells, and stable one-based semantic column indices, independent of the visual layout.

| Story              | Proposed element                   | Layout                   | Arrow navigation                                                                              |
| ------------------ | ---------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------- |
| Grid NoWrap        | `swc-card-view-grid-nowrap`        | Uniform grid             | Move to a visual neighbor on the corresponding axis; stop at that row or column's edge.       |
| Grid Loop          | `swc-card-view-grid-loop`          | Uniform grid             | Move visually; at an edge, loop within the current visual row or column.                      |
| Grid Advance       | `swc-card-view-grid-advance`       | Uniform grid             | Move visually; at an edge, advance to the next row or column, or retreat to the previous one. |
| Grid Semantic      | `swc-card-view-grid-semantic`      | Uniform grid             | Right/Down advances in semantic order; Left/Up retreats.                                      |
| Waterfall NoWrap   | `swc-card-view-waterfall-nowrap`   | Unequal-height waterfall | Move to a visual neighbor on the corresponding axis; stop at that row or column's edge.       |
| Waterfall Loop     | `swc-card-view-waterfall-loop`     | Unequal-height waterfall | Move visually; at an edge, loop within the current visual row or column.                      |
| Waterfall Advance  | `swc-card-view-waterfall-advance`  | Unequal-height waterfall | Move visually; at an edge, advance to the next row or column, or retreat to the previous one. |
| Waterfall Semantic | `swc-card-view-waterfall-semantic` | Column-major waterfall   | Place cards top to bottom, then across columns; all arrows follow semantic order.             |

The requested names reuse `swc-card-view-grid-waterfall` for the final two entries. Distinct waterfall names above avoid registering two implementations under one tag.

### Existing behavior and extension points

- Core `CardViewBase` owns keyboard handling, selection, enabled-item traversal, spatial neighbor calculation, same-band wrapping, and full-collection cycling. The SWC renderer owns layout measurement, geometry, semantic markup, and card rendering.
- `spatial()` chooses a directional neighbor that overlaps on the perpendicular axis. `wrappedSpatial()` falls back to the opposite edge of the current aligned band. These provide starting points for NoWrap and Loop, respectively.
- `cycle()` currently wraps every arrow through the full collection. It is not automatically equivalent to the requested Semantic behavior because collection-boundary cycling was not specified.
- `columnStep()` traverses columns in column-major order but does not implement horizontal advancement between visual rows. Advance therefore requires a distinct navigation policy rather than an alias for an existing option.
- The renderer's `singleRow` condition currently controls both ARIA semantics and column-major waterfall placement. The new options need independent layout-order control: all eight share single-row semantics, but only Waterfall Semantic explicitly requires column-major placement.
- Existing numbered variants must retain their current semantics, layout, and keyboard contracts.

### Images and story fixtures

The shared story helper currently expands twelve templates into 100 items and repeats three local images. Assign each generated item its own Picsum image URL using its one-based semantic column number, rather than the repeated template identifier. New stories take 50 items; existing examples keep their existing card counts but switch to Picsum too. Use the supplied Picsum service, interpreting the final reference to Lorem Pixel as the same requested image change.

Image dimensions must be explicit and consistent with each card's preview aspect ratio. Unequal preview heights must remain available for waterfall comparisons. Preserve the existing selection controls, actions, and disabled-item behavior.

### Verification

Extend the existing card-view navigation tests rather than introducing a second test framework. Check all four arrows in both directions, interior movement, each axis boundary, incomplete final rows or columns, disabled cards, RTL horizontal movement, and collection boundaries. Assert one semantic row and 50 indexed gridcells for every new story. Check that the eight stories are indexed, that the numbered stories still render, and that image URLs use the semantic position rather than repeated template indices.

A cheap discriminating check is a deterministic three-column geometry fixture: NoWrap stays on the last card in a visual row, Loop returns to the first card in that same row, and Advance reaches the first card in the following row. The reverse and vertical cases distinguish advancement from looping or sequential horizontal shortcuts.

### Decisions to confirm before implementation

- Use the distinct waterfall element names in the table.
- Confirmed: Advance and Semantic cycle through the whole collection at the outermost boundary, in both directions.
- For waterfall visual navigation, use overlapping visual bands as the existing spatial calculation does; a waterfall does not have uniform geometric rows. Keep column-major placement specific to Waterfall Semantic for the new examples.

The user approved this checkpoint, the distinct waterfall names, full-collection cycling for Advance and Semantic, and shortest-column placement for the other three waterfall examples.

- `swc-card-view-option-1a` adapts the PR's default RSP model, not the entire multi-model comparison application.
- Option 4A uses feed/articles rather than listbox/options, preserving real checkbox and action controls.
- The first comparison stays fully loaded with virtualization deferred.

## Current scope after the semantic recommendation

This section supersedes the earlier numbered-prototype scope above, which records the initial exploration. The user recommends a single-row grid for collection-position feedback such as "x of y." The remaining primary research compares keyboard navigation with those semantics held fixed, not competing semantic options. Actual positional speech still requires screen reader and browser testing.

The original problems remain explicit: useful position and total feedback; navigation understandable both as one semantic sequence and as a sighted user's two-dimensional grid; and visual horizontal navigation among unequal-height waterfall cards that have no aligned horizontal rows.

The retained reference elements are `swc-card-view-single-column-grid`, `swc-card-view-single-row-grid`, `swc-card-view-list`, `swc-card-view-feed`, `swc-card-view-toolbar`, and `swc-card-view-fieldset`. Their classes, registration modules, stories, docs, and accessibility snapshots use descriptive names. All numbered registrations are removed. Retired navigation variants and tests specific to them are removed; the shared rendering base is `CardView`.

Each of the eight `swc-card-view-grid-*` and `swc-card-view-waterfall-*` elements has a separate Storybook group, a per-component MDX Docs page, and one 50-card Playground. The pages expose interactive controls and manifest-backed API metadata. NoWrap, Loop, Advance, and Semantic retain the approved edge policies and waterfall-placement rules. Semantic Right/Down follows the next semantic item and Left/Up the previous, including in RTL; spatial arrows follow physical geometry.

The retained reference stories keep their existing card counts and use the shared Picsum fixture. Image IDs match one-based semantic positions. Automated accessibility tests intercept Picsum requests with the existing local image fixture to avoid network-dependent failures; live stories retain real Picsum URLs. Virtualization remains deferred.

The strategy and Oracle now recommend single-row semantics, link the six named references and eight navigation Docs pages, and distinguish that recommendation from the keyboard-policy decision that still needs user testing.
