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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
    CSSResultArray,
    html,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';

import {
    property,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import StyleObserver from 'style-observer';

import iconStyles from './icon.css.js';

export class IconBase extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [iconStyles];
    }

    @state()
    public spectrumVersion = 1;

    @property({ reflect: true })
    public label = '';

    @property({ reflect: true })
    public size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

    private systemObserver?: StyleObserver;

    public override connectedCallback(): void {
        super.connectedCallback();

        this.systemObserver = new StyleObserver(
            (records: StyleObserver.Record[]) => {
                for (const record of records) {
                    const systemValue = record.value.trim();
                    // eslint-disable-next-line no-console
                    console.log('Icon detected system change:', systemValue);

                    if (systemValue === 'spectrum-two') {
                        this.spectrumVersion = 2;
                    } else {
                        this.spectrumVersion = 1;
                    }
                    this.requestUpdate();
                }
            },
            {
                properties: ['--system'],
                targets: [this],
            }
        );

        // Ensure the observer picks up the initial value
        const systemValue = getComputedStyle(this)
            .getPropertyValue('--system')
            .trim();
        this.spectrumVersion = systemValue === 'spectrum-two' ? 2 : 1;
    }

    public override disconnectedCallback(): void {
        super.disconnectedCallback();
        this.systemObserver?.unobserve();
    }

    protected override update(changes: PropertyValues): void {
        if (changes.has('label')) {
            if (this.label) {
                this.removeAttribute('aria-hidden');
            } else {
                this.setAttribute('aria-hidden', 'true');
            }
        }
        super.update(changes);
    }

    protected override render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }
}
