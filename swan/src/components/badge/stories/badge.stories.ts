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

import { html, TemplateResult } from 'lit';
import '../badge.js';

// Simple checkmark icon (inline SVG since we don't have the full icon library)
const CheckmarkIcon = html`
    <svg
        slot="icon"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="currentColor"
    >
        <path d="M4.5 7.5L2.5 5.5L1.5 6.5L4.5 9.5L10.5 3.5L9.5 2.5L4.5 7.5Z" />
    </svg>
`;

export default {
    title: 'Badge',
    component: 'swan-badge',
};

export const Default = (): TemplateResult => {
    return html`
        <swan-badge>Badge</swan-badge>
    `;
};

export const Icons = (): TemplateResult => {
    return html`
        <swan-badge>No icon</swan-badge>

        <swan-badge>${CheckmarkIcon} Icon and label</swan-badge>

        <swan-badge>${CheckmarkIcon}</swan-badge>
    `;
};

export const BadVariant = (): TemplateResult => {
    return html`
        <swan-badge variant="i-am-not-a-variant">
            This variant does not exist, check console
        </swan-badge>
    `;
};

export const Sizes = (): TemplateResult => {
    return html`
        <div style="display: flex; align-items: center; gap: 8px;">
            <swan-badge size="s">${CheckmarkIcon} Small</swan-badge>
            <swan-badge size="m">${CheckmarkIcon} Medium</swan-badge>
            <swan-badge size="l">${CheckmarkIcon} Large</swan-badge>
            <swan-badge size="xl">${CheckmarkIcon} Extra-large</swan-badge>
            <!-- <swan-badge style="max-width: 180px">
                ${CheckmarkIcon} This long content automatically wraps, but
                shows no more than two lines
            </swan-badge> -->
        </div>
    `;
};

export const Semantic = (): TemplateResult => {
    return html`
        <swan-badge variant="accent">Accent</swan-badge>
        <swan-badge variant="positive">Positive</swan-badge>
        <swan-badge variant="informative">Informative</swan-badge>
        <swan-badge variant="negative">Negative</swan-badge>
        <swan-badge variant="neutral">Neutral</swan-badge>
        <swan-badge variant="notice">Notice</swan-badge>
    `;
};

export const NonSemantic = (): TemplateResult => {
    return html`
        <swan-badge variant="seafoam">Seafoam</swan-badge>
        <swan-badge variant="indigo">Indigo</swan-badge>
        <swan-badge variant="purple">Purple</swan-badge>
        <swan-badge variant="fuchsia">Fuchsia</swan-badge>
        <swan-badge variant="magenta">Magenta</swan-badge>
        <swan-badge variant="yellow">Yellow</swan-badge>
        <swan-badge variant="gray">Gray</swan-badge>
        <swan-badge variant="red">Red</swan-badge>
        <swan-badge variant="orange">Orange</swan-badge>
        <swan-badge variant="chartreuse">Chartreuse</swan-badge>
        <swan-badge variant="celery">Celery</swan-badge>
        <swan-badge variant="green">Green</swan-badge>
        <swan-badge variant="cyan">Cyan</swan-badge>
        <swan-badge variant="blue">Blue</swan-badge>
    `;
};

export const Inline = (): TemplateResult => {
    return html`
        Badge is a simple
        <swan-badge variant="positive" size="s">inline</swan-badge>
        element that should
        <swan-badge variant="neutral" size="s">flow</swan-badge>
        with the rest of the page:
        <swan-badge variant="negative">Missing</swan-badge>
        <swan-badge variant="positive">Successful</swan-badge>
        <swan-badge variant="accent">Accent</swan-badge>
    `;
};

export const Fixed = (): TemplateResult => {
    return html`
        <div
            style="position: relative; width: 400px; height: 200px; background: #eee"
        >
            <swan-badge>None</swan-badge>
            <swan-badge
                fixed="block-start"
                style="position: absolute; top: 0; left: 200px;"
            >
                block-start
            </swan-badge>
            <swan-badge
                fixed="inline-end"
                style="position: absolute; right: 0; top: 100px;"
            >
                inline-end
            </swan-badge>
            <swan-badge
                fixed="block-end"
                style="position: absolute; bottom: 0; left: 200px;"
            >
                block-end
            </swan-badge>
            <swan-badge
                fixed="inline-start"
                style="position: absolute; left: 0; top: 100px;"
            >
                inline-start
            </swan-badge>
        </div>
    `;
};
