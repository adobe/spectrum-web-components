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

import {
  css,
  html,
  LitElement,
  PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';

import { DisabledMixin } from '../../../mixins/disabled-mixin.js';
import {
  type FocusgroupDirection,
  focusgroupNavigationActiveChange,
  type FocusgroupNavigationActiveChangeDetail,
  FocusgroupNavigationController,
} from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-focusgroup-playground': DemoFocusgroupPlayground;
    'demo-focusgroup-horizontal': DemoFocusgroupHorizontal;
    'demo-focusgroup-both-axes': DemoFocusgroupBothAxes;
    'demo-focusgroup-vertical': DemoFocusgroupVertical;
    'demo-focusgroup-skip-disabled': DemoFocusgroupSkipDisabled;
    'demo-focusgroup-grid': DemoFocusgroupGrid;
    'demo-focusgroup-programmatic': DemoFocusgroupProgrammatic;
    'demo-focusgroup-text-prefix': DemoFocusgroupTextPrefix;
    'demo-focusgroup-dynamic': DemoFocusgroupDynamic;
    'demo-focusgroup-event-tracker': DemoFocusgroupEventTracker;
    'demo-focusgroup-disabled-host': DemoFocusgroupDisabledHost;
  }
}

// ─────────────────────────────────────
//     CONFIGURABLE PLAYGROUND HOST
// ─────────────────────────────────────

/**
 * @internal
 *
 * Storybook-only configurable host whose reactive properties mirror
 * {@link FocusgroupNavigationController} options. Layout adapts to `direction`.
 * Used by the Playground and Overview stories.
 */
@customElement('demo-focusgroup-playground')
export class DemoFocusgroupPlayground extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    .horizontal,
    .both {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .vertical {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 4px;
      max-width: 14rem;
      padding: 8px;
      border: 1px solid var(--spectrum-gray-300, #ddd);
      border-radius: 4px;
      background: var(--spectrum-gray-50, #fff);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 5rem);
      gap: 8px;
    }
    button {
      font: inherit;
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid var(--spectrum-gray-400, #ccc);
      background: var(--spectrum-gray-75, #f5f5f5);
      cursor: pointer;
    }
    .vertical button {
      text-align: start;
      border: none;
      background: transparent;
    }
    .vertical button:hover:not([disabled]):not([aria-disabled='true']) {
      background: var(--spectrum-gray-200, #e8e8e8);
    }
    .grid button {
      height: 3rem;
    }
    button:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 2px;
    }
    .vertical button:focus-visible {
      outline-offset: 0;
    }
    button[disabled],
    button[aria-disabled='true'] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  static override properties = {
    direction: { type: String },
    wrap: { type: Boolean },
    memory: { type: Boolean },
    skipDisabled: { type: Boolean, attribute: 'skip-disabled' },
    pageStep: { type: Number, attribute: 'page-step' },
  };

  declare direction: FocusgroupDirection;
  declare wrap: boolean;
  declare memory: boolean;
  declare skipDisabled: boolean;
  declare pageStep: number;

  constructor() {
    super();
    this.direction = 'horizontal';
    this.wrap = true;
    this.memory = true;
    this.skipDisabled = false;
    this.pageStep = 0;
  }

  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'horizontal',
    wrap: true,
    memory: true,
    skipDisabled: false,
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLElement>(
          this.direction === 'grid' ? '.grid button' : 'button'
        )
      ),
  });

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.navigation.setOptions({
      direction: this.direction,
      wrap: this.wrap,
      memory: this.memory,
      skipDisabled: this.skipDisabled,
      pageStep: this.pageStep || undefined,
    });
    this.navigation.refresh();
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    const relevant = [
      'direction',
      'wrap',
      'memory',
      'skipDisabled',
      'pageStep',
    ] as const;
    if (relevant.some((k) => changedProperties.has(k))) {
      this.navigation.setOptions({
        direction: this.direction,
        wrap: this.wrap,
        memory: this.memory,
        skipDisabled: this.skipDisabled,
        pageStep: this.pageStep || undefined,
      });
    }
  }

  private handleAriaDisabledClick(event: Event): void {
    event.preventDefault();
  }

  private handleAriaDisabledKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
    }
  }

  protected override render(): TemplateResult {
    if (this.direction === 'grid') {
      return this.renderGrid();
    }
    if (this.direction === 'vertical') {
      return this.renderVertical();
    }
    return this.renderHorizontal();
  }

  private renderHorizontal(): TemplateResult {
    return html`
      <div
        class=${this.direction === 'both' ? 'both' : 'horizontal'}
        role="toolbar"
        aria-label="Playground toolbar"
      >
        <button type="button">Bold</button>
        <button type="button">Italic</button>
        <button type="button" disabled>Underline</button>
        <button
          type="button"
          aria-disabled="true"
          @click=${this.handleAriaDisabledClick}
          @keydown=${this.handleAriaDisabledKeydown}
        >
          Strikethrough
        </button>
        <button type="button">Link</button>
      </div>
    `;
  }

  private renderVertical(): TemplateResult {
    return html`
      <div class="vertical" role="menu" aria-label="Playground menu">
        <button type="button">Copy</button>
        <button type="button">Paste</button>
        <button type="button" disabled>Cut</button>
        <button
          type="button"
          aria-disabled="true"
          @click=${this.handleAriaDisabledClick}
          @keydown=${this.handleAriaDisabledKeydown}
        >
          Delete
        </button>
        <button type="button">Select all</button>
      </div>
    `;
  }

  private renderGrid(): TemplateResult {
    const cells = Array.from({ length: 9 }, (_, i) => i + 1);
    return html`
      <div class="grid" role="grid" aria-label="Playground grid">
        ${cells.map((n) => {
          if (n === 5) {
            return html`
              <button type="button" role="gridcell" disabled>${n}</button>
            `;
          }
          if (n === 8) {
            return html`
              <button
                type="button"
                role="gridcell"
                aria-disabled="true"
                @click=${this.handleAriaDisabledClick}
                @keydown=${this.handleAriaDisabledKeydown}
              >
                ${n}
              </button>
            `;
          }
          return html`
            <button type="button" role="gridcell">${n}</button>
          `;
        })}
      </div>
    `;
  }
}

