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
import { AsyncDirective, directive } from '@spectrum-web-components/base';
import {
    removeSlottableRequest,
    SlottableRequestEvent,
} from './slottable-request-event.js';

export class SlottableRequestDirective extends AsyncDirective {
    protected template!: () => TemplateResult;
    protected target!: HTMLElement;
    private renderBefore: HTMLElement | undefined;
    protected listenerHost!: HTMLElement;
    protected listeners!: AbortController;

    /* c8 ignore next 9 */
    render(_template: () => TemplateResult): unknown {
        // render function here just defines the interface to the update call later
        // we don't have anything to render since this is intended to be an ElementPart directive
        // so will be used on an element and is not itself rendered
        return nothing;
    }

    override update(
        part: ElementPart,
        [template]: Parameters<this['render']>
    ): void {
        this.template = template;
        if (this.target !== part.element) {
            this.target = part.element as HTMLElement;
            this.renderBefore = this.target.children[0] as HTMLElement;
        }
        this.listenerHost = this.target;
        this.init();
    }

    handleSlottableRequest(event: SlottableRequestEvent): void {
        /* c8 ignore next 1 */
        if (event.target !== event.currentTarget) return;

        const willRemoveSlottable = event.data === removeSlottableRequest;

        render(willRemoveSlottable ? undefined : this.template(), this.target, {
            renderBefore: this.renderBefore,
        });
    }

    init(): void {
        this.listeners?.abort();
        this.listeners = new AbortController();
        const { signal } = this.listeners;
        this.listenerHost.addEventListener(
            'slottable-request',
            (event: Event) =>
                this.handleSlottableRequest(event as SlottableRequestEvent),
            { signal }
        );

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

    override disconnected(): void {
        this.listeners?.abort();
    }

    /* c8 ignore next 3 */
    override reconnected(): void {
        this.init();
    }
}

export const slottableRequest = directive(SlottableRequestDirective);
