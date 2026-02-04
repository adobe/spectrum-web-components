/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { html, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { Button } from '@adobe/swc/button';

import '@adobe/swc/button';
import '@adobe/swc/progress-circle';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } = getStorybookHelpers('swc-button');

argTypes.variant = {
    ...argTypes.variant,
    control: { type: 'select' },
    options: Button.VARIANTS,
};

argTypes.treatment = {
    ...argTypes.treatment,
    control: { type: 'inline-radio' },
    options: Button.TREATMENTS,
};

argTypes.staticColor = {
    ...argTypes['static-color'],
    control: { type: 'select' },
    options: [undefined, ...Button.STATIC_COLORS],
};

argTypes.size = {
    ...argTypes.size,
    control: { type: 'select' },
    options: Button.VALID_SIZES,
};

argTypes.type = {
    ...argTypes.type,
    control: { type: 'select' },
    options: ['button', 'submit', 'reset'],
};

args['default-slot'] = 'Edit';
args.size = 'm';
args.variant = 'accent';
args.treatment = 'fill';

/**
 * Buttons allow users to perform an action or to navigate to another page. They have multiple styles for various needs, and are ideal for calling attention to where a user needs to do something in order to move forward in a flow.
 *
 * There are four available variants that are used for different levels of emphasis and different types of actions. By default, a button uses the fill style with a solid background. The primary and secondary variants also have an outline option.
 */
const meta: Meta = {
    title: 'Button',
    component: 'swc-button',
    args,
    argTypes,
    render: (args) => template(args),
    parameters: {
        actions: {
            handles: events,
        },
    },
    tags: ['migrated'],
};

export default meta;

// ───────────────
//    STORIES
// ───────────────

type ButtonSize = typeof Button.prototype.size;

export const Default: Story = {
    args: {
        size: 'm',
    },
};

/**
 * Buttons come in four different sizes: small, medium, large, and extra large. The medium size is the default and most frequently used option. Use the other sizes sparingly; they should be used to create a hierarchy of importance within the page.
 */
export const Sizing: Story = {
    render: () =>
        CONTAINER([
            ...Button.VALID_SIZES.map(
                (size) => html`
                    <swc-button size=${size as ButtonSize}>
                        ${sizeMap(size)}
                    </swc-button>
                `
            ),
            html`<div style="width: 100%; height: 16px;"></div>`,
            ...Button.VALID_SIZES.map(
                (size) => html`
                    <swc-button size=${size as ButtonSize}>
                        <svg
                            slot="icon"
                            viewBox="0 0 36 36"
                            style="width: 18px; height: 18px;"
                        >
                            <path
                                d="M33.567 8.2L13.678 28.1l-11.3-11.3a1.935 1.935 0 0 0-2.739 2.739l12.695 12.7a1.935 1.935 0 0 0 2.738 0L36.306 10.936A1.935 1.935 0 0 0 33.567 8.2z"
                            ></path>
                        </svg>
                        ${sizeMap(size)}
                    </swc-button>
                `
            ),
        ]),
    tags: ['!dev'],
};

/**
 * The accent button communicates strong emphasis and is reserved for encouraging critical actions. In general, only use the emphasized option for the most important action on the page.
 */
export const Accent: Story = {
    render: () =>
        CONTAINER([
            html`<swc-button variant="accent">Edit</swc-button>`,
            html`<swc-button variant="accent" disabled>Edit</swc-button>`,
            html`<swc-button variant="accent">
                <svg
                    slot="icon"
                    viewBox="0 0 36 36"
                    style="width: 18px; height: 18px;"
                >
                    <path
                        d="M33.567 8.2L13.678 28.1l-11.3-11.3a1.935 1.935 0 0 0-2.739 2.739l12.695 12.7a1.935 1.935 0 0 0 2.738 0L36.306 10.936A1.935 1.935 0 0 0 33.567 8.2z"
                    ></path>
                </svg>
                Edit
            </swc-button>`,
            html`<swc-button variant="accent">
                <svg
                    slot="icon"
                    viewBox="0 0 36 36"
                    style="width: 18px; height: 18px;"
                >
                    <path
                        d="M33.567 8.2L13.678 28.1l-11.3-11.3a1.935 1.935 0 0 0-2.739 2.739l12.695 12.7a1.935 1.935 0 0 0 2.738 0L36.306 10.936A1.935 1.935 0 0 0 33.567 8.2z"
                    ></path>
                </svg>
            </swc-button>`,
        ]),
    tags: ['!dev'],
};