// ─────────────────────────────────
//     SPECIALIZED DEMO HOSTS
// ─────────────────────────────────

/**
 * @internal
 *
 * Storybook-only host demonstrating horizontal {@link FocusgroupNavigationController} usage.
 */
@customElement('demo-focusgroup-horizontal')
export class DemoFocusgroupHorizontal extends LitElement {
  /**
   * Shadow DOM styles for the inline toolbar demo.
   */
  static override styles = css`
    :host {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    button {
      font: inherit;
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid var(--spectrum-gray-400, #ccc);
      background: var(--spectrum-gray-75, #f5f5f5);
      cursor: pointer;
    }
    button:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 2px;
    }
  `;

  /**
   * Controller instance: horizontal direction with wrapping.
   */
  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'horizontal',
    wrap: true,
    getItems: () =>
      Array.from(this.renderRoot.querySelectorAll<HTMLElement>('button')),
  });

  /**
   * Runs after first render so `renderRoot` contains buttons before {@link FocusgroupNavigationController.refresh}.
   */
  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.navigation.refresh();
  }

  /**
   * Renders formatting action buttons managed by the focus navigation controller.
   */
  protected override render(): TemplateResult {
    return html`
      <button type="button">Bold</button>
      <button type="button">Italic</button>
      <button type="button">Underline</button>
      <button type="button">Strikethrough</button>
    `;
  }
}

/**
 * @internal
 *
 * Storybook-only host demonstrating `direction: 'both'` — horizontal and vertical arrows
 * move along the same `getItems()` order.
 */
@customElement('demo-focusgroup-both-axes')
export class DemoFocusgroupBothAxes extends LitElement {
  /**
   * Shadow DOM styles for the inline toolbar demo (layout matches horizontal; keys differ).
   */
  static override styles = css`
    :host {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    button {
      font: inherit;
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid var(--spectrum-gray-400, #ccc);
      background: var(--spectrum-gray-75, #f5f5f5);
      cursor: pointer;
    }
    button:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 2px;
    }
  `;

  /**
   * Controller instance: both axes on one linear sequence with wrapping.
   */
  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'both',
    wrap: true,
    getItems: () =>
      Array.from(this.renderRoot.querySelectorAll<HTMLElement>('button')),
  });

  /**
   * Runs after first render so `renderRoot` contains buttons before {@link FocusgroupNavigationController.refresh}.
   */
  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.navigation.refresh();
  }

  /**
   * Renders segment controls; **ArrowLeft** / **ArrowRight** and **ArrowUp** / **ArrowDown**
   * all traverse this row in order.
   */
  protected override render(): TemplateResult {
    return html`
      <button type="button">Start</button>
      <button type="button">Section A</button>
      <button type="button">Section B</button>
      <button type="button">End</button>
    `;
  }
}

