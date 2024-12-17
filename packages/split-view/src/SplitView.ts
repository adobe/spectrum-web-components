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
 * This component represents a split view layout.
 *
 * @element sp-split-view
 *
 * @slot - Two sibling elements to be sized by the element attributes
 *
 * @fires change - Announces the new position of the splitter
 */
export class SplitView extends SpectrumElement {
    /**
     * Returns the styles to be applied to the component.
     */
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * The controlled element within the split view.
     */
    @state()
    public controlledEl?: HTMLElement;

    /**
     * Indicates if the split view is vertical.
     */
    @property({ type: Boolean, reflect: true })
    public vertical = false;

    /**
     * Indicates if the split view is resizable.
     */
    @property({ type: Boolean, reflect: true })
    public resizable = false;

    /**
     * Indicates if the split view is collapsible.
     */
    @property({ type: Boolean, reflect: true })
    public collapsible = false;

    /** The minimum size of the primary pane */
    @property({ type: Number, attribute: 'primary-min' })
    public primaryMin = 0;

    /**
     * The maximum size of the primary pane
     *
     * The default value is 3840.
     */
    @property({ type: Number, attribute: 'primary-max' })
    public primaryMax = DEFAULT_MAX_SIZE;

    /**
     * The start size of the primary pane, can be a real pixel number|string, percentage or "auto"
     * For example: "100", "120px", "75%" or "auto" are valid values
     *
     * @attribute
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

    /**
     * The label for the aria-label in the split view component.
     */
    @property()
    public label?: string;

    /**
     * Indicates if there are enough children in the split view.
     */
    @property({ type: Boolean, attribute: false })
    private enoughChildren = false;

    /**
     * The total size of the split view container, either its width or height depending on the orientation.
     */
    @property({ type: Number })
    private viewSize = 0;

    /**
     * The slot element for the panes.
     */
    @query('slot')
    private paneSlot!: HTMLSlotElement;

    /**
     * The splitter element.
     */
    @query('#splitter')
    private splitter!: HTMLDivElement;

    /**
     * The offset position of the splitter.
     */
    private offset = 0;

    /**
     * The minimum position of the splitter.
     */
    private minPos = 0;

    /**
     * The maximum position of the splitter.
     */
    private maxPos = DEFAULT_MAX_SIZE;

    /**
     * The ResizeObserver instance used to observe changes in the element's size.
     */
    private observer?: WithSWCResizeObserver['ResizeObserver'];

    /**
     * The bounding rectangle of the element.
     */
    private rect?: DOMRect;

    /**
     * The cached size of the splitter.
     */
    private _splitterSize?: number;

    public constructor() {
        super();
        const RO = (window as unknown as WithSWCResizeObserver).ResizeObserver;

        if (RO) {
            // Initialize a ResizeObserver to observe changes in the element's size
            this.observer = new RO(() => {
                this.rect = undefined;
                this.updateMinMax();
            });
        }
    }

    /**
     * Called when the element is connected to the document's DOM.
     * Observes the element for resize events.
     */
    public override connectedCallback(): void {
        super.connectedCallback();
        this.observer?.observe(this);
    }

    /**
     * Called when the element is disconnected from the document's DOM.
     * Stops observing the element for resize events.
     */
    public override disconnectedCallback(): void {
        this.observer?.unobserve(this);
        super.disconnectedCallback();
    }

    /**
     * Gets the size of the splitter.
     * Calculates the size based on the computed style of the splitter element.
     * Falls back to a default size if the splitter element is not available.
     *
     * @private
     */
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

    /**
     * Handles the slotchange event for the content slot.
     * Updates the controlled element and its ID based on the assigned elements.
     */
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

    /**
     * Handles the pointerdown event on the splitter.
     * Initiates the resizing process if the split view is resizable.
     */
    private onPointerdown(event: PointerEvent): void {
        if (!this.resizable || (event.button && event.button !== 0)) {
            event.preventDefault();

            return;
        }

        this.splitter.setPointerCapture(event.pointerId);
        this.offset = this.getOffset();
    }

    /**
     * Handles the pointermove event on the splitter.
     * Updates the position of the splitter based on the pointer movement.
     */
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

    /**
     * Handles the pointerup event on the splitter.
     * Releases the pointer capture.
     */
    private onPointerup(event: PointerEvent): void {
        this.splitter.releasePointerCapture(event.pointerId);
    }

    /**
     * Gets the offset position of the splitter.
     * Calculates the offset based on the bounding rectangle of the element.
     */
    private getOffset(): number {
        if (!this.rect) {
            this.rect = this.getBoundingClientRect();
        }

        const offsetX = this.isLTR ? this.rect.left : this.rect.right;

        return this.vertical ? this.rect.top : offsetX;
    }

    /**
     * Gets the position of the pointer event.
     * Returns the clientX or clientY value based on the orientation of the split view.
     */
    private getPosition(event: PointerEvent): number {
        return this.vertical ? event.clientY : event.clientX;
    }

    /**
     * Moves the splitter position based on the offset value.
     */
    private movePosition(event: KeyboardEvent, offset: number): void {
        event.preventDefault();

        if (this.splitterPos !== undefined) {
            this.updatePosition(this.splitterPos + offset);
        }
    }

    /**
     * Handles the keydown event on the splitter.
     * Moves the splitter position based on the arrow key pressed.
     */
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

    /**
     * Checks if the split view has enough children to render.
     * Updates the minimum and maximum position of the splitter.
     * Updates the position of the splitter based on the primary size.
     */
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

    /**
     * Updates the minimum and maximum position of the splitter.
     */
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

    /**
     * Updates the position of the splitter based on the given value.
     * Limits the position based on the minimum and maximum position.
     * Dispatches a change event to announce the new position of the splitter.
     */
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

    /**
     * Get the limited position based on the minimum and maximum position.
     * Returns the input value if it is within the limits.
     */
    private getLimitedPosition(input: number): number {
        if (input <= this.minPos) {
            return this.minPos;
        }

        if (input >= this.maxPos) {
            return this.maxPos;
        }

        return Math.max(this.minPos, Math.min(this.maxPos, input));
    }

    /**
     * Calculates the start position of the splitter.
     * Returns the primary size if it is defined.
     * Returns the view size divided by 2 if the primary size is not defined.
     * Returns the size of the first pane if the primary size is set to "auto".
     * Returns the view size divided by 2 if the size of the first pane is not available.
     */
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

    /**
     * Fires a change event to announce the new position of the splitter.
     */
    private dispatchChangeEvent(): void {
        const changeEvent = new Event('change', {
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(changeEvent);
    }

    /**
     * Updates the position of the splitter based on the primary size.
     * Updates the first pane size based on the splitter position.
     */
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
