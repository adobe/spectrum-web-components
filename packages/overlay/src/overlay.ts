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

import { ThemeData } from '@spectrum-web-components/theme';
import {
    TriggerInteractions,
    OverlayDisplayQueryDetail,
    OverlayOptions,
} from './overlay-types';
import { OverlayStack } from './overlay-stack.js';

/**
 * This class allows access to the overlay system which allows a client to
 * position an element in the overlay positioned relative to another node.
 */
export class Overlay {
    private static overlayStack = new OverlayStack();

    private isOpen = false;
    private overlayElement: HTMLElement;
    private owner: HTMLElement;
    private interaction: TriggerInteractions;

    /**
     *
     * @param owner the parent element we will use to position the overlay element
     * @param interaction the type of interaction that caused this overlay to be shown
     * @param overlayElement the item to display as an overlay
     */
    constructor(
        owner: HTMLElement,
        interaction: TriggerInteractions,
        overlayElement: HTMLElement
    ) {
        this.owner = owner;
        this.overlayElement = overlayElement;
        this.interaction = interaction;
    }

    /**
     * Open an overlay
     *
     * @param owner the parent element we will use to position the overlay element
     * @param interaction the type of interaction that caused this overlay to be shown
     * @param overlayElement the item to display as an overlay
     * @param options display parameters
     * @param options.delayed if true delay opening of the overlay based on the global warmup/cooldown timer
     * @param options.offset distance to offset the overlay
     * @param options.placement side on which to position the overlay
     * @returns an Overlay object which can be used to close the overlay
     */
    public static async open(
        owner: HTMLElement,
        interaction: TriggerInteractions,
        overlayElement: HTMLElement,
        options: OverlayOptions
    ): Promise<() => void> {
        const overlay = new Overlay(owner, interaction, overlayElement);
        await overlay.open(options);
        return (): void => {
            overlay.close();
        };
    }

    public static update(): void {
        const overlayUpdateEvent = new CustomEvent('sp-update-overlays', {
            bubbles: true,
            composed: true,
            cancelable: true,
        });
        document.dispatchEvent(overlayUpdateEvent);
    }

    /**
     * Open an overlay
     *
     * @param options display parameters
     * @param options.delayed delay before opening the overlay
     * @param options.offset distance to offset the overlay
     * @param options.placement side on which to position the overlay
     * @returns a Promise that resolves to true if this operation was cancelled
     */
    public async open({
        delayed,
        offset = 0,
        placement = 'top',
        receivesFocus,
    }: OverlayOptions): Promise<boolean> {
        /* c8 ignore next */
        if (this.isOpen) return true;

        if (delayed === undefined) {
            delayed = this.overlayElement.hasAttribute('delayed');
        }

        const queryThemeDetail: ThemeData = {
            color: undefined,
            scale: undefined,
        };
        const queryThemeEvent = new CustomEvent<ThemeData>('sp-query-theme', {
            bubbles: true,
            composed: true,
            detail: queryThemeDetail,
            cancelable: true,
        });
        this.owner.dispatchEvent(queryThemeEvent);

        const overlayDetailQuery: OverlayDisplayQueryDetail = {};
        const queryOverlayDetailEvent = new CustomEvent<
            OverlayDisplayQueryDetail
        >('sp-overlay-query', {
            bubbles: true,
            composed: true,
            detail: overlayDetailQuery,
            cancelable: true,
        });
        this.overlayElement.dispatchEvent(queryOverlayDetailEvent);

        await Overlay.overlayStack.openOverlay({
            content: this.overlayElement,
            contentTip: overlayDetailQuery.overlayContentTipElement,
            delayed,
            offset: offset,
            placement: placement,
            trigger: this.owner,
            interaction: this.interaction,
            theme: queryThemeDetail,
            receivesFocus,
            ...overlayDetailQuery,
        });
        this.isOpen = true;
        return true;
    }

    /**
     * Close the overlay if it is open
     */
    public close(): void {
        Overlay.overlayStack.closeOverlay(this.overlayElement);
    }
}
