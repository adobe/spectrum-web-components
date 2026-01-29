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

import { expect } from '@storybook/test';

import { StatusLight } from '@adobe/swc/status-light';

import '@adobe/swc/status-light';

import { getSwcTestGlobals } from '../../../utils/test-utils.js';

type StoryTestContext = {
    canvasElement: HTMLElement;
};

const testStatusLightDefaults = async (
    statusLight: StatusLight
): Promise<void> => {
    await statusLight.updateComplete;
    await expect(statusLight.variant).toBe('info');
    await expect(statusLight.size).toBe('m');
};

const testVariantPropertyReflection = async (
    statusLight: StatusLight
): Promise<void> => {
    await statusLight.updateComplete;
    await expect(statusLight.getAttribute('variant')).toBe(statusLight.variant);
    await expect(
        statusLight.shadowRoot?.querySelector(
            `.swc-StatusLight--${statusLight.variant}`
        )
    ).toBeTruthy();
};

const testVariantPropertySetViaAttribute = async (
    statusLight: StatusLight
): Promise<void> => {
    statusLight.setAttribute('variant', 'negative');
    await statusLight.updateComplete;
    await expect(statusLight.variant).toBe('negative');
    await expect(statusLight.getAttribute('variant')).toBe('negative');
    await expect(
        statusLight.shadowRoot?.querySelector('.swc-StatusLight--negative')
    ).toBeTruthy();
};

const testSemanticVariants = async (root: ParentNode): Promise<void> => {
    for (const variant of StatusLight.VARIANTS_SEMANTIC) {
        const statusLight = root.querySelector(
            `swc-status-light[variant="${variant}"]`
        ) as StatusLight | null;

        await expect(statusLight).toBeTruthy();
        if (!statusLight) {
            continue;
        }

        await statusLight.updateComplete;
        await expect(statusLight.variant).toBe(variant);
        await expect(
            statusLight.shadowRoot?.querySelector(
                `.swc-StatusLight--${variant}`
            )
        ).toBeTruthy();
    }
};

const testColorVariants = async (root: ParentNode): Promise<void> => {
    for (const variant of StatusLight.VARIANTS_COLOR) {
        const statusLight = root.querySelector(
            `swc-status-light[variant="${variant}"]`
        ) as StatusLight | null;

        await expect(statusLight).toBeTruthy();
        if (!statusLight) {
            continue;
        }

        await statusLight.updateComplete;
        await expect(statusLight.variant).toBe(variant);
        await expect(
            statusLight.shadowRoot?.querySelector(
                `.swc-StatusLight--${variant}`
            )
        ).toBeTruthy();
    }
};

const testSizeProperty = async (statusLight: StatusLight): Promise<void> => {
    await statusLight.updateComplete;
    await expect(statusLight.getAttribute('size')).toBe(statusLight.size);
    await expect(
        statusLight.shadowRoot?.querySelector(
            `.swc-StatusLight--size${statusLight.size.toUpperCase()}`
        )
    ).toBeTruthy();
};

const testSizePropertySetViaAttribute = async (
    statusLight: StatusLight
): Promise<void> => {
    statusLight.setAttribute('size', 's');
    await statusLight.updateComplete;
    await expect(statusLight.size).toBe('s');
    await expect(statusLight.getAttribute('size')).toBe('s');
    await expect(
        statusLight.shadowRoot?.querySelector('.swc-StatusLight--sizeS')
    ).toBeTruthy();
};

const testSizeVariants = async (root: ParentNode): Promise<void> => {
    for (const size of StatusLight.VALID_SIZES) {
        const statusLight = root.querySelector(
            `swc-status-light[size="${size}"]`
        ) as StatusLight | null;

        await expect(statusLight).toBeTruthy();
        if (!statusLight) {
            continue;
        }

        await statusLight.updateComplete;
        await expect(statusLight.size).toBe(size);
        await expect(
            statusLight.shadowRoot?.querySelector(
                `.swc-StatusLight--size${size.toUpperCase()}`
            )
        ).toBeTruthy();
    }
};

