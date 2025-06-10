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

import { css } from 'lit';

export default css`
    :host {
        /* Base web component styles */
        display: inline-flex;
        align-items: center;
        justify-content: center;
        --spectrum-font-family: var(--spectrum-sans-font-family-stack);
        --spectrum-font-style: var(--spectrum-default-font-style);
        --spectrum-font-size: var(--spectrum-font-size-100);

        font-family: var(--spectrum-font-family);
        font-size: var(--spectrum-font-size);
        font-style: var(--spectrum-font-style);

        letter-spacing: var(--spectrum-letter-spacing-s);

        /* Layout */
        border-radius: var(--spectrum-corner-radius-medium-size-medium);
        border: 1px solid transparent;
        white-space: nowrap;
        cursor: inherit;
        user-select: none;
        vertical-align: top;

        /* Default size - medium */
        min-height: var(--spectrum-component-height-100);
        padding: 0 var(--spectrum-component-edge-to-text-100);
        font-size: var(--spectrum-font-size-100);
        line-height: var(--spectrum-line-height-100);
        gap: var(--spectrum-text-to-visual-100);

        /* Default variant - informative */
        background: var(--spectrum-informative-background-color-default);
        color: var(--spectrum-white, white);
    }

    /* Size variants */
    :host([size='s']) {
        min-height: var(--spectrum-component-height-75);
        padding: 0 var(--spectrum-component-edge-to-text-75);
        font-size: var(--spectrum-font-size-75);
        gap: var(--spectrum-text-to-visual-75);
    }

    :host([size='l']) {
        min-height: var(--spectrum-component-height-200);
        padding: 0 var(--spectrum-component-edge-to-text-200);
        font-size: var(--spectrum-font-size-200);
        gap: var(--spectrum-text-to-visual-200);
    }

    :host([size='xl']) {
        min-height: var(--spectrum-component-height-300);
        padding: 0 var(--spectrum-component-edge-to-text-300);
        font-size: var(--spectrum-font-size-300);
        gap: var(--spectrum-text-to-visual-300);
    }

    /* Semantic variants */
    :host([variant='accent']) {
        background: var(--spectrum-accent-background-color-default);
    }

    :host([variant='neutral']) {
        background: var(--spectrum-neutral-subdued-background-color-default);
    }

    :host([variant='informative']) {
        background: var(--spectrum-informative-background-color-default);
    }

    :host([variant='positive']) {
        background: var(--spectrum-positive-background-color-default);
    }

    :host([variant='negative']) {
        background: var(--spectrum-negative-background-color-default);
    }

    :host([variant='notice']) {
        background: var(--spectrum-notice-background-color-default);
    }

    /* Non-semantic variants */
    :host([variant='fuchsia']) {
        background: var(--spectrum-fuchsia-background-color-default);
    }

    :host([variant='indigo']) {
        background: var(--spectrum-indigo-background-color-default);
    }

    :host([variant='magenta']) {
        background: var(--spectrum-magenta-background-color-default);
    }

    :host([variant='purple']) {
        background: var(--spectrum-purple-background-color-default);
    }

    :host([variant='seafoam']) {
        background: var(--spectrum-seafoam-background-color-default);
    }

    :host([variant='yellow']) {
        background: var(--spectrum-yellow-background-color-default);
    }

    :host([variant='gray']) {
        background: var(--spectrum-gray-background-color-default);
    }

    :host([variant='red']) {
        background: var(--spectrum-red-background-color-default);
    }

    :host([variant='orange']) {
        background: var(--spectrum-orange-background-color-default);
    }

    :host([variant='chartreuse']) {
        background: var(--spectrum-chartreuse-background-color-default);
    }

    :host([variant='celery']) {
        background: var(--spectrum-celery-background-color-default);
    }

    :host([variant='green']) {
        background: var(--spectrum-green-background-color-default);
    }

    :host([variant='cyan']) {
        background: var(--spectrum-cyan-background-color-default);
    }

    :host([variant='blue']) {
        background: var(--spectrum-blue-background-color-default);
    }

    /* Fixed positioning styles */
    :host([fixed='inline-start']) {
        border-start-start-radius: 0;
        border-end-start-radius: 0;
        margin-inline-start: -1px;
    }

    :host([fixed='inline-end']) {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
        margin-inline-end: -1px;
    }

    :host([fixed='block-start']) {
        border-start-start-radius: 0;
        border-start-end-radius: 0;
        margin-block-start: -1px;
    }

    :host([fixed='block-end']) {
        border-end-start-radius: 0;
        border-end-end-radius: 0;
        margin-block-end: -1px;
    }

    /* Icon slot styles */
    slot[name='icon'] {
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--spectrum-badge-label-icon-color-primary);
    }

    slot[name='icon']::slotted(*) {
        width: 1em;
        height: 1em;
        fill: currentColor;
    }

    /* Icon-only badge (when there's no text content) */
    slot[name='icon'][icon-only] {
        margin: 0;
    }

    /* Size-responsive icon sizing */
    :host([size='s']) ::slotted([slot='icon']) {
        block-size: var(--spectrum-workflow-icon-size-75);
        inline-size: var(--spectrum-workflow-icon-size-75);
        flex: 0 0 var(--spectrum-workflow-icon-size-75);
    }

    :host([size='m']) ::slotted([slot='icon']) {
        block-size: var(--spectrum-workflow-icon-size-100);
        inline-size: var(--spectrum-workflow-icon-size-100);
        flex: 0 0 var(--spectrum-workflow-icon-size-100);
    }

    :host([size='l']) ::slotted([slot='icon']) {
        block-size: var(--spectrum-workflow-icon-size-200);
        inline-size: var(--spectrum-workflow-icon-size-200);
        flex: 0 0 var(--spectrum-workflow-icon-size-200);
    }

    :host([size='xl']) ::slotted([slot='icon']) {
        block-size: var(--spectrum-workflow-icon-size-300);
        inline-size: var(--spectrum-workflow-icon-size-300);
        flex: 0 0 var(--spectrum-workflow-icon-size-300);
    }

    /* Label container */
    .label {
        display: flex;
        align-items: center;
        min-width: 0;
        flex: 1;
    }

    /* Text content in the default slot */
    .label slot {
        display: contents;
    }
`;
