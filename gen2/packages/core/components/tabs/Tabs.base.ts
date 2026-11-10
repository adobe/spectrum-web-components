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
import { PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';

import {
  focusgroupNavigationActiveChange,
  type FocusgroupNavigationActiveChangeDetail,
  FocusgroupNavigationController,
} from '@adobe/spectrum-wc-core/controllers/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import {
  resolveEnum,
  validateEnum,
  warnIf,
} from '@adobe/spectrum-wc-core/utils/index.js';

import {
  KEYBOARD_ACTIVATION_DEFAULT,
  KEYBOARD_ACTIVATIONS,
  type KeyboardActivation,
  TAB_DENSITIES,
  TAB_DENSITY_DEFAULT,
  type TabDensity,
  type TabLike,
  type TabPanelLike,
  TABS_DEFAULT_DIRECTION,
  TABS_DIRECTIONS,
  type TabsDirection,
} from './Tabs.types.js';

/**
 * Base class for a tabbed interface container.
 *
 * Manages selection state, tab/panel association, ARIA wiring,
 * keyboard navigation, and event dispatching. Concrete classes
 * supply the stylesheet, render template, and visual behaviors
 * such as the selection indicator.
 *
 * Public API follows the Spectrum 2 / Spectrum Design–aligned surface
 * from the tabs migration plan: `keyboard-activation` and `density`
 * instead of legacy `auto`, `compact`, `quiet`, `emphasized`, and
 * t-shirt `size` attributes.
 *
 * @slot - Tab items (elements with `role="tab"`)
 * @slot tab-panel - Tab panel content (elements with `role="tabpanel"`)
 *
 * @fires change - The selected tab has changed. Cancelable —
 *   calling `preventDefault()` reverts the selection.
 */
export abstract class TabsBase extends SpectrumElement {
  // ─────────────────────────
  //     SHARED API
  // ─────────────────────────

  /**
   * @internal
   *
   * Valid direction values for validation and CEM/stories.
   */
  static readonly VALID_DIRECTIONS: readonly TabsDirection[] = TABS_DIRECTIONS;

  /**
   * @internal
   */
  static readonly VALID_KEYBOARD_ACTIVATIONS: readonly KeyboardActivation[] =
    KEYBOARD_ACTIVATIONS;

  /**
   * @internal
   */
  static readonly VALID_DENSITIES: readonly TabDensity[] = TAB_DENSITIES;

  /**
   * Whether selection follows keyboard focus (`automatic`, default) or the
   * user must press Enter or Space to activate (`manual`). Prefer `manual`
   * when tab panels are expensive to render or not fully present in the DOM.
   *
   * @see https://w3c.github.io/aria-practices/#kbd_selection_follows_focus
   */
  @property({
    type: String,
    reflect: true,
    attribute: 'keyboard-activation',
    // A removed attribute resets to the default rather than `null`.
    converter: {
      fromAttribute: (value: string | null) =>
        value ?? KEYBOARD_ACTIVATION_DEFAULT,
    },
  })
  public keyboardActivation: KeyboardActivation = KEYBOARD_ACTIVATION_DEFAULT;

  /**
   * Layout density: `regular` (default) or `compact` (reduced tab spacing).
   */
  @property({
    type: String,
    reflect: true,
    converter: {
      fromAttribute: (value: string | null) => value ?? TAB_DENSITY_DEFAULT,
    },
  })
  public density: TabDensity = TAB_DENSITY_DEFAULT;

  /**
   * The layout direction of the tab list: `horizontal` (default) or `vertical`.
   *
   * @default 'horizontal'
   */
  @property({
    type: String,
    reflect: true,
    converter: {
      fromAttribute: (value: string | null) => value ?? TABS_DEFAULT_DIRECTION,
    },
  })
  public direction: TabsDirection = TABS_DEFAULT_DIRECTION;

  /**
   * Whether the entire tab list is disabled. When `true`,
   * `aria-disabled="true"` is applied to the tablist element and
   * all interaction is suppressed.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Accessible label for the tablist. Rendered as `aria-label` on the
   * element with `role="tablist"` in the concrete template.
   */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel = '';

  /**
   * The `tab-id` of the currently selected tab. Setting this property
   * updates which tab appears selected and which panel is visible.
   */
  @property({ type: String, reflect: true })
  public selected = '';

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  /** @internal */
  private static readonly INDICATOR_BASE_SIZE = 100;

