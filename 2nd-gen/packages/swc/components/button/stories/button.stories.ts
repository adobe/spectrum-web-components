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

import { html } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { Button } from '@adobe/swc/button';

import '@adobe/swc/button';
import '@adobe/swc/progress-circle';

import {
    BUTTON_STATIC_COLORS,
    BUTTON_TREATMENTS,
    BUTTON_VARIANTS_S2,
    type ButtonStaticColor,
    type ButtonTreatment,
    type ButtonVariantS2,
} from '../../../../core/components/button/Button.types.js';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } = getStorybookHelpers('swc-button');

argTypes.variant = {
    ...argTypes.variant,
    control: { type: 'select' },
    options: Button.VARIANTS,
    table: {
        category: 'attributes',
        defaultValue: {
            summary: 'accent',
        },
    },
};

argTypes.treatment = {
    ...argTypes.treatment,
    control: { type: 'inline-radio' },
    options: Button.TREATMENTS,
    table: {
        category: 'attributes',
        defaultValue: {
            summary: 'fill',
        },
    },
};

argTypes.staticColor = {
    ...argTypes['static-color'],
    control: { type: 'select' },
    options: [undefined, ...Button.STATIC_COLORS],
    table: {
        category: 'attributes',
    },
};

argTypes.size = {
    ...argTypes.size,
    control: { type: 'select' },
    options: Button.VALID_SIZES,
    table: {
        category: 'attributes',
        defaultValue: {
            summary: 'm',
        },
    },
};

argTypes.type = {
    ...argTypes.type,
    control: { type: 'select' },
    options: ['button', 'submit', 'reset'],
    table: {
        category: 'attributes',
        defaultValue: {
            summary: 'button',
        },
    },
};

/**
 * Buttons allow users to perform an action or to navigate to another page.
 * They have multiple styles for various needs, and are ideal for calling
 * attention to where a user needs to do something in order to move forward in a flow.
 *
 * There are four available variants used for different levels of emphasis and
 * types of actions. By default, a button uses the fill style with a solid background.
 * The primary and secondary variants also have an outline option.
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
        docs: {
            subtitle: `Trigger an action or navigate to another page.`,
        },
        flexLayout: 'row-wrap',
    },
    tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const sizeLabels: Record<string, string> = {
    s: 'Small',
    m: 'Medium',
    l: 'Large',
    xl: 'Extra-large',
};

const variantLabels = {
    accent: 'Edit',
    primary: 'Save',
    secondary: 'Cancel',
    negative: 'Delete',
} as const satisfies Record<ButtonVariantS2, string>;

const treatmentLabels = {
    fill: 'Fill',
    outline: 'Outline',
} as const satisfies Record<ButtonTreatment, string>;

const staticColorLabels = {
    white: 'Static white',
    black: 'Static black',
} as const satisfies Record<ButtonStaticColor, string>;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
    render: (args) => template(args),
    args: {
        size: 'm',
        variant: 'accent',
        treatment: 'fill',
        'default-slot': 'Edit',
    },
    tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORIES
// ──────────────────────────────

export const Overview: Story = {
    render: (args) => html` ${template(args)} `,
    tags: ['overview'],
    args: {
        size: 'm',
        variant: 'accent',
        treatment: 'fill',
        'default-slot': 'Edit',
    },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * A button consists of:
 *
 * 1. **Label** - Text content describing the action (required for accessibility when visible)
 * 2. **Icon** (optional) - Visual indicator positioned before or instead of the label
 * 3. **Container** - Styled pill with variant and treatment
 *
 * ### Content
 *
 * - **Default slot**: Text content describing the action (required when label is visible)
 * - **icon slot**: (optional) - Icon element positioned before the label
 * - **label** attribute: Accessible name (required for icon-only buttons)
 */