const testDefaultSlotContent = async (
    statusLight: StatusLight
): Promise<void> => {
    await expect(statusLight.textContent?.trim()).toBeTruthy();
};

const testUnsupportedVariantWarning = async (
    statusLight: StatusLight
): Promise<void> => {
    const swcGlobals = getSwcTestGlobals();
    const originalWarn = swcGlobals.warn;
    const originalDebug = swcGlobals.DEBUG ?? false;
    const originalIssuedWarnings = swcGlobals.issuedWarnings;
    const warnings: unknown[][] = [];

    swcGlobals.warn = (...args: unknown[]) => {
        warnings.push(args);
    };
    swcGlobals.DEBUG = true;
    swcGlobals.issuedWarnings = new Set();

    statusLight.setAttribute('variant', 'accent');
    await statusLight.updateComplete;

    await expect(warnings.length).toBeGreaterThan(0);
    await expect(warnings[0][0]).toBe(statusLight);
    await expect(warnings[0][1]).toBe(
        `<${statusLight.localName}> element expects the "variant" attribute to be one of the following:`
    );

    swcGlobals.warn = originalWarn;
    swcGlobals.DEBUG = originalDebug;
    swcGlobals.issuedWarnings = originalIssuedWarnings;
};

const testDisabledAttributeWarning = async (
    statusLight: StatusLight
): Promise<void> => {
    const swcGlobals = getSwcTestGlobals();
    const originalWarn = swcGlobals.warn;
    const originalDebug = swcGlobals.DEBUG ?? false;
    const originalIssuedWarnings = swcGlobals.issuedWarnings;
    const warnings: unknown[][] = [];

    swcGlobals.warn = (...args: unknown[]) => {
        warnings.push(args);
    };
    swcGlobals.DEBUG = true;
    swcGlobals.issuedWarnings = new Set();

    statusLight.setAttribute('variant', 'positive');
    statusLight.setAttribute('disabled', '');
    await statusLight.updateComplete;

    await expect(warnings.length).toBeGreaterThan(0);
    await expect(warnings[0][0]).toBe(statusLight);
    await expect(warnings[0][1]).toContain(
        'does not support the disabled state'
    );

    swcGlobals.warn = originalWarn;
    swcGlobals.DEBUG = originalDebug;
    swcGlobals.issuedWarnings = originalIssuedWarnings;
};

const getStatusLight = (context: StoryTestContext): StatusLight => {
    return context.canvasElement.querySelector(
        'swc-status-light'
    ) as StatusLight;
};

export const storyTests = {
    Default: async (context: StoryTestContext) => {
        const statusLight = getStatusLight(context);
        await testStatusLightDefaults(statusLight);
        await testDefaultSlotContent(statusLight);
        await testVariantPropertyReflection(statusLight);
        await testVariantPropertySetViaAttribute(statusLight);
        await testSizeProperty(statusLight);
        await testSizePropertySetViaAttribute(statusLight);
        await testUnsupportedVariantWarning(statusLight);
        await testDisabledAttributeWarning(statusLight);
    },
    SemanticVariants: async (context: StoryTestContext) => {
        await testSemanticVariants(context.canvasElement);
    },
    NonsemanticVariants: async (context: StoryTestContext) => {
        await testColorVariants(context.canvasElement);
    },
    Sizes: async (context: StoryTestContext) => {
        await testSizeVariants(context.canvasElement);
    },
};

export {
    testStatusLightDefaults,
    testVariantPropertyReflection,
    testVariantPropertySetViaAttribute,
    testSemanticVariants,
    testColorVariants,
    testSizeProperty,
    testSizePropertySetViaAttribute,
    testSizeVariants,
    testDefaultSlotContent,
    testUnsupportedVariantWarning,
    testDisabledAttributeWarning,
};
