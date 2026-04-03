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

import { FocusgroupNavigationController } from '../focus-group-navigation-controller.js';
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
   * Controller instance: vertical direction with wrapping; disabled items stay focusable.
   */
  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'vertical',
    wrap: true,
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
   * Controller instance: grid direction without row/column wrap.
   */
  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'grid',
    wrap: false,
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
 * Storybook-only host demonstrating {@link FocusgroupNavigationController.focusItem}.
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
   * Focuses the toolbar button whose `data-item` matches {@link focusTarget}.
   */
  public focusProgrammaticTarget(): void {
    const sel = `[data-item="${this.focusTarget}"]`;
    const el = this.renderRoot.querySelector<HTMLElement>(sel);
    if (el) {
      this.navigation.focusItem(el);
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

export default meta;

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
 * Block-axis arrows traverse menu-like items; one item uses `aria-disabled` (not native
 * `disabled`) so it stays focusable and items after it remain reachable.
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
 * Arrow keys move across a 3×3 grid; Home and End jump to the first and last cell in row-major order.
 */
export const Grid: Story = {
  render: () => html`
    <demo-focusgroup-grid></demo-focusgroup-grid>
  `,
};

/**
 * Calls \`focusItem\` on a chosen button so tabindex stays consistent with keyboard navigation.
 */
export const ProgrammaticFocus: Story = {
  render: () => html`
    <demo-focusgroup-programmatic
      focus-target="c"
    ></demo-focusgroup-programmatic>
  `,
};
