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
import { ElementPart, nothing, render, TemplateResult } from 'lit';
import { AsyncDirective, directive } from 'lit/async-directive.js';
import { Overlay } from './overlay.js';
import { OverlayContentTypes } from './OverlayTrigger.js';
import {
    OverlayOpenCloseDetail,
    OverlayTriggerInteractions,
    Placement,
} from './overlay-types.js';

export type OverlayTriggerOptions = {
    triggerOn: OverlayContentTypes;
    placement: Placement;
    type: OverlayTriggerInteractions;
    offset: number;
};

export class OverlayTriggerDirective extends AsyncDirective {
    private template?: TemplateResult;
    private target?: HTMLElement;

    protected defaultOptions: OverlayTriggerOptions = {
        triggerOn: 'hover',
        placement: 'top-start',
        type: 'inline',
        offset: 0,
    };
    protected options: OverlayTriggerOptions = { ...this.defaultOptions };

    private open = false;
    private overlaidContent?: HTMLElement;
    private closeOverlay?: Promise<() => void>;
    private abortOverlay?: (value: boolean) => void;

    render(
        _template: TemplateResult,
        _options?: Partial<OverlayTriggerOptions>
    ): unknown {
        // render function here just defines the interface to the update call later
        // we don't have anything to render since this is tintended to be an ElementPart directive
        // so will be used on an element and is not itself rendered
        return nothing;
    }

    override update(
        part: ElementPart,
        [template, options]: Parameters<this['render']>
    ): void {
        if (this.target !== part.element) {
            this.removeListeners();
        }
        this.options = {
            ...this.defaultOptions,
            ...options,
        };
        this.template = template;

        this.target = part.element as HTMLElement;
        // start listening for trigger events
        this.addListeners();
    }

    private async handleOpen(): Promise<void> {
        if (this.open) {
            return;
        }
        if (!this.template || !this.target) {
            return;
        }
        this.open = true;
        // render the template into an empty span (we'll discard later)
        const fragment = document.createElement('span');
        render(this.template, fragment);
        // create an abort promise to exit overlay show early if we're rapidly closing
        const abortPromise: Promise<boolean> = new Promise((res) => {
            this.abortOverlay = res;
        });
        // we're going to capture the child of the span, since thats the content we actually want
        this.overlaidContent = fragment.children[0] as HTMLElement;
        // actually open the overlay with this content
        this.closeOverlay = Overlay.open(
            this.target,
            this.options.triggerOn,
            this.overlaidContent,
            {
                placement: this.options.placement,
                offset: this.options.offset,
                abortPromise,
            }
        );
    }

    private handleClosed = (
        event: CustomEvent<OverlayOpenCloseDetail>
    ): void => {
        // closed outside of our control?
        if (event?.detail.interaction === this.options.triggerOn) {
            this.open = false;
        }
    };

    private async doClose(): Promise<void> {
        if (this.abortOverlay) {
            this.abortOverlay(true);
            this.abortOverlay = undefined;
        }
        if (this.closeOverlay) {
            const closeOverlay = this.closeOverlay;
            this.closeOverlay = undefined;
            (await closeOverlay)();
        }
        this.overlaidContent = undefined;
        this.open = false;
    }

    private removeListeners(): void {
        if (!this.target) {
            return;
        }
        this.target.removeEventListener('mouseenter', this.activate);
        this.target.removeEventListener('focusin', this.activate);
        this.target.removeEventListener('mouseleave', this.deactivate);
        this.target.removeEventListener('focusout', this.deactivate);
        this.target.removeEventListener('click', this.activate);
        this.target.removeEventListener('longpress', this.activate);
        this.target.removeEventListener('sp-closed', this.handleClosed);
    }

    private addListeners(): void {
        if (!this.template || !this.target) {
            return;
        }
        this.target.addEventListener('sp-closed', this.handleClosed);

        switch (this.options.triggerOn) {
            case 'hover': {
                this.target.addEventListener('mouseenter', this.activate);
                this.target.addEventListener('focusin', this.activate);
                this.target.addEventListener('mouseleave', this.deactivate);
                this.target.addEventListener('focusout', this.deactivate);
                break;
            }
            case 'click': {
                this.target.addEventListener('click', this.activate);
                break;
            }
            case 'longpress': {
                this.target.addEventListener('longpress', this.activate);
            }
        }
    }

    private deactivate = (event: Event): void => {
        const mouseIsEnteringHoverContent =
            event.type === 'mouseleave' &&
            this.options.triggerOn === 'hover' &&
            this.open &&
            (event as unknown as MouseEvent).relatedTarget ===
                this.overlaidContent;
        if (mouseIsEnteringHoverContent && this.overlaidContent) {
            // mouse is moving from the trigger to the hover content
            // start listening on the overlay to see if we leave it
            this.overlaidContent.addEventListener(
                'mouseleave',
                (event: MouseEvent) => {
                    // did the mouse exit back onto the trigger?
                    const mouseIsEnteringTrigger =
                        event.relatedTarget === this.target;
                    if (mouseIsEnteringTrigger) {
                        // then do nothing
                        return;
                    }
                    // otherwise let the overlay close with the regular mouse leave behavior
                    this.deactivate(event);
                },
                { once: true }
            );
            return;
        }
        this.doClose();
    };

    private activate = (_event: Event): void => {
        if (!this.target) return;
        this.handleOpen();
    };
}

export const trigger = directive(OverlayTriggerDirective);
