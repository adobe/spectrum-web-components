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

import { css, html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Meta, StoryObj } from '@storybook/web-components';

import { FocusgroupNavigationController } from '../../focus-group-navigation-controller.js';
import readme from '../focus-group-navigation-controller.md?raw';

// ─────────────────────────
//     DEMO HOSTS
// ─────────────────────────

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
  protected override firstUpdated(): void {
    super.firstUpdated();
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
  protected override firstUpdated(): void {
    super.firstUpdated();
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
  protected override firstUpdated(): void {
    super.firstUpdated();
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
  protected override firstUpdated(): void {
    super.firstUpdated();
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
  protected override firstUpdated(): void {
    super.firstUpdated();
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

  /**
   * Which `data-item` value {@link focusProgrammaticTarget} should focus.
   *
   * Reflected as attribute `focus-target` for the Storybook story.
   */
  @property({ type: String, attribute: 'focus-target' })
  public focusTarget: 'a' | 'b' | 'c' = 'c';

  /**
   * Runs after first render so toolbar buttons exist before {@link FocusgroupNavigationController.refresh}.
   */
  protected override firstUpdated(): void {
    super.firstUpdated();
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
  protected override firstUpdated(): void {
    super.firstUpdated();
    this.navigation.refresh();
  }

  /**
   * Applies roving tabindex via {@link FocusgroupNavigationController.focusFirstItemByTextPrefix},
   * then focuses the active item (for Storybook tests; production code can call those separately).
   *
   * @param prefix - Prefix to match against each item’s typeahead label.
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

// ─────────────────────────
//     STORYBOOK
// ─────────────────────────

/**
 * Storybook metadata: documentation body comes from `focus-group-navigation-controller.md`.
 */
const meta: Meta = {
  title: 'Focus group navigation controller',
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: `Roving tabindex and directional keys for composite widgets (APG-aligned, focusgroup-like).`,
      description: {
        component: readme,
      },
    },
  },
};

/** Lit demo hosts are exported for unit tests; exclude from CSF so Vitest does not run them as stories. */
export default {
  ...meta,
  excludeStories: [
    'DemoFocusgroupHorizontal',
    'DemoFocusgroupBothAxes',
    'DemoFocusgroupVertical',
    'DemoFocusgroupSkipDisabled',
    'DemoFocusgroupGrid',
    'DemoFocusgroupProgrammatic',
    'DemoFocusgroupTextPrefix',
  ],
} as Meta;

type Story = StoryObj;

/**
 * Inline-axis arrows move between formatting controls; Tab yields one stop for the group.
 */
export const HorizontalToolbar: Story = {
  render: () => html`
    <demo-focusgroup-horizontal
      role="toolbar"
      aria-label="Text formatting"
    ></demo-focusgroup-horizontal>
  `,
};

/**
 * **ArrowLeft** / **ArrowRight** and **ArrowUp** / **ArrowDown** all move along the same
 * control order (LTR: Right and Down advance, Left and Up go back). Useful when layout is
 * horizontal but users expect vertical arrow keys to work as well.
 */
export const BothAxesLinear: Story = {
  render: () => html`
    <demo-focusgroup-both-axes
      role="toolbar"
      aria-label="Segmented controls"
    ></demo-focusgroup-both-axes>
  `,
};

/**
 * Block-axis arrows traverse menu-like items; **Page Up** / **Page Down** skip two items.
 * One control uses `aria-disabled` (not native `disabled`) so it stays focusable and items
 * after it remain reachable.
 */
export const VerticalMenu: Story = {
  render: () => html`
    <demo-focusgroup-vertical
      role="menu"
      aria-label="Edit menu"
    ></demo-focusgroup-vertical>
  `,
};

/**
 * With `skipDisabled: true`, **Save** (`disabled`) and **Close** (`aria-disabled="true"`) are
 * left out of the tab order and arrow sequence; **New**, **Open**, **Print**, and **Help** are
 * all reachable with **ArrowDown** / **ArrowUp** (wrap on).
 */
export const SkipDisabledMenu: Story = {
  render: () => html`
    <demo-focusgroup-skip-disabled
      role="menu"
      aria-label="File menu (skip disabled)"
    ></demo-focusgroup-skip-disabled>
  `,
};

/**
 * Arrow keys move across a 3×3 grid; **Page Up** / **Page Down** move two rows at a time.
 * **Home** / **End** jump to the first and last cell in row-major order; **Ctrl+Home** /
 * **Ctrl+End** jump to the first cell of the first row and the last cell of the last row
 * (equivalent here to cells **1** and **9**).
 */
export const Grid: Story = {
  render: () => html`
    <demo-focusgroup-grid></demo-focusgroup-grid>
  `,
};

/**
 * Demo calls \`setActiveItem\` then \`focus()\` so the roving tab stop matches keyboard navigation.
 */
export const ProgrammaticFocus: Story = {
  render: () => html`
    <demo-focusgroup-programmatic
      focus-target="c"
    ></demo-focusgroup-programmatic>
  `,
};

/**
 * The controller’s **focusFirstItemByTextPrefix** only syncs roving `tabindex` to the first label
 * match; the demo triggers then call `focus()` on {@link FocusgroupNavigationController.getActiveItem}
 * in a microtask. Call the same pattern from application code (for example on `keydown` for typeahead).
 */
export const TextPrefixFocus: Story = {
  render: () => html`
    <demo-focusgroup-text-prefix></demo-focusgroup-text-prefix>
  `,
};
