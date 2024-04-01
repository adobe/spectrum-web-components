/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { conditionAttributeWithId } from '@spectrum-web-components/base/src/condition-attribute-with-id.js';
import { randomID } from '@spectrum-web-components/shared/src/random-id.js';

import {
    InteractionController,
    InteractionTypes,
} from './InteractionController.js';
import { noop } from './AbstractOverlay.js';

const HOVER_DELAY = 300;

export class HoverController extends InteractionController {
    override type = InteractionTypes.hover;

    private elementIds: string[] = [];

    focusedin = false;

    private hoverTimeout?: ReturnType<typeof setTimeout>;

    pointerentered = false;

    handleTargetFocusin(): void {
        // eslint-disable-next-line @spectrum-web-components/document-active-element
        if (!document.activeElement?.matches(':focus-visible')) {
            return;
        }
        this.host.open = true;
        this.focusedin = true;
    }

    handleTargetFocusout(): void {
        this.focusedin = false;
        if (this.pointerentered) return;
        this.host.open = false;
    }

    handleTargetPointerenter(): void {
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = undefined;
        }
        if (this.host.disabled) return;
        this.host.open = true;
        this.pointerentered = true;
    }

    handleTargetPointerleave(): void {
        this.doPointerleave();
    }

    // set a timeout once the pointer enters and the overlay is shown
    // give the user time to enter the overlay
    handleHostPointerenter(): void {
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = undefined;
        }
    }

    handleHostPointerleave(): void {
        this.doPointerleave();
    }

    override prepareDescription(): void {
        // require "content" to apply relationship
        if (!this.host.elements.length) return;

        const triggerRoot = this.target.getRootNode();
        const contentRoot = this.host.elements[0].getRootNode();
        const overlayRoot = this.host.getRootNode();
        if (triggerRoot === overlayRoot) {
            this.prepareOverlayRelativeDescription();
        } else if (triggerRoot === contentRoot) {
            this.prepareContentRelativeDescription();
        }
    }

    private prepareOverlayRelativeDescription(): void {
        const releaseDescription = conditionAttributeWithId(
            this.target,
            'aria-describedby',
            [this.host.id]
        );
        this.releaseDescription = () => {
            releaseDescription();
            this.releaseDescription = noop;
        };
    }

    private prepareContentRelativeDescription(): void {
        const elementIds: string[] = [];
        const appliedIds = this.host.elements.map((el) => {
            elementIds.push(el.id);
            if (!el.id) {
                el.id = `${this.host.tagName.toLowerCase()}-helper-${randomID()}`;
            }
            return el.id;
        });
        this.elementIds = elementIds;
        const releaseDescription = conditionAttributeWithId(
            this.target,
            'aria-describedby',
            appliedIds
        );
        this.releaseDescription = () => {
            releaseDescription();
            this.host.elements.map((el, index) => {
                el.id = this.elementIds[index];
            });
            this.releaseDescription = noop;
        };
    }

    protected doPointerleave(): void {
        this.pointerentered = false;
        const triggerElement = this.target as HTMLElement;
        if (this.focusedin && triggerElement.matches(':focus-visible')) return;

        this.hoverTimeout = setTimeout(() => {
            this.host.open = false;
        }, HOVER_DELAY);
    }

    override init(): void {
        // Clean up listeners if they've already been bound
        this.abortController?.abort();
        this.abortController = new AbortController();
        const { signal } = this.abortController;
        this.target.addEventListener(
            'focusin',
            () => this.handleTargetFocusin(),
            { signal }
        );
        this.target.addEventListener(
            'focusout',
            () => this.handleTargetFocusout(),
            { signal }
        );
        this.target.addEventListener(
            'pointerenter',
            () => this.handleTargetPointerenter(),
            { signal }
        );
        this.target.addEventListener(
            'pointerleave',
            () => this.handleTargetPointerleave(),
            { signal }
        );
        this.host.addEventListener(
            'pointerenter',
            () => this.handleHostPointerenter(),
            { signal }
        );
        this.host.addEventListener(
            'pointerleave',
            () => this.handleHostPointerleave(),
            { signal }
        );
    }
}
