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

import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';

import '@spectrum-web-components/alert-dialog/sp-alert-dialog.js';
import '@spectrum-web-components/alert-dialog/sp-alert-dialog-base.js';

import { overlayTriggerDecorator } from '../../dialog/stories/index.js';

export default {
    title: 'Alert Dialog',
    component: 'sp-alert-dialog',
    argTypes: {
        onClose: { action: 'close' },
        onConfirm: { action: 'confirm' },
        onSecondary: { action: 'secondary' },
        onCancel: { action: 'cancel' },
    },
};

type StoryArgs = {
    onClose?: (event: Event) => void;
    onConfirm?: (event: Event) => void;
    onSecondary?: (event: Event) => void;
    onCancel?: (event: Event) => void;
};

const handleClose =
    ({ onClose }: StoryArgs) =>
    (event: Event) => {
        if (onClose) onClose(event);
    };

const handleConfirm =
    ({ onConfirm }: StoryArgs) =>
    (event: Event) => {
        if (onConfirm) onConfirm(event);
    };

const handleSecondary =
    ({ onSecondary }: StoryArgs) =>
    (event: Event) => {
        if (onSecondary) onSecondary(event);
    };

const handleCancel =
    ({ onCancel }: StoryArgs) =>
    (event: Event) => {
        if (onCancel) onCancel(event);
    };

export const confirmation = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? undefined : 'click';
    return html`
        <overlay-trigger
            type="modal"
            placement="none"
            @close=${handleClose(args)}
            open=${ifDefined(open)}
        >
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
            <sp-alert-dialog
                slot="click-content"
                variant="confirmation"
                underlay
                ?open=${open}
                headline="Enable Smart Filters?"
                confirm-label="Enable"
                cancel-label="Cancel"
                @close=${handleClose(args)}
                @confirm=${({ target }: Event & { target: HTMLElement }) => {
                    target.dispatchEvent(
                        new Event('close', { bubbles: true, composed: true })
                    );
                    handleConfirm(args);
                }}
                @cancel=${({ target }: Event & { target: HTMLElement }) => {
                    target.dispatchEvent(
                        new Event('close', { bubbles: true, composed: true })
                    );
                    handleCancel(args);
                }}
            >
                Smart filters are nondestructive and will preserve your original
                images.
            </sp-alert-dialog>
        </overlay-trigger>
    `;
};

export const information = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? undefined : 'click';
    return html`
        <overlay-trigger
            type="modal"
            placement="none"
            @close=${handleClose(args)}
            open=${ifDefined(open)}
        >
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
            <sp-alert-dialog
                slot="click-content"
                variant="information"
                underlay
                ?open=${open}
                headline="Connect to wifi"
                confirm-label="Continue"
                cancel-label="Cancel"
                @close=${handleClose(args)}
                @confirm=${({ target }: Event & { target: HTMLElement }) => {
                    target.dispatchEvent(
                        new Event('close', { bubbles: true, composed: true })
                    );
                    handleConfirm(args);
                }}
                @cancel=${({ target }: Event & { target: HTMLElement }) => {
                    target.dispatchEvent(
                        new Event('close', { bubbles: true, composed: true })
                    );
                    handleCancel(args);
                }}
            >
                Please connect to wifi to sync your projects or go to Settings
                to change your prefernces.
            </sp-alert-dialog>
        </overlay-trigger>
    `;
};

export const warning = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? undefined : 'click';
    return html`
        <overlay-trigger
            type="modal"
            placement="none"
            @close=${handleClose(args)}
            open=${ifDefined(open)}
        >
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
            <sp-alert-dialog
                slot="click-content"
                variant="warning"
                underlay
                ?open=${open}
                headline="Unverified format"
                confirm-label="Continue"
                cancel-label="Cancel"
                @close=${handleClose(args)}
                @confirm=${({ target }: Event & { target: HTMLElement }) => {
                    target.dispatchEvent(
                        new Event('close', { bubbles: true, composed: true })
                    );
                    handleConfirm(args);
                }}
                @cancel=${({ target }: Event & { target: HTMLElement }) => {
                    target.dispatchEvent(
                        new Event('close', { bubbles: true, composed: true })
                    );
                    handleCancel(args);
                }}
            >
                This format has not been verified and may not be viewable for
                some users. Do you want to continue publishing?
            </sp-alert-dialog>
        </overlay-trigger>
    `;
};

export const error = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? undefined : 'click';
    return html`
        <overlay-trigger
            type="modal"
            placement="none"
            @close=${handleClose(args)}
            open=${ifDefined(open)}
        >
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
            <sp-alert-dialog
                slot="click-content"
                variant="error"
                underlay
                ?open=${open}
                headline="Unable to share"
                confirm-label="Continue"
                @close=${handleClose(args)}
                @confirm=${({ target }: Event & { target: HTMLElement }) => {
                    target.dispatchEvent(
                        new Event('close', { bubbles: true, composed: true })
                    );
                    handleConfirm(args);
                }}
            >
                An error occured while sharing your project. Please verify the
                email address and try again.
            </sp-alert-dialog>
        </overlay-trigger>
    `;
};

