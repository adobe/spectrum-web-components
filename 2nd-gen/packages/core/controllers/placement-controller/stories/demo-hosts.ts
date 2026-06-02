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
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import {
  type Placement,
  PlacementController,
  type PlacementOptions,
  type VirtualTrigger,
} from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-placement-playground': DemoPlacementPlayground;
    'demo-placement-offset': DemoPlacementOffset;
    'demo-placement-constrain-size': DemoPlacementConstrainSize;
    'demo-placement-virtual-trigger': DemoPlacementVirtualTrigger;
    'demo-placement-placements': DemoPlacementPlacements;
    'demo-placement-cell': DemoPlacementCell;
    'demo-placement-test-fixture': DemoPlacementTestFixture;
    'demo-placement-arrow': DemoPlacementArrow;
  }
}

const sharedStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    padding: 24px;
  }

  .floating {
    position: fixed;
    inset: 0 auto auto 0;
    min-width: 120px;
    padding: 12px;
    border: 1px solid currentcolor;
    background: Canvas;
    color: CanvasText;
    pointer-events: none;
  }

  .meta {
    margin-block-start: 8px;
  }
`;

function bindController(
  controller: PlacementController,
  triggerEl: HTMLElement | VirtualTrigger,
  floatingEl: HTMLElement,
  options: PlacementOptions,
  onPlacement?: (next: Placement) => void
): void {
  controller.start(triggerEl, floatingEl, {
    ...options,
    onPlacementChange: (next) => {
      onPlacement?.(next);
      options.onPlacementChange?.(next);
    },
  });
}

const PLAYGROUND_DEFAULTS = {
  placement: 'bottom' as Placement,
  offset: 0,
  crossOffset: 0,
  containerPadding: 8,
  shouldFlip: true,
};

/** Spectrum typography utility classes (requires `typography.css` in Storybook). */
const FIELD_TITLE = 'swc-Detail swc-Detail--sizeXS swc-Typography--emphasized';
const FIELD_HINT = 'swc-Detail swc-Detail--sizeXS';
const BODY_XS = 'swc-Body swc-Body--sizeXS';
const BODY_XS_EMPHASIZED =
  'swc-Body swc-Body--sizeXS swc-Typography--emphasized';
const DETAIL_XS = 'swc-Detail swc-Detail--sizeXS';
const CODE_XS = 'swc-Code swc-Code--sizeXS';

function demoClasses(
  ...parts: Array<Record<string, boolean | undefined> | string | undefined>
): Record<string, boolean> {
  const classes: Record<string, boolean> = {};

  for (const part of parts) {
    if (!part) {
      continue;
    }

    if (typeof part === 'string') {
      for (const name of part.split(/\s+/).filter(Boolean)) {
        classes[name] = true;
      }
      continue;
    }

    for (const [name, active] of Object.entries(part)) {
      if (active) {
        classes[name] = true;
      }
    }
  }

  return classes;
}

@customElement('demo-placement-playground')
export class DemoPlacementPlayground extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      .controls {
        margin-block-end: 16px;
      }

      .controls-layout {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
        gap: 20px;
        align-items: start;
      }

      .controls-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-inline-size: 0;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-inline-size: 0;
      }

      .field-label-group {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .field-label-group :is(h3, p) {
        margin: 0;
      }

      .field-control {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .field input[type='number'] {
        box-sizing: border-box;
        inline-size: 4rem;
        padding: 3px 5px;
      }

      .field-checkbox .field-control {
        align-items: flex-start;
      }

      .field-checkbox input[type='checkbox'] {
        margin-block-start: 2px;
      }

      .placement-picker {
        display: grid;
        grid-template-columns: repeat(5, 24px);
        grid-template-rows: repeat(5, 24px);
        gap: 3px;
        padding: 8px;
        border-radius: 4px;
        background: color-mix(in srgb, CanvasText 8%, Canvas);
        inline-size: fit-content;
      }

      .placement-cell {
        box-sizing: border-box;
        block-size: 24px;
        inline-size: 24px;
        border: 1px solid color-mix(in srgb, CanvasText 55%, Canvas);
        background: Canvas;
        padding: 0;
      }

      .placement-cell:hover {
        background: color-mix(in srgb, CanvasText 12%, Canvas);
      }

      .placement-cell[aria-pressed='true'] {
        background: CanvasText;
        border-color: CanvasText;
      }

      .demo-surface {
        block-size: 220px;
        display: grid;
        place-items: center;
      }

      .demo-surface button.trigger {
        box-sizing: border-box;
        inline-size: 48px;
        block-size: 48px;
        min-inline-size: 48px;
        min-block-size: 48px;
        padding: 0;
      }

      .floating {
        min-width: 72px;
        padding: 6px;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  placement: Placement = PLAYGROUND_DEFAULTS.placement;

  @property({ type: Number, reflect: true })
  offset = PLAYGROUND_DEFAULTS.offset;

  @property({ type: Number, attribute: 'cross-offset', reflect: true })
  crossOffset = PLAYGROUND_DEFAULTS.crossOffset;

  @property({ type: Number, attribute: 'container-padding', reflect: true })
  containerPadding = PLAYGROUND_DEFAULTS.containerPadding;

  @property({ type: Boolean, attribute: 'should-flip', reflect: true })
  shouldFlip = PLAYGROUND_DEFAULTS.shouldFlip;

  @property({ type: String, attribute: 'actual-placement', reflect: true })
  actualPlacement: Placement | null = null;

  @query('button.trigger') triggerEl!: HTMLButtonElement;
  @query('.floating') floatingEl!: HTMLDivElement;

  private controller = new PlacementController(this);

  protected override firstUpdated(): void {
    this.bind();
  }

  protected override updated(changed: PropertyValues): void {
    if (
      changed.has('placement') ||
      changed.has('offset') ||
      changed.has('crossOffset') ||
      changed.has('containerPadding') ||
      changed.has('shouldFlip')
    ) {
      this.bind();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback?.();
    this.controller.stop();
  }

  private bind(): void {
    if (!this.triggerEl || !this.floatingEl) {
      return;
    }
    bindController(
      this.controller,
      this.triggerEl,
      this.floatingEl,
      {
        placement: this.placement,
        offset: this.offset,
        crossOffset: this.crossOffset,
        containerPadding: this.containerPadding,
        shouldFlip: this.shouldFlip,
      },
      (next) => {
        this.actualPlacement = next;
      }
    );
  }

  private onPlacementCellClick(placement: Placement): void {
    this.placement = placement;
  }

  private onNumberInput(
    property: 'offset' | 'crossOffset' | 'containerPadding',
    event: Event
  ): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (Number.isFinite(value)) {
      this[property] = value;
    }
  }

  private onShouldFlipChange(event: Event): void {
    this.shouldFlip = (event.target as HTMLInputElement).checked;
  }

  private renderPlacementPickerCell(
    placement: Placement,
    style: string
  ): TemplateResult {
    const selected = this.placement === placement;
    return html`
      <button
        type="button"
        class="placement-cell"
        style=${style}
        aria-pressed=${selected ? 'true' : 'false'}
        aria-label=${placement}
        title=${placement}
        @click=${() => this.onPlacementCellClick(placement)}
      ></button>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="controls">
        <div class="controls-layout">
          <div class="controls-group">
            <div class="field">
              <div class="field-label-group">
                <h3 class=${classMap(demoClasses(FIELD_TITLE))}>Placement</h3>
                <p class=${classMap(demoClasses(FIELD_HINT))}>
                  Preferred side and alignment relative to the trigger. The
                  computed value may differ when should flip reorients.
                </p>
              </div>
              <div
                class="placement-picker"
                role="group"
                aria-label="Choose placement"
              >
                ${this.renderPlacementPickerCell(
                  'top-start',
                  'grid-area: 1 / 2'
                )}
                ${this.renderPlacementPickerCell('top', 'grid-area: 1 / 3')}
                ${this.renderPlacementPickerCell('top-end', 'grid-area: 1 / 4')}
                ${this.renderPlacementPickerCell(
                  'left-top',
                  'grid-area: 2 / 1'
                )}
                ${this.renderPlacementPickerCell(
                  'right-top',
                  'grid-area: 2 / 5'
                )}
                ${this.renderPlacementPickerCell('left', 'grid-area: 3 / 1')}
                ${this.renderPlacementPickerCell('right', 'grid-area: 3 / 5')}
                ${this.renderPlacementPickerCell(
                  'left-bottom',
                  'grid-area: 4 / 1'
                )}
                ${this.renderPlacementPickerCell(
                  'right-bottom',
                  'grid-area: 4 / 5'
                )}
                ${this.renderPlacementPickerCell(
                  'bottom-start',
                  'grid-area: 5 / 2'
                )}
                ${this.renderPlacementPickerCell('bottom', 'grid-area: 5 / 3')}
                ${this.renderPlacementPickerCell(
                  'bottom-end',
                  'grid-area: 5 / 4'
                )}
              </div>
            </div>
            <div class="field field-checkbox">
              <div class="field-label-group">
                <h3 class=${classMap(demoClasses(FIELD_TITLE))}>Should flip</h3>
                <p class=${classMap(demoClasses(FIELD_HINT))}>
                  When enabled, move the floating element to the opposite side
                  if the requested placement does not fit in the viewport.
                  Disable to keep the requested side even when it overflows.
                </p>
              </div>
              <label class="field-control">
                <input
                  type="checkbox"
                  aria-label="Should flip"
                  .checked=${this.shouldFlip}
                  title="Allow flip middleware to reorient when there is insufficient room."
                  @change=${this.onShouldFlipChange}
                />
                <span class=${classMap(demoClasses(DETAIL_XS))}>
                  Enable flip
                </span>
              </label>
            </div>
          </div>
          <div class="controls-group">
            <div class="field">
              <div class="field-label-group">
                <h3 class=${classMap(demoClasses(FIELD_TITLE))}>Offset</h3>
                <p class=${classMap(demoClasses(FIELD_HINT))}>
                  Gap along the placement direction between the trigger and the
                  floating element (px). For example, space below the trigger
                  when placement is
                  <code class=${classMap(demoClasses(CODE_XS))}>bottom</code>
                  .
                </p>
              </div>
              <label class="field-control">
                <input
                  type="number"
                  class=${classMap(demoClasses(DETAIL_XS))}
                  aria-label="Offset in pixels"
                  .value=${String(this.offset)}
                  title="Main-axis gap from the trigger to the floating element."
                  @input=${(event: Event) =>
                    this.onNumberInput('offset', event)}
                />
                <span class=${classMap(demoClasses(DETAIL_XS))}>px</span>
              </label>
            </div>
            <div class="field">
              <div class="field-label-group">
                <h3 class=${classMap(demoClasses(FIELD_TITLE))}>
                  Cross offset
                </h3>
                <p class=${classMap(demoClasses(FIELD_HINT))}>
                  Slide along the trigger edge (px). Changes alignment such as
                  <code class=${classMap(demoClasses(CODE_XS))}>
                    bottom-start
                  </code>
                  vs
                  <code class=${classMap(demoClasses(CODE_XS))}>
                    bottom-end
                  </code>
                  without changing viewport inset.
                </p>
              </div>
              <label class="field-control">
                <input
                  type="number"
                  class=${classMap(demoClasses(DETAIL_XS))}
                  aria-label="Cross offset in pixels"
                  .value=${String(this.crossOffset)}
                  title="Cross-axis slide along the trigger edge."
                  @input=${(event: Event) =>
                    this.onNumberInput('crossOffset', event)}
                />
                <span class=${classMap(demoClasses(DETAIL_XS))}>px</span>
              </label>
            </div>
            <div class="field">
              <div class="field-label-group">
                <h3 class=${classMap(demoClasses(FIELD_TITLE))}>
                  Container padding
                </h3>
                <p class=${classMap(demoClasses(FIELD_HINT))}>
                  Minimum inset from the overflow boundary (px) when flip or
                  shift keeps the floating element on screen. Uses clipping
                  ancestors capped by the visual viewport by default.
                </p>
              </div>
              <label class="field-control">
                <input
                  type="number"
                  class=${classMap(demoClasses(DETAIL_XS))}
                  aria-label="Container padding in pixels"
                  .value=${String(this.containerPadding)}
                  title="Overflow-boundary inset for flip and shift middleware."
                  @input=${(event: Event) =>
                    this.onNumberInput('containerPadding', event)}
                />
                <span class=${classMap(demoClasses(DETAIL_XS))}>px</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="demo-surface">
        <button
          class=${classMap(demoClasses({ trigger: true }, DETAIL_XS))}
          type="button"
        >
          Trigger
        </button>
        <div class="floating">
          <span class=${classMap(demoClasses(BODY_XS_EMPHASIZED))}>
            ${this.placement}
          </span>
        </div>
      </div>
    `;
  }
}

@customElement('demo-placement-offset')
export class DemoPlacementOffset extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host .floating {
        min-width: 7rem;
        padding: 8px 10px;
      }

      .surface {
        display: flex;
        flex-direction: column;
        gap: 32px;
      }

      .section-title {
        margin: 0 0 12px;
        text-align: center;
      }

      .compare {
        display: grid;
        grid-template-columns: repeat(2, minmax(11rem, 1fr));
        gap: 16px 64px;
        justify-content: center;
        max-inline-size: 28rem;
        margin-inline: auto;
      }

      .example {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        text-align: center;
      }

      .caption {
        margin: 0;
        min-block-size: 2.5rem;
      }

      .anchor {
        display: flex;
        flex-direction: column;
        align-items: center;
        inline-size: 10rem;
      }

      .trigger {
        inline-size: 10rem;
        block-size: 2rem;
        margin: 0;
        padding: 0;
      }

      /* Reserve space below each trigger for fixed-position floating panels. */
      .anchor-space {
        inline-size: 100%;
        block-size: 7rem;
      }

      .section--cross {
        margin-block-start: 16px;
      }
    `,
  ];

  @query('[data-offset-demo="default-main"]')
  defaultMainTrigger!: HTMLButtonElement;
  @query('.floating-default-main')
  defaultMainFloating!: HTMLDivElement;
  @query('[data-offset-demo="large-main"]')
  largeMainTrigger!: HTMLButtonElement;
  @query('.floating-large-main')
  largeMainFloating!: HTMLDivElement;
  @query('[data-offset-demo="default-cross"]')
  defaultCrossTrigger!: HTMLButtonElement;
  @query('.floating-default-cross')
  defaultCrossFloating!: HTMLDivElement;
  @query('[data-offset-demo="large-cross"]')
  largeCrossTrigger!: HTMLButtonElement;
  @query('.floating-large-cross')
  largeCrossFloating!: HTMLDivElement;

  private defaultMainController = new PlacementController(this);
  private largeMainController = new PlacementController(this);
  private defaultCrossController = new PlacementController(this);
  private largeCrossController = new PlacementController(this);

  protected override firstUpdated(): void {
    bindController(
      this.defaultMainController,
      this.defaultMainTrigger,
      this.defaultMainFloating,
      {}
    );
    bindController(
      this.largeMainController,
      this.largeMainTrigger,
      this.largeMainFloating,
      { offset: 48 }
    );
    bindController(
      this.defaultCrossController,
      this.defaultCrossTrigger,
      this.defaultCrossFloating,
      {}
    );
    bindController(
      this.largeCrossController,
      this.largeCrossTrigger,
      this.largeCrossFloating,
      { crossOffset: 48 }
    );
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback?.();
    this.defaultMainController.stop();
    this.largeMainController.stop();
    this.defaultCrossController.stop();
    this.largeCrossController.stop();
  }

  protected override render(): TemplateResult {
    return html`
      <div class="surface">
        <section aria-label="Main axis offset">
          <h3
            class=${classMap(
              demoClasses({ 'section-title': true }, FIELD_TITLE)
            )}
          >
            Main axis (offset)
          </h3>
          <div class="compare">
            <div class="example">
              <p class=${classMap(demoClasses({ caption: true }, FIELD_HINT))}>
                Default — 8&nbsp;px below
              </p>
              <div class="anchor">
                <button
                  type="button"
                  class=${classMap(demoClasses({ trigger: true }, DETAIL_XS))}
                  data-offset-demo="default-main"
                >
                  Trigger
                </button>
                <div class="floating floating-default-main">
                  <span class=${classMap(demoClasses(DETAIL_XS))}>default</span>
                </div>
                <div class="anchor-space" aria-hidden="true"></div>
              </div>
            </div>
            <div class="example">
              <p class=${classMap(demoClasses({ caption: true }, FIELD_HINT))}>
                offset: 48
              </p>
              <div class="anchor">
                <button
                  type="button"
                  class=${classMap(demoClasses({ trigger: true }, DETAIL_XS))}
                  data-offset-demo="large-main"
                >
                  Trigger
                </button>
                <div class="floating floating-large-main">
                  <span class=${classMap(demoClasses(DETAIL_XS))}>
                    offset: 48
                  </span>
                </div>
                <div class="anchor-space" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </section>
        <section class="section--cross" aria-label="Cross axis offset">
          <h3
            class=${classMap(
              demoClasses({ 'section-title': true }, FIELD_TITLE)
            )}
          >
            Cross axis (crossOffset)
          </h3>
          <div class="compare">
            <div class="example">
              <p class=${classMap(demoClasses({ caption: true }, FIELD_HINT))}>
                Default — centered
              </p>
              <div class="anchor">
                <button
                  type="button"
                  class=${classMap(demoClasses({ trigger: true }, DETAIL_XS))}
                  data-offset-demo="default-cross"
                >
                  Trigger
                </button>
                <div class="floating floating-default-cross">
                  <span class=${classMap(demoClasses(DETAIL_XS))}>default</span>
                </div>
                <div class="anchor-space" aria-hidden="true"></div>
              </div>
            </div>
            <div class="example">
              <p class=${classMap(demoClasses({ caption: true }, FIELD_HINT))}>
                crossOffset: 48
              </p>
              <div class="anchor">
                <button
                  type="button"
                  class=${classMap(demoClasses({ trigger: true }, DETAIL_XS))}
                  data-offset-demo="large-cross"
                >
                  Trigger
                </button>
                <div class="floating floating-large-cross">
                  <span class=${classMap(demoClasses(DETAIL_XS))}>
                    crossOffset: 48
                  </span>
                </div>
                <div class="anchor-space" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }
}

@customElement('demo-placement-constrain-size')
export class DemoPlacementConstrainSize extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      .surface {
        block-size: 180px;
        display: grid;
        place-items: center;
        overflow: hidden;
      }

      .floating {
        /* Consume the controller's available-space props so the list clamps
         * and scrolls instead of overflowing. */
        max-inline-size: var(--swc-placement-available-width);
        max-block-size: var(--swc-placement-available-height);
        overflow: auto;
        pointer-events: auto;
      }

      .item {
        padding: 4px 0;
        border-block-end: 1px solid
          color-mix(in srgb, currentcolor 20%, transparent);
      }
    `,
  ];

  @property({ type: Boolean, attribute: 'is-constrained', reflect: true })
  isConstrained = false;

  @query('button') triggerEl!: HTMLButtonElement;
  @query('.floating') floatingEl!: HTMLDivElement;

  private controller = new PlacementController(this);

  protected override firstUpdated(): void {
    bindController(this.controller, this.triggerEl, this.floatingEl, {}, () => {
      this.isConstrained = this.controller.isConstrained;
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback?.();
    this.controller.stop();
  }

  protected override render(): TemplateResult {
    const items = Array.from({ length: 24 }, (_, i) => `Item ${i + 1}`);
    return html`
      <div class="surface">
        <button type="button" class=${classMap(demoClasses(DETAIL_XS))}>
          Open list
        </button>
        <div class="floating">
          ${items.map(
            (label) => html`
              <div class=${classMap(demoClasses({ item: true }, BODY_XS))}>
                ${label}
              </div>
            `
          )}
        </div>
      </div>
      <p class=${classMap(demoClasses({ meta: true }, DETAIL_XS))}>
        isConstrained: ${this.isConstrained}
      </p>
    `;
  }
}

@customElement('demo-placement-virtual-trigger')
export class DemoPlacementVirtualTrigger extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      .surface {
        position: relative;
        inline-size: 320px;
        block-size: 320px;
        margin-inline: auto;
        display: grid;
        place-items: center;
        outline: 1px dashed currentcolor;
        cursor: crosshair;
      }

      .anchor-mark {
        position: absolute;
        inline-size: 16px;
        block-size: 16px;
        transform: translate(-50%, -50%);
        pointer-events: none;
      }

      .anchor-mark::before,
      .anchor-mark::after {
        content: '';
        position: absolute;
        inset-block-start: 50%;
        inset-inline-start: 50%;
        inline-size: 14px;
        block-size: 2px;
        background: currentcolor;
        transform-origin: center;
      }

      .anchor-mark::before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      .anchor-mark::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    `,
  ];

  @property({ type: Number, reflect: true })
  x = 80;

  @property({ type: Number, reflect: true })
  y = 80;

  @query('.surface') surfaceEl!: HTMLDivElement;
  @query('.floating') floatingEl!: HTMLDivElement;

  private controller = new PlacementController(this);

  private virtualTrigger: VirtualTrigger = {
    getBoundingClientRect: () => {
      const rect = this.surfaceEl.getBoundingClientRect();
      return new DOMRect(rect.left + this.x, rect.top + this.y, 0, 0);
    },
  };

  protected override firstUpdated(): void {
    this.virtualTrigger.contextElement = this.surfaceEl;
    bindController(this.controller, this.virtualTrigger, this.floatingEl, {
      offset: 12,
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback?.();
    this.controller.stop();
  }

  private moveAnchor(clientX: number, clientY: number): void {
    const rect = this.surfaceEl.getBoundingClientRect();
    this.x = clientX - rect.left;
    this.y = clientY - rect.top;
    this.controller.recompute();
  }

  private onClick(event: MouseEvent): void {
    this.moveAnchor(event.clientX, event.clientY);
  }

  private onKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    event.preventDefault();
    const rect = this.surfaceEl.getBoundingClientRect();
    this.moveAnchor(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="surface"
        role="button"
        tabindex="0"
        @click=${this.onClick}
        @keydown=${this.onKeydown}
      >
        <span
          class=${classMap(
            demoClasses('swc-Body swc-Body--sizeL swc-Typography--emphasized')
          )}
        >
          Click to move anchor
        </span>
        <div
          class="anchor-mark"
          style="left: ${this.x}px; top: ${this.y}px"
          aria-hidden="true"
        ></div>
      </div>
      <div class="floating">
        <span class=${classMap(demoClasses(DETAIL_XS))}>
          (${this.x}, ${this.y})
        </span>
      </div>
    `;
  }
}

