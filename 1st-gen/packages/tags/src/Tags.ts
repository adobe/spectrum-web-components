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
    CSSResultArray,
    html,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { queryAssignedNodes } from '@spectrum-web-components/base/src/decorators.js';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared/src/focus-visible.js';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';

import { Tag } from './Tag.js';

import styles from './tags.css.js';

/**
 * @element sp-tags
 *
 * @slot - Tag elements to manage as a group
 */
export class Tags extends FocusVisiblePolyfillMixin(SpectrumElement) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @queryAssignedNodes()
    public defaultNodes!: Node[];

    public get tags(): Tag[] {
        return this.defaultNodes.filter(
            (node) => (node as HTMLElement) instanceof Tag
        ) as Tag[];
    }

    rovingTabindexController = new RovingTabindexController<Tag>(this, {
        focusInIndex: (elements: Tag[]) => {
            return elements.findIndex((el) => {
                return !el.disabled && el.deletable;
            });
        },
        elements: () => this.tags,
        isFocusableElement: (el: Tag) => !el.disabled && el.deletable,
    });

    constructor() {
        super();
        this.addEventListener('focusin', this.handleFocusin);
    }

    public override focus(): void {
        this.rovingTabindexController.focus();
    }

    private handleFocusin = (): void => {
        this.addEventListener('focusout', this.handleFocusout);
        this.addEventListener('keydown', this.handleKeydown);
    };

    private handleKeydown = (event: KeyboardEvent): void => {
        const { code } = event;
        if (code !== 'PageUp' && code !== 'PageDown') return;

        const circularIndexedElement = <T extends HTMLElement>(
            list: T[],
            index: number
        ): T => list[(list.length + index) % list.length];
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
        let nextTags = circularIndexedElement(tagsSiblings, nextTagsIndex);
        while (!nextTags.tags.length) {
            nextTagsIndex += offset;
            nextTags = circularIndexedElement(tagsSiblings, nextTagsIndex);
        }
        nextTags.focus();
    };

    private handleFocusout = (): void => {
        this.removeEventListener('keydown', this.handleKeydown);
        this.removeEventListener('focusout', this.handleFocusout);
    };

    private handleSlotchange(): void {
        this.rovingTabindexController.clearElementCache();
    }

    protected override render(): TemplateResult {
        return html`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `;
    }

    protected override firstUpdated(): void {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'list');
        }
        if (!this.hasAttribute('aria-label')) {
            this.setAttribute('aria-label', 'Tags');
        }
    }
}
