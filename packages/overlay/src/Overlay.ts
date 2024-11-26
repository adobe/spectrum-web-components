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
    ElementResolutionController,
    elementResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';
import {
    ifDefined,
    StyleInfo,
    styleMap,
} from '@spectrum-web-components/base/src/directives.js';
import { randomID } from '@spectrum-web-components/shared/src/random-id.js';

import type {
    OpenableElement,
    OverlayState,
    OverlayTypes,
    Placement,
    TriggerInteraction,
} from './overlay-types.js';
import { AbstractOverlay, nextFrame } from './AbstractOverlay.js';
import { OverlayDialog } from './OverlayDialog.js';
import { OverlayPopover } from './OverlayPopover.js';
import { OverlayNoPopover } from './OverlayNoPopover.js';
import { overlayStack } from './OverlayStack.js';
import { VirtualTrigger } from './VirtualTrigger.js';
import { PlacementController } from './PlacementController.js';
import type { ClickController } from './ClickController.js';
import type { HoverController } from './HoverController.js';
import type { LongpressController } from './LongpressController.js';
export { LONGPRESS_INSTRUCTIONS } from './LongpressController.js';
import { strategies } from './strategies.js';
import {
    removeSlottableRequest,
    SlottableRequestEvent,
} from './slottable-request-event.js';

import styles from './overlay.css.js';

const supportsPopover = 'showPopover' in document.createElement('div');

let OverlayFeatures = OverlayDialog(AbstractOverlay);
/* c8 ignore next 2 */
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
 * @fires slottable-request - requests to add or remove slottable content
 */
export class Overlay extends OverlayFeatures {
    static override styles = [styles];

    /**
     * An Overlay that is `delayed` will wait until a warm-up period of 1000ms
     * has completed before opening. Once the warmup period has completed, all
     * subsequent Overlays will open immediately. When no Overlays are opened,
     * a cooldown period of 1000ms will begin. Once the cooldown has completed,
     * the next Overlay to be opened will be subject to the warm-up period if
     * provided that option.
     */
    @property({ type: Boolean })
    override get delayed(): boolean {
        return this.elements.at(-1)?.hasAttribute('delayed') || this._delayed;
    }

    override set delayed(delayed: boolean) {
        this._delayed = delayed;
    }

    private _delayed = false;

    @query('.dialog')
    override dialogEl!: HTMLDialogElement & {
        showPopover(): void;
        hidePopover(): void;
    };

    /**
     * Whether the overlay is currently functional or not
     */
    @property({ type: Boolean })
    override get disabled(): boolean {
        return this._disabled;
    }

    override set disabled(disabled: boolean) {
        this._disabled = disabled;
        if (disabled) {
            this.strategy?.abort();
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
        selector: ':not([slot="longpress-describedby-descriptor"], slot)', // gather only elements slotted into the default slot
    })
    override elements!: OpenableElement[];

    public parentOverlayToForceClose?: Overlay;

    private get hasNonVirtualTrigger(): boolean {
        return (
            !!this.triggerElement &&
            !(this.triggerElement instanceof VirtualTrigger)
        );
    }

    /**
     * The `offset` property accepts either a single number, to
     * define the offset of the Overlay along the main axis from
     * the trigger, or 2-tuple, to define the offset along the
     * main axis and the cross axis. This option has no effect
     * when there is no trigger element.
     */
    @property({ type: Number })
    override offset: number | [number, number] = 0;

    protected override get placementController(): PlacementController {
        if (!this._placementController) {
            this._placementController = new PlacementController(this);
        }
        return this._placementController;
    }

