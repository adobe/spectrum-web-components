<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Menu Item Link / Menu item link component accessibility specification

<!-- Document title (editable) -->

# Menu item link component accessibility specification

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What a menu item link is](#what-a-menu-item-link-is)
    - [When to use something else](#when-to-use-something-else)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-menu-item-link>`](#recommendations-swc-menu-item-link)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Form-associated custom properties (labels, `ElementInternals`)](#form-associated-custom-properties-labels-elementinternals)
    - [Live regions, loading, and announcements](#live-regions-loading-and-announcements)
    - [Motion (dedicated recommendations subsection)](#motion-dedicated-recommendations-subsection)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
    - [Keyboard testing](#keyboard-testing)
    - [Manual and screen reader testing](#manual-and-screen-reader-testing)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This specification defines proposed accessibility requirements for gen2 `swc-menu-item-link` in Spectrum Web Components, targeting [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA. It covers a navigation destination within a menu. The component exposes one fixed `menuitem` role on its real `<a href>` element, not on the custom-element host.

The component is not implemented in this checkout. These recommendations define accessibility semantics and interaction, not its public API or migration plan. They do not expand the parent menu's current allowed children or change its migration scope.

### Also read

- [Menu component accessibility specification](../menu/component-accessibility-specification.md).
- [Menu migration plan](../menu/migration-plan.md) and [rendering and styling migration analysis](../menu/rendering-and-styling-migration-analysis.md).
- [Menu item component accessibility specification](../menu-item/component-accessibility-specification.md).
- [Menu item radio component accessibility specification](../menu-item-radio/component-accessibility-specification.md).
- [Menu group component accessibility specification](../menu-group/component-accessibility-specification.md).
- [Menu separator component accessibility specification](../menu-separator/component-accessibility-specification.md).
- [Action menu component accessibility specification](../action-menu/component-accessibility-specification.md).
- [React Spectrum S2 Menu](https://react-spectrum.adobe.com/Menu), including its Links guidance.
- [APG navigation menu button example](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-links/).

### What a menu item link is

A menu item link is a navigation row, such as **Help** with **Documentation**, **Support**, and **Release notes** destinations. The anchor is the semantic menu item, receives actual DOM focus, and retains browser link behavior. Activating an enabled row follows its destination once.

`swc-menu-item` and `swc-menu-item-link` share the `menuitem` role but are distinct components. The command item runs an action or follows its separately specified submenu pattern; the link item renders an anchor and navigates. The distinction is native element behavior and role placement, not two different ARIA roles.

### When to use something else

- Use `swc-menu-item` for a command or submenu trigger, without an anchor nested in its label.
- Use a checkbox or radio menu item for a checked setting, not a navigation destination.
- Use an ordinary anchor or link component outside a menu. Do not assign `menuitem` to a standalone link without a containing menu pattern.
- Prefer navigation landmarks, link lists, and the [disclosure navigation pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) for ordinary site navigation. The APG navigation menu button is appropriate only when the complete menu keyboard and focus model is provided.
- Use a form control for a form question. A menu item link is not a form-associated control.

---

## ARIA and WCAG context

### Pattern in the APG

- Follow the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) for the containing trigger and popup, and the [menu and menubar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) for in-menu navigation.
- The [navigation menu button example](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-links/) places `role="menuitem"` on each HTML anchor, not its list-item wrapper. This preserves link behavior when the menu item receives focus. It is an illustrative example, not production-ready code or proof of assistive-technology support.
- Apply the same principle to the custom element: its wrapper must not become a second menu item or focus target around the anchor. Exposing a host menu item with a separately interactive link inside it is not equivalent.
- React Spectrum exposes links through `MenuItem` with `href` and native link options. That API supports the navigation use case; it does not require SWC to combine commands and links in one component or reproduce React's event handling.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Information and relationships (1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | Preserve the menu, optional group, and anchor-menu-item relationships in the composed accessibility tree. |
| [Use of color (1.4.1)](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) | Do not communicate current destination, disabled state, or focus using color alone. |
| [Contrast minimum (1.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | Meet 4.5:1 for normal text and 3:1 for qualifying large text in enabled states. Inactive controls have an exception. |
| [Non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | Necessary focus and destination indicators meet 3:1 against adjacent colors in enabled states. Verify forced-colors rendering too. |
| [Keyboard (2.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) and [no keyboard trap (2.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) | Every destination is keyboard operable. Users can dismiss the menu and continue navigating. |
| [Focus order (2.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html), [focus visible (2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html), and [focus not obscured (2.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) | Focus lands on the anchor, follows menu order, is visibly distinct from current-page state, and is not entirely hidden by author-created content. |
| [Link purpose (2.4.4)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) | The visible label and accessible context identify the destination or purpose. |
| [Label in name (2.5.3)](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) | The accessible name contains the visible label, preferably in the same order. |
| [Target size minimum (2.5.8)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | Verify at least 24 by 24 CSS pixels or a permitted exception for each supported size. |
| [On focus (3.2.1)](https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html) | Opening the menu, moving focus, and hovering do not navigate. |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | Expose one named `menuitem` on the anchor, with disabled and current-page state when applicable. |

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-1343](https://jira.corp.adobe.com/browse/SWC-1343) | Bug | Done | Fixed | Menu multiple-selection keyboard issues |
| [SWC-1941](https://jira.corp.adobe.com/browse/SWC-1941) | Bug | To Do | Unresolved | Keyboard activation fails for menu items inside modal overlay-trigger and popover composition |
| [SWC-2407](https://jira.corp.adobe.com/browse/SWC-2407) | Bug | To Do | Unresolved | Menu items rendered inside another Lit element's shadow DOM are not keyboard accessible |
| [SWC-2408](https://jira.corp.adobe.com/browse/SWC-2408) | Bug | To Do | Unresolved | Menu in overlay-trigger has accessibility problems and does not close with keyboard Escape |

---

## Recommendations: `<swc-menu-item-link>`

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| One semantic role | Prescribe `role="menuitem"` on the real anchor that receives focus. The host must not expose another `menuitem`, `link`, or `button` role or become a separate focus target. Do not expose a consumer role-switching mode. |
| Native link | Use a real `<a href>` for an enabled destination. Keep the destination and supported native link behavior on that anchor, not a hidden proxy anchor or a host click handler that assigns a location. |
| Parent context | Expose the anchor under the containing internal `role="menu"` in the composed tree, directly or through a supported `role="group"`. Wrappers must not introduce another widget or list-item role between the menu and its semantic rows. |
| Accessible name | Derive the anchor's name from visible label content or a valid naming relationship on the anchor. Its accessible name must contain the visible label. Naming only the host is insufficient. |
| Description and supporting content | Associate supporting descriptions with the anchor without folding all supporting text into its name. Noninteractive shortcut or value text must not introduce another focus target. |
| Graphics and external links | Hide redundant icons from the accessible name. Provide a text equivalent for essential image information. When a destination intentionally opens a new tab or window, communicate that outcome accessibly without duplicate icon announcements. An external destination alone does not imply a new browsing context. |
| Disabled | Expose `aria-disabled="true"` on the semantic anchor and keep the row discoverable in the menu's roving sequence. Suppress navigation, download, action, and activation-triggered dismissal for keyboard, pointer, touch, and assistive-technology activation. Native link affordances must not bypass the disabled state. ARIA alone does not prevent navigation. |
| Current destination | When identifying the current page, expose `aria-current="page"` on the anchor. Do not use `aria-checked`, `aria-selected`, or `aria-pressed` for current-page state. Merely moving focus does not change it. |
| Interactive descendants | The anchor is the only interaction target. Do not nest another anchor, button, checkbox, switch, or editable field inside it, or put it inside a second interactive menu-item host. |
| Submenus | A destination link is not also a submenu trigger. Do not add `aria-haspopup` or `aria-expanded` to imply submenu behavior; use the plain menu item's submenu pattern instead. |
| Size and styling | Size, hover, icons, and supporting text do not change role placement. The visible row hit area and focus indication belong to the same anchor interaction, without a second activation surface. |
| Documentation expectations | Demonstrate a complete trigger, menu, and destinations. Distinguish command items from anchor-backed menu items even though both expose `menuitem`; neither becomes form-associated through menu membership. |

### Shadow DOM and cross-root ARIA Issues

The composed accessibility tree must expose one anchor-backed menu item under its menu or group, without a duplicate host menu item or nested link control. Putting `role="menuitem"` on a host and relying on its descendant anchor is not the APG example's structure.

Real DOM focus and managed `tabindex` must reach the anchor, including when it is inside a component shadow root. Focusing only the wrapper or moving focus back from the anchor to the host is insufficient. Use the menu family's roving-focus pattern, not cross-root `aria-activedescendant` references.

Names, descriptions, and applicable states must resolve on the semantic anchor. Attributes on the custom-element host do not automatically name an anchor in its shadow root; string ID references must not depend on resolving across unrelated roots. Verify these outcomes with the accessibility tree and assistive technology. Anchor rendering and any delegation mechanism belong to the component's plan.

### Accessibility tree expectations

The following is a proposed logical tree, not literal custom-element or shadow markup:

```text
button "Help" [expanded=true] [haspopup=menu]
menu "Help"
  menuitem "Documentation" [current=page]
  menuitem "Support"
  menuitem "Release notes" [disabled=true]
```

Each menu-item node corresponds to the anchor itself. Its ARIA role is `menuitem`, not a separate `link` node nested within a host menu item. Exact screen reader wording varies by platform; preserved browser link behavior does not require a separate spoken link role.

Related destinations may appear in a named group when supported by the parent. The group is not another navigation scope or tab stop. Redundant icons must not produce duplicate destination announcements.

### Form-associated custom properties (labels, `ElementInternals`)

Does not apply. `swc-menu-item-link` is not a form-associated control. An anchor navigates or downloads; it does not submit a menu value, participate in constraint validation, or require a form-reset lifecycle. Accessible naming or use of `ElementInternals` does not create form association.

### Live regions, loading, and announcements

Does not apply to the row by default. Do not announce routine focus or navigation twice through a live region. Any client-side destination loading and resulting page-focus announcements belong to the application, not a second row announcement.

### Motion (dedicated recommendations subsection)

Intentionally omitted. This specification adds no row animation requirement. Layer transitions remain the parent menu's responsibility.

### Keyboard and focus

Follow the parent menu's roving-focus pattern, with the anchor as the actual focus target and no extra host tab stop. The parent owns menu navigation and dismissal; it must preserve the anchor's native activation behavior.

The parent `swc-menu` currently collects only direct `swc-menu-item` children. Link rows therefore receive neither managed `tabindex` nor arrow-key focus. Its current command-row handling also cancels <kbd>Enter</kbd> before closing. Satisfying this contract depends on parent support that reaches the link's anchor without canceling its enabled native navigation; see the [menu migration plan](../menu/migration-plan.md).

| Input | Recommended behavior |
| --- | --- |
| <kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd> | Move focus through the parent menu's item sequence, wrapping per its configuration. Focus the anchor for a link row without following its destination. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Move to the first/last item in the current menu list without activating it. |
| <kbd>Enter</kbd> | Follow the enabled anchor once through native link activation. Menu dismissal must not cancel navigation, dispatch another click, or reactivate the menu trigger. |
| <kbd>Space</kbd> | Following the APG navigation menu button example, activate the focused enabled anchor once and prevent page scrolling. Unlike an ordinary standalone anchor, this requires menu keyboard support; it must not add another activation to native <kbd>Enter</kbd> or pointer handling. |
| Pointer or touch activation | Follow the enabled anchor once per activation gesture. Hover, pointer movement, scrolling, and pressing the surrounding noninteractive host are not separate navigation paths. |
| Modified activation and middle click | Preserve platform-native link behavior, including opening another tab/window where applicable and respecting the destination's target or download behavior. Do not replace these gestures with an unmodified synthetic click. |
| Context menu | Preserve the browser's link context menu and destination actions for enabled anchors, without triggering navigation merely by opening it. |
| <kbd>Escape</kbd> | Dismiss through the parent menu and restore the appropriate trigger/parent-item focus without following a destination. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Follow the containing menu's keyboard contract, with a working exit. Do not add a separate tab stop for both the custom-element host and its anchor, or for every link in the closed popup. |
| Printable characters | Follow the parent's optional [printable-character navigation](../menu/component-accessibility-specification.md#printable-character-navigation-optional-not-typeahead). Move focus without navigating. |

Do not reproduce the 1st-gen host-to-anchor proxy-click path. A pointer gesture or native <kbd>Enter</kbd> on the anchor must not be intercepted and replayed as a second synthetic click. Any <kbd>Space</kbd> enhancement must activate that same semantic anchor only once. If application routing cancels native navigation, the menu must not force it through another click or location change.

For activation that leaves the document, allow navigation to complete. When dismissal leaves the current document active, preserve meaningful focus through the parent pattern; do not steal focus back from an application-managed destination. Test new-tab and same-document navigation separately rather than forcing trigger focus for every outcome.

Disabled rows remain discoverable but cannot activate. Test all available destination actions, including modified activation, middle click, and browser context-menu actions, so disabled styling cannot conceal a still-operable navigation path.

This proposed disabled-row focus behavior follows the sibling menu specifications, not React Spectrum's documented `disabledKeys` behavior, which excludes focus. The parent [menu migration plan](../menu/migration-plan.md#blockers-and-open-questions) retains that family-level decision; this specification does not silently resolve it.

---

## Testing

### Automated tests

These are accessibility test requirements for the component's future implementation, not a record of completed testing.

| Kind of test | What to check |
| --- | --- |
| Unit / component semantics | Exactly one `menuitem` role on the anchor; no duplicate host role or focus target; name, description, disabled state, and current-page state resolve on the anchor. Command items remain distinct and do not render links. |
| aXe / Storybook | Full trigger/menu/link composition has valid names, roles, ownership, and no nested interactive controls. Include supported sizes, external-link treatment, supporting descriptions, and disabled rows. |
| Browser keyboard and focus | With trusted input, open the menu, move to link anchors with arrows and Home/End, and activate using <kbd>Enter</kbd> and <kbd>Space</kbd>. Check actual deep focus, dismissal, working exit, and no default-action cancellation by the parent. |
| Native-activation regression | Verify one navigation or download per enabled activation, with no second host-generated click or routing invocation. Check text, icon, and row hit areas; native <kbd>Enter</kbd>; enhanced <kbd>Space</kbd>; pointer/touch; and assistive-technology activation. Synthetic event counts alone are insufficient evidence of native navigation. |
| Native link affordances | Check modified activation, middle click, target behavior, context-menu destination actions, and downloads where supported. Opening a context menu must not navigate. A canceled navigation must not be replayed. |
| Disabled behavior | Disabled rows remain in arrow navigation but cannot navigate, download, invoke actions, or cause activation-triggered dismissal through any supported input or native link affordance. |
| Playwright / ARIA snapshots | The composed menu contains one named menu item per anchor, with applicable disabled/current state and group context, including composition inside another Lit element's shadow root. |
| Visual accessibility | Verify text/indicator contrast, visible unobscured focus, minimum target size or exception, forced colors, and zoom. Current-page, hover, and focus states remain distinguishable. |

### Keyboard testing

Follow the [keyboard testing guide](../../../../gen2/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) on a complete trigger/menu example, not an isolated row.

1. Open from the trigger with <kbd>Enter</kbd>, <kbd>Space</kbd>, and supported arrow keys. Confirm initial focus reaches the appropriate semantic row, including a link anchor.
2. Move among command and link rows when that composition is supported. Confirm arrows and Home/End move actual focus without navigating, and disabled rows remain discoverable.
3. Activate an enabled link separately with <kbd>Enter</kbd> and <kbd>Space</kbd>. Confirm one destination activation, no page scroll from <kbd>Space</kbd>, no trigger reactivation, and no canceled native <kbd>Enter</kbd> default.
4. Repeat with supported modifier keys, middle click, new-tab targets, and same-document destinations. Confirm native outcomes and meaningful remaining-document focus without an extra activation.
5. Dismiss without activation using <kbd>Escape</kbd>, then verify the menu's keyboard exit and focus return. No closed-popup link remains in sequential navigation.
6. Repeat in supported shadow-root and layered compositions, including the keyboard failure scenarios recorded in the Jira table.

### Manual and screen reader testing

Follow the [screen reader testing guide](../../../../gen2/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx). Test VoiceOver with Safari, NVDA with Firefox or Chrome, and JAWS with Chrome or Edge, recording browser, OS, and assistive-technology versions. Add mobile VoiceOver/TalkBack coverage for supported touch presentations; this does not bring the deferred mobile tray into scope.

Confirm each anchor announces its name and menu-item role, with disabled/current-page state and group context when applicable. Verify there is no separate host menu item, duplicate nested link announcement, or extra focus stop. Check that external/new-window information is understandable without redundant icon speech.

Activate enabled destinations using the screen reader's activation command and verify one navigation. Confirm disabled destinations cannot activate, focus-only movement does not navigate, and dismissal restores meaningful focus. Inspect browser link affordances separately; an ARIA snapshot or aXe pass does not prove those behaviors.

---

## Summary checklist

- [ ] One fixed `menuitem` role on the real anchor; no competing host role, extra host tab stop, or nested interactive control.
- [ ] Command and link components remain distinct despite sharing the `menuitem` role; link rows are not submenu triggers or checked settings.
- [ ] Names, descriptions, applicable states, and actual focus resolve on the anchor across supported shadow boundaries.
- [ ] Native link activation occurs once; no host proxy click, duplicate navigation, forced replay after cancellation, or parent cancellation of enabled native navigation.
- [ ] Menu <kbd>Space</kbd> support activates once without scrolling; native <kbd>Enter</kbd>, modified activation, middle click, context-menu actions, and supported target/download behavior remain usable.
- [ ] Disabled destinations remain discoverable but cannot navigate or invoke actions through any supported input or native link affordance.
- [ ] Focus-only navigation, dismissal, working exit, and destination-appropriate focus behavior are verified with trusted input.
- [ ] Component remains non-form-associated; current-page state is not checked/selected state.
- [ ] Storybook demonstrates complete menu composition and supported visual variants; contrast, focus visibility, target size, forced colors, and zoom are checked.
- [ ] Manual screen reader testing verifies name, role, state, group context, and single activation on supported desktop/touch platforms.

---

## References

- [WAI-ARIA 1.2: `menuitem`](https://www.w3.org/TR/wai-aria-1.2/#menuitem).
- [HTML: The `a` element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element).
- [WAI-ARIA APG: Menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/).
- [WAI-ARIA APG: Menu and menubar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/).
- [WAI-ARIA APG: Navigation menu button example](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-links/).
- [WAI-ARIA APG: Disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/).
- [WAI-ARIA APG: Read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/).
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- [React Spectrum S2 Menu](https://react-spectrum.adobe.com/Menu). The current Links guidance and full API were reviewed through its Markdown documentation; this is not source-level React implementation verification.
- Figma: user-supplied `S2 _ Web (3).pdf`, pages 2, 3, and 4, including destination descriptions, sizes, external-link treatment, and default/hover/disabled rows. This is the same export used for the sibling menu specifications. It does not define keyboard behavior, role placement, or event handling.
- [Menu migration plan](../menu/migration-plan.md).
- [Menu rendering and styling migration analysis](../menu/rendering-and-styling-migration-analysis.md).
- [Menu component accessibility specification](../menu/component-accessibility-specification.md).
- [Menu item component accessibility specification](../menu-item/component-accessibility-specification.md).
- [Menu item radio component accessibility specification](../menu-item-radio/component-accessibility-specification.md).
- [Menu group component accessibility specification](../menu-group/component-accessibility-specification.md).
- [Menu separator component accessibility specification](../menu-separator/component-accessibility-specification.md).
- [Action menu component accessibility specification](../action-menu/component-accessibility-specification.md).
- [Focusgroup navigation controller](../../../../gen2/packages/core/controllers/focusgroup-navigation-controller/focusgroup-navigation-controller.mdx).
- [Current parent menu implementation](../../../../gen2/packages/core/components/menu/Menu.base.ts).
- [1st-gen menu item](../../../../1st-gen/packages/menu/src/MenuItem.ts), including the host click-capture proxy and anchor-to-host focus proxy.
- Jira status and resolution snapshots: same issue list supplied November 3, 2026 for the checkbox/radio specifications; not live-verified. The multiple-selection issue is retained as shared menu-family history, not a link-item selection requirement.
- [gen2 Storybook: Keyboard testing](../../../../gen2/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx).
- [gen2 Storybook: Screen reader testing](../../../../gen2/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx).
