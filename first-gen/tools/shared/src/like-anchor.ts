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
    html,
    ReactiveElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

type RenderAnchorOptions = {
    id: string;
    className?: string;
    ariaHidden?: boolean;
    anchorContent?: TemplateResult | TemplateResult[];
    labelledby?: string;
    tabindex?: -1 | 0;
};

export interface LikeAnchorInterface {
    download?: string;
    label?: string;
    href?: string;
    rel?: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    renderAnchor(options: RenderAnchorOptions): TemplateResult;
}

export function LikeAnchor<T extends Constructor<ReactiveElement>>(
    constructor: T
): T & Constructor<LikeAnchorInterface> {
    class LikeAnchorElement extends constructor {
        /**
         * Causes the browser to treat the linked URL as a download.
         */
        @property()
        public download?: string;

        /**
         * An accessible label that describes the component.
         * It will be applied to aria-label, but not visually rendered.
         */
        @property()
        public label?: string;

        /**
         * The URL that the hyperlink points to.
         */
        @property()
        public href?: string;

        /**
         * Where to display the linked URL, as the name for a browsing context (a tab, window, or &lt;iframe&gt;).
         */
        @property()
        public target?: '_blank' | '_parent' | '_self' | '_top';

        /**
         * How much of the referrer to send when following the link.
         */
        @property()
        public referrerpolicy?:
            | 'no-referrer'
            | 'no-referrer-when-downgrade'
            | 'origin'
            | 'origin-when-cross-origin'
            | 'same-origin'
            | 'strict-origin'
            | 'strict-origin-when-cross-origin'
            | 'unsafe-url';

        /**
         * The relationship of the linked URL as space-separated link types.
         */
        @property()
        public rel?: string;

        public renderAnchor({
            id,
            className,
            ariaHidden,
            labelledby,
            tabindex,
            // prettier-ignore
            anchorContent = html`<slot></slot>`,
        }: RenderAnchorOptions): TemplateResult {
            // prettier-ignore
            return html
                `<a
                    id=${id}
                    class=${ifDefined(className)}
                    href=${ifDefined(this.href)}
                    download=${ifDefined(this.download)}
                    target=${ifDefined(this.target)}
                    aria-label=${ifDefined(this.label)}
                    aria-labelledby=${ifDefined(labelledby)}
                    aria-hidden=${ifDefined(ariaHidden ? 'true' : undefined)}
                    tabindex=${ifDefined(tabindex)}
                    referrerpolicy=${ifDefined(this.referrerpolicy)}
                    rel=${ifDefined(this.rel)}
                >${anchorContent}</a>`;
        }
    }
    return LikeAnchorElement;
}
