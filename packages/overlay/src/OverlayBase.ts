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
import { conditionAttributeWithId } from '@spectrum-web-components/base/src/condition-attribute-with-id.js';
import {
    ElementResolutionController,
    elementResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';
import type { VirtualTrigger } from './VirtualTrigger.js';
import {
    ifDefined,
    styleMap,
} from '@spectrum-web-components/base/src/directives.js';
import styles from './overlay-base.css.js';
import { overlayStack } from './OverlayStack.js';
import { PlacementController } from './PlacementController.js';

export type OpenableElement = HTMLElement & {
    open: boolean;
    tipElement?: HTMLElement;
    updateComplete?: Promise<void>;
};

export type OverlayTypes = 'auto' | 'hint' | 'manual' | 'modal' | 'page';

const LONGPRESS_DURATION = 300;

export type LongpressEvent = {
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

export class OverlayBase extends SpectrumElement {
    static override styles = [styles];

    @query('dialog')
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
            this.wasOpen = this.open;
            this.open = false;
        } else {
            this.open = this.open || this.wasOpen;
            this.wasOpen = false;
        }
    }

    private _disabled = false;

    @queryAssignedElements({ flatten: true })
    elements!: OpenableElement[];

    public parentOverlayToForceClose?: OverlayBase;

    protected longpressed = false;

    private longressTimeout!: ReturnType<typeof setTimeout>;

    @property()
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
        this.requestUpdate('open', !this.open);
    }

    private _open = false;

    static openCount = 1;

    @property()
    placement?: Placement;

    @property({ attribute: 'receives-focus' })
    receivesFocus: 'true' | 'false' | 'auto' = 'auto';

    private releaseAriaDescribedby = (): void => {
        return;
    };

    @query('slot')
    slotEl!: HTMLSlotElement;

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

    protected manageChildren(open: boolean): void {
        const eventName = open ? 'sp-opened' : 'sp-closed';
        let announced = false;
        this.elements.forEach((el) => {
            if (typeof el.open !== 'undefined') {
                el.open = open;
                el.dispatchEvent(
                    new Event(eventName, {
                        bubbles: false,
                        composed: false,
                    })
                );
            }
            if (!announced) {
                this.dispatchEvent(
                    new Event(eventName, {
                        bubbles: true,
                        composed: true,
                    })
                );
                announced = true;
            }
        });
    }

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
        // Do no position "page" overlays as they should block the entrie UI.
        if (this.type === 'page' || !this.open) return false;
        // Do not position content without a trigger element, what would you position it in relation to?
        // Do not automaticallyu position contnent, unless it is a "hint".
        if (!this.triggerElement || (!this.placement && this.type !== 'hint'))
            return false;
        return true;
    }

    protected managePosition(): void {
        if (!this.requiresPosition) return;

        const offset = this.offset || 0;
        const trigger = this.triggerElement as HTMLElement;
        const placement = (this.placement as Placement) || 'right';

        this.placementController.placeOverlay(this.dialogEl, {
            // delayed?: boolean,
            offset,
            placement,
            // notImmediatelyClosable?: boolean, // rename or place behind other API options
            // receivesFocus?: 'auto';
            // root?: HTMLElement;
            trigger,
            type: this.type,
        });
    }

    protected async manageOpen(): Promise<void> {
        if (!this.isConnected) return;

        if (!this.hasUpdated) {
            await this.updateComplete;
        }

        if (this.open) {
            overlayStack.add(this);
        } else {
            overlayStack.remove(this);
        }

        if (this.usesDialog) {
            this.manageDialogOpen();
        } else {
            this.managePopoverOpen();
        }
        if (this.open) {
            OverlayBase.openCount += 1;
            // this.manageChildren(this.open);
            // this.managePosition();
        } else {
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

    protected manageTriggerElement(triggerElement: HTMLElement | null): void {
        if (triggerElement) {
            triggerElement.removeEventListener('click', this.handleClick);
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
            triggerElement.addEventListener(
                'pointerdown',
                this.handlePointerdown
            );
            triggerElement.removeEventListener('keydown', this.handleKeydown);
            triggerElement.removeEventListener('keyup', this.handleKeyup);
            triggerElement.removeEventListener(
                'longpress',
                this.handleLongpress
            );
            this.releaseAriaDescribedby();
        }
        if (
            !this.triggerElement ||
            !!(this.triggerElement as VirtualTrigger).updateBoundingClientRect
        )
            return;
        const nextTriggerElement = this.triggerElement as HTMLElement;
        switch (this.triggerInteraction) {
            case 'click':
                nextTriggerElement.addEventListener('click', this.handleClick);
                return;
            case 'longpress':
                nextTriggerElement.addEventListener(
                    'pointerdown',
                    this.handlePointerdown
                );
                nextTriggerElement.addEventListener(
                    'keydown',
                    this.handleKeydown
                );
                nextTriggerElement.addEventListener('keyup', this.handleKeyup);
                nextTriggerElement.addEventListener(
                    'longpress',
                    this.handleLongpress
                );
                return;
            case 'hover':
                nextTriggerElement.addEventListener(
                    'focusin',
                    this.handleFocusin
                );
                nextTriggerElement.addEventListener(
                    'focusout',
                    this.handleFocusout
                );
                nextTriggerElement.addEventListener(
                    'pointerenter',
                    this.handlePointerenter
                );
                nextTriggerElement.addEventListener(
                    'pointerleave',
                    this.handlePointerleave
                );
                if (this.receivesFocus === 'true') return;

                this.prepareAriaDescribedby(nextTriggerElement);
                return;
        }
    }

    private elementIds: string[] = [];

    private prepareAriaDescribedby(trigger: HTMLElement): void {
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
                this.releaseAriaDescribedby = () => {
                    return;
                };
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
                this.releaseAriaDescribedby = () => {
                    return;
                };
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

    protected handleClick = (): void => {
        if (this.longpressed) return;
        this.open = !this.open;
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
        this.open = true;
        this.pointerentered = true;
    };

    protected handlePointerleave = (): void => {
        this.pointerentered = false;
        const triggerElement = this.triggerElement as HTMLElement;
        if (this.focusedin && triggerElement.matches(':focus-visible')) return;
        this.open = false;
    };

    protected handleLongpress = (): void => {
        this.open = true;
        this.longpressed = true;
    };

    protected handleBeforetoggle({
        newState: open,
    }: Event & { newState: string }): void {
        if (open === 'open') {
            this.handlePopovershow();
        } else {
            this.handlePopoverhide();
        }
    }

    protected handlePopoverhide(): void {
        this.open = false;
        this.dispatchEvent(new BeforetoggleClosedEvent());
        // const triggerElement = this.triggerElement as HTMLElement;
        // if (this.triggerInteraction === 'click') {
        //     requestAnimationFrame(() => {
        //         triggerElement.addEventListener('click', this.handleClick);
        //     });
        // }
    }

    protected handlePopovershow(): void {
        this.dispatchEvent(new BeforetoggleOpenEvent());
    }

    override willUpdate(changes: PropertyValues): void {
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
            this.manageOpen();
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
            if (typeof changes.get('placement') !== 'undefined') {
                this.managePosition();
            }
        }
    }

    public override render(): TemplateResult {
        const hasPopoverAttribute = 'popover' in this;
        const popoverValue = hasPopoverAttribute
            ? this.popoverValue
            : undefined;
        return html`
            <dialog
                part="dialog"
                popover=${ifDefined(popoverValue)}
                @close=${() => {
                    this.open = false;
                }}
                @cancel=${() => {
                    this.open = false;
                }}
                @beforetoggle=${this.handleBeforetoggle}
                @popovershow=${this.handlePopovershow}
                style=${styleMap({
                    '--swc-overlay-z-index': OverlayBase.openCount.toString(),
                })}
            >
                <div part="content">
                    <slot></slot>
                </div>
            </dialog>
        `;
    }

    override connectedCallback(): void {
        super.connectedCallback();
        // this.manageOpen();
        this.addEventListener('close', () => {
            this.open = false;
        });
    }
}
