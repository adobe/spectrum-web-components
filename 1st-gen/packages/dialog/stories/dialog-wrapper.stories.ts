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
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';

import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import { landscape } from './images.js';
import { isOverlayOpen } from '../../overlay/stories/index.js';
import '../../overlay/stories/index.js';
import type { DialogWrapper } from '@spectrum-web-components/dialog';

export default {
    title: 'Dialog Wrapper',
    component: 'sp-dialog-wrapper',
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

export const wrapperLabeledHero = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? false : true;
    return html`
        <style>
            sp-story-decorator {
                inset: 0;
                position: absolute;
                overflow: hidden;
            }
        </style>
        <sp-dialog-wrapper
            ?open=${open}
            hero=${landscape}
            hero-label="Hero Image Alt Text"
            dismissable
            headline="Wrapped Dialog w/ Hero Image"
            @close=${handleClose(args)}
            size="s"
        >
            Content of the dialog
        </sp-dialog-wrapper>
        <sp-button
            onClick="
                this.previousElementSibling.open = !this.previousElementSibling.open;
                if (this.previousElementSibling.open) {
                    this.previousElementSibling.focus();
                }
            "
            variant="primary"
        >
            Toggle Dialog
        </sp-button>
    `;
};

export const wrapperDismissable = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? false : true;
    return html`
        <sp-dialog-wrapper
            ?open=${open}
            .hero=${landscape}
            dismissable
            headline="Wrapped Dialog w/ Hero Image"
            @close=${handleClose(args)}
            size="s"
            tabindex="0"
        >
            Content of the dialog
        </sp-dialog-wrapper>
        <sp-button
            onClick="
                this.previousElementSibling.open = !this.previousElementSibling.open;
                if (this.previousElementSibling.open) {
                    this.previousElementSibling.focus();
                }
            "
            variant="primary"
        >
            Toggle Dialog
        </sp-button>
    `;
};

export const wrapperDismissableUnderlay = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? false : true;
    return html`
        <sp-dialog-wrapper
            ?open=${open}
            hero=${landscape}
            dismissable
            headline="Wrapped Dialog w/ Hero Image"
            underlay
            @close=${handleClose(args)}
            size="s"
        >
            Content of the dialog
        </sp-dialog-wrapper>
        <sp-button
            onClick="
                this.previousElementSibling.open = !this.previousElementSibling.open;
                if (this.previousElementSibling.open) {
                    this.previousElementSibling.focus();
                }
            "
            variant="primary"
        >
            Toggle Dialog
        </sp-button>
    `;
};

export const form = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? undefined : 'click';
    return html`
        <overlay-trigger
            type="modal"
            @close=${handleClose(args)}
            open=${ifDefined(open)}
        >
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
            <sp-dialog-wrapper
                id="form-fields"
                slot="click-content"
                headline="Add Delivery Address"
                underlay
                size="m"
                confirm-label="Verify Address"
                secondary-label="Add"
                cancel-label="Cancel"
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
                <div>
                    <sp-textfield id="street" side-aligned="end" autofocus>
                        Street:
                    </sp-textfield>
                    <sp-textfield id="city" side-aligned="end">
                        City:
                    </sp-textfield>
                    <sp-textfield id="state" side-aligned="end">
                        State:
                    </sp-textfield>
                    <sp-textfield id="zip" side-aligned="end">
                        Zip:
                    </sp-textfield>
                    <sp-textfield
                        id="instructions"
                        side-aligned="end"
                        multiline
                    >
                        Special instructions:
                        <sp-help-text slot="help-text">
                            For example, gate code or other information to help
                            the driver find you
                        </sp-help-text>
                    </sp-textfield>
                </div>
            </sp-dialog-wrapper>
        </overlay-trigger>
    `;
};

form.decorators = [isOverlayOpen];

export const longContent = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? undefined : 'click';
    return html`
        <overlay-trigger
            type="modal"
            @close=${handleClose(args)}
            open=${ifDefined(open)}
            triggered-by="click hover"
        >
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
            <sp-dialog-wrapper
                slot="click-content"
                headline="Dialog title"
                dismissable
                underlay
                size="s"
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
            </sp-dialog-wrapper>
        </overlay-trigger>
    `;
};

longContent.decorators = [isOverlayOpen];

export const longHeading = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? undefined : 'click';
    return html`
        <overlay-trigger
            type="modal"
            @close=${handleClose(args)}
            open=${ifDefined(open)}
        >
            <sp-dialog-wrapper
                slot="click-content"
                underlay
                headline="Dialog long long long long long long long long long long long long title"
                confirm-label="Keep Both"
                secondary-label="Replace"
                cancel-label="Cancel"
                footer="Content for footer"
                size="m"
            >
                Content of the dialog
            </sp-dialog-wrapper>
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
        </overlay-trigger>
    `;
};

