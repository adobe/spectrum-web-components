/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import './demo-hosts.js';

// ────────────────
//    API (Storybook ApiTable — see `meta.parameters.controllerApi`)
// ────────────────

const RADIO_CONTROLLER_API = {
  title: 'RadioController',
  options: [
    {
      name: 'getItems',
      type: '() => HTMLElement[]',
      defaultValue: '(required)',
      description:
        'Returns the current mutually exclusive participants. Items outside the reactive host subtree are ignored.',
    },
    {
      name: 'selectItem',
      type: '(item: HTMLElement) => void',
      defaultValue: '(required)',
      description:
        'Called when an item becomes the exclusive winner (for example set aria-checked or aria-expanded).',
    },
    {
      name: 'deselectItem',
      type: '(item: HTMLElement) => void',
      defaultValue: '(required)',
      description:
        'Called for every other scoped item whenever the asserted item changes so losers update DOM or ARIA.',
    },
    {
      name: 'toggles',
      type: 'boolean | undefined',
      defaultValue: 'false',
      description:
        'When true, setSelectedItem(null) may clear every asserted item (subject to defaultToFirstSelectable), and a primary click or toggleItem on the already-selected item can clear selection.',
    },
    {
      name: 'defaultToFirstSelectable',
      type: 'boolean | undefined',
      defaultValue: 'false',
      description:
        'When true, refresh selects the first eligible item if nothing is currently asserted.',
    },
    {
      name: 'keydownActivation',
      type: 'boolean | undefined',
      defaultValue: 'false',
      description:
        'When true, Enter or Space on an eligible item asserts it (manual keyboard activation). Pair with FocusgroupNavigationController for arrow keys and roving tabindex.',
    },
    {
      name: 'onSelectionChange',
      type: '(detail: RadioControllerSelectionChangeDetail) => void',
      defaultValue: 'undefined',
      description:
        'Optional callback with the same payload as the swc-radio-controller-selection-change event.',
    },
    {
      name: 'confirmSelectionChange',
      type: '(detail: RadioControllerConfirmSelectionChangeDetail) => boolean',
      defaultValue: 'undefined',
      description:
        'Optional gate before select/deselect mutators; return false to abort (DOM unchanged).',
    },
    {
      name: 'selectionBinding',
      type: 'RadioControllerSelectionKeyBinding',
      defaultValue: 'undefined',
      description:
        'Optional string key parallel to HTMLElement selection (getKey, resolveKey, optional hostCommit).',
    },
  ],
  methods: [
    {
      name: 'constructor',
      signature:
        'new RadioController(host: ReactiveElement, options: RadioControllerOptions)',
      returns: 'RadioController',
      description:
        'Registers the controller on the Lit host via host.addController(this).',
    },
    {
      name: 'getSelectedItem',
      signature: 'getSelectedItem()',
      returns: 'HTMLElement | null',
      description:
        'Returns the last asserted exclusive item, or null when none.',
    },
    {
      name: 'getSelectedKey',
      signature: 'getSelectedKey()',
      returns: 'string',
      description:
        'When selectionBinding is set, returns current, previewed, or pending key.',
    },
    {
      name: 'syncSelectedKey',
      signature:
        'syncSelectedKey(key: string, options?: { silent?: boolean }): void',
      returns: 'void',
      description:
        'Programmatic key sync; silent skips hostCommit and confirmSelectionChange.',
    },
    {
      name: 'flushPendingSelectedKey',
      signature: 'flushPendingSelectedKey(): void',
      returns: 'void',
      description:
        'After getItems is non-empty, resolves an early pending key (e.g. attribute before slot).',
    },
    {
      name: 'setOptions',
      signature: 'setOptions(partial: Partial<RadioControllerOptions>): void',
      returns: 'void',
      description: 'Merges option updates and runs refresh().',
    },
    {
      name: 'setSelectedItem',
      signature: 'setSelectedItem(candidate: HTMLElement | null): boolean',
      returns: 'boolean',
      description:
        'Asserts candidate or clears to null when toggles is true; returns false when the item is ineligible, disabled, or clearing is not allowed.',
    },
    {
      name: 'toggleItem',
      signature: 'toggleItem(item: HTMLElement): boolean',
      returns: 'boolean',
      description:
        'Selects item when it is not active. When toggles is true and item is already selected, clears to null if allowed; otherwise returns false.',
    },
    {
      name: 'refresh',
      signature: 'refresh(): void',
      returns: 'void',
      description:
        'Re-applies selection after DOM or eligibility changes (stale selection, defaultToFirstSelectable, etc.).',
    },
    {
      name: 'hostConnected',
      signature: 'hostConnected(): void',
      returns: 'void',
      description:
        'Lit ReactiveController: registers capture-phase click on the host, optionally capture-phase keydown when keydownActivation is true, and calls refresh().',
    },
    {
      name: 'hostDisconnected',
      signature: 'hostDisconnected(): void',
      returns: 'void',
      description:
        'Lit ReactiveController: removes capture-phase click and any keydown listener registered for keydownActivation.',
    },
  ],
  events: [
    {
      name: 'swc-radio-controller-selection-change',
      detail: '{ selectedItem: HTMLElement | null }',
      description:
        'Bubbles and composed; dispatched whenever the tracked exclusive item changes.',
    },
  ],
  exports: [
    {
      name: 'radioControllerSelectionChange',
      kind: 'constant',
      description:
        'String event name for swc-radio-controller-selection-change (use with addEventListener).',
    },
    {
      name: 'deepestRadioItemContaining',
      kind: 'function',
      description:
        'Returns the deepest node on event.composedPath() that appears in the supplied items array.',
    },
    {
      name: 'RadioControllerSelectionChangeDetail',
      kind: 'type',
      description: 'TypeScript detail shape for the selection change event.',
    },
    {
      name: 'RadioControllerConfirmSelectionChangeDetail',
      kind: 'type',
      description:
        'Payload for confirmSelectionChange: candidate and prior exclusive HTMLElement (after roster normalization).',
    },
    {
      name: 'RadioControllerSelectionKeyBinding',
      kind: 'type',
      description:
        'getKey, resolveKey, optional hostCommit — mirrors a string id next to HTMLElement selection.',
    },
    {
      name: 'RadioControllerHostCommitDetail',
      kind: 'type',
      description:
        'candidateKey and priorKey passed to selectionBinding.hostCommit.',
    },
  ],
} as const;

