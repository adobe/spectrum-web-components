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
    ElementPart,
    nothing,
    render,
    TemplateResult,
} from '@spectrum-web-components/base';
import { AsyncDirective, directive } from 'lit/async-directive.js';
import { Overlay, strategies } from './Overlay.js';
import { OverlayOptions, TriggerInteraction } from './overlay-types.js';
import { ClickController } from './ClickController.js';
import { HoverController } from './HoverController.js';
import { LongpressController } from './LongpressController.js';
import '../sp-overlay.js';
import {
    removeSlottableRequest,
    SlottableRequestEvent,
} from './slottable-request-event.js';

export type InsertionOptions = {
    el: HTMLElement | (() => HTMLElement);
    where: InsertPosition;
};

export type OverlayTriggerOptions = {
    triggerInteraction: TriggerInteraction;
    overlayOptions: OverlayOptions;
    insertionOptions?: InsertionOptions;
};

export class OverlayTriggerDirective extends AsyncDirective {
    private template!: () => TemplateResult;
    private target!: HTMLElement;
    private overlay = new Overlay();
    private strategy?: ClickController | HoverController | LongpressController;
    private abortController!: AbortController;

    protected defaultOptions: OverlayTriggerOptions = {
        triggerInteraction: 'hover',
        overlayOptions: {
            placement: 'top-start',
            type: 'auto',
            offset: 0,
        },
    };
    protected options: OverlayOptions = {
        ...this.defaultOptions.overlayOptions,
    };
    protected insertionOptions?: InsertionOptions;

    /* c8 ignore next 9 */
    render(
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
        let newTarget = false;
        const triggerInteraction = (options?.triggerInteraction ||
            this.defaultOptions.triggerInteraction) as TriggerInteraction;
        const newStrategy =
            (this.strategy?.type as unknown as TriggerInteraction) !==
            triggerInteraction;
        if (this.target !== part.element) {
            this.target = part.element as HTMLElement;
            newTarget = true;
        }
        if (newTarget || newStrategy) {
            this.strategy?.abort();
            this.strategy = new strategies[
                triggerInteraction as TriggerInteraction
            ](this.overlay, this.target, true);
        }
        this.init();

        if (window.__swc.DEBUG) {
            window.__swc.warn(
                undefined,
                `⚠️  WARNING ⚠️ : The Overlay Trigger Directive is experimental and there is no guarantees behind its usage in an application!! Its API and presence within the library could be changed at anytime. See "sp-overlay" or "Overlay.open()" for a stable API for overlaying content on your application.`,
                'https://opensource.adobe.com/spectrum-web-components/components/overlay',
                {
                    level: 'high',
                    type: 'api',
                }
            );
        }
    }

    handleSlottableRequest(event: SlottableRequestEvent): void {
        /* c8 ignore next 1 */
        if (event.target !== event.currentTarget) return;

        const willRemoveSlottable = event.data === removeSlottableRequest;

        render(willRemoveSlottable ? undefined : this.template(), this.overlay);
        if (willRemoveSlottable) {
            this.overlay.remove();
        } else {
            Overlay.applyOptions(this.overlay, {
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

    init(): void {
        this.abortController?.abort();
        this.abortController = new AbortController();
        const { signal } = this.abortController;
        this.overlay.addEventListener(
            'slottable-request',
            (event: Event) =>
                this.handleSlottableRequest(event as SlottableRequestEvent),
            { signal }
        );
    }

    override disconnected(): void {
        this.abortController.abort();
    }

    /* c8 ignore next 3 */
    override reconnected(): void {
        this.init();
    }
}

export const trigger = directive(OverlayTriggerDirective);
