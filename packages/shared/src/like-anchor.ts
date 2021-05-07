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
    UpdatingElement,
    property,
    TemplateResult,
    html,
    ifDefined,
} from '@spectrum-web-components/base';

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
};

export interface LikeAnchorInterface {
    download?: string;
    label?: string;
    href?: string;
    rel?: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    renderAnchor(options: RenderAnchorOptions): TemplateResult;
}

export function LikeAnchor<T extends Constructor<UpdatingElement>>(
    constructor: T
): T & Constructor<LikeAnchorInterface> {
    class LikeAnchorElement extends constructor {
        @property({ reflect: true })
        public download?: string;

        @property()
        public label?: string;

        @property({ reflect: true })
        public href?: string;

        @property({ reflect: true })
        public target?: '_blank' | '_parent' | '_self' | '_top';

        @property({ reflect: true })
        public rel?: string;

        public renderAnchor({
            id,
            className,
            ariaHidden,
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
                    aria-hidden=${ifDefined(ariaHidden ? 'true' : undefined)}
                    rel=${ifDefined(this.rel)}
                >${anchorContent}</a>`;
        }
    }
    return LikeAnchorElement;
}
