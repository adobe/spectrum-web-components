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

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

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
   * Whether selection follows keyboard focus (`automatic`) or the user
   * must press Enter or Space to activate (`manual`, default).
   *
   * @see https://w3c.github.io/aria-practices/#kbd_selection_follows_focus
   */
  @property({ type: String, reflect: true, attribute: 'keyboard-activation' })
  public get keyboardActivation(): KeyboardActivation {
    return this._keyboardActivation;
  }

  public set keyboardActivation(value: string) {
    const isValid = (KEYBOARD_ACTIVATIONS as readonly string[]).includes(value);

    if (!isValid && window.__swc?.DEBUG) {
      window.__swc.warn(
        this,
        `<${this.localName}> expects "keyboard-activation" to be one of:`,
        'https://opensource.adobe.com/spectrum-web-components/components/tabs/',
        { issues: [...KEYBOARD_ACTIVATIONS] }
      );
    }

    const valid = isValid
      ? (value as KeyboardActivation)
      : KEYBOARD_ACTIVATION_DEFAULT;

    if (this._keyboardActivation === valid) {
      return;
    }

    const old = this._keyboardActivation;
    this._keyboardActivation = valid;
    this.requestUpdate('keyboardActivation', old);
  }

  private _keyboardActivation: KeyboardActivation = KEYBOARD_ACTIVATION_DEFAULT;

  /**
   * Layout density: `regular` (default) or `compact` (reduced tab spacing).
   */
  @property({ type: String, reflect: true })
  public get density(): TabDensity {
    return this._density;
  }

  public set density(value: string) {
    const isValid = (TAB_DENSITIES as readonly string[]).includes(value);

    if (!isValid && window.__swc?.DEBUG) {
      window.__swc.warn(
        this,
        `<${this.localName}> expects "density" to be one of:`,
        'https://opensource.adobe.com/spectrum-web-components/components/tabs/',
        { issues: [...TAB_DENSITIES] }
      );
    }

    const valid = isValid ? (value as TabDensity) : TAB_DENSITY_DEFAULT;

    if (this._density === valid) {
      return;
    }

    const old = this._density;
    this._density = valid;
    this.requestUpdate('density', old);
  }

  private _density: TabDensity = TAB_DENSITY_DEFAULT;

  /**
   * The layout direction of the tab list.
   *
   * **Breaking change:** `'vertical-right'` is no longer supported.
   * Use `'vertical'` instead.
   *
   * @default 'horizontal'
   */
  @property({ type: String, reflect: true })
  public get direction(): TabsDirection {
    return this._direction;
  }

  public set direction(value: TabsDirection) {
    const isValid = (TABS_DIRECTIONS as readonly string[]).includes(value);

    if (!isValid && window.__swc?.DEBUG) {
      window.__swc.warn(
        this,
        `<${this.localName}> expects the "direction" attribute to be one of the following:`,
        'https://opensource.adobe.com/spectrum-web-components/components/tabs/',
        {
          issues: [...TABS_DIRECTIONS],
        }
      );
    }

    const validDirection = isValid
      ? (value as TabsDirection)
      : TABS_DEFAULT_DIRECTION;

    if (this._direction === validDirection) {
      return;
    }

    const oldDirection = this._direction;
    this._direction = validDirection;
    this.requestUpdate('direction', oldDirection);
  }

  private _direction: TabsDirection = TABS_DEFAULT_DIRECTION;

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

  private static readonly INDICATOR_BASE_SIZE = 100;

  /**
   * Inline style applied to the selection indicator element.
   * Computed from the selected tab's position and dimensions.
   */
  @state()
  protected selectionIndicatorStyle = '';

  /**
   * Suppresses the transition on the very first indicator placement
   * so it doesn't animate from the origin.
   */
  @state()
  protected shouldAnimate = false;

  /**
   * Cached list of tab elements managed by this container. Updated
   * via `handleTabSlotChange`.
   */
  private _tabs: TabLike[] = [];

  /**
   * Whether an assigned node is treated as a tab. `role="tab"` is set in
   * each tab's `firstUpdated`, so `slotchange` may run before that — accept
   * known tab host tag names so the tab list and selection indicator sync.
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
    this.updateCheckedState();
    this.updateSelectionIndicator();
  }

  /**
   * Called by the concrete class when the `tab-panel` slot's content
   * changes. Wires up `aria-controls` / `aria-labelledby` between
   * each tab and its panel.
   */
  protected handlePanelSlotChange(event: Event): void {
    const slot = event.target as HTMLSlotElement;
    const panels = slot.assignedElements() as TabPanelLike[];
    this.managePanels(panels);
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
   * Full keyboard handler per WAI-ARIA APG Tabs pattern.
   *
   * **Horizontal:** Left/Right navigate; Up/Down ignored.
   * **Vertical:** Up/Down navigate; Left/Right ignored.
   * **RTL:** Left/Right swap in `dir="rtl"`.
   * **Wrapping:** Navigation wraps from last to first and vice versa.
   * **Disabled tabs:** Disabled tabs receive focus via arrows but
   * are not activatable by Enter/Space.
   * **Automatic activation:** When `keyboard-activation` is `automatic`,
   * selection follows focus on arrow key navigation.
   * **Home/End:** Jump to first/last tab.
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
      return;
    }

    const delta = this.getNavigationDelta(code);
    if (delta !== null) {
      event.preventDefault();
      this.focusByDelta(delta);
      return;
    }

    if (code === 'Home') {
      event.preventDefault();
      this.focusTabAtIndex(0);
      return;
    }

    if (code === 'End') {
      event.preventDefault();
      this.focusTabAtIndex(this._tabs.length - 1);
      return;
    }
  }

  /**
   * Maps a keyboard code to a navigation delta (+1 or -1) based
   * on orientation and text direction. Returns `null` when the key
   * does not apply to the current orientation.
   */
  private getNavigationDelta(code: string): number | null {
    const isRtl = this.dir === 'rtl';

    if (this._direction === 'horizontal') {
      if (code === 'ArrowRight') {
        return isRtl ? -1 : 1;
      }
      if (code === 'ArrowLeft') {
        return isRtl ? 1 : -1;
      }
      return null;
    }

    // Vertical: Up/Down navigate; Left/Right have no effect.
    if (code === 'ArrowDown') {
      return 1;
    }
    if (code === 'ArrowUp') {
      return -1;
    }
    return null;
  }

  /**
   * Moves focus by `delta` positions from the currently focused tab,
   * wrapping around the list. All tabs (including disabled) receive
   * focus per APG. In automatic activation mode, the newly focused tab
   * is also selected.
   */
  private focusByDelta(delta: number): void {
    if (!this._tabs.length) {
      return;
    }

    const root = this.getRootNode() as Document | ShadowRoot;
    const current = this._tabs.indexOf(root.activeElement as TabLike);
    const start = current === -1 ? 0 : current;
    const nextIndex = this.wrapIndex(start + delta);

    this.focusTabAtIndex(nextIndex);
  }

  /**
   * Focuses the tab at the given index and, when in automatic
   * activation mode, also selects it. Selection runs before `focus()`
   * so `change` listeners observe the updated value before focus moves.
   */
  private focusTabAtIndex(index: number): void {
    if (!this._tabs.length) {
      return;
    }

    const clamped = this.wrapIndex(index);
    const tab = this._tabs[clamped];
    if (!tab) {
      return;
    }

    if (this._keyboardActivation === 'automatic' && !tab.disabled) {
      this.selectTarget(tab);
    }

    this.setRovingTabindex(tab);
    tab.focus();
  }

  /**
   * Wraps an index into the valid range `[0, tabs.length)`.
   */
  private wrapIndex(index: number): number {
    const len = this._tabs.length;
    return ((index % len) + len) % len;
  }

  /**
   * Updates roving tabindex so only the given tab has
   * `tabindex="0"` and all others have `tabindex="-1"`.
   */
  private setRovingTabindex(activeTab: TabLike): void {
    for (const tab of this._tabs) {
      tab.tabIndex = tab === activeTab ? 0 : -1;
    }
  }

  /**
   * Attempts to select the given tab element. Dispatches a cancelable
   * `change` event — if the consumer calls `preventDefault()`, the
   * selection reverts to the previous value.
   */
  private selectTarget(target: TabLike): void {
    const id = target.tabId;
    if (!id) {
      return;
    }

    const previous = this.selected;
    this.selected = id;

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
   * Synchronizes the `selected` attribute and roving tabindex on
   * each child tab to match the container's `selected` value.
   * Ensures at least one tab has `tabindex="0"` for Tab-key entry
   * when the container is not disabled. When the container is
   * disabled, all tabs get `tabindex="-1"` to prevent Tab-key
   * entry into the tab list.
   */
  private updateCheckedState(): void {
    let hasTabStop = false;

    for (const tab of this._tabs) {
      tab.selected = false;
    }

    if (this.selected) {
      const currentTab = this._tabs.find((el) => el.tabId === this.selected);

      if (currentTab) {
        currentTab.selected = true;
        if (!this.disabled) {
          this.setRovingTabindex(currentTab);
          hasTabStop = true;
        }
      } else {
        this.selected = '';
      }
    }

    if (this.disabled) {
      for (const tab of this._tabs) {
        tab.tabIndex = -1;
      }
    } else if (!hasTabStop && this._tabs.length) {
      this._tabs[0].tabIndex = 0;
    }
  }

  /**
   * Wires up cross-element ARIA relationships between tabs and
   * panels. Each tab gets `aria-controls` pointing at its panel's
   * `id`, and each panel gets `aria-labelledby` pointing at its
   * tab's `id`.
   */
  private managePanels(panels: TabPanelLike[]): void {
    for (const panel of panels) {
      const { tabId, id } = panel;
      const tab = this.querySelector(`[role="tab"][tab-id="${tabId}"]`);

      if (tab) {
        tab.setAttribute('aria-controls', id);
        panel.setAttribute('aria-labelledby', tab.id);
      }

      panel.selected = tabId === this.selected;
    }
  }

  // ───────────────────────────────────
  //     SELECTION INDICATOR
  // ───────────────────────────────────

  /**
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

    if (this._direction === 'horizontal') {
      const left = tabRect.left - listRect.left;
      const scale = tabRect.width / TabsBase.INDICATOR_BASE_SIZE;
      this.selectionIndicatorStyle = `transform: translateX(${left}px) scaleX(${scale})`;
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

  private _resizeObserver?: ResizeObserver;

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
      this.updateCheckedState();
    }

    if (changes.has('direction')) {
      this.updateSelectionIndicator();
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
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
  }

  public override disconnectedCallback(): void {
    window.removeEventListener('resize', this.updateSelectionIndicator);
    if ('fonts' in document) {
      document.fonts.removeEventListener(
        'loadingdone',
        this.updateSelectionIndicator
      );
    }
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
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

    if (window.__swc?.DEBUG && !this.accessibleLabel) {
      window.__swc.warn(
        this,
        `<${this.localName}> requires an "accessible-label" attribute to provide an accessible name for the tablist.`,
        'https://opensource.adobe.com/spectrum-web-components/components/tabs/',
        { type: 'accessibility', level: 'high' }
      );
    }
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