/**
 * @internal
 *
 * Storybook-only host demonstrating vertical {@link FocusgroupNavigationController} usage.
 */
@customElement('demo-focusgroup-vertical')
export class DemoFocusgroupVertical extends LitElement {
  /**
   * Shadow DOM styles for the vertical menu demo.
   */
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 4px;
      max-width: 14rem;
      padding: 8px;
      border: 1px solid var(--spectrum-gray-300, #ddd);
      border-radius: 4px;
      background: var(--spectrum-gray-50, #fff);
    }
    button {
      font: inherit;
      text-align: start;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      background: transparent;
      cursor: pointer;
    }
    button:hover {
      background: var(--spectrum-gray-200, #e8e8e8);
    }
    button:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 0;
    }
    button[aria-disabled='true'] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  /**
   * Blocks pointer activation for the menu item that uses `aria-disabled` instead of native
   * `disabled` so it can stay in the roving focus order (native `disabled` is not focusable).
   *
   * @param event - Click event from the inert item.
   */
  private handleInertMenuItemClick(event: Event): void {
    event.preventDefault();
  }

  /**
   * Prevents Enter/Space from activating the `aria-disabled` item like a normal button.
   *
   * @param event - Key event while the inert item is focused.
   */
  private handleInertMenuItemKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
    }
  }

  /**
   * Controller instance: vertical direction with wrapping; disabled items stay focusable;
   * **Page Up** / **Page Down** move two items at a time (`pageStep: 2`).
   */
  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'vertical',
    wrap: true,
    pageStep: 2,
    skipDisabled: false,
    getItems: () =>
      Array.from(this.renderRoot.querySelectorAll<HTMLElement>('button')),
  });

  /**
   * Runs after first render so `renderRoot` contains buttons before {@link FocusgroupNavigationController.refresh}.
   */
  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.navigation.refresh();
  }

  /**
   * Renders menu-like actions including one inactive control.
   *
   * Uses `aria-disabled="true"` instead of the `disabled` attribute so the item stays
   * focusable while arrow keys move through the list; native `disabled` removes focusability
   * and would block reaching items after it.
   */
  protected override render(): TemplateResult {
    return html`
      <button type="button">Copy</button>
      <button type="button">Paste</button>
      <button
        type="button"
        aria-disabled="true"
        @click=${this.handleInertMenuItemClick}
        @keydown=${this.handleInertMenuItemKeydown}
      >
        Cut (unavailable)
      </button>
      <button type="button">Select all</button>
    `;
  }
}

/**
 * @internal
 *
 * Storybook-only host demonstrating {@link FocusgroupNavigationController} with
 * `skipDisabled: true` so native `disabled` and `aria-disabled="true"` items are omitted
 * from roving tabindex and arrow navigation.
 */
@customElement('demo-focusgroup-skip-disabled')
export class DemoFocusgroupSkipDisabled extends LitElement {
  /**
   * Shadow DOM styles for the menu demo (disabled styling for skipped items).
   */
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 4px;
      max-width: 16rem;
      padding: 8px;
      border: 1px solid var(--spectrum-gray-300, #ddd);
      border-radius: 4px;
      background: var(--spectrum-gray-50, #fff);
    }
    button {
      font: inherit;
      text-align: start;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      background: transparent;
      cursor: pointer;
    }
    button:hover:not([disabled]):not([aria-disabled='true']) {
      background: var(--spectrum-gray-200, #e8e8e8);
    }
    button:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 0;
    }
    button[disabled],
    button[aria-disabled='true'] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  /**
   * Prevents activating the `aria-disabled` item if it is clicked (not in arrow sequence).
   *
   * @param event - Click from the inactive item.
   */
  private handleSkippedAriaDisabledClick(event: Event): void {
    event.preventDefault();
  }

  /**
   * Controller instance: vertical list; disabled and `aria-disabled` items are skipped.
   */
  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'vertical',
    wrap: true,
    skipDisabled: true,
    getItems: () =>
      Array.from(this.renderRoot.querySelectorAll<HTMLElement>('button')),
  });

  /**
   * Runs after first render so `renderRoot` contains buttons before {@link FocusgroupNavigationController.refresh}.
   */
  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.navigation.refresh();
  }

  /**
   * Renders a file menu with two skipped entries (native **disabled** and **aria-disabled**).
   */
  protected override render(): TemplateResult {
    return html`
      <button type="button">New</button>
      <button type="button">Open</button>
      <button type="button" disabled>Save</button>
      <button type="button">Print</button>
      <button
        type="button"
        aria-disabled="true"
        @click=${this.handleSkippedAriaDisabledClick}
      >
        Close
      </button>
      <button type="button">Help</button>
    `;
  }
}

