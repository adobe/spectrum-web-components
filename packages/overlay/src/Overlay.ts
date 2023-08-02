/*
Copyright 2023 Adobe. All rights reserved.
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
    PropertyValues,
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
import {
    ElementResolutionController,
    elementResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';
import { conditionAttributeWithId } from '@spectrum-web-components/base/src/condition-attribute-with-id.js';
import {
    ifDefined,
    StyleInfo,
    styleMap,
} from '@spectrum-web-components/base/src/directives.js';

import { AbstractOverlay, nextFrame } from './AbstractOverlay.js';
import { OverlayDialog } from './OverlayDialog.js';
import {
    OpenableElement,
    OverlayState,
    OverlayTypes,
    Placement,
} from './overlay-types.js';
import { OverlayPopover } from './OverlayPopover.js';
import { OverlayNoPopover } from './OverlayNoPopover.js';
import { overlayStack } from './OverlayStack.js';
import { noop } from './AbstractOverlay.js';
import { VirtualTrigger } from './VirtualTrigger.js';
import { PlacementController } from './PlacementController.js';

import styles from './overlay.css.js';

const LONGPRESS_DURATION = 300;

type LongpressEvent = {
    source: 'pointer' | 'keyboard';
};

export const LONGPRESS_INSTRUCTIONS = {
    touch: 'Double tap and long press for additional options',
    keyboard: 'Press Space or Alt+Down Arrow for additional options',
    mouse: 'Click and hold for additional options',
};

const supportsPopover = 'showPopover' in document.createElement('div');

let OverlayFeatures = OverlayDialog(AbstractOverlay);
if (supportsPopover) {
    OverlayFeatures = OverlayPopover(OverlayFeatures);
} else {
    OverlayFeatures = OverlayNoPopover(OverlayFeatures);
}

/**
 * @element sp-overlay
 *
 * @fires sp-opened - announces that an overlay has completed any entry animations
 * @fires sp-closed - announce that an overlay has compelted any exit animations
 */
export class Overlay extends OverlayFeatures {
    static override styles = [styles];

    abortController!: AbortController;

    /**
     * An Overlay that is `delayed` will wait until a warm-up period of 1000ms
     * has completed before opening. Once the warmup period has completed, all
     * subsequent Overlays will open immediately. When no Overlays are opened,
     * a cooldown period of 1000ms will begin. Once the cooldown has completed,
     * the next Overlay to be opened will be subject to the warm-up period if
     * provided that option.
     */
    @property({ type: Boolean })
    override delayed = false;

    @query('.dialog')
    override dialogEl!: HTMLDialogElement & {
        showPopover(): void;
        hidePopover(): void;
    };

    /**
     * Whether the overlay is currently functional or not
     */
    @property({ type: Boolean })
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(disabled: boolean) {
        this._disabled = disabled;
        if (disabled) {
            if (this.hasNonVirtualTrigger) {
                this.unbindEvents();
            }
            this.wasOpen = this.open;
            this.open = false;
        } else {
            this.bindEvents();
            this.open = this.open || this.wasOpen;
            this.wasOpen = false;
        }
    }

    private _disabled = false;

    @queryAssignedElements({
        flatten: true,
        selector: ':not([slot="longpress-describedby-descriptor"])', // gather only elements slotted into the default slot
    })
    override elements!: OpenableElement[];

    public parentOverlayToForceClose?: Overlay;

    private get hasNonVirtualTrigger(): boolean {
        return (
            !!this.triggerElement &&
            !(this.triggerElement instanceof VirtualTrigger)
        );
    }

    protected longpressed = false;

    private longressTimeout!: ReturnType<typeof setTimeout>;

    /**
     * The `offset` property accepts either a single number, to
     * define the offset of the Overlay along the main axis from
     * the trigger, or 2-tuple, to define the offset along the
     * main axis and the cross axis. This option has no effect
     * when there is no trigger element.
     */
    @property({ type: Number })
    offset: number | [number, number] = 6;

    protected override placementController = new PlacementController(this);

    @property({ type: Boolean, reflect: true })
    override get open(): boolean {
        return this._open;
    }