@customElement('demo-placement-placements')
export class DemoPlacementPlacements extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 16px;
      }

      .cell {
        block-size: 120px;
        display: grid;
        place-items: center;
        outline: 1px dashed color-mix(in srgb, currentcolor 40%, transparent);
        position: relative;
      }

      .floating {
        min-width: 0;
        padding: 6px 8px;
      }
    `,
  ];

  private placements: Placement[] = [
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'right',
  ];

  protected override render(): TemplateResult {
    return html`
      <div class="grid">
        ${this.placements.map(
          (placement) => html`
            <demo-placement-cell placement=${placement}></demo-placement-cell>
          `
        )}
      </div>
    `;
  }
}

@customElement('demo-placement-cell')
class DemoPlacementCell extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        padding: 0;
        block-size: 100%;
      }

      .cell {
        block-size: 100%;
        display: grid;
        place-items: center;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  placement: Placement = 'bottom';

  @query('button') triggerEl!: HTMLButtonElement;
  @query('.floating') floatingEl!: HTMLDivElement;

  private controller = new PlacementController(this);

  protected override firstUpdated(): void {
    bindController(this.controller, this.triggerEl, this.floatingEl, {
      placement: this.placement,
      shouldFlip: false,
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback?.();
    this.controller.stop();
  }

  protected override render(): TemplateResult {
    return html`
      <div class="cell">
        <button type="button" class=${classMap(demoClasses(DETAIL_XS))}>
          •
        </button>
        <div class="floating">
          <span class=${classMap(demoClasses(DETAIL_XS))}>
            ${this.placement}
          </span>
        </div>
      </div>
    `;
  }
}

/**
 * Test-only fixture. Renders a configurable trigger + floating element so
 * test play functions can drive the controller through real DOM at a known
 * geometry. Not surfaced from any docs story — only the tests reference it.
 *
 * Geometry controls:
 *  - `triggerPosition` pins the trigger to a corner / edge / center of the
 *    surface (which fills the viewport), so flip and shift behaviour can be
 *    set up deterministically.
 *  - `tallFloating` swaps in a 600px-tall floating panel, useful for forcing
 *    the bottom placement to overflow.
 *
 * Observables:
 *  - `actualPlacement` reflects the controller's computed placement.
 *  - `placementChanges` records each `onPlacementChange` invocation (reset
 *    on every rebind), so tests can assert firing semantics.
 *  - `controller` is exposed so tests can call `recompute()` directly.
 */
type TriggerPosition =
  | 'center'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-center'
  | 'bottom-right';

@customElement('demo-placement-test-fixture')
export class DemoPlacementTestFixture extends LitElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
      inline-size: 100%;
      block-size: 100vh;
    }

    .surface {
      position: relative;
      inline-size: 100%;
      block-size: 100%;
    }

    button.trigger {
      position: absolute;
      inline-size: 40px;
      block-size: 40px;
      margin: 0;
      padding: 0;
    }

    button.trigger[data-position='center'] {
      inset-block-start: 50%;
      inset-inline-start: 50%;
      translate: -50% -50%;
    }

    button.trigger[data-position='top-left'] {
      inset-block-start: 8px;
      inset-inline-start: 8px;
    }

    button.trigger[data-position='top-center'] {
      inset-block-start: 8px;
      inset-inline-start: 50%;
      translate: -50% 0;
    }

    button.trigger[data-position='top-right'] {
      inset-block-start: 8px;
      inset-inline-end: 8px;
    }

    button.trigger[data-position='bottom-center'] {
      inset-block-end: 8px;
      inset-inline-start: 50%;
      translate: -50% 0;
    }

    button.trigger[data-position='bottom-right'] {
      inset-block-end: 8px;
      inset-inline-end: 8px;
    }

    .floating {
      position: fixed;
      inset: 0 auto auto 0;
      inline-size: 80px;
      block-size: 40px;
      padding: 4px;
      background: Canvas;
      color: CanvasText;
      border: 1px solid currentcolor;
      pointer-events: none;
    }

    .floating.tall {
      block-size: 600px;
    }
  `;

  @property({ type: String, reflect: true })
  placement: Placement = 'bottom';

  @property({ type: Number, reflect: true })
  offset = 0;

  @property({ type: Number, attribute: 'cross-offset', reflect: true })
  crossOffset = 0;

  @property({ type: Number, attribute: 'container-padding', reflect: true })
  containerPadding = 8;

  @property({ type: Boolean, attribute: 'should-flip', reflect: true })
  shouldFlip = true;

  @property({ type: Boolean, attribute: 'tall-floating', reflect: true })
  tallFloating = false;

  @property({ type: String, attribute: 'trigger-position', reflect: true })
  triggerPosition: TriggerPosition = 'center';

  @property({ type: String, attribute: 'actual-placement', reflect: true })
  actualPlacement: Placement | null = null;

  /** Records every `onPlacementChange` invocation since the last rebind. */
  placementChanges: Placement[] = [];

  @query('button.trigger') triggerEl!: HTMLButtonElement;

  @query('.floating') floatingEl!: HTMLDivElement;

  /** Exposed so tests can call `recompute()` and similar directly. */
  controller = new PlacementController(this);

  protected override firstUpdated(): void {
    this.bind();
  }

  protected override updated(changed: PropertyValues): void {
    if (
      changed.has('placement') ||
      changed.has('offset') ||
      changed.has('crossOffset') ||
      changed.has('containerPadding') ||
      changed.has('shouldFlip') ||
      changed.has('triggerPosition')
    ) {
      this.bind();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback?.();
    this.controller.stop();
  }

  private bind(): void {
    if (!this.triggerEl || !this.floatingEl) {
      return;
    }
    this.placementChanges = [];
    this.controller.start(this.triggerEl, this.floatingEl, {
      placement: this.placement,
      offset: this.offset,
      crossOffset: this.crossOffset,
      containerPadding: this.containerPadding,
      shouldFlip: this.shouldFlip,
      onPlacementChange: (next) => {
        this.actualPlacement = next;
        this.placementChanges.push(next);
      },
    });
  }

  protected override render(): TemplateResult {
    return html`
      <div class="surface">
        <button
          type="button"
          class="trigger"
          data-position=${this.triggerPosition}
        >
          T
        </button>
        <div class=${classMap({ floating: true, tall: this.tallFloating })}>
          ${this.placement}
        </div>
      </div>
    `;
  }
}

