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
import { customElement } from 'lit/decorators.js';

import { RadioController } from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-radio-group-rating': DemoRadioGroupRating;
    'demo-radio-menu-item-radio': DemoRadioMenuItemRadio;
    'demo-radio-accordion-exclusive': DemoRadioAccordionExclusive;
    'demo-radio-programmatic-selection': DemoRadioProgrammaticSelection;
  }
}

/** @internal */
@customElement('demo-radio-group-rating')
export class DemoRadioGroupRating extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    [role='radiogroup'] {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 20rem;
      padding: 0.75rem;
      border-radius: 8px;
      border: 1px solid var(--spectrum-gray-300, #d3d3d3);
      font:
        0.95rem system-ui,
        sans-serif;
    }
    #rating-label {
      font-weight: 600;
    }
    .stars {
      display: flex;
      gap: 0.35rem;
      flex-wrap: wrap;
    }
    .stars button {
      font: inherit;
      min-inline-size: 2.5rem;
      min-block-size: 2.5rem;
      border-radius: 4px;
      border: 1px solid var(--spectrum-gray-400, #b1b1b1);
      background: var(--spectrum-gray-75, #fdfdfd);
      cursor: pointer;
    }
    .stars button:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 2px;
    }
    .stars button[aria-checked='true'] {
      background: var(--spectrum-orange-300, #ffb02e);
      border-color: var(--spectrum-orange-800, #cb6f10);
    }
  `;

  private readonly radios = new RadioController(this, {
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>(
          '[data-rating-star]'
        )
      ),
    selectItem: (star) => star.setAttribute('aria-checked', 'true'),
    deselectItem: (star) => star.setAttribute('aria-checked', 'false'),
    defaultToFirstSelectable: true,
    navigation: { direction: 'horizontal', wrap: true, memory: true },
  });

  protected override firstUpdated(): void {
    this.radios.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <div role="radiogroup" aria-labelledby="rating-label">
        <div id="rating-label">Rating</div>
        <div class="stars">
          ${[1, 2, 3, 4, 5].map((value) => {
            const label = value === 1 ? `${value} star` : `${value} stars`;
            return html`
              <button
                type="button"
                data-rating-star
                role="radio"
                aria-checked="false"
                aria-label=${label}
              >
                ${value}
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }
}

/** @internal */
@customElement('demo-radio-menu-item-radio')
export class DemoRadioMenuItemRadio extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    .menubar {
      display: inline-flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0.25rem;
      min-inline-size: 12rem;
      padding: 0.5rem;
      border-radius: 6px;
      border: 1px solid var(--spectrum-gray-300, #ccc);
      background: var(--spectrum-gray-75, #f8f8f8);
      font:
        0.9rem system-ui,
        sans-serif;
    }
    button {
      font: inherit;
      text-align: start;
      padding: 0.5rem 0.75rem;
      border: none;
      border-radius: 4px;
      background: transparent;
      cursor: pointer;
    }
    button:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 1px;
    }
    button[aria-checked='true'] {
      background: var(--spectrum-gray-200, #e8e8e8);
      font-weight: 600;
    }
  `;

  private readonly radios = new RadioController(this, {
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>('[data-alignment]')
      ),
    selectItem: (item) => item.setAttribute('aria-checked', 'true'),
    deselectItem: (item) => item.setAttribute('aria-checked', 'false'),
    defaultToFirstSelectable: true,
    navigation: { direction: 'vertical', wrap: true, memory: true },
  });

  protected override firstUpdated(): void {
    this.radios.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="menubar"
        role="menubar"
        aria-orientation="vertical"
        aria-label="Text alignment sample"
      >
        <button
          type="button"
          data-alignment
          role="menuitemradio"
          aria-checked="false"
        >
          Align left
        </button>
        <button
          type="button"
          data-alignment
          role="menuitemradio"
          aria-checked="false"
        >
          Align center
        </button>
        <button
          type="button"
          data-alignment
          role="menuitemradio"
          aria-checked="false"
        >
          Align right
        </button>
      </div>
    `;
  }
}

/** @internal */
@customElement('demo-radio-accordion-exclusive')
export class DemoRadioAccordionExclusive extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font:
        0.95rem system-ui,
        sans-serif;
    }
    .accordion {
      max-width: 26rem;
      border: 1px solid var(--spectrum-gray-300, #cbcbcb);
      border-radius: 6px;
      overflow: clip;
    }
    article {
      border-block-end: 1px solid var(--spectrum-gray-200, #e6e6e6);
    }
    article:last-of-type {
      border-block-end: none;
    }
    button.trigger {
      display: flex;
      width: 100%;
      gap: 0.5rem;
      align-items: center;
      justify-content: space-between;
      font: inherit;
      padding: 0.75rem 1rem;
      border: none;
      background: white;
      cursor: pointer;
      text-align: start;
    }
    button.trigger:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: -2px;
    }
    button.trigger span.chevron::before {
      content: '';
      inline-size: 0.65rem;
      block-size: 0.65rem;
      border-inline-end: 2px solid currentColor;
      border-block-end: 2px solid currentColor;
      display: inline-block;
      rotate: -45deg;
      translate: 0 0.1rem;
    }
    button[aria-expanded='true'] span.chevron::before {
      rotate: 135deg;
      translate: 0 -0.1rem;
    }
    .region {
      padding: 0.75rem 1rem 1rem;
      background: var(--spectrum-gray-75, #fafafa);
      border-block-start: 1px solid var(--spectrum-gray-200, #e6e6e6);
    }
    .region[hidden] {
      display: none;
    }
  `;

  private readonly panels = (): HTMLElement[] =>
    Array.from(this.renderRoot.querySelectorAll<HTMLElement>('.region'));

  private readonly accordionRadio = new RadioController(this, {
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>('[data-accordion]')
      ),
    selectItem: (header) => {
      header.setAttribute('aria-expanded', 'true');
      this.togglePanel(header.dataset.accordion!, true);
    },
    deselectItem: (header) => {
      header.setAttribute('aria-expanded', 'false');
      this.togglePanel(header.dataset.accordion!, false);
    },
    navigation: false,
    selectionFollowsFocus: false,
    handleSpaceActivatesSelection: false,
    allowEmptySelection: true,
  });

  private togglePanel(key: string, open: boolean): void {
    this.panels().forEach((surface) => {
      if (surface.dataset.panel === key) {
        surface.hidden = !open;
      }
    });
  }

  protected override firstUpdated(): void {
    const headers = Array.from(
      this.renderRoot.querySelectorAll<HTMLButtonElement>('[data-accordion]')
    );
    headers.forEach((button) =>
      this.togglePanel(
        button.dataset.accordion!,
        button.getAttribute('aria-expanded') === 'true'
      )
    );
    this.accordionRadio.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <div class="accordion">
        ${[
          {
            key: 'a',
            heading: 'Brushes',
            copy: 'Paint brushes behave like accordion headers with exclusive disclosure.',
          },
          {
            key: 'b',
            heading: 'Filters',
            copy: 'Use `navigation: false` when arrow keys should not imitate a radiogroup.',
          },
          {
            key: 'c',
            heading: 'Adjustments',
            copy: '`aria-expanded` toggles mimic Spectrum accordion sizing demos.',
          },
        ].map(
          ({ key, heading, copy }, ordinal) => html`
            <article>
              <button
                type="button"
                class="trigger"
                data-accordion=${key}
                aria-expanded=${ordinal === 0 ? 'true' : 'false'}
                aria-controls="accordion-panel-${key}"
              >
                <span>${heading}</span>
                <span class="chevron" aria-hidden="true"></span>
              </button>
              <div
                class="region"
                id=${`accordion-panel-${key}`}
                data-panel=${key}
                ?hidden=${ordinal !== 0}
              >
                ${copy}
              </div>
            </article>
          `
        )}
      </div>
    `;
  }
}

/** @internal */
@customElement('demo-radio-programmatic-selection')
export class DemoRadioProgrammaticSelection extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font:
        0.95rem system-ui,
        sans-serif;
    }
    .group {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      align-items: center;
    }
    .group button[data-program-item] {
      font: inherit;
      padding: 0.65rem 0.95rem;
      border-radius: 6px;
      border: 1px solid var(--spectrum-gray-400, #cfcfcf);
      background: white;
      cursor: pointer;
    }
    .group button[data-program-item]:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 2px;
    }
    .group button[data-program-item][aria-checked='true'] {
      border-color: var(--spectrum-blue-800, #0265dc);
      background: var(--spectrum-blue-100, #e5f6ff);
    }
    footer {
      margin-block-start: 1rem;
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    footer button {
      font: inherit;
      padding: 0.45rem 0.85rem;
      border-radius: 4px;
      border: 1px solid var(--spectrum-gray-500, #b5b5b5);
      background: var(--spectrum-gray-50, #f5f5f5);
      cursor: pointer;
    }
    footer button:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 2px;
    }
  `;

  private radios = new RadioController(this, {
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>(
          '[data-program-item]'
        )
      ),
    selectItem: (pill) => pill.setAttribute('aria-checked', 'true'),
    deselectItem: (pill) => pill.setAttribute('aria-checked', 'false'),
    defaultToFirstSelectable: true,
    navigation: { direction: 'horizontal', wrap: true },
  });

  protected override firstUpdated(): void {
    this.radios.refresh();
    this.programmaticShortcuts();
  }

  private programmaticShortcuts(): void {
    const shortcuts = Array.from(
      this.renderRoot.querySelectorAll<HTMLButtonElement>(
        '[data-program-select]'
      )
    );

    shortcuts.forEach((shortcut) =>
      shortcut.addEventListener(
        'click',
        /** Selects programmatically alongside pointer-driven usage. */
        () => {
          const indexRaw = shortcut.dataset.programSelect ?? '0';
          const indexValue = Number.parseInt(indexRaw, 10);

          const roster = Array.from(
            this.renderRoot.querySelectorAll<HTMLElement>('[data-program-item]')
          );

          if (!Number.isFinite(indexValue) || indexValue >= roster.length) {
            return;
          }

          void this.radios.setSelectedItem(roster[indexValue], {
            focus: true,
          });
        }
      )
    );
  }

  protected override render(): TemplateResult {
    return html`
      <div class="group" role="radiogroup" aria-label="Programmatic presets">
        <button
          type="button"
          role="radio"
          data-program-item
          aria-checked="false"
        >
          Alpha
        </button>
        <button
          type="button"
          role="radio"
          data-program-item
          aria-checked="false"
        >
          Beta
        </button>
        <button
          type="button"
          role="radio"
          data-program-item
          aria-checked="false"
        >
          Gamma
        </button>
      </div>
      <footer>
        <button type="button" data-program-select="0">Select Alpha</button>
        <button type="button" data-program-select="1">Select Beta</button>
        <button type="button" data-program-select="2">
          Focus Gamma programmatically
        </button>
      </footer>
    `;
  }
}
