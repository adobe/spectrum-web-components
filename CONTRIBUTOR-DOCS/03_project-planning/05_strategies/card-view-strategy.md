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

For an illustrated summary, read <a href="/?path=/docs/components-card-view-the-card-view-oracle--docs" target="_top">The card view oracle</a>.

## Purpose and current recommendation

Choose an accessible interaction model for Spectrum Web Components (SWC) card view. Users need to reach every card, understand their position and selection, and use card actions without confusing keyboard behavior.

Compare a repaired layout grid with a native list first. Use a fully loaded, uniform layout to isolate the basic interaction. Then evaluate waterfall layouts and virtualization separately.

No option is selected yet. Valid ARIA, automated checks, and examples from other products do not establish usability. The decision requires keyboard testing and testing with screen reader users.

## Why the current model needs review

React Spectrum (RSP) `CardView` exposes a single-column ARIA grid while keyboard navigation follows the visual layout. Reports from the team discussion identify three concerns:

- **Unclear traversal:** Moving down can reach the bottom of a visual column before visiting cards in other columns. The one-column announcement does not explain that users need horizontal arrows to continue.
- **Unreliable position feedback:** Testers do not consistently hear the current item and collection total. Some report changing row counts, but the cause is not confirmed.
- **Waterfall and virtualization risks:** Visual neighbors can differ from collection neighbors. Virtualization can also affect reading order, loading, scrolling, and focus.

