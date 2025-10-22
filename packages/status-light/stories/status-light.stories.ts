/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/status-light/sp-status-light.js';

export default {
    component: 'sp-status-light',
    title: 'StatusLight',
};

export const s = (): TemplateResult => html`
    <sp-status-light size="s" variant="accent">accent</sp-status-light>
    <sp-status-light size="s" variant="positive">positive</sp-status-light>
    <sp-status-light size="s" variant="negative">negative</sp-status-light>
    <sp-status-light size="s" variant="notice">notice</sp-status-light>
    <sp-status-light size="s" variant="info">info</sp-status-light>
    <sp-status-light size="s" variant="neutral">neutral</sp-status-light>
    <sp-status-light size="s" variant="yellow">yellow</sp-status-light>
    <sp-status-light size="s" variant="fuchsia">fuchsia</sp-status-light>
    <sp-status-light size="s" variant="indigo">indigo</sp-status-light>
    <sp-status-light size="s" variant="seafoam">seafoam</sp-status-light>
    <sp-status-light size="s" variant="chartreuse">chartreuse</sp-status-light>
    <sp-status-light size="s" variant="magenta">magenta</sp-status-light>
    <sp-status-light size="s" variant="celery">celery</sp-status-light>
    <sp-status-light size="s" variant="purple">purple</sp-status-light>
    <sp-status-light size="s" variant="cyan">cyan</sp-status-light>
`;

export const m = (): TemplateResult => html`
    <sp-status-light size="m" variant="accent">accent</sp-status-light>
    <sp-status-light size="m" variant="positive">positive</sp-status-light>
    <sp-status-light size="m" variant="negative">negative</sp-status-light>
    <sp-status-light size="m" variant="notice">notice</sp-status-light>
    <sp-status-light size="m" variant="info">info</sp-status-light>
    <sp-status-light size="m" variant="neutral">neutral</sp-status-light>
    <sp-status-light size="m" variant="yellow">yellow</sp-status-light>
    <sp-status-light size="m" variant="fuchsia">fuchsia</sp-status-light>
    <sp-status-light size="m" variant="indigo">indigo</sp-status-light>
    <sp-status-light size="m" variant="seafoam">seafoam</sp-status-light>
    <sp-status-light size="m" variant="chartreuse">chartreuse</sp-status-light>
    <sp-status-light size="m" variant="magenta">magenta</sp-status-light>
    <sp-status-light size="m" variant="celery">celery</sp-status-light>
    <sp-status-light size="m" variant="purple">purple</sp-status-light>
    <sp-status-light size="m" variant="cyan">cyan</sp-status-light>
`;

export const l = (): TemplateResult => html`
    <sp-status-light size="l" variant="accent">accent</sp-status-light>
    <sp-status-light size="l" variant="positive">positive</sp-status-light>
    <sp-status-light size="l" variant="negative">negative</sp-status-light>
    <sp-status-light size="l" variant="notice">notice</sp-status-light>
    <sp-status-light size="l" variant="info">info</sp-status-light>
    <sp-status-light size="l" variant="neutral">neutral</sp-status-light>
    <sp-status-light size="l" variant="yellow">yellow</sp-status-light>
    <sp-status-light size="l" variant="fuchsia">fuchsia</sp-status-light>
    <sp-status-light size="l" variant="indigo">indigo</sp-status-light>
    <sp-status-light size="l" variant="seafoam">seafoam</sp-status-light>
    <sp-status-light size="l" variant="chartreuse">chartreuse</sp-status-light>
    <sp-status-light size="l" variant="magenta">magenta</sp-status-light>
    <sp-status-light size="l" variant="celery">celery</sp-status-light>
    <sp-status-light size="l" variant="purple">purple</sp-status-light>
    <sp-status-light size="l" variant="cyan">cyan</sp-status-light>
`;

export const XL = (): TemplateResult => html`
    <sp-status-light size="xl" variant="accent">accent</sp-status-light>
    <sp-status-light size="xl" variant="positive">positive</sp-status-light>
    <sp-status-light size="xl" variant="negative">negative</sp-status-light>
    <sp-status-light size="xl" variant="notice">notice</sp-status-light>
    <sp-status-light size="xl" variant="info">info</sp-status-light>
    <sp-status-light size="xl" variant="neutral">neutral</sp-status-light>
    <sp-status-light size="xl" variant="yellow">yellow</sp-status-light>
    <sp-status-light size="xl" variant="fuchsia">fuchsia</sp-status-light>
    <sp-status-light size="xl" variant="indigo">indigo</sp-status-light>
    <sp-status-light size="xl" variant="seafoam">seafoam</sp-status-light>
    <sp-status-light size="xl" variant="chartreuse">chartreuse</sp-status-light>
    <sp-status-light size="xl" variant="magenta">magenta</sp-status-light>
    <sp-status-light size="xl" variant="celery">celery</sp-status-light>
    <sp-status-light size="xl" variant="purple">purple</sp-status-light>
    <sp-status-light size="xl" variant="cyan">cyan</sp-status-light>
`;

export const disabledTrue = (): TemplateResult => html`
    <sp-status-light variant="positive" disabled>positive</sp-status-light>
`;

disabledTrue.storyName = 'disabled: true';
