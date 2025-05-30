// Import the component markup template
import { html } from 'lit';
import { Template } from './template.js';

export default {
    title: 'Corner rounding',
    description:
        'Corner rounding is a foundation that shows the different border-radius tokens that can be applied to a component.',
    component: 'Corner rounding',
    args: {
        rootClass: 'spectrum-Foundations-Example-CornerRounding',
    },
    tags: ['!dev'],
};

const CornerRadiusGroup = (args = {}, context = {}) => html`
    <div>
        <table class="spectrum-Foundations-Example-CornerRounding-table">
            <thead>
                <tr>
                    <th scope="col">Token</th>
                    <th scope="col" style="padding: 0 2rem;">Value</th>
                    <th scope="col">
                        Example
                        <br />
                        (No Border)
                    </th>
                    <th scope="col">
                        Example
                        <br />
                        (Border)
                    </th>
                </tr>
            </thead>
            <tbody>
                ${Template(
                    {
                        ...args,
                        label: '--spectrum-corner-radius-none',
                        size: 'none',
                        value: '0px',
                    },
                    context
                )}
                ${Template(
                    {
                        ...args,
                        label: '--spectrum-corner-radius-small-default',
                        size: 's',
                        value: '4px',
                    },
                    context
                )}
                ${Template(
                    {
                        ...args,
                        label: '--spectrum-corner-radius-medium-default',
                        size: 'm',
                        value: '8px',
                    },
                    context
                )}
                ${Template(
                    {
                        ...args,
                        label: '--spectrum-corner-radius-large-default',
                        size: 'l',
                        value: '10px',
                    },
                    context
                )}
                ${Template(
                    {
                        ...args,
                        label: '--spectrum-corner-radius-extra-large-default',
                        size: 'xl',
                        value: '16px',
                    },
                    context
                )}
                ${Template(
                    {
                        ...args,
                        label: '--spectrum-corner-radius-full',
                        size: 'full',
                        value: '9999px',
                    },
                    context
                )}
            </tbody>
        </table>
    </div>
`;

export const CornerRounding = CornerRadiusGroup.bind({});
CornerRounding.args = {};
