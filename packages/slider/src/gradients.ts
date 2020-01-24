/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
export type SliderColorListEntry = {
    value: string;
    stop: number;
};

export type SliderColorList = (SliderColorListEntry | string)[];

export const sliderStyleStringFromColors = (
    colors: SliderColorList
): string | undefined => {
    if (colors.length === 0) {
        return undefined;
    } else if (colors.length === 1) {
        return `--spectrum-slider-track-color: var(${colors[0]});`;
    }
    let style = '';
    if (typeof colors[0] === 'string') {
        const distribution = 1 / (colors.length - 1);
        style = `--spectrum-slider-fill-track-color: linear-gradient(
                  to right,
                  ${(colors as string[])
                      .map(
                          (color, i) =>
                              `${color} calc(var(--swc-gadient-slider-width) * ${i *
                                  distribution})`
                      )
                      .join(',')}
              );
              --spectrum-slider-track-color: linear-gradient(
                  to left,
                  ${(colors as SliderColorListEntry[])
                      .map(
                          (color, i) =>
                              `${color} calc(var(--swc-gadient-slider-width) * ${1 -
                                  i * distribution})`
                      )
                      .reverse()
                      .join(',')}
              );`;
    } else {
        style = `--spectrum-slider-fill-track-color: linear-gradient(
                  to right,
                  ${(colors as SliderColorListEntry[])
                      .map(
                          (color) =>
                              `${color.value} calc(var(--swc-gadient-slider-width) * ${color.stop})`
                      )
                      .join(',')}
              );
              --spectrum-slider-track-color: linear-gradient(
                  to left,
                  ${(colors as SliderColorListEntry[])
                      .map(
                          (color) =>
                              `${
                                  color.value
                              } calc(var(--swc-gadient-slider-width) * ${1 -
                                  color.stop})`
                      )
                      .reverse()
                      .join(',')}
              );`;
    }
    return style;
};
