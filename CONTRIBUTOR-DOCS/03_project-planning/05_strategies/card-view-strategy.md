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

We recommend a single-row grid for collection-position feedback such as "x of y." One semantic row contains every card as a gridcell, with a stable one-based column index and a column count equal to the collection size. This describes a one-dimensional collection even when its visual layout has many rows or waterfall columns.

Semantics are no longer the variable in the primary experiment. Keep the recommended single-row structure fixed. Compare four keyboard-navigation policies in the uniform grid and five in the waterfall. The waterfall adds Top to bottom: navigation down each visual column before moving right. The single-column grid, list, feed, toolbar, and fieldset remain named reference examples, not numbered semantic options awaiting a decision.

The keyboard policy is not selected yet. Reported positional feedback supports the single-row recommendation, but ARIA attributes do not guarantee spoken output across screen readers and browsers. Automated checks and product precedents do not establish usability; test the recommendation and the navigation policies with users.

## Why the current model needs review

React Spectrum (RSP) `CardView` exposes a single-column ARIA grid while keyboard navigation follows visual layout. The original issues are:

- **Collection-position feedback:** Users need to understand the current item and total, such as "7 of 50." Reported single-column output includes "1 of 1" instead. The single-row recommendation addresses this positional-feedback problem; verify actual speech rather than inferring it from metadata.
- **One semantic dimension, two visual dimensions:** Users relying on the accessibility tree encounter one ordered sequence of cards. Sighted keyboard users see a two-dimensional grid and may expect directional arrows to follow that geometry. Navigation must be understandable from both perspectives and provide a discoverable route to every card.
- **Horizontal waterfall movement:** Unequal-height waterfall cards do not share aligned horizontal rows. Several cards may overlap the active card vertically, so neither the intended left/right neighbor nor the meaning of a row boundary is self-evident. Test spatial-neighbor selection, edge behavior, and semantic-order alternatives separately.

Virtualization introduces additional loading, reading-order, scrolling, and focus risks, but it is a later implementation stage, not a substitute for resolving these three original issues.

