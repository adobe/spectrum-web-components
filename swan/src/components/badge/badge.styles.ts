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
        display: inline-block;
    }

    .badge {
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
    }

    /* Sizes */
    .badge--small {
        --badge-height: 16px;
        --badge-padding: 0 6px;
        --badge-font-size: 10px;
        --badge-line-height: 1;
    }

    .badge--medium {
        --badge-height: 20px;
        --badge-padding: 0 8px;
        --badge-font-size: 11px;
        --badge-line-height: 1;
    }

    .badge--large {
        --badge-height: 24px;
        --badge-padding: 0 10px;
        --badge-font-size: 12px;
        --badge-line-height: 1;
    }

    .badge {
        height: var(--badge-height);
        padding: var(--badge-padding);
        font-size: var(--badge-font-size);
        line-height: var(--badge-line-height);
    }

    /* Variants */
    .badge--neutral {
        background-color: var(--spectrum-color-neutral);
        color: var(--spectrum-color-neutral-content);
    }

    .badge--positive {
        background-color: var(--spectrum-color-positive);
        color: var(--spectrum-color-positive-content);
    }

    .badge--negative {
        background-color: var(--spectrum-color-negative);
        color: var(--spectrum-color-negative-content);
    }

    .badge--notice {
        background-color: var(--spectrum-color-notice);
        color: var(--spectrum-color-notice-content);
    }

    .badge--accent {
        background-color: var(--spectrum-color-accent);
        color: var(--spectrum-color-accent-content);
    }

    /* Pill shape */
    .badge--pill {
        border-radius: var(--badge-height);
    }

    /* Pulse animation */
    .badge--pulse {
        animation: pulse 1.5s ease-in-out infinite;
    }

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
