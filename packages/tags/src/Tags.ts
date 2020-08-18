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

import {
    html,
    SpectrumElement,
    CSSResultArray,
    TemplateResult,
    queryAssignedNodes,
} from '@spectrum-web-components/base';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared/src/focus-visible.js';

import { Tag } from './Tag.js';

import styles from './tags.css.js';

/**
 * @element sp-tags
 */
export class Tags extends FocusVisiblePolyfillMixin(SpectrumElement) {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    @queryAssignedNodes('')
    public defaultNodes!: Node[];

    public get tags(): Tag[] {
        return this.defaultNodes.filter(
            (node) => (node as HTMLElement) instanceof Tag
        ) as Tag[];
    }

    constructor() {
        super();
        this.addEventListener('focusin', this.handleFocusin);
    }

    public focus(): void {
        if (!this.tags.length) {
            return;
        }
        const firstTagNonDisabled = this.tags.find((tag) => !tag.disabled);
        /* istanbul ignore else */
        if (firstTagNonDisabled) {
            firstTagNonDisabled.focus();
        }
    }

    private handleFocusin = (): void => {
        this.addEventListener('focusout', this.handleFocusout);
        this.addEventListener('keydown', this.handleKeydown);
        requestAnimationFrame(() => {
            const firstTagWithTabIndex = this.tags.find(
                (tag) => tag.tabIndex === 0
            );
            if (firstTagWithTabIndex) {
                firstTagWithTabIndex.tabIndex = -1;
            }
        });
    };

    private handleKeydown = (event: KeyboardEvent): void => {
        const { code } = event;
        const activeElement = (this.getRootNode() as Document)
            .activeElement as Tag;
        /* istanbul ignore if */
        if (!activeElement) {
            return;
        }
        let nextIndex = this.tags.indexOf(activeElement);
        /* istanbul ignore if */
        if (nextIndex === -1) {
            return;
        }
        const circularIndexedElement = <T extends HTMLElement>(
            list: T[],
            index: number
        ): T => list[(list.length + index) % list.length];
        const tagFromDelta = (delta: number): void => {
            nextIndex += delta;
            while (circularIndexedElement(this.tags, nextIndex).disabled) {
                nextIndex += delta;
            }
        };
        switch (code) {
            case 'ArrowUp':
                tagFromDelta(-1);
                break;
            case 'ArrowLeft':
                tagFromDelta(this.isLTR ? -1 : 1);
                break;
            case 'ArrowRight':
                tagFromDelta(this.isLTR ? 1 : -1);
                break;
            case 'ArrowDown':
                tagFromDelta(1);
                break;
            case 'End':
                nextIndex = this.tags.length;
                tagFromDelta(-1);
                break;
            case 'Home':
                nextIndex = -1;
                tagFromDelta(1);
                break;
            case 'PageUp':
            case 'PageDown':
                const tagsSiblings = [
                    ...(this.getRootNode() as Document).querySelectorAll<Tags>(
                        'sp-tags'
                    ),
                ];
                if (tagsSiblings.length < 2) {
                    return;
                }
                event.preventDefault();
                const currentIndex = tagsSiblings.indexOf(this);
                const offset = code === 'PageUp' ? -1 : 1;
                let nextTagsIndex = currentIndex + offset;
                let nextTags = circularIndexedElement(
                    tagsSiblings,
                    nextTagsIndex
                );
                while (!nextTags.tags.length) {
                    nextTagsIndex += offset;
                    nextTags = circularIndexedElement(
                        tagsSiblings,
                        nextTagsIndex
                    );
                }
                nextTags.focus();
                return;
            default:
                return;
        }
        event.preventDefault();
        circularIndexedElement(this.tags, nextIndex).focus();
    };

    private handleFocusout = (): void => {
        const firstTagNonDisabled = this.tags.find((tag) => !tag.disabled);
        /* istanbul ignore else */
        if (firstTagNonDisabled) {
            firstTagNonDisabled.tabIndex = 0;
        }
        this.removeEventListener('keydown', this.handleKeydown);
        this.removeEventListener('focusout', this.handleFocusout);
    };

    protected render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    protected firstUpdated(): void {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'list');
        }
        if (!this.hasAttribute('aria-label')) {
            this.setAttribute('aria-label', 'Tags');
        }
    }
}
