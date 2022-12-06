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
    | { r: number; g: number; b: number; a?: number | string }
    | { r: string; g: string; b: string; a?: number | string }
    | { h: number; s: number; l: number; a?: number | string }
    | { h: string; s: string; l: string; a?: number | string }
    | { h: number; s: number; v: number; a?: number | string }
    | { h: string; s: string; v: string; a?: number | string };

export type { Color, ColorTypes };

export const extractHueSaturationValueAndAlphaRegExp =
    /^hsva?\s?\((\d{1,3}\.?\d*?)%?,?\s?(\d{1,3})%?,?\s?(\d{1,3})%?,?\s?(\d\.?\d?)?/;

export class ColorController {
    get color(): Color {
        return this._color;
    }

    set color(color: ColorTypes) {
        this._colorOrigin = color;
        let newColor!: Color;
        if (typeof color === 'string') {
            // HSV is not supported natively, manage it outself when encountered.
            const values = extractHueSaturationValueAndAlphaRegExp.exec(
                color as string
            );
            if (values !== null) {
                const [, h, s, v, a] = values;
                newColor = new Color(
                    'hsv',
                    [Number(h), Number(s), Number(v)],
                    Number(a) || 1
                );
            } else {
                try {
                    Color.parse(color);
                } catch (error) {
                    try {
                        newColor = new Color(`#${color}`);
                    } catch (error) {}
                }
            }
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

    _color = new Color('hsv', [0, 100, 100], 1);

    _colorOrigin!: ColorTypes;

    get colorValue(): ColorTypes {
        if (typeof this._colorOrigin === 'string') {
            let spaceId = '';
            if (
                extractHueSaturationValueAndAlphaRegExp.exec(
                    this._colorOrigin
                ) !== null
            ) {
                spaceId = 'hsv';
            } else {
                try {
                    ({ spaceId } = Color.parse(this._colorOrigin));
                } catch (error) {
                    spaceId = 'hex string';
                }
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
                default: {
                    const { r, g, b } = (this._color.to('srgb') as Color).srgb;
                    if (this._colorOrigin.startsWith('#')) {
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
                    if (this._colorOrigin.search('%') > -1) {
                        return `rgb(${Math.round(r * 100)}%, ${Math.round(
                            g * 100
                        )}%, ${Math.round(b * 100)}%)`;
                    }
                    return `rgb(${Math.round(r * 255)}, ${Math.round(
                        g * 255
                    )}, ${Math.round(b * 255)})`;
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

    private manageAs?: string;

    private _previousColor!: Color;

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
