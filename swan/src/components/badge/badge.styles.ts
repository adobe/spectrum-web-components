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
        /* Base host styles - web component approach */
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: var(--spectrum-font-family-base);
        font-weight: var(--spectrum-font-weight-bold);
        text-transform: uppercase;
        letter-spacing: var(--spectrum-letter-spacing-s);
        border-radius: var(--spectrum-border-radius-s);
        border: 1px solid transparent;
        white-space: nowrap;
        cursor: inherit;
        user-select: none;
        vertical-align: top;
        gap: 4px;

        /* Default size - medium */
        --badge-height: 20px;
        --badge-padding: 0 8px;
        --badge-font-size: 11px;
        --badge-line-height: 1;

        height: var(--badge-height);
        padding: var(--badge-padding);
        font-size: var(--badge-font-size);
        line-height: var(--badge-line-height);

        /* Default variant - informative */
        background-color: var(--spectrum-color-informative);
        color: var(--spectrum-color-informative-content);
    }

    /* Size variants - using 1.x sizes (s, m, l, xl) */
    :host([size='s']) {
        --badge-height: 16px;
        --badge-padding: 0 6px;
        --badge-font-size: 10px;
        --badge-line-height: 1;
    }

    :host([size='m']) {
        --badge-height: 20px;
        --badge-padding: 0 8px;
        --badge-font-size: 11px;
        --badge-line-height: 1;
    }

    :host([size='l']) {
        --badge-height: 24px;
        --badge-padding: 0 10px;
        --badge-font-size: 12px;
        --badge-line-height: 1;
    }

    :host([size='xl']) {
        --badge-height: 28px;
        --badge-padding: 0 12px;
        --badge-font-size: 13px;
        --badge-line-height: 1;
    }

    /* Semantic variants */
    :host([variant='accent']) {
        background-color: var(--spectrum-color-accent);
        color: var(--spectrum-color-accent-content);
    }

    :host([variant='neutral']) {
        background-color: var(--spectrum-color-neutral);
        color: var(--spectrum-color-neutral-content);
    }

    :host([variant='informative']) {
        background-color: var(--spectrum-color-informative);
        color: var(--spectrum-color-informative-content);
    }

    :host([variant='positive']) {
        background-color: var(--spectrum-color-positive);
        color: var(--spectrum-color-positive-content);
    }

    :host([variant='negative']) {
        background-color: var(--spectrum-color-negative);
        color: var(--spectrum-color-negative-content);
    }

    :host([variant='notice']) {
        background-color: var(--spectrum-color-notice);
        color: var(--spectrum-color-notice-content);
    }

    /* Non-semantic color variants */
    :host([variant='fuchsia']) {
        background-color: var(--spectrum-color-fuchsia);
        color: var(--spectrum-color-fuchsia-content);
    }

    :host([variant='indigo']) {
        background-color: var(--spectrum-color-indigo);
        color: var(--spectrum-color-indigo-content);
    }

    :host([variant='magenta']) {
        background-color: var(--spectrum-color-magenta);
        color: var(--spectrum-color-magenta-content);
    }

    :host([variant='purple']) {
        background-color: var(--spectrum-color-purple);
        color: var(--spectrum-color-purple-content);
    }

    :host([variant='seafoam']) {
        background-color: var(--spectrum-color-seafoam);
        color: var(--spectrum-color-seafoam-content);
    }

    :host([variant='yellow']) {
        background-color: var(--spectrum-color-yellow);
        color: var(--spectrum-color-yellow-content);
    }

    :host([variant='gray']) {
        background-color: var(--spectrum-color-gray);
        color: var(--spectrum-color-gray-content);
    }

    :host([variant='red']) {
        background-color: var(--spectrum-color-red);
        color: var(--spectrum-color-red-content);
    }

    :host([variant='orange']) {
        background-color: var(--spectrum-color-orange);
        color: var(--spectrum-color-orange-content);
    }

    :host([variant='chartreuse']) {
        background-color: var(--spectrum-color-chartreuse);
        color: var(--spectrum-color-chartreuse-content);
    }

    :host([variant='celery']) {
        background-color: var(--spectrum-color-celery);
        color: var(--spectrum-color-celery-content);
    }

    :host([variant='green']) {
        background-color: var(--spectrum-color-green);
        color: var(--spectrum-color-green-content);
    }

    :host([variant='cyan']) {
        background-color: var(--spectrum-color-cyan);
        color: var(--spectrum-color-cyan-content);
    }

    :host([variant='blue']) {
        background-color: var(--spectrum-color-blue);
        color: var(--spectrum-color-blue-content);
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
        width: 10px;
        height: 10px;
    }

    :host([size='m']) slot[name='icon']::slotted(*) {
        width: 12px;
        height: 12px;
    }

    :host([size='l']) slot[name='icon']::slotted(*) {
        width: 14px;
        height: 14px;
    }

    :host([size='xl']) slot[name='icon']::slotted(*) {
        width: 16px;
        height: 16px;
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

    /* Pulse animation */
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 var(--spectrum-color-accent-alpha-50);
        }
        70% {
            box-shadow: 0 0 0 6px transparent;
        }
        100% {
            box-shadow: 0 0 0 0 transparent;
        }
    }
`;
