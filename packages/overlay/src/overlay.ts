/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { ThemeData } from '@spectrum-web-components/theme';
import { TriggerInteractions, Placement } from './overlay-types';
import { OverlayStack } from './overlay-stack';

type OverlayOptions = {
    delay?: number;
    placement?: Placement;
    offset?: number;
};

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
     * @param options.delay delay before opening the overlay
     * @param options.offset distance to offset the overlay
     * @param options.placement side on which to position the overlay
     * @returns an Overlay object which can be used to close the overlay
     */
    public static open(
        owner: HTMLElement,
        interaction: TriggerInteractions,
        overlayElement: HTMLElement,
        options: OverlayOptions
    ): Overlay {
        const overlay = new Overlay(owner, interaction, overlayElement);
        overlay.open(options);
        return overlay;
    }

    /**
     * Open an overlay
     *
     * @param options display parameters
     * @param options.delay delay before opening the overlay
     * @param options.offset distance to offset the overlay
     * @param options.placement side on which to position the overlay
     */
    public open({
        delay,
        offset = 0,
        placement = 'top',
    }: OverlayOptions): void {
        /* istanbul ignore if */
        if (this.isOpen) return;

        /* istanbul ignore else */
        if (!delay) {
            const delayAttribute = this.overlayElement.getAttribute('delay');
            delay = delayAttribute ? parseFloat(delayAttribute) : 0;
        }

        const queryThemeDetail: ThemeData = {
            color: undefined,
            size: undefined,
        };
        const queryThemeEvent = new CustomEvent<ThemeData>('query-theme', {
            bubbles: true,
            composed: true,
            detail: queryThemeDetail,
            cancelable: true,
        });
        this.owner.dispatchEvent(queryThemeEvent);

        Overlay.overlayStack.openOverlay({
            content: this.overlayElement,
            delay: delay,
            offset: offset,
            placement: placement,
            trigger: this.owner,
            interaction: this.interaction,
            theme: queryThemeDetail,
        });
        this.isOpen = true;
    }

    /**
     * Close the overlay if it is open
     */
    public close(): void {
        Overlay.overlayStack.closeOverlay(this.overlayElement);
    }
}
