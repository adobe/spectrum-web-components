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
    TemplateResult,
    html,
    property,
    SpectrumElement,
    PropertyValues,
} from '@spectrum-web-components/base';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import circleLoaderStyles from './circle-loader.css.js';

export class CircleLoader extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [circleLoaderStyles];
    }

    @property({ type: Boolean, reflect: true })
    public indeterminate = false;

    @property({ type: Boolean, reflect: true, attribute: 'over-background' })
    public overBackground = false;

    @property({ type: Number })
    public progress = 0;

    @property({ type: String, reflect: true })
    public size: '' | 'small' | 'large' = '';

    private makeRotation(rotation: number): string | undefined {
        return this.indeterminate
            ? undefined
            : `transform: rotate(${rotation}deg);`;
    }

    protected render(): TemplateResult {
        const styles = [
            this.makeRotation(-180 + (180 / 50) * Math.min(this.progress, 50)),
            this.makeRotation(
                -180 + (180 / 50) * Math.max(this.progress - 50, 0)
            ),
        ];
        const masks = ['Mask1', 'Mask2'];
        return html`
            <div class="track"></div>
            <div class="fills">
                ${masks.map(
                    (mask, index) => html`
                        <div class="fill${mask}">
                            <div
                                class="fillSub${mask}"
                                style=${ifDefined(styles[index])}
                            >
                                <div class="fill"></div>
                            </div>
                        </div>
                    `
                )}
            </div>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'progressbar');
        }
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (!this.indeterminate && changes.has('progress')) {
            this.setAttribute('aria-valuenow', '' + this.progress);
        } else if (this.hasAttribute('aria-valuenow')) {
            this.removeAttribute('aria-valuenow');
        }
    }
}
