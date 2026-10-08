# Card view prototype research

## Scope

Create a baseline `swc-card-view` and four experimental elements named `swc-card-view-option-1` through `swc-card-view-option-4`. Keep their rendering, registration, stories, tests, and comparison docs together under the card-view component folder. Follow gen2's core/rendering separation for reusable collection behavior.

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

The PR can guide layout metrics, fixtures, geometry, and interaction comparisons. It should be adapted rather than transplanted as a standalone page. The initial baseline proposal is to implement its default RSP semantics model as `swc-card-view`; the four separate elements expose the strategy alternatives.

## Option contracts

| Element                  | Semantics                                              | Navigation                                                                             | Child controls                                                           |
| ------------------------ | ------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `swc-card-view`          | PR default RSP grid, one row per card                  | Sequential horizontal movement in grid; spatial movement in waterfall; spatial Up/Down | Active-card checkbox and actions.                                        |
| `swc-card-view-option-1` | Historical RSP single-column grid with rowheader cards | Sequential Left/Right in both layouts; spatial Up/Down                                 | Active-card checkbox and actions.                                        |
| `swc-card-view-option-2` | Stable single-column layout grid                       | Sequential Left/Right; spatial Up/Down with column-boundary wrapping                   | Active-card checkbox and actions.                                        |
| `swc-card-view-option-3` | Native list/list items                                 | Normal Tab navigation; any arrow shortcut remains supplementary                        | Independently tabbable checkbox, primary action, and secondary actions.  |
| `swc-card-view-option-4` | Feed/articles                                          | Sequential Page Up/Down, normal Tab access                                             | Real checkbox, primary action, and secondary action inside each article. |

Option 2's single-row semantic experiment is a separate optional comparison in the strategy, not its primary wrapping-grid contract. It should not silently replace that contract.

The user replaces the listbox proposal with feed/articles so real checkboxes and child actions remain inside cards. The feed uses sequential Page Up/Down rather than four-direction arrows. Dynamic feed loading is not part of the first fully loaded comparison.

## Verification approach

Use the neighboring Storybook/Vitest story-test pattern to verify registration and then each option's actual roles, selection, primary/child action separation, entry/exit, and keyboard movement. A registration assertion can fail before implementation without relying on a missing-module error.

Exercise both layouts with real, unequal-height card images. For wrapping, check forward and reverse reachability rather than only one boundary. Check that native-list and feed controls stay tabbable and grid child controls are active-card-only.

Verify desktop/mobile rendering, resize behavior, focus preservation, and non-overlapping content in the browser. Automated checks can validate DOM semantics and keyboard behavior but do not verify spoken positional announcements; docs must preserve the screen reader testing caveat.

Use five story files and associated MDX docs pages so each prototype has its own inspectable component and grid/waterfall canvases. Include accessibility notes, pros, cons, and the exact navigation model for each.

## Confirmed scope decisions

- `swc-card-view` adapts the PR's default RSP model, not the entire multi-model comparison application.
- Option 4 uses feed/articles rather than listbox/options, preserving real checkbox and action controls.
- The first comparison stays fully loaded with virtualization deferred.
