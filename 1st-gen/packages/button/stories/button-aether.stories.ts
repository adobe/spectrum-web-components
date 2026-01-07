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
import { Properties, renderButton } from './index.js';
import { args, argTypes } from './index.js';
import '@spectrum-web-components/icon/sp-icon.js';

const variant = 'aether';
const treatment = 'fill';

export default {
    component: 'sp-button',
    title: 'Button/Aether/Fill',
    args: {
        ...args,
        variant,
        treatment,
    },
    argTypes,
};

export const Default = (args: Properties): TemplateResult =>
    renderButton({
        ...args,
        iconOnly: true,
        content: html`
            <sp-icon slot="icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    role="img"
                    fill="currentColor"
                    aria-label="Add"
                >
                    <path
                        d="m16.25,9.25h-5.5V3.75c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v5.5H3.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h5.5v5.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-5.5h5.5c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
                        fill="currentColor"
                    />
                </svg>
            </sp-icon>
        `,
    });
Default.args = {
    size: 'm',
    aetherParticles: true,
};

export const Initial = (args: Properties): TemplateResult =>
    renderButton({
        ...args,
        iconOnly: true,
        content: html`
            <sp-icon slot="icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    role="img"
                    fill="currentColor"
                    aria-label="Add"
                >
                    <path
                        d="m16.25,9.25h-5.5V3.75c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v5.5H3.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h5.5v5.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-5.5h5.5c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
                        fill="currentColor"
                    />
                </svg>
            </sp-icon>
        `,
    });
Initial.args = {
    size: 'm',
    variant: 'aetherInitial',
};

export const Simplified = (args: Properties): TemplateResult =>
    renderButton({
        ...args,
        iconOnly: true,
        content: html`
            <sp-icon slot="icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    role="img"
                    fill="currentColor"
                    aria-label="Add"
                >
                    <path
                        d="m16.25,9.25h-5.5V3.75c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v5.5H3.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h5.5v5.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-5.5h5.5c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
                        fill="currentColor"
                    />
                </svg>
            </sp-icon>
        `,
    });
Simplified.args = {
    size: 'm',
    variant: 'aetherSimple',
};

// export const green = (args: Properties): TemplateResult =>
//     renderButton({
//         ...args,
//         iconOnly: true,
//         content: html`
//             <sp-icon slot="icon">
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 20 20"
//                     role="img"
//                     fill="currentColor"
//                     aria-label="Add"
//                 >
//                     <path
//                         d="m16.25,9.25h-5.5V3.75c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v5.5H3.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h5.5v5.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-5.5h5.5c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
//                         fill="currentColor"
//                     />
//                 </svg>
//             </sp-icon>
//         `,
//     });
// green.args = {
//     size: 'm',
// };

// export const blue = (args: Properties): TemplateResult =>
//     renderButton({
//         ...args,
//         iconOnly: true,
//         content: html`
//             <sp-icon slot="icon">
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 20 20"
//                     role="img"
//                     fill="currentColor"
//                     aria-label="Add"
//                 >
//                     <path
//                         d="m16.25,9.25h-5.5V3.75c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v5.5H3.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h5.5v5.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-5.5h5.5c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
//                         fill="currentColor"
//                     />
//                 </svg>
//             </sp-icon>
//         `,
//     });
// blue.args = {
//     size: 'm',
// };

// export const gradient = (args: Properties): TemplateResult =>
//     renderButton({
//         ...args,
//         iconOnly: true,
//         content: html`
//             <sp-icon slot="icon">
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 20 20"
//                     role="img"
//                     fill="currentColor"
//                     aria-label="Add"
//                 >
//                     <path
//                         d="m16.25,9.25h-5.5V3.75c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v5.5H3.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h5.5v5.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-5.5h5.5c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
//                         fill="currentColor"
//                     />
//                 </svg>
//             </sp-icon>
//         `,
//     });
// gradient.args = {
//     size: 'm',
// };