// ────────────────
//    METADATA
// ────────────────

/**
 * `RadioController` enforces **one asserted sibling at a time** inside your reactive host. You
 * supply **`getItems`** (who participates) and **`selectItem` / `deselectItem`** (how DOM or ARIA
 * reflects the winner and the losers). Optional **`confirmSelectionChange`** and **`selectionBinding`**
 * gate transitions or mirror a string **key** (see **`swc-tabs`**). Use
 * **`FocusgroupNavigationController`** separately when the composite also needs arrow keys, roving
 * **`tabindex`**, or focus memory. It does **not** wire native
 * `<input type="radio">`; use it for custom roles (`radio`, `menuitemradio`, accordion headers, and similar).
 *
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-rating/ | APG rating radio group}
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/menubar/ | APG menu / menubar}
 * @see {@link https://opensource.adobe.com/spectrum-web-components/components/accordion/#sizes | Spectrum accordion}
 */
const meta: Meta = {
  title: 'Controllers/Radio controller',
  component: 'demo-radio-group-rating',
  parameters: {
    docs: {
      subtitle:
        'Exclusive selection via pointer, optional Enter/Space (keydownActivation), confirmSelectionChange, and selectionBinding.',
      canvas: { sourceState: 'none' },
    },
    controllerApi: RADIO_CONTROLLER_API,
  },
  tags: ['migrated', 'controller'],
  render: () => html`
    <demo-radio-group-rating></demo-radio-group-rating>
  `,
};

export default meta;

type Story = StoryObj;

// ──────────────────────────
//    AUTODOCS STORY
// ──────────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  tags: ['overview'],
};

// ──────────────────────────
//    BASIC USAGE STORY
// ──────────────────────────

