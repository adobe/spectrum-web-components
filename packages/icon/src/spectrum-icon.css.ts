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
import { css } from 'lit-element';
const styles = css`
    :host {
        display: inline-block;
        color: inherit;
        fill: currentColor;
        pointer-events: none;
    }
    :host(:not(:root)) {
        overflow: hidden;
    }
    :host([size='xxs']),
    :host([size='xxs']) img,
    :host([size='xxs']) svg {
        height: calc(
            var(
                    --spectrum-alias-workflow-icon-size,
                    var(--spectrum-global-dimension-size-225)
                ) / 2
        );
        width: calc(
            var(
                    --spectrum-alias-workflow-icon-size,
                    var(--spectrum-global-dimension-size-225)
                ) / 2
        );
    }
    :host([size='xs']),
    :host([size='xs']) img,
    :host([size='xs']) svg {
        height: calc(var(--spectrum-global-dimension-size-300) / 2);
        width: calc(var(--spectrum-global-dimension-size-300) / 2);
    }
    :host([size='s']),
    :host([size='s']) img,
    :host([size='s']) svg {
        height: var(
            --spectrum-alias-workflow-icon-size,
            var(--spectrum-global-dimension-size-225)
        );
        width: var(
            --spectrum-alias-workflow-icon-size,
            var(--spectrum-global-dimension-size-225)
        );
    }
    :host([size='m']),
    :host([size='m']) img,
    :host([size='m']) svg {
        height: var(--spectrum-global-dimension-size-300);
        width: var(--spectrum-global-dimension-size-300);
    }
    :host([size='l']),
    :host([size='l']) img,
    :host([size='l']) svg {
        height: calc(
            var(
                    --spectrum-alias-workflow-icon-size,
                    var(--spectrum-global-dimension-size-225)
                ) * 2
        );
        width: calc(
            var(
                    --spectrum-alias-workflow-icon-size,
                    var(--spectrum-global-dimension-size-225)
                ) * 2
        );
    }
    :host([size='xl']),
    :host([size='xl']) img,
    :host([size='xl']) svg {
        height: calc(var(--spectrum-global-dimension-size-300) * 2);
        width: calc(var(--spectrum-global-dimension-size-300) * 2);
    }
    :host([size='xxl']),
    :host([size='xxl']) img,
    :host([size='xxl']) svg {
        height: calc(var(--spectrum-global-dimension-size-300) * 3);
        width: calc(var(--spectrum-global-dimension-size-300) * 3);
    }
`;
export default styles;