  /**
   * @internal
   *
   * The direction used for layout and navigation. Invalid values are kept on
   * `direction` as set and resolve to the default here.
   */
  protected get resolvedDirection(): TabsDirection {
    return resolveEnum(this.direction, TABS_DIRECTIONS, TABS_DEFAULT_DIRECTION);
  }

  /**
   * @internal
   *
   * The keyboard activation mode used for navigation. Invalid values are kept
   * on `keyboardActivation` as set and resolve to the default here.
   */
  protected get resolvedKeyboardActivation(): KeyboardActivation {
    return resolveEnum(
      this.keyboardActivation,
      KEYBOARD_ACTIVATIONS,
      KEYBOARD_ACTIVATION_DEFAULT
    );
  }

  /**
   * @internal
   *
   * Inline style applied to the selection indicator element.
   * Computed from the selected tab's position and dimensions.
   */
  @state()
  protected selectionIndicatorStyle = '';

  /**
   * @internal
   *
   * Suppresses the transition on the very first indicator placement
   * so it doesn't animate from the origin.
   */
  @state()
  protected shouldAnimate = false;

  /**
   * @internal
   *
   * Cached list of tab elements managed by this container. Updated
   * via `handleTabSlotChange`.
   */
  private _tabs: TabLike[] = [];

  // Shared by every instance, so a link written by one tabs container is
  // still treated as component-owned when the element moves to another one.
  private static readonly managedPanelLabels = new WeakMap<
    TabPanelLike,
    string
  >();

  private static readonly managedTabControls = new WeakMap<TabLike, string>();

  /**
   * @internal
   *
   * Manages roving tabindex and arrow-key / Home / End focus movement within
   * the tab list. Direction is kept in sync with `resolvedDirection` via
   * `setOptions` in `willUpdate`. Disabled tabs remain in the navigation
   * sequence (per APG) but are not activatable.
   *
   * `getItems` returns an empty array when the container is disabled so all
   * tabs lose their tab stop, matching the `aria-disabled` tablist behavior.
   */
  private readonly _navigation = new FocusgroupNavigationController(this, {
    direction: this.resolvedDirection,
    wrap: true,
    memory: true,
    getItems: () => (this.disabled ? [] : (this._tabs as HTMLElement[])),
  });

  /**
   * Handles `focusgroupNavigationActiveChange` events dispatched by
   * `_navigation`. In automatic activation mode, selects the newly focused
   * tab (unless it is disabled).
   *
   * Only `source: 'keyboard'` (arrow keys, Home/End) and `source: 'focus'`
   * (pointer click, Tab-key entry) represent a real focus move that
   * "selection follows focus" should react to. `'refresh'` and
   * `'programmatic'` fire when `_navigation` re-parks the roving tab stop
   * without anyone actually moving focus there — for example on mount or when
   * re-enabling after `disabled` — and must not trigger a spurious selection
   * or `change` event.
   */
  private readonly _handleNavigationActiveChange = (event: Event): void => {
    if (this.resolvedKeyboardActivation !== 'automatic') {
      return;
    }
    const { activeElement, source } = (
      event as CustomEvent<FocusgroupNavigationActiveChangeDetail>
    ).detail;
    if (source !== 'keyboard' && source !== 'focus') {
      return;
    }
    if (!activeElement) {
      return;
    }
    const tab = activeElement as TabLike;
    if (tab.disabled) {
      return;
    }
    this.selectTarget(tab);
  };

  /**
   * Whether an assigned node is treated as a tab. `role="tab"` is set in
   * each tab's `connectedCallback`, but a `swc-tab` that is not yet defined
   * when `slotchange` runs has no role — accept the tag name so it is still
   * registered.
   */
  private static isTabSlotNode(el: Element): el is TabLike {
    if (!(el instanceof HTMLElement)) {
      return false;
    }
    if (el.getAttribute('role') === 'tab') {
      return true;
    }
    return el.localName === 'swc-tab';
  }

  /**
   * Called by the concrete class when the default slot's content
   * changes. Rebuilds the internal tab list and syncs selection
   * state.
   */
  protected handleTabSlotChange(event: Event): void {
    const slot = event.target as HTMLSlotElement;
    this._tabs = slot
      .assignedElements()
      .filter(TabsBase.isTabSlotNode) as TabLike[];

    this._navigation.refresh();
    this.updateCheckedState();
    this.updateSelectionIndicator();
    // Tabs can change without the panel slot changing, so relink the panels.
    this.syncPanels();
  }