/**
 * ## Anatomy of a `RadioController`
 *
 * The `RadioController` is a contructor with the following parameters:
 * - `host: ReactiveElement` - the host element
 * - `options: RadioControllerOptions` - the options for the controller
 *   - `getItems: () => HTMLElement[]` - the function that returns the current list of `HTMLElement` nodes
 *   - `selectItem: (item: HTMLElement) => void` - the function that is called when the item is selected
 *   - `deselectItem: (item: HTMLElement) => void` - the function that is called when the item is deselected
 *   - `toggles: boolean` - optional: whether the controller allows toggling the item
 *   - `defaultToFirstSelectable: boolean` - optional: whether the controller should select the first item if no item is selected
 *   - `keydownActivation: boolean` - optional: when true, **Enter** / **Space** on an eligible item asserts it (manual keyboard activation); pair with **FocusgroupNavigationController** for arrow keys
 *   - `onSelectionChange: (detail: RadioControllerSelectionChangeDetail) => void` - optional: the function that is called when the selection changes
 *   - `confirmSelectionChange: (detail: RadioControllerConfirmSelectionChangeDetail) => boolean` - optional: called **before** mutators; return **false** to abort (DOM unchanged)
 *   - `selectionBinding: RadioControllerSelectionKeyBinding` - optional: **`getKey`**, **`resolveKey`**, optional **`hostCommit`** for a host-facing string key (for example **`tab-id`** on **`swc-tabs`**)
 *
 * ```typescript
 * import { RadioController } from '@spectrum-web-components/core/controllers';
 *
 * private readonly radios = new RadioController(this, {
 *   getItems: () => [...],
 *   selectItem: (el) => { ... },
 *   deselectItem: (el) => { ... },
 *   keydownActivation: true,
 * });
 * ```
 *
 * ### `getItems`
 *
 * Pass a **function** (not a static array) that returns the current list of `HTMLElement` nodes
 * that should behave as one mutually exclusive set — for example every `button[role="radio"]`
 * inside `this.renderRoot`.
 *
 * **Rules the controller applies:**
 *
 * - Only nodes **inside the reactive host’s subtree** count (light DOM children and shadow
 *   descendants; nodes outside the host are ignored).
 * - Disconnected, `[inert]`, `hidden`, or `display: none` / `visibility: hidden` items are
 *   skipped for interaction.
 * - Native **`disabled`** and **`aria-disabled="true"`** are never eligible; primary clicks on
 *   them do not change selection, and **`setSelectedItem`** returns **`false`** for them.
 *
 * **When to refresh:** after the shadow tree exists and whenever the list of controls changes,
 * call **`radios.refresh()`** — typically from `firstUpdated` and from `updated` when your
 * template or slot content changes which elements exist.
 *
 * ```typescript
 * protected override firstUpdated(): void {
 *   this.radios.refresh();
 * }
 *
 * // Also call `this.radios.refresh()` from `updated()` when slots, repeats, or props change
 * // which items exist or their order — any time `getItems()` would return a different array.
 * ```
 *
 * ### `selectItem` and `deselectItem`
 *
 * Whenever the asserted item changes, the controller walks **every** currently scoped raw item
 * from `getItems` (after host filtering) and:
 *
 * - calls **`selectItem`** once on the **new** exclusive item, and
 * - calls **`deselectItem`** on **each** other item in that same raw list.
 *
 * Your callbacks should only update **that element** — for example set or remove attributes,
 * toggle classes, or sync related nodes (such as a sibling panel’s `[hidden]` flag) based on
 * `element.dataset` or `element.id`.
 *
 * **Typical `aria-checked` radios / menu radios:**
 *
 * ```typescript
 * selectItem: (item) => item.setAttribute('aria-checked', 'true'),
 * deselectItem: (item) => item.setAttribute('aria-checked', 'false'),
 * ```
 *
 * The controller does **not** interpret `aria-checked` or `aria-expanded` to infer selection; it
 * only drives your callbacks. Keep visual state and ARIA in sync inside those two functions.
 *
 * ### `confirmSelectionChange` and `selectionBinding`
 *
 * **`confirmSelectionChange`** runs **before** **`selectItem`** / **`deselectItem`**. Return **`false`**
 * to veto the transition so **`selectedItem`** stays on **`prior`** and mutators do not run — use this
 * when the host must run a cancelable event or policy check first.
 *
 * **`selectionBinding`** pairs a **string key** with the asserted **`HTMLElement`**: implement
 * **`getKey`**, **`resolveKey`**, and optionally **`hostCommit`** when the host exposes an id attribute
 * (for example **`swc-tabs`** `selected` / **`tab-id`**). Use **`getSelectedKey()`**,
 * **`syncSelectedKey(key, { silent })`** for programmatic updates (**`silent`** skips **`hostCommit`**
 * and **`confirmSelectionChange`**), and **`flushPendingSelectedKey()`** after **`getItems`** becomes
 * non-empty when the attribute was parsed before slotted tabs existed.
 */
export const Usage: Story = {
  tags: ['usage', 'description-only'],
  parameters: { 'section-order': 0 },
};