/**
 * The primary button is for medium emphasis. Use it in place of an accent button when the action requires less prominence, or if there are multiple primary actions of the same importance in the same view. Both the fill (default) and outline styles are demonstrated in this example.
 */
export const Primary: Story = {
    render: () => html`
        <div
            style=${styleMap({
                display: 'flex',
                'flex-direction': 'column',
                gap: 'var(--swc-spacing-400)',
                'align-items': 'center',
            })}
        >
            <div
                style=${styleMap({
                    display: 'flex',
                    gap: 'var(--swc-spacing-200)',
                })}
            >
                <swc-button variant="primary" treatment="fill">
                    Fill
                </swc-button>
                <swc-button variant="primary" treatment="fill" disabled>
                    Fill
                </swc-button>
            </div>
            <div
                style=${styleMap({
                    display: 'flex',
                    gap: 'var(--swc-spacing-200)',
                })}
            >
                <swc-button variant="primary" treatment="outline">
                    Outline
                </swc-button>
                <swc-button variant="primary" treatment="outline" disabled>
                    Outline
                </swc-button>
            </div>
        </div>
    `,
    tags: ['!dev'],
};

/**
 * The secondary button is for low emphasis. It's paired with other button types to surface less prominent actions, and should never be the only button in a group. Both the fill (default) and outline styles are demonstrated in this example.
 */
export const Secondary: Story = {
    render: () => html`
        <div
            style=${styleMap({
                display: 'flex',
                'flex-direction': 'column',
                gap: 'var(--swc-spacing-400)',
                'align-items': 'center',
            })}
        >
            <div
                style=${styleMap({
                    display: 'flex',
                    gap: 'var(--swc-spacing-200)',
                })}
            >
                <swc-button variant="secondary" treatment="fill">
                    Fill
                </swc-button>
                <swc-button variant="secondary" treatment="fill" disabled>
                    Fill
                </swc-button>
            </div>
            <div
                style=${styleMap({
                    display: 'flex',
                    gap: 'var(--swc-spacing-200)',
                })}
            >
                <swc-button variant="secondary" treatment="outline">
                    Outline
                </swc-button>
                <swc-button variant="secondary" treatment="outline" disabled>
                    Outline
                </swc-button>
            </div>
        </div>
    `,
    tags: ['!dev'],
};

/**
 * The negative button is for emphasizing actions that can be destructive or have negative consequences if taken. Use it sparingly.
 */
export const Negative: Story = {
    render: () =>
        CONTAINER([
            html`<swc-button variant="negative">Delete</swc-button>`,
            html`<swc-button variant="negative" disabled>Delete</swc-button>`,
            html`<swc-button variant="negative">
                <svg
                    slot="icon"
                    viewBox="0 0 36 36"
                    style="width: 18px; height: 18px;"
                >
                    <path
                        d="M33.567 8.2L13.678 28.1l-11.3-11.3a1.935 1.935 0 0 0-2.739 2.739l12.695 12.7a1.935 1.935 0 0 0 2.738 0L36.306 10.936A1.935 1.935 0 0 0 33.567 8.2z"
                    ></path>
                </svg>
                Delete
            </swc-button>`,
            html`<swc-button variant="negative">
                <svg
                    slot="icon"
                    viewBox="0 0 36 36"
                    style="width: 18px; height: 18px;"
                >
                    <path
                        d="M33.567 8.2L13.678 28.1l-11.3-11.3a1.935 1.935 0 0 0-2.739 2.739l12.695 12.7a1.935 1.935 0 0 0 2.738 0L36.306 10.936A1.935 1.935 0 0 0 33.567 8.2z"
                    ></path>
                </svg>
            </swc-button>`,
        ]),
    tags: ['!dev'],
};

/**
 * When a button needs to be placed on top of a dark color background or a visual, use the static white options. Static color buttons do not change shades or values depending upon the color theme.
 */
