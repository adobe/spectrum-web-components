<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Strategies / Drag and drop strategy

<!-- Document title (editable) -->

# Drag and drop strategy

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Summary](#summary)
- [Requirements and design principles](#requirements-and-design-principles)
    - [Provide three complementary ways to operate](#provide-three-complementary-ways-to-operate)
    - [Design around the task, not a universal gesture](#design-around-the-task-not-a-universal-gesture)
- [Recommendations by use case](#recommendations-by-use-case)
    - [Reorder a linear list](#reorder-a-linear-list)
    - [Transfer items between containers](#transfer-items-between-containers)
    - [Place items in a structured grid](#place-items-in-a-structured-grid)
    - [Position objects on a canvas](#position-objects-on-a-canvas)
    - [Resize in one dimension](#resize-in-one-dimension)
    - [Resize in two dimensions](#resize-in-two-dimensions)
    - [Import files and transfer data externally](#import-files-and-transfer-data-externally)
- [Shared interaction behavior](#shared-interaction-behavior)
    - [Roles, states, and properties by use case](#roles-states-and-properties-by-use-case)
    - [State, focus, and announcements](#state-focus-and-announcements)
    - [Visual and touch feedback](#visual-and-touch-feedback)
- [SWC implementation direction](#swc-implementation-direction)
- [Verification before adoption](#verification-before-adoption)
- [Resources and example limitations](#resources-and-example-limitations)

</details>

<!-- Document content (editable) -->

## Summary

Spectrum Web Components (SWC) should treat **drag and drop as an optional direct-manipulation shortcut**, not the only way to complete a task. Start with explicit commands for moving, ordering, positioning, or resizing, then add dragging where user research shows that it improves the experience. All input methods should operate on the same application data and validation rules.

This document proposes an approach for SWC patterns and consumer applications. It does not establish an existing component API, select a library, or claim that the referenced demos conform to WCAG 2.2. The recommendations synthesize the [W3C dragging guidance][wcag-dragging], [Salesforce patterns][salesforce-article], [Vispero research][vispero-part-1], [GitHub sortable-list research][github-sortable], and [React Aria implementation][react-aria-blog], with usability guidance from [Nielsen Norman Group][nng].

## Requirements and design principles

### Provide three complementary ways to operate

1. **Pointer dragging:** Support mouse, pen, or touch dragging where appropriate for the task.
2. **Non-dragging pointer controls:** Provide equivalent clicks or taps without holding a pointer down while moving it. Examples include destination menus, move buttons, numeric fields, and selecting an item followed by its destination.
3. **Keyboard and assistive technology:** Make the task operable with a keyboard and understandable with desktop and mobile screen readers, voice control, and other supported assistive technology.

[WCAG 2.2 success criterion 2.5.7, Dragging movements][wcag-dragging] is a Level AA requirement for the second path. Keyboard support alone does not satisfy it. A required swipe is not an adequate replacement either: path-based gestures have separate requirements under [WCAG 2.5.1, Pointer gestures][wcag-gestures]. Keyboard operation is independently required by [WCAG 2.1.1, Keyboard][wcag-keyboard].

The non-dragging alternative can be a separate control on the same page, provided it offers equivalent functionality. Keep it near the task and available to everyone, rather than placing it in remote settings or exposing it only to screen readers. The WCAG exception for essential dragging or unmodified browser-provided behavior is narrow; difficulty implementing an alternative is not a reason to invoke it.

### Design around the task, not a universal gesture

Use different patterns for ordering, transferring, positioning, and resizing. [Vispero Part 1][vispero-part-1] distinguishes linear lists from two-dimensional structures where a specific cell has meaning, and separates in-app transfers from operating-system integration. A solution for sortable lists should not automatically be extended to canvas editors or file uploads.

Prefer established controls and semantics. A destination menu or labeled numeric input is often easier to discover and more precise than dragging. [Nielsen Norman Group][nng] recommends clear signifiers and feedback, and notes that menus can be less error-prone on mobile. Do not make touch dragging mandatory where a simpler command works better.

## Recommendations by use case

| Use case | Recommended non-dragging operation | Optional dragging enhancement |
| --- | --- | --- |
| Reorder a linear list | Move up/down controls; a position or before/after dialog for long lists | Drag an item to a clearly indicated insertion point |
| Transfer between containers | Move-to menu or destination picker | Drag onto a destination container |
| Place in a structured grid | Select an item, then choose a destination cell | Drag onto an explicitly valid cell |
| Position on a canvas | Position fields and directional controls | Drag with snapping and position feedback |
| Resize in one dimension | Labeled numeric field or pointer-operable slider | Drag a divider or resize handle |
| Resize in two dimensions | Width and height fields | Drag a dedicated resize handle |
| Import files or transfer externally | File picker; explicit import/export or copy/paste where supported | Native browser file or data dragging |

### Reorder a linear list

Examples include priority queues, playlists, navigation items, and ordered table rows. This means changing item order, not sorting by a column value such as name or date.

**Recommendation:** Offer **Move up** and **Move down** commands for short lists. For long, scrollable, or virtualized lists, provide a move dialog that chooses a position or a named item to move before or after. Make destinations outside the viewport available without requiring a continuous drag across scrolling content. Disable unavailable boundary moves and preserve the identity of the item being moved.

For optional keyboard dragging, use a focused, labeled reorder control. Activate it to enter a temporary move mode, use direction keys to change the proposed position, confirm to commit, and use <kbd>Escape</kbd> to cancel. Specify the activation and confirmation keys in each pattern; Salesforce uses <kbd>Space</kbd>, while React Aria uses <kbd>Enter</kbd>. Do not assume that either choice is a universal standard.

Announce the item, its current position and total, available operations, and the committed or canceled result. Keep focus associated with the moved item after reordering. Show an insertion indicator before dropping, including at the beginning and end of the list. If multiple-item reordering is supported, preserve the selected items' relative order and announce the number being moved.

[GitHub's research][github-sortable] makes a move dialog especially compelling: voice-control references can change during scrolling and terminate a drag, and several participants preferred the dialog even without voice control. Its screen-reader testing also exposed arrow-key conflicts and outdated announcements during rapid movement.

**Examples:** Compare Salesforce's [ordinary list example][salesforce-list] and [listbox example][salesforce-listbox]. Use listbox semantics only when the component is genuinely a selectable listbox; do not change an ordinary list's role solely to gain arrow-key handling. React Aria's [documentation][react-aria-docs] distinguishes `onReorder` from `onMove`, which also supports moving between hierarchy levels.

### Transfer items between containers

Examples include Kanban status changes, moving records between categories, and organizing files into folders within an application.

**Recommendation:** Put a **Move to** command on the item or selection that opens a destination menu or picker. Use a picker for many destinations or a hierarchy. Name each destination, identify unavailable destinations, and retain a clear way to cancel. Use explicit copy versus move commands when both operations are supported.

After committing, announce what moved and its destination. Keep focus on the moved item when it remains available; otherwise choose a predictable remaining item or destination control. Do not let removal of the original DOM node strand focus. For multiple-item transfers, report the count and handle invalid selections before committing.

Dragging can highlight valid destination containers. If placement within the destination matters, combine this pattern with the linear-list insertion model rather than silently treating every drop as an append.

**Examples:** Salesforce's [move-between-lists example][salesforce-buckets] uses a destination menu. The [W3C guidance][wcag-dragging] also identifies menus and move buttons as non-drag alternatives for task boards. [React Aria][react-aria-blog] offers a drag mode that navigates valid targets, but that keyboard model does not replace the need for click/tap controls.

### Place items in a structured grid

Examples include assigning an item to a schedule slot, placing pieces on a board, or rearranging a dashboard where specific cells have meaning. A visually wrapped list is not necessarily a structured grid.

**Recommendation:** Allow users to select an item and then click or tap a destination cell, or choose its row and column through labeled controls. Provide keyboard navigation appropriate to the grid's semantics. Expose the cell's name or coordinates and whether it is a valid destination.

Define the result of an occupied-cell drop: reject, swap, replace, or move the existing item. Preview the result before commitment and provide confirmation or undo for destructive replacement. Do not copy the append behavior of a linear-list transfer into a grid with occupancy constraints.

This is a distinct implementation scope, not an extension to assume is covered by list demos. [Vispero Part 1][vispero-part-1] explicitly distinguishes structural grids from linear lists, while the [W3C examples][wcag-dragging] demonstrate selecting a source and then a destination without dragging.

### Position objects on a canvas

Examples include diagram nodes, design objects, and movable panels in an editor.

**Recommendation:** Provide labeled position fields and directional controls for precise placement. Keyboard nudging can supplement these controls but cannot be the only non-dragging alternative. Define coordinate units, origin, bounds, snapping, and collision behavior consistently across input methods.

Separate adding an object from positioning it: a palette command adds the object to a predictable location and focuses it, after which users can adjust its position. Do not require a palette-to-canvas drag.

Give move and resize operations separate controls. Announce the object and its meaningful coordinates, then its final position or cancellation. If movement displaces other objects, convey that consequence. Treat a drag as a preview until commitment so cancellation restores the prior position.

For canvas panning, offer directional buttons or other click/tap controls. For rectangular selection, offer a mode where users click or tap the two corners separately. These are [W3C examples of equivalent non-dragging operations][wcag-dragging].

**Example:** Salesforce's [canvas example][salesforce-canvas] demonstrates grab, arrow-key movement, confirmation, and position announcements. Add click/tap controls or numeric fields before adopting this as a WCAG 2.2 strategy. [Nielsen Norman Group][nng] supports combining approximate dragging with precise adjustments and visible snapping feedback.

### Resize in one dimension

Examples include table-column widths, row heights, split-pane dividers, and adjustable timeline durations.

**Recommendation:** Prefer a labeled native range input when a slider fits the task, or a numeric field with units, minimum, maximum, and step. A slider must support click/tap adjustment without dragging, or have another pointer-operable control that provides equivalent adjustment. Do not assume that arrow-key support alone satisfies this requirement.

Expose the current value and meaningful units. Make focus visible on the corresponding divider or handle, including when the underlying input is visually hidden. Apply the same limits to typing, clicking, keyboard adjustment, and dragging. Native controls can provide value announcements without a parallel live region.

**Example:** Salesforce's [one-dimensional resize example][salesforce-resize] uses a range input for a table column. The [Salesforce article][salesforce-article] explains its native semantics; the [W3C guidance][wcag-dragging] identifies clicking a slider track or entering a value as non-dragging alternatives. Verify equivalent precision and range in the actual implementation.

### Resize in two dimensions

Examples include image dimensions, shapes, and resizable canvas objects.

**Recommendation:** Offer labeled **Width** and **Height** fields, with units and constraints. If maintaining the aspect ratio is supported, expose it as an explicit setting and explain which dimension changes when it is enabled.

Optional resize mode can map horizontal direction keys to width and vertical direction keys to height, with confirmation and cancellation. Keep the reference corner stable and report both dimensions, rather than describing a resize only as a movement. Announce effects on surrounding objects if resizing changes their placement.

**Example:** Salesforce's [canvas resize example][salesforce-canvas] uses a separate resize control and reports width and height. Add the numeric controls for pointer users and precision, instead of relying on the keyboard-only path as the alternative to dragging.

### Import files and transfer data externally

Examples include dropping files from the operating system, importing a directory, or dragging data into another application.

**Recommendation:** Always pair file dropping with a labeled file picker. If directories are supported, provide an equivalent selection/import path supported by the target browsers, or explicitly constrain that feature's scope. Communicate accepted types, limits, upload progress, and failures through the ordinary import workflow as well as the drop zone.

Use native browser drag and drop when operating-system or cross-window interoperability is required. Provide explicit import/export or copy/paste alternatives where they deliver the same intended transfer; verify this per destination rather than assuming clipboard support is universal. Do not treat data arrival as completion of an upload or successful persistence.

[React Aria's documentation][react-aria-docs] distinguishes text, file, and directory items, accepted formats, and move/copy/link operations. It also states that its custom keyboard and screen-reader drag mode operates within the browser window, whereas native pointer dragging can interact with external applications. External workflows therefore need additional alternatives.

## Shared interaction behavior

### Roles, states, and properties by use case

Use native HTML semantics first. The table distinguishes explicit ARIA in the cited resources from semantics supplied by native controls. A drag source or drop target is an interaction concept, not a role to add to every element. Retain the underlying component's semantics and expose the operation through its controls, descriptions, and feedback.

| Use case | Recommended roles and semantics | States, properties, and feedback | Resource and limits |
| --- | --- | --- | --- |
| Reorder an ordinary list | Keep native `ul`/`ol` and `li` semantics, corresponding to `list` and `listitem`. Use a native button for an explicit reorder command. | Associate custom operation instructions with the control using `aria-describedby`. Use `aria-live` for position changes and the final result when these are not otherwise exposed. | The [Salesforce ordinary-list demo][salesforce-list] associates instructions with its focusable item control; the [LinkedIn article][linkedin-usability] illustrates `list`/`listitem`. Do not adopt its application wrapper or make a listbox out of an ordinary list. |
| Reorder a selectable listbox | Use `role="listbox"` on the container and `role="option"` on items only when listbox interaction and selection semantics fit the component. | Salesforce uses `aria-describedby` for reorder instructions and `aria-live` for grab, position, drop, and cancel announcements. Its example manages focus with `tabindex="0"` and `tabindex="-1"`; `tabindex` is HTML, not an ARIA state. | The [Salesforce article][salesforce-article] provides this markup. Its drag announcements do not replace the complete listbox selection model; selection and dragging are different states. |
| Transfer between containers | Use a native move button. For a destination menu, use `role="menu"` and `role="menuitem"` with the corresponding menu keyboard behavior. | Salesforce's trigger uses `aria-haspopup="true"`, which denotes a menu popup. Give the button an accessible name identifying the item, such as "Move Phone". Preserve normal menu state and focus handling rather than describing every menu keystroke in a live region. | The [Salesforce article][salesforce-article] specifies the trigger property; the [container-transfer demo][salesforce-buckets] supplies the menu roles. A destination dialog or picker needs its own pattern, not menu roles by default. |
| Place in a structured grid | Retain the semantics appropriate to the actual grid or board. Do not add `role="grid"` solely because items can be dragged or appear in rows and columns. | Provide accessible names for source and destination controls and report the destination and any swap or replacement. | [Vispero][vispero-part-1] identifies this use case but does not prescribe specific grid roles or state attributes. Validate the chosen grid pattern separately. |
| Position objects on a canvas | Use separate native move buttons with accessible names identifying their objects. Native buttons already expose the `button` role. | Use `aria-describedby` to associate move instructions. Salesforce uses `aria-hidden="true"` on decorative SVG icons and `aria-live` for coordinates, completion, and cancellation. Keep the button and its accessible name exposed. | The [Salesforce article][salesforce-article] shows the move-button markup. It does not prescribe a canvas-wide application role or an ARIA property for object coordinates. |
| Resize in one dimension | Prefer `<input type="range">`, which exposes slider semantics without an explicit `role="slider"`. Use a labeled numeric input when direct value entry fits better. | Salesforce uses `aria-label` to name the range input. Native `min`, `max`, and `value` expose the slider's minimum, maximum, and current value, corresponding to `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`; do not duplicate them with manual ARIA on the native input. | The [Salesforce article][salesforce-article] explains that the native range input supplies operation and value announcements without a separate live region. A custom slider requires its complete slider pattern, not just a role. |
| Resize in two dimensions | Use a separate, named native resize button and labeled width/height inputs. | Associate resize instructions with `aria-describedby`; use `aria-live` for changing dimensions and the final result when needed. | The [Salesforce canvas demo][salesforce-canvas] supplies the resize button and description. The resources do not define a two-dimensional slider role; do not represent both dimensions as a single slider value. |
| Import files or transfer externally | Use a labeled native file input or button-based file-picker control alongside the drop zone. Keep collection roles appropriate to the destination component. | Provide accessible instructions, results, and errors. Do not use `aria-dropeffect` to indicate accepted formats or copy/move behavior. | [React Aria][react-aria-docs] describes accepted types, operations, and accessible interactions, but the drag-and-drop guide does not prescribe a special drop-zone role or file-import ARIA state. |

For custom drag feedback, [Salesforce][salesforce-article] and [React Aria][react-aria-blog] use live regions and descriptions. These supplement rather than replace programmatically exposed component states. Native values and established selection or menu states must remain accurate throughout the interaction. Use the announcement guidance below to choose live-region politeness and timing.

Do not use the deprecated `aria-grabbed` or `aria-dropeffect` attributes discussed in the [LinkedIn article][linkedin-usability]. An item's selected state is not a substitute for a grabbed state, and a CSS class, `data-*` attribute, or HTML `draggable="true"` does not by itself communicate a complete accessible drag interaction. The cited resources do not establish a universal modern ARIA drag-state property.

### State, focus, and announcements

Use a shared operation lifecycle: idle, active with a proposed destination or value, committed, or canceled. Explicit controls can perform the operation directly, but should use the same validation and data updates as dragging. Cancellation must not leave partial reordering, transfers, or dimension changes behind.

Keep input focus and screen-reader context predictable. Explain how to start, navigate, confirm, and cancel custom move modes. Native controls and established menu interactions generally need less custom instruction. Distinguish keyboard or screen-reader activation from a physical drag; [GitHub][github-sortable] found that NVDA-synthesized mouse events could accidentally complete an operation intended for keyboard control.

Use programmatic roles, names, and states before adding announcement text. For custom operations, communicate identity, operation, and state, as described by [Salesforce][salesforce-article]. Announce progress only when it adds information, coalesce rapid updates, and ensure the final committed or canceled result supersedes stale positional messages.

Do not standardize on `aria-live="assertive"` for every update. Salesforce's older examples use assertive regions, [Vispero][vispero-part-1] warns about live-region reliability, and [GitHub][github-sortable] documents a user-tested 100 ms debounce with assertive announcements for its particular sortable list. Choose timing and politeness based on testing; do not copy that delay as a universal requirement or queue every intermediate move.

Avoid `role="application"` as the default solution to arrow-key conflicts. GitHub used it temporarily on a narrowly scoped trigger and explicitly warns against broad use. Any proposed exception needs evidence that simpler semantics do not work, narrowly bounded activation, reliable cleanup on cancel/commit, and testing with regular screen-reader users.

The [Digita11y Accessible article][linkedin-usability] reinforces focusable controls and visual and screen-reader feedback, but its code is illustrative, not an implementation to copy. Do not adopt its broad `role="application"` wrapper or the deprecated `aria-grabbed` and `aria-dropeffect` attributes it discusses. Choose focus behavior and shortcuts for the actual component semantics, rather than making every item a separate tab stop or assigning modifier-key shortcuts without testing for conflicts.

### Visual and touch feedback

Make the action discoverable before interaction. Use a labeled control and a recognizable handle where useful; do not rely on a cursor change, hover-only UI, or an ambiguous icon. Separate dragging from links, selection, and other item actions.

Show what is active, valid destinations, the proposed insertion or size, and the result. Use insertion markers, outlines, and other cues that survive forced colors and do not depend on color alone. Snapping and generous hit areas can reduce precision demands, but the highlighted destination must match what will receive the drop. [Nielsen Norman Group][nng] provides examples of these signifiers and previews.

Touch interactions must distinguish scrolling, tapping, and intentionally dragging, without covering critical feedback with the finger. Preserve access to menus and explicit controls. Meet [WCAG 2.5.8, Target size (minimum)][wcag-target-size], including its spacing and exception conditions, and prefer larger targets when touch interaction needs them. Respect reduced-motion preferences; previews must remain understandable without movement animations.

## SWC implementation direction

1. **Start with common, bounded patterns.** Prioritize linear-list ordering and transfers between containers, plus native value controls for one-dimensional resizing. Treat grids, canvas editing, and external transfers as separately validated work.
2. **Define application operations before gesture plumbing.** Specify item identifiers, destination semantics, validity, copy/move behavior, cancellation, and persistence. Applications own their data and business rules; a proposed shared controller should coordinate interaction and feedback, not silently mutate arbitrary consumer data.
3. **Reuse native controls and existing pattern components.** Use buttons, menus, dialogs, and inputs for the baseline operations. Add shared drag state, focus handling, and announcement utilities only where proven use cases justify them. This document does not prescribe new component names or APIs.
4. **Evaluate libraries against SWC integration requirements.** [React Aria][react-aria-docs] is a useful interaction and API reference, not a React dependency selected for Lit-based components. Evaluate candidates for keyboard, touch screen readers, non-dragging pointer controls, native interoperability where needed, and behavior across shadow boundaries before adoption.
5. **Document and test every supported operation.** Examples should show the explicit command path alongside dragging, not demonstrate accessibility through a keyboard shortcut alone. Validate cross-component focus and ARIA relationships in the actual web-component composition.

## Verification before adoption

- Complete every operation using only clicks or taps, with no dragging, required swiping, or physical keyboard.
- Complete the same operations using only a keyboard, including cancellation and recovery from invalid destinations.
- Test desktop screen readers with their normal navigation modes, rapid repeated movement, synthesized activation events, and both completion and cancellation announcements.
- Test touch screen readers and voice control, including destinations outside a scrollable viewport and targets with visible names that match their accessible names.
- Check short, long, empty, and virtualized collections; list boundaries; occupied grid cells; disabled targets; and multiple selections when supported.
- Verify focus after moves, removal of the original node, dialog closure, and cancellation. Confirm that canceled operations restore the prior data.
- Verify visual feedback with zoom, reflow, forced colors, reduced motion, and touch input. Do not obscure focused controls or destinations.
- Test external file/data workflows separately, including file-picker alternatives, rejected formats, failed persistence, and copy versus move semantics.
- Add automated tests for operation state, data changes, cancellation, and focus. Include manual usability testing with regular assistive-technology users; automated accessibility checks alone cannot validate this interaction.
- Evaluate whether users discover the controls, understand destinations and feedback, and complete and recover from moves without excessive effort. Compare dragging with the explicit-control path, and revise the pattern when either path is technically operable but cumbersome.

These are recommended adoption gates, not claims that an implementation has already passed. GitHub's [user-testing findings][github-sortable] show why slow developer-only screen-reader checks miss important interaction failures. [Digita11y Accessible][linkedin-usability] also distinguishes technical accessibility from practical usability: involve people who use assistive technology in realistic tasks and iterate on their feedback, rather than treating focusability and ARIA markup as proof that the experience works well.

## Resources and example limitations

- [W3C: Understanding dragging movements][wcag-dragging]. The conformance reference for non-dragging single-pointer alternatives.
- [Salesforce: Four major patterns for accessible drag and drop][salesforce-article]. A 2017 explanation of identity, operation, and state for ordering, moving, and resizing.
- [Salesforce: Accessible drag and drop examples][salesforce-examples]. Inspect the ordinary list, listbox, container-transfer, canvas, and resize demos. These are historical examples, not validated SWC implementations or evidence of WCAG 2.2 conformance. Use stable example links without the incidental `_k` query parameter.
- [Vispero: The road to accessible drag and drop, Part 1][vispero-part-1]. A 2023 use-case taxonomy and requirements checklist, including virtual pointers, forced colors, multi-item movement, and internationalization.
- [Vispero: The road to accessible drag and drop, Part 2][vispero-part-2]. The supplied link redirects to a general resources index when checked on October 9, 2026. Part 1 describes it as implementation guidance with demos, but its contents are not used as evidence here. Revisit this reference when a working copy is available.
- [GitHub: Exploring the challenges in creating an accessible sortable list][github-sortable]. A 2024 account of screen-reader conflicts, event handling, announcement timing, instructions, and a move-dialog alternative.
- [React Aria: Taming the dragon][react-aria-blog]. A 2022 design account of accessible drag mode, valid-target navigation, native interoperability, and localized announcements. Read current documentation for supported APIs rather than treating this launch article as the current support matrix.
- [React Aria: Drag and drop documentation][react-aria-docs]. Implementation guidance for data formats, collection drop positions, operations, keyboard and screen-reader behavior, and external-transfer limitations.
- [Nielsen Norman Group: Drag and drop, how to design for ease of use][nng]. A 2020 usability reference for discoverability, feedback, snapping, precision, and touch tradeoffs. It complements, rather than replaces, current WCAG requirements.

- [Digita11y Accessible: Making drag-and-drop interfaces both accessible and usable][linkedin-usability]. A 2024 discussion of keyboard access, feedback, and usability testing with assistive-technology users. Apply its usability principles, not its illustrative broad application role or deprecated ARIA attributes.

[wcag-dragging]: https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html
[wcag-gestures]: https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html
[wcag-keyboard]: https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html
[wcag-target-size]: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
[salesforce-article]: https://medium.com/salesforce-ux/4-major-patterns-for-accessible-drag-and-drop-1d43f64ebf09
[salesforce-examples]: https://salesforce-ux.github.io/dnd-a11y-patterns/#/
[salesforce-list]: https://salesforce-ux.github.io/dnd-a11y-patterns/#/sortA
[salesforce-listbox]: https://salesforce-ux.github.io/dnd-a11y-patterns/#/sortB
[salesforce-buckets]: https://salesforce-ux.github.io/dnd-a11y-patterns/#/bucket
[salesforce-canvas]: https://salesforce-ux.github.io/dnd-a11y-patterns/#/canvas
[salesforce-resize]: https://salesforce-ux.github.io/dnd-a11y-patterns/#/resize
[vispero-part-1]: https://vispero.com/resources/the-road-to-accessible-drag-and-drop-part-1/
[vispero-part-2]: https://vispero.com/the-road-to-accessible-drag-and-drop-part-2/
[github-sortable]: https://github.blog/engineering/user-experience/exploring-the-challenges-in-creating-an-accessible-sortable-list-drag-and-drop/
[react-aria-blog]: https://react-aria.adobe.com/blog/drag-and-drop
[react-aria-docs]: https://react-aria.adobe.com/dnd.md
[nng]: https://www.nngroup.com/articles/drag-drop/
[linkedin-usability]: https://www.linkedin.com/pulse/making-drag-and-drop-interfaces-both-accessible-usable-udx7c/
