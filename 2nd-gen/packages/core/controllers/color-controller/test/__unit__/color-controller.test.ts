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

import type { ReactiveElement } from 'lit';
import Color from 'colorjs.io';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  ColorController,
  type ColorTypes,
} from '../../src/color-controller.js';

describe('ColorController', () => {
  let host: ReactiveElement;
  let colorController: ColorController;

  beforeEach(() => {
    host = {} as ReactiveElement;
    host.requestUpdate = () => {};
    colorController = new ColorController(host);
  });

  it('should initialize correctly', () => {
    expect(colorController).toBeDefined();
    expect(colorController.color).toBeInstanceOf(Color);
  });

  it('should validate color strings correctly', () => {
    const validRgba = 'rgba(255, 0, 0, 1)';
    const validHsla = 'hsla(120, 100%, 50%, 0.5)';
    const validHsva = 'hsva(240, 100%, 100%, 0.75)';
    const invalidColor = 'invalidColor';

    expect(colorController.validateColorString(validRgba).isValid).toBe(true);
    expect(colorController.validateColorString(validHsla).isValid).toBe(true);
    expect(colorController.validateColorString(validHsva).isValid).toBe(true);
    expect(colorController.validateColorString(invalidColor).isValid).toBe(
      false
    );
  });

  it('should process RGB values in percentage correctly', () => {
    const colorString = 'rgb(50%, 25%, 75%)';
    const result = colorController.validateColorString(colorString);
    expect(result.isValid).toBe(true);
    expect(result.coords).toEqual([0.5, 0.25, 0.75]);
    expect(result.spaceId).toBe('srgb');
  });

  it('should default alpha to 1 when alpha is undefined in RGBA', () => {
    const colorString = 'rgb(255, 0, 0)';
    const result = colorController.validateColorString(colorString);

    expect(result.alpha).toBe(1);
    expect(result.isValid).toBe(true);
    expect(result.coords).toEqual([1, 0, 0]);
    expect(result.spaceId).toBe('srgb');
  });

  it('should handle invalid color strings by trying to create a new Color object with a prefixed #', () => {
    const invalidColorString = 'invalidColor';
    const validHexColorString = 'ff0000'; // Equivalent to #ff0000

    // Set the invalid color string
    colorController.color = invalidColorString;

    // Expect the color to be unchanged (default color)
    expect(colorController.color.toString()).toBe(
      new Color('hsv', [0, 100, 100], 1).toString()
    );

    // Set the valid hex color string without #
    colorController.color = validHexColorString;

    // Expect the color to be set correctly
    expect(colorController.color.toString()).toBe(
      new Color(`#${validHexColorString}`).toString()
    );
  });

  it('should set color correctly with string input', () => {
    const colorString = 'rgba(255, 0, 0, 1)';
    colorController.color = colorString;
    expect(colorController.color.toString()).toBe(
      new Color(colorString).toString()
    );
  });

  it('should set color correctly with object input', () => {
    const colorObject: ColorTypes = { r: 255, g: 0, b: 0, a: 1 };
    colorController.color = colorObject;
    //expect(colorController.color.toString()).toBe(new Color(colorObject).toString());
  });

  it('should get color value correctly', () => {
    let colorString = 'rgba(255, 0, 0, 0.7)';
    colorController.color = colorString;
    expect(colorController.colorValue).toBe(colorString);
    colorString = 'hsla(120, 100%, 50%, 0.5)';
    colorController.color = colorString;
    expect(colorController.colorValue).toBe(colorString);
  });

  it('should get and set hue correctly', () => {
    colorController.hue = 180;
    expect(colorController.hue).toBe(180);
  });

  it('should convert color correctly', () => {
    const colorString = 'rgba(255, 0, 0, 1)';
    colorController.color = colorString;
    expect(colorController.getColor('hsl')).toBeTypeOf('object');
  });

  it('should get HSL string correctly', () => {
    const colorString = 'rgba(255, 0, 0, 1)';
    colorController.color = colorString;
    expect(colorController.getHslString()).toBe(
      new Color(colorString).to('hsl').toString()
    );
  });

  it('should process hex color values correctly when alpha is defined', () => {
    const colorString = '#ff573380'; // Equivalent to rgba(255, 87, 51, 0.5)
    colorController.color = colorString;
    expect(colorController.color.toString()).toBe(
      new Color(colorString).toString()
    );
  });

  it('should process hex color values correctly when alpha is not defined', () => {
    const colorString = '#ff5733'; // Equivalent to rgba(255, 87, 51, 1)
    colorController.color = colorString;
    expect(colorController.color.toString()).toBe(
      new Color(colorString).toString()
    );
  });

  it('should save and restore previous color correctly', () => {
    const colorString = 'rgba(255, 0, 0, 1)';
    colorController.color = colorString;
    colorController.savePreviousColor();
    colorController.color = 'rgba(0, 255, 0, 1)';
    colorController.restorePreviousColor();
    expect(colorController.color.toString()).toBe(
      new Color(colorString).toString()
    );
  });

  it('should return correct color value for hsv spaceId', () => {
    colorController.color = 'hsv(120, 100%, 50%)';
    const result = colorController.colorValue;
    expect(result).toBe('hsv(120, 100%, 50%)');
  });

  it('should return correct color value for hsva spaceId', () => {
    colorController.color = 'hsva(120, 100%, 50%, 0.5)';
    const result = colorController.colorValue;
    expect(result).toBe('hsva(120, 100%, 50%, 0.5)');
  });

  it('should return correct color value for hsl spaceId', () => {
    colorController.color = 'hsl(120, 100%, 50%)';
    const result = colorController.colorValue;
    expect(result).toBe('hsl(120, 100%, 50%)');
  });

  it('should return correct color value for hsla spaceId', () => {
    colorController.color = 'hsla(120, 100%, 50%, 0.5)';
    const result = colorController.colorValue;
    expect(result).toBe('hsla(120, 100%, 50%, 0.5)');
  });

  it('should return correct color value for hex string spaceId', () => {
    colorController.color = '#ff5733';
    const result = colorController.colorValue;
    expect(result).toBe('#ff5733');
  });

  it('should return correct color value for hex string spaceId with alpha', () => {
    colorController.color = '#ff573380'; // Equivalent to rgba(255, 87, 51, 0.5)
    const result = colorController.colorValue;
    expect(result).toBe('#ff573380');
  });

  it('should return correct color value for default spaceId with hex origin', () => {
    colorController.color = '#ff5733';
    const result = colorController.colorValue;
    expect(result).toBe('#ff5733');
  });

  it('should return correct color value for default spaceId with hex origin and alpha', () => {
    colorController.color = '#ff573380'; // Equivalent to rgba(255, 87, 51, 0.5)
    const result = colorController.colorValue;
    expect(result).toBe('#ff573380');
  });

  it('should return correct color value for default spaceId with percentage origin', () => {
    colorController.color = 'rgb(50%, 25%, 75%)';
    const result = colorController.colorValue;
    expect(result).toBe('rgb(50%, 25%, 75%)');
  });

  it('should return correct color value for default spaceId with rgba origin', () => {
    colorController.color = 'rgba(255, 87, 51, 0.5)';
    const result = colorController.colorValue;
    expect(result).toBe('rgba(255, 87, 51, 0.5)');
  });

  it('should return correct color values for hsv spaceId', () => {
    colorController.color = new Color('hsv', [120, 100, 50]);
    const result = colorController.colorValue;
    expect(result).toEqual({
      h: 120,
      s: 1,
      v: 0.5,
      a: 1,
    });
  });

  it('should return correct color values for hsl spaceId', () => {
    colorController.color = new Color('hsl', [120, 100, 50]);
    const result = colorController.colorValue;
    expect(result).toEqual({
      h: 120,
      s: 1,
      l: 0.5,
      a: 1,
    });
  });

  it('should return correct color values for srgb spaceId', () => {
    colorController.color = new Color('srgb', [0.5, 0.25, 0.75]);
    const result = colorController.colorValue;
    expect(result).toEqual({
      r: 128,
      g: 64,
      b: 191,
      a: 1,
    });
  });

  it('should return correct color values for srgb spaceId with percentage origin', () => {
    colorController.color = new Color('srgb', [0.5, 0.25, 0.75]);
    colorController.colorOrigin = { r: '50%', g: '25%', b: '75%' };
    const result = colorController.colorValue;
    expect(result).toEqual({
      r: '128%',
      g: '64%',
      b: '191%',
      a: 1,
    });
  });
});