The discussion also reports that a selected-items action bar may obscure the focused card. Test this separately against [WCAG 2.4.11: Focus not obscured (minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html).

These are reported observations, not independently reproduced findings. Record DOM attributes, accessibility-tree structure, and spoken output separately before assigning a cause.

## What the guidance supports

### RSP specification and implementation

The [original RSP Card accessibility specification](https://github.com/adobe/react-spectrum/blob/main/specs/accessibility/Card.mdx) recommends:

- A single-column `grid`, with one `row` and focusable `rowheader` per card.
- Collection-order navigation with <kbd>ArrowLeft</kbd> and <kbd>ArrowRight</kbd> in every layout.
- Spatial navigation with <kbd>ArrowUp</kbd> and <kbd>ArrowDown</kbd>.
- Selection states, labelled controls, and <kbd>Tab</kbd> access to the active card's interactive children.

Option 1D follows this historical contract. Its spatial algorithm is an approximation, not an exact implementation of the specification.

The baseline, `swc-card-view-option-1a`, more closely follows [current RSP CardView](https://react-spectrum.adobe.com/CardView). It uses `gridcell` rather than `rowheader` and changes horizontal navigation to spatial movement in waterfall. It adapts Piyush's [PR #6798](https://github.com/adobe/spectrum-web-components/pull/6798), not the complete production implementation.

Current RSP uses virtualization and spatial waterfall range selection. The SWC prototypes are fully loaded, and the baseline retains collection-order range selection. Neither baseline nor option 1D provides full RSP parity.

### APG and expert guidance

The WAI-ARIA Authoring Practices Guide (APG) [grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) supports layout grids containing independent controls. Authors must implement focus movement. The [layout grid examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/layout-grids/) permit optional wrapping between visual rows or columns; they do not require it.

[Sarah Higley](https://sarahmhigley.com/writing/grids-part1/) recommends choosing semantics based on the task, not visual appearance. [Adrian Roselli](https://adrianroselli.com/2020/07/aria-grid-as-an-anti-pattern.html) cautions against using a grid merely to reduce tab stops. Native lists and ordinary controls may be simpler.

These sources support different approaches. Use them to form testable hypotheses, not to declare a winning pattern.

### Product comparisons

Reported observations provide two additional references:

- **Google Docs:** Uses a listbox with interactive children; an axe DevTools scan flags an error. The [APG listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) does not support independently interactive controls inside options.
- **Google Drive:** Uses a single-row grid; an axe DevTools scan does not flag the pattern. This informs options 2B and 2E.

These observations are not independently verified. A product precedent or passing scan does not establish accessible interaction.

## Prototype comparison

Prototype numbers identify the semantic structure; letters distinguish variations within that structure. Option 1 is a single-column grid (1A–1F), option 2 is a single-row grid (2A–2E), option 3 is a native list (3A), option 4 is a feed (4A), option 5 is a toolbar (5A), and option 6 is a native fieldset (6A). The comparison covers all 15 implemented options.

Element names use lowercase letters, for example `swc-card-view-option-1a`. Each prototype has a six-item overview plus larger grid, waterfall, and accessibility stories. Option 1A is the former unnumbered RSP baseline. Option 2A is the closest single-row comparison: it retains the historical sequential-horizontal and spatial-vertical contract, rather than reproducing the current baseline's spatial horizontal waterfall navigation.

“Sequential” means collection order. “Spatial” means measured visual position. Collection-order horizontal movement is mirrored in right-to-left layouts.

The paired navigation experiments are 1B/2B for spatial movement without wrapping, 1C/2C for spatial wrapping, 1D/2A for sequential Left/Right with spatial Up/Down, and 1E/2D for collection cycling. Options 1F and 2E retain the separate cross-column and vertical-waterfall experiments. Letters start with the closest baseline, so the same letter does not always imply identical navigation across families.

Spatial wrapping returns to the opposite end of the same aligned visual row or column; it does not advance to the next row or column. Alignment uses overlap on the perpendicular axis, so waterfall rows are visual bands rather than fixed-height rows. Local wrapping does not guarantee that one repeated key visits every card. Collection cycling does: each arrow independently visits every enabled item from any starting item, then repeats. The other sequential routes stop at collection boundaries.

### Semantics and navigation

| Prototype                                                                                          | Structure                                                                             | Navigation                                                                                                                                                                                                                                                             | Basis and main question                                                                                                                                         |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="/?path=/docs/components-card-view-option-1a--docs" target="_top">Option 1A</a> (baseline) | `grid` → one `row` per card → `gridcell`; one semantic column.                        | <kbd>ArrowLeft</kbd>/<kbd>ArrowRight</kbd> is sequential in grid and spatial in waterfall. <kbd>ArrowUp</kbd>/<kbd>ArrowDown</kbd> is spatial.                                                                                                                         | Piyush's PR comparison and current RSP behavior. Does the announced structure explain movement?                                                                 |
| <a href="/?path=/docs/components-card-view-option-1b--docs" target="_top">Option 1B</a>            | `grid` → one `row` per card → `gridcell`; one semantic column.                        | All four arrows move spatially and stop when no aligned enabled card exists.                                                                                                                                                                                           | SWC spatial-navigation experiment. Can users predict movement and discover every card without a sequential route?                                               |
| <a href="/?path=/docs/components-card-view-option-1c--docs" target="_top">Option 1C</a>            | Same single-column structure as option 1B.                                            | All four arrows move spatially. At an aligned row or column boundary, movement wraps to the opposite end of that same visual band.                                                                                                                                     | SWC spatial-wrapping experiment. Does local wrapping help users, or make the collection boundary harder to recognize?                                           |
| <a href="/?path=/docs/components-card-view-option-1d--docs" target="_top">Option 1D</a>            | `grid` → one `row` per card → `rowheader`; one semantic column.                       | <kbd>ArrowLeft</kbd>/<kbd>ArrowRight</kbd> is sequential in both layouts. <kbd>ArrowUp</kbd>/<kbd>ArrowDown</kbd> is spatial.                                                                                                                                          | Historical RSP specification. Does a consistent sequential route improve reachability?                                                                          |
| <a href="/?path=/docs/components-card-view-option-1e--docs" target="_top">Option 1E</a>            | Same single-column structure as option 1B.                                            | Every arrow follows collection order and cycles at collection boundaries. Right/Down moves forward; Left/Up moves backward, with horizontal directions mirrored in RTL.                                                                                                | SWC collection-cycling experiment. Can users reach every enabled item with one repeated key without mistaking collection order for spatial movement?            |
| <a href="/?path=/docs/components-card-view-option-1f--docs" target="_top">Option 1F</a>            | Same structure as option 1D.                                                          | Adds vertical column wrapping in both layouts: moving down from a column's bottom continues at the next column's top. Reverse movement mirrors this. Retains sequential horizontal navigation.                                                                         | APG optional wrapping. Does wrapping help users find every card without surprising them? Waterfall usability needs separate evaluation.                         |
| <a href="/?path=/docs/components-card-view-option-2a--docs" target="_top">Option 2A</a>            | Same single-row structure as option 2C.                                               | Left/Right moves sequentially in collection order in both layouts. Up/Down moves spatially. Movement stops at collection boundaries or when no aligned card exists.                                                                                                    | Historical RSP-style keyboard contract with single-row semantics. Does a stable sequential horizontal route improve reachability?                               |
| <a href="/?path=/docs/components-card-view-option-2b--docs" target="_top">Option 2B</a>            | `grid` → one `row` → one `gridcell` per card, in both layouts.                        | All four arrows move spatially and stop at visual boundaries. Waterfall fills top-to-bottom, then across columns.                                                                                                                                                      | Google Drive's reported single-row structure, with experimental spatial navigation. Does positional feedback improve without making movement harder to predict? |
| <a href="/?path=/docs/components-card-view-option-2c--docs" target="_top">Option 2C</a>            | `grid` → one `row` → one `gridcell` per card, in both layouts.                        | All four arrows move spatially, wrapping to the opposite end of the same aligned visual row or column at its boundary.                                                                                                                                                 | SWC spatial-wrapping comparison with option 1C. Does a single semantic row change users' understanding of local wrapping?                                       |
| <a href="/?path=/docs/components-card-view-option-2d--docs" target="_top">Option 2D</a>            | Same single-row structure as option 2C.                                               | Every arrow follows collection order and cycles at collection boundaries, with the same directions as option 1E.                                                                                                                                                       | SWC collection-cycling comparison with option 1E. Does single-row position feedback make the sequential route easier to understand?                             |
| <a href="/?path=/docs/components-card-view-option-2e--docs" target="_top">Option 2E</a>            | Same single-row structure as option 2B, in both layouts.                              | Grid: sequential <kbd>ArrowLeft</kbd>/<kbd>ArrowRight</kbd> and spatial <kbd>ArrowUp</kbd>/<kbd>ArrowDown</kbd>. Waterfall: <kbd>ArrowDown</kbd>/<kbd>ArrowUp</kbd> follows collection order down each column, then across columns; horizontal arrows do not navigate. | SWC comparison with option 2B. Does predictable waterfall traversal improve reachability and understanding?                                                     |
| <a href="/?path=/docs/components-card-view-option-3a--docs" target="_top">Option 3A</a>            | Native `ul` → `li`, with `aria-posinset` and `aria-setsize`.                          | Supplementary sequential <kbd>ArrowLeft</kbd>/<kbd>ArrowRight</kbd> and spatial <kbd>ArrowUp</kbd>/<kbd>ArrowDown</kbd>. One list item has a roving tab stop.                                                                                                          | Native-list alternative. Can ordinary reading and control access outweigh the extra tab stops?                                                                  |
| <a href="/?path=/docs/components-card-view-option-4a--docs" target="_top">Option 4A</a>            | Labelled `feed` → focusable `article`, with position and total metadata.              | <kbd>PageDown</kbd>/<kbd>PageUp</kbd> moves one article forward/backward in collection order.                                                                                                                                                                          | APG feed pattern. Does the collection genuinely fit a reading-oriented content stream?                                                                          |
| <a href="/?path=/docs/components-card-view-option-5a--docs" target="_top">Option 5A</a>            | Labelled horizontal `toolbar` → labelled `group` per card → native controls.          | Sequential <kbd>ArrowLeft</kbd>/<kbd>ArrowRight</kbd> between checkboxes; spatial <kbd>ArrowUp</kbd>/<kbd>ArrowDown</kbd>. Open becomes the navigation target when selection is disabled.                                                                              | Toolbar-inspired experiment. Does command-group semantics fit a content collection?                                                                             |
| <a href="/?path=/docs/components-card-view-option-6a--docs" target="_top">Option 6A</a>            | Native `fieldset` and visible `legend` → labelled `group` per card → native controls. | Same control navigation as option 5A, without a toolbar or grid role.                                                                                                                                                                                                  | Native form-grouping experiment. Can users discover navigation that the semantics do not establish?                                                             |

The arrow-navigation variants also provide <kbd>Home</kbd>/<kbd>End</kbd> for the first/last enabled target. Disabled navigation targets are skipped.

### Controls and selection

| Prototypes                                                                                                                                                                                                                                                                                                                                      | Child-control access                                                                                                   | Selection                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Options <a href="/?path=/docs/components-card-view-option-1a--docs" target="_top">1A</a>–<a href="/?path=/docs/components-card-view-option-1f--docs" target="_top">1F</a> and <a href="/?path=/docs/components-card-view-option-2a--docs" target="_top">2A</a>–<a href="/?path=/docs/components-card-view-option-2e--docs" target="_top">2E</a> | <kbd>Tab</kbd> visits the active card's controls, then leaves the collection. Inactive-card controls are not tabbable. | Native checkbox controls and grid selection states; supports keyboard range selection. |
| Options <a href="/?path=/docs/components-card-view-option-3a--docs" target="_top">3A</a> and <a href="/?path=/docs/components-card-view-option-4a--docs" target="_top">4A</a>                                                                                                                                                                   | Every enabled checkbox and action remains in normal page tab order. Child-control arrows remain native.                | Native checkboxes; no custom range selection.                                          |
| Options <a href="/?path=/docs/components-card-view-option-5a--docs" target="_top">5A</a> and <a href="/?path=/docs/components-card-view-option-6a--docs" target="_top">6A</a>                                                                                                                                                                   | <kbd>Tab</kbd> visits the active card's Open and Share actions, then leaves. Action-button arrows remain native.       | Native checkboxes; selection and actions remain independent.                           |

<kbd>Shift</kbd> + <kbd>Tab</kbd> reverses the tab path. Card activation, checkbox selection, and child actions must remain separate.

### Main tradeoffs and reported results

- **Options 1A, 1D, and 1F:** Reported screen reader output announces each card as “1 of 1.” The announced single column can also conflict with spatial movement. The newer variants 1B, 1C, and 1E need their own spoken-output checks; shared semantics do not establish equivalent usability.
- **Option 2B:** Reported output provides useful “x of y” feedback. However, one semantic row does not explain vertical arrows, and spatial movement does not provide a simple sequential traversal route.
- **Options 1C and 2C:** Local spatial wrapping preserves the current visual band but can make a collection boundary harder to recognize. Users may keep cycling within one band without discovering the rest of the collection.
- **Options 1E and 2D:** Every arrow can visit the entire enabled collection. This trades spatial predictability and a stopping boundary for complete traversal with one repeated key. Test whether users understand the cycle and recognize repeated items.
- **Options 1D and 2A:** Left/Right provides a collection-order route, while Up/Down follows geometry. Users must discover which pair reaches every item; a single repeated key only traverses the full collection from the appropriate starting boundary.
- **Option 2E:** Provides predictable sequential waterfall traversal, but reaching distant cards can require many key presses. Recheck spoken output after the change to single-row semantics.
- **Option 3A:** Preserves native content and control semantics, but adds tab stops. Reported output does not announce “x of y” despite list-position metadata. Supplementary arrows may be unavailable in screen reader browse mode.
- **Option 4A:** Preserves rich content, but one-article-at-a-time <kbd>PageUp</kbd>/<kbd>PageDown</kbd> navigation can feel slow and unexpected. A fully loaded prototype does not test the feed's loading behavior.
- **Option 5A:** A toolbar describes commands rather than content objects. Vertical arrows and active-card action tab stops extend the conventional horizontal-toolbar interaction.
- **Option 6A:** A fieldset provides native grouping, but does not establish arrow navigation, roving focus, or collection-position feedback.

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

1. Compare the baseline, repaired grid, and native list in a fully loaded uniform layout.
2. Compare the paired grid experiments: 1B/2B for spatial movement, 1C/2C for local wrapping, 1D/2A for a sequential horizontal route, and 1E/2D for full collection cycling. Evaluate 1F and 2E separately because their cross-column traversal differs from local wrapping. Use 4A, 5A, and 6A to test feed and control-grouping semantics.
3. Compare waterfall navigation using the same content and actions.
4. Add virtualization only after choosing a clear interaction contract.

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

Choose an option only when users can complete these tasks with acceptable effort and without undocumented workarounds.

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
