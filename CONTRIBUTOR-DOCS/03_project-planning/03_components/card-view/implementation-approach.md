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
- [Phase 3: loadingState](#phase-3-loadingstate)
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
    1. **Phase 1:** `layout`, `variant`, `size`, and `density`, on a virtualized grid.
    2. **Phase 2:** `selectionMode` and `selectionStyle`.
    3. **Phase 3:** `loadingState`, including skeleton cards and load-more.
- Virtualization is part of Phase 1. CardView uses `@lit-labs/virtualizer` internally.
- `swc-card-view` composes the existing gen2 `swc-card` family. It does not re-implement card visuals.

## Reference implementation

React Spectrum S2 `CardView` ([docs](https://react-spectrum.adobe.com/CardView), [source](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/CardView.tsx)) is built from these parts:

- A React Aria `GridList` with `layout="grid"`. This gives the collection 2D arrow-key navigation and `grid` semantics.
- A `Virtualizer` that uses `GridLayout` (uniform rows) or `WaterfallLayout` (masonry columns), depending on `layout`.
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

- **In scope:** the `swc-card-view` container, its layouts, how it passes properties to child cards, virtualization, keyboard navigation, selection, and loading states.
- **Owned by `swc-card` (existing):** card visuals, slots, the `variant`, `size`, and `density` styling of a single card, `title-as-link`, and `selectable`.
- **Owned by other components (dependencies):** the gen2 checkbox for Phase 2, and skeleton support for Phase 3.
- **Relationship to the planned `swc-grid`:** the [grid accessibility analysis](../grid/accessibility-migration-analysis.md) proposes that CardView compose a shared `swc-grid`. For this effort, CardView owns its virtualization directly through `@lit-labs/virtualizer`. The keyboard and ARIA contract follows the grid analysis, so a later move to a shared `swc-grid` does not change consumer-facing behavior.

## Architecture

- **Core and SWC split:** follow the existing gen2 pattern. A core base class holds properties, types, validation, and behavior. The SWC package holds rendering, styles, stories, tests, and docs. `swc-card` uses the same pattern.
- **Data-driven API:** virtualization requires CardView to control which cards are in the DOM. Because of this, the primary API is data-driven. The consumer passes an `items` array and a render function that returns a card for each item. This is the web component equivalent of the React Spectrum dynamic collection. Support for static, slotted cards is an open question (see [open questions](#open-questions-and-risks)).
- **Item identity:** every item has a stable key. Phase 1 uses the key for virtualizer reuse and focus restoration. Phase 2 uses the same key for selection.
- **Property propagation:** CardView passes the resolved `size` and `variant` to every rendered card. The resolved `size` is the value after the responsive clamp. CardView does not pass `density` to cards, which matches React Spectrum.
- **Scroll container:** CardView is its own scroll container. The consumer gives CardView a height, and CardView scrolls its content vertically.

## Phase 1: layout, variant, size, and density

### Goal

Render a virtualized, keyboard-accessible collection of cards. The collection supports two layouts, four variants, five sizes, and three densities, and matches React Spectrum visually and behaviorally.

### Public API

| Property  | Values                                      | Default   | Behavior                                                         |
| --------- | ------------------------------------------- | --------- | ---------------------------------------------------------------- |
| `layout`  | `grid`, `waterfall`                         | `grid`    | `grid` uses uniform rows. `waterfall` uses masonry columns.      |
| `size`    | `xs`, `s`, `m`, `l`, `xl`                   | `m`       | Sets card size and layout metrics. The responsive clamp applies. |
| `variant` | `primary`, `secondary`, `tertiary`, `quiet` | `primary` | Passed to every card.                                            |
| `density` | `compact`, `regular`, `spacious`            | `regular` | Sets the space between cards only.                               |

Size values are lowercase to match the existing gen2 `swc-card` size values. The component also exposes `items`, the item render function, and an accessible name through `accessible-label` or `aria-labelledby`, following the gen2 labeling convention.

### Behavior

- **Grid layout:** map `layout="grid"` to the `@lit-labs/virtualizer` grid layout. Configure the layout with the gap and the minimum and maximum item sizes from the metrics table. Columns fill the available width.
- **Waterfall layout:** map `layout="waterfall"` to the `@lit-labs/virtualizer` masonry layout. Masonry needs each item's aspect ratio before render. Define how CardView gets the aspect ratio (for example, from item data or from the preview image dimensions), and document the consumer requirement.
- **Responsive size clamp:** observe the width of the scroll container. Compute the largest size where at least two columns fit, using the same formula as React Spectrum: two minimum item widths plus three gaps. Render at the smaller of this size and the requested `size`.
- **Variant:** pass `variant` to every card. The quiet variant changes how selection looks in Phase 2, so keep the variant visible to selection logic.
- **Density:** change only the gap between cards and the scroll padding. Do not change the card's own `density`.

### Accessibility

- The host exposes `grid` semantics, following the [grid accessibility analysis](../grid/accessibility-migration-analysis.md). Each card is a row with one grid cell.
- An accessible name is required. Warn in development when the name is missing.
- The collection is one tab stop. Arrow keys move focus between cards in two dimensions. Home, End, Page Up, and Page Down follow the grid contract.
- Focus survives virtualization. When the focused card scrolls out of the rendered range, CardView keeps the focus target and restores focus when the card renders again.
- Expose the total item count and each item's position (`aria-rowcount`, `aria-rowindex`, or the equivalent) so that assistive technology reports position correctly while most items are not in the DOM.

### Deliverables

- Core base class, types, and SWC element with exports.
- Styles that use Spectrum 2 tokens and pass stylelint.
- Storybook stories for each layout, size, variant, and density, plus a large dataset story.
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

- **Checkbox style (toggle behavior):** each card shows a checkbox. Clicking a card or pressing Space toggles that card and leaves the other selected cards unchanged. For the quiet variant, the checkbox renders inside the card preview, not on the card surface. The checkbox is not in the tab order. The card is the focus target.
- **Highlight style (replace behavior):** no checkbox renders. Clicking a card replaces the selection with that card. Ctrl or Cmd plus click adds or removes a card. Shift plus click selects a range. Selected cards show a highlight selection indicator.
- **Selected state visuals:** selected cards use the elevated or selected treatment from React Spectrum for each variant.
- **Virtualization:** selection state belongs to CardView and is keyed by item key, so selection persists when cards scroll out of the rendered range.
- **Integration with `swc-card`:** CardView uses the card's existing `selectable` behavior and `swc-card-click` event as the input signal. This phase resolves the deferred card role question (Q4 in the [Card family plan](../card/migration-plan.md)).

### Accessibility

- Set `aria-multiselectable` on the grid when `selectionMode="multiple"`.
- Set `aria-selected` on each selectable row or cell. Set `aria-disabled` on disabled cards.
- Space toggles selection. Ctrl or Cmd plus A selects all in multiple mode. Escape clears the selection unless the consumer turns this off.
- Selected state does not depend on color alone. This matters most for the highlight style.

### Dependencies

- A gen2 checkbox component is required for the checkbox style.

## Phase 3: loadingState

### Goal

Communicate loading and support incremental loading (infinite scroll) with skeleton placeholder cards.

### Public API

| Property       | Values                                                            | Default | Behavior                                  |
| -------------- | ----------------------------------------------------------------- | ------- | ----------------------------------------- |
| `loadingState` | `idle`, `loading`, `loadingMore`, `sorting`, `filtering`, `error` | `idle`  | Describes the current data loading state. |

Supporting API:

- A load-more event that fires when the user scrolls near the end of the collection. This replaces the React Spectrum `onLoadMore` callback.
- A way to render skeleton cards while loading. This is the equivalent of the React Spectrum `SkeletonCollection`.

### Behavior

- **`loading`:** the initial load. Show a full view of skeleton cards and disable scrolling on the collection.
- **`loadingMore`:** append skeleton cards after the loaded cards, and keep the loaded cards interactive.
- **Load-more trigger:** place a sentinel after the last item. When the sentinel comes near the viewport and CardView is not already loading, fire the load-more event.
- **Skeleton cards:** skeleton cards are inert. They cannot receive focus, cannot be selected, and are hidden from assistive technology as items.
- **Other states:** define the visual and behavioral treatment for `sorting`, `filtering`, and `error` to match React Spectrum. Document any state that has no visual change.

### Accessibility

- Set `aria-busy` on the grid while loading.
- Announce loading and load completion through a polite live region. Do not announce each skeleton card.
- Keep focus stable when new items append during `loadingMore`.

### Dependencies

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

- **Static children:** should CardView also accept slotted cards for small, non-virtualized collections? If yes, define how the two APIs coexist.
- **Waterfall aspect ratio:** the masonry layout needs the aspect ratio before render. Decide whether consumers supply it through item data, or whether CardView measures it.
- **Virtualizer maturity:** confirm that the `@lit-labs/virtualizer` grid and masonry layouts support the gap, minimum size, and maximum size behavior that React Spectrum uses. Spike this at the start of Phase 1.
- **Focus with virtualization:** confirm that focus restoration and position semantics work with screen readers when most items are not in the DOM.
- **Future `swc-grid`:** if a shared `swc-grid` ships later, plan a refactor that keeps the CardView API unchanged.
- **Dependencies:** the Phase 2 checkbox and the Phase 3 skeleton must be available, or the affected tickets are blocked.

## Ticket breakdown

All tickets are children of the `CardView Component` epic ([SWC-2606](https://jira.corp.adobe.com/browse/SWC-2606)). Each phase is split into four tickets.

### Phase 1

1. [SWC-2607](https://jira.corp.adobe.com/browse/SWC-2607): Scaffold `swc-card-view` with a virtualized grid layout.
2. [SWC-2608](https://jira.corp.adobe.com/browse/SWC-2608): Add the waterfall layout.
3. [SWC-2609](https://jira.corp.adobe.com/browse/SWC-2609): Add size, variant, and density, with the responsive size clamp.
4. [SWC-2610](https://jira.corp.adobe.com/browse/SWC-2610): Add grid keyboard navigation and accessibility, and complete Phase 1 docs.

### Phase 2

1. [SWC-2611](https://jira.corp.adobe.com/browse/SWC-2611): Add the `selectionMode` and selection state API.
2. [SWC-2612](https://jira.corp.adobe.com/browse/SWC-2612): Add the checkbox selection style.
3. [SWC-2613](https://jira.corp.adobe.com/browse/SWC-2613): Add the highlight selection style.
4. [SWC-2614](https://jira.corp.adobe.com/browse/SWC-2614): Add selection keyboard interactions and accessibility, and complete Phase 2 docs.

### Phase 3

1. [SWC-2615](https://jira.corp.adobe.com/browse/SWC-2615): Add the `loadingState` API and state handling.
2. [SWC-2616](https://jira.corp.adobe.com/browse/SWC-2616): Add skeleton cards for the loading states.
3. [SWC-2617](https://jira.corp.adobe.com/browse/SWC-2617): Add the load-more event for infinite scrolling.
4. [SWC-2618](https://jira.corp.adobe.com/browse/SWC-2618): Add loading accessibility announcements, and complete Phase 3 docs.

## References

- [React Spectrum CardView docs](https://react-spectrum.adobe.com/CardView)
- [React Spectrum S2 CardView source](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/CardView.tsx)
- [React Spectrum S2 Card source](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/Card.tsx)
- [Card family plan](../card/migration-plan.md)
- [Grid accessibility analysis](../grid/accessibility-migration-analysis.md)
- [Grid rendering and styling analysis](../grid/rendering-and-styling-migration-analysis.md)
- [APG grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- [`@lit-labs/virtualizer`](https://github.com/lit/lit/tree/main/packages/labs/virtualizer)
