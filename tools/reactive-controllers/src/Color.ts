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
import { HSL, HSLA, HSV, HSVA, RGB, RGBA, TinyColor } from '@ctrl/tinycolor';
export type { HSL, HSLA, HSV, HSVA, RGB, RGBA, TinyColor };

export type ColorValue =
    | string
    | number
    | TinyColor
    | HSVA
    | HSV
    | RGB
    | RGBA
    | HSL
    | HSLA;

export const extractHueAndSaturationRegExp =
    /^hs[v|l]a?\s?\((\d{1,3}\.?\d*?),?\s?(\d{1,3})/;
export const replaceHueAndSaturationRegExp =
    /(^hs[v|l]a?\s?\()\d{1,3}\.?\d*?(,?\s?)\d{1,3}/;
export const replaceHueRegExp = /(^hs[v|l]a?\()\d{1,3}/;

type TinyColorToValue = {
    toHex: ColorValue;
    toHexString: ColorValue;
    toHsv: ColorValue;
    toHsvString: ColorValue;
    toHsl: ColorValue;
    toHslString: ColorValue;
    toHex8: ColorValue;
    toHex8String: ColorValue;
    toPercentageRgb: ColorValue;
    toPercentageRgbString: ColorValue;
    toRgb: ColorValue;
    toRgbString: ColorValue;
};

const getHexValue = (color: TinyColor, isString: boolean): ColorValue =>
    isString ? color.toHexString() : color.toHex();

export class ColorController {
    protected host: ReactiveElement;

    protected applyColorToState!: ({
        h,
        s,
        v,
    }: {
        h: number;
        s: number;
        v: number;
    }) => void;

    protected extractColorFromState!: (
        controller: ColorController
    ) => ColorValue;

    protected setColorProcess(
        currentColor: TinyColor,
        nextColor: ColorValue,
        format: string,
        isString: boolean
    ): void {
        if (this.maintains === 'hue') {
            this.setColorMaintainHue(currentColor, nextColor, format, isString);
        } else if (this.maintains === 'saturation') {
            this.setColorMaintainSaturation(
                currentColor,
                nextColor,
                format,
                isString
            );
        }
    }

    protected setColorMaintainHue(
        currentColor: TinyColor,
        nextColor: ColorValue,
        format: string,
        isString: boolean
    ): void {
        const { h, s, v } = this._color.toHsv();
        let originalHue: number | undefined = undefined;

        if (isString && format.startsWith('hs')) {
            const values = extractHueAndSaturationRegExp.exec(
                nextColor as string
            );

            if (values !== null) {
                const [, h] = values;
                originalHue = Number(h);
            }
        } else if (!isString && format.startsWith('hs')) {
            const colorInput = currentColor.originalInput;
            const colorValues = Object.values(colorInput);
            originalHue = colorValues[0];
        }

        this.hue = originalHue || h;
        this.applyColorToState({ h, s, v });
    }

    protected setColorMaintainSaturation(
        currentColor: TinyColor,
        nextColor: ColorValue,
        format: string,
        isString: boolean
    ): void {
        if (isString && format.startsWith('hs')) {
            const values = extractHueAndSaturationRegExp.exec(
                nextColor as string
            );

            if (values !== null) {
                const [, h, s] = values;
                this.hue = Number(h);
                this.saturation = Number(s);
            }
        } else if (!isString && format.startsWith('hs')) {
            const colorInput = currentColor.originalInput;
            const colorValues = Object.values(colorInput);
            this.hue = colorValues[0];
            this.saturation = colorValues[1];
        } else {
            const { h } = currentColor.toHsv();
            this.hue = h;
        }
        this.applyColorToState(currentColor.toHsv());
    }

    protected maintains: 'hue' | 'saturation' = 'hue';
    private saturation!: number;

    constructor(
        host: ReactiveElement,
        {
            applyColorToState,
            extractColorFromState,
            maintains,
        }: {
            applyColorToState({
                h,
                s,
                v,
            }: {
                h: number;
                s: number;
                v: number;
            }): void;
            extractColorFromState(controller: ColorController): ColorValue;
            maintains?: 'hue' | 'saturation';
        }
    ) {
        this.host = host;
        this.applyColorToState = applyColorToState;
        this.extractColorFromState = extractColorFromState;
        this.maintains = maintains || this.maintains;
    }

    public applyColorFromState(): void {
        this._color = new TinyColor(this.extractColorFromState(this));
    }

    public get hue(): number {
        return this._hue;
    }

    public set hue(value: number) {
        const hue = Math.min(360, Math.max(0, value));
        if (hue === this.hue) {
            return;
        }
        const oldValue = this.hue;
        const { s, v } = this._color.toHsv();
        this._color = new TinyColor({ h: hue, s, v });
        this._hue = hue;
        this.host.requestUpdate('hue', oldValue);
    }

    private _hue = 0;

    protected getColorProcesses: Record<
        string,
        (color: TinyColor, isString: boolean) => ColorValue
    > = {
        rgb: (color, isString) =>
            isString ? color.toRgbString() : color.toRgb(),
        prgb: (color, isString) =>
            isString ? color.toPercentageRgbString() : color.toPercentageRgb(),
        hex8: (color, isString) =>
            isString ? color.toHex8String() : color.toHex8(),
        name: (color) => color.toName() || color.toRgbString(),
        hsl: (color, isString) => {
            if (this.maintains === 'hue') {
                if (isString) {
                    const hslString = color.toHslString();
                    return hslString.replace(replaceHueRegExp, `$1${this.hue}`);
                } else {
                    const { s, l, a } = color.toHsl();
                    return { h: this.hue, s, l, a };
                }
            } else {
                if (isString) {
                    const hslString = color.toHslString();
                    return hslString.replace(
                        replaceHueAndSaturationRegExp,
                        `$1${this.hue}$2${this.saturation}`
                    );
                } else {
                    const { s, l, a } = color.toHsl();
                    return { h: this.hue, s, l, a };
                }
            }
        },
        hsv: (color, isString) => {
            if (this.maintains === 'hue') {
                if (isString) {
                    const hsvString = color.toHsvString();
                    return hsvString.replace(replaceHueRegExp, `$1${this.hue}`);
                } else {
                    const { s, v, a } = color.toHsv();
                    return { h: this.hue, s, v, a };
                }
            } else {
                if (isString) {
                    const hsvString = color.toHsvString();
                    return hsvString.replace(
                        replaceHueAndSaturationRegExp,
                        `$1${this.hue}$2${this.saturation}`
                    );
                } else {
                    const { s, v, a } = color.toHsv();
                    return { h: this.hue, s, v, a };
                }
            }
        },
        hex: getHexValue,
        hex3: getHexValue,
        hex4: getHexValue,
        hex6: getHexValue,
    };

    public get value(): ColorValue {
        return this.color;
    }

    public get color(): ColorValue {
        return this.getColorProcesses[this._format.format || 'hex'](
            this._color,
            this._format.isString
        );
    }

    public set color(color: ColorValue) {
        if (color === this.color) {
            return;
        }
        const oldValue = this._color;
        this._color = new TinyColor(color);
        const format = this._color.format;
        let isString = typeof color === 'string' || color instanceof String;

        if (format.startsWith('hex')) {
            isString = (color as string).startsWith('#');
        }

        this._format = {
            format,
            isString,
        };

        this.setColorProcess(this._color, color, format, isString);
        this.host.requestUpdate('color', oldValue);
    }

    private _color = new TinyColor({ h: 0, s: 1, v: 1 });

    public getColor(format: string): ColorValue {
        const formatOptions: Record<string, keyof TinyColorToValue> = {
            hsl: 'toHsl',
        };
        return this._color[formatOptions[format]]();
    }

    public setColor(color: TinyColor): void {
        this._color = color;
        const isString =
            typeof this._color.originalInput === 'string' ||
            this._color.originalInput instanceof String;
        this.setColorProcess(this._color, color, this._color.format, isString);
    }

    public getHslString(): string {
        return this._color.toHslString();
    }

    private _previousColor = new TinyColor({ h: 0, s: 1, v: 1 });

    public savePreviousColor(): void {
        this._previousColor = this._color.clone();
    }

    public restorePreviousColor(): void {
        this.setColor(this._previousColor);
    }

    private _format: { format: string; isString: boolean } = {
        format: '',
        isString: false,
    };
}
