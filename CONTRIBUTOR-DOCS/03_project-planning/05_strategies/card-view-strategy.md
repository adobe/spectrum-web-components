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

Option 1 follows this historical contract. Its spatial algorithm is an approximation, not an exact implementation of the specification.

The baseline, `swc-card-view`, more closely follows [current RSP CardView](https://react-spectrum.adobe.com/CardView). It uses `gridcell` rather than `rowheader` and changes horizontal navigation to spatial movement in waterfall. It adapts Piyush's [PR #6798](https://github.com/adobe/spectrum-web-components/pull/6798), not the complete production implementation.

Current RSP uses virtualization and spatial waterfall range selection. The SWC prototypes are fully loaded, and the baseline retains collection-order range selection. Neither baseline nor option 1 provides full RSP parity.

### APG and expert guidance

The WAI-ARIA Authoring Practices Guide (APG) [grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) supports layout grids containing independent controls. Authors must implement focus movement. The [layout grid examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/layout-grids/) permit optional wrapping between visual rows or columns; they do not require it.

[Sarah Higley](https://sarahmhigley.com/writing/grids-part1/) recommends choosing semantics based on the task, not visual appearance. [Adrian Roselli](https://adrianroselli.com/2020/07/aria-grid-as-an-anti-pattern.html) cautions against using a grid merely to reduce tab stops. Native lists and ordinary controls may be simpler.

These sources support different approaches. Use them to form testable hypotheses, not to declare a winning pattern.

### Product comparisons

Reported observations provide two additional references:

- **Google Docs:** Uses a listbox with interactive children; an axe DevTools scan flags an error. The [APG listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) does not support independently interactive controls inside options.
- **Google Drive:** Uses a single-row grid; an axe DevTools scan does not flag the pattern. This informs options 5 and 6.

These observations are not independently verified. A product precedent or passing scan does not establish accessible interaction.

## Prototype comparison

The prototypes are `swc-card-view` and `swc-card-view-option-1` through `swc-card-view-option-8`. Each has grid, waterfall, and accessibility stories.

“Sequential” means collection order. “Spatial” means measured visual position. Collection-order horizontal movement is mirrored in right-to-left layouts.

### Semantics and navigation

| Prototype | Structure | Navigation | Basis and main question |
| --- | --- | --- | --- |
| Baseline | `grid` → one `row` per card → `gridcell`; one semantic column. | <kbd>ArrowLeft</kbd>/<kbd>ArrowRight</kbd> is sequential in grid and spatial in waterfall. <kbd>ArrowUp</kbd>/<kbd>ArrowDown</kbd> is spatial. | Piyush's PR comparison and current RSP behavior. Does the announced structure explain movement? |
| Option 1 | `grid` → one `row` per card → `rowheader`; one semantic column. | <kbd>ArrowLeft</kbd>/<kbd>ArrowRight</kbd> is sequential in both layouts. <kbd>ArrowUp</kbd>/<kbd>ArrowDown</kbd> is spatial. | Historical RSP specification. Does a consistent sequential route improve reachability? |
| Option 2 | Same structure as option 1. | Adds vertical column wrapping in uniform grid: moving down from a column's bottom continues at the next column's top. Reverse movement mirrors this. Retains sequential horizontal navigation. | APG optional wrapping. Does wrapping help users find every card without surprising them? Waterfall wrapping needs separate evaluation. |
| Option 3 | Native `ul` → `li`, with `aria-posinset` and `aria-setsize`. | Supplementary sequential <kbd>ArrowLeft</kbd>/<kbd>ArrowRight</kbd> and spatial <kbd>ArrowUp</kbd>/<kbd>ArrowDown</kbd>. One list item has a roving tab stop. | Native-list alternative. Can ordinary reading and control access outweigh the extra tab stops? |
| Option 4 | Labelled `feed` → focusable `article`, with position and total metadata. | <kbd>PageDown</kbd>/<kbd>PageUp</kbd> moves one article forward/backward in collection order. | APG feed pattern. Does the collection genuinely fit a reading-oriented content stream? |
| Option 5 | `grid` → one `row` → one `gridcell` per card, in both layouts. | All four arrows move spatially and stop at visual boundaries. Waterfall fills top-to-bottom, then across columns. | Google Drive's reported single-row structure, with experimental spatial navigation. Does positional feedback improve without making movement harder to predict? |
| Option 6 | Same single-row structure as option 5, in both layouts. | Grid: sequential <kbd>ArrowLeft</kbd>/<kbd>ArrowRight</kbd> and spatial <kbd>ArrowUp</kbd>/<kbd>ArrowDown</kbd>. Waterfall: <kbd>ArrowDown</kbd>/<kbd>ArrowUp</kbd> follows collection order down each column, then across columns; horizontal arrows do not navigate. | SWC comparison with option 5. Does predictable waterfall traversal improve reachability and understanding? |
| Option 7 | Labelled horizontal `toolbar` → labelled `group` per card → native controls. | Sequential <kbd>ArrowLeft</kbd>/<kbd>ArrowRight</kbd> between checkboxes; spatial <kbd>ArrowUp</kbd>/<kbd>ArrowDown</kbd>. Open becomes the navigation target when selection is disabled. | Toolbar-inspired experiment. Does command-group semantics fit a content collection? |
| Option 8 | Native `fieldset` and visible `legend` → labelled `group` per card → native controls. | Same control navigation as option 7, without a toolbar or grid role. | Native form-grouping experiment. Can users discover navigation that the semantics do not establish? |

The arrow-navigation variants also provide <kbd>Home</kbd>/<kbd>End</kbd> for the first/last enabled target. Disabled navigation targets are skipped.

### Controls and selection

| Prototypes | Child-control access | Selection |
| --- | --- | --- |
| Baseline, options 1–2 and 5–6 | <kbd>Tab</kbd> visits the active card's controls, then leaves the collection. Inactive-card controls are not tabbable. | Native checkbox controls and grid selection states; supports keyboard range selection. |
| Options 3–4 | Every enabled checkbox and action remains in normal page tab order. Child-control arrows remain native. | Native checkboxes; no custom range selection. |
| Options 7–8 | <kbd>Tab</kbd> visits the active card's Open and Share actions, then leaves. Action-button arrows remain native. | Native checkboxes; selection and actions remain independent. |

<kbd>Shift</kbd> + <kbd>Tab</kbd> reverses the tab path. Card activation, checkbox selection, and child actions must remain separate.

### Main tradeoffs and reported results

- **Baseline and options 1–2:** Observed screen reader output announces each card as “1 of 1.” The announced single column can also conflict with spatial movement.
- **Option 3:** Preserves native content and control semantics, but adds tab stops. Reported output does not announce “x of y” despite list-position metadata. Supplementary arrows may be unavailable in screen reader browse mode.
- **Option 4:** Preserves rich content, but one-article-at-a-time <kbd>PageUp</kbd>/<kbd>PageDown</kbd> navigation can feel slow and unexpected. A fully loaded prototype does not test the feed's loading behavior.
- **Option 5:** Reported output provides useful “x of y” feedback. However, one semantic row does not explain vertical arrows, and spatial movement does not provide a simple sequential traversal route.
- **Option 6:** Provides predictable sequential waterfall traversal, but reaching distant cards can require many key presses. Recheck spoken output after the change to single-row semantics.
- **Option 7:** A toolbar describes commands rather than content objects. Vertical arrows and active-card action tab stops extend the conventional horizontal-toolbar interaction.
- **Option 8:** A fieldset provides native grouping, but does not establish arrow navigation, roving focus, or collection-position feedback.

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
2. Use the other options to test specific hypotheses about wrapping, semantics, positional feedback, and control access.
3. Compare waterfall navigation using the same content and actions.
4. Add virtualization only after choosing a clear interaction contract.

Automated checks cover axe violations, accessibility-tree structure, selection states, and relevant focus paths. They do not verify spoken output or user understanding.

### Environments

| Environment | Test focus |
| --- | --- |
| NVDA with Chrome and Firefox | Focus-mode navigation, selection, position, and child controls. |
| JAWS with Chrome | Navigation, position, collection entry/exit, and selection. |
| VoiceOver with Safari | Ordinary arrows and VoiceOver commands separately; reading, scrolling, and loading. |
| Narrator with Edge | Navigation, position, and child controls. |
| VoiceOver on iOS and TalkBack on Android | Touch reading order, selection, actions, and loading. |
| Keyboard without a screen reader | Discoverability, visual predictability, reverse movement, and focus visibility at zoom. |

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