@customElement('demo-placement-arrow')
export class DemoPlacementArrow extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      .demo {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      }

      .surface {
        display: grid;
        place-items: center;
        block-size: 180px;
      }

      button.trigger {
        min-block-size: 32px;
        padding-inline: 14px;
      }

      .floating {
        inline-size: 200px;
        block-size: auto;
        padding: 12px 14px;
        border-radius: 6px;
      }

      .tip {
        position: absolute;
        width: 12px;
        height: 12px;
        rotate: 45deg;
        background: Canvas;
        border-top: 1px solid currentcolor;
        border-left: 1px solid currentcolor;
        pointer-events: none;
      }

      /* CSS pins the tip to the relevant edge of the floating panel based
         on the computed placement; the controller then writes inline
         translate to slide it along that edge so it points at the
         trigger's center. */
      :host([actual-placement^='bottom']) .tip {
        inset-block-start: -7px;
      }

      :host([actual-placement^='top']) .tip {
        inset-block-end: -7px;
        rotate: 225deg;
      }

      :host([actual-placement^='right']),
      :host([actual-placement^='end']) {
      }

      :host([actual-placement^='right']) .tip,
      :host([actual-placement^='end']) .tip {
        inset-inline-start: -7px;
        rotate: -45deg;
      }

      :host([actual-placement^='left']) .tip,
      :host([actual-placement^='start']) .tip {
        inset-inline-end: -7px;
        rotate: 135deg;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  placement: Placement = 'bottom-end';

  @property({ type: String, attribute: 'actual-placement', reflect: true })
  actualPlacement: Placement | null = null;

  @query('button.trigger') triggerEl!: HTMLButtonElement;

  @query('.floating') floatingEl!: HTMLDivElement;

  @query('.tip') tipEl!: HTMLDivElement;

  private controller = new PlacementController(this);

  protected override firstUpdated(): void {
    this.controller.start(this.triggerEl, this.floatingEl, {
      placement: this.placement,
      offset: 10,
      tipElement: this.tipEl,
      tipPadding: 8,
      onPlacementChange: (next) => {
        this.actualPlacement = next;
      },
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback?.();
    this.controller.stop();
  }

  protected override render(): TemplateResult {
    return html`
      <div class="demo">
        <p class=${classMap(demoClasses(FIELD_HINT))}>
          The triangular tip is positioned by Floating UI's
          <strong>arrow</strong>
          middleware so it always points at the trigger's center — even when the
          panel is shifted to stay inside the viewport.
        </p>
        <div class="surface">
          <button
            type="button"
            class=${classMap(demoClasses({ trigger: true }, DETAIL_XS))}
          >
            Trigger
          </button>
        </div>
        <div class="floating">
          <div class="tip" aria-hidden="true"></div>
          <span class=${classMap(demoClasses(BODY_XS_EMPHASIZED))}>
            placement: ${this.actualPlacement ?? this.placement}
          </span>
        </div>
      </div>
    `;
  }
}
