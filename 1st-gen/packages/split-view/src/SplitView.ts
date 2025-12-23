/**
 * Copyright 2025 Adobe. All rights reserved.
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
    CSSResultArray,
    html,
    LitElement,
    nothing,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    classMap,
    ifDefined,
} from '@spectrum-web-components/base/src/directives.js';
import {
    property,
    query,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import { streamingListener } from '@spectrum-web-components/base/src/streaming-listener.js';
import { randomID } from '@spectrum-web-components/shared/src/random-id.js';

import { WithSWCResizeObserver } from './types';

import styles from './split-view.css.js';

const DEFAULT_MAX_SIZE = 3840;

const SPLITTERSIZE = 2;

const ARROW_KEY_CHANGE_VALUE = 10;

const PAGEUPDOWN_KEY_CHANGE_VALUE = 50;

const COLLAPSE_THREASHOLD = 50;

/**
 * @element sp-split-view
 *
 * @slot Two sibling elements to be sized by the element attritubes
 * @fires change - Announces the new position of the splitter
 */
export class SplitView extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @state()
    public controlledEl?: HTMLElement;

    @property({ type: Boolean, reflect: true })
    public vertical = false;

    @property({ type: Boolean, reflect: true })
    public resizable = false;

    @property({ type: Boolean, reflect: true })
    public collapsible = false;

    /** The minimum size of the primary pane */
    @property({ type: Number, attribute: 'primary-min' })
    public primaryMin = 0;

    /** The maximum size of the primary pane */
    @property({ type: Number, attribute: 'primary-max' })
    public primaryMax = DEFAULT_MAX_SIZE;

    /**
     * The start size of the primary pane, can be a real pixel number|string, percentage or "auto"
     * For example: "100", "120px", "75%" or "auto" are valid values
     * @type {number | number + "px" | number + "%" | "auto"}
     * @attr
     */
    @property({ type: String, attribute: 'primary-size' })
    public primarySize?: string;

    /** The minimum size of the secondary pane */
    @property({ type: Number, attribute: 'secondary-min' })
    public secondaryMin = 0;

    /** The maximum size of the secondary pane */
    @property({ type: Number, attribute: 'secondary-max' })
    public secondaryMax = DEFAULT_MAX_SIZE;

    /** The current splitter position of split-view */
    @property({ type: Number, reflect: true, attribute: 'splitter-pos' })
    public splitterPos?: number;

    /** The current size of first pane of split-view */
    @property({ type: String, attribute: false })
    private firstPaneSize = 'auto';

    /** Sets the `aria-label` on the splitter component */
    @property()
    public label?: string;

    @property({ type: Boolean, attribute: false })
    private enoughChildren = false;

    @property({ type: Number })
    private viewSize = 0;

    @query('slot')
    private paneSlot!: HTMLSlotElement;

    @query('#splitter')
    private splitter!: HTMLDivElement;

    private offset = 0;

    private minPos = 0;

    private maxPos = DEFAULT_MAX_SIZE;

    private observer?: WithSWCResizeObserver['ResizeObserver'];

    private rect?: DOMRect;

    private _splitterSize?: number;

    public constructor() {
        super();
        const RO = (window as unknown as WithSWCResizeObserver).ResizeObserver;
        if (RO) {
            this.observer = new RO(() => {
                this.rect = undefined;
                this.updateMinMax();
            });
        }
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        this.observer?.observe(this);
    }

    public override disconnectedCallback(): void {
        this.observer?.unobserve(this);
        super.disconnectedCallback();
    }

    /**
     * @private
     **/
    public get splitterSize(): number {
        if (!this._splitterSize) {
            this._splitterSize =
                (this.splitter &&
                    Math.round(
                        parseFloat(
                            window
                                .getComputedStyle(this.splitter)
                                .getPropertyValue(
                                    this.vertical ? 'height' : 'width'
                                )
                        )
                    )) ||
                SPLITTERSIZE;
        }
        return this._splitterSize;
    }

    protected override render(): TemplateResult {
        const splitterClasses = {
            'is-resized-start': this.splitterPos === this.minPos,
            'is-resized-end': (this.splitterPos &&
                this.splitterPos > this.splitterSize &&
                this.splitterPos === this.maxPos) as boolean,
            'is-collapsed-start': this.splitterPos === 0,
            'is-collapsed-end': (this.splitterPos &&
                this.splitterPos >=
                    Math.max(
                        this.splitterSize,
                        this.viewSize - this.splitterSize
                    )) as boolean,
        };
        const label = this.resizable
            ? this.label || 'Resize the panels'
            : undefined;

        return html`
            <slot
                id=${ifDefined(
                    this.resizable ? this.controlledEl?.id : undefined
                )}
                @slotchange=${this.onContentSlotChange}
                style="--spectrum-split-view-first-pane-size: ${this
                    .firstPaneSize}"
            ></slot>
            ${this.enoughChildren
                ? html`
                      <div
                          id="splitter"
                          class=${classMap(splitterClasses)}
                          role="separator"
                          aria-controls=${ifDefined(
                              this.resizable ? this.controlledEl?.id : undefined
                          )}
                          aria-label=${ifDefined(label)}
                          aria-orientation=${this.vertical
                              ? 'horizontal'
                              : 'vertical'}
                          aria-valuenow=${Math.round(
                              (parseFloat(this.firstPaneSize) / this.viewSize) *
                                  100
                          )}
                          tabindex=${ifDefined(
                              this.resizable ? '0' : undefined
                          )}
                          @keydown=${this.onKeydown}
                          ${streamingListener({
                              start: ['pointerdown', this.onPointerdown],
                              streamInside: ['pointermove', this.onPointermove],
                              end: [
                                  [
                                      'pointerup',
                                      'pointercancel',
                                      'pointerleave',
                                  ],
                                  this.onPointerup,
                              ],
                          })}
                      >
                          ${this.resizable
                              ? html`
                                    <div id="gripper"></div>
                                `
                              : nothing}
                      </div>
                  `
                : nothing}
        `;
    }

    private controlledElIDApplied = false;

    private onContentSlotChange(
        event: Event & { target: HTMLSlotElement }
    ): void {
        if (this.controlledEl && this.controlledElIDApplied) {
            this.controlledEl.removeAttribute('id');
            this.controlledElIDApplied = false;
        }
        this.controlledEl = event.target.assignedElements()[0] as HTMLElement;
        if (this.controlledEl && !this.controlledEl.id) {
            this.controlledEl.id = `${this.tagName.toLowerCase()}-${randomID()}`;
            this.controlledElIDApplied = true;
        }
        this.enoughChildren = this.children.length > 1;
        this.checkResize();
    }

    private onPointerdown(event: PointerEvent): void {
        if (!this.resizable || (event.button && event.button !== 0)) {
            event.preventDefault();
            return;
        }
        this.splitter.setPointerCapture(event.pointerId);
        this.offset = this.getOffset();
    }

    private onPointermove(event: PointerEvent): void {
        event.preventDefault();
        let pos =
            this.vertical || this.dir === 'ltr'
                ? this.getPosition(event) - this.offset
                : this.offset - this.getPosition(event);
        if (this.collapsible && pos < this.minPos - COLLAPSE_THREASHOLD) {
            pos = 0;
        }
        if (this.collapsible && pos > this.maxPos + COLLAPSE_THREASHOLD) {
            pos = this.viewSize - this.splitterSize;
        }
        this.updatePosition(pos);
    }

    private onPointerup(event: PointerEvent): void {
        this.splitter.releasePointerCapture(event.pointerId);
    }

    private getOffset(): number {
        if (!this.rect) {
            this.rect = this.getBoundingClientRect();
        }
        const offsetX = this.dir === 'ltr' ? this.rect.left : this.rect.right;
        return this.vertical ? this.rect.top : offsetX;
    }

    private getPosition(event: PointerEvent): number {
        return this.vertical ? event.clientY : event.clientX;
    }

    private movePosition(event: KeyboardEvent, offset: number): void {
        event.preventDefault();
        if (this.splitterPos !== undefined) {
            this.updatePosition(this.splitterPos + offset);
        }
    }

    private onKeydown(event: KeyboardEvent): void {
        if (!this.resizable) {
            return;
        }
        let direction = 0;
        const isLTRorVertical =
            getComputedStyle(this).direction === 'ltr' || this.vertical;
        switch (event.key) {
            case 'Home':
                event.preventDefault();
                this.updatePosition(this.collapsible ? 0 : this.minPos);
                return;
            case 'End':
                event.preventDefault();
                this.updatePosition(
                    this.collapsible
                        ? this.viewSize - this.splitterSize
                        : this.maxPos
                );
                return;
            case 'ArrowLeft':
                direction = isLTRorVertical ? -1 : 1;
                break;
            case 'ArrowRight':
                direction = isLTRorVertical ? 1 : -1;
                break;
            case 'ArrowUp':
                direction = this.vertical ? -1 : 1;
                break;
            case 'ArrowDown':
                direction = this.vertical ? 1 : -1;
                break;
            case 'PageUp':
                direction = this.vertical ? -1 : 1;
                break;
            case 'PageDown':
                direction = this.vertical ? 1 : -1;
                break;
        }
        if (direction !== 0) {
            const moveBy = event.key.startsWith('Page')
                ? PAGEUPDOWN_KEY_CHANGE_VALUE
                : ARROW_KEY_CHANGE_VALUE;
            this.movePosition(event, moveBy * direction);
        }
    }

    private async checkResize(): Promise<void> {
        if (!this.enoughChildren) {
            return;
        }
        this.updateMinMax();
        if (this.splitterPos === undefined) {
            const startPos = await this.calcStartPos();
            this.updatePosition(startPos);
        }
    }

    private updateMinMax(): void {
        this.viewSize = this.vertical ? this.offsetHeight : this.offsetWidth;
        this.minPos = Math.max(
            this.primaryMin,
            this.viewSize - this.secondaryMax
        );
        this.maxPos = Math.min(
            this.primaryMax,
            this.viewSize - Math.max(this.secondaryMin, this.splitterSize)
        );
    }

    private updatePosition(x: number): void {
        let pos = this.getLimitedPosition(x);
        if (this.collapsible && x <= 0) {
            pos = 0;
        }
        if (
            this.collapsible &&
            x > this.maxPos &&
            x >= this.viewSize - this.splitterSize
        ) {
            pos = this.viewSize - this.splitterSize;
        }
        if (pos !== this.splitterPos) {
            this.splitterPos = pos;
            this.dispatchChangeEvent();
        }
    }

    private getLimitedPosition(input: number): number {
        if (input <= this.minPos) {
            return this.minPos;
        }
        if (input >= this.maxPos) {
            return this.maxPos;
        }
        return Math.max(this.minPos, Math.min(this.maxPos, input));
    }

    private async calcStartPos(): Promise<number> {
        if (
            this.primarySize !== undefined &&
            /^\d+(px)?$/.test(this.primarySize)
        ) {
            return parseInt(this.primarySize, 10);
        }
        if (this.primarySize !== undefined && /^\d+%$/.test(this.primarySize)) {
            return (parseInt(this.primarySize, 10) * this.viewSize) / 100;
        }
        if (this.primarySize === 'auto') {
            this.firstPaneSize = 'auto';
            const nodes = this.paneSlot.assignedNodes({ flatten: true });
            const firstEl = nodes.find(
                (node) => node instanceof HTMLElement
            ) as LitElement;
            if (typeof firstEl.updateComplete !== 'undefined') {
                await firstEl.updateComplete;
            }
            if (firstEl) {
                const size = window
                    .getComputedStyle(firstEl)
                    .getPropertyValue(this.vertical ? 'height' : 'width');
                const size_i = parseFloat(size);
                if (!isNaN(size_i)) {
                    return this.getLimitedPosition(Math.ceil(size_i));
                }
            }
        }
        return this.viewSize / 2;
    }

    private dispatchChangeEvent(): void {
        const changeEvent = new Event('change', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(changeEvent);
    }

    protected override willUpdate(changed: PropertyValues): void {
        if (!this.hasUpdated || changed.has('primarySize')) {
            this.splitterPos = undefined;
            this.checkResize();
        }
        if (
            changed.has('splitterPos') &&
            this.splitterPos !== undefined &&
            this.enoughChildren
        ) {
            this.firstPaneSize = `${Math.round(this.splitterPos)}px`;
        }
    }
}
