# CardView accessibility prototype

A local prototype for comparing collection semantics for `swc-card-view`. It accompanies the "Accessibility semantics decision" section of `CONTRIBUTOR-DOCS/03_project-planning/03_components/card-view/implementation-approach.md`.

This folder is in `.gitignore`. It is plain HTML, CSS, and JavaScript, with no dependencies and no build step. It does not use `swc-card`, so the cards are visual stand-ins.

## Run

From the repository root:

```bash
node gen2/cardView-prototype/serve.mjs
```

Then open <http://localhost:4321/>.

The prototype is also available in the gen2 Storybook as **card-View-prototype**, in local dev mode only (`yarn storybook` from `gen2/`). Production, accessibility CI, and VRT builds exclude it.

- Use a different port with `PORT=5000 node gen2/cardView-prototype/serve.mjs`.
- To let teammates on the same network open it, run with `HOST=0.0.0.0` and share your machine's address. Only do this on a trusted network.
- Scenario settings are stored in the URL, so you can share a link to a specific setup.

## What it shows

The **Semantics model** control switches between:

| Model                  | Structure                                                                                 | Arrow keys                                     |
| ---------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------- |
| A. React Spectrum grid | `grid` > one `row` per card > `gridcell`                                                  | Follow the visual 2D layout                    |
| B. APG layout grid     | `grid` > one `row` per visual row > `gridcell` per card, rebuilt when the columns change  | Move by cell; Right and Left wrap between rows |
| C. Single-row grid     | `grid` > one `row` > a `gridcell` per card with `aria-colindex`                           | Move in DOM order                              |
| D. Linear list         | `list` > `listitem` with `aria-posinset` and `aria-setsize`; focus on each card's control | Move in DOM order                              |
| D. Listbox             | `listbox` > `option` with `aria-selected`, `aria-posinset`, and `aria-setsize`            | Move in DOM order                              |

The inspector shows, for each move:

- **Likely screen reader output:** an approximation built from the rendered ARIA. It is not a real screen reader, so confirm with VoiceOver, NVDA, and JAWS.
- **Visual position:** the row and column a sighted user sees.
- **Exposed position:** what the semantics tell assistive technology.
- **Move log:** each key press, marked ✓ (consistent), ⚠ (mismatch between visual and announced movement), or ℹ (note).
- **Accessibility structure:** the role tree for the first few cards.

Other controls cover layout (grid or waterfall), size with the responsive clamp, density, variant, selection mode and style, card actions (none, visible, or revealed on hover), the tab model (Express-style or single tab stop), page step, card count, direction, and disabled cards.

## Suggested demo

1. Select **React Spectrum today**. Tab into the collection. Press <kbd>Right Arrow</kbd>, then <kbd>Down Arrow</kbd>. The log shows that both keys change the announced row, by different amounts.
2. Drag **Collection width** narrower and wider. The visual columns change; the exposed structure stays one column.
3. Switch **Layout** to waterfall. There are no rows to announce.
4. With card actions revealed on hover and the single tab stop, press <kbd>Tab</kbd>: focus leaves the collection. The actions are reachable only with <kbd>Enter</kbd>, which users have to discover.
5. Select **APG layout grid** ([APG layout grids](https://www.w3.org/WAI/ARIA/apg/patterns/grid/#layoutgridsforgroupingwidgets)). The announced row and column now match what sighted users see. Drag **Collection width**: the rows are rebuilt in script, and the log flags that the focused card's position changed without notice. Press <kbd>Enter</kbd> or <kbd>F2</kbd> to reach card actions, arrows to move between them, and <kbd>Escape</kbd> or <kbd>F2</kbd> to return. Switch to waterfall to see it fall back to a single row.
6. Select **Recommended: linear list**. Arrow keys move in reading order, each card reports "N of M", and <kbd>Tab</kbd> reaches the focused card's actions.
7. Select **Fallback: single-row grid** and compare the column announcements.
8. Select **Listbox, no card actions** to show reliable selection and position announcements, and why it cannot hold card actions.
9. Repeat any step with a real screen reader, and at 200% and 400% browser zoom.

## Keyboard

- Arrow keys, <kbd>Home</kbd>, <kbd>End</kbd>, <kbd>Page Up</kbd>, and <kbd>Page Down</kbd> move between cards. The model sets the direction rules.
- <kbd>Space</kbd> toggles selection. In multiple mode, <kbd>Shift</kbd> + arrow extends the selection, and <kbd>Ctrl</kbd> + <kbd>A</kbd> or <kbd>Cmd</kbd> + <kbd>A</kbd> selects all. <kbd>Escape</kbd> clears the selection.
- With the single tab stop model, <kbd>Enter</kbd> moves into the card's actions, and <kbd>Escape</kbd> returns to the card.
- In the APG layout grid, <kbd>Home</kbd> and <kbd>End</kbd> stay in the row, and <kbd>Ctrl</kbd> + <kbd>Home</kbd> and <kbd>Ctrl</kbd> + <kbd>End</kbd> go to the first and last card. <kbd>Enter</kbd> or <kbd>F2</kbd> moves into the card's actions, arrows move between them, and <kbd>Escape</kbd> or <kbd>F2</kbd> returns.
