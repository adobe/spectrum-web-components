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
    type ElementPart,
    nothing,
    render,
    type RenderOptions,
    type TemplateResult,
} from '@spectrum-web-components/base';
import { directive } from '@spectrum-web-components/base/src/async-directive.js';
import { strategies } from './strategies.js';
import type { OverlayOptions, TriggerInteraction } from './overlay-types.js';
import type { ClickController } from './ClickController.js';
import type { HoverController } from './HoverController.js';
import type { LongpressController } from './LongpressController.js';
import {
    removeSlottableRequest,
    type SlottableRequestEvent,
} from './slottable-request-event.js';
import { SlottableRequestDirective } from './slottable-request-directive.js';
import { AbstractOverlay } from './AbstractOverlay.js';
import { InteractionTypes } from './InteractionController.js';

export type InsertionOptions = {
    el: HTMLElement | (() => HTMLElement);
    where: InsertPosition;
};

export type OverlayTriggerOptions = {
    open?: boolean;
    triggerInteraction: TriggerInteraction;
    overlayOptions: OverlayOptions;
    insertionOptions?: InsertionOptions;
};

export class OverlayTriggerDirective extends SlottableRequestDirective {
    private host?: object;
    private overlay!: AbstractOverlay;
    private strategy!: ClickController | HoverController | LongpressController;

    protected defaultOptions: OverlayTriggerOptions = {
        triggerInteraction: 'click',
        overlayOptions: {
            type: 'auto',
            offset: 0,
        },
    };
    protected options: OverlayOptions = {
        ...this.defaultOptions.overlayOptions,
    };
    protected insertionOptions?: InsertionOptions;

    /* c8 ignore next 9 */
    override render(
        _template: () => TemplateResult,
        _options?: Partial<OverlayTriggerOptions>
    ): unknown {
        // render function here just defines the interface to the update call later
        // we don't have anything to render since this is intended to be an ElementPart directive
        // so will be used on an element and is not itself rendered
        return nothing;
    }

    override update(
        part: ElementPart,
        [template, options]: Parameters<this['render']>
    ): void {
        this.options = {
            ...this.defaultOptions.overlayOptions,
            ...options?.overlayOptions,
        };
        this.insertionOptions = options?.insertionOptions;
        this.template = template;
        this.host = part.options?.host;
        let newTarget = false;
        const triggerInteraction = (options?.triggerInteraction ||
            this.defaultOptions.triggerInteraction) as TriggerInteraction;
        const newStrategy =
            InteractionTypes[this.strategy?.type] !== triggerInteraction;
        if (this.target !== part.element) {
            this.target = part.element as HTMLElement;
            newTarget = true;
        }
        // Set listenerHost to target as a fallback, matching parent class behavior.
        // This ensures reconnected() hook can safely call init() before overlay is ready.
        this.listenerHost = this.target;
        if (newTarget || newStrategy) {
            this.strategy?.abort();
            this.strategy = new strategies[
                triggerInteraction as TriggerInteraction
            ](this.target, {
                isPersistent: true,
                handleOverlayReady: (overlay: AbstractOverlay) => {
                    this.listenerHost = this.overlay = overlay;
                    this.init();
                },
            });
        }
        this.strategy.open = options?.open ?? false;
    }

    override handleSlottableRequest(event: SlottableRequestEvent): void {
        /* c8 ignore next 1 */
        if (event.target !== event.currentTarget) return;

        const willRemoveSlottable = event.data === removeSlottableRequest;
        const options = {} as RenderOptions;
        if (this.host) {
            options.host = this.host;
        }
        render(
            willRemoveSlottable ? undefined : this.template(),
            this.overlay,
            options
        );

        if (willRemoveSlottable) {
            this.overlay.remove();
        } else {
            AbstractOverlay.applyOptions(this.overlay, {
                ...this.options,
                trigger: this.target,
            });
            const insertionEl =
                typeof this.insertionOptions?.el === 'function'
                    ? this.insertionOptions.el()
                    : this.insertionOptions?.el || this.target;
            const { where = 'afterend' } = this.insertionOptions || {};
            insertionEl.insertAdjacentElement(where, this.overlay);
        }
    }
}

export const trigger = directive(OverlayTriggerDirective);
