/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { expect } from '@open-wc/testing';
import { ReactiveElement } from 'lit';
import Color from 'colorjs.io';
import {
    ColorController,
    ColorTypes,
} from '@spectrum-web-components/reactive-controllers/src/ColorController.js';

describe('ColorController', () => {
    let host: ReactiveElement;
    let colorController: ColorController;

    beforeEach(() => {
        host = {} as ReactiveElement;
        host.requestUpdate = () => {};
        colorController = new ColorController(host);
    });

    it('should initialize correctly', () => {
        expect(colorController).to.exist;
        expect(colorController.color).to.be.instanceOf(Color);
    });

    it('should validate color strings correctly', () => {
        const validRgba = 'rgba(255, 0, 0, 1)';
        const validHsla = 'hsla(120, 100%, 50%, 0.5)';
        const validHsva = 'hsva(240, 100%, 100%, 0.75)';
        const invalidColor = 'invalidColor';

        expect(colorController.validateColorString(validRgba).isValid).to.be
            .true;
        expect(colorController.validateColorString(validHsla).isValid).to.be
            .true;
        expect(colorController.validateColorString(validHsva).isValid).to.be
            .true;
        expect(colorController.validateColorString(invalidColor).isValid).to.be
            .false;
    });

    it('should set color correctly with string input', () => {
        const colorString = 'rgba(255, 0, 0, 1)';
        colorController.color = colorString;
        expect(colorController.color.toString()).to.equal(
            new Color(colorString).toString()
        );
    });

    it('should set color correctly with object input', () => {
        const colorObject: ColorTypes = { r: 255, g: 0, b: 0, a: 1 };
        colorController.color = colorObject;
        //expect(colorController.color.toString()).to.equal(new Color(colorObject).toString());
    });

    it('should get color value correctly', () => {
        let colorString = 'rgba(255, 0, 0, 0.7)';
        colorController.color = colorString;
        expect(colorController.colorValue).to.equal(colorString);
        colorString = 'hsla(120, 100%, 50%, 0.5)';
        colorController.color = colorString;
        expect(colorController.colorValue).to.equal(colorString);
    });

    it('should get and set hue correctly', () => {
        colorController.hue = 180;
        expect(colorController.hue).to.equal(180);
    });

    it('should convert color correctly', () => {
        const colorString = 'rgba(255, 0, 0, 1)';
        colorController.color = colorString;
        expect(colorController.getColor('hsl')).to.be.an('object');
    });

    it('should get HSL string correctly', () => {
        const colorString = 'rgba(255, 0, 0, 1)';
        colorController.color = colorString;
        expect(colorController.getHslString()).to.equal(
            new Color(colorString).to('hsl').toString()
        );
    });

    it('should save and restore previous color correctly', () => {
        const colorString = 'rgba(255, 0, 0, 1)';
        colorController.color = colorString;
        colorController.savePreviousColor();
        colorController.color = 'rgba(0, 255, 0, 1)';
        colorController.restorePreviousColor();
        expect(colorController.color.toString()).to.equal(
            new Color(colorString).toString()
        );
    });
});
