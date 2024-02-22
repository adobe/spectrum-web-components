/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { elementUpdated, expect, fixture } from '@open-wc/testing';
import { ColorField } from '@spectrum-web-components/color-field';

import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { Template } from '../stories/template.js';

describe('ColorField', () => {
    testForLitDevWarnings(async () => await fixture<ColorField>(Template({})));
    it('loads default color-field accessibly', async () => {
        const el = await fixture<ColorField>(
            Template({ label: 'Enter color value' })
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('validates rgba color values', async () => {
        const el = await fixture<ColorField>(Template({}));

        el.value = 'rgba(255, 0, 0, 1)';
        expect(el.checkValidity()).to.be.true;

        el.value = 'rgba(255, 0, 0, 0.5)';
        expect(el.checkValidity()).to.be.true;

        el.value = 'rgba(255, 0, 0)';

        expect(el.checkValidity()).to.be.false;
    });

    it('validates hex color values', async () => {
        const el = await fixture<ColorField>(Template({}));

        el.value = '#ff0000';
        expect(el.checkValidity()).to.be.true;

        el.value = '#f00';
        expect(el.checkValidity()).to.be.true;

        el.value = '##F00000000000';
        expect(el.checkValidity()).to.be.false;
    });

    it('validates hsl color values', async () => {
        const el = await fixture<ColorField>(Template({}));

        el.value = 'hsl(120, 100%, 50%)';
        expect(el.checkValidity()).to.be.true;

        el.value = 'hsl(120, 50%, 50%)';
        expect(el.checkValidity()).to.be.true;

        el.value = 'hsl(120, 50%)';
        expect(el.checkValidity()).to.be.false;
    });

    it('validates hsv color values', async () => {
        const el = await fixture<ColorField>(Template({}));

        el.value = 'hsv(120, 100%, 50%)';
        expect(el.checkValidity()).to.be.true;

        el.value = 'hsv(120, 50%, 50%)';
        expect(el.checkValidity()).to.be.true;

        el.value = 'hsv(120, 50%)';
        expect(el.checkValidity()).to.be.false;
    });

    it('handles invalid color values', async () => {
        const el = await fixture<ColorField>(Template({}));

        el.value = 'not a color';
        await elementUpdated(el);

        expect(el.checkValidity()).to.be.false;
    });

    it('renders color handle when viewColor is true', async () => {
        const el = await fixture<ColorField>(Template({}));

        el.viewColor = true;
        await elementUpdated(el);

        const colorHandle = el.shadowRoot.querySelector('sp-color-handle');
        expect(colorHandle).to.not.be.null;
    });

    it('does not render color handle when viewColor is false', async () => {
        const el = await fixture<ColorField>(Template({}));

        el.viewColor = false;
        await elementUpdated(el);

        const colorHandle = el.shadowRoot.querySelector('sp-color-handle');
        expect(colorHandle).to.be.null;
    });
});