export const StaticWhitePrimary: Story = {
    render: () => html`
        <div
            style=${styleMap({
                display: 'flex',
                'flex-direction': 'column',
                gap: 'var(--swc-spacing-400)',
                'align-items': 'center',
                'background-color': 'var(--swc-gray-900)',
                padding: 'var(--swc-spacing-400)',
                'border-radius': 'var(--swc-spacing-200)',
            })}
        >
            <div
                style=${styleMap({
                    display: 'flex',
                    gap: 'var(--swc-spacing-200)',
                })}
            >
                <swc-button
                    variant="primary"
                    treatment="fill"
                    static-color="white"
                >
                    Fill
                </swc-button>
                <swc-button
                    variant="primary"
                    treatment="fill"
                    static-color="white"
                    disabled
                >
                    Fill
                </swc-button>
            </div>
            <div
                style=${styleMap({
                    display: 'flex',
                    gap: 'var(--swc-spacing-200)',
                })}
            >
                <swc-button
                    variant="primary"
                    treatment="outline"
                    static-color="white"
                >
                    Outline
                </swc-button>
                <swc-button
                    variant="primary"
                    treatment="outline"
                    static-color="white"
                    disabled
                >
                    Outline
                </swc-button>
            </div>
        </div>
    `,
    tags: ['!dev'],
};
StaticWhitePrimary.storyName = 'Static white - primary';

/**
 * When a button needs to be placed on top of a dark color background or a visual, use the static white options with secondary variant.
 */
export const StaticWhiteSecondary: Story = {
    render: () => html`
        <div
            style=${styleMap({
                display: 'flex',
                'flex-direction': 'column',
                gap: 'var(--swc-spacing-400)',
                'align-items': 'center',
                'background-color': 'var(--swc-gray-900)',
                padding: 'var(--swc-spacing-400)',
                'border-radius': 'var(--swc-spacing-200)',
            })}
        >
            <div
                style=${styleMap({
                    display: 'flex',
                    gap: 'var(--swc-spacing-200)',
                })}
            >
                <swc-button
                    variant="secondary"
                    treatment="fill"
                    static-color="white"
                >
                    Fill
                </swc-button>
                <swc-button
                    variant="secondary"
                    treatment="fill"
                    static-color="white"
                    disabled
                >
                    Fill
                </swc-button>
            </div>
            <div
                style=${styleMap({
                    display: 'flex',
                    gap: 'var(--swc-spacing-200)',
                })}
            >
                <swc-button
                    variant="secondary"
                    treatment="outline"
                    static-color="white"
                >
                    Outline
                </swc-button>
                <swc-button
                    variant="secondary"
                    treatment="outline"
                    static-color="white"
                    disabled
                >
                    Outline
                </swc-button>
            </div>
        </div>
    `,
    tags: ['!dev'],
};
StaticWhiteSecondary.storyName = 'Static white - secondary';

/**
 * When a button needs to be placed on top of a light color background or a visual, use the static black options. Static color buttons do not change shades or values depending upon the color theme.
 */
export const StaticBlackPrimary: Story = {
    render: () => html`
        <div
            style=${styleMap({
                display: 'flex',
                'flex-direction': 'column',
                gap: 'var(--swc-spacing-400)',
                'align-items': 'center',
                'background-color': 'var(--swc-gray-200)',
                padding: 'var(--swc-spacing-400)',
                'border-radius': 'var(--swc-spacing-200)',
            })}
        >
            <div
                style=${styleMap({
                    display: 'flex',
                    gap: 'var(--swc-spacing-200)',
                })}
            >
                <swc-button
                    variant="primary"
                    treatment="fill"
                    static-color="black"
                >
                    Fill
                </swc-button>
                <swc-button
                    variant="primary"
                    treatment="fill"
                    static-color="black"
                    disabled
                >
                    Fill
                </swc-button>
            </div>
            <div
                style=${styleMap({
                    display: 'flex',
                    gap: 'var(--swc-spacing-200)',
                })}
            >
                <swc-button
                    variant="primary"
                    treatment="outline"
                    static-color="black"
                >
                    Outline
                </swc-button>
                <swc-button
                    variant="primary"
                    treatment="outline"
                    static-color="black"
                    disabled
                >
                    Outline
                </swc-button>
            </div>
        </div>
    `,
    tags: ['!dev'],
};
StaticBlackPrimary.storyName = 'Static black - primary';

