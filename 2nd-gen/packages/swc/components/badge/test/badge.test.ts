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
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Badge } from '@adobe/swc/badge';

import '@adobe/swc/badge';

import {
    BADGE_VALID_SIZES,
    BADGE_VARIANTS_COLOR_S2,
    BADGE_VARIANTS_S2,
    BADGE_VARIANTS_SEMANTIC,
    FIXED_VALUES,
} from '../../../../core/components/badge/Badge.types.js';
import {
    getComponent,
    getComponents,
    withWarningSpy,
} from '../../../utils/test-utils.js';
import { meta } from '../stories/badge.stories.js';
import {
    Anatomy,
    Fixed,
    NonSemanticVariants,
    Outline,
    Overview,
    SemanticVariants,
    Sizes,
    Subtle,
} from '../stories/badge.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
    ...meta,
    title: 'Badge/Tests',
    parameters: {
        ...meta.parameters,
        docs: { disable: true, page: null },
    },
    tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
    ...Overview,
    play: async ({ canvasElement, step }) => {
        const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

        await step(
            'renders expected default values and slot content',
            async () => {
                expect(badge.variant).toBe('informative');
                expect(badge.size).toBe('m');
                expect(badge.textContent?.trim()).toBeTruthy();
            }
        );
    },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const PropertyMutationTest: Story = {
    ...Overview,
    play: async ({ canvasElement, step }) => {
        const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

        await step('variant reflects to attribute after mutation', async () => {
            badge.variant = 'positive';
            await badge.updateComplete;
            expect(badge.getAttribute('variant')).toBe('positive');

            badge.variant = 'notice';
            await badge.updateComplete;
            expect(badge.getAttribute('variant')).toBe('notice');
        });

        await step('subtle reflects to attribute after mutation', async () => {
            badge.subtle = true;
            await badge.updateComplete;
            expect(badge.hasAttribute('subtle')).toBe(true);
        });

        await step('outline reflects to attribute after mutation', async () => {
            badge.outline = true;
            await badge.updateComplete;
            expect(badge.hasAttribute('outline')).toBe(true);
        });
    },
};

export const FixedClearingTest: Story = {
    render: () =>
        html`<swc-badge fixed="block-start" variant="informative"
            >Pinned</swc-badge
        >`,
    play: async ({ canvasElement, step }) => {
        const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

        await step('initially has fixed attribute', async () => {
            expect(badge.fixed).toBe('block-start');
            expect(badge.hasAttribute('fixed')).toBe(true);
        });

        await step(
            'removes fixed attribute when set to undefined',
            async () => {
                badge.fixed = undefined;
                await badge.updateComplete;

                expect(badge.fixed).toBeFalsy();
                expect(badge.hasAttribute('fixed')).toBe(false);
            }
        );
    },
};

// ──────────────────────────────────────────────────────────────
// TEST: Slots
// ──────────────────────────────────────────────────────────────

export const AnatomyTest: Story = {
    ...Anatomy,
    play: async ({ canvasElement, step }) => {
        const badges = await getComponents<Badge>(canvasElement, 'swc-badge');

        await step('includes icon slot content', async () => {
            const badgeWithIcon = badges.find((item) =>
                item.querySelector('[slot="icon"]')
            );
            expect(badgeWithIcon).toBeTruthy();
            const slottedIcon = badgeWithIcon?.querySelector('[slot="icon"]');
            expect(slottedIcon).toBeTruthy();
            expect(slottedIcon?.textContent?.trim()).toBeTruthy();
        });
    },
};

// ──────────────────────────────────────────────────────────────
// TEST: Variants / States
// ──────────────────────────────────────────────────────────────

export const SemanticVariantsTest: Story = {
    ...SemanticVariants,
    play: async ({ canvasElement, step }) => {
        await step('renders all semantic variant values', async () => {
            for (const variant of BADGE_VARIANTS_SEMANTIC) {
                const badge = canvasElement.querySelector(
                    `swc-badge[variant="${variant}"]`
                ) as Badge | null;
                await badge?.updateComplete;
                expect(badge).toBeTruthy();
                expect(badge?.variant).toBe(variant);
            }
        });
    },
};