/**
 * @internal
 *
 * Storybook-only host demonstrating `grid` {@link FocusgroupNavigationController} usage.
 */
@customElement('demo-focusgroup-grid')
export class DemoFocusgroupGrid extends LitElement {
  /**
   * Shadow DOM styles for the 3×3 grid demo.
   */
  static override styles = css`
    :host {
      display: block;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 5rem);
      gap: 8px;
    }
    button {
      font: inherit;
      height: 3rem;
      border-radius: 4px;
      border: 1px solid var(--spectrum-gray-400, #ccc);
      background: var(--spectrum-gray-75, #f5f5f5);
      cursor: pointer;
    }
    button:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 2px;
    }
  `;

  /**
   * Controller instance: grid direction without row/column wrap; **Page Up** / **Page Down**
   * move two rows (`pageStep: 2`).
   */
  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'grid',
    wrap: false,
    pageStep: 2,
    getItems: () =>
      Array.from(this.renderRoot.querySelectorAll<HTMLElement>('.grid button')),
  });

  /**
   * Runs after first render so grid buttons exist before {@link FocusgroupNavigationController.refresh}.
   */
  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.navigation.refresh();
  }

  /**
   * Renders a `role="grid"` region with nine `role="gridcell"` buttons.
   */
  protected override render(): TemplateResult {
    const cells = Array.from({ length: 9 }, (_, i) => i + 1);
    return html`
      <div class="grid" role="grid" aria-label="Sample grid">
        ${cells.map(
          (n) => html`
            <button type="button" role="gridcell">${n}</button>
          `
        )}
      </div>
    `;
  }
}

/**
 * @internal
 *
 * Storybook-only host demonstrating {@link FocusgroupNavigationController.setActiveItem} plus
 * explicit `focus()` from the demo.
 */
