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
import { html, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import {
    openOverlay,
    Overlay,
    OverlayContentTypes,
    OverlayTrigger,
    Placement,
    TriggerInteractions,
    VirtualTrigger,
} from '@spectrum-web-components/overlay';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import { DialogWrapper } from '@spectrum-web-components/dialog';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-open-in.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/radio/sp-radio.js';
import '@spectrum-web-components/radio/sp-radio-group.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';
import '../../../projects/story-decorator/src/types.js';

import './overlay-story-components.js';
import { render } from 'lit-html';
import { Popover } from '@spectrum-web-components/popover';
import { Button } from '@spectrum-web-components/button';
import { PopoverContent } from './overlay-story-components.js';

const storyStyles = html`
    <style>
        html,
        body,
        #root,
        #root-inner,
        sp-story-decorator {
            height: 100%;
            margin: 0;
        }

        sp-story-decorator::part(container) {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
        }

        overlay-trigger {
            flex: none;
        }

        #styled-div {
            background-color: var(--styled-div-background-color, blue);
            color: white;
            padding: 4px 10px;
            margin-bottom: 10px;
        }

        #inner-trigger {
            display: inline-block;
        }
    </style>
`;

export default {
    title: 'Overlay',
    argTypes: {
        offset: { control: 'number' },
        placement: {
            control: {
                type: 'inline-radio',
                options: [
                    'top',
                    'top-start',
                    'top-end',
                    'bottom',
                    'bottom-start',
                    'bottom-end',
                    'left',
                    'left-start',
                    'left-end',
                    'right',
                    'right-start',
                    'right-end',
                    'auto',
                    'auto-start',
                    'auto-end',
                    'none',
                ],
            },
        },
        type: {
            control: {
                type: 'inline-radio',
                options: ['modal', 'replace', 'inline'],
            },
        },
        colorStop: {
            control: {
                type: 'inline-radio',
                options: ['light', 'dark'],
            },
        },
    },
    args: {
        placement: 'bottom',
        offset: 0,
        colorStop: 'light',
    },
};

interface Properties {
    placement: Placement;
    offset: number;
    open?: OverlayContentTypes;
    type?: Extract<TriggerInteractions, 'inline' | 'modal' | 'replace'>;
}

const template = ({
    placement,
    offset,
    open,
    type,
}: Properties): TemplateResult => {
    return html`
        ${storyStyles}
        <overlay-trigger
            id="trigger"
            placement="${placement}"
            offset="${offset}"
            open=${ifDefined(open)}
            type=${ifDefined(type)}
        >
            <sp-button variant="primary" slot="trigger">Show Popover</sp-button>
            <sp-popover
                slot="click-content"
                placement="${placement}"
                tip
            >
                <sp-dialog no-divider>
                    <sp-slider
                        value="5"
                        step="0.5"
                        min="0"
                        max="20"
                        label="Awesomeness"
                    ></sp-slider>
                    <div id="styled-div">
                        The background of this div should be blue
                    </div>
                    <overlay-trigger id="inner-trigger" placement="bottom">
                        <sp-button slot="trigger">Press Me</sp-button>
                        <sp-popover
                            slot="click-content"
                            placement="bottom"
                            tip
                        >
                            <sp-dialog size="s" no-divider>
                                Another Popover
                            </sp-dialog>
                        </sp-popover>

                            <sp-tooltip
                                slot="hover-content"
                                delayed
                                tip="bottom"
                            >
                                Click to open another popover.
                            </sp-tooltip>
                        </overlay-trigger>
                    </div>
                </sp-dialog>
            </sp-popover>
            <sp-tooltip
                slot="hover-content"
                ?delayed=${open !== 'hover'}
                tip="bottom"
            >
                Click to open a popover.
            </sp-tooltip>
        </overlay-trigger>
    `;
};

const extraText = html`
    <p>This is some text.</p>
    <p>This is some text.</p>
    <p>
        This is a
        <a href="#anchor">link</a>
        .
    </p>
`;

function nextFrame(): Promise<void> {
    return new Promise((res) => requestAnimationFrame(() => res()));
}

export const Default = (args: Properties): TemplateResult => template(args);

export const accordion = (): TemplateResult => {
    return html`
        <overlay-trigger type="modal" placement="right">
            <sp-button variant="primary" slot="trigger">
                Open overlay w/ accordion
            </sp-button>
            <sp-popover
                slot="click-content"
                style="overflow-y: scroll;position: static;"
            >
                <sp-dialog size="s" no-divider>
                    <sp-accordion allow-multiple>
                        <sp-accordion-item label="Some things">
                            <p>
                                Thing
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                more things
                            </p>
                        </sp-accordion-item>
                        <sp-accordion-item label="Other things">
                            <p>
                                Thing
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                more things
                            </p>
                        </sp-accordion-item>
                        <sp-accordion-item label="More things">
                            <p>
                                Thing
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                more things
                            </p>
                        </sp-accordion-item>
                        <sp-accordion-item label="Additional things">
                            <p>
                                Thing
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                more things
                            </p>
                        </sp-accordion-item>
                    </sp-accordion>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;
};

accordion.swc_vrt = {
    skip: true,
};

export const clickAndHoverTargets = (): TemplateResult => {
    return html`
        <div>
            ${storyStyles}
            <style>
                .friendly-target {
                    padding: 4px;
                    margin: 6px;
                    border: 2px solid black;
                    border-radius: 6px;
                    cursor: default;
                }
            </style>
            <overlay-trigger placement="right">
                <div class="friendly-target" slot="trigger" tabindex="0">
                    Click me
                </div>
                <sp-tooltip slot="click-content" tip="right">
                    Ok, now hover the other trigger
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger placement="left">
                <div class="friendly-target" slot="trigger" tabindex="0">
                    Then hover me
                </div>
                <sp-tooltip slot="hover-content" tip="right">
                    Now click my trigger -- I should stay open, but the other
                    overlay should close
                </sp-tooltip>
            </overlay-trigger>
        </div>
    `;
};
clickAndHoverTargets.swc_vrt = {
    skip: true,
};

class ScrollForcer extends HTMLElement {
    ready!: (value: boolean | PromiseLike<boolean>) => void;

    constructor() {
        super();
        this.readyPromise = new Promise((res) => {
            this.ready = res;
        });
        this.setup();
    }

    async setup(): Promise<void> {
        await nextFrame();
        await nextFrame();

        this.previousElementSibling?.addEventListener(
            'sp-opened',
            this.doScroll
        );
        await nextFrame();
        await nextFrame();
        (this.previousElementSibling?.lastElementChild as OverlayTrigger).open =
            'click';
    }

    doScroll = async (): Promise<void> => {
        this.previousElementSibling?.addEventListener(
            'sp-opened',
            this.doScroll
        );
        await nextFrame();
        await nextFrame();
        await nextFrame();
        await nextFrame();

        if (document.scrollingElement) {
            document.scrollingElement.scrollTop = 100;
        }

        await nextFrame();
        await nextFrame();
        this.ready(true);
    };

    private readyPromise: Promise<boolean> = Promise.resolve(false);

    get updateComplete(): Promise<boolean> {
        return this.readyPromise;
    }
}

customElements.define('scroll-forcer', ScrollForcer);

export const clickContentClosedOnScroll = (
    args: Properties
): TemplateResult => html`
    <div style="margin: 50vh 0 100vh;">
        ${template({
            ...args,
        })}
    </div>
`;
clickContentClosedOnScroll.decorators = [
    (story: () => TemplateResult): TemplateResult => html`
        <style>
            html,
            body,
            #root,
            #root-inner,
            sp-story-decorator {
                height: auto !important;
            }
        </style>
        ${story()}
        <scroll-forcer></scroll-forcer>
    `,
];

class ComplexModalReady extends HTMLElement {
    ready!: (value: boolean | PromiseLike<boolean>) => void;

    constructor() {
        super();
        this.readyPromise = new Promise((res) => {
            this.ready = res;
            this.setup();
        });
    }

    async setup(): Promise<void> {
        await nextFrame();

        const overlay = document.querySelector(
            `overlay-trigger`
        ) as OverlayTrigger;
        overlay.addEventListener('sp-opened', this.handleTriggerOpened);
    }

    handleTriggerOpened = async (): Promise<void> => {
        await nextFrame();

        const picker = document.querySelector('#test-picker') as Picker;
        picker.addEventListener('sp-opened', this.handlePickerOpen);
        picker.open = true;
    };

    handlePickerOpen = async (): Promise<void> => {
        const picker = document.querySelector('#test-picker') as Picker;
        const actions = [nextFrame, picker.updateComplete];

        await Promise.all(actions);

        this.ready(true);
    };

    private readyPromise: Promise<boolean> = Promise.resolve(false);

    get updateComplete(): Promise<boolean> {
        return this.readyPromise;
    }
}

customElements.define('complex-modal-ready', ComplexModalReady);

const complexModalDecorator = (story: () => TemplateResult): TemplateResult => {
    return html`
        ${story()}
        <complex-modal-ready></complex-modal-ready>
    `;
};

export const complexModal = (): TemplateResult => {
    return html`
        <style>
            body {
                --swc-margin-test: 10px;
                margin: var(--swc-margin-test);
            }
            sp-story-decorator::part(container) {
                min-height: calc(100vh - (2 * var(--swc-margin-test)));
                padding: 0;
                display: grid;
                place-content: center;
            }
            active-overlay > * {
                --spectrum-global-animation-duration-100: 0ms;
                --spectrum-global-animation-duration-200: 0ms;
                --spectrum-global-animation-duration-300: 0ms;
                --spectrum-global-animation-duration-400: 0ms;
                --spectrum-global-animation-duration-500: 0ms;
                --spectrum-global-animation-duration-600: 0ms;
                --spectrum-global-animation-duration-700: 0ms;
                --spectrum-global-animation-duration-800: 0ms;
                --spectrum-global-animation-duration-900: 0ms;
                --spectrum-global-animation-duration-1000: 0ms;
                --spectrum-global-animation-duration-2000: 0ms;
                --spectrum-global-animation-duration-4000: 0ms;
                --spectrum-animation-duration-0: 0ms;
                --spectrum-animation-duration-100: 0ms;
                --spectrum-animation-duration-200: 0ms;
                --spectrum-animation-duration-300: 0ms;
                --spectrum-animation-duration-400: 0ms;
                --spectrum-animation-duration-500: 0ms;
                --spectrum-animation-duration-600: 0ms;
                --spectrum-animation-duration-700: 0ms;
                --spectrum-animation-duration-800: 0ms;
                --spectrum-animation-duration-900: 0ms;
                --spectrum-animation-duration-1000: 0ms;
                --spectrum-animation-duration-2000: 0ms;
                --spectrum-animation-duration-4000: 0ms;
                --spectrum-coachmark-animation-indicator-ring-duration: 0ms;
                --swc-test-duration: 1ms;
            }
        </style>
        <overlay-trigger type="modal" placement="none" open="click">
            <sp-dialog-wrapper
                slot="click-content"
                headline="Dialog title"
                dismissable
                underlay
                footer="Content for footer"
            >
                <sp-field-label for="test-picker">
                    Selection type:
                </sp-field-label>
                <sp-picker id="test-picker">
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save selection</sp-menu-item>
                    <sp-menu-item disabled>Make work path</sp-menu-item>
                </sp-picker>
            </sp-dialog-wrapper>
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
        </overlay-trigger>
    `;
};

complexModal.decorators = [complexModalDecorator];

export const customizedClickContent = (
    args: Properties
): TemplateResult => html`
    <style>
        overlay-trigger {
            --styled-div-background-color: var(
                --spectrum-semantic-cta-background-color-default
            );
            --spectrum-button-m-accent-fill-texticon-background-color: rebeccapurple;
        }
    </style>
    ${template({
        ...args,
        open: 'click',
    })}
`;

export const deep = (): TemplateResult => html`
    <overlay-trigger>
        <sp-button variant="primary" slot="trigger">
            Open popover 1 with buttons + selfmanaged Tooltips
        </sp-button>
        <sp-popover slot="click-content" direction="bottom" tip>
            <sp-dialog size="s" no-divider>
                <sp-action-button>
                    <sp-tooltip self-managed placement="bottom" offset="0">
                        My Tooltip 1
                    </sp-tooltip>
                    A
                </sp-action-button>
                <sp-action-button>
                    <sp-tooltip self-managed placement="bottom" offset="0">
                        My Tooltip 1
                    </sp-tooltip>
                    B
                </sp-action-button>
            </sp-dialog>
        </sp-popover>
    </overlay-trigger>

    <overlay-trigger>
        <sp-button variant="primary" slot="trigger">
            Open popover 2 with buttons without ToolTips
        </sp-button>
        <sp-popover slot="click-content" direction="bottom" tip>
            <sp-dialog size="s" no-divider>
                <sp-action-button>X</sp-action-button>
                <sp-action-button>Y</sp-action-button>
            </sp-dialog>
        </sp-popover>
    </overlay-trigger>
`;
deep.swc_vrt = {
    skip: true,
};

export const deepChildTooltip = (): TemplateResult => html`
    <overlay-trigger>
        <sp-button variant="primary" slot="trigger">Open popover</sp-button>
        <sp-popover slot="click-content" direction="bottom" tip>
            <sp-dialog no-divider>
                <p>Let us open another overlay here</p>
                <overlay-trigger>
                    <sp-button variant="primary" slot="trigger">
                        Open sub popover
                    </sp-button>
                    <sp-popover slot="click-content" direction="bottom" tip>
                        <sp-dialog no-divider>
                            <p>
                                Render an action button with tooltips. Clicking
                                the action button shouldn't close everything
                            </p>
                            <sp-action-button>
                                Button with self-managed tooltip
                                <sp-tooltip self-managed placement="top">
                                    Deep Child ToolTip
                                </sp-tooltip>
                            </sp-action-button>
                            <sp-action-button>Just a button</sp-action-button>
                        </sp-dialog>
                    </sp-popover>
                </overlay-trigger>
            </sp-dialog>
        </sp-popover>
    </overlay-trigger>
`;

export const deepNesting = (): TemplateResult => {
    const color = window.__swc_hack_knobs__.defaultColor;
    const outter = color === 'light' ? 'dark' : 'light';
    return html`
        ${storyStyles}
        <sp-theme
            color=${outter}
            theme=${window.__swc_hack_knobs__.defaultThemeVariant}
            scale=${window.__swc_hack_knobs__.defaultScale}
            dir=${window.__swc_hack_knobs__.defaultDirection}
        >
            <sp-theme
                color=${color}
                theme=${window.__swc_hack_knobs__.defaultThemeVariant}
                scale=${window.__swc_hack_knobs__.defaultScale}
                dir=${window.__swc_hack_knobs__.defaultDirection}
            >
                <recursive-popover
                    tabindex=""
                    style="
                        background-color: var(--spectrum-global-color-gray-100);
                        color: var(--spectrum-global-color-gray-800);
                        padding: var(--spectrum-global-dimension-size-225);
                    "
                ></recursive-popover>
            </sp-theme>
        </sp-theme>
    `;
};

class DefinedOverlayReady extends HTMLElement {
    ready!: (value: boolean | PromiseLike<boolean>) => void;

    connectedCallback(): void {
        if (!!this.ready) return;

        this.readyPromise = new Promise((res) => {
            this.ready = res;
            this.setup();
        });
    }

    overlay!: OverlayTrigger;
    popover!: PopoverContent;

    async setup(): Promise<void> {
        await nextFrame();
        await nextFrame();

        this.overlay = document.querySelector(
            `overlay-trigger`
        ) as OverlayTrigger;
        const button = document.querySelector(
            `[slot="trigger"]`
        ) as HTMLButtonElement;
        this.overlay.addEventListener('sp-opened', this.handleTriggerOpened);
        await nextFrame();
        await nextFrame();
        button.click();
    }

    handleTriggerOpened = async (): Promise<void> => {
        this.overlay.removeEventListener('sp-opened', this.handleTriggerOpened);
        await nextFrame();
        await nextFrame();
        await nextFrame();
        await nextFrame();

        this.popover = document.querySelector(
            'popover-content'
        ) as PopoverContent;
        if (!this.popover) {
            return;
        }
        this.popover.addEventListener('sp-opened', this.handlePopoverOpen);
        await nextFrame();
        await nextFrame();
        this.popover.button.click();
    };

    handlePopoverOpen = async (): Promise<void> => {
        await nextFrame();

        this.ready(true);
    };

    disconnectedCallback(): void {
        this.overlay.removeEventListener('sp-opened', this.handleTriggerOpened);
        this.popover.removeEventListener('sp-opened', this.handlePopoverOpen);
    }

    private readyPromise: Promise<boolean> = Promise.resolve(false);

    get updateComplete(): Promise<boolean> {
        return this.readyPromise;
    }
}

customElements.define('defined-overlay-ready', DefinedOverlayReady);

const definedOverlayDecorator = (
    story: () => TemplateResult
): TemplateResult => {
    return html`
        ${story()}
        <defined-overlay-ready></defined-overlay-ready>
    `;
};

export const definedOverlayElement = (): TemplateResult => {
    return html`
        <overlay-trigger placement="bottom" type="modal">
            <sp-button variant="primary" slot="trigger">Open popover</sp-button>
            <sp-popover slot="click-content" direction="bottom">
                <sp-dialog no-divider>
                    <popover-content></popover-content>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;
};

definedOverlayElement.decorators = [definedOverlayDecorator];

export const detachedElement = (): TemplateResult => {
    let overlay: Overlay | undefined;
    const openDetachedOverlayContent = async ({
        target,
    }: {
        target: HTMLElement;
    }): Promise<void> => {
        if (overlay) {
            overlay.open = false;
            overlay = undefined;
            return;
        }
        const div = document.createElement('div');
        (div as HTMLDivElement & { open: boolean }).open = false;
        div.textContent = 'This div is overlaid';
        div.setAttribute(
            'style',
            `
            background-color: var(--spectrum-global-color-gray-50);
            color: var(--spectrum-global-color-gray-800);
            border: 1px solid;
            padding: 2em;
        `
        );
        overlay = await Overlay.open(div, {
            type: 'auto',
            trigger: target,
            receivesFocus: 'auto',
            placement: 'bottom',
            offset: 0,
        });
        overlay.addEventListener('sp-closed', () => {
            overlay = undefined;
        });
        target.insertAdjacentElement('afterend', overlay);
    };
    requestAnimationFrame(() => {
        openDetachedOverlayContent({
            target: document.querySelector(
                '#detached-content-trigger'
            ) as HTMLElement,
        });
    });
    return html`
        <style>
            sp-overlay div:not([placement]) {
                visibility: hidden;
            }
        </style>
        <sp-action-button
            id="detached-content-trigger"
            @click=${openDetachedOverlayContent}
        >
            <sp-icon-open-in
                slot="icon"
                label="Open in overlay"
            ></sp-icon-open-in>
        </sp-action-button>
    `;
};

export const edges = (): TemplateResult => {
    return html`
        <style>
            .demo {
                position: absolute;
            }
            .top-left {
                top: 0;
                left: 0;
            }
            .top-right {
                top: 0;
                right: 0;
            }
            .bottom-right {
                bottom: 0;
                right: 0;
            }
            .bottom-left {
                bottom: 0;
                left: 0;
            }
        </style>
        <overlay-trigger class="demo top-left" placement="bottom">
            <sp-button slot="trigger">
                Top/
                <br />
                Left
            </sp-button>
            <sp-tooltip slot="hover-content" delayed tip="bottom">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger class="demo top-right" placement="bottom">
            <sp-button slot="trigger">
                Top/
                <br />
                Right
            </sp-button>
            <sp-tooltip slot="hover-content" delayed tip="bottom">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger class="demo bottom-left" placement="top">
            <sp-button slot="trigger">
                Bottom/
                <br />
                Left
            </sp-button>
            <sp-tooltip slot="hover-content" delayed tip="top">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger placement="top" class="demo bottom-right">
            <sp-button slot="trigger">
                Bottom/
                <br />
                Right
            </sp-button>
            <sp-tooltip slot="hover-content" delayed tip="top">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
    `;
};

export const inline = (): TemplateResult => {
    const closeEvent = new Event('close', { bubbles: true, composed: true });
    return html`
        <overlay-trigger type="inline">
            <sp-button slot="trigger">Open</sp-button>
            <sp-popover slot="click-content">
                <sp-button
                    @click=${(event: Event & { target: HTMLElement }): void => {
                        event.target.dispatchEvent(closeEvent);
                    }}
                >
                    Close
                </sp-button>
            </sp-popover>
        </overlay-trigger>
        ${extraText}
    `;
};

export const longpress = (): TemplateResult => {
    return html`
        <overlay-trigger placement="right-start">
            <sp-action-button slot="trigger" hold-affordance>
                <sp-icon-magnify slot="icon"></sp-icon-magnify>
            </sp-action-button>
            <sp-tooltip slot="hover-content">Search real hard...</sp-tooltip>
            <sp-popover slot="longpress-content" tip>
                <sp-action-group
                    @change=${(event: Event & { target: HTMLElement }) =>
                        event.target.dispatchEvent(
                            new Event('close', { bubbles: true })
                        )}
                    selects="single"
                    vertical
                    style="margin: calc(var(--spectrum-actiongroup-button-gap-y,var(--spectrum-global-dimension-size-100)) / 2);"
                >
                    <sp-action-button>
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </overlay-trigger>
    `;
};

export const modalLoose = (): TemplateResult => {
    const closeEvent = new Event('close', { bubbles: true, composed: true });
    return html`
        <overlay-trigger type="modal" placement="none">
            <sp-button slot="trigger">Open</sp-button>
            <sp-dialog
                size="s"
                dismissable
                slot="click-content"
                @closed=${(event: Event & { target: DialogWrapper }) =>
                    event.target.dispatchEvent(closeEvent)}
            >
                <h2 slot="heading">Loose Dialog</h2>
                <p>
                    The
                    <code>sp-dialog</code>
                    element is not "meant" to be a modal alone. In that way it
                    does not manage its own
                    <code>open</code>
                    attribute or outline when it should have
                    <code>pointer-events: auto</code>
                    . It's a part of this test suite to prove that content in
                    this way can be used in an
                    <code>overlay-trigger</code>
                    element.
                </p>
            </sp-dialog>
        </overlay-trigger>
        ${extraText}
    `;
};

export const modalManaged = (): TemplateResult => {
    const closeEvent = new Event('close', { bubbles: true, composed: true });
    return html`
        <overlay-trigger type="modal" placement="none">
            <sp-button slot="trigger">Open</sp-button>
            <sp-dialog-wrapper
                underlay
                slot="click-content"
                headline="Wrapped Dialog w/ Hero Image"
                confirm-label="Keep Both"
                secondary-label="Replace"
                cancel-label="Cancel"
                footer="Content for footer"
                @confirm=${(event: Event & { target: DialogWrapper }): void => {
                    event.target.dispatchEvent(closeEvent);
                }}
                @secondary=${(
                    event: Event & { target: DialogWrapper }
                ): void => {
                    event.target.dispatchEvent(closeEvent);
                }}
                @cancel=${(event: Event & { target: DialogWrapper }): void => {
                    event.target.dispatchEvent(closeEvent);
                }}
            >
                <p>
                    The
                    <code>sp-dialog-wrapper</code>
                    element has been prepared for use in an
                    <code>overlay-trigger</code>
                    element by it's combination of modal, underlay, etc. styles
                    and features.
                </p>
            </sp-dialog-wrapper>
        </overlay-trigger>
        ${extraText}
    `;
};

export const modalWithinNonModal = (): TemplateResult => {
    return html`
        <overlay-trigger type="inline">
            <sp-button variant="primary" slot="trigger">
                Open inline overlay
            </sp-button>
            <sp-popover slot="click-content">
                <sp-dialog size="s" no-divider>
                    <overlay-trigger type="modal">
                        <sp-button variant="primary" slot="trigger">
                            Open modal overlay
                        </sp-button>
                        <sp-popover slot="click-content">
                            <sp-dialog size="s" no-divider>
                                Modal overlay
                            </sp-dialog>
                        </sp-popover>
                    </overlay-trigger>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;
};

export const noCloseOnResize = (args: Properties): TemplateResult => html`
    <style>
        sp-button:hover {
            border: 10px solid;
            width: 100px;
        }
    </style>
    ${template({
        ...args,
        open: 'click',
    })}
`;
noCloseOnResize.swc_vrt = {
    skip: true,
};

export const openClickContent = (args: Properties): TemplateResult =>
    template({
        ...args,
        open: 'click',
    });

export const openHoverContent = (args: Properties): TemplateResult =>
    template({
        ...args,
        open: 'hover',
    });

export const replace = (): TemplateResult => {
    const closeEvent = new Event('close', { bubbles: true, composed: true });
    return html`
        <overlay-trigger type="replace">
            <sp-button slot="trigger">Open</sp-button>
            <sp-popover slot="click-content">
                <sp-button
                    @click=${(event: Event & { target: HTMLElement }): void => {
                        event.target.dispatchEvent(closeEvent);
                    }}
                >
                    Close
                </sp-button>
            </sp-popover>
        </overlay-trigger>
        ${extraText}
    `;
};

export const sideHoverDraggable = (): TemplateResult => {
    return html`
        ${storyStyles}
        <style>
            sp-tooltip {
                transition: none;
            }
        </style>
        <overlay-drag>
            <overlay-trigger placement="right">
                <overlay-target-icon slot="trigger"></overlay-target-icon>
                <sp-tooltip slot="hover-content" delayed tip="right">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus egestas sed enim sed condimentum. Nunc facilisis
                    scelerisque massa sed luctus. Orci varius natoque penatibus
                    et magnis dis parturient montes, nascetur ridiculus mus.
                    Suspendisse sagittis sodales purus vitae ultricies. Integer
                    at dui sem. Sed quam tortor, ornare in nisi et, rhoncus
                    lacinia mauris. Sed vel rutrum mauris, ac pellentesque nibh.
                    Sed feugiat semper libero, sit amet vehicula orci fermentum
                    id. Vivamus imperdiet egestas luctus. Mauris tincidunt
                    malesuada ante, faucibus viverra nunc blandit a. Fusce et
                    nisl nisi. Aenean dictum quam id mollis faucibus. Nulla a
                    ultricies dui. In hac habitasse platea dictumst. Curabitur
                    gravida lobortis vestibulum.
                </sp-tooltip>
            </overlay-trigger>
        </overlay-drag>
    `;
};

export const superComplexModal = (): TemplateResult => {
    return html`
        <overlay-trigger type="modal" placement="none">
            <sp-button slot="trigger" variant="accent">Toggle Dialog</sp-button>
            <sp-popover slot="click-content">
                <sp-dialog size="s">
                    <overlay-trigger>
                        <sp-button slot="trigger" variant="primary">
                            Toggle Dialog
                        </sp-button>
                        <sp-popover slot="click-content">
                            <sp-dialog size="s" no-divider>
                                <overlay-trigger type="modal">
                                    <sp-button
                                        slot="trigger"
                                        variant="secondary"
                                    >
                                        Toggle Dialog
                                    </sp-button>
                                    <sp-popover slot="click-content">
                                        <sp-dialog size="s" no-divider>
                                            <p>
                                                When you get this deep, this
                                                ActiveOverlay should be the only
                                                one in [slot="open"].
                                            </p>
                                            <p>
                                                All of the rest of the
                                                ActiveOverlay elements should
                                                have had their [slot] attribute
                                                removed.
                                            </p>
                                            <p>
                                                Closing this ActiveOverlay
                                                should replace them...
                                            </p>
                                        </sp-dialog>
                                    </sp-popover>
                                </overlay-trigger>
                            </sp-dialog>
                        </sp-popover>
                    </overlay-trigger>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;
};

export const updated = (): TemplateResult => {
    return html`
        ${storyStyles}
        <style>
            sp-tooltip {
                transition: none;
            }
        </style>
        <overlay-drag>
            <overlay-trigger class="demo top-left" placement="bottom">
                <overlay-target-icon
                    slot="trigger"
                    style="translate(400px, 300px)"
                ></overlay-target-icon>
                <sp-tooltip slot="hover-content" delayed tip="bottom">
                    Click to open popover
                </sp-tooltip>
                <sp-popover slot="click-content" position="bottom" tip>
                    <sp-dialog size="s" no-divider>
                        <sp-slider
                            value="5"
                            step="0.5"
                            min="0"
                            max="20"
                            label="Awesomeness"
                        ></sp-slider>
                        <div id="styled-div">
                            The background of this div should be blue
                        </div>
                        <overlay-trigger id="inner-trigger" placement="bottom">
                            <sp-button slot="trigger">Press Me</sp-button>
                            <sp-popover
                                slot="click-content"
                                placement="bottom"
                                tip
                            >
                                <sp-dialog size="s" no-divider>
                                    Another Popover
                                </sp-dialog>
                            </sp-popover>

                            <sp-tooltip
                                slot="hover-content"
                                delayed
                                tip="bottom"
                            >
                                Click to open another popover.
                            </sp-tooltip>
                        </overlay-trigger>
                    </sp-dialog>
                </sp-popover>
            </overlay-trigger>
        </overlay-drag>
    `;
};

export const updating = (): TemplateResult => {
    const update = (): void => {
        const button = document.querySelector('[slot="trigger"]') as Button;
        button.style.left = `${Math.floor(Math.random() * 200)}px`;
        button.style.top = `${Math.floor(Math.random() * 200)}px`;
        button.style.position = 'fixed';
    };
    return html`
        <overlay-trigger type="click">
            <sp-button variant="primary" slot="trigger">
                Open inline overlay
            </sp-button>
            <sp-popover slot="click-content">
                <sp-dialog size="s" no-divider>
                    <sp-button variant="primary" @click=${update}>
                        Update trigger location.
                    </sp-button>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;
};

updating.swc_vrt = {
    skip: true,
};

class StartEndContextmenu extends HTMLElement {
    override shadowRoot!: ShadowRoot;
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    align-items: stretch;
                }
                div {
                    width: 50%;
                    height: 100%;
                }
            </style>
            <div id="start"></div>
            <div id="end"></div>
        `;
    }
}