/**
 * When a button needs to be placed on top of a light color background or a visual, use the static black options with secondary variant.
 */
export const StaticBlackSecondary: Story = {
    render: () => html`
        <div
            style=${styleMap({
                display: 'flex',
                'flex-direction': 'column',
                gap: 'var(--swc-spacing-400)',
                'align-items': 'center',
                'background-color': 'var(--swc-gray-200)',
                padding: 'var(--swc-spacing-400)',
                'border-radius': 'var(--swc-spacing-200)',
            })}
        >
            <div
                style=${styleMap({
                    display: 'flex',
                    gap: 'var(--swc-spacing-200)',
                })}
            >
                <swc-button
                    variant="secondary"
                    treatment="fill"
                    static-color="black"
                >
                    Fill
                </swc-button>
                <swc-button
                    variant="secondary"
                    treatment="fill"
                    static-color="black"
                    disabled
                >
                    Fill
                </swc-button>
            </div>
            <div
                style=${styleMap({
                    display: 'flex',
                    gap: 'var(--swc-spacing-200)',
                })}
            >
                <swc-button
                    variant="secondary"
                    treatment="outline"
                    static-color="black"
                >
                    Outline
                </swc-button>
                <swc-button
                    variant="secondary"
                    treatment="outline"
                    static-color="black"
                    disabled
                >
                    Outline
                </swc-button>
            </div>
        </div>
    `,
    tags: ['!dev'],
};
StaticBlackSecondary.storyName = 'Static black - secondary';

/**
 * The pending button is for indicating that a quick progress action is taking place. In this case, the label and optional icon disappear and a progress circle appears. The progress circle always shows an indeterminate progress.
 */
export const Pending: Story = {
    render: () => html`
        <div
            style=${styleMap({
                display: 'flex',
                'flex-direction': 'column',
                gap: 'var(--swc-spacing-400)',
                'align-items': 'center',
            })}
        >
            <div
                style=${styleMap({
                    display: 'flex',
                    gap: 'var(--swc-spacing-200)',
                })}
            >
                <swc-button variant="accent" treatment="fill" pending>
                    Fill
                </swc-button>
                <swc-button variant="accent" treatment="outline" pending>
                    Outline
                </swc-button>
            </div>
        </div>
    `,
    tags: ['!dev'],
};

/**
 * A button in a disabled state shows that an action exists, but is not available in that circumstance. This state can be used to maintain layout continuity and to communicate that an action may become available later.
 */
export const Disabled: Story = {
    render: () => html`
        <div
            style=${styleMap({
                display: 'flex',
                'flex-direction': 'column',
                gap: 'var(--swc-spacing-400)',
                'align-items': 'center',
            })}
        >
            <div
                style=${styleMap({
                    display: 'flex',
                    gap: 'var(--swc-spacing-200)',
                })}
            >
                <swc-button variant="accent" treatment="fill" disabled>
                    Fill
                </swc-button>
                <swc-button variant="accent" treatment="outline" disabled>
                    Outline
                </swc-button>
            </div>
        </div>
    `,
    tags: ['!dev'],
};

/**
 * When the button text is too long for the horizontal space available, it wraps to form another line. When there is no icon present, the text is aligned center. When there is an icon present, the text is aligned start (left with a writing direction of left-to-right) and the icon remains vertically aligned at the top.
 */
export const WithWrapping: Story = {
    render: () => html`
        <div
            style=${styleMap({
                display: 'flex',
                'flex-direction': 'column',
                gap: 'var(--swc-spacing-400)',
                'max-inline-size': '200px',
            })}
        >
            <swc-button variant="primary">
                This is a very long button label that wraps
            </swc-button>
            <swc-button variant="primary">
                <svg
                    slot="icon"
                    viewBox="0 0 36 36"
                    style="width: 18px; height: 18px;"
                >
                    <path
                        d="M33.567 8.2L13.678 28.1l-11.3-11.3a1.935 1.935 0 0 0-2.739 2.739l12.695 12.7a1.935 1.935 0 0 0 2.738 0L36.306 10.936A1.935 1.935 0 0 0 33.567 8.2z"
                    ></path>
                </svg>
                This is a very long button label with an icon that wraps
            </swc-button>
        </div>
    `,
    tags: ['!dev'],
};
WithWrapping.storyName = 'Text overflow';