/**
 * ## Examples
 * ### Selection with `aria-expanded` and opening a panel
 *
 * **Accordion-style headers** (one expanded section): treat “selected” as expanded and the rest
 * as collapsed — often `selectItem` sets `aria-expanded="true"` and shows a panel, while
 * `deselectItem` sets `aria-expanded="false"` and hides the matching region. Accordion headers
 * typically use **`RadioController` alone** (pointer + `setSelectedItem` only).
 *
 * ```typescript
 * this.accordionRadio = new RadioController(this, {
 *   getItems: () =>
 *     Array.from(
 *       this.renderRoot.querySelectorAll<HTMLButtonElement>('[data-accordion]')
 *     ),
 *   selectItem: (header) => {
 *     header.setAttribute('aria-expanded', 'true');
 *     this.togglePanel(header.dataset.accordion!, true);
 *   },
 *   deselectItem: (header) => {
 *     header.setAttribute('aria-expanded', 'false');
 *     this.togglePanel(header.dataset.accordion!, false);
 *   },
 * });
 * ```
 */
export const UsageExampleSelectionWithAriaExpanded: Story = {
  name: 'Example: selection with `aria-expanded` and opening a panel',
  tags: ['usage'],
  parameters: { 'section-order': 1 },
  render: () => html`
    <demo-radio-accordion-exclusive></demo-radio-accordion-exclusive>
  `,
};

/**
 * ### Selection with `aria-checked`
 *
 * `role="menuitemradio"` siblings with mirrored `aria-checked`, aligned with the APG
 * **[Menu and menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)** pattern.
 *
 * ```typescript
 * this.radios = new RadioController(this, {
 *   getItems: () =>
 *     Array.from(
 *       this.renderRoot.querySelectorAll<HTMLButtonElement>('[data-alignment]')
 *     ),
 *   selectItem: (item) => item.setAttribute('aria-checked', 'true'),
 *   deselectItem: (item) => item.setAttribute('aria-checked', 'false'),
 *   defaultToFirstSelectable: true,
 * });
 * ```
 */
export const UsageExampleSelectionWithAriaChecked: Story = {
  name: 'Example: selection with `aria-checked`',
  tags: ['usage'],
  parameters: { 'section-order': 2 },
  render: () => html`
    <demo-radio-menu-item-radio></demo-radio-menu-item-radio>
  `,
};

/**
 * ### Toggling to deselect
 *
 * Set **`toggles: true`** so **`setSelectedItem(null)`** or a primary click on the already-expanded
 * heading can clear the asserted heading and every panel can close. With **`toggles: false`**, the
 * controller keeps an asserted item whenever the roster is non-empty.
 *
 * ```typescript
 * this.accordionRadio = new RadioController(this, {
 *   getItems: () =>
 *     Array.from(
 *       this.renderRoot.querySelectorAll<HTMLButtonElement>('[data-accordion-heading]')
 *     ),
 *   selectItem: (header) => {
 *     header.setAttribute('aria-expanded', 'true');
 *     this.togglePanel(header.dataset.accordion!, true);
 *   },
 *   deselectItem: (header) => {
 *     header.setAttribute('aria-expanded', 'false');
 *     this.togglePanel(header.dataset.accordion!, false);
 *   },
 *   toggles: true,
 * });
 * ```
 */
export const UsageExampleTogglingToDeselect: Story = {
  name: 'Example: toggling to deselect',
  tags: ['usage'],
  parameters: { 'section-order': 3 },
  render: () => html`
    <demo-radio-accordion-multiple></demo-radio-accordion-multiple>
  `,
};

/**
 * ### Tablist with `FocusgroupNavigationController`
 *
 * For a manual-activation tablist, pair **`FocusgroupNavigationController`** (arrow keys, roving
 * **`tabindex`**, Home/End) with **`RadioController`** (**`keydownActivation: true`** for **Enter**
 * / **Space** selection). Keep selection state (`aria-selected`, panels) in **`selectItem`** /
 * **`deselectItem`**; do not manage **`tabindex`** there.
 *
 * ```typescript
 * import {
 *   FocusgroupNavigationController,
 *   RadioController,
 * } from '@spectrum-web-components/core/controllers';
 *
 * private tabButtons: HTMLButtonElement[] = [];
 *
 * private readonly tabNavigation = new FocusgroupNavigationController(this, {
 *   direction: 'horizontal',
 *   wrap: true,
 *   getItems: () => this.tabButtons,
 * });
 *
 * private readonly tabRadio = new RadioController(this, {
 *   getItems: () => this.tabButtons,
 *   selectItem: (tab) => {
 *     tab.setAttribute('aria-selected', 'true');
 *     this.showPanelForTab(tab);
 *   },
 *   deselectItem: (tab) => {
 *     tab.setAttribute('aria-selected', 'false');
 *     this.hidePanelForTab(tab);
 *   },
 *   keydownActivation: true,
 *   defaultToFirstSelectable: true,
 * });
 * ```
 */