longHeading.decorators = [isOverlayOpen];

export const wrapperDismissableUnderlayError = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? false : true;
    return html`
        <div>
            <sp-dialog-wrapper
                ?open=${open}
                hero=${landscape}
                dismissable
                error
                headline="Wrapped Dialog w/ Hero Image"
                underlay
                @close=${handleClose(args)}
                size="s"
            >
                Content of the dialog
            </sp-dialog-wrapper>
            <sp-button
                onClick="
                    this.previousElementSibling.open = !this.previousElementSibling.open;
                    if (this.previousElementSibling.open) {
                        this.previousElementSibling.focus();
                    }
                "
                variant="primary"
            >
                Toggle Dialog
            </sp-button>
        </div>
    `;
};

export const wrapperButtons = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? false : true;
    return html`
        <sp-dialog-wrapper
            ?open=${open}
            size="l"
            headline="Wrapped Dialog w/ Buttons"
            confirm-label="Keep Both"
            secondary-label="Replace"
            cancel-label="Cancel"
            footer="Content for footer"
            @close=${handleClose(args)}
            @confirm=${handleConfirm(args)}
            @secondary=${handleSecondary(args)}
            @cancel=${handleCancel(args)}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `;
};

export const wrapperButtonsUnderlay = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? false : true;
    return html`
        <sp-dialog-wrapper
            ?open=${open}
            underlay
            size="l"
            headline="Wrapped Dialog w/ Buttons"
            confirm-label="Keep Both"
            secondary-label="Replace"
            cancel-label="Cancel"
            footer="Content for footer"
            @close=${handleClose(args)}
            @confirm=${handleConfirm(args)}
            @secondary=${handleSecondary(args)}
            @cancel=${handleCancel(args)}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `;
};

export const wrapperFullscreen = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? false : true;
    return html`
        <sp-dialog-wrapper
            ?open=${open}
            headline="Wrapped Dialog - Fullscreen"
            mode="fullscreen"
            confirm-label="Keep Both"
            secondary-label="Replace"
            cancel-label="Cancel"
            @close=${handleClose(args)}
            @confirm=${handleConfirm(args)}
            @secondary=${handleSecondary(args)}
            @cancel=${handleCancel(args)}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `;
};

export const wrapperWithHeadline = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? false : true;
    return html`
        <sp-dialog-wrapper
            ?open=${open}
            headline="Headline for dialog"
            @close=${handleClose(args)}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `;
};

export const wrapperWithHeadlineNoDivider = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? false : true;
    return html`
        <sp-dialog-wrapper
            ?open=${open}
            headline="Headline for dialog"
            no-divider=${true}
            @close=${handleClose(args)}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `;
};

export const wrapperHeadlineVisibilityNone = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? false : true;
    return html`
        <sp-dialog-wrapper
            headline="Accessible headline"
            .headlineVisibility=${'none'}
            ?open=${open}
            @close=${handleClose(args)}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `;
};

export const tooltips = (
    args: StoryArgs = {},
    context: { viewMode?: string } = {}
): TemplateResult => {
    const open = context.viewMode === 'docs' ? undefined : 'click';
    return html`
        <overlay-trigger
            type="modal"
            @close=${handleClose(args)}
            open=${ifDefined(open)}
        >
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
            <sp-dialog-wrapper
                slot="click-content"
                headline="Dialog title"
                dismissable
                underlay
                size="s"
            >
                ${[1, 2, 3, 4].map(
                    (index) => html`
                        <overlay-trigger>
                            <sp-button slot="trigger">
                                Button with Tooltip ${index}
                            </sp-button>
                            <sp-tooltip slot="hover-content">
                                Tooltip ${index}
                            </sp-tooltip>
                        </overlay-trigger>
                    `
                )}
            </sp-dialog-wrapper>
        </overlay-trigger>
    `;
};

tooltips.decorators = [isOverlayOpen];

export const lazyHero = ({ src }: { src: string }): TemplateResult => {
    const handleOpened = (): void => {
        (document.querySelector('sp-dialog-wrapper') as DialogWrapper).hero =
            src;
    };
    return html`
        <overlay-trigger content="click" @sp-opened=${handleOpened}>
            <sp-button slot="trigger">Toggle Dialog</sp-button>
            <sp-dialog-wrapper
                slot="click-content"
                headline="Dialog title"
                confirm-label="Primary"
            >
                <p>Content of the dialog</p>
                <ol>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                </ol>
            </sp-dialog-wrapper>
        </overlay-trigger>
    `;
};

lazyHero.args = {
    src: 'https://dummyimage.com/800x400/000/fff',
};

lazyHero.swc_vrt = {
    skip: true,
};

lazyHero.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};