    override set open(open: boolean) {
        // Don't respond when disabled.
        if (open && this.disabled) return;
        // Don't respond when state not dirty
        if (open === this.open) return;
        // Don't respond when you're in the shadow on a longpress
        // Shadow occurs when the first "click" would normally close the popover
        if (this.longpressed && !open) return;
        this._open = open;
        if (this.open) {
            Overlay.openCount += 1;
        }
        this.requestUpdate('open', !this.open);
    }

    private _open = false;

    static openCount = 1;

    /**
     * Instruct the Overlay where to place itself in
     * relationship to the trigger element.
     */
    @property()
    placement?: Placement;

    @property({ attribute: 'receives-focus' })
    override receivesFocus: 'true' | 'false' | 'auto' = 'auto';

    private releaseAriaDescribedby = noop;
    private releaseLongpressDescribedby = noop;

    @query('slot')
    slotEl!: HTMLSlotElement;

    @state()
    override get state(): OverlayState {
        return this._state;
    }

    override set state(state) {
        if (state === this.state) return;
        const oldState = this.state;
        this._state = state;
        if (this.state === 'opened' || this.state === 'closed') {
            this.longpressed = false;
        }
        this.requestUpdate('state', oldState);
    }

    override _state: OverlayState = 'closed';

    @property({ type: Number, attribute: 'tip-padding' })
    tipPadding?: number;

    /**
     * An optional ID reference for the trigger element combined with the optional
     * interaction (click | hover | longpress) by which the overlay shold open
     * the overlay with an `@`: e.g. `trigger@click` opens the overlay when an
     * element with the ID "trigger" is clicked.
     */
    @property()
    trigger?: string;

    /**
     * An element reference for the trigger element that the overlay should relate to.
     */
    @property({ attribute: false })
    override triggerElement: HTMLElement | VirtualTrigger | null = null;

    /**
     * The specific interaction to listen for on the `triggerElement` to open the overlay.
     */
    @property({ attribute: false })
    triggerInteraction?: 'click' | 'longpress' | 'hover';

    @property()
    override type: OverlayTypes = 'hint';

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

    protected get requiresPosition(): boolean {
        // Do not position "page" overlays as they should block the entire UI.
        if (this.type === 'page' || !this.open) return false;
        // Do not position content without a trigger element, what would you position it in relation to?
        // Do not automatically position content, unless it is a "hint".
        if (!this.triggerElement || (!this.placement && this.type !== 'hint'))
            return false;
        return true;
    }