    /**
     * Whether the Overlay is projected onto the "top layer" or not.
     */
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
        if (this.strategy?.activelyOpening && !open) return;
        this._open = open;
        if (this.open) {
            Overlay.openCount += 1;
        }
        this.requestUpdate('open', !this.open);
        if (this.open) {
            this.requestSlottable();
        }
    }

    private _open = false;

    static openCount = 1;

    /**
     * Instruct the Overlay where to place itself in
     * relationship to the trigger element.
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     */
    @property()
    override placement?: Placement;

    /**
     * The state in which the last `request-slottable` event was dispatched.
     * Do not allow overlays from dispatching the same state twice in a row.
     */
    private lastRequestSlottableState = false;

    /**
     * Whether to pass focus to the overlay once opened, or
     * to the appropriate value based on the "type" of the overlay
     * when set to `"auto"`.
     *
     */
    @property({ attribute: 'receives-focus' })
    override receivesFocus: 'true' | 'false' | 'auto' = 'auto';

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
            this.strategy?.shouldCompleteOpen();
        }
        this.requestUpdate('state', oldState);
    }

    override _state: OverlayState = 'closed';

    public strategy?: ClickController | HoverController | LongpressController;

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
    triggerInteraction?: TriggerInteraction;

    /**
     * Configures the open/close heuristics of the Overlay.
     * @type {"auto" | "hint" | "manual" | "modal" | "page"}
     */
    @property()
    override type: OverlayTypes = 'auto';

    protected wasOpen = false;

    protected override get elementResolver(): ElementResolutionController {
        if (!this._elementResolver) {
            this._elementResolver = new ElementResolutionController(this);
        }
        return this._elementResolver;
    }

    private get usesDialog(): boolean {
        return this.type === 'modal' || this.type === 'page';
    }

    private get popoverValue(): 'auto' | 'manual' | undefined {
        const hasPopoverAttribute = 'popover' in this;
        if (!hasPopoverAttribute) {
            return undefined;
        }
        /* c8 ignore next 9 */
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
        /* c8 ignore next 3 */
        if (this.open !== targetOpenState) {
            return;
        }
        await this.manageDelay(targetOpenState);
        if (this.open !== targetOpenState) {
            return;
        }
        await this.ensureOnDOM(targetOpenState);
        /* c8 ignore next 3 */
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

    protected override returnFocus(): void {
        if (this.open || this.type === 'hint') return;

        // If the focus remains inside of the overlay or
        // a slotted descendent of the overlay you need to return
        // focus back to the trigger.
        const getAncestors = (): HTMLElement[] => {
            const ancestors: HTMLElement[] = [];
            // eslint-disable-next-line @spectrum-web-components/document-active-element
            let currentNode = document.activeElement;
            while (currentNode?.shadowRoot?.activeElement) {
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
            this.receivesFocus !== 'false' &&
            !!(this.triggerElement as HTMLElement)?.focus &&
            (this.contains((this.getRootNode() as Document).activeElement) ||
                getAncestors().includes(this) ||
                // eslint-disable-next-line @spectrum-web-components/document-active-element
                document.activeElement === document.body)
        ) {
            (this.triggerElement as HTMLElement).focus();
        }
    }

    private closeOnFocusOut = (event: FocusEvent): void => {
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
    };

    protected async manageOpen(oldOpen: boolean): Promise<void> {
        // The `.showPopover()` and `.showModal()` events will error on content that is not connected to the DOM.
        // Prevent from entering the manage workflow in order to avoid this.
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
        if (this.open && this.state !== 'opened') {
            this.state = 'opening';
        } else if (!this.open && this.state !== 'closed') {
            this.state = 'closing';
        }

        if (this.usesDialog) {
            this.manageDialogOpen();
        } else {
            this.managePopoverOpen();
        }
        if (this.type === 'auto') {
            const listenerRoot = this.getRootNode() as Document;
            if (this.open) {
                listenerRoot.addEventListener(
                    'focusout',
                    this.closeOnFocusOut,
                    { capture: true }
                );
            } else {
                listenerRoot.removeEventListener(
                    'focusout',
                    this.closeOnFocusOut,
                    { capture: true }
                );
            }
        }
    }

    protected bindEvents(): void {
        this.strategy?.abort();
        this.strategy = undefined;
        if (!this.hasNonVirtualTrigger) return;
        if (!this.triggerInteraction) return;
        this.strategy = new strategies[this.triggerInteraction](
            this.triggerElement as HTMLElement,
            {
                overlay: this,
            }
        );
    }

    protected handleBeforetoggle(event: Event & { newState: string }): void {
        if (event.newState !== 'open') {
            this.handleBrowserClose(event);
        }
    }

    protected handleBrowserClose(event: Event): void {
        event.stopPropagation();
        if (!this.strategy?.activelyOpening) {
            this.open = false;
            return;
        }
        this.manuallyKeepOpen();
    }

    public override manuallyKeepOpen(): void {
        this.open = true;
        this.placementController.allowPlacementUpdate = true;
        this.manageOpen(false);
    }

    protected handleSlotchange(): void {
        if (!this.elements.length) {
            this.strategy?.releaseDescription();
        } else if (this.hasNonVirtualTrigger) {
            this.strategy?.prepareDescription(
                this.triggerElement as HTMLElement
            );
        }
    }

    public shouldPreventClose(): boolean {
        const shouldPreventClose = this.willPreventClose;
        this.willPreventClose = false;
        return shouldPreventClose;
    }

    protected override requestSlottable(): void {
        if (this.lastRequestSlottableState === this.open) {
            return;
        }
        if (!this.open) {
            document.body.offsetHeight;
        }
        /**
         * @ignore
         */
        this.dispatchEvent(
            new SlottableRequestEvent(
                'overlay-content',
                this.open ? {} : removeSlottableRequest
            )
        );
        this.lastRequestSlottableState = this.open;
    }

    override willUpdate(changes: PropertyValues): void {
        if (!this.hasAttribute('id')) {
            this.setAttribute(
                'id',
                `${this.tagName.toLowerCase()}-${randomID()}`
            );
        }
        if (changes.has('open') && (this.hasUpdated || this.open)) {
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
        // Merge multiple possible calls to `bindEvents()`.
        let oldTrigger: HTMLElement | false | undefined = false;
        if (changes.has(elementResolverUpdatedSymbol)) {
            oldTrigger = this.triggerElement as HTMLElement;
            this.triggerElement = this.elementResolver.element;
        }
        if (changes.has('triggerElement')) {
            oldTrigger = changes.get('triggerElement');
        }
        if (oldTrigger !== false) {
            this.bindEvents();
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
        if (
            changes.has('state') &&
            this.state === 'closed' &&
            typeof changes.get('state') !== 'undefined'
        ) {
            this.placementController.clearOverlayPosition();
        }
    }

    protected renderContent(): TemplateResult {
        return html`
            <slot @slotchange=${this.handleSlotchange}></slot>
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
                placement=${ifDefined(
                    this.requiresPosition
                        ? this.placement || 'right'
                        : undefined
                )}
                style=${styleMap(this.dialogStyleMap)}
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
                placement=${ifDefined(
                    this.requiresPosition
                        ? this.placement || 'right'
                        : undefined
                )}
                popover=${ifDefined(this.popoverValue)}
                style=${styleMap(this.dialogStyleMap)}
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
        if (this.hasUpdated) {
            this.bindEvents();
        }
    }

    override disconnectedCallback(): void {
        this.strategy?.releaseDescription();
        this.open = false;
        super.disconnectedCallback();
    }
}