export const OutlineTest: Story = {
    ...Outline,
    play: async ({ canvasElement, step }) => {
        await step(
            'reflects outline attribute on all semantic variants',
            async () => {
                for (const variant of BADGE_VARIANTS_SEMANTIC) {
                    const badge = canvasElement.querySelector(
                        `swc-badge[variant="${variant}"]`
                    ) as Badge | null;
                    await badge?.updateComplete;
                    expect(badge?.hasAttribute('outline')).toBe(true);
                }
            }
        );
    },
};

export const SizesTest: Story = {
    ...Sizes,
    play: async ({ canvasElement, step }) => {
        await step('reflects size attribute for each valid size', async () => {
            for (const size of BADGE_VALID_SIZES) {
                const badge = canvasElement.querySelector(
                    `swc-badge[size="${size}"]`
                ) as Badge | null;
                await badge?.updateComplete;
                expect(badge).toBeTruthy();
                expect(badge?.size).toBe(size);
            }
        });
    },
};

export const SubtleTest: Story = {
    ...Subtle,
    play: async ({ canvasElement, step }) => {
        await step('reflects subtle attribute on all variants', async () => {
            for (const variant of BADGE_VARIANTS_S2) {
                const badge = canvasElement.querySelector(
                    `swc-badge[variant="${variant}"]`
                ) as Badge | null;
                await badge?.updateComplete;
                expect(badge?.hasAttribute('subtle')).toBe(true);
            }
        });
    },
};

export const FixedTest: Story = {
    ...Fixed,
    play: async ({ canvasElement, step }) => {
        await step(
            'reflects fixed attribute for each valid value',
            async () => {
                for (const value of FIXED_VALUES) {
                    const badge = canvasElement.querySelector(
                        `swc-badge[fixed="${value}"]`
                    ) as Badge | null;
                    await badge?.updateComplete;
                    expect(badge).toBeTruthy();
                    expect(badge?.fixed).toBe(value);
                }
            }
        );
    },
};

export const NonSemanticVariantsTest: Story = {
    ...NonSemanticVariants,
    play: async ({ canvasElement, step }) => {
        await step('renders all color variant values', async () => {
            await Promise.all(
                BADGE_VARIANTS_COLOR_S2.map(async (variant) => {
                    const badge = canvasElement.querySelector(
                        `swc-badge[variant="${variant}"]`
                    ) as Badge;
                    await badge.updateComplete;
                    expect(badge.variant).toBe(variant);
                })
            );
        });
    },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidVariantWarningTest: Story = {
    render: () => html`<swc-badge>Label</swc-badge>`,
    play: async ({ canvasElement, step }) => {
        const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

        await step('warns when an invalid variant is set in DEBUG mode', () =>
            withWarningSpy(async (warnCalls) => {
                badge.variant = 'not-a-variant' as unknown as Badge['variant'];
                await badge.updateComplete;

                expect(warnCalls.length).toBeGreaterThan(0);
                expect(String(warnCalls[0]?.[1] || '')).toContain('variant');
            })
        );
    },
};

export const ValidVariantNoWarningTest: Story = {
    render: () => html`<swc-badge variant="positive">Approved</swc-badge>`,
    play: async ({ canvasElement, step }) => {
        const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

        await step(
            'does not warn when a valid variant is set in DEBUG mode',
            () =>
                withWarningSpy(async (warnCalls) => {
                    badge.variant = 'negative';
                    await badge.updateComplete;

                    expect(warnCalls.length).toBe(0);
                })
        );
    },
};

export const OutlineNonSemanticWarningTest: Story = {
    render: () =>
        html`<swc-badge variant="seafoam" outline>Seafoam</swc-badge>`,
    play: async ({ canvasElement, step }) => {
        const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

        await step(
            'warns when outline is used with a non-semantic variant',
            () =>
                withWarningSpy(async (warnCalls) => {
                    badge.requestUpdate();
                    await badge.updateComplete;

                    expect(warnCalls.length).toBeGreaterThan(0);
                    expect(String(warnCalls[0]?.[1] || '')).toContain(
                        'outline'
                    );
                })
        );
    },
};