    protected override managePosition(): void {
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

    protected override async managePopoverOpen(): Promise<void> {
        super.managePopoverOpen();
        const targetOpenState = this.open;
        if (this.open !== targetOpenState) {
            return;
        }
        await this.manageDelay(targetOpenState);
        if (this.open !== targetOpenState) {
            return;
        }
        await this.ensureOnDOM(targetOpenState);
        if (this.open !== targetOpenState) {
            return;
        }
        const focusEl = await this.makeTransition(targetOpenState);
        if (this.open !== targetOpenState) {
            return;
        }
        await this.applyFocus(targetOpenState, focusEl);
    }

    protected override async applyFocus(
        targetOpenState: boolean,
        focusEl: HTMLElement | null
    ): Promise<void> {
        // Do not move focus when explicitly told not to
        // and when the Overlay is a "hint"
        if (this.receivesFocus === 'false' || this.type === 'hint') {
            return;
        }

        await nextFrame();
        await nextFrame();
        if (targetOpenState === this.open && !this.open) {
            if (
                this.hasNonVirtualTrigger &&
                this.contains((this.getRootNode() as Document).activeElement)
            ) {
                (this.triggerElement as HTMLElement).focus();
            }
            return;
        }
        focusEl?.focus();
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
        this.state = this.open ? 'opening' : 'closing';

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
                    getAncestors().includes(this))
            ) {
                (this.triggerElement as HTMLElement).focus();
            }
        }
    }

    protected unbindEvents(): void {
        this.abortController?.abort();
    }

    protected bindEvents(): void {
        if (!this.hasNonVirtualTrigger) return;
        this.abortController = new AbortController();
        const nextTriggerElement = this.triggerElement as HTMLElement;
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
        const options = { signal: this.abortController.signal };
        triggerElement.addEventListener('click', this.handleClick, options);
        triggerElement.addEventListener(
            'pointerdown',
            this.handlePointerdownForClick,
            options
        );
    }

    protected bindLongpressEvents(triggerElement: HTMLElement): void {
        const options = { signal: this.abortController.signal };
        triggerElement.addEventListener(
            'pointerdown',
            this.handlePointerdown,
            options
        );
        triggerElement.addEventListener('keydown', this.handleKeydown, options);
        triggerElement.addEventListener('keyup', this.handleKeyup, options);
        triggerElement.addEventListener(
            'longpress',
            this.handleLongpress,
            options
        );

        this.prepareLongpressDescription(triggerElement);
    }

    protected bindHoverEvents(triggerElement: HTMLElement): void {
        const options = { signal: this.abortController.signal };
        triggerElement.addEventListener('focusin', this.handleFocusin, options);
        triggerElement.addEventListener(
            'focusout',
            this.handleFocusout,
            options
        );
        triggerElement.addEventListener(
            'pointerenter',
            this.handlePointerenter,
            options
        );
        triggerElement.addEventListener(
            'pointerleave',
            this.handlePointerleave,
            options
        );
        this.addEventListener(
            'pointerleave',
            this.handleOverlayPointerleave,
            options
        );
        if (this.receivesFocus === 'true') return;

        this.prepareAriaDescribedby(triggerElement);
    }

    protected manageTriggerElement(triggerElement: HTMLElement | null): void {
        if (triggerElement) {
            this.unbindEvents();
            this.releaseAriaDescribedby();
        }
        const missingOrVirtual =
            !this.triggerElement ||
            this.triggerElement instanceof VirtualTrigger;
        if (missingOrVirtual) {
            return;
        }
        this.bindEvents();
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

    /**
     * An overlay with a `click` interaction should not close on click `triggerElement`.
     * When a click is initiated (`pointerdown`), apply `preventNextToggle` when the
     * overlay is `open` to prevent from toggling the overlay when the click event
     * propagates later in the interaction.
     */
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
        if (!this.longpressed) {
            this.open = false;
            return;
        }
        this.open = true;
        this.manageOpen(false);
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
            <div style=${styleMap(this.dialogStyleMap)} part="content">
                <slot @slotchange=${this.handleSlotchange}></slot>
            </div>
        `;
    }

    private get dialogStyleMap(): StyleInfo {
        return {
            '--swc-overlay-open-count': Overlay.openCount.toString(),
        };
    }

    protected renderDialog(): TemplateResult {
        /**
         * `--swc-overlay-open-count` is applied to mimic the single stack
         * nature of the top layer in browsers that do not yet support it.
         *
         * The value should always be the full number of overlays ever opened
         * which will be added to `--swc-overlay-z-index-base` which can be
         * provided by a consuming developer but defaults to 1000 to beat as
         * much stacking as possible durring fallback delivery.
         **/
        return html`
            <dialog
                class="dialog"
                part="dialog"
                @close=${this.handleBrowserClose}
                @cancel=${this.handleBrowserClose}
                @beforetoggle=${this.handleBeforetoggle}
                ?is-visible=${this.state !== 'closed'}
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
        /**
         * `--swc-overlay-open-count` is applied to mimic the single stack
         * nature of the top layer in browsers that do not yet support it.
         *
         * The value should always be the full number of overlays ever opened
         * which will be added to `--swc-overlay-z-index-base` which can be
         * provided by a consuming developer but defaults to 1000 to beat as
         * much stacking as possible durring fallback delivery.
         **/
        return html`
            <div
                class="dialog"
                part="dialog"
                popover=${ifDefined(popoverValue)}
                @beforetoggle=${this.handleBeforetoggle}
                @close=${this.handleBrowserClose}
                ?is-visible=${this.state !== 'closed'}
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
            this.bindEvents();
        }
    }

    override disconnectedCallback(): void {
        if (this.hasNonVirtualTrigger) {
            this.unbindEvents();
        }
        this.open = false;
        super.disconnectedCallback();
    }
}
