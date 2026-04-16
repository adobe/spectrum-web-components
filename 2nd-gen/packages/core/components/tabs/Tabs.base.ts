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
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import { SizedMixin } from '@spectrum-web-components/core/mixins/index.js';

import {
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
 * **Breaking change (B12):** In 1st-gen, `SizedMixin` was used with
 * `noDefaultSize: true` so no size attribute was applied unless set
 * explicitly. In 2nd-gen the default is `size="m"` to align with
 * Spectrum 2.
 *
 * @attribute {ElementSize} size - The size of the tabs. Controls
 *   typography and spacing. Defaults to `m`.
 *
 * @slot - Tab items (elements with `role="tab"`)
 * @slot tab-panel - Tab panel content (elements with `role="tabpanel"`)
 *
 * @fires change - The selected tab has changed. Cancelable —
 *   calling `preventDefault()` reverts the selection.
 */
export abstract class TabsBase extends SizedMixin(SpectrumElement, {
  defaultSize: 'm',
}) {
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
   * Whether to activate a tab on keyboard focus or require an
   * explicit activation action.
   *
   * When `true`, selection follows focus — as the user arrows between
   * tabs, the selection updates immediately (automatic activation).
   * When `false` (default), arrow keys move focus without changing
   * selection; Enter or Space activates the focused tab (manual
   * activation).
   *
   * Set to `true` only when tab content can be displayed instantly.
   *
   * @see https://w3c.github.io/aria-practices/#kbd_selection_follows_focus
   */
  @property({ type: Boolean })
  public auto = false;

  /**
   * Displays the tabs in a compact layout with reduced spacing.
   */
  @property({ type: Boolean, reflect: true })
  public compact = false;

  /**
   * The layout direction of the tab list.
   *
   * **Breaking change (B13):** `'vertical-right'` is no longer
   * supported. Use `'vertical'` instead.
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
   * Displays the selected tab with an emphasized visual style.
   */
  @property({ type: Boolean, reflect: true })
  public emphasized = false;

  /**
   * Accessible label for the tablist. Rendered as `aria-label` on the
   * element with `role="tablist"` in the concrete template.
   */
  @property({ type: String })
  public label = '';

  /**
   * Displays the tab list without a visible divider line, providing
   * a more subdued appearance.
   */
  @property({ type: Boolean, reflect: true })
  public quiet = false;

  /**
   * The `value` of the currently selected tab. Setting this property
   * updates which tab appears selected and which panel is visible.
   */
  @property({ type: String, reflect: true })
  public selected = '';

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  /**
   * Cached list of tab elements managed by this container. Updated
   * via `handleTabSlotChange`.
   */
  private _tabs: TabLike[] = [];

  /**
   * Called by the concrete class when the default slot's content
   * changes. Rebuilds the internal tab list and syncs selection
   * state.
   */
  protected handleTabSlotChange(event: Event): void {
    const slot = event.target as HTMLSlotElement;
    this._tabs = slot
      .assignedElements()
      .filter((el) => el.getAttribute('role') === 'tab') as TabLike[];
    this.updateCheckedState();
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
   * **Horizontal (B6 fix):** Left/Right navigate; Up/Down ignored.
   * **Vertical:** Up/Down navigate; Left/Right ignored.
   * **RTL (B7 fix):** Left/Right swap in `dir="rtl"`.
   * **Wrapping:** Navigation wraps from last to first and vice versa.
   * **Disabled (B9):** Disabled tabs receive focus via arrows but
   * are not activatable by Enter/Space.
   * **Auto mode:** Selection follows focus on arrow key navigation.
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
   * focus per APG. In auto mode, the newly focused tab is also
   * selected.
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
   * Focuses the tab at the given index and, when in auto mode,
   * also selects it. Selection happens before focus to match
   * 1st-gen ordering where `elementEnterAction` runs before
   * `focus()`, allowing `change` event listeners to see the
   * pre-focus state via `activeElement`.
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

    if (this.auto && !tab.disabled) {
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
    const value = target.value;
    if (!value) {
      return;
    }

    const previous = this.selected;
    this.selected = value;

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
   * entry (matching 1st-gen behavior where `isFocusableElement`
   * returned `false` for all tabs when the container was disabled).
   */
  private updateCheckedState(): void {
    let hasTabStop = false;

    for (const tab of this._tabs) {
      tab.selected = false;
    }

    if (this.selected) {
      const currentTab = this._tabs.find((el) => el.value === this.selected);

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
      const { value, id } = panel;
      const tab = this.querySelector(`[role="tab"][value="${value}"]`);

      if (tab) {
        tab.setAttribute('aria-controls', id);
        panel.setAttribute('aria-labelledby', tab.id);
      }

      panel.selected = value === this.selected;
    }
  }

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
          `[role="tabpanel"][value="${previousValue}"]`
        ) as TabPanelLike | null;

        if (previous) {
          previous.selected = false;
        }
      }

      const next = this.querySelector(
        `[role="tabpanel"][value="${this.selected}"]`
      ) as TabPanelLike | null;

      if (next) {
        next.selected = true;
      }
    }

    if (changes.has('disabled') && this._tabs.length) {
      this.updateCheckedState();
    }
  }

  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);

    if (!this.hasAttribute('direction')) {
      this.setAttribute('direction', this.direction);
    }

    if (window.__swc?.DEBUG && !this.label) {
      window.__swc.warn(
        this,
        `<${this.localName}> requires a "label" attribute to provide an accessible name for the tablist.`,
        'https://opensource.adobe.com/spectrum-web-components/components/tabs/',
        { type: 'accessibility', level: 'high' }
      );
    }
  }

  /**
   * Waits for all child tab elements to finish their update cycle
   * before resolving. Matches 1st-gen behavior that ensured child
   * tabs were fully rendered before the container reported complete.
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
