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

import {
  RadioController,
  type RadioControllerSelectionChangeDetail,
} from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-radio-group-rating': DemoRadioGroupRating;
    'demo-radio-rating-default-first': DemoRadioRatingDefaultFirst;
    'demo-radio-rating-on-selection-change-alert': DemoRadioRatingOnSelectionChangeAlert;
    'demo-radio-menu-item-radio': DemoRadioMenuItemRadio;
    'demo-radio-accordion-exclusive': DemoRadioAccordionExclusive;
    'demo-radio-accordion-multiple': DemoRadioAccordionMultiple;
    'demo-radio-tabs-keydown': DemoRadioTabsKeydown;
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
      align-items: center;
    }
    .stars button {
      display: inline-grid;
      place-items: center;
      box-sizing: border-box;
      inline-size: 2.75rem;
      block-size: 2.75rem;
      padding: 0.35rem;
      border: none;
      border-radius: 6px;
      background: transparent;
      color: var(--spectrum-gray-500, #8f8f8f);
      cursor: pointer;
    }
    .stars button:hover {
      color: var(--spectrum-gray-800, #2c2c2c);
      background: var(--spectrum-gray-100, #f1f1f1);
    }
    .stars button:focus-visible {
      outline: 2px solid var(--spectrum-blue-800, #0265dc);
      outline-offset: 2px;
    }
    .stars button[aria-checked='true'] {
      color: var(--spectrum-orange-900, #b14c00);
      background: var(--spectrum-orange-300, #ffb02e);
    }
    .stars button[aria-checked='true']:hover {
      color: var(--spectrum-orange-900, #8a3b00);
      background: var(--spectrum-orange-400, #ffa037);
    }
    .stars button svg {
      inline-size: 1.85rem;
      block-size: 1.85rem;
      flex-shrink: 0;
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
    toggles: true,
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
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }
}

/** Shared chrome for the rating demo hosts below. */
const radioRatingDemoChrome = css`
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
  .hint {
    margin: 0;
    font-size: 0.85rem;
    color: var(--spectrum-gray-700, #464646);
  }
  .stars {
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
    align-items: center;
  }
  .stars button {
    display: inline-grid;
    place-items: center;
    box-sizing: border-box;
    inline-size: 2.75rem;
    block-size: 2.75rem;
    padding: 0.35rem;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--spectrum-gray-500, #8f8f8f);
    cursor: pointer;
  }
  .stars button:hover {
    color: var(--spectrum-gray-800, #2c2c2c);
    background: var(--spectrum-gray-100, #f1f1f1);
  }
  .stars button:focus-visible {
    outline: 2px solid var(--spectrum-blue-800, #0265dc);
    outline-offset: 2px;
  }
  .stars button[aria-checked='true'] {
    color: var(--spectrum-orange-900, #b14c00);
    background: var(--spectrum-orange-300, #ffb02e);
  }
  .stars button[aria-checked='true']:hover {
    color: var(--spectrum-orange-900, #8a3b00);
    background: var(--spectrum-orange-400, #ffa037);
  }
  .stars button svg {
    inline-size: 1.85rem;
    block-size: 1.85rem;
    flex-shrink: 0;
  }
`;

/**
 * Five-star layout like {@link DemoRadioGroupRating}, with **`defaultToFirstSelectable`** only
 * (first star asserted after **`refresh`**; no **`onSelectionChange`**).
 *
 * @internal
 */
@customElement('demo-radio-rating-default-first')
export class DemoRadioRatingDefaultFirst extends LitElement {
  static override styles = radioRatingDemoChrome;

  private readonly radios = new RadioController(this, {
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>(
          '[data-rating-star-default-first]'
        )
      ),
    selectItem: (star) => star.setAttribute('aria-checked', 'true'),
    deselectItem: (star) => star.setAttribute('aria-checked', 'false'),
    defaultToFirstSelectable: true,
    toggles: false,
  });

  protected override firstUpdated(): void {
    this.radios.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <div role="radiogroup" aria-labelledby="rating-label">
        <div id="rating-label">Rating</div>
        <p class="hint">
          After
          <code>refresh</code>
          , the first star is selected because
          <code>defaultToFirstSelectable</code>
          is
          <code>true</code>
          .
        </p>
        <div class="stars">
          ${[1, 2, 3, 4, 5].map((value) => {
            const label = value === 1 ? `${value} star` : `${value} stars`;
            return html`
              <button
                type="button"
                data-rating-star-default-first
                role="radio"
                aria-checked="false"
                aria-label=${label}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }
}

/**
 * Same chrome as {@link DemoRadioRatingDefaultFirst}, with **`onSelectionChange`** only: each
 * new asserted star triggers **`window.alert`** with its **`aria-label`** (Storybook demos only).
 *
 * @internal
 */
@customElement('demo-radio-rating-on-selection-change-alert')
export class DemoRadioRatingOnSelectionChangeAlert extends LitElement {
  static override styles = radioRatingDemoChrome;

  private readonly radios = new RadioController(this, {
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>(
          '[data-rating-star-on-change]'
        )
      ),
    selectItem: (star) => star.setAttribute('aria-checked', 'true'),
    deselectItem: (star) => star.setAttribute('aria-checked', 'false'),
    defaultToFirstSelectable: false,
    toggles: true,
    onSelectionChange: (detail: RadioControllerSelectionChangeDetail) => {
      const star = detail.selectedItem;
      const label =
        star?.getAttribute('aria-label') ??
        (star ? 'Unknown star' : 'No star selected');
      window.alert(`Rating selection: ${label}`);
    },
  });

  protected override firstUpdated(): void {
    this.radios.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <div role="radiogroup" aria-labelledby="rating-label">
        <div id="rating-label">Rating</div>
        <p class="hint">
          Click stars to change selection;
          <code>onSelectionChange</code>
          shows a
          <code>window.alert</code>
          with the chosen label.
          <code>toggles</code>
          is
          <code>true</code>
          so you can clear by clicking the active star again.
        </p>
        <div class="stars">
          ${[1, 2, 3, 4, 5].map((value) => {
            const label = value === 1 ? `${value} star` : `${value} stars`;
            return html`
              <button
                type="button"
                data-rating-star-on-change
                role="radio"
                aria-checked="false"
                aria-label=${label}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
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
      inline-size: 300px;
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
    toggles: true,
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
            copy: 'Accordion headers often use RadioController alone without a separate focus group.',
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

/**
 * Accordion with four headers and panels — same `RadioController` pattern as
 * {@link DemoRadioAccordionExclusive}, used by the “multiple sections” Storybook story.
 *
 * @internal
 */
@customElement('demo-radio-accordion-multiple')
export class DemoRadioAccordionMultiple extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font:
        0.95rem system-ui,
        sans-serif;
    }
    .accordion {
      max-width: 28rem;
      border: 1px solid var(--spectrum-gray-300, #cbcbcb);
      border-radius: 6px;
      overflow: clip;
    }
    article {
      inline-size: 300px;
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
    .accordion-heading {
      margin: 0;
      font: inherit;
      font-weight: 600;
    }
  `;

  private readonly panels = (): HTMLElement[] =>
    Array.from(this.renderRoot.querySelectorAll<HTMLElement>('.region'));

  private readonly accordionRadio = new RadioController(this, {
    getItems: () =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLButtonElement>(
          '[data-accordion-heading]'
        )
      ),
    selectItem: (header) => {
      header.setAttribute('aria-expanded', 'true');
      this.togglePanel(header.dataset.accordion!, true);
    },
    deselectItem: (header) => {
      header.setAttribute('aria-expanded', 'false');
      this.togglePanel(header.dataset.accordion!, false);
    },
    toggles: true,
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
      this.renderRoot.querySelectorAll<HTMLButtonElement>(
        '[data-accordion-heading]'
      )
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
      <div class="accordion" role="presentation">
        ${[
          {
            key: 'general',
            heading: 'General',
            copy: 'First section open by default. Click another heading to collapse this panel.',
          },
          {
            key: 'appearance',
            heading: 'Appearance',
            copy: 'When this heading is selected, General collapses: its aria-expanded becomes false and its panel gains hidden.',
          },
          {
            key: 'content',
            heading: 'Content',
            copy: 'RadioController calls deselectItem on every non-active header so all other panels are hidden.',
          },
          {
            key: 'support',
            heading: 'Support',
            copy: 'Only one panel stays visible at a time; the open panel matches the heading with aria-expanded="true".',
          },
        ].map(
          ({ key, heading, copy }, ordinal) => html`
            <article>
              <h3 class="accordion-heading">
                <button
                  type="button"
                  class="trigger"
                  data-accordion-heading
                  data-accordion=${key}
                  aria-expanded=${ordinal === 0 ? 'true' : 'false'}
                  aria-controls="multi-accordion-panel-${key}"
                  id="multi-accordion-heading-${key}"
                >
                  <span>${heading}</span>
                  <span class="chevron" aria-hidden="true"></span>
                </button>
              </h3>
              <div
                class="region"
                id=${`multi-accordion-panel-${key}`}
                role="region"
                aria-labelledby="multi-accordion-heading-${key}"
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

const demoTabsKeydownStyles = css`
  :host {
    display: block;
    max-width: 28rem;
    font:
      0.95rem system-ui,
      sans-serif;
  }
  [role='tablist'] {
    display: flex;
    gap: 0.25rem;
    padding: 0.35rem;
    border-radius: 8px;
    border: 1px solid var(--spectrum-gray-300, #d3d3d3);
    background: var(--spectrum-gray-75, #fafafa);
  }
  [role='tab'] {
    flex: 1 1 auto;
    margin: 0;
    padding: 0.5rem 0.65rem;
    border: 1px solid transparent;
    border-radius: 6px;
    background: transparent;
    font: inherit;
    cursor: pointer;
  }
  [role='tab']:focus-visible {
    outline: 2px solid var(--spectrum-blue-800, #0265dc);
    outline-offset: 2px;
  }
  [role='tab'][aria-selected='true'] {
    background: var(--spectrum-gray-200, #e6e6e6);
    border-color: var(--spectrum-gray-400, #b1b1b1);
    font-weight: 600;
  }
  .panels {
    margin-block-start: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid var(--spectrum-gray-300, #d3d3d3);
  }
  [role='tabpanel'] {
    margin: 0;
  }
  [role='tabpanel'][hidden] {
    display: none;
  }
  .hint {
    margin: 0 0 0.65rem;
    font-size: 0.82rem;
    color: var(--spectrum-gray-700, #464646);
  }
`;

/**
 * Minimal `role="tablist"` demo: **`RadioController`** with **`keydownActivation: true`** so
 * **Enter** / **Space** assert the focused tab; left/right arrows move focus (roving tabindex).
 * Pointer clicks still select via the same controller.
 *
 * @internal
 */
@customElement('demo-radio-tabs-keydown')
export class DemoRadioTabsKeydown extends LitElement {
  static override styles = demoTabsKeydownStyles;

  private tabButtons: HTMLButtonElement[] = [];

  private readonly tabRadio = new RadioController(this, {
    getItems: () => this.tabButtons,
    selectItem: (tab) => {
      tab.setAttribute('aria-selected', 'true');
      tab.tabIndex = 0;
      const key = tab.dataset.tab!;
      const panel = this.renderRoot.querySelector<HTMLElement>(
        `[data-tab-panel="${key}"]`
      );
      panel?.removeAttribute('hidden');
    },
    deselectItem: (tab) => {
      tab.setAttribute('aria-selected', 'false');
      tab.tabIndex = -1;
      const key = tab.dataset.tab!;
      const panel = this.renderRoot.querySelector<HTMLElement>(
        `[data-tab-panel="${key}"]`
      );
      panel?.setAttribute('hidden', '');
    },
    keydownActivation: true,
    defaultToFirstSelectable: true,
  });

  protected override firstUpdated(): void {
    this.tabButtons = Array.from(
      this.renderRoot.querySelectorAll<HTMLButtonElement>('[data-tab]')
    );
    this.tabRadio.refresh();
  }

  private handleTabListKeydown(event: KeyboardEvent): void {
    if (event.code !== 'ArrowLeft' && event.code !== 'ArrowRight') {
      return;
    }
    const tabs = this.tabButtons;
    const root = this.renderRoot as ShadowRoot | HTMLElement;
    const active = root instanceof ShadowRoot ? root.activeElement : null;
    const index = tabs.indexOf(active as HTMLButtonElement);
    if (index === -1) {
      return;
    }
    event.preventDefault();
    const delta = event.code === 'ArrowRight' ? 1 : -1;
    const next = (index + delta + tabs.length) % tabs.length;
    tabs[next]?.focus();
  }

  protected override render(): TemplateResult {
    return html`
      <p class="hint">
        Use arrow keys to move focus, then
        <kbd>Enter</kbd>
        or
        <kbd>Space</kbd>
        to select (via
        <code>keydownActivation: true</code>
        ). Pointer still works.
      </p>
      <div
        role="tablist"
        aria-label="Sample tabs"
        @keydown=${this.handleTabListKeydown}
      >
        <button
          type="button"
          role="tab"
          data-tab="1"
          id="demo-kd-tab-1"
          aria-controls="demo-kd-panel-1"
          aria-selected="false"
          tabindex="-1"
        >
          Files
        </button>
        <button
          type="button"
          role="tab"
          data-tab="2"
          id="demo-kd-tab-2"
          aria-controls="demo-kd-panel-2"
          aria-selected="false"
          tabindex="-1"
        >
          Search
        </button>
        <button
          type="button"
          role="tab"
          data-tab="3"
          id="demo-kd-tab-3"
          aria-controls="demo-kd-panel-3"
          aria-selected="false"
          tabindex="-1"
        >
          Publish
        </button>
      </div>
      <div class="panels">
        <div
          id="demo-kd-panel-1"
          role="tabpanel"
          data-tab-panel="1"
          aria-labelledby="demo-kd-tab-1"
          hidden
        >
          <p>Files panel (tab 1).</p>
        </div>
        <div
          id="demo-kd-panel-2"
          role="tabpanel"
          data-tab-panel="2"
          aria-labelledby="demo-kd-tab-2"
          hidden
        >
          <p>Search panel (tab 2).</p>
        </div>
        <div
          id="demo-kd-panel-3"
          role="tabpanel"
          data-tab-panel="3"
          aria-labelledby="demo-kd-tab-3"
          hidden
        >
          <p>Publish panel (tab 3).</p>
        </div>
      </div>
    `;
  }
}
