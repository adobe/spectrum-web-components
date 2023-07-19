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

import type { Placement } from '@floating-ui/dom';
import {
    html,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
    queryAssignedElements,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import {
    isAndroid,
    isIOS,
} from '@spectrum-web-components/shared/src/platform.js';
import { conditionAttributeWithId } from '@spectrum-web-components/base/src/condition-attribute-with-id.js';
import {
    ElementResolutionController,
    elementResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';
import { VirtualTrigger } from './VirtualTrigger.js';
import {
    ifDefined,
    styleMap,
} from '@spectrum-web-components/base/src/directives.js';
import styles from './overlay-base.css.js';
import { overlayStack } from './OverlayStack.js';
import { PlacementController } from './PlacementController.js';
import { OverlayTypes } from './overlay-types.js';
import { OverlayTimer } from './overlay-timer.js';

export const overlayTimer = new OverlayTimer();

export type OpenableElement = HTMLElement & {
    open: boolean;
    tipElement?: HTMLElement;
    updateComplete?: Promise<void>;
};

const LONGPRESS_DURATION = 300;

type LongpressEvent = {
    source: 'pointer' | 'keyboard';
};

export const LONGPRESS_INSTRUCTIONS = {
    touch: 'Double tap and long press for additional options',
    keyboard: 'Press Space or Alt+Down Arrow for additional options',
    mouse: 'Click and hold for additional options',
};

export class BeforetoggleClosedEvent extends Event {
    currentState = 'open';
    newState = 'closed';
    constructor() {
        super('beforetoggle', {
            bubbles: false,
            composed: false,
        });
    }
}

export class BeforetoggleOpenEvent extends Event {
    currentState = 'closed';
    newState = 'open';
    constructor() {
        super('beforetoggle', {
            bubbles: false,
            composed: false,
        });
    }
}

export const noop = (): void => {
    return;
};

/**
 * Apply a "transitionend" listener to an element that may not transition but
 * guarantee the callback will be fired either way.
 *
 * @param el {HTMLElement} - Target of the "transition" listeners.
 * @param action {Function} - Method to trigger the "transition".
 * @param cb {Function} - Callback to trigger when the "transition" has ended.
 */
export const guaranteedAllTransitionend = (
    el: HTMLElement,
    action: () => void,
    cb: () => void
): void => {
    const runningTransitions = new Map<string, number>();
    const cleanup = (): void => {
        el.removeEventListener('transitionrun', handleTransitionrun);
        el.removeEventListener('transitionend', handleTransitionend);
        cb();
    };
    let guarantee2: number;
    let guarantee3: number;
    // WebKit fires `transitionrun` a little earlier, the multiple guarantees here
    // allow WebKit to be caught, but doesn't remove the animation listener until
    // after it would have fired in Chromium.
    const guarantee1 = requestAnimationFrame(() => {
        guarantee2 = requestAnimationFrame(() => {
            guarantee3 = requestAnimationFrame(() => {
                cleanup();
            });
        });
    });
    const handleTransitionend = (event: TransitionEvent): void => {
        if (event.target !== el) {
            return;
        }
        runningTransitions.set(
            event.propertyName,
            (runningTransitions.get(event.propertyName) as number) - 1
        );
        if (!runningTransitions.get(event.propertyName)) {
            runningTransitions.delete(event.propertyName);
        }
        if (runningTransitions.size === 0) {
            cleanup();
        }
    };
    const handleTransitionrun = (event: TransitionEvent): void => {
        if (event.target !== el) {
            return;
        }
        if (!runningTransitions.has(event.propertyName)) {
            runningTransitions.set(event.propertyName, 0);
        }
        runningTransitions.set(
            event.propertyName,
            (runningTransitions.get(event.propertyName) as number) + 1
        );
        cancelAnimationFrame(guarantee1);
        cancelAnimationFrame(guarantee2);
        cancelAnimationFrame(guarantee3);
    };
    el.addEventListener('transitionrun', handleTransitionrun);
    el.addEventListener('transitionend', handleTransitionend);
    action();
};

export class OverlayBase extends SpectrumElement {
    static override styles = [styles];

    @property({ type: Boolean })
    delayed = false;

    @query('.dialog')
    dialogEl!: HTMLDialogElement & {
        showPopover(): void;
        hidePopover(): void;
    };

    @property({ type: Boolean })
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(disabled: boolean) {
        this._disabled = disabled;
        if (disabled) {
            if (this.hasNonVirtualTrigger) {
                this.unbindEvents(this.triggerElement as HTMLElement);
            }
            this.wasOpen = this.open;
            this.open = false;
        } else {
            this.bindEvents(this.triggerElement);
            this.open = this.open || this.wasOpen;
            this.wasOpen = false;
        }
    }

    private _disabled = false;

    protected dispose = noop;

    @queryAssignedElements({
        flatten: true,
        selector: ':not([slot="longpress-describedby-descriptor"])', // gather only elements slotted into the default slot
    })
    elements!: OpenableElement[];

    public parentOverlayToForceClose?: OverlayBase;

    private get hasNonVirtualTrigger(): boolean {
        return (
            !!this.triggerElement &&
            !(this.triggerElement instanceof VirtualTrigger)
        );
    }

    protected longpressed = false;

    private longressTimeout!: ReturnType<typeof setTimeout>;

    @property({ type: Number })
    offset: number | [number, number] = 6;

    public placementController = new PlacementController(this);

    @property({ type: Boolean, reflect: true })
    get open(): boolean {
        return this._open;
    }

    set open(open: boolean) {
        if (open && this.disabled) return;
        if (open === this.open) return;
        this._open = open;
        if (this.open) {
            OverlayBase.openCount += 1;
        }
        this.requestUpdate('open', !this.open);
    }

    private _open = false;

    static openCount = 1;

    @property()
    placement?: Placement;

    @property({ attribute: 'receives-focus' })
    receivesFocus: 'true' | 'false' | 'auto' = 'auto';

    private releaseAriaDescribedby = noop;
    private releaseLongpressDescribedby = noop;

    @query('slot')
    slotEl!: HTMLSlotElement;

    @property({ type: Number, attribute: 'tip-padding' })
    tipPadding?: number;

    @property()
    trigger?: string;

    @state()
    triggerElement: HTMLElement | VirtualTrigger | null = null;

    @state()
    triggerInteraction?: 'click' | 'longpress' | 'hover';

    @property()
    type: OverlayTypes = 'hint';

    protected wasOpen = false;

    private elementResolver = new ElementResolutionController(this);

    private get usesDialog(): boolean {
        return this.type === 'modal' || this.type === 'page';
    }

    private get popoverValue(): 'auto' | 'manual' | undefined {
        switch (this.type) {
            case 'modal':
            case 'page':
                return undefined;
            case 'hint':
                return 'manual';
            default:
                return this.type;
        }
    }

    /* c8 ignore next 12 */
    protected async manageDialogOpen(): Promise<void> {
        console.warn(
            'Implement the `manageDialogOpen` method in a class extension.'
        );
    }

    protected async managePopoverOpen(): Promise<void> {
        console.warn(
            'Implement the `managePopoverOpen` method in a class extension.'
        );
    }

    protected get requiresPosition(): boolean {
        // Do not position "page" overlays as they should block the entire UI.
        if (this.type === 'page' || !this.open) return false;
        // Do not position content without a trigger element, what would you position it in relation to?
        // Do not automaticallyu position contnent, unless it is a "hint".
        if (!this.triggerElement || (!this.placement && this.type !== 'hint'))
            return false;
        return true;
    }

    protected managePosition(): void {
        if (!this.requiresPosition || !this.open) return;

        const offset = this.offset || 0;
        const trigger = this.triggerElement as HTMLElement;
        const placement = (this.placement as Placement) || 'right';
        const tipPadding = this.tipPadding;

        this.placementController.placeOverlay(this.dialogEl, {
            offset,
            placement,
            tipPadding,
            trigger,
            type: this.type,
        });
    }

    protected async manageOpen(oldOpen: boolean): Promise<void> {
        if (!this.isConnected && this.open) return;

        if (!this.hasUpdated) {
            await this.updateComplete;
        }

        if (this.open) {
            overlayStack.add(this);
            if (this.willPreventClose) {
                document.addEventListener(
                    'pointerup',
                    () => {
                        this.dialogEl.classList.toggle(
                            'not-immediately-closable',
                            false
                        );
                        this.willPreventClose = false;
                    },
                    { once: true }
                );
                this.dialogEl.classList.toggle(
                    'not-immediately-closable',
                    true
                );
            }
        } else {
            if (oldOpen) {
                this.dispose();
            }
            overlayStack.remove(this);
        }

        if (this.usesDialog) {
            this.manageDialogOpen();
        } else {
            this.managePopoverOpen();
        }
        if (!this.open) {
            // If the focus remains inside of the overlay or
            // a slotted descendent of the overlay you need to return
            // focus back to the trigger.
            const getAncestors = (): HTMLElement[] => {
                const ancestors: HTMLElement[] = [];
                // eslint-disable-next-line @spectrum-web-components/document-active-element
                let currentNode = document.activeElement;
                while (
                    currentNode?.shadowRoot &&
                    currentNode.shadowRoot.activeElement
                ) {
                    currentNode = currentNode.shadowRoot.activeElement;
                }
                while (currentNode) {
                    const ancestor =
                        currentNode.assignedSlot ||
                        currentNode.parentElement ||
                        (currentNode.getRootNode() as ShadowRoot)?.host;
                    if (ancestor) {
                        ancestors.push(ancestor as HTMLElement);
                    }
                    currentNode = ancestor;
                }
                return ancestors;
            };
            if (
                (this.triggerElement as HTMLElement)?.focus &&
                (this.contains(
                    (this.getRootNode() as Document).activeElement
                ) ||
                    !!getAncestors().find((el) => el === this))
            ) {
                (this.triggerElement as HTMLElement).focus();
            }
        }
    }

    protected unbindEvents(triggerElement: HTMLElement): void {
        triggerElement.removeEventListener('click', this.handleClick);
        triggerElement.removeEventListener(
            'pointerdown',
            this.handlePointerdownForClick
        );
        triggerElement.removeEventListener('focusin', this.handleFocusin);
        triggerElement.removeEventListener('focusout', this.handleFocusout);
        triggerElement.removeEventListener(
            'pointerenter',
            this.handlePointerenter
        );
        triggerElement.removeEventListener(
            'pointerleave',
            this.handlePointerleave
        );
        this.removeEventListener(
            'pointerleave',
            this.handleOverlayPointerleave
        );
        triggerElement.addEventListener('pointerdown', this.handlePointerdown);
        triggerElement.removeEventListener('keydown', this.handleKeydown);
        triggerElement.removeEventListener('keyup', this.handleKeyup);
        triggerElement.removeEventListener('longpress', this.handleLongpress);
    }

    protected bindEvents(
        triggerElement: HTMLElement | VirtualTrigger | null
    ): void {
        if (!this.hasNonVirtualTrigger) return;
        const nextTriggerElement = triggerElement as HTMLElement;
        switch (this.triggerInteraction) {
            case 'click':
                this.bindClickEvents(nextTriggerElement);
                return;
            case 'longpress':
                this.bindLongpressEvents(nextTriggerElement);
                return;
            case 'hover':
                this.bindHoverEvents(nextTriggerElement);
                return;
        }
    }

    protected bindClickEvents(triggerElement: HTMLElement): void {
        triggerElement.addEventListener('click', this.handleClick);
        triggerElement.addEventListener(
            'pointerdown',
            this.handlePointerdownForClick
        );
    }

    protected bindLongpressEvents(triggerElement: HTMLElement): void {
        triggerElement.addEventListener('pointerdown', this.handlePointerdown);
        triggerElement.addEventListener('keydown', this.handleKeydown);
        triggerElement.addEventListener('keyup', this.handleKeyup);
        triggerElement.addEventListener('longpress', this.handleLongpress);

        this.prepareLongpressDescription(triggerElement);
    }

    protected bindHoverEvents(triggerElement: HTMLElement): void {
        triggerElement.addEventListener('focusin', this.handleFocusin);
        triggerElement.addEventListener('focusout', this.handleFocusout);
        triggerElement.addEventListener(
            'pointerenter',
            this.handlePointerenter
        );
        triggerElement.addEventListener(
            'pointerleave',
            this.handlePointerleave
        );
        this.addEventListener('pointerleave', this.handleOverlayPointerleave);
        if (this.receivesFocus === 'true') return;

        this.prepareAriaDescribedby(triggerElement);
    }

    protected manageTriggerElement(triggerElement: HTMLElement | null): void {
        if (triggerElement) {
            this.unbindEvents(triggerElement);
            this.releaseAriaDescribedby();
        }
        if (
            !this.triggerElement ||
            !!(this.triggerElement as VirtualTrigger).updateBoundingClientRect
        ) {
            return;
        }
        this.bindEvents(this.triggerElement);
    }

    private elementIds: string[] = [];

    private prepareLongpressDescription(trigger: HTMLElement): void {
        if (
            // only "longpress" relationships are described this way
            this.triggerInteraction !== 'longpress' ||
            // do not reapply until target it recycled
            this.releaseLongpressDescribedby !== noop ||
            // require "longpress content" to apply relationship
            !this.elements.length
        ) {
            return;
        }

        const longpressDescription = document.createElement('div');
        longpressDescription.id = `longpress-describedby-descriptor-${crypto
            .randomUUID()
            .slice(0, 8)}`;
        const messageType = isIOS() || isAndroid() ? 'touch' : 'keyboard';
        longpressDescription.textContent = LONGPRESS_INSTRUCTIONS[messageType];
        longpressDescription.slot = 'longpress-describedby-descriptor';
        trigger.insertAdjacentElement('afterend', longpressDescription);

        const releaseLongpressDescribedby = conditionAttributeWithId(
            trigger,
            'aria-describedby',
            [longpressDescription.id]
        );
        this.releaseLongpressDescribedby = () => {
            releaseLongpressDescribedby();
            longpressDescription.remove();
            this.releaseLongpressDescribedby = noop;
        };
    }

    private prepareAriaDescribedby(trigger: HTMLElement): void {
        if (
            // only "hover" relationships establed described by content
            this.triggerInteraction !== 'hover' ||
            // do not reapply until target is recycled
            this.releaseAriaDescribedby !== noop ||
            // require "hover content" to apply relationship
            !this.elements.length
        ) {
            return;
        }

        const triggerRoot = trigger.getRootNode();
        const contentRoot = this.elements[0].getRootNode();
        const overlayRoot = this.getRootNode();
        if (triggerRoot == overlayRoot) {
            const releaseAriaDescribedby = conditionAttributeWithId(
                trigger,
                'aria-describedby',
                [this.id]
            );
            this.releaseAriaDescribedby = () => {
                releaseAriaDescribedby();
                this.releaseAriaDescribedby = noop;
            };
        } else if (triggerRoot === contentRoot) {
            this.elementIds = this.elements.map((el) => el.id);
            const appliedIds = this.elements.map((el) => {
                if (!el.id) {
                    el.id = `${this.tagName.toLowerCase()}-helper-${crypto
                        .randomUUID()
                        .slice(0, 8)}`;
                }
                return el.id;
            });
            const releaseAriaDescribedby = conditionAttributeWithId(
                trigger,
                'aria-describedby',
                appliedIds
            );
            this.releaseAriaDescribedby = () => {
                releaseAriaDescribedby();
                this.elements.map((el, index) => {
                    el.id = this.elementIds[index];
                });
                this.releaseAriaDescribedby = noop;
            };
        }
    }

    private handlePointerdown = (event: PointerEvent): void => {
        if (!this.triggerElement) return;
        if (event.button !== 0) return;
        const triggerElement = this.triggerElement as HTMLElement;
        this.longpressed = false;
        triggerElement.addEventListener('pointerup', this.handlePointerup);
        triggerElement.addEventListener('pointercancel', this.handlePointerup);
        this.longressTimeout = setTimeout(() => {
            if (!triggerElement) return;
            triggerElement.dispatchEvent(
                new CustomEvent<LongpressEvent>('longpress', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        source: 'pointer',
                    },
                })
            );
        }, LONGPRESS_DURATION);
    };

    private handlePointerup = (): void => {
        clearTimeout(this.longressTimeout);
        if (!this.triggerElement) return;
        if (this.longpressed) {
            this.open = true;
        }
        setTimeout(() => {
            this.longpressed = false;
        });
        const triggerElement = this.triggerElement as HTMLElement;
        triggerElement.removeEventListener('pointerup', this.handlePointerup);
        triggerElement.removeEventListener(
            'pointercancel',
            this.handlePointerup
        );
    };

    /**
     * @private
     */
    protected handleKeydown = (event: KeyboardEvent): void => {
        const { code, altKey } = event;
        if (code === 'Space' || (altKey && code === 'ArrowDown')) {
            if (code === 'ArrowDown') {
                event.stopPropagation();
                event.stopImmediatePropagation();
            }
        }
    };

    protected handleKeyup = (event: KeyboardEvent): void => {
        const { code, altKey } = event;
        if (code === 'Space' || (altKey && code === 'ArrowDown')) {
            event.stopPropagation();
            this.dispatchEvent(
                new CustomEvent<LongpressEvent>('longpress', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        source: 'keyboard',
                    },
                })
            );
        }
    };

    private preventNextToggle = false;

    protected handlePointerdownForClick = (): void => {
        this.preventNextToggle = this.open;
    };

    protected handleClick = (): void => {
        if (this.longpressed) return;
        if (!this.preventNextToggle) {
            this.open = !this.open;
        }
        this.preventNextToggle = false;
    };

    private focusedin = false;

    protected handleFocusin = (): void => {
        this.open = true;
        this.focusedin = true;
    };

    protected handleFocusout = (): void => {
        this.focusedin = false;
        if (this.pointerentered) return;
        this.open = false;
    };

    private pointerentered = false;

    protected handlePointerenter = (): void => {
        if (this.disabled) return;
        this.open = true;
        this.pointerentered = true;
    };

    protected handlePointerleave = (event: PointerEvent): void => {
        if (
            this === event.relatedTarget ||
            this.contains(event.relatedTarget as Node) ||
            [...this.children].find((child) => {
                if (child.localName !== 'slot') {
                    return false;
                }
                return (child as HTMLSlotElement)
                    .assignedElements({ flatten: true })
                    .find((el) => {
                        return (
                            el === event.relatedTarget ||
                            el.contains(event.relatedTarget as Node)
                        );
                    });
            })
        ) {
            return;
        }
        this.doPointerleave();
    };

    protected handleOverlayPointerleave = (event: PointerEvent): void => {
        if (
            this.triggerElement === event.relatedTarget ||
            (this.hasNonVirtualTrigger &&
                (this.triggerElement as HTMLElement).contains(
                    event.relatedTarget as Node
                ))
        ) {
            return;
        }
        this.doPointerleave();
    };

    protected doPointerleave(): void {
        this.pointerentered = false;
        const triggerElement = this.triggerElement as HTMLElement;
        if (this.focusedin && triggerElement.matches(':focus-visible')) return;
        this.open = false;
    }

    protected handleLongpress = (): void => {
        this.open = true;
        this.longpressed = true;
    };

    protected handleBeforetoggle(event: Event & { newState: string }): void {
        if (event.newState !== 'open') {
            this.handleBrowserClose();
        }
    }

    protected handleBrowserClose(): void {
        this.open = false;
    }

    protected handleSlotchange(): void {
        if (this.triggerElement) {
            this.prepareAriaDescribedby(this.triggerElement as HTMLElement);
        }
        if (!this.elements.length) {
            this.releaseLongpressDescribedby();
        } else if (this.hasNonVirtualTrigger) {
            this.prepareLongpressDescription(
                this.triggerElement as HTMLElement
            );
        }
    }

    public willPreventClose = false;

    public shouldPreventClose(): boolean {
        const shouldPreventClose = this.willPreventClose;
        this.willPreventClose = false;
        return shouldPreventClose;
    }

    override willUpdate(changes: PropertyValues): void {
        if (!this.hasUpdated) {
            this.addEventListener('focusout', (event: FocusEvent) => {
                // Only "auto" popovers should close on any sort of focusout
                if (this.type !== 'auto') {
                    return;
                }
                // If you don't know where the focus went, we can't do anyting here.
                if (!event.relatedTarget) {
                    // this.open = false;
                    return;
                }
                const relationEvent = new Event('overlay-relation-query', {
                    bubbles: true,
                    composed: true,
                });
                event.relatedTarget.addEventListener(
                    relationEvent.type,
                    (event: Event) => {
                        if (!event.composedPath().includes(this)) {
                            this.open = false;
                        }
                    }
                );
                event.relatedTarget.dispatchEvent(relationEvent);
            });
        }
        if (!this.hasAttribute('id')) {
            this.setAttribute(
                'id',
                `${this.tagName.toLowerCase()}-${crypto
                    .randomUUID()
                    .slice(0, 8)}`
            );
        }
        if (
            changes.has('open') &&
            (typeof changes.get('open') !== 'undefined' || this.open)
        ) {
            this.manageOpen(changes.get('open'));
        }
        if (changes.has('trigger')) {
            const [id, interaction] = this.trigger?.split('@') || [];
            this.elementResolver.selector = id ? `#${id}` : '';
            this.triggerInteraction = interaction as
                | 'click'
                | 'longpress'
                | 'hover'
                | undefined;
        }
        const oldTrigger = this.triggerElement as HTMLElement;
        if (changes.has(elementResolverUpdatedSymbol)) {
            this.triggerElement = this.elementResolver.element;
            this.manageTriggerElement(oldTrigger);
        }
        if (changes.has('triggerElement')) {
            this.manageTriggerElement(changes.get('triggerElement'));
        }
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('placement')) {
            if (this.placement) {
                this.dialogEl.setAttribute('actual-placement', this.placement);
            } else {
                this.dialogEl.removeAttribute('actual-placement');
            }
            if (this.open && typeof changes.get('placement') !== 'undefined') {
                this.placementController.resetOverlayPosition();
            }
        }
    }

    protected renderContent(): TemplateResult {
        return html`
            <div part="content">
                <slot @slotchange=${this.handleSlotchange}></slot>
            </div>
        `;
    }

    protected renderDialog(): TemplateResult {
        return html`
            <dialog
                class="dialog"
                part="dialog"
                @close=${this.handleBrowserClose}
                @cancel=${this.handleBrowserClose}
                @beforetoggle=${this.handleBeforetoggle}
                style=${styleMap({
                    '--swc-overlay-open-count':
                        OverlayBase.openCount.toString(),
                    translate: this.hasUpdated ? null : '-999em -999em',
                })}
            >
                ${this.renderContent()}
            </dialog>
        `;
    }

    protected renderPopover(): TemplateResult {
        const hasPopoverAttribute = 'popover' in this;
        const popoverValue = hasPopoverAttribute
            ? this.popoverValue
            : undefined;
        return html`
            <div
                class="dialog"
                part="dialog"
                popover=${ifDefined(popoverValue)}
                @beforetoggle=${this.handleBeforetoggle}
                @close=${this.handleBrowserClose}
                style=${styleMap({
                    '--swc-overlay-z-index': (
                        1000 + OverlayBase.openCount
                    ).toString(),
                    translate: this.hasUpdated ? null : '-999em -999em',
                })}
            >
                ${this.renderContent()}
            </div>
        `;
    }

    public override render(): TemplateResult {
        const isDialog = this.type === 'modal' || this.type === 'page';
        return html`
            ${isDialog ? this.renderDialog() : this.renderPopover()}
            <slot name="longpress-describedby-descriptor"></slot>
        `;
    }

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('close', () => {
            this.open = false;
        });
        if (this.hasNonVirtualTrigger) {
            this.bindEvents(this.triggerElement);
        }
    }

    override disconnectedCallback(): void {
        if (this.hasNonVirtualTrigger) {
            this.unbindEvents(this.triggerElement as HTMLElement);
        }
        this.open = false;
        super.disconnectedCallback();
    }
}