/**
 * The normal behavior for lengthy text in the given horizontal space available is that it will wrap to form another line. By using the `no-wrap` attribute, the lengthy button text will not cause a line break and the width of the button will expand until it reaches its maximum width.
 *
 * Please note: this can cause undesired overflow experiences and to help prevent this, the overflowing text will attempt to hide by showing an ellipsis (...). This is demonstrated in the last two examples below, by constraining the maximum width of the button.
 *
 * This option is not part of the design spec, so please use carefully, with consideration of the overflow behavior and the readability of the button's content.
 */
export const DisableWrapping: Story = {
    render: () => html`
        <div
            style=${styleMap({
                display: 'flex',
                'flex-direction': 'column',
                gap: 'var(--swc-spacing-400)',
                'align-items': 'flex-start',
            })}
        >
            <swc-button variant="primary" no-wrap>
                Be a premium member
            </swc-button>
            <swc-button
                variant="primary"
                no-wrap
                style="max-inline-size: 100px;"
            >
                Be a premium member
            </swc-button>
            <swc-button
                variant="primary"
                no-wrap
                style="max-inline-size: 200px;"
            >
                <svg
                    slot="icon"
                    viewBox="0 0 36 36"
                    style="width: 18px; height: 18px;"
                >
                    <path
                        d="M33.567 8.2L13.678 28.1l-11.3-11.3a1.935 1.935 0 0 0-2.739 2.739l12.695 12.7a1.935 1.935 0 0 0 2.738 0L36.306 10.936A1.935 1.935 0 0 0 33.567 8.2z"
                    ></path>
                </svg>
                Be a premium member
            </swc-button>
            <swc-button
                variant="primary"
                no-wrap
                style="max-inline-size: 120px;"
            >
                <svg
                    slot="icon"
                    viewBox="0 0 36 36"
                    style="width: 18px; height: 18px;"
                >
                    <path
                        d="M33.567 8.2L13.678 28.1l-11.3-11.3a1.935 1.935 0 0 0-2.739 2.739l12.695 12.7a1.935 1.935 0 0 0 2.738 0L36.306 10.936A1.935 1.935 0 0 0 33.567 8.2z"
                    ></path>
                </svg>
                Be a premium member
            </swc-button>
        </div>
    `,
    tags: ['!dev'],
};
DisableWrapping.storyName = 'Text overflow - disabled text wrap';

/**
 * Buttons can contain icons in addition to text labels. Icons should be placed in the icon slot.
 */
export const WithIcon: Story = {
    render: () =>
        CONTAINER([
            html`<swc-button variant="accent">
                <svg
                    slot="icon"
                    viewBox="0 0 36 36"
                    style="width: 18px; height: 18px;"
                >
                    <path
                        d="M33.567 8.2L13.678 28.1l-11.3-11.3a1.935 1.935 0 0 0-2.739 2.739l12.695 12.7a1.935 1.935 0 0 0 2.738 0L36.306 10.936A1.935 1.935 0 0 0 33.567 8.2z"
                    ></path>
                </svg>
                Edit
            </swc-button>`,
            html`<swc-button variant="primary">
                <svg
                    slot="icon"
                    viewBox="0 0 36 36"
                    style="width: 18px; height: 18px;"
                >
                    <path
                        d="M33.567 8.2L13.678 28.1l-11.3-11.3a1.935 1.935 0 0 0-2.739 2.739l12.695 12.7a1.935 1.935 0 0 0 2.738 0L36.306 10.936A1.935 1.935 0 0 0 33.567 8.2z"
                    ></path>
                </svg>
                Save
            </swc-button>`,
            html`<swc-button variant="secondary">
                <svg
                    slot="icon"
                    viewBox="0 0 36 36"
                    style="width: 18px; height: 18px;"
                >
                    <path
                        d="M33.567 8.2L13.678 28.1l-11.3-11.3a1.935 1.935 0 0 0-2.739 2.739l12.695 12.7a1.935 1.935 0 0 0 2.738 0L36.306 10.936A1.935 1.935 0 0 0 33.567 8.2z"
                    ></path>
                </svg>
                Cancel
            </swc-button>`,
        ]),
    tags: ['!dev'],
};
WithIcon.storyName = 'With icon';

