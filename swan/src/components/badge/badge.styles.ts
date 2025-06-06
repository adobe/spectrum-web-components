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

        letter-spacing: var(--spectrum-letter-spacing-s, 0.06em);

        /* Layout */
        border-radius: var(--spectrum-corner-radius-100, 4px);
        border: 1px solid transparent;
        white-space: nowrap;
        cursor: inherit;
        user-select: none;
        vertical-align: top;

        /* Default size - medium */
        min-height: var(--spectrum-component-height-100, 20px);
        padding: 0 var(--spectrum-component-edge-to-text-100, 8px);
        font-size: var(--spectrum-font-size-100, 11px);
        line-height: var(--spectrum-line-height-100, 1.2);
        gap: var(--spectrum-text-to-visual-100, 4px);

        /* Default variant - informative */
        background: var(
            --spectrum-informative-background-color-default,
            #378ef0
        );
        color: var(--spectrum-white, white);
    }

    /* Size variants */
    :host([size='s']) {
        min-height: var(--spectrum-component-height-75, 16px);
        padding: 0 var(--spectrum-component-edge-to-text-75, 6px);
        font-size: var(--spectrum-font-size-75, 10px);
        gap: var(--spectrum-text-to-visual-75, 2px);
    }

    :host([size='l']) {
        min-height: var(--spectrum-component-height-200, 24px);
        padding: 0 var(--spectrum-component-edge-to-text-200, 10px);
        font-size: var(--spectrum-font-size-200, 12px);
        gap: var(--spectrum-text-to-visual-200, 6px);
    }

    :host([size='xl']) {
        min-height: var(--spectrum-component-height-300, 28px);
        padding: 0 var(--spectrum-component-edge-to-text-300, 12px);
        font-size: var(--spectrum-font-size-300, 13px);
        gap: var(--spectrum-text-to-visual-300, 8px);
    }

    /* Semantic variants */
    :host([variant='accent']) {
        background: var(--spectrum-accent-background-color-default, #0066cc);
    }

    :host([variant='neutral']) {
        background: var(
            --spectrum-neutral-subdued-background-color-default,
            #6b7280
        );
    }

    :host([variant='informative']) {
        background: var(
            --spectrum-informative-background-color-default,
            #378ef0
        );
    }

    :host([variant='positive']) {
        background: var(--spectrum-positive-background-color-default, #16a34a);
    }

    :host([variant='negative']) {
        background: var(--spectrum-negative-background-color-default, #dc2626);
    }

    :host([variant='notice']) {
        background: var(--spectrum-notice-background-color-default, #f59e0b);
    }

    /* Non-semantic variants */
    :host([variant='fuchsia']) {
        background: var(--spectrum-fuchsia-background-color-default, #d946ef);
    }

    :host([variant='indigo']) {
        background: var(--spectrum-indigo-background-color-default, #6366f1);
    }

    :host([variant='magenta']) {
        background: var(--spectrum-magenta-background-color-default, #ec4899);
    }

    :host([variant='purple']) {
        background: var(--spectrum-purple-background-color-default, #8b5cf6);
    }

    :host([variant='seafoam']) {
        background: var(--spectrum-seafoam-background-color-default, #14b8a6);
    }

    :host([variant='yellow']) {
        background: var(--spectrum-yellow-background-color-default, #eab308);
    }

    :host([variant='gray']) {
        background: var(--spectrum-gray-background-color-default, #64748b);
    }

    :host([variant='red']) {
        background: var(--spectrum-red-background-color-default, #ef4444);
    }

    :host([variant='orange']) {
        background: var(--spectrum-orange-background-color-default, #f97316);
    }

    :host([variant='chartreuse']) {
        background: var(
            --spectrum-chartreuse-background-color-default,
            #84cc16
        );
    }

    :host([variant='celery']) {
        background: var(--spectrum-celery-background-color-default, #22c55e);
    }

    :host([variant='green']) {
        background: var(--spectrum-green-background-color-default, #16a34a);
    }

    :host([variant='cyan']) {
        background: var(--spectrum-cyan-background-color-default, #06b6d4);
    }

    :host([variant='blue']) {
        background: var(--spectrum-blue-background-color-default, #3b82f6);
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
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
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
    :host([size='s']) slot[name='icon']::slotted(*) {
        width: var(--spectrum-workflow-icon-size-75, 10px);
        height: var(--spectrum-workflow-icon-size-75, 10px);
    }

    :host([size='m']) slot[name='icon']::slotted(*) {
        width: var(--spectrum-workflow-icon-size-100, 12px);
        height: var(--spectrum-workflow-icon-size-100, 12px);
    }

    :host([size='l']) slot[name='icon']::slotted(*) {
        width: var(--spectrum-workflow-icon-size-200, 14px);
        height: var(--spectrum-workflow-icon-size-200, 14px);
    }

    :host([size='xl']) slot[name='icon']::slotted(*) {
        width: var(--spectrum-workflow-icon-size-300, 16px);
        height: var(--spectrum-workflow-icon-size-300, 16px);
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