customElements.define('start-end-contextmenu', StartEndContextmenu);

export const virtualElementV1 = (args: Properties): TemplateResult => {
    const contextMenuTemplate = (kind = ''): TemplateResult => html`
        <sp-popover
            style="width:300px;"
            @click=${(event: PointerEvent) => {
                if (
                    (event.target as HTMLElement).localName === 'sp-menu-item'
                ) {
                    event.target?.dispatchEvent(
                        new Event('close', { bubbles: true })
                    );
                }
            }}
        >
            <sp-menu>
                <sp-menu-group>
                    <span slot="header">Menu source: ${kind}</span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save selection</sp-menu-item>
                    <sp-menu-item disabled>Make work path</sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `;
    const handleContextmenu = async (event: PointerEvent): Promise<void> => {
        event.preventDefault();
        event.stopPropagation();

        const source = event.composedPath()[0] as HTMLDivElement;
        const { id } = source;
        const trigger = event.target as HTMLElement;
        const virtualTrigger = new VirtualTrigger(event.clientX, event.clientY);
        const fragment = document.createDocumentFragment();
        render(contextMenuTemplate(id), fragment);
        const popover = fragment.querySelector('sp-popover') as Popover;

        openOverlay(trigger, 'click', popover, {
            placement: args.placement,
            receivesFocus: 'auto',
            virtualTrigger,
            offset: 0,
            notImmediatelyClosable: true,
        });
    };
    return html`
        <style>
            .app-root {
                position: absolute;
                inset: 0;
            }
        </style>
        <start-end-contextmenu
            class="app-root"
            @contextmenu=${{
                capture: true,
                handleEvent: handleContextmenu,
            }}
        ></start-end-contextmenu>
    `;
};

