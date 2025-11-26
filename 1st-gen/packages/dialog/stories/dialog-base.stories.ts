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

import { html, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import '@spectrum-web-components/dialog/sp-dialog-base.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import { trigger } from '@spectrum-web-components/overlay';
import { alertDestructive } from './dialog.stories.js';
import { portrait } from './images.js';
import {
    disabledButtonWithOverlayDecorator,
    withOverlayDecorator,
} from './index.js';

export default {
    title: 'Dialog Base',
    component: 'sp-dialog-base',
};

export const slotted = (): TemplateResult => html`
    <sp-dialog-base
        underlay
        @click=${(event: Event) => {
            if ((event.target as HTMLElement).localName === 'sp-button') {
                (event.target as HTMLElement).dispatchEvent(
                    new Event('close', { bubbles: true, composed: true })
                );
            }
        }}
    >
        ${alertDestructive()}
    </sp-dialog-base>
`;
slotted.decorators = [withOverlayDecorator];

export const disabledButton = (): TemplateResult => {
    return html`
        <sp-dialog-base
            underlay
            @click=${(event: Event) => {
                if ((event.target as HTMLElement).localName === 'sp-button') {
                    (event.target as HTMLElement).dispatchEvent(
                        new Event('close', { bubbles: true, composed: true })
                    );
                }
            }}
            @sp-opened=${({ target }: Event & { target: HTMLElement }) => {
                let count = 5;
                const timer = setInterval(() => {
                    count -= 1;
                    if (!count) {
                        (
                            document.querySelector(
                                '#changing-header'
                            ) as HTMLElement
                        ).textContent =
                            'The button in this dialog is now enabled';
                        (
                            document.querySelector(
                                '#changing-button'
                            ) as HTMLButtonElement
                        ).disabled = false;
                        clearInterval(timer);
                        target.dispatchEvent(new Event('countdown-complete'));
                    }
                    (
                        document.querySelector('.time') as HTMLElement
                    ).textContent = count.toString();
                }, 1000);
            }}
            @close=${() => {
                (
                    document.querySelector('#changing-header') as HTMLElement
                ).textContent = 'The button in this dialog is disabled';
                (
                    document.querySelector(
                        '#changing-button'
                    ) as HTMLButtonElement
                ).disabled = true;
                (document.querySelector('.time') as HTMLElement).textContent =
                    '5';
            }}
        >
            <sp-dialog size="s">
                <h2 slot="heading" id="changing-header">
                    The button in this dialog is disabled
                </h2>
                <p>
                    After about
                    <span class="time">5</span>
                    seconds the button with be enabled.
                </p>
                <sp-button disabled slot="button" id="changing-button">
                    Ok
                </sp-button>
            </sp-dialog>
        </sp-dialog-base>
    `;
};

disabledButton.decorators = [disabledButtonWithOverlayDecorator];

export const notAgain = (): TemplateResult => html`
    <sp-dialog-base
        underlay
        @click=${(event: Event) => {
            if ((event.target as HTMLElement).localName === 'sp-button') {
                (event.target as HTMLElement).dispatchEvent(
                    new Event('close', { bubbles: true, composed: true })
                );
            }
        }}
    >
        <sp-dialog size="s">
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
            <p>
                The click events for the "OK" button are bound to the story not
                to the components in specific.
            </p>
            <sp-button variant="secondary" treatment="fill" slot="button">
                Ok
            </sp-button>
            <sp-checkbox slot="footer">Don't show me this again</sp-checkbox>
        </sp-dialog>
    </sp-dialog-base>
`;
notAgain.decorators = [withOverlayDecorator];

export const moreCustom = (): TemplateResult => html`
    <sp-dialog-base
        underlay
        @click=${(event: Event) => {
            if ((event.target as HTMLElement).localName === 'sp-button') {
                (event.target as HTMLElement).dispatchEvent(
                    new Event('close', { bubbles: true, composed: true })
                );
            }
        }}
    >
        <div style="display: flex;">
            <div
                style="
                display: grid;
                place-content: center;
                grid-template-columns: calc(100% - 40px);
                grid-template-rows: calc(100% - 40px);
            "
            >
                <img
                    src=${portrait}
                    alt=""
                    style="
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        object-placement: center;
                    "
                />
            </div>
            <sp-dialog size="s">
                <h2 slot="heading">Look at that image</h2>
                <p>
                    Its position has been customized beyond the language of
                    Spectrum. Be careful with all this power. There's no
                    "mobile" default for delivering content like this.
                </p>
                <sp-button variant="accent" treatment="outline" slot="button">
                    Ok
                </sp-button>
            </sp-dialog>
        </div>
    </sp-dialog-base>
`;
moreCustom.decorators = [withOverlayDecorator];

export const fullyCustom = (): TemplateResult => html`
    <sp-dialog-base
        underlay
        @click=${(event: Event) => {
            if ((event.target as HTMLElement).localName === 'button') {
                (event.target as HTMLElement).dispatchEvent(
                    new Event('close', { bubbles: true, composed: true })
                );
            }
        }}
    >
        <div id="fully-custom-dialog">
            <style>
                #fully-custom-dialog {
                    margin: 1em;
                }
            </style>
            <h2>Custom headline</h2>
            <p>
                The click events for the "Done" button are bound to the story
                not to the components in specific.
            </p>
            <p>
                This is a demonstration of what is possible with
                &lt;sp-dialog-base&gt;, only, and should not be seen as an
                endorsement for fully custom dialog UIs.
            </p>
            <p>Fully open content area, for whatever DOM you would like.</p>
            <button>Done</button>
        </div>
    </sp-dialog-base>
`;
fullyCustom.decorators = [withOverlayDecorator];

export const lazyLoaded = (): TemplateResult => {
    const template = (): TemplateResult => html`
        <sp-dialog-base
            underlay
            @click=${(event: Event) => {
                if ((event.target as HTMLElement).localName === 'sp-button') {
                    (event.target as HTMLElement).dispatchEvent(
                        new Event('close', { bubbles: true, composed: true })
                    );
                }
            }}
        >
            <sp-dialog size="m">
                <h2 slot="heading">This is a heading</h2>
                <p>
                    The click on the "OK" button should close the overlay with
                    the correct animation (duration).
                </p>
                <sp-button variant="secondary" treatment="fill" slot="button">
                    Ok
                </sp-button>
            </sp-dialog>
        </sp-dialog-base>
    `;

    return html`
        <sp-button
            variant="primary"
            ${trigger(template, {
                open: false,
                triggerInteraction: 'click',
            })}
        >
            Open dialog
        </sp-button>
    `;
};

lazyLoaded.swc_vrt = {
    skip: true,
};
