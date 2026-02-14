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
            expect(asset.error).toBe(false);
        });
    });

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

    describe('slots', () => {
        test('should render slot content when no variant is set', async () => {
            const asset = await fixture(html`
                <swc-asset>
                    <img src="slotted.jpg" alt="Slotted" />
                </swc-asset>
            `);

            const slottedImg = asset.querySelector('img');
            expect(slottedImg).toBeTruthy();
            expect(slottedImg?.getAttribute('src')).toBe('slotted.jpg');

            expect(
                asset.shadowRoot?.querySelector('.spectrum-Asset')
            ).toBeTruthy();
            expect(asset.shadowRoot?.querySelector('slot')).toBeTruthy();
        });

        test('should prefer variant over slot', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset variant="file">
                    <img src="slotted.jpg" alt="Should not render" />
                </swc-asset>
            `);

            expect(
                asset.shadowRoot?.querySelector('.spectrum-Asset-file')
            ).toBeTruthy();
            expect(asset.shadowRoot?.querySelector('slot')).toBeFalsy();
        });
    });

    describe('rendering priority', () => {
        test('should prioritize error over variant', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset variant="file" error label="Error"></swc-asset>
            `);

            expect(
                asset.shadowRoot?.querySelector('.spectrum-Asset--error')
            ).toBeTruthy();
            expect(
                asset.shadowRoot?.querySelector('.spectrum-Asset-error')
            ).toBeTruthy();
            expect(
                asset.shadowRoot?.querySelector('.spectrum-Asset-file')
            ).toBeFalsy();
        });

        test('should prioritize variant over slot', async () => {
            const asset = await fixture<Asset>(html`
                <swc-asset variant="file">
                    <div>Slot content</div>
                </swc-asset>
            `);

            expect(
                asset.shadowRoot?.querySelector('.spectrum-Asset-file')
            ).toBeTruthy();
            expect(asset.shadowRoot?.querySelector('slot')).toBeFalsy();
        });

        test('should render slot when variant is undefined', async () => {
            const asset = await fixture(html`
                <swc-asset>
                    <div>Slot content</div>
                </swc-asset>
            `);

            expect(asset.shadowRoot?.querySelector('slot')).toBeTruthy();
            expect(
                asset.shadowRoot?.querySelector('.spectrum-Asset-file')
            ).toBeFalsy();
        });
    });

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
    });
});