export const UsageExampleTablistWithFocusgroup: Story = {
  name: 'Example: tablist with FocusgroupNavigationController',
  tags: ['usage'],
  parameters: { 'section-order': 4 },
  render: () => html`
    <demo-radio-tabs-focusgroup></demo-radio-tabs-focusgroup>
  `,
};

// ──────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────
export const AccordionExpandedExclusive: Story = {
  name: 'Setting `aria-expanded` and opening a panel on an accordion',
  render: () => html`
    <demo-radio-accordion-exclusive></demo-radio-accordion-exclusive>
  `,
  tags: ['behaviors'],
  parameters: {
    'section-order': 1,
    docs: {
      disable: true,
    },
  },
};
export const AccordionMultipleSectionsAriaExpandedHidden: Story = {
  render: () => html`
    <demo-radio-accordion-multiple></demo-radio-accordion-multiple>
  `,
  tags: ['behaviors'],
  parameters: {
    'section-order': 2,
    docs: {
      disable: true,
    },
  },
};

/**
 * Tablist demo: **`FocusgroupNavigationController`** handles arrow keys and roving **`tabindex`**;
 * **`RadioController`** with **`keydownActivation: true`** handles **Enter** / **Space** selection;
 * pointer still works.
 */
export const TablistWithFocusgroupDemo: Story = {
  name: 'Tablist: FocusgroupNavigationController + RadioController',
  render: () => html`
    <demo-radio-tabs-focusgroup></demo-radio-tabs-focusgroup>
  `,
  tags: ['behaviors'],
  parameters: {
    'section-order': 3,
    docs: {
      disable: true,
    },
  },
};

/**
 * Five-star rating illustrating **`defaultToFirstSelectable`** only (no **`onSelectionChange`**).
 * Rendered under **Setting default selection** on the docs page (no **`dev`** tag, so it stays out
 * of the Storybook sidebar).
 *
 * ```typescript
 * this.radios = new RadioController(this, {
 *   getItems: () =>
 *     Array.from(
 *       this.renderRoot.querySelectorAll<HTMLButtonElement>(
 *         '[data-rating-star-default-first]'
 *       )
 *     ),
 *   selectItem: (star) => star.setAttribute('aria-checked', 'true'),
 *   deselectItem: (star) => star.setAttribute('aria-checked', 'false'),
 *   defaultToFirstSelectable: true,
 *   toggles: false,
 * });
 * ```
 */
export const RatingDefaultFirstSelectable: Story = {
  name: 'Rating: defaultToFirstSelectable',
  render: () => html`
    <demo-radio-rating-default-first></demo-radio-rating-default-first>
  `,
  tags: ['setting-default-selection'],
  parameters: { 'section-order': 0 },
};

/**
 * Same layout, illustrating **`onSelectionChange`** with **`window.alert`** (and **`toggles`** so
 * the active star can be cleared). Rendered under **Behaviors → Responding to selection change** on
 * the docs page (no **`dev`** tag, so it stays out of the Storybook sidebar).
 *
 * ```typescript
 * this.radios = new RadioController(this, {
 *   getItems: () =>
 *     Array.from(
 *       this.renderRoot.querySelectorAll<HTMLButtonElement>(
 *         '[data-rating-star-on-change]'
 *       )
 *     ),
 *   selectItem: (star) => star.setAttribute('aria-checked', 'true'),
 *   deselectItem: (star) => star.setAttribute('aria-checked', 'false'),
 *   defaultToFirstSelectable: false,
 *   toggles: true,
 *   onSelectionChange: ({ selectedItem }) => {
 *     const label =
 *       selectedItem?.getAttribute('aria-label') ?? 'No star selected';
 *     window.alert(`Rating selection: ${label}`);
 *   },
 * });
 * ```
 */
export const RatingOnSelectionChangeAlert: Story = {
  name: 'Rating: onSelectionChange (alert)',
  render: () => html`
    <demo-radio-rating-on-selection-change-alert></demo-radio-rating-on-selection-change-alert>
  `,
  tags: ['responding-to-selection-change'],
  parameters: { 'section-order': 0 },
};