virtualElementV1.args = {
    placement: 'right-start' as Placement,
};

export const virtualElement = (args: Properties): TemplateResult => {
    const contextMenuTemplate = (kind = ''): TemplateResult => html`
        <sp-popover
            style="width:300px;"
            @click=${(event: PointerEvent) => {
                if (
                    (event.target as HTMLElement).localName === 'sp-menu-item'
                ) {
                    event.target?.dispatchEvent(
                        new Event('close', { bubbles: true })
                    );
                }
            }}
        >
            <sp-menu>
                <sp-menu-group>
                    <span slot="header">Menu source: ${kind}</span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save selection</sp-menu-item>
                    <sp-menu-item disabled>Make work path</sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `;
    const handleContextmenu = async (event: PointerEvent): Promise<void> => {
        event.preventDefault();
        event.stopPropagation();

        const source = event.composedPath()[0] as HTMLDivElement;
        const { id } = source;
        const trigger = event.target as HTMLElement;
        const virtualTrigger = new VirtualTrigger(event.clientX, event.clientY);
        const fragment = document.createDocumentFragment();
        render(contextMenuTemplate(id), fragment);
        const popover = fragment.querySelector('sp-popover') as Popover;

        const overlay = await openOverlay(popover, {
            trigger: virtualTrigger,
            placement: args.placement,
            offset: 0,
            notImmediatelyClosable: true,
            type: 'auto',
        });
        trigger.insertAdjacentElement('afterend', overlay);
    };
    return html`
        <style>
            .app-root {
                position: absolute;
                inset: 0;
            }
        </style>
        <start-end-contextmenu
            class="app-root"
            @contextmenu=${{
                capture: true,
                handleEvent: handleContextmenu,
            }}
        ></start-end-contextmenu>
    `;
};

virtualElement.args = {
    placement: 'right-start' as Placement,
};