  /**
   * Called by the concrete class when the `tab-panel` slot's content
   * changes. Wires up `aria-controls` / `aria-labelledby` between
   * each tab and its panel.
   */
  protected handlePanelSlotChange(_event: Event): void {
    this.syncPanels();
  }

  /**
   * Click handler bound to the tablist wrapper in the concrete
   * template. Activates the clicked tab.
   */
  protected handleClick(event: Event): void {
    if (this.disabled) {
      return;
    }

    const target = event
      .composedPath()
      .find((el) => (el as TabLike).parentElement === this) as
      | TabLike
      | undefined;

    if (!target || target.disabled) {
      return;
    }

    this.selectTarget(target);
  }

  /**
   * Keyboard handler for Enter and Space activation. Arrow-key, Home, and
   * End navigation is handled by `FocusgroupNavigationController` in capture
   * phase on the host element.
   */
  protected handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    const { code } = event;
    if (code === 'Enter' || code === 'Space') {
      event.preventDefault();
      const target = event.target as TabLike | null;
      if (target && !target.disabled) {
        this.selectTarget(target);
      }
    }
  }

  /**
   * Attempts to select the given tab element. Dispatches a cancelable
   * `change` event — if the consumer calls `preventDefault()`, the
   * selection reverts to the previous value.
   */
  private selectTarget(target: TabLike): void {
    const id = target.tabId;
    if (!id || id === this.selected) {
      return;
    }

    const previous = this.selected;
    this.selected = id;

    // Sync child tab.selected eagerly so that change-event handlers read the
    // correct state on individual tab elements without waiting for the next
    // Lit render cycle (tabs.selected is already updated synchronously above).
    this.updateCheckedState();

    const applyDefault = this.dispatchEvent(
      new Event('change', {
        cancelable: true,
      })
    );

    if (!applyDefault) {
      this.selected = previous;
    }
  }

  /**
   * Synchronizes the `selected` property on each child tab to match
   * `this.selected`, then parks the roving tab stop on the selected tab via
   * `_navigation.setActiveItem`. Tabindex management is otherwise owned by
   * `FocusgroupNavigationController` — for example, `_navigation.refresh()`
   * resets all tabindex values when the tab list or `disabled` state changes.
   */
  private updateCheckedState(): void {
    for (const tab of this._tabs) {
      tab.selected = false;
    }

    if (this.selected) {
      const currentTab = this._tabs.find((el) => el.tabId === this.selected);

      if (currentTab) {
        currentTab.selected = true;
        this._navigation.setActiveItem(currentTab as HTMLElement);
      } else {
        this.selected = '';
      }
    }
  }

  /**
   * Wires up cross-element ARIA relationships between tabs and
   * panels. Each tab gets `aria-controls` pointing at its panel's
   * `id`, and each panel gets `aria-labelledby` pointing at its
   * tab's `id`. Values set here are removed when the link goes away;
   * consumer-provided values are kept.
   *
   * Both lists are read from the slots on every call, so a tab is never
   * linked to a panel (or a panel to a tab) that was already removed.
   */
  private syncPanels(): void {
    const tabs = this.assignedTo('slot:not([name]), slot[name=""]').filter(
      TabsBase.isTabSlotNode
    ) as TabLike[];
    const panels = this.assignedTo('slot[name="tab-panel"]') as TabPanelLike[];
    const linkedTabs = new Set<TabLike>();

    for (const panel of panels) {
      const { tabId, id } = panel;
      // Plain `role="tab"` elements have no `tabId` property, so fall back
      // to the attribute.
      const tab = tabId
        ? tabs.find((el) => (el.tabId ?? el.getAttribute('tab-id')) === tabId)
        : undefined;

      if (tab) {
        TabsBase.setManagedAttribute(
          tab,
          'aria-controls',
          id,
          TabsBase.managedTabControls
        );
        linkedTabs.add(tab);
        TabsBase.setManagedAttribute(
          panel,
          'aria-labelledby',
          tab.id,
          TabsBase.managedPanelLabels
        );
      } else {
        TabsBase.clearManagedAttribute(
          panel,
          'aria-labelledby',
          TabsBase.managedPanelLabels
        );
      }

      panel.selected = tabId === this.selected;
    }

    for (const tab of tabs) {
      if (!linkedTabs.has(tab)) {
        TabsBase.clearManagedAttribute(
          tab,
          'aria-controls',
          TabsBase.managedTabControls
        );
      }
    }
  }

  private assignedTo(selector: string): Element[] {
    return (
      this.renderRoot
        ?.querySelector<HTMLSlotElement>(selector)
        ?.assignedElements() ?? []
    );
  }

  /**
   * Sets an ARIA reference. This component owns the attribute only while it
   * is absent or still holds the last value written here. If the consumer
   * set or changed it, their value is kept and no longer tracked.
   */
  private static setManagedAttribute<T extends Element>(
    el: T,
    name: string,
    value: string,
    managed: WeakMap<T, string>
  ): void {
    const current = el.getAttribute(name);
    if (current !== null && current !== managed.get(el)) {
      managed.delete(el);
      return;
    }
    if (current !== value) {
      el.setAttribute(name, value);
    }
    managed.set(el, value);
  }

  /**
   * Removes an ARIA reference only if this component set it and it was not
   * changed since.
   */
  private static clearManagedAttribute<T extends Element>(
    el: T,
    name: string,
    managed: WeakMap<T, string>
  ): void {
    if (managed.has(el) && el.getAttribute(name) === managed.get(el)) {
      el.removeAttribute(name);
    }
    managed.delete(el);
  }

  // ───────────────────────────────────
  //     SELECTION INDICATOR
  // ───────────────────────────────────

  /**
   * @internal
   *
   * Recalculates the selection indicator's position and size based
   * on the currently selected tab element. Uses CSS transforms for
   * smooth animation between tab positions.
   *
   * The indicator is a fixed-size element (100px base) that gets
   * `scaleX`/`scaleY` to match the selected tab's width/height,
   * and `translateX`/`translateY` to match its offset position.
   */
  protected updateSelectionIndicator = async (): Promise<void> => {
    const selectedElement = this._tabs.find((el) => el.selected);
    if (!selectedElement) {
      this.selectionIndicatorStyle =
        'transform: translateX(0px) scaleX(0) scaleY(0)';
      return;
    }

    const tablist = this.renderRoot?.querySelector('.tablist');
    if (!tablist) {
      return;
    }

    await Promise.all([
      (selectedElement as HTMLElement & { updateComplete?: Promise<boolean> })
        .updateComplete ?? Promise.resolve(),
      document.fonts ? document.fonts.ready : Promise.resolve(),
    ]);

    const tabRect = selectedElement.getBoundingClientRect();
    const listRect = tablist.getBoundingClientRect();

    if (this.resolvedDirection === 'horizontal') {
      const isRtl = getComputedStyle(this).direction === 'rtl';
      const offset = isRtl
        ? tabRect.right - listRect.right
        : tabRect.left - listRect.left;
      const scale = tabRect.width / TabsBase.INDICATOR_BASE_SIZE;
      this.selectionIndicatorStyle = `transform: translateX(${offset}px) scaleX(${scale})`;
    } else {
      const top = tabRect.top - listRect.top;
      const scale = tabRect.height / TabsBase.INDICATOR_BASE_SIZE;
      this.selectionIndicatorStyle = `transform: translateY(${top}px) scaleY(${scale})`;
    }

    if (!this.shouldAnimate) {
      await this.updateComplete;
      this.shouldAnimate = true;
    }
  };

  /** @internal */
  private _resizeObserver?: ResizeObserver;

  /**
   * @internal
   *
   * Watches for `dir` attribute changes so the indicator recalculates
   * when writing direction flips at runtime. `getComputedStyle` in
   * `updateSelectionIndicator` resolves inherited direction correctly,
   * but nothing else observes it: a `dir` flip on the document root or
   * an ancestor doesn't resize this element, so the `ResizeObserver`
   * below won't catch it. Mirrors the `dir`-watching pattern in
   * `placement-controller.ts`.
   */
  private _directionObserver?: MutationObserver;

  // ───────────────────────────────────
  //     LIFECYCLE
  // ───────────────────────────────────

  protected override willUpdate(changes: PropertyValues): void {
    if (!this.hasUpdated) {
      const selectedChild = this.querySelector(
        ':scope > [selected]'
      ) as TabLike | null;

      if (selectedChild) {
        this.selectTarget(selectedChild);
      }
    }

    super.willUpdate(changes);

    if (changes.has('selected')) {
      if (this._tabs.length) {
        this.updateCheckedState();
      }

      const previousValue = changes.get('selected') as string | undefined;
      if (previousValue) {
        const previous = this.querySelector(
          `[role="tabpanel"][tab-id="${previousValue}"]`
        ) as TabPanelLike | null;

        if (previous) {
          previous.selected = false;
        }
      }

      const next = this.querySelector(
        `[role="tabpanel"][tab-id="${this.selected}"]`
      ) as TabPanelLike | null;

      if (next) {
        next.selected = true;
      }

      this.updateSelectionIndicator();
    }

    if (changes.has('disabled') && this._tabs.length) {
      this._navigation.refresh();
      if (this.disabled) {
        // When disabled, getItems() returns [] so the controller's cleanup
        // loop in refresh() iterates nothing. Explicitly remove all tabs from
        // the tab order so the tablist is fully inert.
        for (const tab of this._tabs) {
          (tab as HTMLElement).tabIndex = -1;
        }
      } else {
        // After re-enabling, restore the roving tab stop to the selected tab.
        this.updateCheckedState();
      }
    }

    if (changes.has('direction')) {
      this._navigation.setOptions({ direction: this.resolvedDirection });
      this.updateSelectionIndicator();
    }
  }

  protected override update(changes: PropertyValues): void {
    validateEnum(this, {
      prop: 'direction',
      value: this.direction,
      valid: TABS_DIRECTIONS,
      url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-tabs--docs',
    });
    validateEnum(this, {
      prop: 'density',
      value: this.density,
      valid: TAB_DENSITIES,
      url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-tabs--docs',
    });
    validateEnum(this, {
      prop: 'keyboard-activation',
      value: this.keyboardActivation,
      valid: KEYBOARD_ACTIVATIONS,
      url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-tabs--docs',
    });
    super.update(changes);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener(
      focusgroupNavigationActiveChange,
      this._handleNavigationActiveChange
    );
    window.addEventListener('resize', this.updateSelectionIndicator);
    if ('fonts' in document) {
      document.fonts.addEventListener(
        'loadingdone',
        this.updateSelectionIndicator
      );
    }
    this._resizeObserver = new ResizeObserver(() => {
      this.updateSelectionIndicator();
    });
    this._resizeObserver.observe(this);

    this._directionObserver = new MutationObserver(() => {
      this.updateSelectionIndicator();
    });
    const observeDir = (node: Element | null | undefined) => {
      if (node) {
        this._directionObserver?.observe(node, {
          attributes: true,
          attributeFilter: ['dir'],
        });
      }
    };
    observeDir(this.ownerDocument.documentElement);
    observeDir(this.closest('[dir]'));
  }

  public override disconnectedCallback(): void {
    this.removeEventListener(
      focusgroupNavigationActiveChange,
      this._handleNavigationActiveChange
    );
    window.removeEventListener('resize', this.updateSelectionIndicator);
    if ('fonts' in document) {
      document.fonts.removeEventListener(
        'loadingdone',
        this.updateSelectionIndicator
      );
    }
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    this._directionObserver?.disconnect();
    this._directionObserver = undefined;
    super.disconnectedCallback();
  }

  /**
   * Focuses the selected tab, or the first tab when none is selected yet.
   * Slotted tabs live in the light DOM; this is more reliable than relying
   * only on shadow `delegatesFocus` across browsers and test harnesses.
   */
  public override focus(options?: FocusOptions): void {
    if (this.disabled) {
      return;
    }

    const selectedTab = this._tabs.find((tab) => tab.selected);
    if (selectedTab) {
      (selectedTab as HTMLElement).focus(options);
      return;
    }

    if (this._tabs.length) {
      (this._tabs[0] as HTMLElement).focus(options);
      return;
    }

    super.focus(options);
  }

  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);

    if (!this.hasAttribute('direction')) {
      this.setAttribute('direction', this.direction);
    }

    warnIf(
      this,
      !this.accessibleLabel,
      `<${this.localName}> requires an "accessible-label" attribute to provide an accessible name for the tablist.`,
      'https://spectrum-web-components.adobe.com/?path=/docs/components-tabs--docs',
      { type: 'accessibility', level: 'high' }
    );
  }

  /**
   * Waits for all child tab elements to finish their update cycle
   * before resolving so layout-dependent callers see stable geometry.
   */
  public override async getUpdateComplete(): Promise<boolean> {
    const complete = await super.getUpdateComplete();

    const children = [...this.children] as HTMLElement[];
    const childUpdates = children.map((child) => {
      if ('updateComplete' in child) {
        return (child as unknown as { updateComplete: Promise<boolean> })
          .updateComplete;
      }
      return Promise.resolve(true);
    });

    await Promise.all(childUpdates);
    return complete;
  }
}