@customElement('demo-focusgroup-programmatic')
export class DemoFocusgroupProgrammatic extends LitElement {
  /**
   * Shadow DOM styles for the toolbar row and programmatic trigger control.
   */
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: flex-start;
    }
    .demo-trigger {
      margin-top: 4px;
      font: inherit;
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid var(--spectrum-gray-400, #ccc);
      background: var(--spectrum-gray-75, #f5f5f5);
      cursor: pointer;
    }
    .demo-trigger:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 2px;
    }
    .row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    button {
      font: inherit;
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid var(--spectrum-gray-400, #ccc);
      background: var(--spectrum-gray-75, #f5f5f5);
      cursor: pointer;
    }
    button:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 2px;
    }
  `;

  /**
   * Controller instance: horizontal without wrap; items are toolbar buttons with `data-item`.
   */
  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'horizontal',
    wrap: false,
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLElement>('.row button[data-item]')
      ),
  });

  static override properties = {
    focusTarget: { type: String, attribute: 'focus-target' },
  };

  /**
   * Which `data-item` value {@link focusProgrammaticTarget} should focus.
   *
   * Reflected as attribute `focus-target` for the Storybook story.
   */
  declare focusTarget: 'a' | 'b' | 'c';

  constructor() {
    super();
    this.focusTarget = 'c';
  }

  /**
   * Runs after first render so toolbar buttons exist before {@link FocusgroupNavigationController.refresh}.
   */
  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.navigation.refresh();
  }

  /**
   * Sets roving tabindex to the toolbar button whose `data-item` matches {@link focusTarget},
   * then moves focus (deferred so a trigger `click` does not overwrite focus).
   */
  public focusProgrammaticTarget(): void {
    const sel = `[data-item="${this.focusTarget}"]`;
    const el = this.renderRoot.querySelector<HTMLElement>(sel);
    if (el && this.navigation.setActiveItem(el)) {
      queueMicrotask(() => {
        el.focus();
      });
    }
  }

  /**
   * Click handler for the demo trigger button; delegates to {@link focusProgrammaticTarget}.
   */
  private handleProgrammaticDemoActivate(): void {
    this.focusProgrammaticTarget();
  }

  /**
   * Renders the toolbar row and external trigger used to test programmatic focus.
   */
  protected override render(): TemplateResult {
    return html`
      <div
        class="row"
        role="toolbar"
        aria-label="Programmatic focus demo actions"
      >
        <button type="button" data-item="a">Item A</button>
        <button type="button" data-item="b">Item B</button>
        <button type="button" data-item="c">Item C</button>
      </div>
      <button
        type="button"
        class="demo-trigger"
        @click=${this.handleProgrammaticDemoActivate}
      >
        Focus item C programmatically
      </button>
    `;
  }
}

/**
 * @internal
 *
 * Storybook-only host demonstrating {@link FocusgroupNavigationController.focusFirstItemByTextPrefix}.
 */
@customElement('demo-focusgroup-text-prefix')
export class DemoFocusgroupTextPrefix extends LitElement {
  /**
   * Shadow DOM styles for the vertical menu and demo triggers outside the roving group.
   */
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: flex-start;
      max-width: 18rem;
    }
    .menu {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 4px;
      width: 100%;
      padding: 8px;
      border: 1px solid var(--spectrum-gray-300, #ddd);
      border-radius: 4px;
      background: var(--spectrum-gray-50, #fff);
    }
    .menu button {
      font: inherit;
      text-align: start;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      background: transparent;
      cursor: pointer;
    }
    .menu button:hover {
      background: var(--spectrum-gray-200, #e8e8e8);
    }
    .menu button:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 0;
    }
    .menu button.typeahead-icon {
      font-size: 1.125rem;
      line-height: 1.2;
    }
    .triggers {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .demo-trigger {
      font: inherit;
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid var(--spectrum-gray-400, #ccc);
      background: var(--spectrum-gray-75, #f5f5f5);
      cursor: pointer;
    }
    .demo-trigger:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 2px;
    }
  `;

  /**
   * Controller instance: only `.menu button` elements participate (triggers are outside).
   */
  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'vertical',
    wrap: true,
    getItems: () =>
      Array.from(this.renderRoot.querySelectorAll<HTMLElement>('.menu button')),
  });

  /**
   * Runs after first render so menu buttons exist before {@link FocusgroupNavigationController.refresh}.
   */
  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.navigation.refresh();
  }

  /**
   * Applies roving tabindex via {@link FocusgroupNavigationController.focusFirstItemByTextPrefix},
   * then focuses the active item (for Storybook tests; production code can call those separately).
   *
   * @param prefix - Prefix to match against each item's typeahead label.
   * @returns Whether a matching item was found and focused.
   */
  public focusByTextPrefix(prefix: string): boolean {
    if (!this.navigation.focusFirstItemByTextPrefix(prefix)) {
      return false;
    }
    this.navigation.getActiveItem()?.focus();
    return true;
  }

  /**
   * Demo: roving tabindex for **Paste** via prefix `Pas`, then move focus after the click target
   * has finished activation.
   */
  private handleDemoPrefixPas(): void {
    if (!this.navigation.focusFirstItemByTextPrefix('Pas')) {
      return;
    }
    queueMicrotask(() => {
      this.navigation.getActiveItem()?.focus();
    });
  }

  /**
   * Demo: roving tabindex for **Cut** via prefix `cu`, then move focus after activation.
   */
  private handleDemoPrefixCu(): void {
    if (!this.navigation.focusFirstItemByTextPrefix('cu')) {
      return;
    }
    queueMicrotask(() => {
      this.navigation.getActiveItem()?.focus();
    });
  }

  /**
   * Renders a small menu plus trigger buttons that call prefix-based focus on the controller.
   */
  protected override render(): TemplateResult {
    return html`
      <div class="menu" role="menu" aria-label="Edit actions (typeahead demo)">
        <button type="button">Copy</button>
        <button type="button">Cut</button>
        <button type="button">Paste</button>
        <button type="button">Select all</button>
        <button type="button" class="typeahead-icon" aria-label="Undo">
          ↩
        </button>
      </div>
      <div class="triggers">
        <button
          type="button"
          class="demo-trigger"
          @click=${this.handleDemoPrefixPas}
        >
          Focus match for &quot;Pas&quot; → Paste
        </button>
        <button
          type="button"
          class="demo-trigger"
          @click=${this.handleDemoPrefixCu}
        >
          Focus match for &quot;cu&quot; → Cut
        </button>
      </div>
    `;
  }
}

