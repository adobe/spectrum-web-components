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
    CSSResultArray,
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';

import linkStyles from './link.css.js';

/**
 * @element sp-link
 */
export class Link extends LikeAnchor(Focusable) {
    public static override get styles(): CSSResultArray {
        return [linkStyles];
    }

    @query('#anchor')
    anchorElement!: HTMLAnchorElement;

    @property({ type: String, reflect: true })
    public variant: 'secondary' | undefined;

    /**
     * @deprecated Use `staticColor` instead.
     */
    @property({ type: String, reflect: true })
    public static: 'black' | 'white' | undefined;

    @property({ reflect: true, attribute: 'static-color' })
    public staticColor?: 'black' | 'white';

    /**
     * Uses quiet styles or not
     */
    @property({ type: Boolean, reflect: true, attribute: 'quiet' })
    public quiet = false;

    public override get focusElement(): HTMLElement {
        return this.anchorElement;
    }

    protected override render(): TemplateResult {
        return this.renderAnchor({ id: 'anchor' });
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (
            changes.has('static') &&
            (this.static !== undefined || changes.get('static') !== undefined)
        ) {
            this.staticColor = this.static;
            if (window.__swc.DEBUG) {
                window.__swc.warn(
                    this,
                    `The "static" attribute of <${this.localName}> has been deprecated. Use "static-color" with the same values instead. "static" will be removed in a future release.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/link/api/',
                    { level: 'deprecation' }
                );
            }
        }
    }
}