export const destructive = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? undefined : 'click';
    return html`
        <overlay-trigger
            type="modal"
            placement="none"
            @close=${handleClose(args)}
            open=${ifDefined(open)}
        >
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
            <sp-alert-dialog
                slot="click-content"
                variant="destructive"
                underlay
                ?open=${open}
                headline="Delete 3 documents?"
                confirm-label="Delete"
                cancel-label="Cancel"
                @close=${handleClose(args)}
                @confirm=${({ target }: Event & { target: HTMLElement }) => {
                    target.dispatchEvent(
                        new Event('close', { bubbles: true, composed: true })
                    );
                    handleConfirm(args);
                }}
                @cancel=${({ target }: Event & { target: HTMLElement }) => {
                    target.dispatchEvent(
                        new Event('close', { bubbles: true, composed: true })
                    );
                    handleCancel(args);
                }}
            >
                Are you sure you want to delete the 3 selected documents?
            </sp-alert-dialog>
        </overlay-trigger>
    `;
};

export const secondary = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? undefined : 'click';
    return html`
        <overlay-trigger
            type="modal"
            placement="none"
            @close=${handleClose(args)}
            open=${ifDefined(open)}
        >
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
            <sp-alert-dialog
                slot="click-content"
                variant="secondary"
                underlay
                ?open=${open}
                headline="Rate this app"
                confirm-label="Rate now"
                cancel-label="Remind me later"
                secondary-label="No, thanks"
                @close=${handleClose(args)}
                @confirm=${({ target }: Event & { target: HTMLElement }) => {
                    target.dispatchEvent(
                        new Event('close', { bubbles: true, composed: true })
                    );
                    handleConfirm(args);
                }}
                @secondary=${({ target }: Event & { target: HTMLElement }) => {
                    target.dispatchEvent(
                        new Event('close', { bubbles: true, composed: true })
                    );
                    handleSecondary(args);
                }}
                @cancel=${({ target }: Event & { target: HTMLElement }) => {
                    target.dispatchEvent(
                        new Event('close', { bubbles: true, composed: true })
                    );
                    handleCancel(args);
                }}
            >
                If you enjoy our app, would you mind taking a moment to rate it?
            </sp-alert-dialog>
        </overlay-trigger>
    `;
};

