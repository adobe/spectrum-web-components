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

import type { ReactiveElement } from 'lit';
import Color from 'colorjs.io';
import type {
    ColorObject,
    ColorTypes as DefaultColorTypes,
} from 'colorjs.io/types/src/color';
import type ColorSpace from 'colorjs.io/types/src/space';

type ColorTypes =
    | DefaultColorTypes
    | {
          r: number | string;
          g: number | string;
          b: number | string;
          a?: number | string;
      }
    | {
          h: number | string;
          s: number | string;
          l: number | string;
          a?: number | string;
      }
    | {
          h: number | string;
          s: number | string;
          v: number | string;
          a?: number | string;
      };

export type { Color, ColorTypes };
type ColorValidationResult = {
    spaceId: string | null;
    coords: number[];
    isValid: boolean;
    alpha: number;
};
export const extractHueSaturationValueAndAlphaRegExp =
    /^hsva?\s?\((\d{1,3}\.?\d*?)%?,?\s?(\d{1,3})%?,?\s?(\d{1,3})%?,?\s?(\d\.?\d?)?/;

export class ColorController {
    get color(): Color {
        return this._color;
    }

    public validateColorString(color: string): ColorValidationResult {
        const result: ColorValidationResult = {
            spaceId: null,
            coords: [0, 0, 0],
            isValid: false,
            alpha: 1,
        };

        const rgbRegExpArray = [
            /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d*\.?\d+)\s*\)/i,
            /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i,
            /^rgba\s+(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s+(0|0?\.\d+|1)\s*$/i,
            /^rgb\s+(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*$/i,
            /^rgba\(\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s+(\d*\.?\d+)\s*\)$/i,
            /^rgb\(\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*\)$/i,
            /rgb\(\s*(100|[0-9]{1,2}%)\s*,\s*(100|[0-9]{1,2}%)\s*,\s*(100|[0-9]{1,2}%)\s*\)/i,
            /rgba\(\s*(100|[0-9]{1,2})%\s*,\s*(100|[0-9]{1,2})%\s*,\s*(100|[0-9]{1,2})%\s*,\s*(\d*\.?\d+)\s*\)/i,
        ];
        const hslRegExpArray = [
            /hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*(\d*\.?\d+)\s*\)/i,
            /hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*\)/i,
            /^hsla\s+(\d{1,3})\s+(\d{1,3}%?)\s+(\d{1,3}%?)\s+(\d*\.?\d+)\s*$/i,
            /^hsl\s+(\d{1,3})\s+(\d{1,3}%?)\s+(\d{1,3}%?)\s*$/i,
            /^hsla\(\s*(\d{1,3})\s+(\d{1,3}%?)\s+(\d{1,3}%?)\s+(\d*\.?\d+)\s*\)$/i,
            /^hsl\(\s*(\d{1,3})\s+(\d{1,3}%?)\s+(\d{1,3}%?)\s*\)$/i,
        ];
        const hsvRegExpArray = [
            /hsva\(\s*(\d{1,3})\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*(\d*\.?\d+)\s*\)/i,
            /hsv\(\s*(\d{1,3})\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*\)/i,
            /^hsva\s+(\d{1,3})\s+(\d{1,3}%?)\s+(\d{1,3}%?)\s+(\d*\.?\d+)\s*$/i,
            /^hsv\s+(\d{1,3})\s+(\d{1,3}%?)\s+(\d{1,3}%?)\s*$/i,
            /^hsva\(\s*(\d{1,3})\s+(\d{1,3}%?)\s+(\d{1,3}%?)\s+(\d*\.?\d+)\s*\)$/i,
            /^hsv\(\s*(\d{1,3})\s+(\d{1,3}%?)\s+(\d{1,3}%?)\s*\)$/i,
        ];
        const hexRegExpArray = [
            /^#([A-Fa-f0-9]{6})(?:\s*([01](?:\.\d+)?))?$/,
            /^#([A-Fa-f0-9]{3})(?:\s*([01](?:\.\d+)?))?$/,
        ];

        const rgbaMatch = rgbRegExpArray
            .find((regex) => regex.test(color))
            ?.exec(color);
        const hslaMatch = hslRegExpArray
            .find((regex) => regex.test(color))
            ?.exec(color);
        const hsvaMatch = hsvRegExpArray
            .find((regex) => regex.test(color))
            ?.exec(color);
        const hexMatch = hexRegExpArray
            .find((regex) => regex.test(color))
            ?.exec(color);

        if (rgbaMatch) {
            const [, r, g, b, a] = rgbaMatch.filter(
                (element) => typeof element === 'string'
            );
            const alpha = a === undefined ? 1 : Number(a);
            const processValue = (value: string): number => {
                if (value.includes('%')) {
                    return Number(value.replace('%', '')) / 100;
                } else {
                    return Number(value) / 255;
                }
            };
            const numericR = processValue(r);
            const numericG = processValue(g);
            const numericB = processValue(b);

            result.spaceId = 'srgb';
            result.coords = [numericR, numericG, numericB];
            result.alpha = alpha;
            result.isValid =
                numericR >= 0 &&
                numericR <= 1 &&
                numericG >= 0 &&
                numericG <= 1 &&
                numericB >= 0 &&
                numericB <= 1 &&
                alpha >= 0 &&
                alpha <= 1;
        } else if (hslaMatch) {
            const [, h, s, l, a] = hslaMatch;
            const values = [h, s, l, a === undefined ? '1' : a].map((value) =>
                Number(value.replace(/[^\d.]/g, ''))
            );
            const [numericH, numericS, numericL, numericA] = values;

            result.spaceId = 'hsl';
            result.coords = [numericH, numericS, numericL];
            result.alpha = numericA;
            result.isValid =
                numericH >= 0 &&
                numericH <= 360 &&
                numericS >= 0 &&
                numericS <= 100 &&
                numericL >= 0 &&
                numericL <= 100 &&
                numericA >= 0 &&
                numericA <= 1;
        } else if (hsvaMatch) {
            const [, h, s, v, a] = hsvaMatch;
            const values = [h, s, v, a === undefined ? '1' : a].map((value) =>
                Number(value.replace(/[^\d.]/g, ''))
            );
            const [numericH, numericS, numericV, numericA] = values;

            result.spaceId = 'hsv';
            result.coords = [numericH, numericS, numericV];
            result.alpha = numericA;
            result.isValid =
                numericH >= 0 &&
                numericH <= 360 &&
                numericS >= 0 &&
                numericS <= 100 &&
                numericV >= 0 &&
                numericV <= 100 &&
                numericA >= 0 &&
                numericA <= 1;
        } else if (hexMatch) {
            const [, hex, alpha] = hexMatch;

            // Function to process 2-digit or repeated 1-digit hex
            const processHex = (hex: string): number => {
                // For 3-digit hex values, repeat each digit
                if (hex.length === 1) {
                    hex = hex + hex;
                }
                return parseInt(hex, 16) / 255;
            };

            // Handle both 3-digit and 6-digit hex
            let numericR, numericG, numericB;
            if (hex.length === 3) {
                // 3-digit hex (e.g., #3a7 -> #33aa77)
                numericR = processHex(hex.substring(0, 1));
                numericG = processHex(hex.substring(1, 2));
                numericB = processHex(hex.substring(2, 3));
            } else {
                // 6-digit hex (e.g., #33aa77)
                numericR = processHex(hex.substring(0, 2));
                numericG = processHex(hex.substring(2, 4));
                numericB = processHex(hex.substring(4, 6));
            }

            // Numeric alpha: if not provided, default to 1
            const numericA = alpha ? Number(alpha) : 1;

            // Validate the color values
            result.spaceId = 'srgb';
            result.coords = [numericR, numericG, numericB];
            result.alpha = numericA;
            result.isValid =
                numericR >= 0 &&
                numericR <= 1 &&
                numericG >= 0 &&
                numericG <= 1 &&
                numericB >= 0 &&
                numericB <= 1 &&
                numericA >= 0 &&
                numericA <= 1;
        }

        return result;
    }

    _color: Color = new Color('hsv', [0, 100, 100], 1);

    _colorOrigin!: ColorTypes;

    private manageAs?: string;

    private _previousColor!: Color;

    set color(color: ColorTypes) {
        this._colorOrigin = color;
        let newColor!: Color;
        if (typeof color === 'string') {
            const colorValidationResult = this.validateColorString(
                color as string
            );
            if (colorValidationResult.isValid) {
                const [coord1, coord2, coord3] = colorValidationResult.coords;
                newColor = new Color(
                    `${colorValidationResult.spaceId}`,
                    [coord1, coord2, coord3],
                    colorValidationResult.alpha
                );
            } else {
                try {
                    Color.parse(color);
                } catch (error) {
                    try {
                        newColor = new Color(`#${color}`);
                    } catch (error) {
                        return;
                    }
                }
            }
        } else if (color instanceof Color) {
            newColor = color;
        } else if (!Array.isArray(color)) {
            const { h, s, l, v, r, g, b, a } = color as {
                h: string;
                s: string;
                l: string;
                v: string;
                r: string;
                g: string;
                b: string;
                a?: string;
            };
            if (typeof h !== 'undefined' && typeof s !== 'undefined') {
                const lv = l ?? v;
                newColor = new Color(
                    typeof l !== 'undefined' ? 'hsl' : 'hsv',
                    [
                        parseFloat(h),
                        typeof s !== 'string' ? s * 100 : parseFloat(s),
                        typeof lv !== 'string' ? lv * 100 : parseFloat(lv),
                    ],
                    parseFloat(a || '1')
                );
            } else if (
                typeof r !== 'undefined' &&
                typeof g !== 'undefined' &&
                typeof b !== 'undefined'
            ) {
                newColor = new Color(
                    'srgb',
                    [
                        parseFloat(r) / 255,
                        parseFloat(g) / 255,
                        parseFloat(b) / 255,
                    ],
                    parseFloat(a || '1')
                );
            }
        }

        if (!newColor) {
            newColor = new Color(color as DefaultColorTypes);
        }

        if (this.manageAs) {
            this._color = newColor.to(this.manageAs) as Color;
        } else {
            this._color = newColor;
        }
        this.host.requestUpdate();
    }

    get colorValue(): ColorTypes {
        if (typeof this._colorOrigin === 'string') {
            let spaceId = '';
            if (this._colorOrigin.startsWith('#')) {
                spaceId = 'hex string';
            } else if (this._colorOrigin.startsWith('rgb')) {
                spaceId = 'rgb';
            } else if (this._colorOrigin.startsWith('hsl')) {
                spaceId = 'hsl';
            } else if (this._colorOrigin.startsWith('hsv')) {
                spaceId = 'hsv';
            } else {
                spaceId = 'hex';
            }
            switch (spaceId) {
                case 'hsv': {
                    const hadAlpha = this._colorOrigin[3] === 'a';
                    const { h, s, v } = (this._color.to('hsv') as Color).hsv;
                    const a = this._color.alpha;
                    return `hsv${hadAlpha ? `a` : ''}(${Math.round(
                        h
                    )}, ${Math.round(s)}%, ${Math.round(v)}%${
                        hadAlpha ? `, ${a}` : ''
                    })`;
                }
                case 'hsl': {
                    const hadAlpha = this._colorOrigin[3] === 'a';
                    const { h, s, l } = (this._color.to('hsl') as Color).hsl;
                    const a = this._color.alpha;
                    return `hsl${hadAlpha ? `a` : ''}(${Math.round(
                        h
                    )}, ${Math.round(s)}%, ${Math.round(l)}%${
                        hadAlpha ? `, ${a}` : ''
                    })`;
                }
                case 'hex string': {
                    const { r, g, b } = (this._color.to('srgb') as Color).srgb;
                    const hadAlpha =
                        this._colorOrigin.length === 5 ||
                        this._colorOrigin.length === 9;
                    const a = this._color.alpha;
                    const rHex = Math.round(r * 255).toString(16);
                    const gHex = Math.round(g * 255).toString(16);
                    const bHex = Math.round(b * 255).toString(16);
                    const aHex = Math.round(a * 255).toString(16);
                    return `#${rHex.padStart(2, '0')}${gHex.padStart(
                        2,
                        '0'
                    )}${bHex.padStart(2, '0')}${
                        hadAlpha ? aHex.padStart(2, '0') : ''
                    }`;
                }
                case 'hex': {
                    const { r, g, b } = (this._color.to('srgb') as Color).srgb;
                    const hadAlpha =
                        this._colorOrigin.length === 4 ||
                        this._colorOrigin.length === 8;
                    const a = this._color.alpha;
                    const rHex = Math.round(r * 255).toString(16);
                    const gHex = Math.round(g * 255).toString(16);
                    const bHex = Math.round(b * 255).toString(16);
                    const aHex = Math.round(a * 255).toString(16);
                    return `${rHex.padStart(2, '0')}${gHex.padStart(
                        2,
                        '0'
                    )}${bHex.padStart(2, '0')}${
                        hadAlpha ? aHex.padStart(2, '0') : ''
                    }`;
                }
                //rgb
                default: {
                    const { r, g, b } = (this._color.to('srgb') as Color).srgb;
                    const hadAlpha = this._colorOrigin[3] === 'a';
                    const a = this._color.alpha;
                    if (this._colorOrigin.search('%') > -1) {
                        return `rgb${hadAlpha ? `a` : ''}(${Math.round(r * 100)}%, ${Math.round(
                            g * 100
                        )}%, ${Math.round(b * 100)}%${hadAlpha ? `,${Math.round(a * 100)}%` : ''})`;
                    }
                    return `rgb${hadAlpha ? `a` : ''}(${Math.round(r * 255)}, ${Math.round(
                        g * 255
                    )}, ${Math.round(b * 255)}${hadAlpha ? `, ${a}` : ''})`;
                }
            }
        }
        let spaceId;
        if (this._colorOrigin) {
            try {
                ({ spaceId } = new Color(
                    this._colorOrigin as DefaultColorTypes
                ));
            } catch (error) {
                const { h, s, l, v, r, g, b } = this._colorOrigin as {
                    h: string;
                    s: string;
                    l: string;
                    v: string;
                    r: string;
                    g: string;
                    b: string;
                };
                if (
                    typeof h !== 'undefined' &&
                    typeof s !== 'undefined' &&
                    typeof l !== 'undefined'
                ) {
                    spaceId = 'hsl';
                } else if (
                    typeof h !== 'undefined' &&
                    typeof s !== 'undefined' &&
                    typeof v !== 'undefined'
                ) {
                    spaceId = 'hsv';
                } else if (
                    typeof r !== 'undefined' &&
                    typeof g !== 'undefined' &&
                    typeof b !== 'undefined'
                ) {
                    spaceId = 'srgb';
                }
            }
        } else {
            ({ spaceId } = this.color);
        }
        switch (spaceId) {
            case 'hsv': {
                const { h, s, v } = (this._color.to('hsv') as Color).hsv;
                return {
                    h,
                    s: s / 100,
                    v: v / 100,
                    a: this._color.alpha,
                };
            }
            case 'hsl': {
                const { h, s, l } = (this._color.to('hsl') as Color).hsl;
                return {
                    h,
                    s: s / 100,
                    l: l / 100,
                    a: this._color.alpha,
                };
            }
            case 'srgb': {
                const { r, g, b } = (this._color.to('srgb') as Color).srgb;
                if (
                    this._colorOrigin &&
                    typeof (this._colorOrigin as { r: string }).r ===
                        'string' &&
                    (this._colorOrigin as { r: string }).r.search('%')
                ) {
                    return {
                        r: `${Math.round(r * 255)}%`,
                        g: `${Math.round(g * 255)}%`,
                        b: `${Math.round(b * 255)}%`,
                        a: this._color.alpha,
                    };
                }
                return {
                    r: Math.round(r * 255),
                    g: Math.round(g * 255),
                    b: Math.round(b * 255),
                    a: this._color.alpha,
                };
            }
        }
        return this._color;
    }

    protected host: ReactiveElement;

    get hue(): number {
        return Number((this._color.to('hsl') as Color).hsl.h);
    }

    set hue(hue: number) {
        this._color.set('h', hue);
        this.host.requestUpdate();
    }

    constructor(
        host: ReactiveElement,
        {
            manageAs,
        }: {
            manageAs?: string;
        } = {}
    ) {
        this.host = host;
        this.manageAs = manageAs;
    }

    getColor(format: string | ColorSpace): ColorObject {
        const validFormats = ['srgb', 'hsva', 'hsv', 'hsl', 'hsla'];
        if (typeof format === 'string' && !validFormats.includes(format)) {
            throw new Error('not a valid format');
        }

        return this._color.to(format);
    }

    getHslString(): string {
        return this._color.to('hsl').toString();
    }

    savePreviousColor(): void {
        this._previousColor = this._color.clone();
    }

    restorePreviousColor(): void {
        this._color = this._previousColor;
    }
}