The discussion also reports that a selected-items action bar may obscure the focused card. Test this separately against [WCAG 2.4.11: Focus not obscured (minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html).

These are reported observations, not independently reproduced findings. Record DOM attributes, accessibility-tree structure, and spoken output separately before assigning a cause.

## What the guidance supports

### RSP specification and implementation

The [original RSP Card accessibility specification](https://github.com/adobe/react-spectrum/blob/main/specs/accessibility/Card.mdx) recommends:

- A single-column `grid`, with one `row` and focusable `rowheader` per card.
- Collection-order navigation with <kbd>ArrowLeft</kbd> and <kbd>ArrowRight</kbd> in every layout.
- Spatial navigation with <kbd>ArrowUp</kbd> and <kbd>ArrowDown</kbd>.
- Selection states, labelled controls, and <kbd>Tab</kbd> access to the active card's interactive children.

This historical contract remains research context, not a currently selectable numbered variant. The retained `swc-card-view-single-column-grid` reference uses a gridcell per card and spatial arrows without wrapping. The recommended `swc-card-view-single-row-grid` instead places all gridcells in one semantic row.

[Current RSP CardView](https://react-spectrum.adobe.com/CardView) and Piyush's [PR #6798](https://github.com/adobe/spectrum-web-components/pull/6798) informed the earlier prototypes. Current RSP also uses virtualization and spatial waterfall range selection. The SWC examples are fully loaded and retain collection-order range selection; they do not establish production RSP parity.

### APG and expert guidance

The WAI-ARIA Authoring Practices Guide (APG) [grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) supports layout grids containing independent controls. Authors must implement focus movement. The [layout grid examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/layout-grids/) permit optional wrapping between visual rows or columns; they do not require it.

[Sarah Higley](https://sarahmhigley.com/writing/grids-part1/) recommends choosing semantics based on the task, not visual appearance. [Adrian Roselli](https://adrianroselli.com/2020/07/aria-grid-as-an-anti-pattern.html) cautions against using a grid merely to reduce tab stops. Native lists and ordinary controls may be simpler.

These sources support different approaches. Use them to form testable hypotheses, not to declare a winning pattern.

### Product comparisons

Reported observations provide two additional references:

- **Google Docs:** Uses a listbox with interactive children; an axe DevTools scan flags an error. The [APG listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) does not support independently interactive controls inside options.
- **Google Drive:** Uses a single-row grid; an axe DevTools scan does not flag the pattern. This informed the single-row prototype and its reported positional feedback.

These observations are not independently verified. A product precedent or passing scan does not establish accessible interaction.

## Prototype comparison

The numbered variants are retired. Six descriptive semantic references remain: single-column grid, single-row grid, list, feed, toolbar, and fieldset. The recommended single-row grid supplies the semantics for all nine keyboard-navigation examples below.

Each grid or waterfall navigation component has its own Storybook Docs page and one Playground containing 50 cards. All nine expose `grid > row > gridcell`, `aria-rowcount="1"`, `aria-colcount="50"`, and stable one-based `aria-colindex` values. Photos use Picsum IDs matching those semantic column numbers, making skipped or reordered items easier to identify.

"Semantic" means collection order; "spatial" means measured visual position. Spatial horizontal arrows follow physical left/right, including in RTL. In the new Semantic examples, <kbd>ArrowRight</kbd>/<kbd>ArrowDown</kbd> always means next and <kbd>ArrowLeft</kbd>/<kbd>ArrowUp</kbd> always means previous, independently of geometry and directionality.

### Semantics and navigation

| Policy | Uniform-grid example | Waterfall example | Edge behavior |
| --- | --- | --- | --- |
| NoWrap | <a href="./?path=/docs/components-card-view-grid-nowrap--docs" target="_top">Grid nowrap</a> (`swc-card-view-grid-nowrap`) | <a href="./?path=/docs/components-card-view-waterfall-nowrap--docs" target="_top">Waterfall nowrap</a> (`swc-card-view-waterfall-nowrap`) | Move spatially; stop when no aligned enabled neighbor exists. |
| Loop | <a href="./?path=/docs/components-card-view-grid-loop--docs" target="_top">Grid loop</a> (`swc-card-view-grid-loop`) | <a href="./?path=/docs/components-card-view-waterfall-loop--docs" target="_top">Waterfall loop</a> (`swc-card-view-waterfall-loop`) | Move spatially; loop to the opposite edge within the same overlapping visual row or column. |
| Advance | <a href="./?path=/docs/components-card-view-grid-advance--docs" target="_top">Grid advance</a> (`swc-card-view-grid-advance`) | <a href="./?path=/docs/components-card-view-waterfall-advance--docs" target="_top">Waterfall advance</a> (`swc-card-view-waterfall-advance`) | Move spatially; cross an edge into the next or previous visual row/band or column. Cycle at the outer collection boundary. |
| Semantic | <a href="./?path=/docs/components-card-view-grid-semantic--docs" target="_top">Grid semantic</a> (`swc-card-view-grid-semantic`) | <a href="./?path=/docs/components-card-view-waterfall-semantic--docs" target="_top">Waterfall semantic</a> (`swc-card-view-waterfall-semantic`) | Move through semantic collection order on either arrow axis. Cycle at collection boundaries. |
| Top to bottom | Not applicable | <a href="./?path=/docs/components-card-view-waterfall-top-to-bottom--docs" target="_top">Waterfall top to bottom</a> (`swc-card-view-waterfall-top-to-bottom`) | Move down each measured visual column, then right to the next. Left/Up reverses the route. Cycle at collection boundaries. |

NoWrap, Loop, and Advance use perpendicular overlap to identify spatial neighbors. Waterfall cards do not form horizontal rows: an overlapping visual band is a geometric relationship, not another semantic row. These three waterfall examples and Top to bottom use shortest-column placement. Waterfall Semantic alone fills top to bottom within a column, then across columns in semantic order; in RTL, visual columns proceed from the inline start.

Top to bottom sorts enabled cards by their measured horizontal position, then by their vertical position. Down/Right follows that visual order; Up/Left reverses it. Columns are visited physically left to right, including in RTL. Home/End reaches the first/last enabled card in visual order. Resizing can change column membership and the navigation route. The accessibility tree and Shift-selection ranges remain in collection order, so position announcements can jump between numbers.

Loop does not advance to another row or column and does not guarantee complete traversal with one repeated key. Advance crosses a visual boundary and uses row/band order for horizontal movement or column order for vertical movement. Semantic ignores geometry and provides a route through every enabled item with any repeated arrow. These are keyboard policies on identical single-row semantics, not semantic alternatives.

The retained reference examples are:

| Reference | Element | Role and purpose |
| --- | --- | --- |
| <a href="./?path=/docs/components-card-view-single-row-grid--docs" target="_top">Single-row grid</a> | `swc-card-view-single-row-grid` | Recommended semantic structure: one row, one gridcell and semantic column per card. Its reference navigation is spatial without wrapping. |
| <a href="./?path=/docs/components-card-view-single-column-grid--docs" target="_top">Single-column grid</a> | `swc-card-view-single-column-grid` | One semantic row per card and one column; retained as a contrast for positional-feedback testing. Spatial arrows stop at visual boundaries. |
| <a href="./?path=/docs/components-card-view-list--docs" target="_top">List</a> | `swc-card-view-list` | Native `ul`/`li` with position metadata and ordinary child controls; a useful native-content reference. |
| <a href="./?path=/docs/components-card-view-feed--docs" target="_top">Feed</a> | `swc-card-view-feed` | Labelled feed and articles; a reading-stream reference, not the recommendation for asset selection. |
| <a href="./?path=/docs/components-card-view-toolbar--docs" target="_top">Toolbar</a> | `swc-card-view-toolbar` | Labelled command groups with native selection and actions; retained to illustrate the content-versus-command distinction. |
| <a href="./?path=/docs/components-card-view-fieldset--docs" target="_top">Fieldset</a> | `swc-card-view-fieldset` | Native grouping with a visible legend; grouping alone does not establish arrow navigation or position feedback. |

The arrow-navigation variants also provide <kbd>Home</kbd>/<kbd>End</kbd> for the first/last enabled target. Disabled navigation targets are skipped.

### Controls and selection

| Examples | Child-control access | Selection |
| --- | --- | --- |
| All grids, including the nine navigation examples | <kbd>Tab</kbd> visits the active card's controls, then leaves the collection. Inactive-card controls are not tabbable. | Native checkboxes and grid selection states; collection-order keyboard range selection. |
| List and feed | Every enabled checkbox and action remains in normal page tab order. Child-control arrows remain native. | Native checkboxes; no custom range selection. |
| Toolbar and fieldset | <kbd>Tab</kbd> visits the active card's Open and Share actions, then leaves. Action-button arrows remain native. | Native checkboxes; selection and actions remain independent. |

<kbd>Shift</kbd> + <kbd>Tab</kbd> reverses the tab path. Card activation, checkbox selection, and child actions must remain separate.

### Main tradeoffs and reported results

- **Single-row recommendation:** Reported output provides useful "x of y" feedback, unlike the "1 of 1" reports from earlier single-column prototypes. This supports the semantic recommendation, not a guarantee of speech or approval of a keyboard policy.
- **NoWrap:** Keeps a visible stopping boundary, but a user who knows only one semantic row may not discover another directional route through the remaining cards.
- **Loop:** Preserves the current visual band, but users may loop within it without discovering the rest of the collection.
- **Advance:** Continues across visual boundaries, but users must understand a traversal order that the single-row semantics do not describe. Waterfall bands make horizontal advancement especially important to test.
- **Semantic:** Gives either arrow axis a complete sequential route. Sighted users may instead expect spatial vertical movement or a horizontal move to the neighboring waterfall column. Whole-collection cycling also requires users to recognize repeated items.
- **Top to bottom:** Gives a complete route down visual columns without changing shortest-column placement. The route can jump between collection indices and change after resizing. Test position announcements, visual Home/End, and the expectation that Right moves down a column before moving right.
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
2. Hold single-row semantics, 50 cards, content, and actions constant. Compare Grid NoWrap, Loop, Advance, and Semantic with both sighted keyboard users and users relying on semantic order.
3. Compare the five waterfall policies. Test left/right neighbor choice when cards do not align horizontally. Compare Top to bottom's visual-column route with Semantic's collection-order route. Account for Semantic's different placement instead of treating it as a shortest-column waterfall.
4. Test disabled cards, reverse traversal, incomplete final rows, RTL, resizing, zoom, focus visibility, and entry/exit. Record collection-edge cycling separately from same-band looping.
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
- Select two cards and use a bulk action.
- Activate a card and a child action independently.
- Enter and leave the collection and its controls in both directions.
- Continue after resizing, changing layouts, loading items, or removing the focused card.

Record task completion, errors, effort, focus movement, and spoken output. Include screen reader users, record browser and assistive technology versions, and test default settings first.

Choose a keyboard-navigation policy only when users can complete these tasks with acceptable effort and without undocumented workarounds. The single-row semantic recommendation and the final keyboard-policy decision are separate conclusions.

Assess the result against [WCAG 1.3.1: Info and relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html), [1.3.2: Meaningful sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html), [1.4.10: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [2.1.1: Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html), [2.4.3: Focus order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html), and [4.1.2: Name, role, value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html). Reported observations alone do not establish conformance or failure.

## Sources and further context

- [RSP CardView documentation](https://react-spectrum.adobe.com/CardView), [CardView source](https://github.com/adobe/react-spectrum/blob/main/packages/@react-spectrum/s2/src/CardView.tsx), and [WaterfallLayout source](https://github.com/adobe/react-spectrum/blob/main/packages/react-stately/src/layout/WaterfallLayout.ts).
- [Original RSP Card accessibility specification](https://github.com/adobe/react-spectrum/blob/main/specs/accessibility/Card.mdx).
- [Piyush's PR #6798](https://github.com/adobe/spectrum-web-components/pull/6798).
- [APG grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/), [layout grid examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/layout-grids/), and [feed pattern](https://www.w3.org/WAI/ARIA/apg/patterns/feed/).
- [APG listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) and [MDN ARIA role reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles).
- [Sarah Higley: Grids Part 1, To grid or not to grid](https://sarahmhigley.com/writing/grids-part1/).
- [Adrian Roselli: ARIA Grid As an Anti-Pattern](https://adrianroselli.com/2020/07/aria-grid-as-an-anti-pattern.html).
- [Team discussion](https://adobedesign.slack.com/archives/G01P2PHJMC6/p1791294472435709), requiring Adobe workspace access.
- [WebKit issue referenced in the discussion](https://bugs.webkit.org/show_bug.cgi?id=236790), a possible explanation for announcement differences, not a confirmed diagnosis.
- [ARIA secondary-actions proposal](https://github.com/w3c/aria/issues/1440), future context rather than an implementation dependency.
