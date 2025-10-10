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
import { html, TemplateResult } from 'lit';

import '@swc/components/status-light';

export default {
    component: 'swc-status-light',
    title: 'Components/StatusLight',
};

export const s = (): TemplateResult => html`
    <swc-status-light size="s" variant="positive">positive</swc-status-light>
    <swc-status-light size="s" variant="negative">negative</swc-status-light>
    <swc-status-light size="s" variant="notice">notice</swc-status-light>
    <swc-status-light size="s" variant="info">info</swc-status-light>
    <swc-status-light size="s" variant="neutral">neutral</swc-status-light>
    <swc-status-light size="s" variant="yellow">yellow</swc-status-light>
    <swc-status-light size="s" variant="fuchsia">fuchsia</swc-status-light>
    <swc-status-light size="s" variant="indigo">indigo</swc-status-light>
    <swc-status-light size="s" variant="seafoam">seafoam</swc-status-light>
    <swc-status-light size="s" variant="chartreuse"
        >chartreuse</swc-status-light
    >
    <swc-status-light size="s" variant="magenta">magenta</swc-status-light>
    <swc-status-light size="s" variant="celery">celery</swc-status-light>
    <swc-status-light size="s" variant="purple">purple</swc-status-light>
`;

export const m = (): TemplateResult => html`
    <swc-status-light size="m" variant="positive">positive</swc-status-light>
    <swc-status-light size="m" variant="negative">negative</swc-status-light>
    <swc-status-light size="m" variant="notice">notice</swc-status-light>
    <swc-status-light size="m" variant="info">info</swc-status-light>
    <swc-status-light size="m" variant="neutral">neutral</swc-status-light>
    <swc-status-light size="m" variant="yellow">yellow</swc-status-light>
    <swc-status-light size="m" variant="fuchsia">fuchsia</swc-status-light>
    <swc-status-light size="m" variant="indigo">indigo</swc-status-light>
    <swc-status-light size="m" variant="seafoam">seafoam</swc-status-light>
    <swc-status-light size="m" variant="chartreuse"
        >chartreuse</swc-status-light
    >
    <swc-status-light size="m" variant="magenta">magenta</swc-status-light>
    <swc-status-light size="m" variant="celery">celery</swc-status-light>
    <swc-status-light size="m" variant="purple">purple</swc-status-light>
`;

export const l = (): TemplateResult => html`
    <swc-status-light size="l" variant="positive">positive</swc-status-light>
    <swc-status-light size="l" variant="negative">negative</swc-status-light>
    <swc-status-light size="l" variant="notice">notice</swc-status-light>
    <swc-status-light size="l" variant="info">info</swc-status-light>
    <swc-status-light size="l" variant="neutral">neutral</swc-status-light>
    <swc-status-light size="l" variant="yellow">yellow</swc-status-light>
    <swc-status-light size="l" variant="fuchsia">fuchsia</swc-status-light>
    <swc-status-light size="l" variant="indigo">indigo</swc-status-light>
    <swc-status-light size="l" variant="seafoam">seafoam</swc-status-light>
    <swc-status-light size="l" variant="chartreuse"
        >chartreuse</swc-status-light
    >
    <swc-status-light size="l" variant="magenta">magenta</swc-status-light>
    <swc-status-light size="l" variant="celery">celery</swc-status-light>
    <swc-status-light size="l" variant="purple">purple</swc-status-light>
`;

export const XL = (): TemplateResult => html`
    <swc-status-light size="xl" variant="positive">positive</swc-status-light>
    <swc-status-light size="xl" variant="negative">negative</swc-status-light>
    <swc-status-light size="xl" variant="notice">notice</swc-status-light>
    <swc-status-light size="xl" variant="info">info</swc-status-light>
    <swc-status-light size="xl" variant="neutral">neutral</swc-status-light>
    <swc-status-light size="xl" variant="yellow">yellow</swc-status-light>
    <swc-status-light size="xl" variant="fuchsia">fuchsia</swc-status-light>
    <swc-status-light size="xl" variant="indigo">indigo</swc-status-light>
    <swc-status-light size="xl" variant="seafoam">seafoam</swc-status-light>
    <swc-status-light size="xl" variant="chartreuse"
        >chartreuse</swc-status-light
    >
    <swc-status-light size="xl" variant="magenta">magenta</swc-status-light>
    <swc-status-light size="xl" variant="celery">celery</swc-status-light>
    <swc-status-light size="xl" variant="purple">purple</swc-status-light>
`;

export const disabledTrue = (): TemplateResult => html`
    <swc-status-light variant="positive" disabled>positive</swc-status-light>
`;

disabledTrue.storyName = 'disabled: true';
