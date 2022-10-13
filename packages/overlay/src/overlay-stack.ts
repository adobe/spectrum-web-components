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

import { ActiveOverlay } from './ActiveOverlay.js';
import type {
    OverlayOpenCloseDetail,
    OverlayOpenDetail,
} from './overlay-types';
import { OverlayTimer } from './overlay-timer.js';
import '../active-overlay.js';
import {
    findOverlaysRootedInOverlay,
    parentOverlayOf,
} from './overlay-utils.js';
import { OverlayCloseEvent } from './overlay-events.js';
import { getDeepElementFromPoint } from '@spectrum-web-components/shared/src/get-deep-element-from-point.js';

function isLeftClick(event: MouseEvent): boolean {
    return event.button === 0;
}

function hasModifier(event: MouseEvent): boolean {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

interface ManagedOverlayContent {
    open: boolean;
    // Allow the overlaid content to do something before it is thrown.
    overlayWillOpenCallback?: (args: { trigger: HTMLElement }) => void;
    // Allow the overlaid content to do something when it has been thrown.
    overlayOpenCallback?: (args: { trigger: HTMLElement }) => void;
    // Allow the overlaid content to do something when its throw has been cancelled.
    overlayOpenCancelledCallback?: (args: { trigger: HTMLElement }) => void;
    // Allow the overlaid content to do something before it is recalled, and return `true` if it will self managing the recall.
    overlayWillCloseCallback?: (args: { trigger: HTMLElement }) => boolean;
    // Allow the overlaid content to do something when it has been recalled.
    overlayCloseCallback?: (args: { trigger: HTMLElement }) => void;
    // Surface possible LitElement lifecycle methods on the synthetically types element.
    updateComplete?: Promise<boolean>;
}

function nextFrame(): Promise<void> {
    return new Promise((res) => requestAnimationFrame(() => res()));
}

export class OverlayStack {
    public overlays: ActiveOverlay[] = [];

    private preventMouseRootClose = false;
    private root: HTMLElement = document.body;
    private handlingResize = false;
    private overlayTimer = new OverlayTimer();

    private canTabTrap = true;
    private trappingInited = false;
    private tabTrapper!: HTMLElement;
    private overlayHolder!: HTMLElement;
    private _eventsAreBound = false;

    constructor() {
        this.initTabTrapping();
    }

    private initTabTrapping(): void {
        /* c8 ignore next 10 */
        if (document.readyState === 'loading') {
            document.addEventListener(
                'readystatechange',
                () => {
                    this.initTabTrapping();
                },
                { once: true }
            );
            return;
        }
        if (this.trappingInited) return;
        this.trappingInited = true;
        /* c8 ignore next 4 */
        if (this.document.body.shadowRoot) {
            this.canTabTrap = false;
            return;
        }
        this.document.body.attachShadow({ mode: 'open' });
        /* c8 ignore next 3 */
        if (!this.document.body.shadowRoot) {
            return;
        }
        const root = this.document.body.shadowRoot as ShadowRoot;
        root.innerHTML = `
            <style>
            :host {
                position: relative;
            }
            #actual {
                position: relative;
                height: calc(100% - var(--swc-body-margins-block, 0px));
                z-index: 0;
                min-height: calc(100vh - var(--swc-body-margins-block, 0px));
            }
            #holder {
                display: none;
                align-items: center;
                justify-content: center;
                flex-flow: column;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
            [name="open"]::slotted(*) {
                pointer-events: all;
            }
            #actual[aria-hidden] + #holder {
                display: flex;
            }
            </style>
            <div id="actual"><slot></slot></div>
            <div id="holder"><slot name="open"></slot></div>
        `;
        this.tabTrapper = root.querySelector('#actual') as HTMLElement;
        this.overlayHolder = root.querySelector('#holder') as HTMLElement;
        this.tabTrapper.attachShadow({ mode: 'open' });
        if (this.tabTrapper.shadowRoot) {
            this.tabTrapper.shadowRoot.innerHTML = '<slot></slot>';
        }
        this.overlayHolder.addEventListener(
            'contextmenu',
            this.forwardContextmenuEvent,
            true
        );
        requestAnimationFrame(() => {
            this.applyBodyMargins();
            const observer = new ResizeObserver(() => {
                this.applyBodyMargins();
            });
            observer.observe(document.body);
        });
    }

    private _bodyMarginsApplied = false;

    private applyBodyMargins(): void {
        const { marginLeft, marginRight, marginTop, marginBottom } =
            getComputedStyle(document.body);
        const allZero =
            parseFloat(marginLeft) === 0 &&
            parseFloat(marginRight) === 0 &&
            parseFloat(marginTop) === 0 &&
            parseFloat(marginBottom) === 0;
        if (allZero && !this._bodyMarginsApplied) {
            return;
        }
        this.tabTrapper.style.setProperty(
            '--swc-body-margins-inline',
            `calc(${marginLeft} + ${marginRight})`
        );
        this.tabTrapper.style.setProperty(
            '--swc-body-margins-block',
            `calc(${marginTop} + ${marginBottom})`
        );
        this._bodyMarginsApplied = !allZero;
    }

    private startTabTrapping(): void {
        this.initTabTrapping();
        /* c8 ignore next 3 */
        if (!this.canTabTrap) {
            return;
        }
        this.tabTrapper.tabIndex = -1;
        this.tabTrapper.setAttribute('aria-hidden', 'true');
    }

    private stopTabTrapping(): void {
        /* c8 ignore next 3 */
        if (!this.canTabTrap || !this.trappingInited) {
            return;
        }
        this.tabTrapper.removeAttribute('tabindex');
        this.tabTrapper.removeAttribute('aria-hidden');
    }

    private forwardContextmenuEvent = async (
        event: MouseEvent
    ): Promise<void> => {
        const topOverlay = this.overlays[this.overlays.length - 1];
        if (
            !this.trappingInited ||
            topOverlay.interaction !== 'modal' ||
            event.target !== this.overlayHolder
        ) {
            return;
        }
        event.stopPropagation();
        event.preventDefault();
        await this.closeTopOverlay();
        getDeepElementFromPoint(event.clientX, event.clientY)?.dispatchEvent(
            new MouseEvent('contextmenu', event)
        );
    };

    private get document(): Document {
        return this.root.ownerDocument /* c8 ignore next */ || document;
    }

    private get topOverlay(): ActiveOverlay | undefined {
        return this.overlays.slice(-1)[0];
    }

    private findOverlayForContent(
        overlayContent: HTMLElement
    ): ActiveOverlay | undefined {
        for (const item of this.overlays) {
            if (overlayContent === item.overlayContent) {
                return item;
            }
        }
        return undefined;
    }

    private addEventListeners(): void {
        if (this._eventsAreBound) return;
        this._eventsAreBound = true;
        this.document.addEventListener('click', this.handleMouseCapture, true);
        this.document.addEventListener('click', this.handleMouse);
        this.document.addEventListener('keydown', this.handleKeydown);
        this.document.addEventListener(
            'sp-overlay-close',
            this.handleOverlayClose as EventListener
        );
        window.addEventListener('resize', this.handleResize);
    }

    handleOverlayClose = (event: OverlayCloseEvent): void => {
        const { root } = event;
        if (!root) return;
        this.closeOverlaysForRoot(root);
    };

    private isClickOverlayActiveForTrigger(trigger: HTMLElement): boolean {
        return this.overlays.some(
            (item) => trigger === item.trigger && item.interaction === 'click'
        );
    }

    public async openOverlay(details: OverlayOpenDetail): Promise<boolean> {
        this.addEventListeners();
        if (this.findOverlayForContent(details.content)) {
            return false;
        }
        if (details.notImmediatelyClosable) {
            this._doesNotCloseOnFirstClick = true;
        }
        if (details.interaction === 'modal') {
            this.startTabTrapping();
        }

        const contentWithLifecycle =
            details.content as unknown as ManagedOverlayContent;
        const { trigger } = details;
        if (contentWithLifecycle.overlayWillOpenCallback) {
            contentWithLifecycle.overlayWillOpenCallback({ trigger });
        }

        if (details.delayed) {
            const cancelledPromise = this.overlayTimer.openTimer(
                details.content
            );
            const promises = [cancelledPromise];
            if (details.abortPromise) {
                promises.push(details.abortPromise);
            }
            const cancelled = await Promise.race(promises);
            if (cancelled) {
                if (contentWithLifecycle.overlayOpenCancelledCallback) {
                    contentWithLifecycle.overlayOpenCancelledCallback({
                        trigger,
                    });
                }
                return cancelled;
            }
        }

        if (details.root) {
            this.closeOverlaysForRoot(details.root);
        }
        if (details.interaction === 'click') {
            this.closeAllHoverOverlays();
        } else if (
            details.interaction === 'hover' &&
            this.isClickOverlayActiveForTrigger(details.trigger)
        ) {
            // Don't show a hover popover if the click popover is already active
            return true;
        }

        const activeOverlay = ActiveOverlay.create(details);

        if (this.overlays.length) {
            const topOverlay = this.overlays[this.overlays.length - 1];
            topOverlay.obscure(activeOverlay.interaction);
        }

        document.body.appendChild(activeOverlay);

        /**
         * The following work to make the new overlay the "top" of the stack
         * has to happen AFTER the current call stack completes in case there
         * is work there in to remove the previous "top" overlay.
         */
        await nextFrame();
        this.overlays.push(activeOverlay);
        await activeOverlay.updateComplete;
        this.addOverlayEventListeners(activeOverlay);
        if (typeof contentWithLifecycle.open !== 'undefined') {
            await nextFrame();
            // Without the rAF Firefox gets here to early
            // and is not able trigger the animation.
            contentWithLifecycle.open = true;
        }
        let cb: () => Promise<void> | void = () => {
            return;
        };
        if (contentWithLifecycle.overlayOpenCallback) {
            const { trigger } = activeOverlay;
            const { overlayOpenCallback } = contentWithLifecycle;
            cb = async () => await overlayOpenCallback({ trigger });
        }
        await activeOverlay.openCallback(cb);
        return false;
    }

    public addOverlayEventListeners(activeOverlay: ActiveOverlay): void {
        activeOverlay.addEventListener('close', (() => {
            this.hideAndCloseOverlay(
                activeOverlay,
                true // animated?
            );
        }) as EventListener);
        switch (activeOverlay.interaction) {
            case 'replace':
                this.addReplaceOverlayEventListeners(activeOverlay);
                break;
            case 'inline':
                this.addInlineOverlayEventListeners(activeOverlay);
                break;
        }
    }

    public addReplaceOverlayEventListeners(activeOverlay: ActiveOverlay): void {
        activeOverlay.addEventListener('keydown', (event: KeyboardEvent) => {
            const { code } = event;
            /* c8 ignore next */
            if (code !== 'Tab') return;

            event.stopPropagation();
            this.closeOverlay(activeOverlay.overlayContent);
            activeOverlay.tabbingAway = true;
            activeOverlay.trigger.focus();
            activeOverlay.trigger.dispatchEvent(
                new KeyboardEvent('keydown', event)
            );
        });
    }

    public addInlineOverlayEventListeners(activeOverlay: ActiveOverlay): void {
        activeOverlay.trigger.addEventListener(
            'keydown',
            activeOverlay.handleInlineTriggerKeydown
        );
        activeOverlay.addEventListener('keydown', (event: KeyboardEvent) => {
            const { code, shiftKey } = event;
            /* c8 ignore next */
            if (code !== 'Tab') return;

            activeOverlay.tabbingAway = true;
            if (shiftKey) {
                const returnFocusElement = document.createElement('span');
                returnFocusElement.tabIndex = -1;
                if (activeOverlay.trigger.hasAttribute('slot')) {
                    returnFocusElement.slot = activeOverlay.trigger.slot;
                }
                activeOverlay.trigger.insertAdjacentElement(
                    'afterend',
                    returnFocusElement
                );
                returnFocusElement.focus();
                returnFocusElement.remove();
                return;
            }

            event.stopPropagation();
            const triggerWithLifecycle =
                activeOverlay.trigger as unknown as ManagedOverlayContent;
            if (typeof triggerWithLifecycle.open !== 'undefined') {
                triggerWithLifecycle.open = false;
            }
            this.closeOverlay(activeOverlay.overlayContent);
            activeOverlay.trigger.focus();
        });
    }

    public closeOverlay(content: HTMLElement): void {
        this.overlayTimer.close(content);
        requestAnimationFrame(() => {
            const overlayFromContent = this.findOverlayForContent(content);
            const overlaysToClose = [overlayFromContent];
            overlaysToClose.push(
                ...findOverlaysRootedInOverlay(
                    overlayFromContent,
                    this.overlays
                )
            );
            overlaysToClose.forEach((overlay) =>
                this.hideAndCloseOverlay(overlay)
            );
        });
    }

    private handleMouseCapture = (event: MouseEvent): void => {
        const topOverlay = this.topOverlay;
        if (
            !event.target ||
            !topOverlay ||
            !topOverlay.overlayContent ||
            hasModifier(event) ||
            !isLeftClick(event)
        ) {
            this.preventMouseRootClose = true;
            return;
        }

        if (event.target instanceof Node) {
            const path = event.composedPath();
            if (path.indexOf(topOverlay.overlayContent) >= 0) {
                this.preventMouseRootClose = true;
                return;
            }
            this.preventMouseRootClose = false;
        }
    };

    private closeAllHoverOverlays(): void {
        for (const overlay of this.overlays) {
            if (overlay.interaction === 'hover') {
                this.hideAndCloseOverlay(overlay, false);
            }
        }
    }

    private closeOverlaysForRoot(root: HTMLElement): void {
        const overlaysToClose: ActiveOverlay[] = [];
        for (const overlay of this.overlays) {
            if (overlay.root && overlay.root === root) {
                overlaysToClose.push(overlay);
                overlaysToClose.push(
                    ...findOverlaysRootedInOverlay(overlay, this.overlays)
                );
            }
        }
        overlaysToClose.forEach((overlay) =>
            this.hideAndCloseOverlay(overlay, true, true)
        );
    }

    private async manageFocusAfterCloseWhenOverlaysRemain(
        returnBeforeFocus?: boolean,
        previousTrigger?: HTMLElement
    ): Promise<void> {
        const topOverlay = this.overlays[this.overlays.length - 1];
        topOverlay.feature();
        // Push focus in the the next remaining overlay as needed when a `type="modal"` overlay exists.
        if (topOverlay.interaction === 'modal' || topOverlay.hasModalRoot) {
            if (returnBeforeFocus) return;
            await (previousTrigger || topOverlay).focus();
        } else {
            this.stopTabTrapping();
        }
    }

    private manageFocusAfterCloseWhenLastOverlay(overlay: ActiveOverlay): void {
        this.stopTabTrapping();
        const isModal = overlay.interaction === 'modal';
        const isReceivesFocus = overlay.receivesFocus === 'auto';
        const isReplace = overlay.interaction === 'replace';
        const isInline = overlay.interaction === 'inline';
        const isTabbingAwayFromInlineOrReplace =
            (isReplace || isInline) && !overlay.tabbingAway;
        overlay.tabbingAway = false;
        if (!isModal && !isReceivesFocus && !isTabbingAwayFromInlineOrReplace) {
            return;
        }
        // Manage post closure focus when needed.
        const overlayRoot = overlay.overlayContent.getRootNode() as ShadowRoot;
        const overlayContentActiveElement = overlayRoot.activeElement;
        let triggerRoot: ShadowRoot;
        let triggerActiveElement: Element | null;
        const contentContainsActiveElement = (): boolean =>
            overlay.overlayContent.contains(overlayContentActiveElement);
        const triggerRootContainsActiveElement = (): boolean => {
            triggerRoot = overlay.trigger.getRootNode() as ShadowRoot;
            triggerActiveElement = triggerRoot.activeElement;
            return triggerRoot.contains(triggerActiveElement);
        };
        const triggerHostIsActiveElement = (): boolean =>
            triggerRoot.host && triggerRoot.host === triggerActiveElement;
        // Return focus to the trigger as long as the user hasn't actively focused
        // something outside of the current overlay interface; trigger, root, host.
        if (
            isModal ||
            contentContainsActiveElement() ||
            triggerRootContainsActiveElement() ||
            triggerHostIsActiveElement()
        ) {
            overlay.trigger.focus();
        }
    }

    private async hideAndCloseOverlay(
        overlay?: ActiveOverlay,
        animated?: boolean,
        returnBeforeFocus?: boolean
    ): Promise<void> {
        if (!overlay) {
            return;
        }
        const contentWithLifecycle =
            overlay.overlayContent as unknown as ManagedOverlayContent;
        if (
            typeof contentWithLifecycle.overlayWillCloseCallback !== 'undefined'
        ) {
            const { trigger } = overlay;
            if (contentWithLifecycle.overlayWillCloseCallback({ trigger })) {
                return;
            }
        }
        await overlay.hide(animated);
        if (typeof contentWithLifecycle.open !== 'undefined') {
            contentWithLifecycle.open = false;
        }
        if (contentWithLifecycle.overlayCloseCallback) {
            const { trigger } = overlay;
            await contentWithLifecycle.overlayCloseCallback({ trigger });
        }

        if (overlay.state != 'dispose') return;

        const index = this.overlays.indexOf(overlay);
        if (index >= 0) {
            this.overlays.splice(index, 1);
        }

        if (this.overlays.length) {
            await this.manageFocusAfterCloseWhenOverlaysRemain(
                returnBeforeFocus || overlay.interaction === 'hover',
                overlay.trigger
            );
        } else {
            this.manageFocusAfterCloseWhenLastOverlay(overlay);
        }

        await overlay.updateComplete;
        overlay.remove();
        overlay.dispose();

        overlay.trigger.dispatchEvent(
            new CustomEvent<OverlayOpenCloseDetail>('sp-closed', {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: {
                    interaction: overlay.interaction,
                },
            })
        );
    }

    private closeTopOverlay(): Promise<void> {
        return this.hideAndCloseOverlay(this.topOverlay, true);
    }

    /**
     * A "longpress" occurs before the "click" that creates it has occured.
     * In that way the first click will still be part of the "longpress" and
     * not part of closing the overlay.
     */
    private _doesNotCloseOnFirstClick = false;

    private handleMouse = (event: Event): void => {
        if (this._doesNotCloseOnFirstClick) {
            this._doesNotCloseOnFirstClick = false;
            return;
        }
        if (this.preventMouseRootClose || event.defaultPrevented) {
            return;
        }
        const overlaysToClose = [];
        // Find the top most overlay that is not triggered by an
        // element on the path of the current click event.
        let index = this.overlays.length;
        while (index && overlaysToClose.length === 0) {
            index -= 1;
            const overlay = this.overlays[index];
            if (
                !event.composedPath().includes(overlay.trigger) ||
                overlay.interaction !== 'hover'
            ) {
                overlaysToClose.push(overlay);
            }
        }
        let root: HTMLElement | undefined = this.topOverlay?.root;
        let overlay = parentOverlayOf(root);
        while (root && overlay) {
            overlaysToClose.push(overlay);
            overlay = parentOverlayOf(root);
            root = overlay?.root;
        }
        if (overlay) {
            overlaysToClose.push(overlay);
        }
        overlaysToClose.forEach((overlay) => this.hideAndCloseOverlay(overlay));
    };

    private handleKeydown = (event: KeyboardEvent): void => {
        if (event.code === 'Escape') {
            this.closeTopOverlay();
        }
    };

    private handleResize = (): void => {
        if (this.handlingResize) return;

        this.handlingResize = true;
        requestAnimationFrame(async () => {
            const promises = this.overlays.map((overlay) =>
                overlay.updateOverlayPosition()
            );
            await Promise.all(promises);
            this.handlingResize = false;
        });
    };
}
