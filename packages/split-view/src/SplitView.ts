/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    html,
    SpectrumElement,
    CSSResultArray,
    TemplateResult,
    property,
    PropertyValues,
    ifDefined,
    query,
    nothing,
    LitElement,
} from '@spectrum-web-components/base';

import { WithSWCResizeObserver } from './types';

import styles from './split-view.css.js';

const DEFAULT_MAX_SIZE = 3840;

const SPLITTERSIZE = 2;

const ARROW_KEY_CHANGE_VALUE = 10;

const PAGEUPDOWN_KEY_CHANGE_VALUE = 50;

const COLLAPSE_THREASHOLD = 50;

/**
 * @element sp-split-view
 */
export class SplitView extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [styles];
    }

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

    /** The start size of the primary pane */
    @property({ type: String, attribute: 'primary-size' })
    public primarySize?: string;

    /** The minimum size of the secondary pane */
    @property({ type: Number, attribute: 'secondary-min' })
    public secondaryMin = 0;

    /** The maximum size of the secondary pane */
    @property({ type: Number, attribute: 'secondary-max' })
    public secondaryMax = DEFAULT_MAX_SIZE;

    @property({ type: Number, reflect: true, attribute: 'splitter-pos' })
    public splitterPos?: number;

    @property({ type: Number, attribute: false })
    public minPos = 0;

    @property({ type: Number, attribute: false })
    public maxPos = Infinity;

    @property({ type: Boolean, reflect: true, attribute: 'is-resized-start' })
    public isResizedStart = false;

    @property({ type: Boolean, reflect: true, attribute: 'is-resized-end' })
    public isResizedEnd = false;

    @property({ type: Boolean, reflect: true, attribute: 'is-collapsed-start' })
    public isCollapsedStart = false;

    @property({ type: Boolean, reflect: true, attribute: 'is-collapsed-end' })
    public isCollapsedEnd = false;

    @property()
    public label?: string;

    @property({ type: Boolean, attribute: false })
    private enoughChildren = false;

    @query('slot')
    private paneSlot!: HTMLSlotElement;

    @query('#splitter')
    private splitter!: HTMLDivElement;

    private offset = 0;

    private observer?: WithSWCResizeObserver['ResizeObserver'];

    private rect?: DOMRect;

    private _splitterSize?: number;

    public constructor() {
        super();
        const RO = ((window as unknown) as WithSWCResizeObserver)
            .ResizeObserver;
        if (RO) {
            this.observer = new RO(() => {
                this.rect = undefined;
                this.updateMinMax();
                this.checkStartEnd();
            });
        }
    }

    public connectedCallback(): void {
        super.connectedCallback();
        this.observer?.observe(this);
    }

    public disconnectedCallback(): void {
        this.observer?.unobserve(this);
        super.disconnectedCallback();
    }

    /**
     * @private
     **/
    public get viewSize(): number {
        return this.vertical ? this.offsetHeight : this.offsetWidth;
    }

    /**
     * @private
     **/
    public get splitterSize(): number {
        if (!this._splitterSize) {
            const el = this.shadowRoot.querySelector(
                '#splitter'
            ) as HTMLElement;
            this._splitterSize =
                (el &&
                    Math.round(
                        parseFloat(
                            window
                                .getComputedStyle(el)
                                .getPropertyValue(
                                    this.vertical ? 'height' : 'width'
                                )
                        )
                    )) ||
                SPLITTERSIZE;
        }
        return this._splitterSize;
    }

    protected render(): TemplateResult {
        return html`
            <slot
                @slotchange=${() => {
                    this.enoughChildren = this.children.length > 1;
                    this.checkResize();
                }}
            ></slot>
            ${this.enoughChildren
                ? html`
                      <div
                          id="splitter"
                          role="separator"
                          aria-label=${ifDefined(this.label || undefined)}
                          tabindex=${ifDefined(
                              this.resizable ? '0' : undefined
                          )}
                          @keydown=${this.onKeydown}
                          @pointerdown=${this.onPointerdown}
                          @pointerup=${this.onPointerup}
                      >
                          ${this.resizable
                              ? html`
                                    <div id="gripper"></div>
                                `
                              : html``}
                      </div>
                  `
                : nothing}
        `;
    }

    private onPointerdown(event: PointerEvent): void {
        if (!this.resizable || (event.button && event.button !== 0)) {
            return;
        }
        this.splitter.setPointerCapture(event.pointerId);
        this.onpointermove = this.onPointermove;
        this.offset = this.getOffset();
    }

    private onPointermove(event: PointerEvent): void {
        event.preventDefault();
        let pos =
            this.vertical || this.isLTR
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
        this.onpointermove = null;
    }

    private getOffset(): number {
        if (!this.rect) {
            this.rect = this.getBoundingClientRect();
        }
        const offsetX = this.isLTR ? this.rect.left : this.rect.right;
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
        const isLTRorVertical = this.isLTR || this.vertical;
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

    private checkStartEnd(): void {
        if (this.splitterPos === undefined) {
            return;
        }
        this.isResizedStart = this.splitterPos === this.minPos;
        this.isResizedEnd = this.splitterPos === this.maxPos;
        this.isCollapsedStart = this.splitterPos === 0;
        this.isCollapsedEnd =
            this.splitterPos >= this.viewSize - this.splitterSize;
    }

    private setFirstPaneSize(x: number): void {
        this.paneSlot.style.setProperty(
            '--spectrum-split-view-first-pane-size',
            `${x}px`
        );
    }

    private setFirstPaneAutoSize(): void {
        this.paneSlot.style.setProperty(
            '--spectrum-split-view-first-pane-size',
            'auto'
        );
    }

    private async calcStartPos(): Promise<number> {
        if (
            this.primarySize !== undefined &&
            /^\d+(px)?$/.test(this.primarySize)
        ) {
            return parseInt(this.primarySize, 10);
        }
        if (this.primarySize?.endsWith('%')) {
            return (parseInt(this.primarySize, 10) * this.viewSize) / 100;
        }
        if (this.primarySize === 'auto') {
            this.setFirstPaneAutoSize();
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
                const size_i = parseInt(size, 10);
                if (!isNaN(size_i)) {
                    return this.getLimitedPosition(size_i);
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

    protected firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        this.checkResize();
    }

    protected updated(changed: PropertyValues): void {
        super.updated(changed);
        if (
            changed.has('splitterPos') &&
            this.splitterPos !== undefined &&
            this.enoughChildren
        ) {
            this.setFirstPaneSize(Math.round(this.splitterPos));
            this.checkStartEnd();
        }
    }
}
