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
    html,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import {
    ifDefined,
    when,
} from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/coachmark/sp-coachmark.js';
import '@spectrum-web-components/button/sp-button.js';

import styles from './coachmark-popover-content.css.js';

/**
 * @element sp-coachmark-popover-content
 */
export class CoachmarkPopoverContent extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property()
    heading?: string;

    @property()
    source?: string;

    @property({ type: String })
    step?: string;

    @property({ type: String })
    content!: string;

    @property({ type: String, attribute: 'primary-cta' })
    primaryCTA?: string;

    @property({ type: String, attribute: 'secondary-cta' })
    secondaryCTA?: string;

    close(): void {
        this.dispatchEvent(
            new Event('close', {
                bubbles: true,
                cancelable: true,
                composed: true,
            })
        );
    }

    private handlePrimaryCTA(): void {
        this.dispatchEvent(
            new Event('primary', {
                bubbles: true,
                cancelable: true,
                composed: true,
            })
        );
        this.close();
    }

    private handleSecondaryCTA(): void {
        this.dispatchEvent(
            new Event('secondary', {
                bubbles: true,
                cancelable: true,
                composed: true,
            })
        );
        this.close();
    }

    protected override render(): TemplateResult {
        return html`
            ${when(
                this.source,
                () =>
                    html`
                        <img
                            src=${ifDefined(this.source)}
                            id="image"
                            alt=${ifDefined(this.heading)}
                        />
                    `
            )}

            <div id="header">
                <div id="title">${this.heading}</div>
                ${when(
                    this.step,
                    () => html`
                        <div id="step">${this.step}</div>
                    `
                )}
            </div>
            <div id="content">${this.content}</div>
            <div id="footer">
                ${when(
                    this.secondaryCTA,
                    () => html`
                        <sp-button
                            size="m"
                            treatment="outline"
                            variant="secondary"
                            @click=${this.handleSecondaryCTA}
                        >
                            ${this.secondaryCTA}
                        </sp-button>
                    `
                )}
                ${when(
                    this.primaryCTA,
                    () => html`
                        <sp-button
                            size="m"
                            treatment="outline"
                            variant="primary"
                            @click=${this.handlePrimaryCTA}
                        >
                            ${this.primaryCTA}
                        </sp-button>
                    `
                )}
            </div>
        `;
    }
}
