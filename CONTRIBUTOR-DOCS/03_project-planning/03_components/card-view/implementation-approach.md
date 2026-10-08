<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Card View / CardView implementation approach

<!-- Document title (editable) -->

# CardView implementation approach

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [TL;DR](#tldr)
- [Reference implementation](#reference-implementation)
    - [Layout metrics from React Spectrum](#layout-metrics-from-react-spectrum)
- [Scope and component boundaries](#scope-and-component-boundaries)
- [Architecture](#architecture)
- [Accessibility semantics decision](#accessibility-semantics-decision)
    - [Problem](#problem)
    - [Constraints](#constraints)
    - [Options](#options)
    - [Direction](#direction)
    - [Validation](#validation)
- [Phase 1: layout, variant, size, and density](#phase-1-layout-variant-size-and-density)
    - [Goal](#goal)
    - [Public API](#public-api)
    - [Behavior](#behavior)
    - [Accessibility](#accessibility)
    - [Deliverables](#deliverables)
- [Phase 2: selectionMode and selectionStyle](#phase-2-selectionmode-and-selectionstyle)
    - [Goal](#goal)
    - [Public API](#public-api)
    - [Behavior](#behavior)
    - [Accessibility](#accessibility)
    - [Dependencies](#dependencies)
- [Phase 3: virtualization and loadingState](#phase-3-virtualization-and-loadingstate)
    - [Goal](#goal)
    - [Public API](#public-api)
    - [Behavior](#behavior)
    - [Accessibility](#accessibility)
    - [Dependencies](#dependencies)
- [Deferred and out of scope](#deferred-and-out-of-scope)
- [Open questions and risks](#open-questions-and-risks)
- [Ticket breakdown](#ticket-breakdown)
    - [Phase 1](#phase-1)
    - [Phase 2](#phase-2)
    - [Phase 3](#phase-3)
- [References](#references)

</details>

<!-- Document content (editable) -->

## TL;DR

- `swc-card-view` is a new gen2 component. It displays a group of related cards, with support for selection and loading states.
- [React Spectrum S2 CardView](https://react-spectrum.adobe.com/CardView) is the source of truth for API, behavior, and layout metrics. Deviations are allowed only where web component conventions require them, and each deviation is documented.
- Work ships in three phases. Each phase is releasable on its own:
    1. **Phase 1:** `layout`, `variant`, `size`, and `density`, on a non-virtualized collection.
    2. **Phase 2:** `selectionMode` and `selectionStyle`.
    3. **Phase 3:** virtualization and `loadingState`, including skeleton cards and load-more.
- Phase 3 adds `@lit-labs/virtualizer` internally without changing the consumer-facing collection API.
- CardView does not copy the React Spectrum one-card-per-row `grid` semantics. Phase 1 chooses the collection semantics and keyboard model through prototypes and assistive technology testing. See [accessibility semantics decision](#accessibility-semantics-decision).
- `swc-card-view` composes the existing gen2 `swc-card` family. It does not re-implement card visuals.

## Reference implementation

React Spectrum S2 `CardView` ([docs](https://react-spectrum.adobe.com/CardView), [source](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/CardView.tsx)) is built from these parts:

- A React Aria `GridList` with `layout="grid"`. This gives the collection 2D arrow-key navigation and `grid` semantics, with each card exposed as its own row. Gen2 does not adopt these semantics as they are. See [accessibility semantics decision](#accessibility-semantics-decision).
- A `Virtualizer` that uses `GridLayout` (uniform rows) or `WaterfallLayout` (masonry columns), depending on `layout`.
- Gen2 defers virtualized rendering to Phase 3. Phase 1 and Phase 2 render the full collection while establishing the API and behavior that virtualization will preserve.
- A context that passes `size` and `variant` to every card. Density is not passed to cards. In CardView, density controls only the space between cards.
- A responsive size clamp. The rendered size is the smaller of the requested `size` and the largest size that still fits two columns in the available width.
- Selection through `selectionMode` and `selectionStyle`. `selectionStyle="checkbox"` maps to toggle selection behavior. `selectionStyle="highlight"` maps to replace selection behavior.
- Loading through `loadingState`, `onLoadMore`, and a `SkeletonCollection` that renders placeholder cards.

### Layout metrics from React Spectrum

Values are in pixels. "Gap" is the minimum space between cards, applied on both axes. Item size is the minimum and maximum card width.

| Size | Compact gap | Regular gap | Spacious gap | Min item size | Max item size |
| ---- | ----------- | ----------- | ------------ | ------------- | ------------- |
| XS   | 6           | 8           | 12           | 100           | 140           |
| S    | 8           | 12          | 16           | 150           | 210           |
| M    | 12          | 16          | 20           | 200           | 280           |
| L    | 16          | 20          | 24           | 270           | 370           |
| XL   | 20          | 24          | 28           | 340           | 460           |

Where Spectrum tokens exist for these values, the gen2 implementation uses the tokens instead of raw numbers.

## Scope and component boundaries

- **In scope:** the `swc-card-view` container, its layouts, how it passes properties to child cards, keyboard navigation, selection, virtualization in Phase 3, and loading states.
- **Owned by `swc-card` (existing):** card visuals, slots, the `variant`, `size`, and `density` styling of a single card, `title-as-link`, and `selectable`.
- **Owned by other components (dependencies):** the gen2 checkbox for Phase 2, and skeleton support for Phase 3.
- **Relationship to the planned `swc-grid`:** the [grid accessibility analysis](../grid/accessibility-migration-analysis.md) proposes that CardView compose a shared `swc-grid` with a fixed `grid` role. The [accessibility semantics decision](#accessibility-semantics-decision) may replace that assumption. If CardView does not use `grid` semantics, update the CardView assumptions in the grid analysis, and do not compose `swc-grid` for CardView. Phase 3 adds virtualization directly through `@lit-labs/virtualizer`.

## Architecture

- **Core and SWC split:** follow the existing gen2 pattern. A core base class holds properties, types, validation, and behavior. The SWC package holds rendering, styles, stories, tests, and docs. `swc-card` uses the same pattern.
- **Data-driven API:** the consumer passes an `items` array and a render function that returns a card for each item. This is the web component equivalent of the React Spectrum dynamic collection and provides stable item identity for selection and Phase 3 virtualization. Support for static, slotted cards is an open question (see [open questions](#open-questions-and-risks)).
- **Item identity:** every item has a stable key. Phase 2 uses the key for selection, and Phase 3 uses it for virtualizer reuse and focus restoration.
- **Property propagation:** CardView passes the resolved `size` and `variant` to every rendered card. The resolved `size` is the value after the responsive clamp. CardView does not pass `density` to cards, which matches React Spectrum.
- **Scroll container:** CardView is its own scroll container. The consumer gives CardView a height, and CardView scrolls its content vertically.

## Accessibility semantics decision

React Spectrum is not the source of truth for CardView collection semantics. This section documents the deviation and the decision process.

### Problem

- **Position mismatch:** React Spectrum exposes `grid` semantics with one card per row, so screen readers report every card as being in a single column. In the grid layout, <kbd>Right Arrow</kbd> moves to the next card in the same visual row, and <kbd>Down Arrow</kbd> moves to the card below it. A sighted keyboard user can follow this. A screen reader user hears only a row index, so <kbd>Right Arrow</kbd> and <kbd>Down Arrow</kbd> both seem to move to a later row, by different and unexplained amounts.
- **Rows without meaning:** the number of columns changes with viewport width and zoom. Visual rows and columns are a layout effect, not a data relationship, so the collection is not semantically a grid. Arrow-key mappings that follow the visual layout also change when content reflows ([WCAG 1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)).
- **Waterfall has no rows:** the masonry layout has columns of different heights and no consistent rows.
- **Nested actions:** CardView cannot prevent cards from containing their own actions, and products are likely to add them, sometimes revealed only on hover. With a single tab stop, keyboard-only users cannot reach those actions without a secondary keyboard command, and screen reader users may never discover them.

### Constraints

- Support single and multiple selection, with a selected state that assistive technology can read.
- Allow interactive content inside cards without suppressing its semantics.
- Work for both layouts at any width and zoom level.
- Report each card's position and the total count, including when virtualized in Phase 3.
- Keep keyboard behavior predictable for sighted keyboard users and screen reader users.

### Options

| Option                         | Semantics                                                                                                                  | Arrow keys                  | Benefits                                                                                                                 | Costs                                                                                                                                           |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| A. React Spectrum grid         | `grid`, one row and one cell per card                                                                                      | Follow the visual 2D layout | Matches React Spectrum.                                                                                                  | Screen readers report one column, while arrow keys move in two dimensions. Rejected.                                                            |
| B. Grid rebuilt per visual row | `grid` rows recalculated on resize                                                                                         | Follow the visual 2D layout | Accurate row and column positions.                                                                                       | Heavy layout script, row rebuilds that can disrupt focus, rows with no meaning, and no support for waterfall. Rejected.                         |
| C. Single-row grid             | `grid`, one row, each card a `gridcell` with a column index                                                                | Move in DOM order           | Column index announces position. `gridcell` supports `aria-selected`. Grid cells keep the semantics of nested controls. | The `grid` role still suggests 2D navigation. Up and down movement has no semantic meaning.                                                     |
| D. Linear collection           | `list` and `listitem` with `aria-posinset` and `aria-setsize`, or `listbox` and `option` when cards have no nested actions | Move in DOM order           | Position and count are announced. Keyboard order matches DOM order and works for waterfall and any width.                | Sighted users may expect <kbd>Down Arrow</kbd> to move visually down. `listitem` does not support `aria-selected`, and `option` flattens nested actions. |

### Direction

- Do not adopt option A or pursue option B.
- Prototype option D as the leading candidate. Prototype option C as the fallback for cases that need `grid` semantics to combine selection with nested actions.
- Use one keyboard model for both prototypes:
    - <kbd>Right Arrow</kbd> and <kbd>Down Arrow</kbd> move to the next card in DOM order. <kbd>Left Arrow</kbd> and <kbd>Up Arrow</kbd> move to the previous card. Mirror the horizontal arrows in right-to-left layouts.
    - <kbd>Home</kbd> and <kbd>End</kbd> move to the first and last card. <kbd>Page Up</kbd> and <kbd>Page Down</kbd> move by a fixed number of cards, such as five.
    - Each move announces the card's name, position, and the total count.
- Follow the Express tab model as the starting point. Arrow keys move between cards, and the card set has one roving tab stop. <kbd>Tab</kbd> moves from the focused card into that card's actions, then out of the collection. Actions that appear on hover also appear when the card or its actions have focus ([WCAG 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)).
- Expose selection through a mechanism that each candidate supports:
    - Checkbox style: the card's checkbox exposes its checked state natively.
    - Highlight style: choose an equivalent state during prototyping, such as a toggle button with `aria-pressed` for option D, or `aria-selected` on the cell for option C.
- Keep DOM order aligned with the visual reading order in both layouts, so that focus order is meaningful ([WCAG 1.3.2](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html), [WCAG 2.4.3](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html)). For waterfall, confirm the masonry placement keeps the two orders aligned.

### Validation

- Build prototypes of options C and D that cover:
    - The grid and waterfall layouts.
    - Each selection mode.
    - Cards with nested and hover-revealed actions.
    - One to many columns, by resizing and at 200% and 400% zoom.
- Test with VoiceOver and Safari, NVDA with Firefox and Chrome, JAWS with Chrome, and keyboard-only use.
- Record the decision in this doc. Update the CardView assumptions in the [grid accessibility analysis](../grid/accessibility-migration-analysis.md) to match.
- The Phase 1 accessibility ticket owns this decision. Phase 2 and Phase 3 accessibility work follows the chosen semantics.

## Phase 1: layout, variant, size, and density

### Goal

Render a keyboard-accessible, non-virtualized collection of cards. The collection supports two layouts, four variants, five sizes, and three densities, and matches React Spectrum visually and behaviorally. The collection API and layout behavior must support adding virtualization in Phase 3 without a consumer-facing change.

### Public API

| Property  | Values                                      | Default   | Behavior                                                         |
| --------- | ------------------------------------------- | --------- | ---------------------------------------------------------------- |
| `layout`  | `grid`, `waterfall`                         | `grid`    | `grid` uses uniform rows. `waterfall` uses masonry columns.      |
| `size`    | `xs`, `s`, `m`, `l`, `xl`                   | `m`       | Sets card size and layout metrics. The responsive clamp applies. |
| `variant` | `primary`, `secondary`, `tertiary`, `quiet` | `primary` | Passed to every card.                                            |
| `density` | `compact`, `regular`, `spacious`            | `regular` | Sets the space between cards only.                               |

Size values are lowercase to match the existing gen2 `swc-card` size values. The component also exposes `items`, the item render function, and an accessible name through `accessible-label` or `aria-labelledby`, following the gen2 labeling convention.

### Behavior

- **Grid layout:** render all items in a regular grid. Configure the layout with the gap and the minimum and maximum item sizes from the metrics table. Columns fill the available width.
- **Waterfall layout:** render all items in a masonry layout. Define a non-virtualized layout strategy for this phase. Masonry needs each item's aspect ratio before layout; define how CardView gets the aspect ratio (for example, from item data or from the preview image dimensions), and document the consumer requirement.
- **Responsive size clamp:** observe the width of the scroll container. Compute the largest size where at least two columns fit, using the same formula as React Spectrum: two minimum item widths plus three gaps. Render at the smaller of this size and the requested `size`.
- **Variant:** pass `variant` to every card. The quiet variant changes how selection looks in Phase 2, so keep the variant visible to selection logic.
- **Density:** change only the gap between cards and the scroll padding. Do not change the card's own `density`.

### Accessibility

- Implement the collection semantics and keyboard model chosen in the [accessibility semantics decision](#accessibility-semantics-decision). Do not ship the React Spectrum one-card-per-row `grid` semantics.
- An accessible name is required. Warn in development when the name is missing.
- Arrow keys move between cards in DOM order. <kbd>Home</kbd>, <kbd>End</kbd>, <kbd>Page Up</kbd>, and <kbd>Page Down</kbd> follow the chosen keyboard model.
- Each card announces its position and the total count.
- Actions inside a card stay keyboard reachable. Hover-revealed actions also appear on focus.
- All cards remain in the DOM in this phase. Position semantics for virtualized content are added in Phase 3.

### Deliverables

- Core base class, types, and SWC element with exports.
- Styles that use Spectrum 2 tokens and pass stylelint.
- Storybook stories for each layout, size, variant, and density, including responsive and larger collection examples.
- Unit tests, accessibility tests, and VRT stories.
- A per-component MDX docs page.

## Phase 2: selectionMode and selectionStyle

### Goal

Let users select one or many cards, with a checkbox or a highlight selection style, matching React Spectrum interaction rules.

### Public API

| Property         | Values                       | Default    | Behavior                                                       |
| ---------------- | ---------------------------- | ---------- | -------------------------------------------------------------- |
| `selectionMode`  | `none`, `single`, `multiple` | `none`     | Enables selection and sets how many cards can be selected.     |
| `selectionStyle` | `checkbox`, `highlight`      | `checkbox` | Sets how selection looks and which selection behavior applies. |

Supporting API, aligned with React Spectrum:

- The selected keys, as a property that the consumer can read and set.
- The disabled keys. Disabled cards cannot be selected, focused, or otherwise interacted with.
- A flag that prevents an empty selection.
- A selection change event that carries the new set of selected keys. This replaces the React Spectrum `onSelectionChange` callback.
- An Escape key behavior option, where Escape clears the selection by default.

### Behavior

- **Checkbox style (toggle behavior):** each card shows a checkbox. Clicking a card or pressing <kbd>Space</kbd> toggles that card and leaves the other selected cards unchanged. For the quiet variant, the checkbox renders inside the card preview, not on the card surface. Whether the card or its checkbox is the focus target follows the [accessibility semantics decision](#accessibility-semantics-decision).
- **Highlight style (replace behavior):** no checkbox renders. Clicking a card replaces the selection with that card. Ctrl or Cmd plus click adds or removes a card. Shift plus click selects a range. Selected cards show a highlight selection indicator.
- **Selected state visuals:** selected cards use the elevated or selected treatment from React Spectrum for each variant.
- **Selection identity:** selection state belongs to CardView and is keyed by item key, so Phase 3 can preserve selection when cards scroll out of the rendered range.
- **Integration with `swc-card`:** CardView uses the card's existing `selectable` behavior and `swc-card-click` event as the input signal. This phase resolves the deferred card role question (Q4 in the [Card family plan](../card/migration-plan.md)).

### Accessibility

- Expose each card's selected state through the mechanism chosen in the [accessibility semantics decision](#accessibility-semantics-decision). Set `aria-multiselectable` only when the chosen container role supports it.
- Set `aria-disabled` on disabled cards.
- <kbd>Space</kbd> toggles selection. <kbd>Ctrl</kbd> + <kbd>A</kbd> or <kbd>Cmd</kbd> + <kbd>A</kbd> selects all in multiple mode. <kbd>Escape</kbd> clears the selection unless the consumer turns this off.
- Selected state does not depend on color alone. This matters most for the highlight style.

### Dependencies

- A gen2 checkbox component is required for the checkbox style.

## Phase 3: virtualization and loadingState

### Goal

Render large collections efficiently through virtualization, then communicate loading and support incremental loading (infinite scroll) with skeleton placeholder cards. Preserve the consumer-facing API and interaction behavior established in Phases 1 and 2.

### Public API

| Property       | Values                                                            | Default | Behavior                                  |
| -------------- | ----------------------------------------------------------------- | ------- | ----------------------------------------- |
| `loadingState` | `idle`, `loading`, `loadingMore`, `sorting`, `filtering`, `error` | `idle`  | Describes the current data loading state. |

Supporting API:

- A load-more event that fires when the user scrolls near the end of the collection. This replaces the React Spectrum `onLoadMore` callback.
- A way to render skeleton cards while loading. This is the equivalent of the React Spectrum `SkeletonCollection`.

### Behavior

- **Virtualized rendering:** use `@lit-labs/virtualizer` to render only visible items and a nearby buffer. Support both the grid and waterfall layouts, retaining their Phase 1 metrics and responsive size clamp.
- **Focus and item positions:** restore focus when a focused card leaves and re-enters the rendered range. Expose the total item count and each item's position so that assistive technology reports positions correctly when most items are not in the DOM. Use `aria-setsize` and `aria-posinset` for a linear collection, or `aria-colcount` and `aria-colindex` for a single-row grid.
- **Selection continuity:** retain selected keys when selected cards leave the rendered range and restore their selected visuals when they render again.
- **`loading`:** the initial load. Show skeleton cards across the viewport and disable scrolling on the collection.
- **`loadingMore`:** append skeleton cards after the loaded cards, and keep the loaded cards interactive.
- **Load-more trigger:** use a sentinel after the last item in the virtualized collection. When it comes near the viewport and CardView is not already loading, fire the load-more event.
- **Skeleton cards:** skeleton cards are inert. They cannot receive focus, cannot be selected, and are hidden from assistive technology as items.
- **Other states:** define the visual and behavioral treatment for `sorting`, `filtering`, and `error` to match React Spectrum. Document any state that has no visual change.

### Accessibility

- Set `aria-busy` on the collection while loading.
- Announce loading and load completion through a polite live region. Do not announce each skeleton card.
- Keep focus stable when new items append during `loadingMore` and when the focused item is recycled by virtualization.

### Dependencies

- `@lit-labs/virtualizer` grid and masonry layouts are required for this phase.
- Skeleton support for `swc-card` (a skeleton state or skeleton wrapper) is required.

## Deferred and out of scope

These React Spectrum features are not part of the three phases. Each one needs its own follow-up ticket:

- `renderActionBar` and bulk actions. This depends on a gen2 action bar.
- `renderEmptyState`, the empty-state rendering.
- `onAction` and card links (`href`) inside CardView.
- Drag and drop (`dragAndDropHooks`).
- Type-ahead navigation.
- `orientation` other than vertical.

## Open questions and risks

- **Collection semantics:** choose between a linear collection and a single-row grid. See [accessibility semantics decision](#accessibility-semantics-decision).
- **Page step:** decide the number of cards that <kbd>Page Up</kbd> and <kbd>Page Down</kbd> move.
- **Highlight style state:** decide how the highlight style exposes selected state when the container role does not support `aria-selected`.
- **Static children:** should CardView also accept slotted cards for small, non-virtualized collections? If yes, define how the two APIs coexist.
- **Waterfall aspect ratio:** the masonry layout needs the aspect ratio before render. Decide whether consumers supply it through item data, or whether CardView measures it.
- **Non-virtualized waterfall:** confirm the Phase 1 masonry strategy supports the required item sizing and responsive metrics before selecting an implementation.
- **Virtualizer maturity:** in Phase 3, confirm that the `@lit-labs/virtualizer` grid and masonry layouts support the gap, minimum size, and maximum size behavior that React Spectrum uses.
- **Focus with virtualization:** in Phase 3, confirm that focus restoration and position semantics work with screen readers when most items are not in the DOM.
- **Future `swc-grid`:** if a shared `swc-grid` ships later, plan a refactor that keeps the CardView API unchanged.
- **Dependencies:** the Phase 2 checkbox and the Phase 3 virtualizer and skeleton support must be available, or the affected tickets are blocked.

## Ticket breakdown

All tickets are children of the `CardView Component` epic. Each phase is split into four tickets.

### Phase 1

1. Scaffold `swc-card-view` with a non-virtualized grid layout.
2. Add the waterfall layout.
3. Add size, variant, and density, with the responsive size clamp.
4. Decide the collection semantics through prototypes, add keyboard navigation and accessibility, and complete Phase 1 docs.

### Phase 2

1. Add the `selectionMode` and selection state API.
2. Add the checkbox selection style.
3. Add the highlight selection style.
4. Add selection keyboard interactions and accessibility, and complete Phase 2 docs.

### Phase 3

1. Add the `loadingState` API and state handling.
2. Add skeleton cards for the loading states.
3. Add virtualized rendering and the load-more event for infinite scrolling.
4. Add loading accessibility announcements, and complete Phase 3 docs.

## References

- [React Spectrum CardView docs](https://react-spectrum.adobe.com/CardView)
- [React Spectrum S2 CardView source](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/CardView.tsx)
- [React Spectrum S2 Card source](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/Card.tsx)
- [Card family plan](../card/migration-plan.md)
- [Grid accessibility analysis](../grid/accessibility-migration-analysis.md)
- [Grid rendering and styling analysis](../grid/rendering-and-styling-migration-analysis.md)
- [APG grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- [Sarah Higley: Grids part 1, to grid or not to grid](https://sarahmhigley.com/writing/grids-part1/)
- [Sarah Higley: Grids part 2, semantics](https://sarahmhigley.com/writing/grids-part2/)
- [Adrian Roselli: ARIA grid as an anti-pattern](https://adrianroselli.com/2020/07/aria-grid-as-an-anti-pattern.html)
- [`@lit-labs/virtualizer`](https://github.com/lit/lit/tree/main/packages/labs/virtualizer)
