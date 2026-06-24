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
import { nothing } from 'lit';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import Color from 'colorjs.io';

import { ColorController, type ColorTypes } from '../index.js';

/**
 * `ColorController` renders no DOM, so these are pure-logic assertions wrapped in
 * Storybook `play` functions. Each story instantiates the controller against a
 * minimal fake host and verifies behaviour; no story renders a component.
 */
export default {
  title: 'Controllers/Color controller/Tests',
  parameters: { docs: { disable: true, page: null } },
  tags: ['!autodocs', 'dev'],
} as Meta;

/** Creates a controller bound to a minimal, non-rendering host. */
function createController(): ColorController {
  const host = {} as ReactiveElement;
  host.requestUpdate = (): void => {};
  return new ColorController(host);
}

const noRender = (): typeof nothing => nothing;

export const Initialization: Story = {
  render: noRender,
  play: async () => {
    const colorController = createController();
    expect(colorController).toBeDefined();
    expect(colorController.color).toBeInstanceOf(Color);
  },
};

export const ValidatesColorStrings: Story = {
  render: noRender,
  play: async () => {
    const colorController = createController();

    expect(
      colorController.validateColorString('rgba(255, 0, 0, 1)').isValid
    ).toBe(true);
    expect(
      colorController.validateColorString('hsla(120, 100%, 50%, 0.5)').isValid
    ).toBe(true);
    expect(
      colorController.validateColorString('hsva(240, 100%, 100%, 0.75)').isValid
    ).toBe(true);
    expect(colorController.validateColorString('invalidColor').isValid).toBe(
      false
    );

    const percentage =
      colorController.validateColorString('rgb(50%, 25%, 75%)');
    expect(percentage.isValid).toBe(true);
    expect(percentage.coords).toEqual([0.5, 0.25, 0.75]);
    expect(percentage.spaceId).toBe('srgb');

    const noAlpha = colorController.validateColorString('rgb(255, 0, 0)');
    expect(noAlpha.alpha).toBe(1);
    expect(noAlpha.isValid).toBe(true);
    expect(noAlpha.coords).toEqual([1, 0, 0]);
    expect(noAlpha.spaceId).toBe('srgb');
  },
};

export const SetsColor: Story = {
  render: noRender,
  play: async () => {
    const colorController = createController();

    // Invalid string leaves the default color untouched.
    colorController.color = 'invalidColor';
    expect(colorController.color.toString()).toBe(
      new Color('hsv', [0, 100, 100], 1).toString()
    );

    // A bare hex (no `#`) is parsed by prefixing `#`.
    colorController.color = 'ff0000';
    expect(colorController.color.toString()).toBe(
      new Color('#ff0000').toString()
    );

    // String input.
    colorController.color = 'rgba(255, 0, 0, 1)';
    expect(colorController.color.toString()).toBe(
      new Color('rgba(255, 0, 0, 1)').toString()
    );

    // Object input is accepted without throwing.
    const colorObject: ColorTypes = { r: 255, g: 0, b: 0, a: 1 };
    colorController.color = colorObject;

    // Hex with and without alpha.
    colorController.color = '#ff573380';
    expect(colorController.color.toString()).toBe(
      new Color('#ff573380').toString()
    );
    colorController.color = '#ff5733';
    expect(colorController.color.toString()).toBe(
      new Color('#ff5733').toString()
    );
  },
};

export const HueConversionAndPreviousColor: Story = {
  render: noRender,
  play: async () => {
    const colorController = createController();

    colorController.hue = 180;
    expect(colorController.hue).toBe(180);

    colorController.color = 'rgba(255, 0, 0, 1)';
    expect(typeof colorController.getColor('hsl')).toBe('object');
    expect(colorController.getHslString()).toBe(
      new Color('rgba(255, 0, 0, 1)').to('hsl').toString()
    );

    colorController.color = 'rgba(255, 0, 0, 1)';
    colorController.savePreviousColor();
    colorController.color = 'rgba(0, 255, 0, 1)';
    colorController.restorePreviousColor();
    expect(colorController.color.toString()).toBe(
      new Color('rgba(255, 0, 0, 1)').toString()
    );
  },
};

export const ColorValueStringRoundTrips: Story = {
  render: noRender,
  play: async () => {
    const colorController = createController();

    const roundTrips = [
      'rgba(255, 0, 0, 0.7)',
      'hsla(120, 100%, 50%, 0.5)',
      'hsv(120, 100%, 50%)',
      'hsva(120, 100%, 50%, 0.5)',
      'hsl(120, 100%, 50%)',
      '#ff5733',
      '#ff573380',
      'rgb(50%, 25%, 75%)',
      'rgba(255, 87, 51, 0.5)',
    ];

    for (const value of roundTrips) {
      colorController.color = value;
      expect(colorController.colorValue).toBe(value);
    }
  },
};

export const ColorValueObjects: Story = {
  render: noRender,
  play: async () => {
    const colorController = createController();

    colorController.color = new Color('hsv', [120, 100, 50]);
    expect(colorController.colorValue).toEqual({ h: 120, s: 1, v: 0.5, a: 1 });

    colorController.color = new Color('hsl', [120, 100, 50]);
    expect(colorController.colorValue).toEqual({ h: 120, s: 1, l: 0.5, a: 1 });

    colorController.color = new Color('srgb', [0.5, 0.25, 0.75]);
    expect(colorController.colorValue).toEqual({
      r: 128,
      g: 64,
      b: 191,
      a: 1,
    });

    colorController.color = new Color('srgb', [0.5, 0.25, 0.75]);
    colorController.colorOrigin = { r: '50%', g: '25%', b: '75%' };
    expect(colorController.colorValue).toEqual({
      r: '128%',
      g: '64%',
      b: '191%',
      a: 1,
    });
  },
};