export const scroll = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? undefined : 'click';
    return html`
        <overlay-trigger
            type="modal"
            placement="none"
            @close=${handleClose(args)}
            open=${ifDefined(open)}
        >
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
            <sp-alert-dialog
                slot="click-content"
                variant="scroll"
                underlay
                ?open=${open}
                headline="Lorem Ipsum"
                confirm-label="Continue"
                cancel-label="Cancel"
                @close=${handleClose(args)}
                @confirm=${({ target }: Event & { target: HTMLElement }) => {
                    target.dispatchEvent(
                        new Event('close', {
                            bubbles: true,
                            composed: true,
                        })
                    );
                    handleConfirm(args);
                }}
                @cancel=${({ target }: Event & { target: HTMLElement }) => {
                    target.dispatchEvent(
                        new Event('close', {
                            bubbles: true,
                            composed: true,
                        })
                    );
                    handleCancel(args);
                }}
            >
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Sed ac dolor sit amet purus malesuada congue. Donec quis
                    nibh at felis congue commodo. Ut enim ad minima veniam, quis
                    nostrum exercitationem ullam corporis suscipit laboriosam,
                    nisi ut aliquid ex ea commodi consequatur? Sed ac dolor sit
                    amet purus malesuada congue. Nam libero tempore, cum soluta
                    nobis est eligendi optio cumque nihil impedit quo minus id
                    quod maxime placeat facere possimus, omnis voluptas
                    assumenda est, omnis dolor repellendus. Nullam sit amet
                    magna in magna gravida vehicula. Itaque earum rerum hic
                    tenetur a sapiente delectus, ut aut reiciendis voluptatibus
                    maiores alias consequatur aut perferendis doloribus
                    asperiores repellat. Neque porro quisquam est, qui dolorem
                    ipsum quia dolor sit amet, consectetur, adipisci velit, sed
                    quia non numquam eius modi tempora incidunt ut labore et
                    dolore magnam aliquam quaerat voluptatem. Phasellus faucibus
                    molestie nisl. Vestibulum fermentum tortor id mi. Integer
                    rutrum, orci vestibulum ullamcorper ultricies, lacus quam
                    ultricies odio, vitae placerat pede sem sit amet enim.
                    Maecenas sollicitudin. Nullam rhoncus aliquam metus.
                </p>
                <p>
                    Curabitur ligula sapien, pulvinar a vestibulum quis,
                    facilisis vel sapien. Fusce nibh. Proin pede metus,
                    vulputate nec, fermentum fringilla, vehicula vitae, justo.
                    Aenean placerat. Aliquam erat volutpat. Et harum quidem
                    rerum facilis est et expedita distinctio. Fusce nibh.
                    Temporibus autem quibusdam et aut officiis debitis aut rerum
                    necessitatibus saepe eveniet ut et voluptates repudiandae
                    sint et molestiae non recusandae. Vestibulum erat nulla,
                    ullamcorper nec, rutrum non, nonummy ac, erat. Etiam posuere
                    lacus quis dolor. Mauris elementum mauris vitae tortor.
                    Nulla turpis magna, cursus sit amet, suscipit a, interdum
                    id, felis. Nam libero tempore, cum soluta nobis est eligendi
                    optio cumque nihil impedit quo minus id quod maxime placeat
                    facere possimus, omnis voluptas assumenda est, omnis dolor
                    repellendus. Nulla accumsan, elit sit amet varius semper,
                    nulla mauris mollis quam, tempor suscipit diam nulla vel
                    leo. Pellentesque sapien.
                </p>
                <p>
                    Curabitur vitae diam non enim vestibulum interdum. Sed elit
                    dui, pellentesque a, faucibus vel, interdum nec, diam.
                    Praesent vitae arcu tempor neque lacinia pretium. Ut tempus
                    purus at lorem. Phasellus rhoncus. Temporibus autem
                    quibusdam et aut officiis debitis aut rerum necessitatibus
                    saepe eveniet ut et voluptates repudiandae sint et molestiae
                    non recusandae. Duis ante orci, molestie vitae vehicula
                    venenatis, tincidunt ac pede. Integer vulputate sem a nibh
                    rutrum consequat. Aenean placerat. Cum sociis natoque
                    penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Sed vel lectus. Donec odio tempus molestie,
                    porttitor ut, iaculis quis, sem. Class aptent taciti
                    sociosqu ad litora torquent per conubia nostra, per inceptos
                    hymenaeos. Integer in sapien. Nullam dapibus fermentum
                    ipsum.
                </p>
                <p>
                    Integer vulputate sem a nibh rutrum consequat. Class aptent
                    taciti sociosqu ad litora torquent per conubia nostra, per
                    inceptos hymenaeos. Duis bibendum, lectus ut viverra
                    rhoncus, dolor nunc faucibus libero, eget facilisis enim
                    ipsum id lacus. Aliquam erat volutpat. Aenean id metus id
                    velit ullamcorper pulvinar. Morbi scelerisque luctus velit.
                    Aliquam erat volutpat. Temporibus autem quibusdam et aut
                    officiis debitis aut rerum necessitatibus saepe eveniet ut
                    et voluptates repudiandae sint et molestiae non recusandae.
                    Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu,
                    orci. Suspendisse sagittis ultrices augue. Nullam justo
                    enim, consectetuer nec, ullamcorper ac, vestibulum in, elit.
                    Praesent vitae arcu tempor neque lacinia pretium. Nullam
                    faucibus mi quis velit. Maecenas aliquet accumsan leo. Morbi
                    scelerisque luctus velit. Aliquam ornare wisi eu metus.
                </p>
                <p>
                    Sed elit dui, pellentesque a, faucibus vel, interdum nec,
                    diam. Praesent vitae arcu tempor neque lacinia pretium.
                    Etiam dictum tincidunt diam. Et harum quidem rerum facilis
                    est et expedita distinctio. Duis ante orci, molestie vitae
                    vehicula venenatis, tincidunt ac pede. Integer lacinia.
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                    Mauris tincidunt sem sed arcu. Praesent in mauris eu tortor
                    porttitor accumsan. Aenean id metus id velit ullamcorper
                    pulvinar. Donec iaculis gravida nulla. Duis bibendum, lectus
                    ut viverra rhoncus, dolor nunc faucibus libero, eget
                    facilisis enim ipsum id lacus. Nulla quis diam. Quisque
                    porta. Integer rutrum, orci vestibulum ullamcorper
                    ultricies, lacus quam ultricies odio, vitae placerat pede
                    sem sit amet enim. Nam sed tellus id magna elementum
                    tincidunt. In enim a arcu imperdiet malesuada.
                </p>
            </sp-alert-dialog>
        </overlay-trigger>
    `;
};

confirmation.decorators = [overlayTriggerDecorator];
error.decorators = [overlayTriggerDecorator];
information.decorators = [overlayTriggerDecorator];
warning.decorators = [overlayTriggerDecorator];
destructive.decorators = [overlayTriggerDecorator];
secondary.decorators = [overlayTriggerDecorator];
scroll.decorators = [overlayTriggerDecorator];