export const Anatomy: Story = {
    render: (args) => html`
        ${template({ ...args, 'default-slot': 'Label only' })}
        ${template({
            ...args,
            'default-slot': 'Edit',
            label: 'Edit',
            'icon-slot': '✓',
        })}
        ${template({
            ...args,
            label: 'Edit',
            'icon-slot': '✓',
        })}
    `,
    tags: ['anatomy'],
    args: {
        variant: 'accent',
        size: 'm',
        treatment: 'fill',
    },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Buttons come in four sizes to fit various contexts:
 *
 * - **Small (`s`)**: Compact spaces or inline with text
 * - **Medium (`m`)**: Default size for most common usage scenarios
 * - **Large (`l`)**: Increased emphasis in primary content areas
 * - **Extra-large (`xl`)**: Maximum visibility for critical actions
 *
 * The `m` size is the default and most frequently used option.
 * Use other sizes sparingly to create a hierarchy of importance on a page.
 */
export const Sizes: Story = {
    render: (args) => html`
        ${Button.VALID_SIZES.map((size) =>
            template({
                ...args,
                size,
                'default-slot': sizeLabels[size] ?? size,
            })
        )}
    `,
    parameters: { 'section-order': 1 },
    tags: ['options'],
    args: {
        variant: 'accent',
        treatment: 'fill',
    },
};

/**
 * Semantic variants provide meaning through color and emphasis level:
 *
 * - **accent**: Strong emphasis, reserved for the most important action on the page
 * - **primary**: Medium emphasis, for primary actions that need less prominence than accent
 * - **secondary**: Low emphasis, paired with other button types for less prominent actions
 * - **negative**: Destructive or negative consequences (e.g., delete, remove)
 */
export const SemanticVariants: Story = {
    render: (args) => html`
        ${BUTTON_VARIANTS_S2.map((variant) =>
            template({
                ...args,
                variant,
                'default-slot': variantLabels[variant],
            })
        )}
    `,
    parameters: { 'section-order': 2 },
    tags: ['options'],
};
SemanticVariants.storyName = 'Semantic variants';

/**
 * The `treatment` attribute controls the visual style of the button:
 *
 * - **fill**: Solid background (default) for primary emphasis
 * - **outline**: Bordered appearance with transparent background for reduced visual weight
 *
 * Outline is available for primary and secondary variants only.
 */
export const Treatments: Story = {
    render: (args) => html`
        ${BUTTON_TREATMENTS.map((treatment) =>
            template({
                ...args,
                treatment,
                'default-slot': treatmentLabels[treatment],
            })
        )}
    `,
    parameters: { 'section-order': 3 },
    tags: ['options'],
    args: {
        variant: 'primary',
        size: 'm',
    },
};

/**
 * Use the `static-color` attribute when placing buttons over dark or light backgrounds
 * (e.g., images or colored panels). Static color buttons do not change with theme.
 *
 * - **white**: For use on dark backgrounds
 * - **black**: For use on light backgrounds
 */
export const StaticColors: Story = {
    render: (args) => html`
        ${BUTTON_STATIC_COLORS.map((staticColor) =>
            template({
                ...args,
                'static-color': staticColor,
                'default-slot': staticColorLabels[staticColor],
            })
        )}
    `,
    parameters: { 'section-order': 4, staticColorsDemo: true },
    tags: ['options', '!test'],
    args: {
        variant: 'primary',
        treatment: 'fill',
        size: 'm',
    },
};

/**
 * A button in a disabled state shows that an action exists but is not available.
 * Use this to maintain layout continuity and communicate that an action may become available later.
 */
export const Disabled: Story = {
    render: (args) => html`
        ${template({ ...args, 'default-slot': 'Fill', disabled: true })}
        ${template({
            ...args,
            treatment: 'outline',
            'default-slot': 'Outline',
            disabled: true,
        })}
    `,
    parameters: { 'section-order': 5 },
    tags: ['options'],
    args: {
        variant: 'accent',
        size: 'm',
    },
};

/**
 * The pending state indicates that an action is in progress.
 * The button label is replaced by a progress indicator until the action completes.
 */
export const Pending: Story = {
    render: (args) => html`
        ${template({ ...args, 'default-slot': 'Loading', pending: true })}
        ${template({
            ...args,
            treatment: 'outline',
            'default-slot': 'Loading',
            pending: true,
        })}
    `,
    parameters: { 'section-order': 6 },
    tags: ['options'],
    args: {
        variant: 'accent',
        size: 'm',
    },
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

/**
 * When a button's label is too long for the available horizontal space, it wraps to multiple lines.
 * When an icon is present, the text aligns to the start and the icon stays at the top.
 */
export const TextWrapping: Story = {
    render: (args) => html`
        ${template({
            ...args,
            variant: 'primary',
            'default-slot':
                'This is a very long button label that wraps to multiple lines',
            style: 'max-inline-size: 200px',
        })}
    `,
    tags: ['behaviors'],
    args: {
        size: 'm',
    },
};

/**
 * The `no-wrap` attribute prevents the button label from wrapping.
 * When space is constrained, overflowing text truncates with an ellipsis.
 * Use sparingly; consider overflow and readability.
 */
export const NoWrap: Story = {
    render: (args) => html`
        ${template({
            ...args,
            variant: 'primary',
            'default-slot': 'Be a premium member',
            noWrap: true,
            style: 'max-inline-size: 120px',
        })}
    `,
    tags: ['behaviors'],
    args: {
        size: 'm',
    },
};
NoWrap.storyName = 'No wrap';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-button>` element implements several accessibility features:
 *
 * #### Keyboard navigation
 *
 * - <kbd>Tab</kbd>: Moves focus to/from the button
 * - <kbd>Space</kbd> or <kbd>Enter</kbd>: Activates the button
 * - <kbd>Escape</kbd>: Cancels pending state (when applicable)
 *
 * #### ARIA implementation
 *
 * - **ARIA role**: Uses native `<button>` or `<a>` for correct semantics
 * - **Labeling**: Uses `label` attribute for `aria-label` (required for icon-only buttons)
 * - **States**: Sets `aria-disabled="true"` when disabled, `aria-busy="true"` when pending
 *
 * #### Visual accessibility
 *
 * - Focus indicator is visible and meets contrast requirements
 * - High contrast mode is supported
 * - Static color variants ensure sufficient contrast on colored backgrounds
 *
 * ### Best practices
 *
 * - Always provide visible text or a descriptive `label` for icon-only buttons
 * - Use semantic variants to convey action type (e.g., negative for destructive actions)
 * - Ensure sufficient color contrast between the button and its background
 * - For link-style buttons, use `href` so the component renders as an anchor for correct semantics
 * - Test with keyboard-only navigation and screen readers
 */
export const Accessibility: Story = {
    render: (args) => html`
        ${template({
            ...args,
            variant: 'accent',
            'default-slot': 'Edit',
        })}
        ${template({
            ...args,
            variant: 'primary',
            'default-slot': 'Save',
        })}
        ${template({
            ...args,
            variant: 'secondary',
            'default-slot': 'Cancel',
        })}
        ${template({
            ...args,
            variant: 'negative',
            'default-slot': 'Delete',
        })}
        ${template({
            ...args,
            variant: 'accent',
            label: 'Edit',
            'icon-slot': '✓',
        })}
    `,
    tags: ['a11y'],
    args: {
        size: 'm',
    },
};