/**
 * ### Methods
 *
 * | Member | Description |
 * |---|---|
 * | `setOptions(partial)` | Merge new options and reapply selection. |
 * | `refresh()` | Re-query items and reassert selection (call after DOM changes). |
 * | `getSelectedItem()` | Returns the asserted item, if any. |
 * | `setSelectedItem(element \| null)` | Assert exclusive item or clear when allowed; returns `false` if ineligible. |
 * | `toggleItem(element)` | Select or clear when `toggles` allows clearing the active item. |
 *
 * ### Events
 *
 * The controller dispatches **`swc-radio-controller-selection-change`**
 * (`radioControllerSelectionChange`) on the host with `detail: { selectedItem }` when the
 * asserted item changes. The event bubbles and is composed.
 *
 * ```typescript
 * import { radioControllerSelectionChange } from
 *   '@spectrum-web-components/core/controllers/radio-controller.js';
 *
 * host.addEventListener(radioControllerSelectionChange, (event) => {
 *   console.log('Selected:', event.detail.selectedItem);
 * });
 * ```
 *
 * ### Options
 *
 * | Option | Type | Default | Description |
 * |---|---|---|---|
 * | `getItems` | `() => HTMLElement[]` | (required) | Current exclusive participants. |
 * | `selectItem` | `(item: HTMLElement) => void` | (required) | Called on the new asserted item. |
 * | `deselectItem` | `(item: HTMLElement) => void` | (required) | Called on every other scoped item. |
 * | `toggles` | `boolean` | `false` | When true, allow clearing to no asserted item (`setSelectedItem(null)`, click or `toggleItem` on the active item). |
 * | `defaultToFirstSelectable` | `boolean` | `false` | When true, `refresh` may select the first eligible item if none asserted. |
 * | `keydownActivation` | `boolean` | `false` | When true, Enter/Space on an eligible item asserts it. Use with FocusgroupNavigationController for arrow keys. |
 * | `onSelectionChange` | `(detail) => void` | — | Callback when selection changes. |
 * | `confirmSelectionChange` | `(detail) => boolean` | — | Before mutators; return false to abort. |
 * | `selectionBinding` | see type | — | String key + resolveKey + optional hostCommit. |
 *
 * See the **API** table above for the full machine-readable contract.
 */
export const API: Story = {
  tags: ['api', 'description-only'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Pointer and eligibility
 *
 * **`RadioController`** resolves primary clicks with **`deepestRadioItemContaining`**. Disabled
 * and **`aria-disabled="true"`** items are never asserted and do not receive selection changes from
 * pointer interaction.
 *
 * ### Keyboard and focus
 *
 * **`RadioController`** does not implement roving **`tabindex`**, arrow keys, Home/End, or
 * programmatic **`focus()`**. Add **`FocusgroupNavigationController`** when the composite needs
 * those behaviors.
 *
 * With **`keydownActivation: true`**, the controller listens for **Enter** and **Space** on the
 * host (capture phase) and asserts the deepest eligible item on the event path (manual keyboard
 * activation). **`swc-tabs`** uses the same option for manual activation while the tab list handles
 * its own arrow-key focus moves.
 *
 * ### ARIA
 *
 * Keep `aria-checked`, `aria-expanded`, and related attributes in sync inside your
 * **`selectItem`** / **`deselectItem`** callbacks; the controller does not infer state from the DOM.
 *
 * ### Cancelable selection (`confirmSelectionChange`, `selectionBinding.hostCommit`)
 *
 * When you need a host **`change`** event (or similar) **before** DOM mutators run — for example
 * **`swc-tabs`** — use **`confirmSelectionChange`** or **`selectionBinding.hostCommit`**. Returning
 * **`false`** or **`preventDefault()`** on the dispatched event aborts the transition; **`getSelectedKey()`**
 * can expose the **pending** key during **`hostCommit`** so listeners see the proposed value.
 */
export const Accessibility: Story = {
  tags: ['a11y', 'description-only'],
};

/**
 * ### See also
 *
 * - [Focusgroup navigation controller](../?path=/docs/controllers-focusgroup-navigation-controller--overview)
 * - [APG rating radio group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-rating/)
 * - [APG menu / menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)
 * - [Spectrum accordion](https://opensource.adobe.com/spectrum-web-components/components/accordion/#sizes)
 */
export const Appendix: Story = {
  tags: ['description-only', 'appendix'],
};
