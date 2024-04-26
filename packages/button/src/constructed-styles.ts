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

import { css } from '@spectrum-web-components/base';
import variant from './styles.js';

export default css`
    ${variant()}
    ${variant({ variant: css`accent` })}
${variant({ variant: css`accent`, treatment: css`outline` })}
${variant({ variant: css`negative` })}
${variant({ variant: css`negative`, treatment: css`outline` })}
${variant({ variant: css`primary` })}
${variant({ variant: css`primary`, treatment: css`outline` })}
${variant({ variant: css`secondary` })}
${variant({ variant: css`secondary`, treatment: css`outline` })}

:host([quiet]) {
        --spectrum-button-background-color-default: var(
            --system-spectrum-button-quiet-background-color-default
        );
        --spectrum-button-background-color-hover: var(
            --system-spectrum-button-quiet-background-color-hover
        );
        --spectrum-button-background-color-down: var(
            --system-spectrum-button-quiet-background-color-down
        );
        --spectrum-button-background-color-focus: var(
            --system-spectrum-button-quiet-background-color-focus
        );
        --spectrum-button-border-color-default: var(
            --system-spectrum-button-quiet-border-color-default
        );
        --spectrum-button-border-color-hover: var(
            --system-spectrum-button-quiet-border-color-hover
        );
        --spectrum-button-border-color-down: var(
            --system-spectrum-button-quiet-border-color-down
        );
        --spectrum-button-border-color-focus: var(
            --system-spectrum-button-quiet-border-color-focus
        );
        --spectrum-button-background-color-disabled: var(
            --system-spectrum-button-quiet-background-color-disabled
        );
        --spectrum-button-border-color-disabled: var(
            --system-spectrum-button-quiet-border-color-disabled
        );
    }

    ${variant({ selected: css`selected` })}

    :host([selected][emphasized]) {
        --spectrum-button-background-color-default: var(
            --system-spectrum-button-selected-emphasized-background-color-default
        );
        --spectrum-button-background-color-hover: var(
            --system-spectrum-button-selected-emphasized-background-color-hover
        );
        --spectrum-button-background-color-down: var(
            --system-spectrum-button-selected-emphasized-background-color-down
        );
        --spectrum-button-background-color-focus: var(
            --system-spectrum-button-selected-emphasized-background-color-focus
        );
    }

    :host([static='black'][quiet]) {
        --spectrum-button-border-color-default: var(
            --system-spectrum-button-staticblack-quiet-border-color-default
        );
        --spectrum-button-border-color-hover: var(
            --system-spectrum-button-staticblack-quiet-border-color-hover
        );
        --spectrum-button-border-color-down: var(
            --system-spectrum-button-staticblack-quiet-border-color-down
        );
        --spectrum-button-border-color-focus: var(
            --system-spectrum-button-staticblack-quiet-border-color-focus
        );
        --spectrum-button-border-color-disabled: var(
            --system-spectrum-button-staticblack-quiet-border-color-disabled
        );
    }

    :host([static='white'][quiet]) {
        --spectrum-button-border-color-default: var(
            --system-spectrum-button-staticwhite-quiet-border-color-default
        );
        --spectrum-button-border-color-hover: var(
            --system-spectrum-button-staticwhite-quiet-border-color-hover
        );
        --spectrum-button-border-color-down: var(
            --system-spectrum-button-staticwhite-quiet-border-color-down
        );
        --spectrum-button-border-color-focus: var(
            --system-spectrum-button-staticwhite-quiet-border-color-focus
        );
        --spectrum-button-border-color-disabled: var(
            --system-spectrum-button-staticwhite-quiet-border-color-disabled
        );
    }

    ${variant({ staticValue: css`white` })}
    ${variant({ staticValue: css`white`, treatment: css`outline` })}

:host([static='white'][selected]) {
        --spectrum-button-background-color-default: var(
            --system-spectrum-button-staticwhite-selected-background-color-default
        );
        --spectrum-button-background-color-hover: var(
            --system-spectrum-button-staticwhite-selected-background-color-hover
        );
        --spectrum-button-background-color-down: var(
            --system-spectrum-button-staticwhite-selected-background-color-down
        );
        --spectrum-button-background-color-focus: var(
            --system-spectrum-button-staticwhite-selected-background-color-focus
        );
        --spectrum-button-content-color-default: var(
            --mod-button-static-content-color,
            var(
                --system-spectrum-button-staticwhite-selected-content-color-default
            )
        );
        --spectrum-button-content-color-hover: var(
            --mod-button-static-content-color,
            var(
                --system-spectrum-button-staticwhite-selected-content-color-hover
            )
        );
        --spectrum-button-content-color-down: var(
            --mod-button-static-content-color,
            var(
                --system-spectrum-button-staticwhite-selected-content-color-down
            )
        );
        --spectrum-button-content-color-focus: var(
            --mod-button-static-content-color,
            var(
                --system-spectrum-button-staticwhite-selected-content-color-focus
            )
        );
        --spectrum-button-background-color-disabled: var(
            --system-spectrum-button-staticwhite-selected-background-color-disabled
        );
        --spectrum-button-border-color-disabled: var(
            --system-spectrum-button-staticwhite-selected-border-color-disabled
        );
    }

    ${variant({ staticValue: css`white`, variant: css`secondary` })}
    ${variant({
        staticValue: css`white`,
        variant: css`secondary`,
        treatment: css`outline`,
    })}

${variant({ staticValue: css`black` })}
${variant({ staticValue: css`black`, treatment: css`outline` })}
${variant({ staticValue: css`black`, variant: css`secondary` })}
${variant({
        staticValue: css`black`,
        variant: css`secondary`,
        treatment: css`outline`,
    })}
`;
