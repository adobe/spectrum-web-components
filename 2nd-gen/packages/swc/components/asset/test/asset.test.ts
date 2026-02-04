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
import { beforeEach, describe, expect, test } from 'vitest';

import type { Asset } from '@adobe/swc/asset';

import '@adobe/swc/asset';

import { fixture } from '../../../utils/test-utils.js';

describe('swc-asset', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Defaults
    // ──────────────────────────────────────────────────────────────

    describe('defaults', () => {
        test('should render with shadow root', async () => {
            const asset = await fixture(html`
                <swc-asset variant="file"></swc-asset>
            `);

            expect(asset.shadowRoot).toBeTruthy();
        });

        test('should have correct default property values', async () => {
            const asset = await fixture<Asset>(html`<swc-asset></swc-asset>`);

            expect(asset.variant).toBeUndefined();
            expect(asset.label).toBe('');
            expect(asset.src).toBeUndefined();
            expect(asset.alt).toBeUndefined();
            expect(asset.loading).toBeUndefined();
            expect(asset.objectFit).toBeUndefined();
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Variants (file/folder)
    // ──────────────────────────────────────────────────────────────

    describe('variants', () => {
        test('should render file variant', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset variant="file" label="Document"></swc-asset>
            `);

            expect(asset.variant).toBe('file');
            expect(
                asset.shadowRoot?.querySelector('.spectrum-Asset-file')
            ).toBeTruthy();
        });

        test('should render folder variant', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset variant="folder" label="Photos"></swc-asset>
            `);

            expect(asset.variant).toBe('folder');
            expect(
                asset.shadowRoot?.querySelector('.spectrum-Asset-folder')
            ).toBeTruthy();
        });

        test('should reflect variant property to attribute', async () => {
            const asset = await fixture<Asset>(html`<swc-asset></swc-asset>`);

            asset.variant = 'file';
            await asset.updateComplete;

            expect(asset.getAttribute('variant')).toBe('file');
        });

        test('should set label for file variant', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset variant="file" label="README.md"></swc-asset>
            `);

            expect(asset.label).toBe('README.md');
            const svg = asset.shadowRoot?.querySelector('.spectrum-Asset-file');
            expect(svg?.getAttribute('aria-label')).toBe('README.md');
        });

        test('should set label for folder variant', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset variant="folder" label="Documents"></swc-asset>
            `);

            expect(asset.label).toBe('Documents');
            const svg = asset.shadowRoot?.querySelector(
                '.spectrum-Asset-folder'
            );
            expect(svg?.getAttribute('aria-label')).toBe('Documents');
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Direct Image Rendering (NEW!)
    // ──────────────────────────────────────────────────────────────

    describe('direct image rendering', () => {
        test('should render img element when src is provided', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset src="test.jpg" alt="Component asset"></swc-asset>
            `);

            expect(asset.src).toBe('test.jpg');
            expect(asset.alt).toBe('Component asset');

            const img = asset.shadowRoot?.querySelector('img');
            expect(img).toBeTruthy();
            expect(img?.getAttribute('src')).toBe('test.jpg');
            expect(img?.getAttribute('alt')).toBe('Component asset');
        });

        test('should set loading attribute', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset src="test.jpg" alt="Test" loading="lazy"></swc-asset>
            `);

            expect(asset.loading).toBe('lazy');

            const img = asset.shadowRoot?.querySelector('img');
            expect(img?.getAttribute('loading')).toBe('lazy');
        });

        test('should set object-fit via property', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset
                    src="test.jpg"
                    alt="Test"
                    object-fit="cover"
                ></swc-asset>
            `);

            expect(asset.objectFit).toBe('cover');

            const img = asset.shadowRoot?.querySelector('img');
            expect(img?.style.objectFit).toBe('cover');
        });

        test('should set object-position via property', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset
                    src="test.jpg"
                    alt="Test"
                    object-position="center top"
                ></swc-asset>
            `);

            expect(asset.objectPosition).toBe('center top');

            const img = asset.shadowRoot?.querySelector('img');
            expect(img?.style.objectPosition).toBe('center top');
        });

        test('should handle srcset and sizes', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset
                    src="test.jpg"
                    alt="Test"
                    srcset="test-320w.jpg 320w, test-640w.jpg 640w"
                    sizes="(max-width: 600px) 320px, 640px"
                ></swc-asset>
            `);

            expect(asset.srcset).toBe('test-320w.jpg 320w, test-640w.jpg 640w');
            expect(asset.sizes).toBe('(max-width: 600px) 320px, 640px');

            const img = asset.shadowRoot?.querySelector('img');
            expect(img?.getAttribute('srcset')).toBe(
                'test-320w.jpg 320w, test-640w.jpg 640w'
            );
            expect(img?.getAttribute('sizes')).toBe(
                '(max-width: 600px) 320px, 640px'
            );
        });

        test('should handle decoding attribute', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset
                    src="test.jpg"
                    alt="Test"
                    decoding="async"
                ></swc-asset>
            `);

            expect(asset.decoding).toBe('async');

            const img = asset.shadowRoot?.querySelector('img');
            expect(img?.getAttribute('decoding')).toBe('async');
        });

        test('should handle width and height attributes', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset
                    src="test.jpg"
                    alt="Test"
                    width="200"
                    height="150"
                ></swc-asset>
            `);

            expect(asset.width).toBe(200);
            expect(asset.height).toBe(150);

            const img = asset.shadowRoot?.querySelector('img');
            expect(img?.getAttribute('width')).toBe('200');
            expect(img?.getAttribute('height')).toBe('150');
        });

        test('should handle crossorigin attribute', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset
                    src="test.jpg"
                    alt="Test"
                    crossorigin="anonymous"
                ></swc-asset>
            `);

            expect(asset.crossorigin).toBe('anonymous');

            const img = asset.shadowRoot?.querySelector('img');
            expect(img?.getAttribute('crossorigin')).toBe('anonymous');
        });

        test('should handle referrerpolicy attribute', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset
                    src="test.jpg"
                    alt="Test"
                    referrerpolicy="no-referrer"
                ></swc-asset>
            `);

            expect(asset.referrerpolicy).toBe('no-referrer');

            const img = asset.shadowRoot?.querySelector('img');
            expect(img?.getAttribute('referrerpolicy')).toBe('no-referrer');
        });

        test('should update src dynamically', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset src="test1.jpg" alt="Test"></swc-asset>
            `);

            let img = asset.shadowRoot?.querySelector('img');
            expect(img?.getAttribute('src')).toBe('test1.jpg');

            asset.src = 'test2.jpg';
            await asset.updateComplete;

            img = asset.shadowRoot?.querySelector('img');
            expect(img?.getAttribute('src')).toBe('test2.jpg');
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Slots (Backwards Compatibility)
    // ──────────────────────────────────────────────────────────────

    describe('slots', () => {
        test('should render slot content when no variant or src is set', async () => {
            const asset = await fixture(html`
                <swc-asset>
                    <img src="slotted.jpg" alt="Slotted" />
                </swc-asset>
            `);

            const slottedImg = asset.querySelector('img');
            expect(slottedImg).toBeTruthy();
            expect(slottedImg?.getAttribute('src')).toBe('slotted.jpg');

            // Should render div container for slot
            expect(
                asset.shadowRoot?.querySelector('.spectrum-Asset')
            ).toBeTruthy();
        });

        test('should prefer variant over slot', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset variant="file">
                    <img src="slotted.jpg" alt="Should not render" />
                </swc-asset>
            `);

            // Should render file variant
            expect(
                asset.shadowRoot?.querySelector('.spectrum-Asset-file')
            ).toBeTruthy();

            // Slot should not be rendered
            expect(asset.shadowRoot?.querySelector('slot')).toBeFalsy();
        });

        test('should prefer src over slot', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset src="direct.jpg" alt="Direct render">
                    <img src="slotted.jpg" alt="Should not render" />
                </swc-asset>
            `);

            // Should render direct img
            const img = asset.shadowRoot?.querySelector('img');
            expect(img?.getAttribute('src')).toBe('direct.jpg');

            // Slot should not be rendered
            expect(asset.shadowRoot?.querySelector('slot')).toBeFalsy();
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Priority Order
    // ──────────────────────────────────────────────────────────────

    describe('rendering priority', () => {
        test('should prioritize variant over src', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset variant="file" src="test.jpg" alt="Test"></swc-asset>
            `);

            // Should render file variant
            expect(
                asset.shadowRoot?.querySelector('.spectrum-Asset-file')
            ).toBeTruthy();

            // Should NOT render img element
            expect(asset.shadowRoot?.querySelector('img')).toBeFalsy();
        });

        test('should render src when variant is undefined', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset src="test.jpg" alt="Test"></swc-asset>
            `);

            // Should render img element
            expect(asset.shadowRoot?.querySelector('img')).toBeTruthy();

            // Should NOT render variant
            expect(
                asset.shadowRoot?.querySelector('.spectrum-Asset-file')
            ).toBeFalsy();
        });

        test('should render slot when both variant and src are undefined', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset>
                    <div>Slot content</div>
                </swc-asset>
            `);

            // Should render slot
            expect(asset.shadowRoot?.querySelector('slot')).toBeTruthy();

            // Should NOT render variant or img
            expect(
                asset.shadowRoot?.querySelector('.spectrum-Asset-file')
            ).toBeFalsy();
            expect(asset.shadowRoot?.querySelector('img')).toBeFalsy();
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Accessibility
    // ──────────────────────────────────────────────────────────────

    describe('accessibility', () => {
        test('should set aria-label on file variant svg', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset variant="file" label="Document.pdf"></swc-asset>
            `);

            const svg = asset.shadowRoot?.querySelector('.spectrum-Asset-file');
            expect(svg?.getAttribute('aria-label')).toBe('Document.pdf');
        });

        test('should set aria-label on folder variant svg', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset variant="folder" label="My Folder"></swc-asset>
            `);

            const svg = asset.shadowRoot?.querySelector(
                '.spectrum-Asset-folder'
            );
            expect(svg?.getAttribute('aria-label')).toBe('My Folder');
        });

        test('should set alt text on direct image', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset src="test.jpg" alt="Component asset"></swc-asset>
            `);

            const img = asset.shadowRoot?.querySelector('img');
            expect(img?.getAttribute('alt')).toBe('Component asset');
        });

        test('should allow empty alt for decorative images', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset src="test.jpg" alt=""></swc-asset>
            `);

            const img = asset.shadowRoot?.querySelector('img');
            expect(img?.getAttribute('alt')).toBe('');
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Events
    // ──────────────────────────────────────────────────────────────

    describe.skip('events', () => {
        // Asset component does not dispatch custom events currently
        // If you add image load/error events, test them here
    });
});
