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
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';

import avatarStyles from './avatar.css.js';

export type AvatarSize = 50 | 75 | 100 | 200 | 300 | 400 | 500 | 600 | 700;
const validSizes: AvatarSize[] = [50, 75, 100, 200, 300, 400, 500, 600, 700];
const defaultSize = validSizes[2];

/**
 * @element sp-avatar
 */
export class Avatar extends LikeAnchor(Focusable) {
    public static override get styles(): CSSResultArray {
        return [avatarStyles];
    }

    @query('#link')
    anchorElement!: HTMLAnchorElement;

    public override get focusElement(): HTMLElement {
        return this.anchorElement || this;
    }

    @property()
    public src = '';

    /**
     * When true, marks the avatar as decorative and hides it from screen readers.
     * The underlying img will have an empty alt attribute (alt="").
     */
    @property({ type: Boolean, reflect: true, attribute: 'is-decorative' })
    public isDecorative = false;

    @property({ type: Number, reflect: true })
    public get size(): AvatarSize {
        return this._size;
    }

    public set size(value: AvatarSize) {
        const size = value;
        const validSize = (
            validSizes.includes(size) ? size : defaultSize
        ) as AvatarSize;
        if (validSize) {
            this.setAttribute('size', `${validSize}`);
        }
        if (this._size === validSize) {
            return;
        }
        const oldSize = this._size;
        this._size = validSize;
        this.requestUpdate('size', oldSize);
    }

    private _size = defaultSize;

    protected override render(): TemplateResult {
        // Determine alt attribute value
        // Label takes precedence over isDecorative
        let altValue: string | undefined;
        let ariaHidden: 'true' | undefined;
        if (this.label) {
            altValue = this.label;
            // When label is provided, don't set aria-hidden even if isDecorative is true
            ariaHidden = undefined;
        } else if (this.isDecorative) {
            altValue = '';
            // If decorative and has href, don't hide from screen readers (link needs accessible text)
            // Only hide when decorative and NOT a link
            ariaHidden = this.href ? undefined : 'true';
        } else {
            // Default to empty string for accessibility, but warn in dev mode
            altValue = '';
            ariaHidden = undefined;
        }

        const avatar = html`
            <img
                class="image"
                alt=${altValue}
                aria-hidden=${ifDefined(ariaHidden)}
                src=${this.src}
            />
        `;
        if (this.href) {
            return this.renderAnchor({
                id: 'link',
                className: 'link',
                anchorContent: avatar,
            });
        }
        return avatar;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        if (!this.hasAttribute('size')) {
            this.setAttribute('size', `${this.size}`);
        }
        this.warnMissingAlt();
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('label') || changes.has('isDecorative')) {
            this.warnMissingAlt();
        }
    }

    private warnMissingAlt(): void {
        if (window.__swc?.DEBUG) {
            // Warn if neither label nor isDecorative is provided
            if (!this.label && !this.isDecorative) {
                window.__swc.warn(
                    this,
                    `<${this.localName}> needs either a \`label\` attribute or \`is-decorative\` attribute to be accessible.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/avatar/#accessibility',
                    {
                        type: 'accessibility',
                        issues: [
                            'Provide a `label` attribute with meaningful alternative text for the avatar image, or',
                            'Set `is-decorative` attribute to mark the avatar as decorative (hidden from screen readers).',
                        ],
                    }
                );
            }
            // Warn if decorative avatar is used as a link without a label
            else if (this.isDecorative && this.href && !this.label) {
                window.__swc.warn(
                    this,
                    `<${this.localName}> with \`is-decorative\` and \`href\` requires a \`label\` attribute for the link to be accessible.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/avatar/#accessibility',
                    {
                        type: 'accessibility',
                        issues: [
                            'Provide a `label` attribute to give the link an accessible name.',
                            'Decorative avatars should typically not be interactive links.',
                        ],
                    }
                );
            }
        }
    }
}