/**
 * Buttons can contain only an icon without a visible text label. In this case, an accessible label should be provided using the `label` attribute.
 */
export const IconOnly: Story = {
    render: () =>
        CONTAINER([
            html`<swc-button variant="accent" label="Edit">
                <svg
                    slot="icon"
                    viewBox="0 0 36 36"
                    style="width: 18px; height: 18px;"
                >
                    <path
                        d="M33.567 8.2L13.678 28.1l-11.3-11.3a1.935 1.935 0 0 0-2.739 2.739l12.695 12.7a1.935 1.935 0 0 0 2.738 0L36.306 10.936A1.935 1.935 0 0 0 33.567 8.2z"
                    ></path>
                </svg>
            </swc-button>`,
            html`<swc-button variant="primary" label="Save">
                <svg
                    slot="icon"
                    viewBox="0 0 36 36"
                    style="width: 18px; height: 18px;"
                >
                    <path
                        d="M33.567 8.2L13.678 28.1l-11.3-11.3a1.935 1.935 0 0 0-2.739 2.739l12.695 12.7a1.935 1.935 0 0 0 2.738 0L36.306 10.936A1.935 1.935 0 0 0 33.567 8.2z"
                    ></path>
                </svg>
            </swc-button>`,
            html`<swc-button variant="secondary" label="Cancel">
                <svg
                    slot="icon"
                    viewBox="0 0 36 36"
                    style="width: 18px; height: 18px;"
                >
                    <path
                        d="M33.567 8.2L13.678 28.1l-11.3-11.3a1.935 1.935 0 0 0-2.739 2.739l12.695 12.7a1.935 1.935 0 0 0 2.738 0L36.306 10.936A1.935 1.935 0 0 0 33.567 8.2z"
                    ></path>
                </svg>
            </swc-button>`,
            html`<swc-button variant="negative" label="Delete">
                <svg
                    slot="icon"
                    viewBox="0 0 36 36"
                    style="width: 18px; height: 18px;"
                >
                    <path
                        d="M33.567 8.2L13.678 28.1l-11.3-11.3a1.935 1.935 0 0 0-2.739 2.739l12.695 12.7a1.935 1.935 0 0 0 2.738 0L36.306 10.936A1.935 1.935 0 0 0 33.567 8.2z"
                    ></path>
                </svg>
            </swc-button>`,
        ]),
    tags: ['!dev'],
};
IconOnly.storyName = 'Icon only';

/**
 * Buttons can function as links by providing an `href` attribute. The button will render as an anchor element with button styling.
 */
export const AsLink: Story = {
    render: () =>
        CONTAINER([
            html`<swc-button variant="accent" href="https://adobe.com">
                Visit Adobe
            </swc-button>`,
            html`<swc-button
                variant="primary"
                href="https://adobe.com"
                target="_blank"
            >
                Open in new tab
            </swc-button>`,
        ]),
    tags: ['!dev'],
};
AsLink.storyName = 'As link';

// ────────────────────────
//    HELPER FUNCTIONS
// ────────────────────────

/* @todo Pull this up into a utility function for more components to leverage. Are all sizes accounted for? */
function sizeMap(str?: ButtonSize): string {
    const sizeLabels: Record<string, string> = {
        s: 'Small',
        m: 'Medium',
        l: 'Large',
        xl: 'Extra-large',
    };

    return str ? sizeLabels[str] || '' : '';
}

/* @todo Pull this up into a decorator for all stories to leverage */
function CONTAINER(content: TemplateResult<1>[]): TemplateResult {
    return html`<div
        style=${styleMap({
            display: 'flex',
            gap: 'var(--swc-spacing-200)',
            'flex-wrap': 'wrap',
            'justify-content': 'center',
            // Used 80ch because that's generally considered the maximum readable width for text in a web page.
            'max-inline-size': '80ch',
        })}
    >
        ${content}
    </div>`;
}