// ─────────────────────────────────
//     DYNAMIC ITEMS DEMO HOST
// ─────────────────────────────────

/**
 * @internal
 *
 * Storybook-only host for testing dynamic item addition, removal, and
 * inert toggling with {@link FocusgroupNavigationController}.
 */
@customElement('demo-focusgroup-dynamic')
export class DemoFocusgroupDynamic extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    button {
      font: inherit;
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid var(--spectrum-gray-400, #ccc);
      background: var(--spectrum-gray-75, #f5f5f5);
      cursor: pointer;
    }
    button:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 2px;
    }
  `;

  static override properties = {
    items: { type: Array },
  };

  declare items: string[];

  constructor() {
    super();
    this.items = ['Alpha', 'Beta', 'Gamma', 'Delta'];
  }

  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'horizontal',
    wrap: true,
    getItems: () =>
      Array.from(this.renderRoot.querySelectorAll<HTMLElement>('button')),
  });

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.navigation.refresh();
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('items')) {
      this.navigation.refresh();
    }
  }

  public callRefresh(): void {
    this.navigation.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      ${this.items.map(
        (label) => html`
          <button type="button">${label}</button>
        `
      )}
    `;
  }
}

// ─────────────────────────────────────
//     EVENT TRACKER DEMO HOST
// ─────────────────────────────────────

/**
 * @internal
 *
 * Storybook-only host that tracks active-change events dispatched by
 * {@link FocusgroupNavigationController} for test assertions.
 */
@customElement('demo-focusgroup-event-tracker')
export class DemoFocusgroupEventTracker extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    button {
      font: inherit;
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid var(--spectrum-gray-400, #ccc);
      background: var(--spectrum-gray-75, #f5f5f5);
      cursor: pointer;
    }
    button:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 2px;
    }
  `;

  public activeChangeLog: (string | null)[] = [];
  public callbackLog: (string | null)[] = [];

  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'horizontal',
    wrap: false,
    getItems: () =>
      Array.from(this.renderRoot.querySelectorAll<HTMLElement>('button')),
    onActiveItemChange: (el: HTMLElement | null) => {
      this.callbackLog.push(el?.textContent?.trim() ?? null);
    },
  });

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.navigation.refresh();
  }

  public override connectedCallback(): void {
    super.connectedCallback?.();
    this.addEventListener(
      focusgroupNavigationActiveChange,
      this.handleActiveChange as EventListener
    );
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback?.();
    this.removeEventListener(
      focusgroupNavigationActiveChange,
      this.handleActiveChange as EventListener
    );
  }

  private handleActiveChange = (
    event: CustomEvent<FocusgroupNavigationActiveChangeDetail>
  ): void => {
    this.activeChangeLog.push(
      event.detail.activeElement?.textContent?.trim() ?? null
    );
  };

  public clearLogs(): void {
    this.activeChangeLog = [];
    this.callbackLog = [];
  }

  protected override render(): TemplateResult {
    return html`
      <button type="button">First</button>
      <button type="button">Second</button>
      <button type="button">Third</button>
    `;
  }
}

// ─────────────────────────────────────
//     DISABLED HOST WITH CONTROLLER
// ─────────────────────────────────────

/**
 * @internal
 *
 * Storybook-only host combining {@link DisabledMixin} on the host with
 * {@link FocusgroupNavigationController} on child items. Used to verify
 * that host-level disabling and child roving tabindex coexist correctly.
 */
@customElement('demo-focusgroup-disabled-host')
export class DemoFocusgroupDisabledHost extends DisabledMixin(LitElement) {
  static override styles = css`
    :host {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    :host([disabled]) {
      opacity: 0.4;
      pointer-events: none;
    }
    button {
      font: inherit;
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid var(--spectrum-gray-400, #ccc);
      background: var(--spectrum-gray-75, #f5f5f5);
      cursor: pointer;
    }
    button:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 2px;
    }
  `;

  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'horizontal',
    wrap: true,
    getItems: () =>
      Array.from(this.renderRoot.querySelectorAll<HTMLElement>('button')),
  });

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.navigation.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <button type="button">Alpha</button>
      <button type="button">Beta</button>
      <button type="button">Gamma</button>
    `;
  }
}
