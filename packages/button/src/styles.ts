/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { css, type CSSResult } from '@spectrum-web-components/base';

export default ({
    staticValue,
    variant,
    selected,
    treatment,
}: {
    staticValue?: CSSResult;
    variant?: CSSResult;
    selected?: CSSResult;
    treatment?: CSSResult;
} = {}): CSSResult => {
    let modifier = css``;
    let selector = css``;
    if (staticValue && variant && !selected && treatment) {
        modifier = css`static${staticValue}-${variant}-${treatment}-`;
        selector = css`[static='${staticValue}'][variant='${variant}'][treatment='${treatment}']`;
    } else if (staticValue && variant && !selected && !treatment) {
        modifier = css`static${staticValue}-${variant}-`;
        selector = css`[static='${staticValue}'][variant='${variant}']`;
    } else if (staticValue && !variant && !selected && treatment) {
        modifier = css`static${staticValue}-${treatment}-`;
        selector = css`[static='${staticValue}'][treatment='${treatment}']`;
    } else if (staticValue && !variant && !selected && !treatment) {
        modifier = css`static${staticValue}-`;
        selector = css`[static='${staticValue}']`;
    } else if (!staticValue && variant && !selected && treatment) {
        modifier = css`
            ${variant}-${treatment}-
        `;
        selector = css`[variant='${variant}'][treatment='${treatment}']`;
    } else if (!staticValue && variant && !selected && !treatment) {
        modifier = css`
            ${variant}-
        `;
        selector = css`[variant='${variant}']`;
    } else if (!staticValue && !variant && selected && !treatment) {
        modifier = css`
            ${selected}-
        `;
        selector = css`[${selected}]`;
    }
    return css`
        :host(${selector}) {
            --spectrum-button-background-color-default: var(
                --system-spectrum-button-${modifier}background-color-default
            );
            --spectrum-button-background-color-hover: var(
                --system-spectrum-button-${modifier}background-color-hover
            );
            --spectrum-button-background-color-down: var(
                --system-spectrum-button-${modifier}background-color-down
            );
            --spectrum-button-background-color-focus: var(
                --system-spectrum-button-${modifier}background-color-focus
            );
            --spectrum-button-border-color-default: var(
                --system-spectrum-button-${modifier}border-color-default
            );
            --spectrum-button-border-color-hover: var(
                --system-spectrum-button-${modifier}border-color-hover
            );
            --spectrum-button-border-color-down: var(
                --system-spectrum-button-${modifier}border-color-down
            );
            --spectrum-button-border-color-focus: var(
                --system-spectrum-button-${modifier}border-color-focus
            );
            --spectrum-button-content-color-default: var(
                --system-spectrum-button-${modifier}content-color-default
            );
            --spectrum-button-content-color-hover: var(
                --system-spectrum-button-${modifier}content-color-hover
            );
            --spectrum-button-content-color-down: var(
                --system-spectrum-button-${modifier}content-color-down
            );
            --spectrum-button-content-color-focus: var(
                --system-spectrum-button-${modifier}content-color-focus
            );
            --spectrum-button-focus-indicator-color: var(
                --system-spectrum-button-${modifier}focus-indicator-color
            );
            --spectrum-button-background-color-disabled: var(
                --system-spectrum-button-${modifier}background-color-disabled
            );
            --spectrum-button-border-color-disabled: var(
                --system-spectrum-button-${modifier}border-color-disabled
            );
            --spectrum-button-content-color-disabled: var(
                --system-spectrum-button-${modifier}content-color-disabled
            );
        }
    `;
};
